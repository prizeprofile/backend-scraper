import knex from 'knex'

const Builder = knex({
  client: 'mysql',
  debug: process.env.DEBUG_MODE === 'true',
  connection: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
    charset: 'UTF8MB4'
  }
})

Builder.on('query-error', dbError => console.error('db.builder.error', dbError))

export default Builder
