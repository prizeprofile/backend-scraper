
exports = class Tweet {
  /**
   * Class constructor.
   *
   * @param {TweetValidator} validator
   */
  constructor (validator) {
    this.validator = validator
  }

  /**
   * Creates a Tweet from given data.
   *
   * @param {any} data
   * @return {Tweet}
   */
  from (data) {
    let result = this.validator.run(data)

    if (! result || typeof result !== 'object') {
      this.valid = false
    } else {
      this.data = result
    }

    return this
  }

  /**
   * Resolves whether the tweet was valid.
   *
   * @return {boolean}
   */
  isTweet () {
    return this.valid !== false
  }
}
