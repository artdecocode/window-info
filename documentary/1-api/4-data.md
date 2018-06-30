
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
<p name="winid" type="number">
  <d>position 0</d>
  <e>480<br/>89</e>
</p>
<p name="App Name" type="string">
  <d>position 1</d>
  <e>Code<br/>Google Chrome</e>
</p>
<p name="Window Title" type="string">
  <d>position 2</d>
  <e>example.js — window-info<br/>Stream | Node.js v10.2.1 Documentation</e>
</p>
<p name="pid" type="number">
  <d>position 3</d>
  <e>405<br>410</e>
</p>
%
