Polymer使用教程
========

## 注册元素

为了注册一个元素，使用`Polymer`函数，向该函数传递新元素的原型，该原型中必须有一个`is`属性来指定你的自定义元素的名称。对于这个自定义名称，名称名字中必须包含`-`。

**实例：**

```js
// register an element
MyElement = Polymer({

  is: 'my-element',

  // See below for lifecycle callbacks
  created: function() {
    this.textContent = 'My element!';
  }

});

// create an instance with createElement:
var el1 = document.createElement('my-element');

// ... or with the constructor:
var el2 = new MyElement();
```

### 定义一个自定义构造函数

`Polymer`方法返回了一个基本的构造函数，该构造函数用于实例化我们的自定义元素。如果你想传递参数给该构造函数，你可以在原型上指定一个`factoryImpl`函数。

**实例：**

```js
MyElement = Polymer({

  is: 'my-element',

  factoryImpl: function(foo, bar) {
    this.foo = foo;
    this.configureWithBar(bar);
  },

  configureWithBar: function(bar) {
    ...
  }

});

var el = new MyElement(42, 'octopus');
```

关于自定义构造函数需要注意的亮点：

- `factoryImpl`方法只在你通过构造函数的方式创建元素时才会执行。如果你通过`HTML`标签或者`document.createElement`的方式来创建元素`factoryImpl`是不会执行的。
- `factoryImpl`方法是在元素初始化后被调用的

### 继承原生HTML元素

`Polymer`目前只支持原生HTML元素（例如，input或button，目前暂时不支持自定义元素的继承，会在未来的版本中支持）。

为了继承一个原生HTML元素，在自定义元素的原型上设置一个`extends`属性，属性值即你想继承的原生HTMl元素。

**实例：**

```js
MyInput = Polymer({

  is: 'my-input',

  extends: 'input',

  created: function() {
    this.style.border = '1px solid red';
  }

});

var el1 = new MyInput();
console.log(el1 instanceof HTMLInputElement); // true

var el2 = document.createElement('input', 'my-input');
console.log(el2 instanceof HTMLInputElement); // true
```

在HTML中使用：

```html
<input is="my-input">
```

### 生命周期回调

| 回调函数 | 描述 |
|---|---|
| created | 当元素被创建时调用，但是在属性值被设置或`local DOM`初始化之前。 |
| ready | 当属性值被设置且`local DOM`初始化之后调用。 |
| attached | 当元素插入到文档时调用。 |
| detached | 当元素移除文档时调用。 |
| attributeChanged | 当元素属性值改变时调用。 |

```js
MyElement = Polymer({

  is: 'my-element',

  created: function() {
    console.log(this.localName + '#' + this.id + ' was created');
  },

  ready: function() {
    console.log(this.localName + '#' + this.id + ' has local DOM initialized');
  },

  attached: function() {
    console.log(this.localName + '#' + this.id + ' was attached');
  },

  detached: function() {
    console.log(this.localName + '#' + this.id + ' was detached');
  },

  attributeChanged: function(name, type) {
    console.log(this.localName + '#' + this.id + ' attribute ' + name +
      ' was changed to ' + this.getAttribute(name));
  }

});
```

### 宿主上的静态属性

如果自定义元素需要在创建时设置一些HTML属性，这些属性可以在原型的`hostAttributes`属性中定义。

实例：

```js
<script>

  Polymer({

    is: 'x-custom',

    hostAttributes: {
      'string-attribute': 'Value',
      'boolean-attribute': true
      tabindex: 0
    }

  });

</script>

// 结果
<x-custom string-attribute="Value" boolean-attribute tabindex="0"></x-custom>
```

### class-style构造函数

如果你想设置你的自定义元素的原型链但是不立即注册它，你可以使用`Polymer.Class`函数。`Polymer.Class`函数和`Polymer`函数的区别就是它不会立即注册该元素，而是返回构造函数，从而你可以使用`document.registerElement`在其他地方来注册元素。

如果你想一步定义和注册自定义元素，你可以使用`Polymer`函数。

**实例：**

```js
var MyElement = Polymer.Class({

  is: 'my-element',

  // See below for lifecycle callbacks
  created: function() {
    this.textContent = 'My element!';
  }

});

document.registerElement('my-element', MyElement);

// Equivalent:
var el1 = new MyElement();
var el2 = document.createElement('my-element');
```

那这个`Polymer.Class`有啥用呢？当你使用`ES6 Class`时就有用了：

```js
class MyElement extends Polymer.Class {
  
}

document.registerElement('my-element', MyElement)
```

## 定义属性

你可以通过在原型上添加`properties`对象在自定义元素上声明属性。

**实例：**

```js
Polymer({

  is: 'x-custom',

  properties: {
    user: String,
    isHappy: Boolean,
    count: {
      type: Number,
      readOnly: true,
      notify: true
    }
  },

  ready: function() {
    this.textContent = 'Hello World, I am a Custom Element!';
  }

});
```

`properties`对象中的每个属性支持以下`key`：

| Key| 描述 |
|---|---|
| type | `Type: constructor (one of Boolean, Date, Number, String, Array or Object)`，属性类型。 |
| value | `Type: boolean, number, string or function`。属性的默认值。 |
| reflectToAttribute | `Type: boolean`。如果设置为`true`，当属性值变化时，会导致对应的`attribute`设置到宿主节点上。 |
| readOnly | `Type: boolean`。只读属性，如果设置为`true`，不能通过赋值或数据绑定来设置。 |
| notify | `Type: boolean`。如果设置为`true`，该属性可用于双向数据绑定。额外的，当属性改变时，会触发一个`property-name-changed`的事件。 |
| computed | `Type: string`。键值为一个方法名和参数列表的字符串，例如：`computeFullName(first, last)`，当参数中的任何一个属性发生改变时，就会重新计算属性值。计算属性永远是只读的。 |
| observer |  `Type: string`。键值为一个方法名，当属性值发生变化时该方法被调用。例如：`_disabledChanged ` |

