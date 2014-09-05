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