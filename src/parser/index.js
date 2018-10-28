const modules = require('./modules')
const Parser = require('./Parser')

module.exports = (resources, region) => {
  let parser = new Parser(modules, region)
  let skipped = 0

<<<<<<< HEAD
  // Sends all resources through parser.
  let jobs = resources.map(resource => parser.pipe(resource).catch(() => null))

  // Parsing finishes once all resources have returned some response.
  return Promise.all(jobs)
    .filter(Boolean)
    .then((competitions) => {
      return competitions
        .filter(competition => competition)
        .map(competition => competition.container)
    })
=======
  // Sends all tweets through parser.
  let competitions = await Promise.all(tweets.map(tweet => parser.pipe(tweet).catch(() => skipped++)))

  console.log(`Skipped ${skipped} competitions.`)

  // Parsing finishes once all tweets have returned some response.
  return competitions
    .filter(competition => competition && typeof competition === 'object')
    .map(competition => competition.container)
>>>>>>> develop
}
