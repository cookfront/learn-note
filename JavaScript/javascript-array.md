JavaScript 数组
========

JavaScript 数组
========

## 数组的定义

### 数组直接量

使用数组直接量创建数组是最简单的方式，在方括号中将数组用逗号隔开即可：

```c
var arr = ['a', 'b', 'c'];
```

任意类型的数据都可以放入数组：

```c
var arr = [{a:1}, [1,2,3],function (){return true;}];
```

### 数组构造函数

 - 调用时没有参数

```c
var arr = new Array();
```

这样会创建一个空数组，等同于`[]`。

 - 调用时传入一个数值参数，它表示长度

```c
var arr = new Array(10)
```

这会创建一个长度为10的数组。

 - 显示指定多个数组元素

```c
var arr = new Array(5, 4, 'str');
```

## 数组长度

每个数组都有一个`length`属性，这个属性表示数组的元素个数。

```c
var arr = ['a', 'b'];
arr.length // 2
```

当数组的`length`属性被设置为比当前数组长度小的非负整数n时，当前数组中那些索引值大于等于n的元素将从中删除：

```c
var a = [1, 2, 3, 4, 5]
a.length = 3;
// [1, 2, 3]
console.log(a);
```

如果人为设置length大于当前元素个数，则数组的成员数量会增加到这个值，新增的位置填入空元素。

```c
var a = ['a'];

a.length = 3;
a // ["a", undefined × 2]
```

上面代码表示，当length属性设为大于数组个数时，新增的位置都填充为undefined。

## delete与数组

使用delete删除一个值时，并不会影响`length`属性，只是会将该处的元素变为了`undefined`。

```c
var a = [1, 2, 3, 4, 5]
delete a[3];
console.log(a[3]); // undefined
console.log(a.length); // 5
```

## 数组方法

###  concat

该方法返回一个新的数组，新数组由当前数组和传入数组或值组成。

语法：

```c
arr.concat(value1, value2, ..., valueN)
```

这里面的`value`可以是数组或者是单个值都可以。`concat`也不会修改传入的值和数组，也不会去修改调用`concat`的数组。只是返回一个新的数组。

```c
var alpha = ["a", "b", "c"];
var numeric = [1, 2, 3];

// creates array ["a", "b", "c", 1, 2, 3]; alpha and numeric are unchanged
var alphaNumeric = alpha.concat(numeric);
```

### every

该方法判断数组中的所有元素是否通过提供的函数。

```c
array.every(callback[, thisObject])
```

这里的`callback`是测试函数，`thisObject`是`callback`的执行上下文。

对于数组中的所有元素在测试函数中返回`true`时，则最后结果返回`true`，否则只要有任何一个元素测试时返回`false`，结果都返回`false`。该方法不会改变数组中的值。

`callback`接受三个参数：当前元素值、当前元素的索引，遍历的数组。当提供了`thisObject`时，这个对象会作为`callback`执行的上下文。

```c
function isBigEnough(element, index, array) {
  return (element >= 10);
}
var passed = [12, 5, 8, 130, 44].every(isBigEnough);
// passed is false
passed = [12, 54, 18, 130, 44].every(isBigEnough);
// passed is true
```

这个方法在部分的旧浏览器中不能兼容，所以下面的代码提供了兼容性解决方案：

```c
if (!Array.prototype.every) {
	Array.prototype.every = function (callback /*, thisObject*/) {
		var arr, len, i, thisObject;

		if (this == null) {
			throw new TypeError();
		}

		arr = Object(this);
		len = arr.length >>> 0;

		if (typeof callback !== 'function') {
			throw new TypeError();
		}

		thisObject = arguments[1];
		for (i = 0; i < len; i++) {
			if (i in arr && !callback(thisObject, arr[i], i, arr)) {
				return false;
			}
		}

		return true;
	}
}
```

### filter

创建一个新的数组包含所有通过测试函数的元素。

```c
array.filter(callback, [thisObject])
```

这个方法会将所有在`callback`方法中返回`true`的元素添加到一个新的数组，并返回这个新的数组。

`callback`接受三个参数：当前元素值、当前元素的索引，遍历的数组。当提供了`thisObject`时，这个对象会作为`callback`执行的上下文。

该方法也不会改变数组中的元素。

```c
function isBigEnough(element) {
  return element >= 10;
}
var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
// filtered is [12, 130, 44]
```

