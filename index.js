// TODO: Default region.
const SQS = new require('aws-sdk').SQS({ region: 'eu-west-1' })

exports.handler = async (event, context, callback) => {
  /**
   * A message is stringified object that contains
   * properties region_id, params and max_id.
   * @type {Object}
   */
  const message = JSON.parse(event.Records.pop().Sns.message)

  /**
   * Tweet collection based on settings from message.
   * TODO: Handle errors.
   * @type {Object[]}
   */
  const tweets = await require('./fetcher')(message)

  // Sends a message to result queue which is read by
  // the scheduler and creates the cycle.
  SQS.sendMessage({
    MessageBody: {
      tweets_count: tweets.length,
      region_id: parseInt(message.region_id),
      max_id: tweets[tweets.length - 1].data.tweet_id
    },
    QueueUrl: process.env.TASK_QUEUE_URL
  })

  /**
   * Parses the tweets array and saves it into the database.
   * @throws {Error}
   * @type {Promise<void>}
   */
  require('./parser')(tweets)
    .then(() => callback(null, 'success'))
    .catch(e => callback(JSON.stringify(e)))
}
