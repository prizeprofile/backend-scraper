const ParserModule = require('./ParserModule')

module.exports = class Entrants extends ParserModule {
  /**
   * @inheritdoc
   */
  run () {
    const resource = this.competition.resolve('data').resource
    const methods = this.competition.resolve('entry_methods')
    let entrants = resource.promoter.followers || 0

    if (methods.includes('retweet')) {
      entrants = Math.min(entrants, resource.retweets)
    }

    if (methods.includes('comment') || methods.includes('friend')) {
      entrants = Math.min(entrants, resource.comments)
    }
    
    if (methods.includes('like')) {
      entrants = Math.min(entrants, resource.favorites)
    }

    return this.competition.bind('entrants', entrants)
  }
}
