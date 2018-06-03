import log from '@/logger'

export default class StreamHealth {
  /**
   * Class constructor.
   */
  constructor () {
    this.created = Date.now()
    this.starts = []
    this.errors = []
  }

  /**
   * Reports that a stream is active.
   *
   * @return {StreamHealth}
   */
  reportFlood () {
    log('scraper.fetcher.stream.' + (this.starts.length ? 'restart' : 'start'))

    this.starts.push({ time: Date.now() })

    return this
  }

  /**
   * Returns last error that has been reported on the stream.
   *
   * @return {StreamError}
   */
  reportMetrics (metrics) {
    log('scraper.fetcher.stream.metrics', metrics)

    return this
  }

  /**
   * Logs an error via logger and stores it on this instance.
   *
   * @return {StreamHealth}
   */
  reportError ({ message }) {
    // TODO: Differentiate among different error types.
    let error = {
      created: Date.now(),
      type: message.split(' ').pop(),
      message
    }

    log('scraper.fetcher.stream.error', error)

    this.errors.push(error)

    return this
  }
}
