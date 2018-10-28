const modules = require('./modules')
const Parser = require('./Parser')

module.exports = (resources, region) => {
  let parser = new Parser(modules, region)

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
}
