title: SeaJS实例解析内部执行过程——从use说起
date: 2014-03-28 10:19:04
categories: JavaScript
tags: JavaScript
---

为了从use说明seajs的内部执行过程，下面的代码就是本文用到的代码（代码出处：[实例解析 SeaJS 内部执行过程 - 从 use 说起][1]）：

```c
seajs.config({
	alias: {
		'jquery': 'jquery/1.7.2/jquery-debug.js'
	}
});
```

`index.js:`

```c
seajs.use(['./a','jquery'],function(a,$){
	var num = a.a;
	$('#J_A').text(num);
});
```
 
 `a.js:`

```c
define(function(require,exports,module){
	var b = require('./b');
	var a = function(){
		return 1 + parseInt(b.b());
	}
	exports.a = a;
});
```
 
 `b.js:`

```c
define(function(require,exports,module){
	var c = require('./c');

	var b = function(){
		return 2 + parseInt(c.c());
	}
	exports.b = b;
});
```
 
 `c.js:`

```c 
define(function(require,exports,module){
	var c = function(){
		return 3;
	}
	exports.c = c;
});
```
 
 
由上述可知 a 依赖 b ，b依赖c

首先将会执行seajs本身，在这个过程中将会定义其中一些全局的方法，seajs多版本的容错等等 。

当程序进入到`index.js`：
 
```c
seajs.use(['./a','jquery'],function(a,$){
	var num = a.a;
	$('#J_A').text(num);
});
```
 
 seajs将调用use方法：

```c 
// Public API
// 在加载其他模块之前，先加载预加载模块后，然后执行回调函数，如果没有则顺序执行
seajs.use = function(ids, callback) {
  Module.preload(function() {
	Module.use(ids, callback, data.cwd + "_use_" + cid())
  })
  return seajs
}
```
 
 `use`方法中首先会调用`Module.preload`加载预加载的模块，然后执行其中的回调，如果没有预加载模块则顺序执行其中的回调函数：

```c
// Load preload modules before all other modules
// 在加载其他模块前加载预加载模块
Module.preload = function(callback) {
  // 从data中获取预加载的模块
  var preloadMods = data.preload
  // 预加载模块的数量
  var len = preloadMods.length

  if (len) {
	// 通过Module.use()方法加载预加载模块，并执行回调
	Module.use(preloadMods, function() {
	  // Remove the loaded preload modules
	  // 移除已经加载的预加载模块
	  preloadMods.splice(0, len)

	  // Allow preload modules to add new preload modules
	  Module.preload(callback)
	}, data.cwd + "_preload_" + cid())
  }
  else {  // 没有预加载模块直接执行回调函数
	callback()
  }
}
```
 
 示例代码中没有预加载模块，所以直接执行回调函数，即执行`Module.use(ids, callback, data.cwd + "_use_" + cid())`

```c
// Use function is equal to load a anonymous module
// seajs.use(["./a", "./b"], function () {});
// uri = data.cwd + "_use_" + cid()
Module.use = function (ids, callback, uri) {
  // 如果缓存的模块中存在对应的模块则直接返回，否则新建一个模块
  var mod = Module.get(uri, isArray(ids) ? ids : [ids])

  // 定义模块的回调函数，模块和模块依赖加载完后执行
  // 只有use方法中需要定义回调函数，等模块的依赖加载完，执行callback
  // callback的作用是执行依赖模块，返回exports后，在执行seajs.use中的回调函数
  mod.callback = function() {
	var exports = []
	// 实际调用Module.prototype.resolve()
	// 解析出模块依赖的路径，就是将deps的路径解析出来
	var uris = mod.resolve()

	for (var i = 0, len = uris.length; i < len; i++) {
	  exports[i] = cachedMods[uris[i]].exec()
	}

	if (callback) {
	  callback.apply(global, exports)
	}

	delete mod.callback
  }

  mod.load()
}
```
 
在`Module.use` 方法中，首先会使用`Module.get`获取一个模块，这个`Module.get`方法首先会判断cachedMods中是否存在对应的模块，如没有则新建一个模块：

```c
// Get an existed module or create a new one
// 首先判断缓存模块中是否有对应的模块，有则直接返回，否则新建一个模块
Module.get = function(uri, deps) {
  return cachedMods[uri] || (cachedMods[uri] = new Module(uri, deps))
}
```
 
`uri = data.cwd + "_use_" + cid()`，新建的模块`cachedMods[uri] = new Module(uri, deps)`存入`cachedMods`中，并赋给`mod`，这里的`deps = ['./a', 'jquery']`，然后是定义`mod.callback`，这个会在`mod`执行到`onload`时会执行`mod.callback`，最后是执行`mod.load()`，`mod.load()`实际上是调用了下面的代码：

