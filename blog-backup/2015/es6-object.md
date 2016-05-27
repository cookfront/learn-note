title: 每天学点ES6－对象
date: 2015-06-07 17:59:42
categories: JavaScript
tags: [JavaScript]
---

本文内容来自于：[https://leanpub.com/understandinges6/read#leanpub-auto-objectis](https://leanpub.com/understandinges6/read#leanpub-auto-objectis)。内容有删减，有不懂的地方可以看原文哟。

`ES6`对对象也进行了很多扩展，比如属性和方法的简写方式、`Object.assign()`等。下面来一一介绍`ES6`中对象的扩展。

## 属性和方法的简写

在`ES5`或者更早时，对象直接量其实就是简单的`名－值`对集合，这意味着当属性值被初始化时可能会有一些重复。例如：

```js
function createPerson(name, age) {
    return {
        name: name,
        age: age
    };
}
```

`createPerson()`创建了一个对象，这个对象的属性名称和函数的参数名称是一样的。其结果是导致了`name`和`age`的复制，尽管每个表示一个过程的不同方面。

在`ES6`中，当属性名和局部变量名是一样时，我们可以省略它后面的冒号和值。例如，上面的例子可以重写为：

```js
function createPerson(name, age) {
    return {
        name,
        age
    };
}
```

当一个对象直接量的一个属性只有名称没有值时，`JavaScript`引擎会在周围作用域中寻找和属性名有相同名称的变量。如果找到，值就被赋给对象直接量中相同名的属性。所以在这个例子中，对象直接量的属性`name`被赋值为局部变量`name`的值。

除了属性可以简写外，方法也是可以简写的。在`ES5`或之前，我们定义方法必须像下面这样：

```js
var person = {
    name: "Nicholas",
    sayName: function() {
        console.log(this.name);
    }
};
```

但在`ES6`中，通过省略冒号和`function`关键字，使语法变得更加简洁。你可以重写之前的例子：

```js
var person = {
    name: "Nicholas",
    sayName() {
        console.log(this.name);
    }
};
```

## 计算属性名

在`JavaScript`中，我们定义属性时，有两种方式：中括号`[]`或`.`的方式：

```js
// 方法一
obj.foo = true;

// 方法二
obj['a'+'bc'] = 123;
```

`.`运算符具有很大的局限性，比如`first name`这种属性只能通过中括号的方式来定义。中括号的方式允许我们使用变量或者在使用标识符时会导致语法错误的字符串直接量来定义属性。例如：

```js
var person = {},
    lastName = "last name";

person["first name"] = "Nicholas";
person[lastName] = "Zakas";

console.log(person["first name"]);      // "Nicholas"
console.log(person[lastName]);          // "Zakas"
```

这两种方式只能通过中括号的方式来定义的。在`ES5`中，你可以在对象直接量中使用字符串直接量作为属性，例如：

```js
var person = {
    "first name": "Nicholas"
};

console.log(person["first name"]);      // "Nicholas"
```

但是当我们的属性名存在一个变量中或者需要计算时，使用对象直接量是无法定义属性的。但是在`ES6`中计算属性名语法，同样是通过中括号的方式。例如：

```js
var lastName = "last name";

var person = {
    "first name": "Nicholas",
    [lastName]: "Zakas"
};

console.log(person["first name"]);      // "Nicholas"
console.log(person[lastName]);          // "Zakas"
```

在对象直接量中的中括号表明属性名是需要被计算的，它的内容被计算为字符串。

## Object.assign()

对于对象构成最流行的模式之一可能是`mixin`，一个对象从另一个对象中接收属性和方法。许多`JavaScript`库都有一个类似下面的`mixin`方法：

```js
function mixin(receiver, supplier) {
    Object.keys(supplier).forEach(function(key) {
        receiver[key] = supplier[key];
    });

    return receiver;
}
```

`mixin()`方法遍历`supplier`对象的自有属性，并将其拷贝到`receiver`。这就使得`receiver`没有通过继承就获得了新的行为。例如：

```js
function EventTarget() { /*...*/ }
EventTarget.prototype = {
    constructor: EventTarget,
    emit: function() { /*...*/ },
    on: function() { /*...*/ }
};

var myObject = {};
mixin(myObject, EventTarget.prototype);

myObject.emit("somethingChanged");
```

在这个例子中，`myObject`从`EventTarget.prototype`接收了新的行为。

为此在`ES6`中添加了`Object.assign()`，它和`mixin()`的行为一样。但不同之处在于，`mixin()`使用赋值运算符`=`来拷贝，它不能拷贝访问属性`accessor properties`到接受者作为访问属性。`Object.assign()`是可以做到这点的。

我们可以使用`Object.assign()`重写上面的代码：

```js
function EventTarget() { /*...*/ }
EventTarget.prototype = {
    constructor: EventTarget,
    emit: function() { /*...*/ },
    on: function() { /*...*/ }
}

var myObject = {}
Object.assign(myObject, EventTarget.prototype);

myObject.emit("somethingChanged");
```

`Object.assign()`可以接受任意多个提供属性的对象，接收者则按顺序从提供者接收属性，这可能会导致第二个提供者会覆盖第一个提供者提供给接收者的属性。例如：

```js
var receiver = {};

Object.assign(receiver, {
        type: "js",
        name: "file.js"
    }, {
        type: "css"
    }
);

console.log(receiver.type);     // "css"
console.log(receiver.name);     // "file.js"
```

下面再看看`Object.assign()`用于访问属性的例子：

```js
var receiver = {},
    supplier = {
        get name() {
            return "file.js"
        }
    };

Object.assign(receiver, supplier);

var descriptor = Object.getOwnPropertyDescriptor(receiver, "name");

console.log(descriptor.value);      // "file.js"
console.log(descriptor.get);        // undefined
```

## 重复对象字面量属性

在`ES5`的严格模式中，引入了一个对重复对象字面量属性的检查，它会抛出一个错误如果发现了重复属性。例如：

```js
var person = {
    name: "Nicholas",
    name: "Greg"        // syntax error in ES5 strict mode
};
```

但是在`ES6`中，重复属性检查已经被移除了。不管是`strict`和`nostrict`模式都不会取检查重复属性，它会取给定名称的最后一个属性作为实际值：

```js
var person = {
    name: "Nicholas",
    name: "Greg"        // not an error in ES6
};

console.log(person.name);       // "Greg"
```

在这个例子中，`person.name`的值为`Greg`，因为它是赋给该属性的最后一个值。

## 改变原型

原型是`JavaScript`继承时的基础，因此，`ES6`使得原型更强大。`ES5`中添加了`Object.getPrototypeOf()`方法来检索任何给定对象的原型。在`ES6`中添加了相反操作的方法，`Object.setPrototypeOf()`，它允许我们改变任何给定对象的原型。

在`ES6`之前，我们无法在对象创建后来改变其原型，`ES6`的`Object.setPrototypeOf()`打破了这一情况。`Object.setPrototypeOf()`接收两个参数，第一个参数为要改变原型的对象，第二个参数为被设置为第一个对象的原型的对象。例如：

```js
let person = {
    getGreeting() {
        return "Hello";
    }
};

let dog = {
    getGreeting() {
        return "Woof";
    }
};

// prototype is person
let friend = Object.create(person);
console.log(friend.getGreeting());                      // "Hello"
console.log(Object.getPrototypeOf(friend) === person);  // true

// set prototype to dog
Object.setPrototypeOf(friend, dog);
console.log(friend.getGreeting());                      // "Woof"
console.log(Object.getPrototypeOf(friend) === dog);     // true
```

这段代码中，我们有两个基本对象：`person`和`dog`，两个对象都有一个`getGreeting()`的方法，对象`friend`首先从`person`中继承，意味着调用`getGreeting()`会输出`Hello`。当我们改变`friend`的原型为`dog`时，此时`getGreeting()`输出`Woof`。

一个对象的原型的实际值是存储在一个内部属性`[[Prototype]]`中。`Object.getPrototypeOf()`方法返回存储在`[[Prototype]]`的值，而`Object.setPrototypeOf()`改变存储在`[[Prototype]]`上的值。

## `super`引用

在`ES6`中我们可以通过`super`引用来调用原型上的方法。例如，如果你想覆盖一个对象实例上的方法，但它同样需要去调用相同名字的原型方法，在`ES5`中我们可以通过以下方式来实现：

```js
let person = {
    getGreeting() {
        return "Hello";
    }
};

let dog = {
    getGreeting() {
        return "Woof";
    }
};

// prototype is person
let friend = {
    __proto__: person,
    getGreeting() {
        // same as this.__proto__.getGreeting.call(this)
        return Object.getPrototypeOf(this).getGreeting.call(this) + ", hi!";
    }
};

console.log(friend.getGreeting());                      // "Hello, hi!"
console.log(Object.getPrototypeOf(friend) === person);  // true
console.log(friend.__proto__ === person);               // true

// set prototype to dog
friend.__proto__ = dog;
console.log(friend.getGreeting());                      // "Woof, hi!"
console.log(friend.__proto__ === dog);                  // true
console.log(Object.getPrototypeOf(friend) === dog);     // true
```

我们可以看到是通过`Object.getPrototypeOf(this).getGreeting.call(this)`的方式来实现的，但是在`ES6`中，我们不用这么复杂，只需要`super`就行了，下面是重写后的代码：

```js
let friend = {
    __proto__: person,
    getGreeting() {
        // same as Object.getPrototypeOf(this).getGreeting.call(this)
        // or this.__proto__.getGreeting.call(this)
        return super.getGreeting() + ", hi!";
    }
};
```

以上就是本文的全部内容啦。
