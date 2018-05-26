import { resolve } from 'path'
import { spawn } from 'child_process'
import { Readable } from 'stream'
import { debuglog } from 'util'

const LOG = debuglog('window-info')
const PY = resolve(__dirname, 'run.py')

/**
 * @typedef {Object} Config
 * @property {number} delay How long wait before pushing new data.
 */

/**
 * A readable stream which emits information about windows.
 */
export default class WindowStream extends Readable {
  constructor({
    delay = 1000,
    ...options
  } = {}) {
    super({
      objectMode: true,
      highWaterMark: 0,
      ...options,
    })

    const args = [PY, 1]

    this.p = spawn('python', args)
    LOG('%s %s', 'python', args.join(' '))

    this._resetBuffer()
    this.timeP = 0

    this.p.stderr.on('data', (data) => {
      LOG('received data from python')
      this.buffer = Buffer.concat([this.buffer, data])
      try {
        const s = JSON.parse(this.buffer)
        this._resetBuffer()
        const timeN = new Date().getTime()
        const t = Math.max(delay + this.timeP - timeN, 0)

        LOG('timeout %s', t)
        this.timeout = setTimeout(() => {
          LOG('timeout out %s', t)
          this.push(s)
          this.timeP = new Date().getTime()
        }, t)
      } catch (err) {
        LOG(err.message)
      }
    })
    this.p.on('exit', () => {
      LOG('EXIT')
      clearTimeout(this.timeout)
      this.push(null)
    })
  }

  _resetBuffer() {
    this.buffer = new Buffer('')
  }

  _read() {
    LOG('_read')
    if (!this.destroying) {
      this.p.stdin.write('\n')
    } else {
      LOG('skip read because of destroying')
    }
  }

  _destroy() {
    this.destroying = true
    LOG('destroy')
    this.p.kill()
  }
}
