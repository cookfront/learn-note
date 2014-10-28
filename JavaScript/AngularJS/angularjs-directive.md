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

```c
var app = angular.module('myApp', [])
app.controller('MyController', function ($scope) {
	.someProperty = "some-property";
});
```

下面来看看两个有趣的例子：

```c
<div ng-controller="SomeController">
	{{ someBareValue }}
	<button ng-click="someAction()">Communicate to child</button>
	<div ng-controller="ChildController">
	    {{ someBareValue }}
	<button ng-click="childAction()">Communicate to parent</button>
	</div>
</div>

<script type="text/javascript">
var app = angular.module('myApp', []);
app.controller('SomeController', function ($scope) {
	$scope.someBareValue = "Bare Value";
	$scope.someAction = function () {
		$scope.someBareValue = "Hello world";
	};
});
app.controller('ChildController', function ($scope) {
	$scope.childAction = function () {
		$scope.someBareValue = "Child Hello";
	};
});
</script>
```

可以看到在这里例子中，当我们先点击`Communicate to parent`时，只有在`ChildController`中的`someBareValue`改变了。这是因为`Child`具有`someBareValue`的拷贝，而不是引用。那再看看下面的例子：

```c
<div ng-controller="SomeController">
	{{ someModel.someBareValue }}
	<button ng-click="someAction()">Communicate to child</button>
	<div ng-controller="ChildController">
	    {{ someModel.someBareValue }}
	<button ng-click="childAction()">Communicate to parent</button>
	</div>
</div>

<script type="text/javascript">
var app = angular.module('myApp', []);
app.controller('SomeController', function ($scope) {
	$scope.someModel= {
		someBareValue: "BareValue"
	};
	$scope.someAction = function () {
		$scope.someModel.someBareValue = "Hello world";
	};
});
app.controller('ChildController', function ($scope) {
	$scope.childAction = function () {
		$scope.someModel.someBareValue = "Child Hello";
	};
});
</script>
```

此时就能看到`Child`和`Parent`中的能同步了。

### ng-include

你可以使用`ng-include`来获取、编译或者包含一个制定的`HTML`片段到你的应用中。这个`URL`必须是限制为同域或者应用相信的协议。

你可以使用`onload`属性指定一个函数在`template`加载完成后运行。需要注意的是使用`ng-include`总会创建一个子作用域，如果你想使用一个指定的作用域，你需要在`DOM`元素中添加`ng-controller`。

```c
<div ng-controller="SomeController">
    <select ng-model="template" ng-options="t.name for t in templates">
     <option value="">(blank)</option>
    </select>
    url of the template: <tt>{{template.url}}</tt>
    <hr/>
    <div ng-include src="template.url" onload='myFunction()' ng-controller="MyController"></div>
</div>
 
<!-- template2.html -->
<script type="text/ng-template" id="template2.html">
    <p ng-class="color">Content of template2.html</p>
</script>

<script type="text/javascript">
var app = angular.module('myApp', []);
app.controller('SomeController', function ($scope) {
	$scope.templates = [{
        name: 'template1.html',
        url: 'template1.html'
    }, {
        name: 'template2.html',
        url: 'template2.html'
    }];
    $scope.template = $scope.templates[0];

    $scope.myFunction = function() {
        $scope.color = 'red';
    };
});
app.controller('MyController', function ($scope) {
	$scope.someValue = "Child say: Hello world";
});
</script>
```

template1.html 

```c
<!-- template1.html -->
{{ someValue }}
```

### ng-switch

这个指令需要结合`ng-switch-when`和`on="propertyName"`属性，当给定的`propertyName`改变时，进行相应的切换。

```c
<div ng-controller="MyController" ng-switch on="person.name">
    <input type="text" ng-model="person.name" />
    <p ng-switch-default>And the winner is</p>
    <h1 ng-switch-when="Erik">{{ person.name }}</h1>
</div>

<script type="text/javascript">
var app = angular.module('myApp', []);
app.controller('MyController', function ($scope) {
	$scope.person = {
		name: ''
	};
});
</script>
```

