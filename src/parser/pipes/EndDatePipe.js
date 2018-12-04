const Pipe = require('./Pipe')
const chrono = require('chrono-node').en_GB
const { CompetitionShouldBeSkippedException } = require('../Exceptions')

module.exports = class EndDatePipe extends Pipe {
  /**
   * @inheritdoc
   */
  async run () {
    const resource = this.competition.resolve('data').resource

    // Skip uf text does not include a keyword that would suggest tweet's end date.
    if (!this.regex().test(resource.text)) {
      return this.next()
    }

    let res = chrono.parse(resource.text, new Date(resource.posted))

    // If an end date could be parsed save it, otherwise skip this module.
    if (! res.length) {
      return this.next()
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

    if (new Date() > date) {
      throw new CompetitionShouldBeSkippedException('EndDatePipe')
    }

    return this.competition.bind('end_date', date)
  }

  /**
   * @return {RegExp}
   */
  regex () {
    return /end|announc|pick|chosen|choos|draw|deadline|clos|select|left/i
  }
}
