const modules = require('./modules')
const Parser = require('./Parser')

module.exports = (tweets, region) => {
  let parser = new Parser(modules, region)
  let skipped = 0

  // Sends all tweets through parser.
  let competitions = await Promise.all(tweets.map(tweet => parser.pipe(tweet).catch(() => skipped++)))

  console.log(`Skipped ${skipped} competitions.`)

  // Parsing finishes once all tweets have returned some response.
  return competitions
    .filter(competition => competition && typeof competition === 'object')
    .map(competition => competition.container)
}
