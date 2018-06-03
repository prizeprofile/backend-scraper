import config from '@/config'
import log from '@/logger'

export default class StreamMentor {
  /**
   * Returns object where key is the stream id and value is it's instance.
   *
   * @return {object}
   */
  get streams () {
    return this._streams
  }

  /**
   * Class constructor.
   *
   * @param {Twitter} client
   * @param {TweetParser} parser
   */
  constructor (client, parser) {
    Object.assign(this, { client, parser, _streams: [] })
  }

  /**
   * Assigns the doctor a new stream.
   *
   * @param {Stream} stream
   * @return {StreamMentor}
   */
  assign (stream) {
    this.streams.push(stream)

    return this
  }

  /**
   * Monitors stream health.
   *
   * @param {Stream} stream
   * @param {any} error
   * @return {void}
   */
  heal (stream, error) {
    const health = stream.health.reportError(error)

    stream.destroy()

    if (this.shouldBeRestarted(health)) {
      // TODO: Handle this better. A problem could be destroying dojo while
      // a stream is being restarted.
      // TODO: The restart delay should be based on error type.
      setTimeout(() => stream.flood(), config('RESTART_DELAY'))

      return
    }

    // TODO: Start scraping Tweet via CRON hook more often.
    // Default every 2 hours, go to 20 minutes.
    // Attempt to start streams again every time.
  }

  /**
   * Decides whether stream should be restarted or destroyed.
   *
   * @param {StreamHealth} health
   * @return {boolean}
   */
  shouldBeRestarted (health) {
    const errors = health.errors.reverse()
    const ONE_HOUR_IN_MS = 3600 * 1000
    const ONE_MINUTE_IN_MS = 60 * 1000

    // eslint-disable-next-line
    let timeOfFirst = 0, perHour = 0, perMinute = 0

    errors.some((error, i) => {
      if (timeOfFirst - error.created < ONE_MINUTE_IN_MS) {
        perMinute++
        perHour++
      } else if (timeOfFirst - error.created < ONE_HOUR_IN_MS) {
        perHour++
      }

      return i > config('MAX_PER_HOUR')
    })

    // Filters errors of same type as first one and where time diff in seconds
    // is less than MIN_TIME_BETWEEN_SAME (considering RESTART_DELAY).
    let sameError = errors.filter((error) => {
      return Math.abs(error.created - errors[0].created) <
        config('MIN_TIME_BETWEEN_SAME') + config('RESTART_DELAY') &&
        error.type === errors[0].type
    }).length > 1

    health.reportMetrics({ perMinute, perHour, sameError })

    return !sameError &&
      perMinute <= config('MAX_PER_MINUTE') &&
      perHour <= config('MAX_PER_HOUR')
  }

  /**
   * Destroys all streams assigned to this mentor.
   *
   * @return {void}
   */
  destroyAll () {
    this.streams.forEach(stream => stream.destroy())

    delete this._streams

    log('scraper.fetcher.stream.destroy_all')
  }

  /**
   * Pipes Tweet to parsers.
   *
   * @param {Stream} stream
   * @param {any} data
   * @return {void}
   */
  pipe (stream, data) {
    this.parser.pipe(stream.bag, data)
  }
}
