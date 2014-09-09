JavaScript Object
========

## 创建对象

### 对象直接量

这是创建对象最简单的方式，它是由若干名/值对组成的映射表。


```c
var obj = {
    name: 'cookfront'
};
```

### 通过new创建对象

`new`是通过构造函数来创建一个对象。

```c
var obj = new Object();
var arr = new Array();
```

### Object.create()

`ECMAScript 5`定义了一个名为`Object.create()`方法，它创建一个新对象，其中第一个参数是这个对象的原型。`Object.create()`方法还提供了第二个可选参数，用以对对象的属性进一步描述。

```c
var obj = Object.create({
  x: 1,
  y: 2
});
```

当向`Object.create()`传入`null`作为参数时，我们创建了一个没有原型的对象。这种方式创建的对象，不继承任何东西，例如：`toString()`。

```c
var obj = Object.create(null);
```

如果想创建一个普通的空对象，只需要传入`Object.prototype`作为参数：

```c
var obj = Object.create(Object.prototype);
```

## 对象方法

### Object.create()

`Object.create()`方法创建一个拥有指定原型和若干个指定属性的对象。

语法：

```c
Object.create(proto [, propertiesObject ])
```

参数值的意义：

 - proto：一个对象，作为新创建对象的原型。
 - propertiesObject：一个对象值，可以包含若干个属性，属性名为新建对象的属性名，属性值为那个属性的属性描述符对象。

实例：

```c
// Shape - superclass
function Shape() {
  this.x = 0;
  this.y = 0;
}

// superclass method
Shape.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
    console.info("Shape moved.");
};

// Rectangle - subclass
function Rectangle() {
  Shape.call(this); // call super constructor.
}

// subclass extends superclass
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

var rect = new Rectangle();

rect instanceof Rectangle // true.
rect instanceof Shape // true.

rect.move(1, 1); // Outputs, "Shape moved."
```

兼容性：

```c
if (typeof Object.create != 'function') {
    (function () {
        var F = function () {};
        Object.create = function (o) {
            if (arguments.length > 1) {
              throw Error('Second argument not supported');
            }
            if (o === null) {
              throw Error('Cannot set a null [[Prototype]]');
            }
            if (typeof o != 'object') {
              throw TypeError('Argument must be an object');
            }
            F.prototype = o;
            return new F();
        };
  })();
}
```

### Object.defineProperty()

`Object.defineProperty()`在对象上定义一个新的属性，或者修改对象中已经存在的属性，最后返回这个对象。

语法：

```c
Object.defineProperty(obj, prop, descriptor)
```

`obj`就是我们要定义或修改属性的对象。
`prop`则为定义或修改的属性名。
`descriptor`要定义或修改属性的描述。这个后面会详细讲到。

上面的`descriptor`主要分为下面几个选项：

 - configurable：可配置性（configurable）决定了是否可以删除（delete）某个属性，以及是否可以更改该属性attributes对象中除了value以外的性质。默认为`false`。
 - enumerable：可枚举性（enumerable）与两个操作有关：for...in和Object.keys。如果某个属性的可枚举性为true，则这两个操作过程都会包括该属性；如果为false，就不包括。总体上，设计可枚举性的目的就是，告诉for...in循环，哪些属性应该被忽视。默认为`false`
 - value：属性关联的值。
 - writable：可写性（writable）决定了属性的值（value）是否可以被改变。
 - get：取值函数
 - set：设置值函数

在上面的可枚举性还有一个需要注意的函数：`Object.getOwnPropertyNames()`，这个函数不管属性是否可枚举，会返回定义在对象上全部属性的名称。

实例：

属性`configurable`：

```c
var o = {};
Object.defineProperty(o, "a", { get : function(){return 1;}, 
                                configurable : false } );

Object.defineProperty(o, "a", {configurable : true}); // throws a TypeError
Object.defineProperty(o, "a", {enumerable : true}); // throws a TypeError
Object.defineProperty(o, "a", {set : function(){}}); // throws a TypeError (set was undefined previously)
Object.defineProperty(o, "a", {get : function(){return 1;}}); // throws a TypeError (even though the new get does exactly the same thing)
Object.defineProperty(o, "a", {value : 12}); // throws a TypeError

console.log(o.a); // logs 1
delete o.a; // Nothing happens
console.log(o.a); // logs 1
```

