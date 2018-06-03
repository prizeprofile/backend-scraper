import { Model, forge } from './Model'
import Promoter from './Promoter'

class Competition extends Model {
  /**
   * Binds a Competition to Promoter.
   */
  promoter () {
    return this.belongsTo(Promoter)
  }
}

export default forge(new Competition())
