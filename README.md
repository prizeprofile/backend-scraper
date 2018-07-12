# AWS Lambda: Twitter Scraper

_AUTHOR: MIchael Bausano_

Fetches tweets, parses them and publishes them to an SNS topic.

The event object has to be of following structure:

```
event.Records[0].Sns.message = {
    ...
    "region_id": Integer,
    "since_id": String,
    "params": Object
}
```

## Deployment
_TODO: Use some AWS automation tool rather than grunt._
Deploy staging with `grunt deploy` and production with `grunt deploy_prod`.

## Tests
Yet to be written.