属性`enumerable`：

```c
var o = {};
Object.defineProperty(o, "a", { value : 1, enumerable:true });
Object.defineProperty(o, "b", { value : 2, enumerable:false });
Object.defineProperty(o, "c", { value : 3 }); // enumerable defaults to false
o.d = 4; // enumerable defaults to true when creating a property by setting it

for (var i in o) {    
  console.log(i);  
}
// logs 'a' and 'd' (in undefined order)

console.log(Object.keys(o)); // ["a", "d"]
console.log(Object.getOwnPropertyNames(o)); // ["a", "b", "c", "d"]

o.propertyIsEnumerable('a'); // true
o.propertyIsEnumerable('b'); // false
o.propertyIsEnumerable('c'); // false
```

属性`writable`：

```c
var o = {}; // Creates a new object

Object.defineProperty(o, "a", { value : 37,
                                writable : false });

console.log(o.a); // logs 37
o.a = 25; // No error thrown (it would throw in strict mode, even if the value had been the same)
console.log(o.a); // logs 37. The assignment didn't work.
```

属性存取：

```c
var o = {

    get p() {
        return "getter";
    },

    set p(value) {
        console.log("setter: "+value);
    }
}

o.p
// getter

o.p = 123;
// setter: 123
```

### Object.defineProperties()

这个方法和上面的`Object.defineProperty()`很相似，只是一次设置多个属性。

语法：
  
```c
Object.defineProperties(obj, props)
```

实例：

```c
Object.defineProperties(obj, {
  "property1": {
    value: true,
    writable: true
  },
  "property2": {
    value: "Hello",
    writable: false
  }
  // etc. etc.
});
```

### Object.freeze()

`Object.freeze()`方法使得一个对象无法添加新的属性，也无法删除旧属性，也无法修改现有属性的`configurable`、`enumerable`和`writable`，使得这个对象实际上变成了常量。

语法：

```c
Object.freeze(o)
```

这里的`o`就是需要`freeze`的对象。

实例：

```c
var o = {
  name: 'cookfront'
};
Object.freeze(o);
o.name = 'zhangmin';
console.log(o.name);  // 'cookfront'
// add property
Object.defineProperty(o, 'age', {
  writable: true,
  configurable: true,
  enumerable: true,
  value: 23
});
console.log(o.age);
remove property
delete o.name;
console.log(o.name);
```

### Object.isFrozen()

`Object.isFrozen`方法用于检查一个对象是否使用了`Object.freeze()`方法。

语法：

```c
Object.isFrozen(o);
```

实例：

```c
var o = {
  name: 'cookfront'
};
Object.freeze(o);
console.log(Object.isFrozen(o));
```

### Object.getOwnPropertyDescriptor()

该方法返回一个给定对象的某个属性的描述。

语法：

```c
Object.getOwnPropertyDescriptor(obj, prop);
```

上面的`obj`是需要寻找属性的对象。而`prop`是需要检索描述的属性名。

实例：

```c
var o = {
  name: 'cookfront'
};
console.log(Object.getOwnPropertyDescriptor(o, 'name'));

var d = {
  get name () {
    return 'cookfront';
  },
  set name (val) {
    console.log(val);
  }
};
console.log(Object.getOwnPropertyDescriptor(d, 'name'));
```

### Object.getOwnPropertyNames()

该方法返回直接定义在某个对象上面的全部属性的名称，返回的是一个数组。需要注意的是它与`Object.keys()`和`for in`的区别：不管该属性是否可枚举，都会返回。

语法：

```c
Object.getOwnPropertyNames(obj)
```

实例：

```c
var arr = ["a", "b", "c"];
print(Object.getOwnPropertyNames(arr).sort()); // prints "0,1,2,length"

// Array-like object
var obj = { 0: "a", 1: "b", 2: "c"};
print(Object.getOwnPropertyNames(obj).sort()); // prints "0,1,2"
```

### Object.getPrototypeOf()

该方法获取指定对象的`prototype`对象。

