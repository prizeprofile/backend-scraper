import Use from 'bookshelf'
import Storage from '@/storage/resolvers/MysqlResolver'
import plural from 'pluralize'

export class Model {
  /**
   * Class constructor.
   *
   */
  constructor () {
    this.hasTimestamps = true
  }
}

/**
 * Transform Model class into bookshelf model.
 */
export function forge (Model) {
  // Gets table name from the class name.
  Model.tableName = plural(Model.constructor.name.toLowerCase())

  let prototypes = {}

  // Attaches prototypes to model.
  if (typeof Model.use === 'function') {
    prototypes = Model.use().reduce((object, prototype) => {
      object[prototype.name.toLowerCase()] = prototype

      return object
    }, {})

    delete Model.use
  }

  return Use(Storage).Model.extend(Model, prototypes)
}
