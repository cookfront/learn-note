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

看名字就能知道，`ToPrimitive`是用于变量需要转换为原始类型时调用。在`JavaScript`内部实现了该函数，在需要将变量转换为原始类型时就会调用该函数，下面看一下它的源代码：

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

#### ToNumber

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

#### ToString

`ToString`是用于将变量转换为`string`类型，它在`V8`中的实现如下：

```js
// ECMA-262, section 9.8, page 35.
function ToString(x) {
  // 如果为string，则直接返回
  if (IS_STRING(x)) return x;
  // 如果为number，则调用_NumberToString
  if (IS_NUMBER(x)) return %_NumberToString(x);
  // 如果为boolean
  if (IS_BOOLEAN(x)) return x ? 'true' : 'false';
  // 如果为undefined，则返回undefined字符串
  if (IS_UNDEFINED(x)) return 'undefined';
  // 如果为symbol，则抛出异常
  if (IS_SYMBOL(x)) throw %MakeTypeError('symbol_to_string', []);
  // 如果为null，或者对象
  return (IS_NULL(x)) ? 'null' : %ToString(%DefaultString(x));
}
```

#### ToBoolean

`ToBoolean`是用于将变量转换为`boolean`类型，它在`V8`中的实现如下：

```js
// ECMA-262, section 9.2, page 30
function ToBoolean(x) {
  // 如果为boolean，则直接返回
  if (IS_BOOLEAN(x)) return x;
  // 如果为string，则当字符串长度不为0时返回true
  if (IS_STRING(x)) return x.length != 0;
  // 如果为null，返回false
  if (x == null) return false;
  // 如果为number，当number不为0，且不为NAN时返回true
  if (IS_NUMBER(x)) return !((x == 0) || NUMBER_IS_NAN(x));
  // 否则返回true
  return true;
}
```

### ToObject

`ToObject`是用于变量需要转换为对象时调用。在`JavaScript`内部实现了该函数，在需要将变量转换为对象时就会调用该函数，下面看一下它的源代码：

```js
// ECMA-262, section 9.9, page 36.
function ToObject(x) {
  if (IS_STRING(x)) return new $String(x);
  if (IS_NUMBER(x)) return new $Number(x);
  if (IS_BOOLEAN(x)) return new $Boolean(x);
  if (IS_SYMBOL(x)) return %NewSymbolWrapper(x);
  // 如果为null或undefined，抛出异常
  if (IS_NULL_OR_UNDEFINED(x) && !IS_UNDETECTABLE(x)) {
    throw %MakeTypeError('undefined_or_null_to_object', []);
  }
  return x;
}
```

## ADD

在`+`运算时也会涉及到类型转换，例如有面试题：`{} + 1`或`new Date() + 1`返回什么呢？这就要看看我们`V8`引擎内部是怎么对加法进行运算的：

```js
// ECMA-262, section 11.6.1, page 50.
function ADD(x) {
  // Fast case: Check for number operands and do the addition.
  // 如果都为number或string，则直接调用NumberAdd或_StringAdd
  if (IS_NUMBER(this) && IS_NUMBER(x)) return %NumberAdd(this, x);
  if (IS_STRING(this) && IS_STRING(x)) return %_StringAdd(this, x);

  // Default implementation.
  // 否则将两边操作数分别转换为原始类型
  var a = %ToPrimitive(this, NO_HINT);
  var b = %ToPrimitive(x, NO_HINT);

  if (IS_STRING(a)) {
    return %_StringAdd(a, %ToString(b));
  } else if (IS_STRING(b)) {
    return %_StringAdd(%NonStringToString(a), b);
  } else {
    return %NumberAdd(%ToNumber(a), %ToNumber(b));
  }
}
```

可以看到在操作数有一个不为number或string时，`ADD`操作就会将相应的操作数转换为原始类型，然后再进行相应的加法操作，可以看到上面的`{} + 1`，`{}`不为原始类型，所以就会调用`ToPrimitive({})`和`ToPrimitive(1)`，`ToPrimitive({})`调用的结果为`[object Object]`，所以最后会进行`_StringAdd`操作，最后的结果是：`[object Object]1`。

## Equals

相等操作也会在某些情况下进行相应的类型转换，所以可以看看它的内部实现是怎样的：