语法：

```c
Object.getPrototypeOf(obj);
```

实例：

```c
var prop = {};
var o = Object.create(prop);
console.log(Object.getPrototypeOf(o) === prop);
```

### Object.hasOwnProperty()

该方法判断某个属性是否为当前对象自身的属性，还是继承自原型对象的属性。

语法：

```c
obj.hasOwnProperty(prop);
```

实例：

```c
var prop = {
  'type': 'fe'
};

var o = Object.create(prop);
o.name = 'cookfront';
for (var i in o) {
  console.log(o[i]);
}

console.log('hasOwnProperty:');

for (var i in o) {
  if (o.hasOwnProperty(i)) {
    console.log(o[i]);
  }
}
```

### Object.preventExtensible()

该方法使得一个对象无法再添加新的属性。

语法：

```c
Object.preventExtensions(obj);
```

实例：

```c
var obj = {
  name: 'zhangmin'
};
Object.preventExtensions(obj);
obj.age = 23;
console.log(obj); // {name: "zhangmin"}
```

### Object.isExtensible()

该方法判断一个对象是否可以扩展。也即是否调用了`Object.preventExtensions()`，如果调用了`Object.preventExtensions()`则返回`false`。

语法：

```c
Object.isExtensible(obj)
```

实例：

```c
// New objects are extensible.
var empty = {};
assert(Object.isExtensible(empty) === true);

// ...but that can be changed.
Object.preventExtensions(empty);
assert(Object.isExtensible(empty) === false);
```

### Object.isPrototypeOf()

该方法判断当前对象是否为另一个对象的原型。

语法：

```c
prototypeObj.isPrototypeOf(obj);
```

实例：

```c
var prop = {
  type: 'fe'
};

var obj = Object.create(prop);
console.log(prop.isPrototypeOf(obj));
```

### Object.seal()

`Object.seal`方法使得一个对象既无法添加新属性，也无法删除旧属性。并且它还会把现有属性的`attributes`对象的`configurable`属性设为`false`，这使得`attributes`不能再改变。但是，出于历史原因，这时依然可以将writable从true变成false，即可以对现有属性重新赋值。

语法：

```c
Object.seal(obj)
```

实例：

```c
var obj = {
  name: 'cookfront'
};

Object.seal(obj);
console.log(Object.isSealed(obj));

// test writable
obj.name = 'zhangmin';
console.log(obj.name);

// {value: "zhangmin", writable: true, enumerable: true, configurable: false}
console.log(Object.getOwnPropertyDescriptor(obj, 'name'));

Object.defineProperty(obj, 'name', {
  writable: false
});

obj.name = 'aaa';
console.log(obj.name);

// test change enumerable
// throw error
Object.defineProperty(obj, 'name', {
  enumerable: false
});
```

### Object.isSealed()

判断对象是否调用了`Object.seal()`，调用了则返回`true`。

语法：

```c
Object.isSealed(obj);
```

实例：

```c
var obj = {
  name: 'cookfront'
};

Object.seal(obj);
console.log(Object.isSealed(obj));
```

### Object.keys()

该方法返回对象的可枚举属性组成的一个数组。它和`for in`的区别是，`for in`会去判断原型链中的属性。

语法：

```c
Object.keys(obj)
```

实例：

```c
var arr = ["a", "b", "c"];
console.log(Object.keys(arr)); // console: ["0", "1", "2"]

// array like object
var obj = { 0 : "a", 1 : "b", 2 : "c"};
console.log(Object.keys(obj)); // console: ["0", "1", "2"]

// array like object with random key ordering
var an_obj = { 100: "a", 2: "b", 7: "c"};
console.log(Object.keys(an_obj)); // console: ["2", "7", "100"]
```

### Object.propertyIsEnumerable()

该方法返回一个布尔值，判断给定的某属性是否可枚举。

语法：

```c
obj.propertyIsEnumerable(prop);
```

实例：

```c
var o = {};
var a = [];
o.prop = 'is enumerable';
a[0] = 'is enumerable';

o.propertyIsEnumerable('prop');   // returns true
a.propertyIsEnumerable(0);        // returns true
```

