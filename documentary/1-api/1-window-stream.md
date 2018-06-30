
### `WindowInfo` Stream

`WindowInfo` is a Readable stream open in object mode with high watermark set to 0 to prevent caching of window data when receiving streams haven't processed previous data. This ensures that the newer data is always as fresh as possible. The presence of the delay value ensures that no data is written before the delay has passed since last write.


```#### constructor => WindowInfo
[
  ["delay?", "number = 1000"]
]
```

Create a new stream. The `delay` argument controls how often to query data.

%EXAMPLE: example/example.js, ../src => window-info, javascript%
