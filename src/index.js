const AWS = require('aws-sdk')
const SQS = new AWS.SQS({ region: 'eu-west-1' })

exports.handler = async (event, context, callback) => {
  const message = JSON.parse(event.Records.pop().Sns.Message)
  const response = {
    max_id: parseInt(message.since_id) + Math.round(Math.random() * 98),
    region_id: parseInt(message.region_id),
    tweets_count: 98
  }

  return new Promise((resolve, reject) => {
    SQS.sendMessage({
      MessageBody: JSON.stringify(response),
      QueueUrl: process.env.TASK_QUEUE_URL
    }, err => err ? resolve() : reject(err))
  })
  .then(() => callback(null, 'success'))
  .catch(e => callback(JSON.stringify(e)))
}
