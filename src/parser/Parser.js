import Tweet from './tweet/Tweet'
import TweetValidator from './tweet/TweetValidator'

exports = class Parser {
  /**
   * Class @constructor.
   *
   * @param {number} region
   * @param {ParserModule[]}
   */
  constructor (modules, region) {
    this.modules = modules

    this.region = region
  }

  /**
   * Pipes data from Twitter to Parser.
   *
   * @param {object} data
   * @return {void}
   */
  async pipe (data) {
    let withValidation = new TweetValidator()

    const tweet = new Tweet(withValidation).from(data)

    if (!tweet.isTweet()) {
      return
    }

    // Runs all the modules that parse data from the tweet.
    let competition = await this.runModules(tweet)

    // Saves the result to db.
    await this.saveCompetition(competition)
  }

  /**
   * Passes the competition through all registered modules.
   *
   * @param {Tweet} competition
   * @return {Promise<Tweet>}
   */
  async runModules (competition) {
    return this.modules.reduce(async (chain, ParserModule) => {
      // Runs every module. Each time the module calls next with a data,
      // that data is passed to the next module as carry.
      return new ParserModule(await chain).run()
    }, Promise.resolve(competition))
  }

  /**
   * Saves the competition into the Mysql.
   *
   * @param {object} competition
   * @return {void}
   */
  async saveCompetition (competition) {
    console.log('Save', competition)
  }
}