上面的例子，当我们在`input`中输入`Erik`就会切换到`h1`。

### ng-view

### ng-if

使用`ng-if`可以将一个元素完全从DOM中移除，或者在DOM中创新创建一个元素，它是根据一个表达式来决定是移除呢，还是创建一个元素。如果`ng-if`中表达式的值为`false`时，则将元素从DOM中移除，否则会复制该元素并重新插入到DOM中。

`ng-if`和`ng-show`或`ng-hide`是有区别的，`ng-show`或`ng-hide`是通过`CSS`来隐藏或显示元素，而`ng-if`是将元素完全移除或者插入。

当一个元素使用`ng-if`从DOM中移除后，它关联的作用域也将被销毁。而且，当它重新被创建时，一个新的作用域被创建，并且通过原型继承了父作用域。

```c
<div ng-if="4 === 4">
	something
</div>
<div ng-if="4 === 5">
	can see
</div>
```

### ng-repeat

使用`ng-repeat`可以遍历一个集合。当遍历时，在局部作用域中暴露了以下属性：

 - $index：遍历时的索引（0, length - 1）
 - $first：如果重复的元素是遍历时的第一个元素时，为`true`
 - $middle：如果重复的元素介于`first`和`last`之间时为`true`
 - $last：如果重复的元素为最后一个元素时为`true`
 - $even：如果`$index`为偶数时，`$even`为`true`
 - $odd：如果`$index`为奇数时，`$even`为`true`

```c
<ul ng-controller="MyController">
	<li ng-repeat="person in people" ng-class="{even: !$even, odd: !$odd}">
		{{person.name}} live in {{person.city}}
	</li>
</ul>

<script type="text/javascript">
var app = angular.module('myApp', []);
app.controller('MyController', function ($scope) {
	$scope.people = [
		{name: 'cookfront', city: 'ShangHai'},
		{name: 'zhangmin', city: 'JiangXi'}
	];
});
</script>
```

### ng-init

`ng-init`用于初始化指令内的状态。

```c
<div ng-init="greeting='Hello'; person='World'">
	{{greeting}} {{person}}
</div>
```

### ng-bind

我们常常看到的是`{{}}`，但是你也可以使用`ng-bind`来模仿这个行为。

```c
<div ng-init="name='cookfront'">
	<p ng-bind="name"></p>
</div>
```

### ng-cloak

`ng-bind`的一种可替代的写法，可以阻止`flash`中未渲染内容。

```c
<div ng-init="name='cookfront'">
	<p ng-cloak>{{name}}</p>
</div>
```

### ng-bind-template

这个和`ng-bind`很类似，但是可以绑定多个表达式：

```c
<div ng-init="name='cookfront'; city='ShangHai'">
	<p ng-bind-template="{{name}} {{city}}"></p>
</div>
```

### ng-model

`ng-model`用于绑定在`input`、`select`、`textarea`等表单控件上，它会处理和提供验证，并设置相关的CSS类（ng-invalid、ng-valid），并且会注册控件到父表单元素中。

```c
<form ng-controller="MyController">
	<input type="text" ng-model="name">
	{{name}}
</form>

<script type="text/javascript">
var app = angular.module('myApp', []);
app.controller('MyController', function ($scope) {
	$scope.name = "cookfront";
});
</script>
```

### ng-show/ng-hide

`ng-show`根据提供的表达式来显示或者隐藏元素。

```c
<p ng-show="4 === 4">
	show me
</p>
<p ng-hide="4 === 4">
	hide me
</p>
```

### ng-change

该指令需要和`ng-model`一起使用，当文本框内容改变时，执行相应的操作。