```c
// Load module.dependencies and fire onload when all done
// 加载模块的依赖并在全部onload后触发
Module.prototype.load = function() {
  var mod = this

  // If the module is being loaded, just wait it onload call
  // 如果模块已经开始加载，则直接等待加载完onload
  if (mod.status >= STATUS.LOADING) {
	return
  }

  // 将模块状态设置为正在加载LOADING
  mod.status = STATUS.LOADING

  // Emit `load` event for plugins such as combo plugin
  // 解析出模块所依赖模块的路径
  var uris = mod.resolve()
  // 触发load事件
  emit("load", uris)

  // 获取模块未加载的模块数量
  var len = mod._remain = uris.length
  var m

  // Initialize modules and register waitings
  // 初始化依赖的模块并注册其等待数
  for (var i = 0; i < len; i++) {
	// 获取一个当前依赖的模块数，Module.get首先会判断cachedMods中是否存在，如不存在则新建一个模块
	m = Module.get(uris[i])

	// 如果当前依赖模块的状态小于LOADED，则将需要依赖当前模块的数量加1
	if (m.status < STATUS.LOADED) {
	  // Maybe duplicate
	  // mod模块依赖的模块m的_waitings[mod.uri]加1
	  m._waitings[mod.uri] = (m._waitings[mod.uri] || 0) + 1
	}
	// 否则模块依赖减1
	else {
	  mod._remain--
	}
  }

  // 如果模块依赖全部加载完，执行onload方法
  if (mod._remain === 0) {
	mod.onload()
	return
  }

  // Begin parallel loading
  // 开始并行加载
  var requestCache = {}

  for (i = 0; i < len; i++) {
	m = cachedMods[uris[i]]

	// 如果依赖的某模块的status小于FETCHING，则通过m.fetch(requestCache)获取模块
	if (m.status < STATUS.FETCHING) {
	  m.fetch(requestCache)
	}
	// 如果依赖的某模块状态为SAVED，则执行load()方法，即加载它自己的依赖模块，并注册依赖模块的等待数等
	else if (m.status === STATUS.SAVED) {
	  m.load()
	}
  }

  // Send all requests at last to avoid cache bug in IE6-9. Issues#808
  // https://github.com/seajs/seajs/issues/808
  // IE6-9的缓存bug，
  for (var requestUri in requestCache) {
	if (requestCache.hasOwnProperty(requestUri)) {
	  requestCache[requestUri]()
	}
  }
}
```

这个函数是干吗的呢？就是去加载模块所依赖的模块，并在模块的依赖加载完后执行`mod.onload()`，在示例代码中，因为依赖的模块都没有加载，所以先要执行模块的`fetch`获取模块：

```c
// Fetch a module
// 获取一个模块
Module.prototype.fetch = function(requestCache) {
  var mod = this
  // 模块的路径
  var uri = mod.uri

  // 将模块状态设置为FETCHING
  mod.status = STATUS.FETCHING

  // Emit `fetch` event for plugins such as combo plugin
  var emitData = { uri: uri }
  emit("fetch", emitData)
  var requestUri = emitData.requestUri || uri

  // Empty uri or a non-CMD module
  // 如果是空的uri或者是fetchedList中已经存在对应的模块时，直接返回
  if (!requestUri || fetchedList[requestUri]) {
	mod.load()
	return
  }

  // 如果模块存在于正在获取的列表中，则将模块加入该uri对应的回调函数列表中
  if (fetchingList[requestUri]) {
	callbackList[requestUri].push(mod)
	return
  }

  // 如果即不在fetchedList中，也不在fetchingList中，则分别在请求列表和回调函数列表中添加其信息
  fetchingList[requestUri] = true
  callbackList[requestUri] = [mod]

  // Emit `request` event for plugins such as text plugin
  emit("request", emitData = {
	uri: uri,
	requestUri: requestUri,
	onRequest: onRequest,
	charset: data.charset
  })

  // 请求对应的模块，请求完成后执行回调函数onRequest
  if (!emitData.requested) {
	requestCache ?
		requestCache[emitData.requestUri] = sendRequest :
		sendRequest()
  }

  function sendRequest() {
	seajs.request(emitData.requestUri, emitData.onRequest, emitData.charset)
  }

  // 模块请求完成后执行的回调函数
  function onRequest() {
	// 删除fetchingList中对应的请求模块
	delete fetchingList[requestUri]
	// 将fetchedList中该模块uri对应的值设为true
	fetchedList[requestUri] = true

	// Save meta data of anonymous module
	// 设置匿名模块的元信息，在匿名模块的define中，会将元信息保存在anonymousMeta中
	if (anonymousMeta) {
	  Module.save(uri, anonymousMeta)
	  anonymousMeta = null
	}

	// Call callbacks
	// 执行回调函数列表中对应模块的load方法
	var m, mods = callbackList[requestUri]
	delete callbackList[requestUri]
	while ((m = mods.shift())) m.load()
  }
}
```

 
下面首先看看上面代码中的`seajs.request`方法，这个方法是请求响应url的资源文件，并在请求完后执行回调函数：

