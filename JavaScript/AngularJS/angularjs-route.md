Angular.js Route
========

## 安装angular-route

`Angular.js`的路由被独立成了一个模块，所以你在使用路由之前必须将路由模块引入到页面中。你可以通过`bower`来安装：

```c
bower install --save angular-route
```

安装好之后，需要在页面中引入`angular-route`：

```c
<script src="bower_components/angular/angular.js"></script>
<script src="bower_components/angular-route/angular-route.js"></script>
```

在开发单页应用中，你需要根据路由的不同进行切换页面的`view`，所以`angular.js`提供了一个`ng-view`的指令，这个指令的优先级是`1000`，高于其他指令。这个`ng-view`需要定义在模版中，会根据不同的路由在`ng-view`中渲染不同的内容。我们可以定义一个模板：

```c
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>route</title>
</head>
<body ng-app="routeApp">
<h1>Route Demo index</h1>

<div ng-view></div>

</body>
</html>  
```

## route

`Angular.js`的路由是通过`$routeProvider`来提供，它定义了两个方法：

 - when(path, params)
	 - path：路由路径
	 - params: 路由配置项
 - otherwise(params)

例如我们可以这样定义一个路由：


```c
var routeApp = angular.module('routeApp', []);

routeApp.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/list', {
			templaetUrl: 'views/route/list.html',
			controller: 'RouteListCtl'
		})
		.when('/detail', {
			templaetUrl: 'views/route/detail.html',
			controller: 'RouteDetailCtl'
		})
		.otherwise({
			redirectTo: '/list'
		});
}]);
```

下面看看具体的路由配置项：

 **1. controller**

`controller`给定了关联路由的新的作用域。`controller`可以为字符串或者函数，例如：

```c
controller: 'MyRouteCtrl',
controller: function ($scope) {
}
```

**2. template**

`template`就是将模板渲染到指定`ng-view`的`DOM`元素中。例如：

```c
template: '<div><h2>Route</h2></div>'
```

**3. templateUrl**

一般我们都是定义一个`templateUrl`，表示模板的地址，有利于分离及维护。

**4. resolve**

当我们设置了`resolve`属性时，`Angular.js`会注入一个映射到`controller`中，映射的格式为`{key: factory}`：

 - key：要注入到控制器中的依赖物名称字符串
 - factory：可以为字符串或函数定义，若为字符串，则被理解为是依赖物的别名，否则就被当做函数定义，ng会把它当做$injector.invoke()的参数调用，返回值若为promise，则会进行处理并直到处理完毕，才会实例化控制器并注入其中

**5. redirectTo**

如果设置了这个属性，将会重定向到指定的值的路径，并且会触发一个`route change`，它可以为字符串或函数：

```c
redirectTo: '/list'
redirectTo: function (route, path, search) {
}
```

当指定的是一个函数时，函数接受三个参数：

 - 从当前路径中取出的路由路径
 - 当前路径
 - 当前搜索的值

**6. reloadOnSearch**

当该属性设置为`true`时，在`$location.search()`改变时会重新加载路由。

## $routeParams

`Angular.js`还为我们提供了一个`$routeParams`，这个是用于获取路由参数的。例如：

```c
$routeProvider
	.when('/list/:id', {
		templateUrl: 'views/list.html',
		controller: 'ListController'
	});
```

当我们访问路由`/list/10`时，我们的`$routeParams`为：

```c
{ id: 10 }
```

## $location

`Angular.js`为我们提供了一个可以解析URL地址的服务，那就是`$location`。

`$location`服务不提供刷新整个页面，如果你想刷新整个页面，你可以使用`$window.location`。

### path()

可以用于获取当前路径或者修改当前路径并重定向到在`app`中的另一个`URL`。

```c
var path = $location.path();
$location.path('/');
```

### replace()

使用`replace()`与`path()`的区别就是，`replace()`不给你后悔的机会，你不能通过后退返回到之前的页面。

```c
$location.path('/home');
$location.replace();

// or
$location.path('/home').replace();
```

### hash()

获取URL的哈希片段或者改变哈希片段。

```c
var hash = $location.hash();
$location.hash('list');
```

### port()

获取当前URL的端口号。

```c
var port = $location.port();
```

### protocol()

获取当前URL的协议。

```c
var protocol = $location.protocol();
```

### search()

获取当前URL的`search`部分，也可以传入一个字符串或者对象来改变当前的`search`。

```c
var search = $location.search();

$location.search({name: 'Ari', username: 'auser'});
$location.search('name=Ari&username=auser');
```

### url()

获取当前的URL地址。

```c
$location.url();
```

也可以通过该方法来改变当前URL。它接受两个参数：

 - url (optional string)：新的URL地址，但不包括基础前缀
 - replace (optional string)：需要改变的路径

例如：

```c

$location.url("/home?name=Ari#hashthing")
```

### absUrl()

这个方法返回完整的URL。

```c
// http://www.test.com/index.html#/list

// return: /list
$location.url();

// return: http://www.test.com/index.html#/list
$location.absUrl();
```