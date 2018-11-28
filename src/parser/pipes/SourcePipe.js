const Pipe = require('./Pipe')

module.exports = class SourcePipe extends Pipe {
  /**
   * @inheritdoc
   */
  run () {
    return this.competition.bind('source_id', 0)
  }
}
