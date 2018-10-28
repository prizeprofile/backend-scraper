const ParserModule = require('./ParserModule')

module.exports = class Entrants extends ParserModule {
  /**
   * @inheritdoc
   */
  run () {
    const promoter = this.competition.resolve('data').promoter
    const resource = this.competition.resolve('data').resource
    const methods = this.competition.resolve('entry_methods')
    let entrants = 0

    if (methods.includes('retweet')) {
      entrants = Math.min(entrants, resource.retweets)
    }
    
    if (methods.includes('like')) {
      entrants = Math.min(entrants, resource.favorites)
    }

    return this.competition.bind('entrants', entrants)
  }
}
