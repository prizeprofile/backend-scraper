import ParameterBag from '@/scraper/fetcher/ParameterBag'

export default class FetcherParameterBag extends ParameterBag {
  /**
   * @var {number}
   */
  set radius (radius) {
    this._radius = radius
  }

  /**
   * @var {number}
   */
  get radius () {
    return this._radius
  }

  /**
   * @var {string}
   */
  set units (units) {
    this._units = units
  }

  /**
   * @var {string}
   */
  get units () {
    return this._units
  }

  /**
   * @var {number}
   */
  set latitude (latitude) {
    this._latitude = latitude
  }

  /**
   * @var {number}
   */
  get latitude () {
    return this._latitude
  }

  /**
   * @var {number}
   */
  set longitude (longitude) {
    this._longitude = longitude
  }

  /**
   * @var {number}
   */
  get longitude () {
    return this._longitude
  }

  /**
   * Creates a geocode string.
   *
   * @return {string}
   */
  geocode () {
    return this.latitude + ',' + this.longitude + ',' + this.radius + this.units
  }

  /**
   * Converts parameters into Node Twitter SDK friendly format.
   *
   * @return {object}
   */
  twittify () {
    return {
      count: 100,
      lang: this.lang,
      q: this.keywords.join(' OR '),
      geocode: this.geocode(),
      include_entities: true,
      tweet_mode: 'extended'
    }
  }
}
