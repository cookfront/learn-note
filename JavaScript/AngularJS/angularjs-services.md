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

### provider()

`provider()`是`factory()`的升级版，在`provider()`中必须有一个`$get`函数，`$injector`会调用这个`$get`函数去实例化服务，例如：

```c
app.provider('Private', function () {
	return {
		$get: function () {
			var private = 'this is private';
			return {
				getPrivate: function () {
					return private;
				}
			};
		}
	};
});
```

那`provider()`还有什么强大之处呢？因为我们可以在`config`阶段配置一个`provider`。例如：

```c
app.provider('Private', function () {
	var private = 'this is private';
	return {
		setPrivate: function (newVal) {
			private = newVal;
		},
		$get: function () {
			return {
				getPrivate: function () {
					return private;
				}
			};
		}
	};
});
app.config(function (Private) {
	Private.setPrivate('some thing');
});
```

`provider()`方法的第一个参数是服务名，第二个参数不仅可以为一个函数，还可以为对象或者数组。当为对象时，这个对象中必须包含一个`$get`方法，当为数组时，前面的数组元素为依赖注入，最后一个数组元素为一个函数并且返回一个`$get`方法。例如：

```c
app.provider('MyServices', {
	$get: function () {
		return 'services';
	}
});
app.provider('MyServices', ['$http', function ($http) {
	return {
		$get: function () {
			return $http.get({
				method: 'GET',
				url: '/api/user'
			});
		}
	};
}]);
```

### constant()

`constant`是一个非常有用的服务，它经常被用来在指令中提供默认配置，或者注入其他的`service`中。

```c
app.constant('fooConfig',{
    config1: true,
    config2: "Default config2"
});
```

作为一个`constant`，我们放入其中的值将不会改变。

### value()

`value()`和`constant()`很类似，但是它可以被改变。

```c
app.value('fooConfig',{
    config1: true,
    config2: "Default config2 but it can change"
}); 
```

`value`和`constant`还有一个区别是：`constant`可以注入到`config`函数中，而`value`注入则会报错。看下面的例子（可以去掉value再试试）：

```c
var app = angular.module('myApp', [])
app.constant('apiKey', 123).config(function (apiKey) {
	console.log(apiKey);
});
app.value('other', 234).config(function (other) {
	console.log(other);
});
```

### decorator()

`decorator()`让我们可以装饰现有的`service`。例如：

```c
app.config(function($provide){
    $provide.decorator('foo',function($delegate){
        $delegate.greet = function(){
            return "Hello, I am a new function of 'foo'";
        }
    });
}); 
```

`$provide`是`Angular`用来在内部创建我们的`service`的东西。如果我们想要使用它的话可以手动来使用它或者仅仅使用在我们的模块中提供的函数（我们需要使用`$provide`来进行装饰）。`$provide`有一个函数，`decorator`，它让我们可以装饰我们的`service`。它接收我们想要装饰的`service`的名字并且在回调函数中接收一个`$delegate`来代表我们实际上的service实例。

在这里我们可以做一切我们想要的事情来装饰我们的`service`。在上面的例子中，我们为我们原来的`service`添加了一个`greet`函数。接着我们返回了修改后的`service`。

经过修改以后，现在我们的`factory`中已经有了一个叫做`greet`的函数。

装饰一个`service`的能力是非常实用的，尤其是当我们想要使用第三方的`service`时，此时我们不需要将代码复制到我们的项目中，而只需要进行一些修改即可。



参考：

 1. [理解AngularJS中的Service类型](http://www.html-js.com/article/Understand-the-AngularJS-Service-type-with-Angular-development-web-application)