title: Backbone Model 要点笔记
date: 2014-09-01 14:47:42
categories: JavaScript
tags: [JavaScript, Backbone]
---

## initialize()

初始化函数。当创建一个`model`实例时，就会调用该函数。它是可选的，不过最好定义它。

```c
var Todo = Backbone.Model.extend({
  initialize: function(){
      console.log('This model has been initialized.');
  }
});

var myTodo = new Todo();
// Logs: This model has been initialized.
```

## defaults

`defaults`指定`model`的默认属性，当你创建一个模型的实例时，任何没有指定的属性都会使用默认值。例如：

```c
var Todo = Backbone.Model.extend({
	defaults: {
		title: 'something to do',
		completed: false
	}
});
```
## 监听model变化

如果你想在`model`发生变化时接收到通知，可以监听`model`的`change`事件。可以在`initialize()`函数中添加监听：

```c
var Todo = Backbone.Model.extend({
	defaults: {
		title: 'something to do',
		completed: false
	},
	initialize: function () {
		this.on('change', function () {
			console.log('value for this model have changed');
		})
	}
});

var myTodo = new Todo();

myTodo.set('title', 'The listener is triggered whenever an attribute value changes.');
console.log('Title has changed: ' + myTodo.get('title'));


myTodo.set('completed', true);
console.log('Completed has changed: ' + myTodo.get('completed'));
```

当你需要监听个别属性的变化时，你可以添加对应属性的监听事件函数`change:attribute`：

```c
var Todo = Backbone.Model.extend({
	defaults: {
		title: 'something to do',
		completed: false
	},
	initialize: function () {
		this.on('change', function () {
			console.log('value for this model have changed');
		});
		this.on('change:title', function () {
			console.log('title have changed');
		});
	}
});

var myTodo = new Todo();

myTodo.set('title', 'The listener is triggered whenever an attribute value changes.');
console.log('Title has changed: ' + myTodo.get('title'));
```

## validate

`Model`可以在`set()`或者`save()`时对值进行校验。默认情况下，验证会在`model`调用`save()`时或调用`set()`传入`{ validate: true }`作为参数时触发。

```c
var Todo = Backbone.Model.extend({
	defaults: {
		title: 'something to do',
		completed: false
	},
	validate: function (attrs) {
		if (!attrs.title) {
			console.log('need title');
		}
	}
});

var mytodo = new Todo();
mytodo.set({ title: '' }, { validate: true });
```

这里只是简单的打印错误信息，其实当验证失败时需要返回一个自定义错误，验证通过时则不需要。

如果返回错误：

 - 触发`invalid`事件，`model`的`validateError`属性被设置为`validate()`的返回值。可以在`initialize()`中监听`invalid`事件。
 - `.save()`将不会继续，服务器端端属性也不会被修改。

下面看一个例子：

```c
var Todo = Backbone.Model.extend({
	defaults: {
		title: 'something to do',
		completed: false
	},
	initialize: function () {
		this.on('invalid', function (model, error) {
			console.log(error);
		});
	},
	validate: function (attrs) {
		if (!attrs.title) {
			return 'I need title!';
		}
	}
});

var mytodo = new Todo();
mytodo.set({ title: '' }, { validate: true });
```

## set() / get() / toJSON()

`get()`提供了对模型属性的访问。例如：

```c
var Todo = Backbone.Model.extend({
	defaults: {
		title: 'something to do',
		completed: false
	},
	initialize: function () {
		this.on('invalid', function (model, error) {
			console.log(error);
		});
	},
	validate: function (attrs) {
		if (!attrs.title) {
			return 'I need title!';
		}
	}
});

var mytodo = new Todo();
console.log(mytodo.get('title'));	// log: something to do
```

如果你想读取或者复制model的所有数据，可以使用它的toJSON()方法。这个方法复制其属性作为一个对象返回（返回`model`属性的一份浅拷贝）。这个方法和`JSON.stringify()`是有区别的：

```c
var Todo = Backbone.Model.extend({
	defaults: {
		title: 'something to do',
		completed: false
	},
	initialize: function () {
		this.on('invalid', function (model, error) {
			console.log(error);
		});
	},
	validate: function (attrs) {
		if (!attrs.title) {
			return 'I need title!';
		}
	}
});

var mytodo = new Todo();
// Object {title: "something to do", completed: false}
console.log(mytodo.toJSON());
// {"title":"something to do","completed":false}
console.log(JSON.stringify(mytodo.toJSON()));
```

`Model.set()`可以设置一个或多个属性。当这些属性任何一个改变了`model`的状态时，`model`的`change`事件就会触发。每个属性的Change事件都可以触发和绑定(比如`change:name`, `change:age`)。

```c
var Todo = Backbone.Model.extend({
  // Default todo attribute values
  defaults: {
    title: '',
    completed: false
  }
});

// Setting the value of attributes via instantiation
var myTodo = new Todo({
  title: "Set through instantiation."
});
console.log('Todo title: ' + myTodo.get('title')); // Todo title: Set through instantiation.
console.log('Completed: ' + myTodo.get('completed')); // Completed: false

// Set single attribute value at a time through Model.set():
myTodo.set("title", "Title attribute set through Model.set().");
console.log('Todo title: ' + myTodo.get('title')); // Todo title: Title attribute set through Model.set().
console.log('Completed: ' + myTodo.get('completed')); // Completed: false

// Set map of attributes through Model.set():
myTodo.set({
  title: "Both attributes set through Model.set().",
  completed: true
});
console.log('Todo title: ' + myTodo.get('title')); // Todo title: Both attributes set through Model.set().
console.log('Completed: ' + myTodo.get('completed')); // Completed: true
```




