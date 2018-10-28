const ParserModule = require('./ParserModule')

module.exports = class Media extends ParserModule {
  /**
   * @inheritdoc
   */
  async run () {
    const media = this.competition.resolve('data').resource.media

    if (! media || ! media.length) {
      return this.$skip()
    }

    let image = media.pop()

    image = image.media_url_https || image.media_url

    if (image) {
      this.competition.bind('media', image)
    }

    return this.competition
  }
}
