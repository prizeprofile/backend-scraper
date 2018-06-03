import Stream from './stream/Stream'
import StreamMentor from './stream/StreamMentor'
import StreamHealth from './stream/StreamHealth'
import StreamParameterBag from './stream/StreamParameterBag'

// NOTE: Just a test.
;(async function () {
  const mentor = new StreamMentor(Client, Parser)

  const stream = new Stream(mentor, new StreamHealth())

  const bag = new StreamParameterBag()
  bag.method = 'statuses/filter'
  bag.filter = 'medium'
  bag.lang = 'en'
  bag.keywords = [
    'retweet enter',
    'win',
    'chance',
    'winning',
    'winitwednesday',
    'freebiefriday',
    'competition'
  ]

  stream.attachBag(bag).flood()
}())
