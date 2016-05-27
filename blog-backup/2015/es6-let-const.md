title: 每天学点ES6－let和const
date: 2015-05-28 12:59:42
categories: JavaScript
tags: [JavaScript]
---

今天学习的比较简单，主要学习`ES6`的`let`和`const`。

我们知道在`ES6`之前，是没有块级作用域这一说的，例如：

```JS
function getValue(condition) {

    if (condition) {
        var value = "blue";

        // other code

        return value;
    } else {

        // value exists here with a value of undefined

        return null;
    }

    // value exists here with a value of undefined
}
```

你可能会觉得在`else`里面无法访问到`value`变量，其实在`js`内部会造成变量提升，这意味着我们可以在`else`里面访问到`value`变量，只是它未初始化，所以其变量值为`undefined`。实际解析时代码可能像这样：

```js
function getValue(condition) {

    var value;

    if (condition) {
        value = "blue";

        // other code

        return value;
    } else {

        return null;
    }
}
```

`let`和`const`为我们带来了`块级作用域`，这意味着它只能在代码块内才能访问到，出了代码块就会抛出异常了，还有一点重要的是，`let`和`const`不会造成`变量提升`。

## let

`let`定义变量时和`var`有两个区别：块级作用域、不会变量提升和不能定义在块中已有标识符同名的变量。

我们用`let`来重新定义上面的函数：

```js
function getValue(condition) {

    if (condition) {
        let value = "blue";

        // other code

        return value;
    } else {

        // value doesn't exist here

        return null;
    }

    // value doesn't exist here
}
```

当用`let`定义`value`时，我们只能在`if`里面才能访问到`value`了，`value`变量也不会变量提升，从而我们在`else`里面不能访问到`value`。

`let`最常用的场景应该是`for`循环了：

```js
for (let i = 0; i < len; i++) {
}
```

### 块级作用域

块级作用域就不用多说，就是用`let`定义的变量只在定义它的块中有效，出了这个块你就不能访问到它了。

### 变量提升

变量提升应该是在面试的时候会经常考到，例如：

```js
function test () {
  console.log(value);
  var value = 'something';
  console.log(value);
}

test();

function test2 () {
  console.log(fn);

  function fn () {

  }

  console.log(fn);
}

test2();
```

我们用`let`重新定义上面的`test()`函数：

```js
function test () {
  console.log(value);
  let value = 'something';
  console.log(value);
}

test();
```

此时浏览器就会抱怨了，在`let`定义前是无法访问到我们的变量的。

### 同名变量

用`var`定义变量时，我们可以多次对它进行定义，例如：

```js
var a = 1;
var a = 2;
var a = 3;
```

这样的代码是不会报错的，在`let`定义的`相同块`中定义同名变量时就会报错了，例如：

```js
let a = 1;
let a = 2;

// or
var a = 1;
let a = 2;
```

要注意的是要与`let`定义时在相同的块中，下面的代码是不会出错的：

```c
var a = 1;
if (something) {
  let a = 2;
}
```

## const

`const`除了具有`let`的块级作用域和不会变量提升外，还有就是它定义的是常量，在用`const`定义变量后，我们就不能修改它了，对变量的修改会默默的失败（在`iojs`中会抛出异常，在Chrome下会默默的失败）。例如：

```js
const PI = 3.1415;

console.log(PI);

PI = 22;

console.log(PI);
```


参考链接：[Understanding ECMAScript 6](https://leanpub.com/understandinges6/read)
