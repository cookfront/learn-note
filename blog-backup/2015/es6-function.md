title: 每天学点ES6－函数
date: 2015-06-06 09:59:42
categories: JavaScript
tags: [JavaScript]
---

本文翻译自：[https://leanpub.com/understandinges6/read#leanpub-auto-objectis](https://leanpub.com/understandinges6/read#leanpub-auto-objectis)，内容有删减，仅作为阅读笔记。

`ES6`中的函数增加了很多新特性，使得在`JavaScript`中编程不容易出错，且比以往任何时候还要强大。`ES6`的函数主要带来了以下扩展：参数的默认值、`rest`参数、解构参数、扩展（Spread）运算符、`name`属性、箭头函数等。下面就一一介绍。

## 参数默认值

在`JavaScript`中，我们可以给函数传入任意多个参数，而不需要管它实际定义的形参个数。这允许我们定义的函数可以处理参数不同的情况，我们可以为没有指定的参数默认值。在`ES5`中我们可以经常看到下面这样的代码：

```js
function makeRequest(url, timeout, callback) {

    timeout = timeout || 2000;
    callback = callback || function() {};

    // the rest of the function

}
```

在这个例子中，`timeout`和`callback`都是可选的，因为在没有传相应的参数时，它们有默认值`2000`和`function() {}`。我们经常用这种方式来实现默认参数。

`ES6`中对函数进行了扩展，添加了`参数默认值`，在没有传入相应参数时，会使用你在定义函数时给定的默认值，而不是像`ES5`中那样对每个参数还要做一次判断。在`ES6`中我们可以这样：

```js
function makeRequest(url, timeout = 2000, callback = function() {}) {

    // the rest of the function

}
```

这样只有我们的第一个参数是期望传入的，而其他两个参数都有默认值，这使得函数更加简洁，我们不需要去判断是否某个参数没有被传入，就像`timeout = timeout || 2000;`这样。当`makeRequest()`调用时传入了所有的三个参数时，默认参数就不会被使用了。例如：

```js
// uses default timeout and callback
makeRequest("/foo");

// uses default callback
makeRequest("/foo", 500);

// doesn't use defaults
makeRequest("/foo", 500, function(body) {
    doSomething(body);
});
```

任何参数有默认值时我们认为它是可选的，而那些没有默认值的参数我们认为是必须的参数。

## Rest参数

上面也说到`JavaScript`中是可以传入任意多个参数，有时候我们没有必要指定所有的参数。在以前我们可以通过`arguments`函数的所有参数，虽然这在大多数情况下可以工作的很好，但是还是会有一点小累赘。例如：

```js
function sum(first) {
    let result = first,
        i = 1,
        len = arguments.length;

    while (i < len) {
        result += arguments[i];
        i++;
    }

    return result;
}
```

上面这个函数将所有传入的参数相加，例如我们可以`sum(1)`或者`sum(1, 2, 3, 4)`都是可以的。但这个函数我们有几件事情要注意。第一、函数不能明显的看出可以处理一个以上的参数。第二、因为我们指定了一个`first`参数，那我们就必须从`arguments`的索引1开始，而不是索引0。当然记住正确的索引并不是很困难，但是还是需要我们关注的一件事。`ES6`为我们提供了`rest`参数来解决这个问题。

`rest`参数由三个`.`加上参数名字来表示，那个参数名字成为一个数组包含了参数的其余部分。例如，`sum()`函数可以使用`rest`参数重写：

```js
function sum(first, ...numbers) {
    let result = first,
        i = 0,
        len = numbers.length;

    while (i < len) {
        result += numbers[i];
        i++;
    }

    return result;
}
```

在这个版本的函数中，我们可以看到`numbers`包含了除`first`参数之外的剩余参数。这意味着我们可以从`0`开始遍历`numbers`，而不需要有任何顾虑。我们也可以很容易的看出函数可以处理任意多个参数。

对于`rest`参数有一个限制就是，在`rest`参数后不能再跟其他函数，否则会语法错误。例如：

```js
// Syntax error: Can't have a named parameter after rest parameters
function sum(first, ...numbers, last) {
    let result = first,
        i = 0,
        len = numbers.length;

    while (i < len) {
        result += numbers[i];
        i++;
    }

    return result;
}
```

## 参数解构

在前面我们学过变量解构，解构同样也可以使用在函数的参数中。

通常我们会使用一个`options`对象作为一个参数来代替传入多个参数，例如：

```js
function setCookie(name, value, options) {

    options = options || {};

    var secure = options.secure,
        path = options.path,
        domain = options.domain,
        expires = options.expires;

    // ...
}

setCookie("type", "js", {
    secure: true,
    expires: 60000
});
```

除了`name`和`value`是必须的之外，其他数据没有顺序优先级，这里我们使用了一个`options`对象来代替，而不是额外的命名参数。这种方式是`OK`的，但是给我们的函数带来了不透明性。

使用参数解构，之前的函数可以被重写为：

```js
function setCookie(name, value, { secure, path, domain, expires }) {

    // ...
}

setCookie("type", "js", {
    secure: true,
    expires: 60000
});
```

这个例子和前面的不同之处在于使用了参数解构取出了必要的数据。这样使得更清楚的知道需要什么样的参数。参数解构和变量解构一样，如果没有传入相应数据时，其值为`undefined`。

有一点需要注意的是，当我们在上面的函数中没有传入第三个参数时，就像这样：

```js
// Error!
setCookie("type", "js");
```

这个代码是会报错的，在内部执行时其实是像下面这样：

```js
function setCookie(name, value, options) {

    var { secure, path, domain, expires } = options;

    // ...
}
```

因为变量解构时，当右边的表达式为`null`或`undefined`时是会报错的。不过我们可以通过传入一个默认的空对象来解决这个问题：

```js
function setCookie(name, value, { secure, path, domain, expires } = {}) {

    // ...
}
```

## 扩展运算符

扩展运算符和`rest`参数正好相反，`rest`参数允许我们将多个独立的参数合并成一个数组，而扩展运算符允许我们将一个数组分割，每个元素作为独立参数传入到函数中。我们可以考虑`Math.max()`方法，我们可以传入任意多个参数，然后返回最大的那个参数值。例如：

```js
let value1 = 25,
    value2 = 50;

console.log(Math.max(value1, value2));      // 50
```

当只有几个参数时我们很好处理，但是当我们的值存在一个数组中时我们应该怎么办呢？在`ES5`中我们可以通过`apply`来操作：

```js
let values = [25, 50, 75, 100]

console.log(Math.max.apply(Math, values));  // 100
```

`ES6`的扩展运算符使这种情况变得更加简单。你可以通过在数组名前面加上`...`传入函数中，就像`rest`参数那样。例如：

```js
let values = [25, 50, 75, 100]

// equivalent to
// console.log(Math.max(25, 50, 75, 100));
console.log(Math.max(...values));           // 100
```

你也可以混合使用扩展运算符和其他参数。例如：

```js
let values = [-25, -50, -75, -100]

console.log(Math.max(...values, 0));        // 0
```

## `name`属性

`ES6`为所有函数添加了一个`name`属性，在`ES6`的程序中所有的函数的`name`属性都确保有一个合适的值。例如：

```js
function doSomething() {
    // ...
}

var doAnotherThing = function() {
    // ...
};

console.log(doSomething.name);          // "doSomething"
console.log(doAnotherThing.name);       // "doAnotherThing"
```

在这段代码中，`doSomething()`函数的`name`属性值为`doSomething`，因为他是一个函数声明。在匿名函数表达式中，`doAnotherThing()`的`name`属性值为`doAnotherThing`。

下面看个更详细的例子：

```js
var doSomething = function doSomethingElse() {
    // ...
};

var person = {
    get firstName() {
        return "Nicholas"
    },
    sayName: function() {
        console.log(this.name);
    }
}

console.log(doSomething.name);      // "doSomethingElse"
console.log(person.sayName.name);   // "sayName"
console.log(person.firstName.name); // "get firstName"
```

对于函数名还有几种特殊情况。对于使用`bind()`创建的函数会在它们的函数名前加上`bound`前缀。对于使用`Function`构造函数创建的函数它的名字为`anonymous`。例如：

```js
var doSomething = function() {
    // ...
};

console.log(doSomething.bind().name);   // "bound doSomething"

console.log((new Function()).name);     // "anonymous"
```

## `new.target`，`[[Call]]`和`[[Construct]]`


在`ES5`甚至更早，函数服务于双重目的，通过`new`来调用或没有`new`。当使用`new`时，函数内的`this`值是返回的新对象。例如：

```js
function Person(name) {
    this.name = name;
}

var person = new Person("Nicholas");
var notAPerson = Person("Nicholas");

console.log(person);        // "[Object object]"
console.log(notAPerson);    // "undefined"
```

当没有使用`new`调用`Person()`时，返回`undefined`。这里很明显的是这段代码的意图是使用`Person`和`new`来创建一个对象。在`ES6`中，在函数双重角色的困惑上做了一些改变。

第一、规范定义了两个不同的仅在内部使用的方法，每个函数都有：`[[Call]]`和`[[Construct]]`。当一个函数没有通过`new`来调用时，`[[Call]]`方法会被执行。当一个函数通过`new`来调用时，`[[Construct]]`被调用。`[[Construct]]`方法有责任创建一个新的对象。被称之为`new target`，然后执行函数体，`this`的值被设置为`new target`。有一个`[[Construct]]`方法的函数被称之为`构造函数`。

> 要注意的是不是所有的函数都有`[[Construct]]`，也不是所有的函数能通过`new`来调用。箭头函数，将在后面介绍到，没有`[[Construct]]`方法。

在`ES5`中，最流行的方式来决定一个函数能否通过`new`来调用是使用`instanceof`操作符。例如：

```js
function Person(name) {
    if (this instanceof Person) {
        this.name = name;   // using new
    } else {
        throw new Error("You must use new with Person.")
    }
}

var person = new Person("Nicholas");
var notAPerson = Person("Nicholas");  // throws error
```

在这里，`this`的值会被检查是否为构造函数的实例，如果是的话，它继续正常执行。如果不是，就会抛出一个异常。这个能工作是因为`[[Construct]]`方法创建了`Person`的一个新实例，并将它赋给了`this`。不幸的是，这种方式不是完全可信的，`this`的值可以不通过`new`的方式也可以为`Person`的实例，例如：

```js
function Person(name) {
    if (this instanceof Person) {
        this.name = name;   // using new
    } else {
        throw new Error("You must use new with Person.")
    }
}

var person = new Person("Nicholas");
var notAPerson = Person.call(person, "Michael");    // works!
```

我们这里通过`Person.call()`，并且传递`person`对象作为第一个参数，这就使得无法区分`this`是通过`new`创建的还是其他方式。

为了解决这个问题，`ES6`引入了`new.target`元属性。当一个函数的`[[Construct]]`被调用，`new.target`会成为新创建对象的实例，这个值也会在函数内成为`this`的值。如果`[[Call]]`被执行，`new.target`为`undefined`。这意味着我们现在可以通过检查`new.target`是否被定义安全的检查函数是否是通过`new`的方式被调用。例如：

```js
function Person(name) {
    if (typeof new.target !== "undefined") {
        this.name = name;   // using new
    } else {
        throw new Error("You must use new with Person.")
    }
}

var person = new Person("Nicholas");
var notAPerson = Person.call(person, "Michael");    // error!
```

## 箭头函数

`ES6`中新添加了一个箭头函数，就如它的名字，函数通过一种新的语法，使用箭头`=>`来定义。然而，箭头函数在有些方面和传统的`JavaScript`函数是不同的：

 - 词法的`this`绑定：在该函数内的`this`是通过定义箭头函数的地方决定，而不是使用它的地方决定。
 - 不能当作构造函数：箭头函数没有`[[Construct]]`方法，因此它不能作为构造函数。当箭头函数与`new`一起使用时将会抛出异常。
 - 不可以改变`this`值：在函数内的`this`的值是不能改变的，它在函数的整个生命周期中保持相同的值。
 - 没有`arguments`对象：你不能通过`arguments`对象来获取参数，你必须使用命名参数或者`rest`参数等。

其中有一些原因来表明这些不同为什么存在。首先，`this`的绑定在`JavaScript`是一个常见的错误根源。在一个函数内对`this`值的跟踪是非常容易丢失的，这可能会导致意想不到的后果。第二，通过限制箭头函数在执行代码时只有单一的`this`值，`JavaScript`引擎能更好的优化操作。

### 语法

箭头函数的语法有多种风格，这取决于你试图完成什么。所有的变种（箭头函数的多种风格）都是以函数参数开始，跟着箭头，跟着函数体。参数和函数体取决于使用可以采取不同的形式。例如，下面的箭头函数接受一个单一参数和简单的返回它：

```js
var reflect = value => value;

// effectively equivalent to:

var reflect = function(value) {
    return value;
};
```

当箭头函数只有一个参数时，我们只需直接使用这个参数而不需要其他的语法。然后箭头函数的右边会被计算和返回。即使我们这没有一个明确的`return`声明，箭头函数会返回传入的第一个参数。

如果你传入的参数个数大于1时，你就需要圆括号将参数用括号扩起来啦。例如：

```js
var sum = (num1, num2) => num1 + num2;

// effectively equivalent to:

var sum = function(num1, num2) {
    return num1 + num2;
};
```

`sum()`函数将两个参数相加并返回结果。不同之处在于我们的参数放在圆括号内，且用`,`分隔。

需要注意的是，当我们的箭头函数没有参数时，我们必须包含一个空圆括号。例如：

```js
var getName = () => "Nicholas";

// effectively equivalent to:

var getName = function() {
    return "Nicholas";
};
```

当你需要提供一个更传统的函数体时，可能包含多个表达式，那么我们可以将这些语句放在花括号`{}`内，并且定义一个明确的返回值。例如：

```js
var sum = (num1, num2) => {
    return num1 + num2;
};

// effectively equivalent to:

var sum = function(num1, num2) {
    return num1 + num2;
};
```

当你需要创建一个什么也不做的函数时，我们需要包括花括号，例如：

```js
var doNothing = () => {};

// effectively equivalent to:

var doNothing = function() {};
```

还有一点需要注意的是，因为花括号被用于包含函数体，当我们需要从箭头函数返回一个对象直接量时，我们需要将直接量放在圆括号内。例如：

```js
var getTempItem = id => ({ id: id, name: "Temp" });

// effectively equivalent to:

var getTempItem = function(id) {

    return {
        id: id,
        name: "Temp"
    };
};
```

### 词法的`this`绑定

在`JavaScript`中最常见出错的地方就是`this`在函数内的绑定。因为`this`的值可以根据调用它的上下文在单个函数内改变，这就可能错误的使用影响某个对象，但你的意图是另外一个对象。考虑以下例子：

```js
var PageHandler = {

    id: "123456",

    init: function() {
        document.addEventListener("click", function(event) {
            this.doSomething(event.type);     // error
        }, false);
    },

    doSomething: function(type) {
        console.log("Handling " + type  + " for " + this.id);
    }
};
```

在这段代码中，我们知道`this.doSomething`中的`this`对象其实是指向`document`的，但我们的本意其实是`PageHandler`对象。如果你试图运行代码，会得到一个错误。你可能会使用`bind`或`var me = this`的方式来解决这个问题。例如：

```js
// bind way
var PageHandler = {

    id: "123456",

    init: function() {
        document.addEventListener("click", (function(event) {
            this.doSomething(event.type);     // no error
        }).bind(this), false);
    },

    doSomething: function(type) {
        console.log("Handling " + type  + " for " + this.id);
    }
};

// var me = this;
var PageHandler = {

    id: "123456",

    init: function() {
	    var me = this;
        document.addEventListener("click", function(event) {
            me.doSomething(event.type);     // no error
        }, false);
    },

    doSomething: function(type) {
        console.log("Handling " + type  + " for " + this.id);
    }
};
```

现在代码如你预期的那样执行了，但是我们总会觉得有些奇怪。通过调用`bind(this)`，你实际上是创建了一个新的函数，新函数的`this`被绑定到了`PageHandler`。

但是在箭头函数内，它具有隐式`this`绑定，这意味着箭头函数内的`this`值总是与定义箭头函数的作用域的`this`具有相同的值。例如：

```js
var PageHandler = {

    id: "123456",

    init: function() {
        document.addEventListener("click",
                event => this.doSomething(event.type), false);
    },

    doSomething: function(type) {
        console.log("Handling " + type  + " for " + this.id);
    }
};
```

现在`this`的值和`init()`内的`this`值是一样的，它就能用`bind`的方式实现一样的功能了。

箭头函数被设计为“一次性“函数，所以它不能用于定义新的类型。它和普通的函数不同，它没有`prototype`属性。如果你尝试在箭头函数上使用`new`操作符，就会报错。例如：

```js
var MyType = () => {},
    object = new MyType();  // error - you can't use arrow functions with 'new'
```

因为`this`的值是静态绑定到箭头函数上，你不能通过`apply()`、`call()`或`bind()`的方式来改变`this`的值。

### 词法`arguments`绑定

尽管箭头函数自身没有`arguments`对象，但是它能获取到包含它的函数的`arguments`对象。例如：

```js
function createArrowFunctionReturningFirstArg() {
    return () => arguments[0];
}

var arrowFunction = createArrowFunctionReturningFirstArg(5);

console.log(arrowFunction());
```

### 识别箭头函数

尽管语法不同，箭头函数同样也是函数，它也可以被识别：

```js
var comparator = (a, b) => a - b;

console.log(typeof comparator);                 // "function"
console.log(comparator instanceof Function);    // true
```

至此，就是本文的全部内容啦。
