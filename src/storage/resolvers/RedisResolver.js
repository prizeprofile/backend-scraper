import Redis from 'redis'

const Cashe = Redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_POST
})

Cashe.auth(process.env.REDIS_PASS)

export default Cashe
