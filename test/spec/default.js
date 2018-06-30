import { equal, ok } from 'zoroaster/assert'
import Context from '../context'
import WindowInfo from '../../src'
import { Transform } from 'stream'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  async 'emits window data'() {
    const ps = new WindowInfo()
    const d = []
    await new Promise((r) => {
      const ts = new Transform({
        transform(data, enc, next) {
          d.push(data)
          ps.destroy()
          next()
        },
        highWaterMark: 0,
        objectMode: true,
      })
      ps.pipe(ts)
      ps.on('end', () => {
        r()
      })
    })
    equal(d.length, 1)
    ok(Array.isArray(d[0]))
  },
  async 'emits window data with a given delay'() {
    const ps = new WindowInfo({
      delay: 500,
    })
    const d = []
    const ts = new Transform({
      transform(data, enc, next) {
        d.push(data)
        next()
      },
      highWaterMark: 0,
      objectMode: true,
    })
    const p = new Promise(r => ps.on('end', r))
    ps.pipe(ts)
    await new Promise(r => setTimeout(r, 1000))
    ps.destroy()
    await p
    equal(d.length, 2)
  },
}

export default T
