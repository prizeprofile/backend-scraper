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
     * @param {any} resources Resource collection based on settings from message sorted by Resource id.
     */
    .then(({ resources, max_id }) => {
      const resources_count = resources.length

      // Sends a message to result queue which is read by
      // the scheduler and creates the cycle.
      return SQS.sendMessage({
        MessageBody: JSON.stringify({ region_id, resources_count, max_id }),
        QueueUrl: process.env.TASK_QUEUE_URL
      }).promise()
        .then(() => resources)
    })
      // Parses the resources array.
      .then(resources => require('./src/parser')(resources, region_id))
      // Pushes parsed competitions to a persistor queue.
      .then((competitions) => {
        return competitions.length
          ? SQS.sendMessage({
              MessageBody: JSON.stringify({ region_id, competitions, method: 'POST' }),
              QueueUrl: process.env.PERSISTOR_QUEUE_URL,
              MessageGroupId: Date.now() + []
            })
            .promise()
            .then(console.log)
            .then(() => competitions.length)
          : Promise.resolve(0)
      })
      .then(len => callback(null, `Import of ${len} competitions for region ${region_id} successful.`))
}
