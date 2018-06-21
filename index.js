// TODO: Default region.
const SQS = new require('aws-sdk').SQS({ region: 'eu-west-1' })

exports.handler = async (event, context, callback) => {
  /**
   * A message is stringified object that contains
   * properties region_id, params and max_id.
   * @type {Object}
   */
  const message = JSON.parse(event.Records.pop().Sns.message)
  const region_id = parseInt(message.region_id)

  /**
   * Tweet collection based on settings from message sorted by tweet id.
   * TODO: Handle errors.
   * @type {Object[]}
   */
  const tweets = await require('./src/fetcher')(message)
  console.log('tweets', tweets)

  // Sends a message to result queue which is read by
  // the scheduler and creates the cycle.
  SQS.sendMessage({
    MessageBody: {
      region_id,
      tweets_count: tweets.length,
      max_id: tweets[tweets.length - 1].data.tweet_id
    },
    QueueUrl: process.env.TASK_QUEUE_URL
  })

  /**
   * Parses the tweets array and saves it into the database.
   * @throws {Error}
   * @type {Promise<void>}
   */
  require('./src/parser')(tweets, region_id)
    .then(() => callback(null, 'success'))
    .catch(e => callback(JSON.stringify(e)))
}