这个方法在部分的旧浏览器中不能兼容，所以下面的代码提供了兼容性解决方案：

```c
if (!Array.prototype.filter) {
	Array.prototype.filter = function (callback /* thisObject */) {
		var arr, len, thisObject, i;

		if (this == null) {
			throw new TypeError();
		}

		arr = Object(this);
		len = arr.length >>> 0;
		if (typeof callback !== 'function') {
			throw new TypeError();
		}

		thisObject = arguments[1];
		var ret = [];
		for (i = 0; i < len; i++) {
			if (i in arr) {
				var val = t[i]; // in case fun mutates this
				if (callback.call(thisObject, arr[i], i, arr)) {
					ret.push(arr[i]);
				}
			}
		}

		return ret;
	}
}
```

### forEach

每个数组元素提供的函数中执行一次。

```c
array.forEach(callback[, thisArg])
```

`forEach`方法会将数组中的所有元素执行一次。这个方法不会执行被`delete`的元素或者是`undefined`的元素。

```c
function logArrayElements(element, index, array) {
    console.log("a[" + index + "] = " + element);
}
[2, 5, 9].forEach(logArrayElements);
```

兼容性：

```c
if (!Array.prototype.forEach) {
	Array.prototype.forEach = function (fn, scope) {
		var i, len = this.length;
		for (i = 0; i < len; i++) {
			if (i in this) {
				fn.call(scope, this[i], i, this);
			}
		}
	};
}
```

### indexOf

这个方法返回传入参数中在数组中的第一个索引位置，如果不存在，则返回`-1`。

```c
arr.indexOf(searchElement[, fromIndex])
```

这里的`searchElement`是需要搜索的元素，可选的参数`fromIndex`是希望从数组中开始搜索的位置，默认为0。如果`fromIndex`大于等于数组的长度时，这时意味着数组不会执行搜索，如果提供的索引值是一个负值，将会从数组的最后数开始进行寻找。

```c
ar array = [2, 5, 9];
var index = array.indexOf(2); // index is assigned 0
index = array.indexOf(7); // index is assigned -1
```

兼容性：

```c
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function (searchElement, fromIndex) {
		var i,
			pivot = formIndex ? formIndex : 0,
			len;

		if (!this) {
			throw new TypeError();
		}
		len = this.length;

		if (len === 0 || pivot >= len) {
			return -1;
		}

		if (pivot < 0) {
			pivot = len - Math.abs(pivot);
		}
		for (i = pivot; i < len; i++) {
			if (this[i] === searchElement) {
				return i;
			}
		}
		return -1;
	};
}
```

###  isArray

如果对象为一个数组，则返回`true`，否则返回`false`。

```c
Array.isArray(obj)
```

```c
// all following calls return true
Array.isArray([]);
Array.isArray([1]);
Array.isArray( new Array() );
Array.isArray( Array.prototype ); // Little known fact: Array.prototype itself is an array.

// all following calls return false
Array.isArray();
Array.isArray({});
Array.isArray(null);
Array.isArray(undefined);
Array.isArray(17);
Array.isArray("Array");
Array.isArray(true);
Array.isArray(false);
Array.isArray({ __proto__ : Array.prototype });
```

兼容性：

```c
if(!Array.isArray) {
  Array.isArray = function (vArg) {
    return Object.prototype.toString.call(vArg) === "[object Array]";
  };
}
```

### join

该方法连接所有的数组元素到一个字符串中。

```c
str = arr.join(separator)
```

这里的`separator`是一个字符串分隔所有的元素。默认使用逗号。

```c
var a = new Array("Wind","Rain","Fire");
var myVar1 = a.join();      // assigns "Wind,Rain,Fire" to myVar1
var myVar2 = a.join(", ");  // assigns "Wind, Rain, Fire" to myVar2
var myVar3 = a.join(" + "); // assigns "Wind + Rain + Fire" to myVar3
```

### lastIndexOf()

该方法返回一个给定元素在数组中最后的一个索引，和`indexOf()`正好相反，如果在数组中不存在给定元素，则返回`-1`。该方法从后开始搜索，并且从`fromIndex`开始搜索。

语法：

```c
array.lastIndexOf(searchElement, [fromIndex])
```

这里`searchElement`就是需要搜索的元素，`fromIndex`是开始搜索的索引，默认是数组的长度。

实例：

