Backbone Collections 要点笔记
========

当模型的实例越来越多的时候，为了方便的处理它们，我们通常会想到用数组把它们集中起来。Backbone.js 提供了一个 Collection 模块来帮助我们简化这些事情。

```c
var Todo = Backbone.Model.extend({
	defaults: {
		title: 'empty',
		completed: false
	}
});
var Todos = Backbone.Collections.extend({
	model: Todo
});
```

## initialize()

当你创建一个`Collections`的时候，你可能会选择传入一些初始的`models`。这个方法就是来干这个的。主要就是用于初始化`Collection`。

## model

这个属性用来指定`Collection`中包含的`model`类。

```c
var Library = Backbone.Collection.extend({
  model: Book
});
```

## add()/remove()/get()

```c
var Todo = Backbone.Model.extend({
  defaults: {
    title: '',
    completed: false
  }
});

var TodosCollection = Backbone.Collection.extend({
  model: Todo,
});

var a = new Todo({ title: 'Go to Jamaica.', id: 1}),
    b = new Todo({ title: 'Go to China.', id: 2}),
    c = new Todo({ title: 'Go to Disneyland.', id: 3});

var todos = new TodosCollection([a,b]);
console.log("Collection size: " + todos.length);
// Logs: Collection size: 2

var todo1 = todos.get(1);
console.log(todo1 === a);

todos.add(c);
console.log("Collection size: " + todos.length);
// Logs: Collection size: 3

todos.remove([a,b]);
console.log("Collection size: " + todos.length);
// Logs: Collection size: 1

todos.remove(c);
console.log("Collection size: " + todos.length);
// Logs: Collection size: 0
```

当添加一个`model`到集合时，会触发一个`add`事件。当你在`add`时传入`{ at: index }`作为一个参数时，会将`model`添加到指定的`index`。当你添加模型时，它们已经存在于`Collection`中，我们可以传入一个`{ merge: true }`，这个会对指定的模型合并，并且会触发一个`change`事件：

```c
var items = new Backbone.Collection;
items.add([{ id : 1, name: "Dog" , age: 3}, { id : 2, name: "cat" , age: 2}]);
items.add([{ id : 1, name: "Bear" }], {merge: true });
items.add([{ id : 2, name: "lion" }]); // merge: false
 
console.log(JSON.stringify(items.toJSON()));
// [{"id":1,"name":"Bear","age":3},{"id":2,"name":"cat","age":2}]
```

使用`get()`检索`model`时，可以通过`model`的`id`或`cid`来检索。

## 重置或更新集合

有时候你可能想要一次更新整个集合中的`model`，`Collection.set()`接受一个集合数组，并且智能的改变集合中的模型。如果一个模型不在集合中，则添加它；如果一个模型在集合中，则合并它；如果集合中的模型不在传入到`set()`的数组中时，则移除它，并且会触发相应的`add`、`change`和`remove`事件。如果你想自定义这些行为，你可以传入一些选项，例如：`{add: false}`、`{merge: false}`或`{remove: false}`。

```c
var TodosCollection = new Backbone.Collection();

TodosCollection.add([
    { id: 1, title: 'go to Jamaica.', completed: false },
    { id: 2, title: 'go to China.', completed: false },
    { id: 3, title: 'go to Disneyland.', completed: true }
]);

// we can listen for add/change/remove events
TodosCollection.on("add", function(model) {
  console.log("Added " + model.get('title'));
});

TodosCollection.on("remove", function(model) {
  console.log("Removed " + model.get('title'));
});

TodosCollection.on("change:completed", function(model) {
  console.log("Completed " + model.get('title'));
});

TodosCollection.set([
    { id: 1, title: 'go to Jamaica.', completed: true },
    { id: 2, title: 'go to China.', completed: false },
    { id: 4, title: 'go to Disney World.', completed: false }
]);

// Above logs:
// Removed go to Disneyland.
// Completed go to Jamaica.
// Added go to Disney World.
```

如果你想简单的替换集合中所有的内容，可以使用`Collection.reset()`：

```c
var TodosCollection = new Backbone.Collection();

// we can listen for reset events
TodosCollection.on("reset", function() {
  console.log("Collection reset.");
});

TodosCollection.add([
  { title: 'go to Jamaica.', completed: false },
  { title: 'go to China.', completed: false },
  { title: 'go to Disneyland.', completed: true }
]);

console.log('Collection size: ' + TodosCollection.length); // Collection size: 3

TodosCollection.reset([
  { title: 'go to Cuba.', completed: false }
]);
// Above logs 'Collection reset.'

console.log('Collection size: ' + TodosCollection.length); // Collection size: 1
```

`reset()`另一个有用的用途是，当你没有给`reset()`传入参数时，就会清空整个集合中的内容。这一般用于动态加载一个新页面时，你想先把内容清空。

```c
myCollection.reset();
```

> 注意：`reset()`不会触发`add`和`remove`事件。

## fetch()/save()/model.destory()

`Collections.fetch()`方法通过一个`GET`请求向服务器检索一个`JSON`数组类型的数据，请求的`url`为`Collections`中指定的`url`。当数据到达后，`set()`会执行以更新`Collection`。

```c
var Todo = Backbone.Model.extend({
  defaults: {
    title: '',
    completed: false
  }
});

var TodosCollection = Backbone.Collection.extend({
  model: Todo,
  url: '/todos'
});

var todos = new TodosCollection();
todos.fetch(); // sends HTTP GET to /todos
```

当`model`改变后，我们就需要使用`save()`来保存它。当`save()`方法在一个从服务器获取当`model`上调用时，它会构造一个`URL`，这个`URL`为向`Collections`的`url`属性中附加一个`id`，例如`/todos/2`，并发送一个`PUT`请求到服务器。如果`model`是由浏览器创建的新模型，则是发送一个`POST`请求。

`Collections.create()`可以用于创建一个新模型，并将其添加到集合中，并且发送一个请求到服务器。

```c
var Todo = Backbone.Model.extend({
  defaults: {
    title: '',
    completed: false
  }
});

var TodosCollection = Backbone.Collection.extend({
  model: Todo,
  url: '/todos'
});

var todos = new TodosCollection();
todos.fetch();

var todo2 = todos.get(2);
todo2.set('title', 'go fishing');
todo2.save(); // sends HTTP PUT to /todos/2

todos.create({title: 'Try out code samples'}); // sends HTTP POST to /todos and adds to collection
```

在之前的`model`笔记中有讲到，`save()`调用时会自动调用模型的`validate()`方法，当验证不通过，则会触发一个`invalid`事件。

当需要移除一个模型时，可以调用`model.destory()`，不像`Collection.remove()`仅仅只会将模型从集合中移除，而`model.destory()`还会发送一个`DELETE`请求到服务器。

```c
var Todo = Backbone.Model.extend({
  defaults: {
    title: '',
    completed: false
  }
});

var TodosCollection = Backbone.Collection.extend({
  model: Todo,
  url: '/todos'
});

var todos = new TodosCollection();
todos.fetch();

var todo2 = todos.get(2);
todo2.destroy(); // sends HTTP DELETE to /todos/2 and removes from collection
```









