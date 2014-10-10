title: JavaScript 正则表达式相关函数
date: 2014-07-21 15:19:04
categories: JavaScript
tags: [JavaScript, 正则表达式]
---

正则表达式一直是自己比较弱的地方，而且对于`JavaScript`的几个正则表达式的函数也是概念不是太清楚，今天就决定好好学习一下。

## 如何创建

`JavaScript`中可以通过两种方式来创建一个正则表达式：正则表达式字面量和RegExp构造函数：

 - 创建一个正则表达式字面量
 
```c
var reg = /[^0-9]/;
```

正则表达式字面量在脚本加载后编译。若你的正则表达式是常量，使用这种方式可以获得更好的性能。

 - 创建一个RegExp构造函数
 
```c
var reg = new RegExp('[^0-9]');
```

使用构造函数，提供了对正则表达式运行时的编译。当你知道正则表达式的模式会发生改变， 或者你事先并不了解它的模式或者是从其他地方（比如用户的输入），得到的代码这时比较适合用构造函数的方式。

## 正则表达式语法

有一篇[55分钟学会正则表达式(译)][1]很详细的介绍了正则表达式的各种语法，以及一些练习，非常不错。但是还有一些没有介绍到，自己也经常忘记：

 - `(?:x)`：这种叫做非捕获括号，就是匹配`x`但是不记住`x`，也就是不能通过`exec`等函数返回的数组中获取到。
 - `x(?=y)`：这种叫做后向查询，仅仅当`x`后面跟着`y`时匹配。
 - `x(?!y)`：这种叫做反向向前查找，仅仅当`x`后面不跟着`y`时匹配。

## JavaScript正则表达式函数

在`JavaScript`中有六个函数可以用到正则表达式，自己对这几个函数的使用也是经常混淆，下面也是作为学习笔记以后忘了再来回顾回顾：

### [exec][2]

#### 概述

exec() 方法为指定的一段字符串执行搜索匹配操作。它的返回值是一个数组或者 null 。

如果你仅仅是为了知道是否匹配，可以使用 RegExp.test() 方法，或者 String.search() 方法。

#### 语法

```c
regexObj.exec(str)
```
#### 参数

str：这个字符串对应它匹配的正则表达式。

#### 返回值

如果匹配成功，exec 方法将返回一个数组并更新正则表达式中属性值。返回的数组中第一个元素即为正则表达式匹配的字符，其他的元素则为各个捕获项

如果匹配失败，exec 方法将返回 null 。

#### 实例

```c
var reg = /([0-9]+)(\W*)(\w+)/;
var arr = reg.exec('234 words').slice();
for (var i = 0; i < arr.length; i++) {
	console.log(arr[i]);
}
```
可以看到在控制台打印出：

```c
234 words
234
  
words
```

### [test][3]

#### 概述

`test`方法主要时用于判断字符是否和正则表达式匹配。返回`true`或`false`。

#### 语法

```c
regexObj.test(str)
```

#### 参数

str：这个字符串对应它匹配的正则表达式。

#### 返回值

返回`true`或`false`。

#### 描述

当你需要知道一个模式是否存在与某个字符串中时可以使用`test()`（和[String.search][4]很类似），如果你需要关于一个正则表达式的更多信息，可以使用[exex][5]和[String.match][6]方法。

#### 实例

```c
var reg = /([0-9]+)(\W*)(\w+)/;
console.log(reg.test('aa234 words'));
```

### [match][7]

#### 概述

当使用正则表达式来匹配一个字符串时，使用`match()`来检索匹配的部分。

#### 语法

```c
str.match(regexp);
```

#### 参数

regexp：一个正则表达式对象。如果传入的是一个非正则表达式对象，将会使用`new RegExp(obj)`来隐式转换。

#### 返回值

如果有匹配则返回一个匹配结果的数组，否则返回`null`。

#### 描述

如果正则表达式中没有包含一个`g`标识时，返回结果和[RegExp.exec(str)][8]一样：

```c
var reg = /([0-9]+)(\W*)(\w+)/;
console.log('aa234 words'.match(reg));
```

在控制台将输出：

```c
["234 words", "234", " ", "words", index: 2, input: "aa234 words"]
```

返回的数组中有一个额外的`input`属性，它包含了被解析的原始字符串。此外，它还包含了一个`index`属性，它代表了匹配字符串中从零开始的索引。

如果正则表达式中包含一个`g`标识时，该方法返回一个数组包含了所有的匹配。如果没有匹配项，该方法返回`null`。

#### 实例

上面的描述中已经有了一个不包含`g`标识的例子，下面看一个含有`g`标识的例子：

```c
var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
var regexp = /[A-E]/gi;
var matches_array = str.match(regexp);

console.log(matches_array);
```

上面的代码在控制台会输出：

```c
["A", "B", "C", "D", "E", "a", "b", "c", "d", "e"]
```

### [search][9]

#### 概述

`search()`方法执行一个搜匹配索，在正则表达式和字符串之间。

#### 语法

```c
str.search(regexp)
```

#### 参数

regexp：一个正则表达式对象。如果传入的是一个非正则表达式对象，将会使用`new RegExp(obj)`来隐式转换。

#### 描述

如果成功，`search`返回正则表达式在字符串中的第一次匹配的索引。否则返回`-1`。

#### 实例

```c
var reg = /([0-9]+)(\W*)(\w+)/;
console.log('aa234 words'.search(reg));
```

可以看到在控制台输出`2`。再看一个不匹配的情况：

```c
var reg = /ad{2}/;
console.log('aad'.search(reg));
```

控制台会输出`-1`，因为不能匹配。


### [replace][10]

replace的具体可以看[Mozilla replace][11]了，很详细。

至此，对`JavaScript`的正则表达式有关的函数有了个清楚的认识了。


  [1]: http://doslin.com/learn-regular-expressions-in-about-55-minutes/
  [2]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec
  [3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
  [4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/search
  [5]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec
  [6]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match
  [7]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match
  [8]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec
  [9]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/search
  [10]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace
  [11]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace