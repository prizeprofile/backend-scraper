const ParserModule = require('./ParserModule')
const chrono = require('chrono-node').en_GB

module.exports = class CompetitionEndDate extends ParserModule {
  /**
   * @inheritdoc
   */
  run () {
    const resource = this.competition.resolve('data').resource

    let res = chrono.parseDate(resource.text, new Date(resource.posted))

    // If an end date could be parsed, save it, otherwise skip this module.
    return Promise.resolve(res ? this.competition.bind('end_date', res) : this.$skip())
  }
}
