const AWS = require('aws-sdk')
AWS.config.update({region: 'eu-west-1'})

const SQS = new AWS.SQS()

exports.handler = (event, _, callback) => {
  /**
   * A message is stringified object that contains
   * properties region_id, params and max_id.
   * @type {Object}
   */
  const message = JSON.parse(event.Records.pop().Sns.Message)
  message.params = JSON.parse(message.params)
  
  const region_id = parseInt(message.region_id)

  return require('./src/fetcher')(message)
    /**
     * @param {any} tweets Tweet collection based on settings from message sorted by tweet id.
     */
    .then((tweets) => {
      const tweets_count = tweets.length

      // Sends a message to result queue which is read by
      // the scheduler and creates the cycle.
      return SQS.sendMessage({
        MessageBody: JSON.stringify({
          region_id,
          tweets_count,
          max_id: tweets_count ? tweets[tweets_count - 1].id_str : null
        }),
        QueueUrl: process.env.TASK_QUEUE_URL
      }).promise()
        .then(() => tweets)
    })
      // Parses the tweets array.
      .then(tweets => require('./src/parser')(tweets, region_id))
      // Pushes parsed competitions to a persistor queue.
      .then((competitions) => {
        return SQS.sendMessage({
          MessageBody: JSON.stringify({ region_id, competitions }),
          QueueUrl: process.env.PERSISTOR_QUEUE_URL,
          MessageGroupId: Date.now() + []
        })
        .promise()
      })
      .then(() => callback(null, `Import for region ${region_id} successful.`))
}
