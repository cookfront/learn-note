title: Backbone View 要点笔记
date: 2014-09-02 14:47:42
categories: JavaScript
tags: [JavaScript, Backbone]
---

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

## $el

`$el`是`Backbone.js`为`el`生成的`jQuery`对象的缓存，使其可以反复使用而不用担心产生多个`jQuery`的实例对象。

```c
view.$el.show();

listView.$el.append(itemView.el);
```

## $(jQuery)

如果页面中引入了`jQuery`，每一个`view`都会有一个`$`方法，这个方法有一个在当前`view`元素的查询上下文，也即：`view.$(selector)`等同于`$(view.el).find(selector)`。

```c
ui.Chapter = Backbone.View.extend({
  serialize : function() {
    return {
      title: this.$(".title").text(),
      start: this.$(".start-page").text(),
      end:   this.$(".end-page").text()
    };
  }
});
```

## setElement()

如果你想把一个已有的`Backbone view`应用到一个不同的DOM元素上，可以使用`setElement`覆盖`this.el`需要改变DOM的引用，重新绑定事件到新的元素(并且从老的元素上解除事件绑定)。

```c
/ We create two DOM elements representing buttons
// which could easily be containers or something else
var button1 = $('<button></button>');
var button2 = $('<button></button>');

// Define a new view
var View = Backbone.View.extend({
      events: {
        click: function(e) {
          console.log(view.el === e.target);
        }
      }
});

// Create a new instance of the view, applying it
// to button1
var view = new View({el: button1});

// Apply the view to button2 using setElement
view.setElement(button2);

button1.trigger('click'); 
button2.trigger('click'); // returns true
```

## template()/render()

`render()`是一个可选方法，定义模板的渲染逻辑。在这里示例中我们会用`Underscore`的micro-templating，但是你要记得，你也可以使用其它的模板框架。

示例中使用到的`HTML`标签：

```c
<script type="text/template" id="item-template">
	<div>
		<input id="todo_complete" type="checkbox" <%= completed ? 'checked="checked"' : '' %>>
		<%= title %>
	</div>
</script>
```

`Underscore`的`_.template`方法把`JavaScript`模板编译成方法， 在渲染的时候执行。在上面这个`view`中，通过ID `item-template`获取模板标记，传给`_.template()`去编译，并且当`view`创建时保存在`todoTpl`属性上。

`render()`方法中，`toJSON()`方法把`model`的属性进行编码，然后传给模板。模板返回使用`model`的`title`, `completed`数据对表达式进行计算之后的结果标签。然后把结果设为`el`($el访问)元素HTML内容。

Backbone通用的惯例是在`render()`末尾返回`this`。这有很多好处：

 - 可以让views轻易的在其它父views中重复使用
 - 创建一个元素列表而不用单独每个渲染和绘制，只渲染一次填充整个列表。

后面我们会尝试实现它。一个最简单的没有使用`ItemView`的`ListView`，其`render`方法可以这样：

```c
var ListView = Backbone.View.extend({
  template: _.template($('#item-template')),
  render: function(){
    this.$el.html(this.model.toJSON());
  }
});
```

上面的代码定义`template`方法为`_.template`经过编译后返回的方法，`render()`对`model.toJSON()`的数据进行渲染。

## events

Backbone.js 能够监视数据对象的变化并为其注册事件及回调函数，当然对于视图元素也是一样的，并且由于视图对象为我们提供了页面作用域的控制，使得我们可以更简单地和作用域内的对象交互而不至于发生混乱。

事件以`<event> <selector>: <method>`的语法来表示，并且支持大量的DOM事件，包括click, submit, mouseover, dblclick 还有更多。

```c
var TodosView = Backbone.View.extend({
	events: {
		'click .toggle': toggleClick,
		'dbclick .edit': edit
	},
	toggleClick: function () {
		console.log('toggleClick');
	},
	edit: function () {
		console.log('edit');
	}
});
```

事实上 Backbone.js 执行此事件调用时的后台代码差不多是这样的：

```c
$(this.el).delegate('.toggle', 'click', toggleClick);
```

> 注：现在的 jQuery 早已经全面采用 on 方法来执行事件委托调用了，这个例子只是为了强调这是一种委托调用而已。

你也可以自己使用`_.bind(this.viewEvent, this)`来绑定方法，实际上跟在`events key-value`对立面做的是一样的。下面使用`_.bind`当`model change`的时候重新渲染`view`。

```c
var TodoView = Backbone.View.extend({
  initialize: function() {
    this.model.bind('change', _.bind(this.render, this));
  }
});
```


