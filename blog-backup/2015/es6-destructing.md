title: 每天学点ES6－变量解构
date: 2015-06-02 12:59:42
categories: JavaScript
tags: [JavaScript]
---

在`ES5`时，我们经常会在代码中看到类似下面这样的代码：

```js
function (options) {
  var a = options.a;
  var b = options.b;
}
```

有了变量解构，我们就不用这么麻烦了，用一行代码就能实现，特别是在有多个变量时，这样写还是很烦的。用变量结构我们可以像下面这样：

```js
function (options) {
  var {a, b} = options;
}
```

变量解构包括`对象解构`和`数组解构`，下面一一讲解。

## 对象解构

对象解构的语法是使用一个对象直接量在赋值操作符的左边，例如：

```js
var options = {
  a: 'a',
  b: 'b'
};

var {a: localA, b: localB} = options;

console.log(localA);
console.log(localB);
```

上面的代码中，`options.a`的值会存储在变量`localA`中，`options.b`会存储在变量`localB`中。在对象解构时，左边的对象直接量中，`key`对应了需要在对象中解构的属性，`value`则为存储属性值的变量名。

如果你想使用对象中相同的属性名，你可以省略左边对象直接量中的冒号和后面的值，例如，对于上面的例子，你可以这样：

```js
var options = {
  a: 'a',
  b: 'b'
};

var {a, b} = options;

console.log(a);
console.log(b);
```

当给定的属性名不存在对象中时，局部变量会得到`undefined`的值，例如：

```js
var options = {
  a: 'a',
  b: 'b'
};

var {a, b, c} = options;

console.log(a);
console.log(b);
console.log(c); // undefined
```

对象解构也是可以嵌套的，例如：

```js
var options = {
  a: 'a',
  b: 'b',
  c: {
    d: 'd'
  }
};

var {a, b, c: {d}} = options;

console.log(a);
console.log(b);
console.log(d);
```

## 数组解构

数组解构和对象解构差不多，是使用一个数组直接量在赋值操作符的左边，例如：

```js
var arr = ['a', 'b', 'c'];

var [a, b, c] = arr;


console.log(a);
console.log(b);
console.log(c);
```

要注意的是，数组解构时要按照元素在数组中的顺序。还有一点是数组解构不会修改原数组。

数组解构也是可以嵌套解构的，例如：

```js
var colors = [ "red", [ "green", "lightgreen" ], "blue" ];

// later

var [ firstColor, [ secondColor ] ] = colors;

console.log(firstColor);        // "red"
console.log(secondColor);       // "green"
```

以上就是变量结构的内容了。


参考链接：

 1. [https://leanpub.com/understandinges6/read](https://leanpub.com/understandinges6/read)
 2. [http://es6.ruanyifeng.com/#docs/destructuring](http://es6.ruanyifeng.com/#docs/destructuring)