```c
var array = [2, 5, 9, 2];
var index = array.lastIndexOf(2);
// index is 3
index = array.lastIndexOf(7);
// index is -1
index = array.lastIndexOf(2, 3);
// index is 3
index = array.lastIndexOf(2, 2);
// index is 0
index = array.lastIndexOf(2, -2);
// index is 0
index = array.lastIndexOf(2, -1);
// index is 3
```

`lastIndexOf`是在`ECMA-5`中被添加进来的，所以在部分旧浏览器不被支持，下面提供解决方案：

```c
if (!Array.prototype.lastIndexOf) {
  Array.prototype.lastIndexOf = function(searchElement /*, fromIndex*/) {
    'use strict';

    if (this == null) {
      throw new TypeError();
    }

    var n, k,
        t = Object(this),
        len = t.length >>> 0;
    if (len === 0) {
      return -1;
    }

    n = len;
    if (arguments.length > 1) {
      n = Number(arguments[1]);
      if (n != n) {
        n = 0;
      }
      else if (n != 0 && n != (1 / 0) && n != -(1 / 0)) {
        n = (n > 0 || -1) * Math.floor(Math.abs(n));
      }
    }

    for (k = n >= 0
          ? Math.min(n, len - 1)
          : len - Math.abs(n); k >= 0; k--) {
      if (k in t && t[k] === searchElement) {
        return k;
      }
    }
    return -1;
  };
}
```

### map()
 
 该方法返回一个新的数组，这个数组是当前数组所有元素调用给定函数的结果。

语法：

```c
array.map(callback[, thisArg])
```

调用`map()`方法时，对于数组中的任何一个元素都会被调用一次提供的函数，并构造出一个新数组并返回。`callback`只对数组中赋值的元素进行调用，对于那些删除的元素或者是没有被赋值的元素将不会调用`callback`。

调用`callback`时会传入三个参数：元素值，元素索引，被遍历的数组。

注意：`map`不会修改数组中的元素。

实例：

```c
function fuzzyPlural(single) {
  var result = single.replace(/o/g, 'e');  
  if( single === 'kangaroo'){
    result += 'se';
  }
  return result; 
}

var words = ["foot", "goose", "moose", "kangaroo"];
console.log(words.map(fuzzyPlural));

// ["feet", "geese", "meese", "kangareese"]
```

兼容性：

```c
// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.com/#x15.4.4.19
if (!Array.prototype.map) {
  Array.prototype.map = function(callback, thisArg) {

    var T, A, k;

    if (this == null) {
      throw new TypeError(" this is null or not defined");
    }

    // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if (arguments.length > 1) {
      T = thisArg;
    }

    // 6. Let A be a new array created as if by the expression new Array(len) where Array is
    // the standard built-in constructor with that name and len is the value of len.
    A = new Array(len);

    // 7. Let k be 0
    k = 0;

    // 8. Repeat, while k < len
    while(k < len) {

      var kValue, mappedValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
        kValue = O[ k ];

        // ii. Let mappedValue be the result of calling the Call internal method of callback
        // with T as the this value and argument list containing kValue, k, and O.
        mappedValue = callback.call(T, kValue, k, O);

        // iii. Call the DefineOwnProperty internal method of A with arguments
        // Pk, Property Descriptor {Value: mappedValue, : true, Enumerable: true, Configurable: true},
        // and false.

        // In browsers that support Object.defineProperty, use the following:
        // Object.defineProperty(A, Pk, { value: mappedValue, writable: true, enumerable: true, configurable: true });

        // For best browser support, use the following:
        A[ k ] = mappedValue;
      }
      // d. Increase k by 1.
      k++;
    }

    // 9. return A
    return A;
  };      
}
```

### pop()

该方法移除数组尾部的一个元素，并返回该元素。

实例：

```c
var myFish = ["angel", "clown", "mandarin", "surgeon"];

console.log("myFish before: " + myFish);

var popped = myFish.pop();

console.log("myFish after: " + myFish);
console.log("Removed this element: " + popped);
```

### push()

该方法向数组尾部插入一个或多个元素，并返回插入后数组的长度。

语法：

```c
arr.push(element1, ..., elementN)
```

实例：

```c
var sports = ["soccer", "baseball"];
var push = sports.push("football", "swimming");

console.log(sports); // ["soccer", "baseball", "football", "swimming"]
console.log(push);   // 4
```

### reduce()

