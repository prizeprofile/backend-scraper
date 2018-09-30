const ParserModule = require('./ParserModule')
const CompetitionShouldBeSkippedException = require('../Exceptions').CompetitionShouldBeSkippedException

module.exports = class EntryMethod extends ParserModule {
  /**
   * @inheritdoc
   */
  async run () {
    const text = this.competition.resolve('data').tweet.text

    let methods = []

    // Runs all regexes against the Tweet text.
    for (let method of this.methods()) {
      if (method.regex.test(text)) {
        // If a regex passes, adds the entry method.
        methods.push(method.name)
      }
    }

    if (!methods.length) {
      throw new CompetitionShouldBeSkippedException()
    }

    // Binds the array to the container and continues.
    return this.competition.bind('entry_methods', methods)
  }

  /**
   * @return {Object[]}
   */
  methods () {
    return [
      { name: 'like', regex: /like|fav/gmi },
      { name: 'follow', regex: /follow|\sf\s/gmi },
      { name: 'comment', regex: /comment|reply|mention/gmi },
      { name: 'friend', regex: /(tag|mention).*(friend|mate)/gmi },
      { name: 'retweet', regex: /retweet|rt|repost/gmi }
    ]
  }
}
