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

### 事件：request

每次收到一个请求时触发。注意每个连接又可能有多个请求(在keep-alive的连接中)。`request`是`http.IncomingMessage`的一个实例。`response`是`http.ServerResponse`的一个实例。

回调函数格式：

```c
function (request, response) {
}
```

实例：

```c
var http = require('http');

var server = http.createServer();

server.on('request', function (req, res) {
	res.writeHead('200');
	res.end('Hello world');
});

server.listen(8080);
```

### 事件：connection

新的TCP流建立时出发。`socket`是一个`net.Socket`对象。 通常用户无需处理该事件。 特别注意，协议解析器绑定套接字时采用的方式使套接字不会出发`readable`事件。 还可以通过`request.connection`访问`socket`。

回调函数格式：

```c
function (socket) { }
```

### 事件：close

服务器关闭时触发。

回调函数格式：

```c
function () { }
```

实例：

```c
var http = require('http');

var server = http.createServer();

server.on('close', function () {
	console.log('close');
});

setTimeout(function () {
	server.close();
}, 1000);

server.listen(8080);
```

### 事件：checkContinue

每当收到`Expect: 100-continue`的http请求时触发。 如果未监听该事件，服务器会酌情自动发送`100 Continue`响应。

处理该事件时，如果客户端可以继续发送请求主体则调用`response.writeContinue`， 如果不能则生成合适的HTTP响应（例如，400 请求无效）。

需要注意到, 当这个事件触发并且被处理后，`request`事件将不再会触发。

回调函数格式：

```c
function (request, response) {
}
```

### 事件：upgrade

每当一个客户端请求http升级时，该事件被分发。如果这个事件没有被监听，那么这些请求升级的客户端的连接将会被关闭。

回调函数格式：

```c
function (request, socket, head) {
}
```

 - request 是该HTTP请求的参数，与request事件中的相同。
 - socket 是服务端与客户端之间的网络套接字。
 - head 是一个Buffer实例，升级后流的第一个包，该参数可能为空。





