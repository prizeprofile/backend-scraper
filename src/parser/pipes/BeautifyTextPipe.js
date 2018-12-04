const Pipe = require('./Pipe')

module.exports = class BeautifyTextPipe extends Pipe {
  /**
   * @var {RegExp}
   */
  get trailingLink () {
    return /\shttps:\/\/t\.co\/[a-z0-9]+$/i
  }

  get trailingHashtags () {
    return /(#[a-z0-9]+(\s|$))+$/i
  }

  /**
   * @inheritdoc
   */
  async run () {
    const { resource } = this.competition.resolve('data')

    // Strips out the link that is appended to each tweet.
    resource.text = resource.text
      .replace(this.trailingLink, '')
      .replace(this.trailingHashtags, '')

    return this.competition
  }
}
