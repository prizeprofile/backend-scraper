const modules = require('./modules')
const Parser = require('./Parser')

exports = async (tweets, region) => {
  let parser = new Parser(tweets, region)

  // Sends all tweets through parser.
  let jobs = tweets.map(tweet => parser.pipe(tweet).catch(console.error))

  // Parsing finishes once all tweets have returned some response.
  return Promise.all(jobs)
}
