# window-info

%NPM: window-info%

<!-- [![npm version](https://badge.fury.io/js/window-info.svg)](https://badge.fury.io/js/window-info) -->

```bash
yarn add -E window-info
```

`window-info` is a readable stream that pushes data about windows on screen on MacOS.

It opens a Python process which uses `Quartz` library to get information about windows.

## Table of Contents

%TOC%

## API

The default exported class is `WindowInfo` which is a Readable stream.

```js
import WindowInfo from 'window-info'
```

```#### constructor => WindowInfo
[
  ["delay?", "number = 1000"]
]
```

Create a new readable stream. It's open in an object mode and its high watermark is set to 0 to prevent caching of window data when receiving streams haven't processed previous data. This ensures that the newer data is always as fresh as possible. The delays value ensures no data is written before the delay has passed since last write.

%EXAMPLE: example/example.js, ../src => window-info, javascript%

%FORK-table example example/example.js%

<!--
```sh
[ [ 40, 'SystemUIServer', 'AppleClockExtra', 416 ],
  [ 20, 'Little Snitch Agent', 'Item-0', 348 ],
  [ 112, 'Creative Cloud', 'Item-0', 672 ],
  [ 107, 'Tunnelblick', 'Item-0', 1285 ],
  [ 99, 'Avira', 'Item-0', 677 ],
  [ 92, 'PostgresMenuHelper', 'Item-0', 694 ],
  [ 28, 'SystemUIServer', 'AppleBluetoothExtra', 416 ],
  [ 32, 'SystemUIServer', 'AirPortExtra', 416 ],
  [ 36, 'SystemUIServer', 'AppleTextInputExtra', 416 ],
  [ 44, 'SystemUIServer', 'AppleUser', 416 ],
  [ 51, 'Spotlight', 'Item-0', 421 ],
  [ 25, 'SystemUIServer', 'Siri', 416 ],
  [ 23, 'SystemUIServer', 'NotificationCenter', 416 ],
  [ 3, 'Window Server', 'Menubar', 219 ],
  [ 480, 'Code', 'example.js — window-info', 405 ],
  [ 127, 'Code', 'launch.json — appshot', 405 ],
  [ 86, 'Code', 'meta.jsx — koa2-jsx', 405 ],
  [ 89,
    'Google Chrome',
    'Stream | Node.js v10.2.1 Documentation',
    410 ],
  [ 465, 'Finder', 'expected-cloned', 417 ],
  [ 78, 'iTerm', '1. bash', 413 ],
  [ 4, 'Window Server', 'Backstop Menubar', 219 ],
  [ 66, 'Finder', '', 417 ],
  [ 49, 'Dock', 'Desktop Picture - Sierra 2.jpg', 415 ],
  [ 2, 'Window Server', 'Desktop', 219 ] ]
``` -->

```#### destroy
```

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

%TYPE true
<p name="winid" type="number" required>
  <d>position 0</d>
  <e>480<br/>89</e>
</p>
<p name="App Name" type="string" required>
  <d>position 1</d>
  <e>Code<br/>Google Chrome</e>
</p>
<p name="Window Title" type="string" required>
  <d>position 2</d>
  <e>example.js — window-info<br/>Stream | Node.js v10.2.1 Documentation</e>
</p>
<p name="pid" type="number" required>
  <d>position 3</d>
  <e>405<br>410</e>
</p>
%
