const modules = require('./modules')
const Parser = require('./Parser')

module.exports = (resources, region) => {
  let parser = new Parser(modules, region)
  let skipped = 0

  // Sends all resources through parser.
  let competitions = await Promise.all(resources
    .map(resource => parser.pipe(resource).catch(() => skipped++)))

  console.log(`Skipped ${skipped} competitions.`)

  // Parsing finishes once all resources have returned some response.
  return competitions
    .filter(competition => competition && typeof competition === 'object')
    .map(competition => competition.container)
}
