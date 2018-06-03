import log from '@/logger'

export default class Fetcher {
  /**
   * Class constructor.
   *
   * @param {Twitter} client
   * @param {TweetParser} parser
   */
  constructor (client, parser) {
    Object.assign(this, { client, parser })
  }

  /**
   * Setter for the parameter bag.
   *
   * @param {ParameterBag} bag
   * @return {Stream}
   */
  attachBag (bag) {
    this.bag = bag

    return this
  }

  /**
   * Loads an array with Tweets that match the query in the parameter bag.
   *
   * @return {Promise<number>}
   */
  scrape () {
    return new Promise((resolve, reject) => {
      this.client.get(this.bag.method, this.bag.twittify(), (error, tweets) => {
        if (error) {
          log('scraper.fetcher.standard.error', error)

          return reject(error.code)
        }

        tweets.statuses.forEach(tweet => this.parser.pipe(this.bag, tweet))

        resolve(tweets.statuses.length)
      })
    })
  }
}
