
module.exports = class Fetcher {
  /**
   * Class constructor.
   *
   * @param {Twitter} client
   * @param {ParameterBag} bag
   */
  constructor (client, bag) {
    this.client = client

    this.bag = bag
  }

  /**
   * Loads an array with resources that match the query in the parameter bag.
   *
   * @return {Promise<number>}
   */
  scrape () {
    let params = this.bag.twittify()

    return new Promise((resolve, reject) => {
      this.client.get(this.bag.method, params, (error, data) => {

        if (error) {
          return reject(error.code)
        }

        resolve({
          resources: data.statuses,
          max_id: data.search_metadata.max_id_str
        })
      })
    })
  }
}
