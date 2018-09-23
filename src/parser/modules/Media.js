const ParserModule = require('./ParserModule')

module.exports = class Media extends ParserModule {
  /**
   * @inheritdoc
   */
  run () {
    const media = this.competition.resolve('data').tweet.media

    if (! media || ! media.length) {
        return Promise.resolve(this.$skip())
    }

    let image = media.pop()

    image = image.media_url_https || image.media_url

    if (image) {
        this.competition.bind('media', image)
    }

    return Promise.resolve(this.competition)
  }
}
