const AWS = require('aws-sdk')
const SQS = new AWS.SQS({ region: 'eu-west-1' })
const test = require('./test')

exports.handler = async (event, context, callback) => {
  const message = JSON.parse(event.Records.pop().Sns.Message)
  const response = test(message)
  console.log(response)

  return new Promise((resolve, reject) => {
    SQS.sendMessage({
      MessageBody: JSON.stringify(response),
      QueueUrl: process.env.TASK_QUEUE_URL
    }, err => err ? resolve() : reject(err))
  })
  .then(() => callback(null, 'success'))
  .catch(e => callback(JSON.stringify(e)))
}