该方法依次处理数组的每个元素，最终累计为一个值。

语法：

```c
array.reduce(callback,[initialValue])
```

上面的`callback`需要接受4个参数：

 1. 最后一次累加的值或者为`initialValue`
 2. 当前处理的元素
 3. 当前元素索引
 4. 处理的数组

实例：

```c
var total = [0, 1, 2, 3].reduce(function(a, b) {
    return a + b;
});
```

兼容性：

```c
if ('function' !== typeof Array.prototype.reduce) {
	Array.prototype.reduce = function (callback, initValue) {
		'use strict';
		if (null ===  this || 'undefined' === typeof this) {
			throw new TypeError('Array.prototype.reduce called on null or undefined');
		}
		if ('function' !== typeof callback) {
			throw new TypeError(callback + ' is not a function');
		}
		var index, value,
			length = length >>> 0,
			isValueSet = false;

		if (1 < argumengs.length) {
			value = initValue;
			isValueSet = true;
		}
		for (index = 0; index < length; index++) {
			if (this.hasOwnProperty(index)) {
				if (isValueSet) {
					value = callback(value, this[index], index, this);
				} else {
					isValueSet = true;
					value = this[index];
				}
			}
		}
		if (!isValueSet) {
			throw new TypeError('Reduce of empty array with no initial value');
		}
		return value;
	}
}
```

### reduceRight()

`reduceRight()`和`reduce`正好相反，它是从右到左累计一个值。

语法：

```c
array.reduceRight(callback[, initialValue])
```

实例：

```c
[0, 1, 2, 3, 4].reduceRight(function(previousValue, currentValue, index, array) {
    return previousValue + currentValue;
});

// First call
previousValue = 4, currentValue = 3, index = 3

// Second call
previousValue = 7, currentValue = 2, index = 2

// Third call
previousValue = 9, currentValue = 1, index = 1

// Fourth call
previousValue = 10, currentValue = 0, index = 0

// array is always the object [0,1,2,3,4] upon which reduceRight was called

// Return Value: 10
```

兼容性：

```c
if ('function' !== typeof Array.prototype.reduceRight) {
  Array.prototype.reduceRight = function(callback, opt_initialValue) {
    'use strict';
    if (null === this || 'undefined' === typeof this) {
      // At the moment all modern browsers, that support strict mode, have
      // native implementation of Array.prototype.reduceRight. For instance,
      // IE8 does not support strict mode, so this check is actually useless.
      throw new TypeError(
          'Array.prototype.reduceRight called on null or undefined');
    }
    if ('function' !== typeof callback) {
      throw new TypeError(callback + ' is not a function');
    }
    var index, value,
        length = this.length >>> 0,
        isValueSet = false;
    if (1 < arguments.length) {
      value = opt_initialValue;
      isValueSet = true;
    }
    for (index = length - 1; -1 < index; --index) {
      if (this.hasOwnProperty(index)) {
        if (isValueSet) {
          value = callback(value, this[index], index, this);
        }
        else {
          value = this[index];
          isValueSet = true;
        }
      }
    }
    if (!isValueSet) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
    return value;
  };
}
```

### reverse()

reverse方法用于颠倒数组中元素的顺序，使用这个方法以后，返回改变后的原数组。

实例：

```c
var myArray = ["one", "two", "three"];
myArray.reverse(); 

console.log(myArray) // ["three", "two", "one"]
```

### shift()

该方法移除数组第一个元素，并返回这个移除的元素。该方法会改变数组的长度。

实例：

```c
var myFish = ["angel", "clown", "mandarin", "surgeon"];

console.log("myFish before: " + myFish);

var shifted = myFish.shift();

console.log("myFish after: " + myFish);
console.log("Removed this element: " + shifted);
```

### slice()

slice方法返回指定位置的数组成员组成的新数组，原数组不变。它的第一个参数为起始位置（从0开始），第二个参数为终止位置（但该位置的元素本身不包括在内）。如果省略第二个参数，则一直返回到原数组的最后一个成员。

语法：

```c
arr.slice(begin[, end])
```

如果`begin`为负数，则表明从数组尾部算起的第多少个元素。例如为－2，则表明是数组的倒数第二个为`begin`。

实例：

```c
// Our good friend the citrus from fruits example
var fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
var citrus = fruits.slice(1, 3);

// puts --> ["Orange","Lemon"]
```
