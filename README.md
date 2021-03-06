# window-info

[![npm version](https://badge.fury.io/js/window-info.svg)](https://npmjs.org/package/window-info)

`window-info` is a readable stream that pushes data about windows on screen on MacOS.

It opens a Python process which uses `Quartz` library to get information about windows.

```sh
yarn add -E window-info
```

## Table of Contents

- [Table of Contents](#table-of-contents)
- [API](#api)
  * [`WindowInfo` Stream](#windowinfo-stream)
    * [`constructor(delay?: number = 1000): WindowInfo`](#constructordelay-number--1000-windowinfo)
    * [`destroy(): void`](#destroy-void)
  * [`Data` Type](#data-type)
    * [<code>winid</code>](#winid)
    * [<code>App Name</code>](#app-name)
    * [<code>Window Title</code>](#window-title)
    * [<code>pid</code>](#pid)

## API

The default exported class is `WindowInfo` which is a Readable stream.

```js
import WindowInfo from 'window-info'
```

### `WindowInfo` Stream

`WindowInfo` is a Readable stream open in object mode with high watermark set to 0 to prevent caching of window data when receiving streams haven't processed previous data. This ensures that the newer data is always as fresh as possible. The presence of the delay value ensures that no data is written before the delay has passed since last write.


#### `constructor(`<br/>&nbsp;&nbsp;`delay?: number = 1000,`<br/>`): WindowInfo`

Create a new stream. The `delay` argument controls how often to query data.

```javascript
import { Transform } from 'stream'
import WindowInfo from 'window-info'

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
        this.push(JSON.stringify([
          ['winid', 'App Name', 'Window Title', 'pid'],
          ...data,
        ]))
        next()
      },
      writableObjectMode: true,
    }))
    .pipe(process.stdout)
})()
```

| winid | App Name | Window Title | pid |
| ----- | -------- | ------------ | --- |
| 33 | SystemUIServer | AppleClockExtra | 386 |
| 73 | Avira | Item-0 | 501 |
| 60 | PostgresMenuHelper | Item-0 | 525 |
| 51 | Little Snitch Agent | Item-0 | 348 |
| 20 | SystemUIServer | AppleBluetoothExtra | 386 |
| 24 | SystemUIServer | AirPortExtra | 386 |
| 29 | SystemUIServer | AppleTextInputExtra | 386 |
| 37 | SystemUIServer | AppleUser | 386 |
| 45 | Spotlight | Item-0 | 405 |
| 18 | SystemUIServer | Siri | 386 |
| 16 | SystemUIServer | NotificationCenter | 386 |
| 3 | Window Server | Menubar | 177 |
| 4292 | Visual Studio Code | 2-fork.md — window-info | 367 |
| 4291 | Visual Studio Code | package.json — documentary | 367 |
| 4171 | Google Chrome | artdecocode/window-info: Window Info is a readable stream that pushes data about windows on screen on MacOS. | 51791 |
| 59 | iTunes | iTunes | 382 |
| 4 | Window Server | Backstop Menubar | 177 |
| 49 | Finder |  | 387 |
| 41 | Dock | Desktop Picture - Sierra 2.jpg | 384 |
| 2 | Window Server | Desktop | 177 |


#### `destroy(): void`

Call the `destroy` method to kill the underlying python process and end the stream.

### `Data` Type

Each data row in the read chunk contains information about open windows in form of an array.

For example, `WindowInfo` can generate the following:

```js
[
  [480, "Code", "example.js — window-info", 405],
  [89, "Google Chrome", "Stream | Node.js v10.2.1 Documentation", 410]
]
```

The type definition then is according to the position in the array.

<table>
 <thead>
  <tr>
   <th>Property</th>
   <th>Type</th>
   <th>Description</th>
   <th>Example</th>
  </tr>
 </thead>
 <tbody>
   <tr>
  <td><a name="winid"><code>winid</code></a></td>
  <td><em>number</em></td>
  <td>position 0</td>
  <td>480<br/>89</td>
 </tr>
 <tr>
  <td><a name="app-name"><code>App Name</code></a></td>
  <td><em>string</em></td>
  <td>position 1</td>
  <td>Code<br/>Google Chrome</td>
 </tr>
 <tr>
  <td><a name="window-title"><code>Window Title</code></a></td>
  <td><em>string</em></td>
  <td>position 2</td>
  <td>example.js — window-info<br/>Stream | Node.js v10.2.1 Documentation</td>
 </tr>
 <tr>
  <td><a name="pid"><code>pid</code></a></td>
  <td><em>number</em></td>
  <td>position 3</td>
  <td>405<br>410</td>
 </tr>
 </tbody>
</table>


---

(c) [Art Deco][1] 2018

[1]: https://artdeco.bz
