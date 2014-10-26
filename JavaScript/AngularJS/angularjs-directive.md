Angular.js Directive
========

## Angular内置指令

### ng-disabled

`ng-disabled`一般使用在`input`、`button`、`textarea`等元素上，使用该指令可以禁用这些按钮或文本框等。例如，我们想要在用户输入了文字后再启用按钮：

```c
<p>
	<label for="name">Input your name: </label>
	<input type="text" ng-model="name" id="name">
</p>
<button ng-disabled="!name">Submit</button>
```

### ng-readonly

`ng-readonly`为`true`时使类似`input`元素中的文本只读的，而不能去修改它们。

```c
<p>
	<label for="name">Input your name: </label>
	<input type="text" ng-model="name" id="name">
</p>
<input type="text" ng-readonly="name" value="some text">
```

上面当我们在上面文本框输入文字后，下面的文本框将变为只读的。

### ng-checked

`ng-checked`为`true`时可以让我们选中复选框等可以选中的元素。

```c
<p>
	<label for="name">Input your name: </label>
	<input type="text" ng-model="name" id="name">
</p>
If you input your name, I will checked.<input type="checkbox" ng-checked="name">
```

### ng-selected

`ng-selected`和上面的`ng-checked`比较类似。一般用于`<select>`元素中的`<option>`。

```c
<p>
	<label for="name">I agree: </label>
	<input type="checkbox" ng-model="agree" id="name">
</p>
<select>
	<option>Something</option>
	<option ng-selected="agree">other</option>
</select>
```

### ng-href

`ng-href`会让你联想到`href`属性，而`ng-href`只有当你注入的时候才会激活链接的行为。

```c
<a ng-href="{{myHref}}">Baidu</a>


<script type="text/javascript">
var app = angular.module('myApp', []);
app.run(function ($rootScope, $timeout) {
	$timeout(function () {
		$rootScope.myHref = "http://baidu.com"
	}, 1000);
});
</script>
```

### ng-src

`ng-src`和上面的`ng-href`差不多，只有注入的时候才会去加载，这样可以用于懒加载图片。

```c
<img ng-src="{{mySrc}}" alt="">

<script type="text/javascript">
var app = angular.module('myApp', []);
app.run(function ($rootScope, $timeout) {
	$timeout(function () {
		$rootScope.mySrc = "http://www.baidu.com/img/bd_logo1.png"
	}, 1000);
});
</script>
```

### ng-app

把`ng-app`放在任何DOM元素中时，标记了`$rootScope`的开始。`$rootScope`是作用域链的开始，所有`HTML`中嵌套在`ng-app`下的任何指令都从`ng-app`继承。

在你的`JavaScript`代码中，你可以利用`run()`方法来访问`$rootScope`：

```c
var app = angular.module('myApp', []);
app.run(function ($rootScope) {
	$rootScope.someProperty = "some-property";
});
```

需要注意的是，使用`$rootScope`就像你在`JavaScript`中使用全局变量一样，所以不要使用它。还有需要注意的是，在每个`HTML`文档中只能有一个`ng-app`。

### ng-controller

使用`ng-controller`你可以为嵌套在该`ng-controller`元素中的子孙提供一个子作用域，

`ng-controller`接受一个唯一的参数`expression`。

### ng-include






