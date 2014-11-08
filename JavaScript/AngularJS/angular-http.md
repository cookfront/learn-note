Angular.js $http
========

`$http`是`Angular.js`内置的`service`，有了它我们就可以和后端交互数据了。`$http()`方法返回一个`promise`，所以我们可以这样使用它：

```c
$http({
	method: 'GET',
	url: '/api'
}).success(function (data, status, headers, config) {
	// this is called when response is ready
}).error(function (data, statsu, headers, config) {
	// This is called when the response comes back with an error status
});


$http({
	method: 'GET',
	url: '/api'
}).then(function (res) {
	// response is ready
}, function (res) {
	// error
});
```

如果响应状态码为200～299之间，则认为响应是成功的，`success`回调就会执行，否则`error`回调执行。

`$http`服务还为我们提供了一些简写的方法：

**1. get()**

它可以用于获取`GET`请求，它接受两个参数：

 - url (string)：请求URL
 - config (optional object)：请求时的配置

例如我们可以这样使用：

```c
$http.get('/api');
```

**2. delete()**

它用于发起`DELETE`请求，接受的参数和`get()`一样。例如：

```c
$http.delete('/user/10');
```

**3. head()**

它用于发起`HEAD`请求，接受的参数和`get()`一样。例如：

```c
$http.head('/api');
```

**4. jsonp()**

它用于发起`JSONP`请求，接受的参数和`get()`一样，但是再`url`参数中必须`callback`，例如：

```c
$http.jsonp("/api/users.json?callback=JSON_CALLBACK");
```

**5. post()**

用于发起`POST`请求，它和`GET`请求不同的是，需要将数据作为第二个参数。例如：

```c
$http.post(url, data, config);
```

**6. put()**

用于发起`PUT`请求，接受的参数和`post()`一样，第二个参数为数据。

上面的每个方法包括`$http()`都是可以配置都，提供了以下配置项，某些配置项在某方法可能不存在，例如`method`配置在`get()`方法就不存在。以下是配置项：

 - method (string)：请求的方式
 - url (string)：请求的url
 - params (map of strings/objects)：请求时的参数，它会被转换为url后面的查询字符串
 - data (string/object)：请求时发送的数据
 - headers (object)：请求时的HTTP头部
 - xsrfHeaderName (string)：
 - xsrfCookieName (string)
 - transformRequest (function/array of functions)：这个用语转换请求的，函数接受的参数为请求主体和头部
 - transformResponse (function/array of functio：转换响应
 - cache (boolean/Cache object)：如果设置为`boolean`值的`true`，则`$http`会缓存`GET`请求，如果是通过`$cacheFactory`构建的对象，则会通过这个对象来缓存
 - withCredentials (boolean)
 - responseType (string)：响应类型

上面的缓存我们可以这样来配置：

```c
app.config(function ($httpProvider, $cacheFactory) {
	$httpProvider.defaults.cache = $cacheFactory('someCache', {
		capacity: 20
	});
});
```

## 拦截者（interceptors）

任何时候当我们想为我们当请求提供全局的一个函数时，例如验证，我们就需要用到我们的`interceptors`，提供了四种`interceptors`：

 - request
 - requestError
 - response
 - responseError

那如何创建我们的`interceptors`呢，利用`factory()`。例如：

```c
app.factory('myInterceptor', function ($q) {
	var interceptors = {
		request: function (config) {
			return config;
		},
		response: function (response) {
			return res;
		},
		requestError: function (rejection) {
			return response;
		},
		responseError: function (rejection) {
			return response;
		}
	};

	return interceptors;
});
```

然后我们需要将我们的`interceptor`注册到`$httpProvider`，例如：

```c
app.config(function($httpProvider) {
	$httpProvider.interceptors.push('myInterceptor');
});
```

## 配置$httpProvider

我们可以通过`config()`在每次请求时添加一些特定的头部，默认情况下，每一次请求时的默认头部在`$httpProvider.defaults.headers`中，我们可以对此进行配置。例如我们可以添加公有的头部：

```c
app.config(function ($httpProvider) {
	$httpProvider.defaults.headers.common['X-Requested-By'] = 'MyApp';
});
```

例如我们要配置`POST`请求时的头部：

```c
app.config(function ($httpProvider) {
	$httpProvider.defaults.headers.post['X-Posted-By'] = 'MyApp';
});
```

## $resource

`Angular`还为我们提供了非常好用的`$resource` service，这个`service`允许我们可以和`RESTful`的服务端数据交互。

`$resource` service使我们从每次写单调乏味的代码中解脱出来，它提供了更简单的方法，例如`save()`和`update()`。使用`$resource`时需要安装它，因为它是一个独立的模块。我们可以通过`bower`来安装：

```c
bower install --save angular-resouce
```

然后在响应的`<script>`标签中引入它。还有要注意的就是我们要在我们的`App`中引入依赖：

```c
angular.module('myApp', ['ngResource']);
```

## Restangular

