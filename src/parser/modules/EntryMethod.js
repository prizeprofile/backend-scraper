const ParserModule = require('./ParserModule')

exports = class EntryMethod extends ParserModule {
  /**
   * @inheritdoc
   */
  async run () {
    console.log('EntryMethod', this.competition)
    
    return this.$skip()
  }
}
