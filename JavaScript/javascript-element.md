JavaScript Element
========

## 属性

### element.accessKey

`accessKey`属性设置或返回在元素上设置的`accessKey`。

`accessKey`是指定一个快捷键，这个快捷键可以用于激活元素（使元素获得焦点）。

实例：

```c
<input type="text" id="test">

<script>
document.getElementById('test').accessKey = 'w';
</script>
```

注意按快捷键时需要按住`alt`键。

### element.attributes

`Element.attributes`返回注册在指定节点上的所有属性节点的动态集合。它返回的是一个[NamedNodeMap](http://www.w3.org/TR/2004/REC-DOM-Level-3-Core-20040407/core.html#ID-1780488922)，而不是一个数组，所以它没有数组的方法（例如：slice），且`Attr`节点根据浏览器的不同也会有差异。具体来说，`attributes`是一个名值对的对象代表了节点的相关属性。

语法：

```c
var collAttributes = element.attributes;
```

实例：

```c
<p id="p1" style="color: green;">Sample Paragraph</p>

var p = document.getElementById('p1');
if (p.hasAttributes()) {
  var attrs = p.attributes;
  console.log(attrs);
    for(var i = 0; i < attrs.length; i++) {
      console.log(attrs[i].name + "->" + attrs[i].value);
    }
}
```

这个实例将`p`元素的所有属性打印出来。

### element.childNodes

`childNodes`属性返回一个`NodeList`对象，该对象的成员是父节点的所有子节点，注意返回的不仅包括元素节点，还包括文本节点以及其他各种类型的子节点。如果父对象不包括任何子对象，则返回一个空对象。

注意，该属性是只读的。

实例：

```c
if (parg.hasChildNodes()) {
  // So, first we check if the object is not empty, if the object has child nodes
  var children = parg.childNodes;

  for (var i = 0; i < children.length; i++) {
    // do something with each child as children[i]
    // NOTE: List is live, Adding or removing children will change the list
  }
}
```

### element.children

`Element.children`是一个只读属性，并且返回元素的所有子元素（注意是元素，而不是节点），返回的是一个动态的（会自动更新）[HtmlCollection](http://devdocs.io/dom/htmlcollection)。

语法：

```c
var elList = elementNodeReference.children; 
```

实例：

```c
if (pEl.children.length) {
    var children = pEl.children;
    for (var i = 0; i < children.length; i++) {
        // Do something with each child element as children[i]
        // NOTE: List is live, Adding or removing children will change the list
    }
}
```

### element.classList

`classList`返回一个类数组对象，该对象包含了元素的所有`class`，每个`class`就是对象的一个成员。

`classList`提供了一种很方便的方法来更新元素的`class`，它包含了以下方法：

 - add：向元素的`class`列表添加一个`class`
 - remove：在元素的`class`列表种移除一个`class`
 - toggle：如果有则移除，没有则添加`class`
 - contains：检查元素是否包含某个指定的`class`

语法：

```c
var elementClasses = elementNodeReference.classList;
```

要注意的是`element.classList`是只读的，它只能通过`add`、`remove`等方法来添加或移除`class`等操作。

实例：

```c
div.classList.remove("foo");
div.classList.add("anotherclass");

// if visible is set remove it, otherwise add it
div.classList.toggle("visible");

alert(div.classList.contains("foo"));

div.classList.add("foo","bar"); //add multiple classes
```

### element.className

相比于`classList`，`className`返回的是一个字符串，其中的`class`以空格分隔。

语法：

```c
// get
var cName = elementNodeReference.className;
// set
elementNodeReference.className = cName;
```

实例：

```c
var elm = document.getElementById("div1");

if (elm.className === "fixed") {
  // skip a particular class of element
  goNextElement();
}
```

`jQuery`中就是通过`className`来`addClass`等操作的。具体可以看这里：[jQuery attributes](https://github.com/cookfront/learn-note/blob/master/JavaScript/jQuery/jquery-attributes.md)，里面有相关的源代码分析。

### element.clientHeight

`Element.clientHeight`返回元素的内部高度（单位：px），包含了`padding`，但是不包含水平滚动条高度、`border`以及`margin`。

`clientHeight`可以被计算为：`CSS height` + `CSS padding` - 水平滚动条高度。

> 该属性会将值约等于一个整数，如果你需要一个小数，可以使用[element.getBoundingClientRect()](http://devdocs.io/dom/element.getboundingclientrect)方法。

语法：

```c
var h = element.clientHeight;
```

实例：

```c
<style>
#demo {
  width: 100px;
  overflow: scroll;
  border: 1px solid #ccc;
  height: 50px;
  padding: 10px;
}
</style>

<div id="demo">
  <p>somefasddddddddddddddddddddddddddsadddddddddd</p>
</div>

<script>
alert(document.getElementById('demo').clientHeight);
</script>
```

可以看到上面`#demo`加上`padding`总共是`70px`，但是`alert`的只有53，因为减去了水平滚动条的高度。（在Windows 7下Chrome测试）

### element.clientLeft

元素左边框的宽度，单位为`px`。如果垂直滚动条渲染出来，并且它的位置在左边时，`clientLeft`的值为左边框的值加上滚动条的宽度。怎样才会有左边的滚动条呢，当文本方向是`right-to-left`时，并且导致了滚动条的渲染。

语法：

```c
var left = element.clientLeft;
```

实例：

```c
<style>
.examDiv {
    margin:15px;
    border:2px solid red;
    padding:20px;
}
</style>

<div id="myDiv" class="examDiv">
    This element has the following style settings:<br />
    margin:15px; border:2px solid red; padding:20px;
</div>
<button onclick="GetClientLeft ();">Test clientLeft property!</button>

<script>
var div = document.getElementById ("myDiv");
alert ("The width of the left border (with scrollbar): " + div.clientLeft + "px");
</script>
```

渲染出左滚动条实例：

```c
<style>
.examDiv {
    margin:15px;
    border:2px solid red;
    padding:20px;
    direction: rtl;
    overflow:scroll;
}
</style>

<div id="myDiv" class="examDiv">
    This element has the following style settings:<br />
    margin:15px; border:2px solid red; padding:20px;
</div>
<button onclick="GetClientLeft ();">Test clientLeft property!</button>

<script>
var div = document.getElementById ("myDiv");
alert ("The width of the left border (with scrollbar): " + div.clientLeft + "px");
</script>
```

### element.clientTop

返回元素顶部边框的宽度。它不包含顶部的`margin`和`padding`。且`clientTop`为只读。

语法：

```c
var top = element.clientTop;
```

实例：

```c
<style>
#demo {
  width: 100px;
  height: 100px;
  border: 2px solid #ccc;
}
</style>

<div id="demo"></div>

<script>
var demo = document.getElementById('demo');
alert(demo.clientTop);
</script>
```

### element.clientWidth

该属性返回元素的内部宽度，单位为`px`。它包含`padding`，但是不包含垂直的滚动条（当它渲染出的时候），以及不包含`margin`和`border`。

语法：

```c
var intElemClientWidth = element.clientWidth;
```

### element.contentEditable

`contentEditable`属性表明元素是否可以被编辑。这是一个枚举属性，它具有以下属性值：

 - true
 - false
 - inherit

语法：

```c
editable = element.contentEditable
element.contentEditable = "true"
```

### element.dataset


