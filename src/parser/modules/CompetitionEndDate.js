const ParserModule = require('./ParserModule')

exports = class CompetitionEndDate extends ParserModule {
  /**
   * @inheritdoc
   */
  async run () {
    return this.$skip()
  }
}
