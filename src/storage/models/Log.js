import { Model, forge } from './Model'
import Jsonable from './prototypes/Jsonable'

class Log extends Model {
  /**
   * Define prototypes which this model uses.
   * TODO: Needs refactor.
   *
   * @return {Prototype}
   */
  use () {
    return [Jsonable]
  }
}

export default forge(new Log())
