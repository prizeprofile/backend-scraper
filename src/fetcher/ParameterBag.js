
module.exports = class ParameterBag {
  /**
   * Returns API method.
   * @return {string}
   */
  get method () {
    return this.data.method || 'search/tweets'
  }

  /**
   * Packs ParameterBag with params.
   *
   * @param {object|string} payload
   * @param {any} [payload=null]
   * @return {ParameterBag}
   */
  pack (payload, value = null) {
    if (! this.data) {
      this.data = {}
    }

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
  get geocode () {
    const { latitude, longitude, radius, units } = this.data

    return `${latitude},${longitude},${radius}${units}`
  }

  /**
   * Creates a keyword query string.
   * 
   * @return {string}
   */  
  get keywords () {
    return this.data.query.reduce((carry, { operator, keywords, join }) => {
      return `${carry} ${operator || ''} (${keywords.join(` ${join} `)})`
    }, '').trim()
  }

  /**
   * Converts parameters into Node Twitter SDK friendly format.
   *
   * @return {object}
   */
  twittify () {
    return {
      count: 100,
      result_type: 'recent',
      tweet_mode: 'extended',
      lang: this.data.lang,
      include_entities: true,
      geocode: this.geocode,
      since_id: this.data.since_id,
      q: this.keywords
    }
  }
}
