const ParserModule = require('./ParserModule')
const CompetitionShouldBeSkippedException = require('../Exceptions').CompetitionShouldBeSkippedException

module.exports = class ValidCompetition extends ParserModule {
  /**
   * @inheritdoc
   */
  async run () {
    const tweet = this.competition.resolve('data').tweet
    const promoter = this.competition.resolve('data').promoter
    
    if (promoter.verified || promoter.homepage || tweet.retweets >= process.env.MIN_COMPETITION_RETWEETS) {
      return this.$skip()
    }

    throw new CompetitionShouldBeSkippedException()
  }
}
