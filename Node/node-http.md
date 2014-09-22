HTTP
========

## http.createServer([requestListener])

该方法返回一个新的服务器对象。

参数`requestListener`是一个函数,它将会自动加入到 `request`事件的监听队列。

实例：

```c
var http = require('http');

var server = http.createServer(function (req, res) {
	res.writeHead(200);
	res.end('Hello World');
});

server.listen(8080);
```

## Class http.server

这是一个包含下列事件的EventEmitter：


