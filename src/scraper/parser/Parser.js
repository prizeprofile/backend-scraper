import Tweet from '@/scraper/parser/tweet/Tweet'
import Competition from '@/storage/models/Competition'
import TweetValidator from '@/scraper/parser/tweet/TweetValidator'

export default class Parser {
  /**
   * Class @constructor.
   *
   * @param {ParserModule[]}
   */
  constructor (modules) {
    this.modules = modules
  }

  /**
   * Pipes data from Twitter to Parser.
   *
   * @param {ParameterBag} bag
   * @param {object} data
   * @return {void}
   */
  async pipe (bag, data) {
    let withValidation = new TweetValidator()

    const competition = new Tweet(withValidation).from(data)

    if (!competition.isTweet()) {
      return
    }

    // All following DB queries should be put into a transaction.
    this.runModules(competition)
      .then(competition => this.saveCompetition(competition))
  }

  /**
   * Passes the competition through all registered modules.
   *
   * @param {Tweet} competition
   * @param {Transaction} trx
   * @return {Promise<Tweet>}
   */
  async runModules (competition) {
    return this.modules.reduce((chain, ParserModule) => {
      // Runs every module. Each time the module calls next with a data,
      // that data is passed to the next module as carry.
      return chain.then(carry => new Promise(resolve => {
        new ParserModule(carry, resolve)
          .run()
      }))
    }, Promise.resolve(competition))
  }

  /**
   * Saves the competition into the Mysql.
   *
   * @param {object} competition
   * @return {void}
   */
  async saveCompetition (competition) {
    console.log(competition)
    // TODO: Bear with me.
    new Competition({
      text: competition.data.tweet.text,
      posted: competition.data.tweet.created_at,
      location: competition.data.tweet.location,
      tweet_id: competition.data.tweet.tweet_id,
      retweets: competition.data.tweet.retweets
    }).save()
  }
}
