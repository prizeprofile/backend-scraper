const ParserModule = require('./ParserModule')
const chrono = require('chrono-node').en_GB

module.exports = class CompetitionEndDate extends ParserModule {
  /**
   * @inheritdoc
   */
  async run () {
    const tweet = this.competition.resolve('data').tweet

    let res = chrono.parse(tweet.text, new Date(tweet.posted))

    // If an end date could be parsed save it, otherwise skip this module.
    if (! res.length) {
      return this.$skip()
    }

    // Getting the latest date from the competition text.
    let date = res.sort((a, b) => {
      a = a.start.date()
      b = b.start.date()
      return a > b ? 1 : a < b ? -1 : 0
    })
      .pop()
      .start
      .date()

    return this.competition.bind('end_date', date)
  }
}
