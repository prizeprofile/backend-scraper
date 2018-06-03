import ParameterBag from '@/scraper/fetcher/ParameterBag'

export default class StreamParameterBag extends ParameterBag {
  /**
   * @var {string}
   */
  set filter (filter) {
    this._filter = filter
  }

  /**
   * @var {string}
   */
  get filter () {
    return this._filter
  }

  /**
   * Converts parameters into Node Twitter SDK friendly format.
   *
   * @return {object}
   */
  twittify () {
    return {
      filter_level: this.filter,
      language: this.lang,
      track: this.keywords.join(',')
    }
  }
}
