
export default class ParameterBag {
  /**
   * @var {string}
   */
  set method (method) {
    this._method = method
  }

  /**
   * @var {string}
   */
  get method () {
    return this._method
  }

  /**
   * @var {string}
   */
  set lang (lang) {
    this._lang = lang
  }

  /**
   * @var {string}
   */
  get lang () {
    return this._lang
  }

  /**
   * @var {string[]}
   */
  set keywords (keywords) {
    this._keywords = keywords
  }

  /**
   * @var {string[]}
   */
  get keywords () {
    if (!this._keywords) {
      this._keywords = []
    }

    return this._keywords
  }

  /**
   * Adds a new keyword to the bag's collection.
   *
   * @param {string} keyword
   * @return {ParameterBag}
   */
  addKeyword (keyword) {
    if (!this._keywords) {
      this._keywords = []
    }

    this._keywords.push(keyword)

    return this
  }

  /**
   * Packs ParameterBag with data.
   *
   * @param {object} payload
   * @return {ParameterBag}
   */
  pack (payload) {
    for (let property in payload) {
      if (payload.hasOwnProperty(property)) {
        this[property] = payload[property]
      }
    }

    return this
  }
}
