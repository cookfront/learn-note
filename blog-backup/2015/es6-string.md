title: 每天学点ES6－字符串
date: 2015-06-04 13:19:42
categories: JavaScript
tags: [JavaScript]
---

`ES6`中对字符串进行了很多扩展，包括加强了`Unicode`的支持、


## 更好的Unicode支持

在`ES6`之前，`JavaScript`的字符串是完全基于16位字符编码的想法。所有字符串的属性和方法，例如：`length`和`charAt()`，都是基于16位序列代表单个字符的想法。`ES5`还允许`Javascript`引擎决定使用哪种编码方式，`UCS-2`或`UTF-16`。

对于`Unicode`的既定目标，保持在16位是不可能的为全世界的每一个字符提供一个全局唯一的标识符。这些全局唯一标志服被称之为`code point`，且从0开始。一个字符串编码有责任编码一个`code point`为`code unit`，且保持内部一致。

第一个`2^16`个`code point`在`UTF-16`中被表示为单一的16位`code unit`。这被称之为`Basic Multilingual Plane (BMP)`。超出该范围的被认为是在一个辅助平面，`code point`已不能仅仅用16位来表示了。`UTF-16`通过引入`surrogate pairs(代理对)`来解决这个问题，一个`code point`可以由两个16位的`code unit`来表示。这意味着字符串中的任何单个字符可以由一个`code unit`或两个来表示。

在`ES5`中所有的操作都是基于16位的`code unit`，这意味着你在处理包含`代理对`的字符串时会出现意想不到的结果。例如：

```js
var text = "𠮷";

console.log(text.length);           // 2
console.log(/^.$/.test(text));      // false
console.log(text.charAt(0));        // ""
console.log(text.charAt(1));        // ""
console.log(text.charCodeAt(0));    // 55362
console.log(text.charCodeAt(1));    // 57271
```

在这个例子中，单个`Unicode`字符是使用`代理对`来表示的，`JavaScript`字符操作会认为字符串由两个16位的字符组成。这意味着`length`为2，通过正则表达式匹配单个字符也失败了，`charAt()`也无法读取字符。`charCodeAt()`方法为每个`code unit`返回了正确的16为数字。

在`ES6`中强制使用`UTF-16`来编码字符串。

### codePointAt()

`codePointAt()`接受`code unit`的位置，并返回一个整数：

```js
var text = "𠮷a";

console.log(text.charCodeAt(0));    // 55362
console.log(text.charCodeAt(1));    // 57271
console.log(text.charCodeAt(2));    // 97

console.log(text.codePointAt(0));   // 134071
console.log(text.codePointAt(1));   // 57271
console.log(text.codePointAt(2));   // 97
```

当字符为`BMP`范围内的字符时，`codePointAt()`和`charCodeAt()`的行为是一样的，在非`BMP`字符时，`charCodeAt()`仅仅返回了位置`0`的`code unit`，但是`codePointAt()`返回了整个`code point`，即使横跨多个`code unit`。对于位置1和位置2的，它俩返回值是相同的。

用以下方法可以判断是否为16位，还是32位：

```js
function is32Bit(c) {
    return c.codePointAt(0) > 0xFFFF;
}

console.log(is32Bit("𠮷"));         // true
console.log(is32Bit("a"));          // false
```

### String.fromCodePoint()

`String.fromCodePoint()`就是和`codePointAt()`做相反的操作了。例如：

```js
console.log(String.fromCodePoint(134071));  // "𠮷"
```

### 编码非`BMP`字符

在`ES5`中允许字符包含用编码序列代表的16位`Unicode`字符。编码序列是通过`\u`加上4个16进制值，例如`\u0061`代表字符`a`：

```js
console.log("\u0061");      // "a"
```

但是当你用编码序列来代表大于`FFFF`的字符时，你会得到意想不到的结果：

```js
console.log("\u20BB7");
```

