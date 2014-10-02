Node Stream
========

## Readable Stream

### Event 事件

#### readable

当一个数据块可以从流中被读出时，它会触发一个 `readable`事件。

在某些情况下，假如未准备好，监听一个`readable`事件会使得一些数据从底层系统被读出到内部缓冲区中。

实例：

```c
var fs = require('fs');

var readable = fs.createReadStream('./test.txt');

readable.on('readable', function () {
	var chunk;
	while((chunk = readable.read()) != null) {
		console.log(chunk.length);
	}
});
```

#### data 事件

回调函数接受的参数：

 - chunk `Buffer | String`：数据块

当你监听了一个`data`事件后，此时会使得流转变为流动模式（flowing mode），并且数据会传递到回调函数中。

如果你想从流中尽快取出所有数据，这是最好的方式。

实例：

```c
var fs = require('fs');

var readable = fs.createReadStream('./test.html');
var chunks = [];

readable.on('data', function (data) {
	chunks.push(data);
});

readable.on('end', function () {
	console.log(Buffer.concat(chunks).toString());
});
```

#### end 事件



