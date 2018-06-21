import log from '@/logger'

export default class ParserModule {
  /**
   * Class @constructor.
   *
   * @param {object} competition
   * @param {function} next
   */
  constructor (competition, next) {
    // Stores the original competition object.
    this._bak = Object.assign({}, competition)

    this.competition = competition

    this._next = next
  }

  /**
   * Main logic method.
   *
   * @abstract
   * @return {void}
   */
  run () { throw new Error('Method run is abstract.') }

  /**
   * The competition is rejected and won't be stored.
   *
   * @param {any} reason
   * @param {bool} shouldBeLogged
   * @return {void}
   */
  $reject (reason, shouldBeLogged = true) {
    if (shouldBeLogged) {
      log('scraper.parser.module.rejected', reason)
    }

    this._rejected = true

    // TODO: Create a custom exception.
    throw new Error(reason)
  }

  /**
   * Calls next module with the original competition data.
   *
   * @return {void}
   */
  $skip () {
    this.$next(this._bak)
  }

  /**
   * Pipes the data to next parsing module.
   *
   * @param {object} competition
   * @return {void}
   */
  $next (competition = null) {
    if (this._rejected) {
      return
    }

    this._next(competition || this.competition)
  }

  /**
   * Setter for transaction object.
   */
  transact (trx) {
    this.trx = trx
  }
}
