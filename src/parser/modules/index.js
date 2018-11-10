const Media = require('./Media')
const Source = require('./Source')
const Entrants = require('./Entrants')
const Blacklist = require('./Blacklist')
const EntryMethod = require('./EntryMethod')
const ValidCompetition = require('./ValidCompetition')
const CompetitionEndDate = require('./CompetitionEndDate')

module.exports = [
  Blacklist,
  Source,
  Media,
  ValidCompetition,
  EntryMethod,
  Entrants,
  CompetitionEndDate,
]
