const Tweet = require('./tweet/Tweet')
const TweetValidator = require('./tweet/TweetValidator')

module.exports = class Parser {
  /**
   * Class @constructor.
   *
   * @param {number} region
   * @param {Pipe[]}
   * @param {any} container
   */
  constructor (pipes, region, container) {
    this.region = region
    this.pipes = pipes
    this.container = container
  }

  /**
   * Pipes data from Twitter to Parser.
   *
   * @param {object} data
   * @return {void}
   */
  async pipe (data) {
    let validator = new TweetValidator()

    const tweet = new Tweet(validator).from(data)

    if (!tweet.isTweet()) {
      return null
    }

    // Runs all the pipes that parse data from the tweet.
    return this.convey(tweet)
  }

  /**
   * Passes the competition through all registered pipes.
   *
   * @param {Tweet} competition
   * @return {Promise<Tweet>}
   */
  convey (competition) {
    return this.pipes.reduce((chain, Pipe) => {
      // Runs every pipe. Each time the pipe calls next with a data,
      // that data is passed to the next pipe as carry.
      return chain.then(data => {
        return new Pipe(this.container, data).run()})
    }, Promise.resolve(competition))
  }
}
