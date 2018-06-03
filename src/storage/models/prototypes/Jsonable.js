// TODO: This bit need hard refactor.

/**
 * Converts Model object to a JSON friendly format.
 *
 * @param base Model or collection of models.
 * @param omit Columns to omit in the JSON.
 */
export default function Jsonable (base, omit = ['id', 'created_at', 'updated_at']) {
  function parse ({ attributes }) {
    if (omit) {
      omit.map(key => delete attributes[key])
    }

    return attributes
  }

  return base.name === 'ModelBase' ? parse(base) : base.map(parse)
}
