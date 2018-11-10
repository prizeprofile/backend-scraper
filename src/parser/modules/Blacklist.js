const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const ParserModule = require('./ParserModule')
const CompetitionShouldBeSkippedException = require('../Exceptions').CompetitionShouldBeSkippedException

module.exports = class Blacklist extends ParserModule {
  /**
   * @inheritdoc
   */
  async run () {
    const promoter = this.competition.resolve('data').promoter.screen_name
    const blacklist = await this.getBlacklistedPromoters()

    // If promoter's screen name doesn't fit any of the blacklisted regexes,
    // continue to next pipe.
    if (!blacklist.find(item => new RegExp(item).test(promoter))) {
      return this.$skip()
    }

    throw new CompetitionShouldBeSkippedException()
  }

  /**
   * @return {Promise<string>}
   */
  async getBlacklistedPromoters () {
    if (!this.container.blacklist) {
      this.container.blacklist = await s3
        .getObject({
          Bucket: process.env.BLACKLIST_BUCKET,
          Key: process.env.BLACKLIST_KEY
        })
        .promise()
        .then(({ Body }) => Body.toString('utf-8'))
        .then(JSON.parse)
        .then(({ promoters }) => promoters.twitter)
    }

    return this.container.blacklist
  }
}
