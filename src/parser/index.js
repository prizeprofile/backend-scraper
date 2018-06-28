const modules = require('./modules')
const Parser = require('./Parser')

module.exports = async (tweets, region) => {
  let parser = new Parser(modules, region)

  // Sends all tweets through parser.
  let jobs = tweets.map(tweet => parser.pipe(tweet).catch(console.error))

  // Parsing finishes once all tweets have returned some response.
  return Promise.all(jobs)
}