```c
// 请求资源文件url，回调函数，字符编码
function request(url, callback, charset) {
  // 判断请求的是否为CSS文件
  var isCSS = IS_CSS_RE.test(url)
  // 如果为CSS文件，则创建link标签，否则创建script标签
  var node = doc.createElement(isCSS ? "link" : "script")

  // 如果charset存在
  if (charset) {
	// 如果charset为函数，则通过函数返回值（参数为url）作为charset
	var cs = isFunction(charset) ? charset(url) : charset
	if (cs) {
	  node.charset = cs
	}
  }

  // 添加onload事件，onload后执行回调函数callback
  addOnload(node, callback, isCSS, url)

  // 如果是CSS文件，则为其添加rel和href属性
  if (isCSS) {
	node.rel = "stylesheet"
	node.href = url
  }
  // 如果为JS文件，则添加async为true，src为请求的url
  else {
	node.async = true
	node.src = url
  }

  // For some cache cases in IE 6-8, the script executes IMMEDIATELY after
  // the end of the insert execution, so use `currentlyAddingScript` to
  // hold current node, for deriving url in `define` call
  // 以下这些代码是为了兼容IE
  // 其他浏览器都会在异步请求完毕插入页面后执行该script，但是ie不行，必须要插入到base标签前
  // 设置当前添加的脚本为node
  currentlyAddingScript = node

  // ref: #185 & http://dev.jquery.com/ticket/2709
  baseElement ?
	  head.insertBefore(node, baseElement) :
	  head.appendChild(node)

  currentlyAddingScript = null
}
```
 
然后在看看元信息是怎么得来的，因为每个模块都是通过`define`定义的，具体规范请看：[CMD 模块定义规范][2]。模块请求完后就会执行模块内的`define`方法，下面看看`define`方法的源代码：

```c
// Define a module
// global.define = Module.define
// 1. 根据参数的数量和类型执行相应的操作
// 2. 如果deps不是数组（即没有显示定义模块的依赖），
// 且factory时，通过factory.toString解析出模块的依赖
Module.define = function (id, deps, factory) {
  var argsLen = arguments.length

  // define(factory)
  if (argsLen === 1) {
	factory = id
	id = undefined
  }
  else if (argsLen === 2) {
	factory = deps

	// define(deps, factory)
	if (isArray(id)) {
	  deps = id
	  id = undefined
	}
	// define(id, factory)
	else {
	  deps = undefined
	}
  }

  // Parse dependencies according to the module factory code
  // 如果deps不是数组，即没有指定依赖时，且factory是函数
  if (!isArray(deps) && isFunction(factory)) {
	// 通过factory.toString()解析模块的依赖
	deps = parseDependencies(factory.toString())
  }

  // 定义模块的元信息
  var meta = {
	id: id,
	uri: Module.resolve(id),
	deps: deps,
	factory: factory
  }

  // Try to derive uri in IE6-9 for anonymous modules
  // 如果不存在meta.uri（即匿名模块），且是IE6-9时
  if (!meta.uri && doc.attachEvent) {
	// 获取当前正在加载的script
	var script = getCurrentScript()

	if (script) {
	  meta.uri = script.src
	}

	// NOTE: If the id-deriving methods above is failed, then falls back
	// to use onload event to get the uri
  }

  // Emit `define` event, used in nocache plugin, seajs node version etc
  emit("define", meta)

  // 如果不是匿名模块，则调用Module.save保存模块的元信息，如果是匿名模块则用anonymousMeta保存元信息
  meta.uri ? Module.save(meta.uri, meta) :
	  // Save information for "saving" work in the script onload event
	  anonymousMeta = meta
}
```
 
