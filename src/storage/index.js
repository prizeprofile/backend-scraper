import log from '@/logger'
import Builder from './resolvers/MysqlResolver'
import Cashe from './resolvers/RedisResolver'

/**
 * Executes query on DB. If cache is true and query is a select, searches Redis
 * cashe first.
 *
 * @param params object Key value pairs where key is knex method and value it's args.
 * @return Promise that resolves with returned JSON or null.
 */
export default (params, cache = true) => {
  // Compose the query out of given parameters.
  let query = Builder

  let isSelect = false

  for (let method in params) {
    let args = params[method]

    if (method === 'select') { isSelect = true }

    // Applies value of param to it's key.
    query = query[method].apply(query, Array.isArray(args) ? args : [args])
  }

  // If query can't be cached.
  if (!cache || !isSelect) { return query }

  // Waits for Redis to load and then searches for SQL.
  return new Promise((resolve) => {
    let sql = query.toString()

    Cashe.on('ready', () => {
      // Tried to fetch cashed data.
      Cashe.get(sql, (casheError, cached) => {
        if (cached && !casheError) {
          // Returns cached JSON.
          return resolve(JSON.parse(cached))
        }

        // If can't provide with cashed data, retrivies fresh from db.
        query.then((result) => {
          resolve(Promise.resolve(result))

          // Cashes the query.
          Cashe.set(sql, JSON.stringify(result))
          Cashe.expire(sql, process.env.REDIS_EXPIRE)
        }).catch(dbError => log('db.builder.error', dbError))
      })
    }).on('error', () => resolve(query))
  })
}
