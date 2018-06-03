import { Model, forge } from './Model'
import Competition from './Competition'

class Promoter extends Model {
  /**
   * Resolves all Competitions from a Promoter.
   */
  competition () {
    return this.hasMany(Competition)
  }
}

export default forge(new Promoter())
