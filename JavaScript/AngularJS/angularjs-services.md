Angular.js Services
========

`Angular.js`内置了许多的`services`，例如：`$http`、`$timeout`等。我们也可以定义自己的`services`。

## 注册services

### factory()

`factory()`接受两个参数：

 - name (string)：我们需要注册服务的名称
 - getFn (function)：当`Angular`创建服务时执行的函数

要注意的是`getFn()`在`app`的生命周期中只会执行一次，该服务是一个单例对象。

```c
var app = angular.module('myArr.services', [])
app.factory('MyService', ['$http', function ($http) {
	// do something
}]);
```

### service()

如果你想使用构造函数来注册一个服务实例，那我们可以使用`service()`方法。它也接受两个参数：


`factory()`接受两个参数：

 - name (string)：我们需要注册服务的名称
 - constructor (function)：构造函数

`service()`方法会使用`new`来创建一个实例。

```c
var app = angular.module('myArr.services', [])
function Person ($http) {
	this.getName = function () {
		return $http({
			method: 'GET',
			url: '/api/user'
		});
	};
}
app.service('Person', Person);
```

那`factory()`和`service()`又有啥区别呢？如果用`factory()`定义上面的服务是这样的：

```c
app.factory('Person', function () {
	return new Person();
});
```

应该一下就能看出区别了吧。在`factory()`中需要手动去`new`。

### provider

