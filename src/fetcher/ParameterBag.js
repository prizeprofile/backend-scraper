
exports = class ParameterBag {
  /**
   * Class construct.
   */
  construct () {
    this.data = {}
  }

  /**
   * Packs ParameterBag with data.
   *
   * @param {object|string} payload
   * @param {any} [payload=null]
   * @return {ParameterBag}
   */
  pack (payload, value = null) {
    if (value) {
      this.data[payload] = value
    } else {
      for (let property in payload) {
        if (payload.hasOwnProperty(property)) {
          this.data[property] = payload[property]
        }
      }
    }

    return this
  }

  /**
   * Creates a geocode string.
   *
   * @return {string}
   */
  geocode () {
    return this.data.latitude + ',' +
      this.data.longitude + ',' +
      this.data.radius + this.data.units
  }

  /**
   * Converts parameters into Node Twitter SDK friendly format.
   *
   * @return {object}
   */
  twittify () {
    return {
      count: 100,
      lang: this.data.lang,
      q: this.data.keywords.join(' OR '),
      geocode: this.geocode(),
      include_entities: true,
      tweet_mode: 'extended'
    }
  }
}