### observer

自定义元素的属性可以通过`properties`对象中的`observer`属性来监测。当属性改变时，处理函数会以属性的新的值和旧的值作为参数。

**实例：**

```js
Polymer({

  is: 'x-custom',

  properties: {
    disabled: {
      type: Boolean,
      observer: '_disabledChanged'
    },
    highlight: {
      observer: '_highlightChanged'
    }
  },

  _disabledChanged: function(newValue, oldValue) {
    this.toggleClass('disabled', newValue);
    this.highlight = true;
  },

  _highlightChanged: function() {
    this.classList.add('highlight');
    this.async(function() {
      this.classList.remove('highlight');
    }, 300);
  }

});
```

#### 监测多个属性

为了监测多个属性，我们可以在原型对象上使用`observers`数组。

`observers`和单个的属性监测有一些不同：

- `observers`只有当所有属性被定义（`!== undefined`）时才会被调用。所以每一个独立属性应该在`properties`中定义一个默认值，以确保`observers`会被调用。
- `observers`不会接收旧的值作为参数，只有新的值。

**实例：**

```js
Polymer({

  is: 'x-custom',

  properties: {
    preload: Boolean,
    src: String,
    size: String
  },

  observers: [
    'updateImage(preload, src, size)'
  ],

  updateImage: function(preload, src, size) {
    // ... do work using dependent values
  }

});
```

#### 监测子属性改变

为了监测对象的子属性：

- 定义一个`observers`数组
- 添加一项到`observers`数组中，类似`onNameChange(dog.name)`或`onNameChange(dog.name, cat.name)`
- 在原型中定义监测方法，当方法调用时，传入的参数即为子属性的新的值

**实例：**

```js
<dom-module id="x-sub-property-observer">
  <template>
    <!-- Sub-property is updated via property binding. -->
    <input value="{{user.name::input}}">
  </template>
  <script>
    Polymer({
      is: 'x-sub-property-observer',
      properties: {
        user: {
          type: Object,
          value: function() {
            return {};
          }
        }
      },
      // Each item of observers array is a method name followed by
      // a comma-separated list of one or more paths.
      observers: [
        'userNameChanged(user.name)'
      ],
      // Each method referenced in observers must be defined in
      // element prototype. The argument to the method is the new value
      // of the sub-property.
      userNameChanged: function(name) {
        console.log('new name: ' + name);
      },
    });
  </script>
</dom-module>
```

#### 监测数组改变

要监测数组的变化，需要用到`Polymer`的数组变化方法。

为了创建一个`splice observer`，在你需要监测的数组路径后加上`.splices`：

```js
observers: [
  'usersAddedOrRemoved(users.splices)'
]
```

你的监测方法应该只接收一个参数，当你的监测方法被调用时，它接收一个在数组上发生变化的变更记录作为参数。每个变更记录提供以下属性：

- indexSplices：发生在数组上的变更集合，每个`indexSplices`又包含以下属性：
 - index：`splice`开始的位置
 - removed：被移除的项
 - addedCount：在`index`处新增的元素数
 - object： 
 - type：字符串`splice`

**实例：**

```js
Polymer({

  is: 'x-custom',

  properties: {
    users: {
      type: Array,
      value: function() {
        return [];
      }
    }
  },

  observers: [
    'usersAddedOrRemoved(users.splices)'
  ],

  usersAddedOrRemoved: function(changeRecord) {
    if (changeRecord) {
      changeRecord.indexSplices.forEach(function(s) {
        s.removed.forEach(function(user) {
          console.log(user.name + ' was removed');
        });
        for (var i=0; i<s.addedCount; i++) {
          var index = s.index + i;
          var newUser = s.object[index];
          console.log('User ' + newUser.name + ' added at index ' + index);
        }
      }, this);
    }
  },
  ready: function() {
    this.push('users', {name: "Jack Aubrey"});
  },
});
```

### notify

当在一个属性上设置`notify: true`时，当属性值改变时会触发一个事件，事件名为：`property-name-changed`。

### readOnly

当一个属性只`生产`数据而不消耗数据时，我们可以通过`readOnly: true`来明确的设置该属性为只读。然而当你需要改变该只读属性，你只能通过私有的`_setProperty(value)`来设置：

```js
<script>
  Polymer({

    properties: {
      response: {
        type: Object,
        readOnly: true,
        notify: true
      }
    },

    responseHandler: function(response) {
      this._setResponse(response);
    }

  });
</script>
```

### computed

`Polymer`支持计算属性，它的值可以根据其他属性的值计算出来。

要定义一个计算属性：

```js
fullName: {
  type: String,
  computed: 'computeFullName(first, last)'
}
```

当计算属性依赖的任何属性发生改变时，计算函数会重新计算新的计算属性值。

计算函数会等到所有依赖的属性定义后才会调用，所以最好在依赖的属性中设置一个不为`undefined`的默认值。


### reflectToAttribute

在某些情况下，保持HTML的`attribute`和某个属性值同步是非常有用的，这可以通过`reflectToAttribute: true`来激活。

```js
<script>
  Polymer({

    properties: {
     response: {
        type: Object,
        reflectToAttribute: true
     }
    },

    responseHandler: function(response) {
      this.response = 'loaded';
      // results in this.setAttribute('response', 'loaded');
    }

  });
</script>
```

## 实例方法

## Behaviors

## Local DOM & Styling

## 事件

## Data Binding