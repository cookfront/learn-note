JavaScript  类型与类型转换
========

## 类型

`JavaScript`类型主要包括了`primitive`和`object`类型，其中`primitive`类型包括了：`null`、`undefined`、`boolean`、`number`、`string`和`symbol(es6)`。

参考链接：1. [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
2. [http://www.w3.org/html/ig/zh/wiki/ES5/types](http://www.w3.org/html/ig/zh/wiki/ES5/types)

## 类型检测

说到类型检测主要包括了：`typeof`、`instanceof`和`Object.prototype.toString.call(xxx)或{}.prototype.toString.call(xxx)。这里在玉伯的博文[Sea.js 源码解析（三）](https://github.com/lifesinger/lifesinger.github.com/issues/175)`中有讨论过`Object.prototype.toString.call(xxx)或{}.prototype.toString.call(xxx)`哪一个更好，有兴趣的可以看一看。

### typeof

`typeof`一般适用于判断`primitive`类型的数据，在判断`object`类型的数据时有时会有意想不到的结果，例如：`typeof null`结果为`object`。下面的表是`typeof`元素符的一个结果：

val 类型|结果
---|---
Undefined|"undefined"
Null|"object"
Boolean|"boolean"
Number|"number"
String|"string"
Object（原生，且没有实现 [[Call]]）|"object"
Object（原生或者宿主且实现了 [[Call]]）|"function"
Object（宿主且没实现 [[Call]]）|由实现定义，但不能是 "undefined"、"boolean"、"number" 或 "string"。

这里还有一篇相关介绍`typeof`的文章：[JavaScript's typeof operator](http://blog.alexanderdickson.com/javascript-typeof)
也可以看ES5中关于`typeof`的介绍：[typeof 运算符](http://www.w3.org/html/ig/zh/wiki/ES5/expressions#typeof_.E8.BF.90.E7.AE.97.E7.AC.A6)

### instanceof

`instanceof`运算符是用于判断一个实例是否属于某一类型，例如：`a instanceof Person`，其内部原理实际上是判断`Person.prototype`是否在`a`实例的原型链中，其原理可以用下面的函数来表达：

```js
function instance_of(V, F) {
  var O = F.prototype;
  V = V.__proto__;
  while (true) {
    if (V === null)
      return false;
    if (O === V)
      return true;
    V = V.__proto__;
  }
}
```

在`V8`源码的`runtime.js`中也有关于`instanceof`运算符的描述：

```js
// ECMA-262, section 11.8.6, page 54. To make the implementation more
// efficient, the return value should be zero if the 'this' is an
// instance of F, and non-zero if not. This makes it possible to avoid
// an expensive ToBoolean conversion in the generated code.
function INSTANCE_OF(F) {
  var V = this;
  if (!IS_SPEC_FUNCTION(F)) {
    throw %MakeTypeError('instanceof_function_expected', [F]);
  }

  // If V is not an object, return false.
  if (!IS_SPEC_OBJECT(V)) {
    return 1;
  }

  // Check if function is bound, if so, get [[BoundFunction]] from it
  // and use that instead of F.
  var bindings = %BoundFunctionGetBindings(F);
  if (bindings) {
    F = bindings[kBoundFunctionIndex];  // Always a non-bound function.
  }
  // Get the prototype of F; if it is not an object, throw an error.
  var O = F.prototype;
  if (!IS_SPEC_OBJECT(O)) {
    throw %MakeTypeError('instanceof_nonobject_proto', [O]);
  }

  // Return whether or not O is in the prototype chain of V.
  return %IsInPrototypeChain(O, V) ? 0 : 1;
}
```

### Object.prototype.toString.call(xxx)或{}.prototype.toString.call(xxx)

这两个的区别在[JavaScript's typeof operator](http://blog.alexanderdickson.com/javascript-typeof)中有说到：`You can always swap {} with Object.prototype, to save creating an object just to exploit its toString() method.`。也就是使用`Object.prototype.toString`会节省创建一个对象。

实际在使用时`Object.prototype.toString.call(xxx)`会返回类似`[object String]`的字符串给我们，用他我们就可以很好的判断变量的类型了。

```js
var a = 'sss';
var b = [];
var c = function () {}

console.log(Object.prototype.toString.call(a))
console.log(Object.prototype.toString.call(b))
console.log(Object.prototype.toString.call(c))
```

## 类型转换

类型转换主要分为两大类：`ToPrimitive`和`ToObject`。其中`ToPrimitive`又分为了：`ToNumber`、`ToString`和`ToBoolean`。

### ToPrimitive

看名字就能知道，`ToPrimitive`是用于转换为原始类型。在`JavaScript`内部实现了该函数，在需要将变量转换为原始类型时就会调用该函数，下面看一下它的源代码：

```js
// ECMA-262, section 9.1, page 30. Use null/undefined for no hint,
// (1) for number hint, and (2) for string hint.
function ToPrimitive(x, hint) {
  // Fast case check.
  // 如果为字符串，则直接返回
  if (IS_STRING(x)) return x;
  // Normal behavior.
  if (!IS_SPEC_OBJECT(x)) return x;
  if (IS_SYMBOL_WRAPPER(x)) throw MakeTypeError('symbol_to_primitive', []);
  if (hint == NO_HINT) hint = (IS_DATE(x)) ? STRING_HINT : NUMBER_HINT;
  return (hint == NUMBER_HINT) ? %DefaultNumber(x) : %DefaultString(x);
}
```

上面有一个`hint`的参数，当没有传入`hint`参数时，且`x`不是`Date`对象时会通过`%DefaultNumber(x)`来转换，否则通过`%DefaultString(x)`。这里也可以看到日期类型的对象转换为原始类型时的不同。

```js
// ECMA-262, section 8.6.2.6, page 28.
function DefaultNumber(x) {
  if (!IS_SYMBOL_WRAPPER(x)) {
    // 转换为数字原始类型时，首先通过valueOf来转换
    var valueOf = x.valueOf;
    if (IS_SPEC_FUNCTION(valueOf)) {
      var v = %_CallFunction(x, valueOf);
      if (%IsPrimitive(v)) return v;
    }

	// 否则通过toString
    var toString = x.toString;
    if (IS_SPEC_FUNCTION(toString)) {
      var s = %_CallFunction(x, toString);
      if (%IsPrimitive(s)) return s;
    }
  }
  // 否则抛出异常
  throw %MakeTypeError('cannot_convert_to_primitive', []);
}

// ECMA-262, section 8.6.2.6, page 28.
function DefaultString(x) {
  if (!IS_SYMBOL_WRAPPER(x)) {
    // 转换为字符串原始类型时首先通过toString
    var toString = x.toString;
    if (IS_SPEC_FUNCTION(toString)) {
      var s = %_CallFunction(x, toString);
      if (%IsPrimitive(s)) return s;
    }

	// 否则通过valueOf
    var valueOf = x.valueOf;
    if (IS_SPEC_FUNCTION(valueOf)) {
      var v = %_CallFunction(x, valueOf);
      if (%IsPrimitive(v)) return v;
    }
  }
  // 否则抛出异常
  throw %MakeTypeError('cannot_convert_to_primitive', []);
}
```

### ToNumber

`ToNumber`是用于将变量转换为`number`类型，它在`V8`中的实现如下：

```js
// ECMA-262, section 9.3, page 31.
function ToNumber(x) {
  // 如果为number直接返回
  if (IS_NUMBER(x)) return x;
  // 如果为字符串，则调用StringToNumber转换
  if (IS_STRING(x)) {
    return %_HasCachedArrayIndex(x) ? %_GetCachedArrayIndex(x)
                                    : %StringToNumber(x);
  }
  if (IS_BOOLEAN(x)) return x ? 1 : 0;
  // 如果为undefined，则返回NAN
  if (IS_UNDEFINED(x)) return NAN;
  // 如果为symbol，则抛出异常
  if (IS_SYMBOL(x)) throw MakeTypeError('symbol_to_number', []);
  // 如果为null或
  return (IS_NULL(x)) ? 0 : ToNumber(%DefaultNumber(x));
}
```
