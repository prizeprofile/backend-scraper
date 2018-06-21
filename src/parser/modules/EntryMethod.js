import ParserModule from './ParserModule'

export default class EntryMethod extends ParserModule {
  /**
   * @inheritdoc
   */
  run () {
    this.$next()
  }
}
