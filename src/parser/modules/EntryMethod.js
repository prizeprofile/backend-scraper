const ParserModule = require('./ParserModule')

module.exports = class EntryMethod extends ParserModule {
  /**
   * @inheritdoc
   */
  async run () {
    const text = this.competition.data.tweet.text

    let methods = []

    // Runs all regexes against the Tweet text.
    for (let method of this.methods()) {
      if (method.regex.test(text)) {
        // If a regex passes, adds the entry method.
        methods.push(method.name)
      }
    }

    // Binds the array to the container and continues.
    return this.competition.bind('entry_methods', methods)
  }

  /**
   * @return {Object[]}
   */
  methods () {
    return [
      { name: 'like', regex: /like/gmi },
      { name: 'follow', regex: /follow/gmi },
      { name: 'comment', regex: /comment|reply/gmi },
      { name: 'friend', regex: /(tag).*(friend)/gmi },
      { name: 'retweet', regex: /retweet|rt|repost/gmi }
    ]
  }
}
