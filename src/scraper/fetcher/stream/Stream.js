
export default class Stream {
  /**
   * Assigns stream a random identifier.
   *
   * @return {string}
   */
  get id () {
    return this._id
  }

  /**
   * Returns stream object.
   *
   * @return {any} stream
   */
  get stream () {
    return this._stream || null
  }

  /**
   * Class constructor.
   *
   * @param {StreamMentor} mentor
   * @param {StreamHealth} health
   */
  constructor (mentor, health) {
    this._id = Math.random().toString(16).substring(2)

    this.health = health

    // Registers mentor.
    this.mentor = mentor.assign(this)
  }

  /**
   * Setter for the parameter bag.
   *
   * @param {ParameterBag} bag
   * @return {Stream}
   */
  attachBag (bag) {
    this.bag = bag

    return this
  }

  /**
   * Starts listening to the Twitter API streamed events.
   *
   * @return {Stream}
   */
  flood () {
    this.health.reportFlood()

    this._stream = this.mentor.client
      .stream(this.bag.method, this.bag.twittify())
      .on('data', tweet => this.mentor.pipe(this, tweet))
      .on('error', error => this.mentor.heal(this, error))

    return this
  }

  /**
   * Stops the stream.
   *
   * @return {Stream}
   */
  destroy () {
    this.stream.destroy()

    delete this._stream

    return this
  }
}
