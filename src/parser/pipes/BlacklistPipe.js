const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const badWords = new require('bad-words')()
const Pipe = require('./Pipe')
const CompetitionShouldBeSkippedException = require('../Exceptions').CompetitionShouldBeSkippedException

module.exports = class BlacklistPipe extends Pipe {
  /**
   * @inheritdoc
   */
  async run () {
    const promoter = this.competition.resolve('data').promoter.screen_name
    const text = this.competition.resolve('data').text

    const blacklist = await this.getBlacklistedPromoters()

    // If promoter's screen name doesn't fit any of the blacklisted regexes,
    // continue to next pipe.
    if (!blacklist.find(item => new RegExp(item, 'i').test(promoter))) {
      return this.$skip()
    }

    // Check that the tweet does not include swear words.
    if (!badWords.isProfane(text)) {
      return this.$skip()
    }

    throw new CompetitionShouldBeSkippedException('BlacklistPipe')
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
