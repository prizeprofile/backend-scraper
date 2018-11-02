const ParserModule = require('./ParserModule')
const CompetitionShouldBeSkippedException = require('../Exceptions').CompetitionShouldBeSkippedException

module.exports = class ValidCompetition extends ParserModule {
  /**
   * @inheritdoc
   */
  async run () {
    const resource = this.competition.resolve('data').resource
    const promoter = this.competition.resolve('data').promoter
    const media = this.competition.resolve('media')

    if ((promoter.verified || media) && resource.retweets >= process.env.MIN_COMPETITION_RETWEETS) {
      return this.$skip()
    }

    throw new CompetitionShouldBeSkippedException()
  }
}
