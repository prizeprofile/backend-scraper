const ParserModule = require('./ParserModule')

module.exports = class Entrants extends ParserModule {
  /**
   * @inheritdoc
   */
  run () {
    return this.competition.bind('source_id', 0)
  }
}