```js
// ECMA-262 Section 11.9.3.
function EQUALS(y) {
  if (IS_STRING(this) && IS_STRING(y)) return %StringEquals(this, y);
  var x = this;

  while (true) {
    // 如果x为number
    if (IS_NUMBER(x)) {
      while (true) {
        if (IS_NUMBER(y)) return %NumberEquals(x, y);
        if (IS_NULL_OR_UNDEFINED(y)) return 1;  // not equal
        if (IS_SYMBOL(y)) return 1;  // not equal
        if (!IS_SPEC_OBJECT(y)) {
          // String or boolean.
          return %NumberEquals(x, %ToNumber(y));
        }
        y = %ToPrimitive(y, NO_HINT);
      }
    } else if (IS_STRING(x)) {
      while (true) {
        if (IS_STRING(y)) return %StringEquals(x, y);
        if (IS_SYMBOL(y)) return 1;  // not equal
        if (IS_NUMBER(y)) return %NumberEquals(%ToNumber(x), y);
        if (IS_BOOLEAN(y)) return %NumberEquals(%ToNumber(x), %ToNumber(y));
        if (IS_NULL_OR_UNDEFINED(y)) return 1;  // not equal
        y = %ToPrimitive(y, NO_HINT);
      }
    } else if (IS_SYMBOL(x)) {
      if (IS_SYMBOL(y)) return %_ObjectEquals(x, y) ? 0 : 1;
      return 1; // not equal
    } else if (IS_BOOLEAN(x)) {
      if (IS_BOOLEAN(y)) return %_ObjectEquals(x, y) ? 0 : 1;
      if (IS_NULL_OR_UNDEFINED(y)) return 1;
      if (IS_NUMBER(y)) return %NumberEquals(%ToNumber(x), y);
      if (IS_STRING(y)) return %NumberEquals(%ToNumber(x), %ToNumber(y));
      if (IS_SYMBOL(y)) return 1;  // not equal
      // y is object.
      x = %ToNumber(x);
      y = %ToPrimitive(y, NO_HINT);
    } else if (IS_NULL_OR_UNDEFINED(x)) {
      return IS_NULL_OR_UNDEFINED(y) ? 0 : 1;
    } else {
      // x is an object.
      if (IS_SPEC_OBJECT(y)) {
        return %_ObjectEquals(x, y) ? 0 : 1;
      }
      if (IS_NULL_OR_UNDEFINED(y)) return 1;  // not equal
      if (IS_SYMBOL(y)) return 1;  // not equal
      if (IS_BOOLEAN(y)) y = %ToNumber(y);
      x = %ToPrimitive(x, NO_HINT);
    }
  }
}
```

上面的代码逻辑大概是这样的：

 1. 如果有一个操作数为string，则执行`StringEquals`操作
 2. 否则，如果第一个操作数为number，如果另外一个操作数为原始类型（非null和undefined），则将其执行`ToNumber`，并进行`NumberEquals`，如果为`null`和`undefined`则返回`false`，如果为对象类型，则将该操作数执行`ToPrimitive`后再重复以上步骤
 3. 否则，如果第一个操作数为string，如果另外一个操作数也为string，则进行`StringEquals`，如果为number或`boolean`，则将第一个操作数执行`ToNumber`，再进行`NumberEquals`，如果为`null`和`undefined`则返回`false`，如果为对象类型，则将该操作数执行`ToPrimitive`后再重复以上步骤
 4. 否则如果第一个操作数为boolean，如果另外一个操作数也为`boolean`，则进行`_ObjectEquals`，否则如果为string或number，则进行`NumberEquals`，如果为`null`和`undefined`则返回`false`，如果为对象类型，则将该操作数执行`ToPrimitive`后再重复以上步骤
 5. 如果第一个操作数为对象类型，则将其`ToPrimitive`，在重复以上步骤

例如有个面试题是这样的`[] == ![]`，是`true`还是`false`，我们首先看右边的`![]`，空数组转换为boolean是`true`的，再进行`!`，可以知道右边的`![]`为`false`，当一个对象和boolean进行`equal`时，`[]`会进行`ToPrimitive`，这里就会首先调用`Array.prototype.valueOf`，调用后返回的是`[]`，不是原始类型，再进行`Array.prototype.toString`，这里返回了`""`空字符，空字符和`false`进行相等比较这里就是`true`了。

## Compare

什么是`Compare`呢，就是`> < <=`这些操作都是`compare`，`compare`也会涉及到类型转换的操作，我们这里看内部`compare`是怎么实现的：

```js
// ECMA-262, section 11.8.5, page 53. The 'ncr' parameter is used as
// the result when either (or both) the operands are NaN.
function COMPARE(x, ncr) {
  var left;
  var right;
  // Fast cases for string, numbers and undefined compares.
  if (IS_STRING(this)) {
    if (IS_STRING(x)) return %_StringCompare(this, x);
    if (IS_UNDEFINED(x)) return ncr;
    left = this;
  } else if (IS_NUMBER(this)) {
    if (IS_NUMBER(x)) return %NumberCompare(this, x, ncr);
    if (IS_UNDEFINED(x)) return ncr;
    left = this;
  } else if (IS_UNDEFINED(this)) {
    if (!IS_UNDEFINED(x)) {
      %ToPrimitive(x, NUMBER_HINT);
    }
    return ncr;
  } else if (IS_UNDEFINED(x)) {
    %ToPrimitive(this, NUMBER_HINT);
    return ncr;
  } else {
    left = %ToPrimitive(this, NUMBER_HINT);
  }

  right = %ToPrimitive(x, NUMBER_HINT);
  if (IS_STRING(left) && IS_STRING(right)) {
    return %_StringCompare(left, right);
  } else {
    var left_number = %ToNumber(left);
    var right_number = %ToNumber(right);
    if (NUMBER_IS_NAN(left_number) || NUMBER_IS_NAN(right_number)) return ncr;
    return %NumberCompare(left_number, right_number, ncr);
  }
}
```

`compare`操作相对于`equal`还是相对来说简单一点的，它首先会判断第一个操作数，如果为对象则将其`ToPrimitive`，否则如果两个操作数都为`string`时，进行`_StringCompare`，否则，将两个操作数都`ToNumber`再进行`NumberCompare`。
