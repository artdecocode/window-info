import { equal } from 'zoroaster/assert'
import Context from '../context'
import windowInfo from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof windowInfo, 'function')
  },
  async 'calls package without error'() {
    await windowInfo()
  },
  async 'calls test context method'({ example }) {
    await example()
  },
}

export default T