上面代码中的`anonymousMeta`即在`Module.prototype.fetch`方法中用到，如果不是匿名模块，则在`define`中就已经获取模块（通过`Module.get`，即先判断`cachedMods`是否存在，若不存在则新建一个模块）并保存模块的元信息，如果是匿名模块，则在`fetch`的内部函数`onRequest`（请求成功后执行的回调函数）中保存匿名模块的元信息。

继续回到`fetch`方法，在模块请求完成并保存元信息后，就会调用模块的`load`方法，这个就是去解析并加载然后执行该模块的依赖。当模块的依赖加载完后就会执行`onload`方法，示例代码中，fetch`a`模块时，获取到`a`模块的依赖并保存元信息后，就要执行`a`模块的`load`方法，`load`方法会去加载`a`模块的依赖`b`，并向开始一样的执行过程，获取到`b`模块的依赖`c`，当fetch`c`模块的时候，因为`c`模块没有依赖，执行`c`模块的`load`方法时，会直接执行到`c`模块的`onload`方法，这里会将依赖`c`模块的`b`模块的`_waitings`减去响应的数，又会去执行`b`模块的`onload`方法，接着执行`a`模块的`onload`方法，然后就是`jquery`的加载，这个加载是异步的。

等模块的所有依赖加载完后，就会执行模块的`onload`方法，在`onload`方法中：

```c
// Call this method when module is loaded
Module.prototype.onload = function() {
  var mod = this
  // 将mod的状态设置为LOADED
  mod.status = STATUS.LOADED

  // 如果模块mod的callback存在，执行callback
  if (mod.callback) {
	mod.callback()
  }

  // Notify waiting modules to fire onload
  // mod._waitings为谁依赖于mod的模块
  var waitings = mod._waitings
  var uri, m

  for (uri in waitings) {
	if (waitings.hasOwnProperty(uri)) {
	  m = cachedMods[uri]
	  // 将当前模块的未加载模块数减掉waitings[uri]数量
	  m._remain -= waitings[uri]
	  // 如果模块的未加载数为0，则触发m模块的onload事件
	  if (m._remain === 0) {
		m.onload()
	  }
	}
  }

  // Reduce memory taken
  delete mod._waitings
  delete mod._remain
}
```
 
 在`onload`过程中会去执行在`Module.use`中定义的`mod.callback`，`mod.callback`就是将所依赖模块的执行，返回依赖模块的exports，等所有依赖模块执行完，就执行`seajs.use(ids, callback)`中的`callback`，参数为`exports`，例如：`seajs.use(['./a','jquery'],function(a,$){}`：
 
```c
// 定义模块的回调函数，模块和模块依赖加载完后执行
mod.callback = function() {
	var exports = []
	// 实际调用Module.prototype.resolve()
	// 解析出模块依赖的路径，就是将deps的路径解析出来
	var uris = mod.resolve()

	for (var i = 0, len = uris.length; i < len; i++) {
	  exports[i] = cachedMods[uris[i]].exec()
	}

	if (callback) {
	  callback.apply(global, exports)
	}

	delete mod.callback
}
```
 
下面看看`Module.prototype.exec`的源代码：

```c
// Execute a module
// 执行一个模块
Module.prototype.exec = function () {
  var mod = this

  // When module is executed, DO NOT execute it again. When module
  // is being executed, just return `module.exports` too, for avoiding
  // circularly calling
  // 当模块是已经执行的，防止再次执行
  // 当模块正在执行，直接返回module.exports，防止循环的调用
  if (mod.status >= STATUS.EXECUTING) {
	return mod.exports
  }

  // 将模块的状态设置为执行中
  mod.status = STATUS.EXECUTING

  // Create require
  var uri = mod.uri

  // 将模块所依赖的模块执行，返回exports
  function require(id) {
	return Module.get(require.resolve(id)).exec()
  }

  // 将id解析成uri
  require.resolve = function(id) {
	return Module.resolve(id, uri)
  }

  // 异步加载模块
  require.async = function(ids, callback) {
	Module.use(ids, callback, uri + "_async_" + cid())
	return require
  }

  // Exec factory
  var factory = mod.factory

  var exports = isFunction(factory) ?
	  factory(require, mod.exports = {}, mod) :
	  factory

  if (exports === undefined) {
	exports = mod.exports
  }

  // Reduce memory leak
  delete mod.factory

  mod.exports = exports
  mod.status = STATUS.EXECUTED

  // Emit `exec` event
  emit("exec", mod)

  return exports
}
```
 
 至此，`use`中的回调函数执行完后，代码也就执行完。
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


  [1]: https://github.com/seajs/seajs/issues/308
  [2]: https://github.com/seajs/seajs/issues/242
