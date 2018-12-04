const Pipe = require('./Pipe')
const { CompetitionShouldBeSkippedException } = require('../Exceptions')

module.exports = class ValidatorPipe extends Pipe {
  /**
   * @inheritdoc
   */
  async run () {
    const resource = this.competition.resolve('data').resource
    const promoter = this.competition.resolve('data').promoter
    const media = this.competition.resolve('media')

    if ((promoter.verified || media) && resource.retweets >= process.env.MIN_COMPETITION_RETWEETS) {
      return this.next()
    }

    throw new CompetitionShouldBeSkippedException('ValidatorPipe')
  }
}
