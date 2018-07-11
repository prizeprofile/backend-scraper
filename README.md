# AWS Lambda: Twitter Scraper

_AUTHOR: MIchael Bausano_

Fetches tweets, parses them and publishes them to an SNS topic.

The event object has to be of following structure:

`event.Recards[0].Sns.message`
