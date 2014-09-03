Backbone View 要点笔记
========

## initialize()

这个和`model`中一样，当实例化一个`view`时就会调用该函数。

## el

这个属性用来引用DOM中的某个元素，每一个`Backbone`的`view`都会有这么个属性，如果没有显示声明，`Backbone`会默认的构造一个，表示一个空的div元素。`el`标签可以在定义`view`的时候在属性中声明，也可以在实例化`view`的时候通过参数传递。

有2种方式给`view`指定一个DOM元素：元素在页面中已存在，或者一个新创建的元素，开发者手动添加。 如果元素已经存在，你可以设置`el`为一个css选择器或者直接对DOM的引用。

如果要给`view`创建一个新的元素，设置`view`属性的任意组合：`tagName`, `id`和`className`。框架会为你创建一个新的元素，并且可以通过el属性来引用这个元素。如果没有指定`tagName`的值，默认会是`div`。

实例：

```c
var TodosView = Backbone.View.extend({
  tagName: 'ul', // required, but defaults to 'div' if not set
  className: 'container', // optional, you can assign multiple classes to this property like so: 'container homepage'
  id: 'todos', // optional
});

var todosView = new TodosView();
console.log(todosView.el); // logs <ul id="todos" class="container"></ul>
```

上面的代码创建下面的DOM元素，但不会添加到DOM中。

如果这个元素已经存在页面中，你可以把el设为匹配该元素的CSS选择器。

```c
el: '#footer'
```

当创建view时el设置为一个存在的元素：

```c
var todosView = new TodosView({el: $('#footer')});
```

> 提示: 当声明View时，options, el, tagName, id和className都可以定义成函数，如果你期望它们在运行时返回特定的值。