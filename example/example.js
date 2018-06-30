import { Transform } from 'stream'
import WindowInfo from '../src'

(async () => {
  const wi = new WindowInfo({
    delay: 1000,
  })
  let receivedData = 0
  const limit = 1
  wi
    .pipe(new Transform({
      transform(data, enc, next) {
        if (receivedData < limit) {
          this.push(data)
        } else {
          // limit reached
          wi.destroy()
        }
        receivedData++
        next()
      },
      objectMode: true,
      highWaterMark: 0, // disable receiving buffering
    }))
    .pipe(new Transform({
      transform(data, enc, next) {
        this.push(JSON.stringify([['winid', 'App Name', 'Window Title', 'pid'], ...data]))
        next()
      },
      writableObjectMode: true,
    }))
    .pipe(process.stdout)
})()
