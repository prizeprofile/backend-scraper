const Pipe = require('./Pipe')

module.exports = class EntrantsPipe extends Pipe {
  /**
   * @inheritdoc
   */
  run () {
    const resource = this.competition.resolve('data').resource
    const methods = this.competition.resolve('entry_methods')
    let entrants = null

    if (methods.includes('retweet')) {
      entrants = entrants === null ? resource.retweets : Math.min(entrants, resource.retweets)
    }

    if (methods.includes('like')) {
      entrants = entrants === null ? resource.favorites : Math.min(entrants, resource.favorites)
    }

    return this.competition.bind('entrants', entrants || 0)
  }
}
