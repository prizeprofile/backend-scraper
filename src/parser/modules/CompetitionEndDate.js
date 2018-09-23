const ParserModule = require('./ParserModule')
const chrono = require('chrono-node').en_GB

module.exports = class CompetitionEndDate extends ParserModule {
  /**
   * @inheritdoc
   */
  run () {
    const tweet = this.competition.resolve('data').tweet

    let res = chrono.parseDate(tweet.text, new Date(tweet.posted))

    // If an end date could be parsed, save it, otherwise skip this module.
    return Promise.resolve(res ? this.competition.bind('end_date', res) : this.$skip())
  }
}
