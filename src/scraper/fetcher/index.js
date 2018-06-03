import Twitter from 'twitter'
import Parser from '@/scraper/parser/Parser'
import Fetcher from './standard/Fetcher'
import { Modules } from '@/scraper/parser/config'
import FetcherParameterBag from './standard/FetcherParameterBag'

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET
})

;(async function () {
  const bag = new FetcherParameterBag()
  bag.pack({
    method: 'search/tweets',
    lang: 'en',
    latitude: 53.81982,
    longitude: -2.406348,
    radius: 500,
    units: 'km',
    keywords: ['retweet enter', 'win', 'chance', 'winning', 'winitwednesday', 'freebiefriday', 'competition']
  })

  const parser = new Parser(Modules)

  const fetcher = new Fetcher(client, parser)

  fetcher.attachBag(bag).scrape()
}())

export default null