因为`Unicode`编码序列总是包含4个16进制字符，`ECMAScript`计算`\u20BB7`为两个字符：`\u20BB`和`7`。第一个字符为非打印的，第二个为数字7。

`ES6`通过引入扩展的`Unicode`编码序列解决了这个问题，将16进制数字包含在花括号内。这使得任何数量的十六进制字符可以指定为单个字符：

```js
console.log("\u{20BB7}");     // "𠮷"
```

通过下面的函数可以判断是否支持这种写法：

```js
function supportsExtendedEscape() {
    try {
        eval("'\\u{00FF1}'");
        return true;
    } catch (ex) {
        return false;
    }
}
```

### 正则表达式`u`修饰符

正则表达式也是基于16位的`code unit`来代表单个字符，这就对于`𠮷`在`/^.$/`的正则表达式中不能匹配，`ES6`为正则表达式定义了一个新的修饰符，`u`也即`Unicode`。当一个正则表达式设置了`u`修饰符时，它将切换模式为工作在字符串，而不是`code unit`。这意味着正则表达式在包含`代理对`的字符串中不会迷惑。例如：

```js
var text = "𠮷";

console.log(text.length);           // 2
console.log(/^.$/.test(text));      // false
console.log(/^.$/u.test(text));     // true
```

在添加了`u`修饰符的正则表达式能以字符的方式来匹配字符串，而不是`code unit`。

## 新增的`String`方法

### includes()

如果给定字符在字符串的任何位置被找到，则返回`true`，否则返回`false`。例如：

```js
var msg = "Hello world!";

console.log(msg.includes("ello"));  
```

### startsWith()

如果字符串以给定字符开始，则返回`true`，否则返回`false`。例如：

```js
var msg = "Hello world!";

console.log(msg.startsWith("Hello"));  
```

### endsWith()

如果字符串以给定字符结束，则返回`true`，否则返回`false`。例如：

```js
var msg = "Hello world!";

console.log(msg.endsWith("world!"));  
```

### repeat()

该方法接受一个数字作为参数，表示将原字符串重复的次数。例如：

```js
var str = "cookfront";
console.log(str.repeat(3));
```

## 正则表达式修饰符`y`

`ES6`引入了新的正则表达式修饰符`y`，也即`粘连`，它与`g`修饰符比较类似，但是不同之处在于，`g`修饰符只确保剩余位置中存在匹配，而`y`修饰符确保匹配必须从剩余的第一个位置开始，这也就是`粘连`的涵义。例如：

```js
var text = "hello1 hello2 hello3",
    pattern = /hello\d\s?/,
    result = pattern.exec(text),
    globalPattern = /hello\d\s?/g,
    globalResult = globalPattern.exec(text),
    stickyPattern = /hello\d\s?/y,
    stickyResult = stickyPattern.exec(text);

console.log(result[0]);         // "hello1 "
console.log(globalResult[0]);   // "hello1 "
console.log(stickyResult[0]);   // "hello1 "

pattern.lastIndex = 1;
globalPattern.lastIndex = 1;
stickyPattern.lastIndex = 1;

result = pattern.exec(text);
globalResult = globalPattern.exec(text);
stickyResult = stickyPattern.exec(text);

console.log(result[0]);         // "hello1 "
console.log(globalResult[0]);   // "hello2 "
console.log(stickyResult[0]);   // Error! stickyResult is null
```

在上面的例子中，使用了三个正则表达式，一个使用了`y`修饰符，一个使用了`g`修饰符，一个没有使用修饰符。第一次匹配时我们可以看到结果都为`hello1`，匹配后我们将`lastIndex`置为1，即从第二个字符开始匹配，我们可以看到第二次匹配的结果没有修饰符的还是匹配`hello1`，`g`修饰符的匹配`hello2`，`y`修饰符在从第二个字符开始没有匹配任何东西所以返回`null`。我们也可以看出了`y`修饰符号隐含了头部匹配的标志`^`。
