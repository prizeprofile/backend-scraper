// TODO: Default region.
const AWS = require('aws-sdk')
AWS.config.update({region: 'eu-west-1'})

const SQS = new AWS.SQS()
const SNS = new AWS.SNS()

exports.handler = async (event, context, callback) => {
  /**
   * A message is stringified object that contains
   * properties region_id, params and max_id.
   * @type {Object}
   */
  const message = JSON.parse(event.Records.pop().Sns.Message)
  const region_id = parseInt(message.region_id)

  /**
   * Tweet collection based on settings from message sorted by tweet id.
   * TODO: Handle errors.
   * @type {Object[]}
   */
  const tweets = await require('./src/fetcher')(message)
  const tweets_count = tweets.length

  // Sends a message to result queue which is read by
  // the scheduler and creates the cycle.
  // TODO: Error handling.
  SQS.sendMessage({
    MessageBody: JSON.stringify({
      region_id,
      tweets_count,
      max_id: tweets_count ? tweets[tweets_count - 1].id_str : null
    }),
    QueueUrl: process.env.TASK_QUEUE_URL
  })

  /**
   * Parses the tweets array and saves it into the database.
   * @throws {Error}
   * @type {Promise<void>}
   */
  const competitions = await require('./src/parser')(tweets, region_id)

  // Pushes parsed competitions to a lambda that saves them to the DB.
  await SNS
    .publish({
      Message: JSON.stringify({ region_id, competitions }),
      TopicArn: process.env.DB_SNS_TOPIC
    })
    .promise()

  callback(null, 'success')
}