```c
<div ng-controller="MyController">
	<input type="text" ng-model="number" ng-change="numberChange()">
	<p>
		{{output}}
	</p>
</div>

<script type="text/javascript">
var app = angular.module('myApp', []);
app.controller('MyController', function ($scope) {
	$scope.number = 2;
	$scope.output = $scope.number * 2;
	$scope.numberChange = function () {
		$scope.output = $scope.number * 2;
	};
});
</script>
```

### ng-form

当我们需要在一个表单内嵌套另一个表单时，我们就需要用到`ng-form`了。标准的HTML标签`<form>`不允许我们嵌套表单，但是`ng-form`可以。

以下`CSS`类会根据表单的验证状态自动插入：

 - ng-valid
 - ng-invalid
 - ng-pristine
 - ng-dirty

除非表单有一个`action`属性，否则`Angular`不会提交表单到服务器。

当一个表单提交时，为了指定哪个`JavaScript`方法需要执行，可以使用以下指令：

 - ng-submit：用在表单元素
 - ng-click：在第一个`button`或`input`为`submit`的元素上

为了防止二次执行，请只使用`ng-submit`或`ng-click`。

例子：

[Angular ng-form](http://jsbin.com/UduNeCA/1/edit?html,css,js,output)


### ng-click

使用`ng-click`可以指定一个方法或者表达式去执行，当元素被点击时。

```c
<div ng-controller="MyController">
	<button ng-click="btnClick()">click me</button>
	<p>
		{{number}}
	</p>
</div>

<script type="text/javascript">
var app = angular.module('myApp', []);
app.controller('MyController', function ($scope) {
	$scope.number = 2;
	$scope.btnClick = function () {
		$scope.number += 1;
	};
});
</script>
```

### ng-submit

使用`ng-submit`来绑定一个表达式在`onsubmit`事件上。

```c
<form ng-controller="MyController" ng-submit="submit()">
	<input type="text" ng-model="name">
	<input type="submit" value="submit">
</form>

<script type="text/javascript">
var app = angular.module('myApp', []);
app.controller('MyController', function ($scope) {
	$scope.name = 'cookfront';
	$scope.submit = function () {
		alert('submit');
	};
});
</script>
```

### ng-class

可以动态的为元素添加`class`。

当`number`大于5时添加`red`的`class`。

```c
<div ng-controller="MyController">
	<p ng-class="{red: number > 5}">red</p>
</div>
```

## 创建自己的指令

要创建一个指令我们可以使用`.directive()`方法。

```c
angular.module('myApp')
	.directive(directiveName, factory_function);
```

上面的`directiveName`即为指令的名称，`factory_function`返回一个对象，表明了指令应该如何工作的。例如：

```c
angular.module('myApp')
	.directive('myFirstDirective', function () {
		return {
			// directive definition
		};
	});
```

下面使一个指令完整的格式：

```c
angular.module('myApp', [])
.directive('myDirective', function() {
	return {
		restrict: String,

		priority: Number,
		
		terminal: Boolean,
		
		template: String or Template Function:
			function(tElement, tAttrs) (...},
		
		templateUrl: String,
		
		replace: Boolean or String,
		
		scope: Boolean or Object,

		transclude: Boolean,
		
		controller: String or
			function(scope, element, attrs, transclude, otherInjectables) { ... },
		
		controllerAs: String,
		
		require: String,
		
		link: function(scope, iElement, iAttrs) { ... },
		compile: return an Object OR
			function(tElement, tAttrs, transclude) { 
				return {
					pre: function(scope, iElement, iAttrs, controller) { ... },
					post: function(scope, iElement, iAttrs, controller) { ... }
				}
			return function postLink(...) { ... }
		}
	}; 
});
```

### restrict

`restrict`是一个可选的参数。它告诉`Angular`我们的指令在`DOM`中使用哪种格式。默认情况下，`Angular`希望我们定义一个自定义指令时使用属性，也即`restrict`被设置为`A`。

 - E：元素
 - A：属性`<div my-directive=”expression”></div>`
 - C：class`<div class=”my-directive: expression;”></div>`
 - M：注释`<– directive: my-directive expression –>`



