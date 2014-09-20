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

`dataset`属性用于操作HTML标签元素的`data-*`属性。

语法：

```c
string = element.dataset.camelCasedName;
element.dataset.camelCasedName = string;
```

实例：

```c
<div id="user" data-id="1234567890" data-user="johndoe" data-date-of-birth>John Doe
</div>

var el = document.querySelector('#user');

// el.id == 'user'
// el.dataset.id === '1234567890'
// el.dataset.user === 'johndoe'
// el.dataset.dateOfBirth === ''

el.dataset.dateOfBirth = '1960-10-03'; // set the DOB.

// 'someDataAttr' in el.dataset === false

el.dataset.someDataAttr = 'mydata';
// 'someDataAttr' in el.dataset === true
```

### element.id

返回或设置元素的`id`。

### element.innerHTML

`innerHTML`用来读取或设置某个节点内的HTML代码，也就是元素的后代。

### element.length

返回`NodeList`的长度。

### element.name

获取或设置元素的`name`属性。

### element.nextElementSibling

`nextElementSibling`返回元素的立即的兄弟元素节点。

### element.offsetHeight

`offsetHeight`属性是一个只读属性，它返回的是元素的高度加上垂直的`padding`和`border`，单位为像素，且是整数。

![enter image description here](https://developer.mozilla.org/@api/deki/files/788/=OffsetHeight.png)

语法：

```c
var intElemOffsetHeight = document.getElementById(id_attribute_value).offsetHeight;
```

### element.offsetLeft

`offsetLeft`是一个只读属性，它是相对于它的[HTMLElement.offsetParent](http://devdocs.io/dom/htmlelement.offsetparent)的左偏移值，这里的`offsetParent`当前元素中距离它最近的一个定位元素（CSS position 属性被设置为 relative、absolute 或 fixed 的元素），或者这个元素不是定位元素时`table cell`或根元素。

要注意的是，`offsetLeft`是元素的`border box`相对于`offsetParent`的值。

当元素为行内元素时（例如：span），因为它可以有多行，`offsetLeft`和`offsetTop`是第一个`border box`相对于`offsetParent`的对应值，

语法：

```c
left = element.offsetLeft;
```

### element.offsetParent

`offsetParnet`是只读属性，它返回距离元素最近的定位元素对象的引用（CSS position 属性被设置为 relative、absolute 或 fixed 的元素）。如果这个元素不是定位元素，则为最近的`table cell`或者根元素（标准模式为`html`，怪癖模式为`body`）。`offsetLeft`和`offsetTop`属性都是相对于`offsetParent`的`padding`边界。

语法：

```c
parentObj = element.offsetParent;
```

### element.offsetTop

`offsetTop`是相对于`offsetParent`的顶部的距离。

语法：

```c
topPos = element.offsetTop;
```

### element.offsetWidth

`offsetWidth`是一个只读属性，它返回的是元素的宽度＋水平的padding＋水平的border＋垂直滚动条宽度（如果有的话）。

语法：

```c
var offsetWidth =element.offsetWidth;
```

### element.outerHTML

`outerHTML`属性用来读取或设置HTML代码时，会把节点本身包括在内。

语法：

```c
var content = element.outerHTML;
```

实例：

```c
// HTML:
// <div id="d"><p>Content</p><p>Further Elaborated</p></div>

d = document.getElementById("d");
console.log(d.outerHTML);

// the string '<div id="d"><p>Content</p><p>Further Elaborated</p></div>'
```

### element.scrollHeight

`scrollHeight`是一个只读属性，它是元素内容的一种度量，包含了在屏幕中不可见的内容。`scrollHeight`的值是在不产生垂直滚动条的情况下，能容纳元素所有内容时的最小`clientHeight`。

![enter image description here](https://developer.mozilla.org/@api/deki/files/840/=ScrollHeight.png)

语法：

```c
var intElemScrollHeight = document.getElementById(id_attribute_value).scrollHeight;
```

### element.scrollLeft

`scrollLeft`属性获取或设置元素向左滚动的值（像素）。

> 当元素的`direction: rtl`时，此时的`scrollLeft`为0时滚动条是在最右边的位置，如果你想向左移动滚动条需要设置为负值。

语法：

```c
var sLeft = element.scrollLeft;
```

实例：

```c
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        #container {
            border: 1px solid #ccc; height: 100px; overflow: scroll; width: 100px;
        }
        #content {
            background-color: #ccc; width: 250px;
        }
    </style>
    <script>
        document.addEventListener('DOMContentLoaded', function () {   
            var button = document.getElementById('slide');
            button.onclick = function () {
                document.getElementById('container').scrollLeft += 20;
            };
        }, false);
    </script>
</head>
<body>
    <div id="container">
        <div id="content">Lorem ipsum dolor sit amet.</div>
    </div>
    <button id="slide" type="button">Slide</button>
</body>
</html> 
```

### element.scrollTop

`scrollTop`获取或设置元素垂直滚动的距离。当一个元素的内容没有生成垂直滚动条时，`scrollTop`默认为0。

![enter image description here](https://developer.mozilla.org/@api/deki/files/842/=ScrollTop.png)

语法：

```c
// Get the number of pixels scrolled
var  intElemScrollTop = element.scrollTop;
```

### element.scrollWidth

和`scrollHeight`类似，表示整个内容区域的宽度，包括隐藏的部分。当没有水平滚动条产生，则它的值等于`clientWidth`。

语法：

```c
var xScrollWidth = element.scrollWidth;
```

### element.style








## 方法

### element.blur()

`HTMLElement.blur()`方法移除当前元素的焦点。

语法：

```c
element.blur()
```

### element.focus()

`HTMLElement.focus()`方法使指定元素获取焦点，如果该元素能获取焦点的情况。

语法：

```c
element.focus()
```

### element.getAttribute()

`getAttribute()`方法返回元素的指定属性的属性值。如果给定的属性在元素上不存在时，属性值可能是`null`或空字符串。

语法：

```c
var attribute = element.getAttribute(attributeName);
```

### element.getAttributeNode()

`getAttributeNode()`返回指定元素的指定属性，返回的是一个`Attr`节点。

语法：

```c
var attrNode = element.getAttribteNode()
```

实例：

```c
// html: <div id="top" /> 
var t = document.getElementById("top"); 
var idAttr = t.getAttributeNode("id"); 
alert(idAttr.value == "top")
```

### element.geteBoundingRect()

`Element.getBoundingClientRect()`方法返回一个文本矩形对象。

返回值是一个[TextRectangle](https://developer.mozilla.org/en-US/docs/XPCOM_Interface_Reference/nsIDOMClientRect)对象，而`getClientRects()`返回的是一组矩形对象。返回的`TextRectangle`对象包含了几个只读的属性：`left`、`top`、`right`和`bottom`。那这几个属性是相对于哪里呢？`top`和`left`相对于视口的`top-left`（左上角）。而`right`和`bottom`则有点类似于`CSS的clip: rect()`，看个图就明白了。

![enter image description here](http://cookfront.qiniudn.com/CB08A69C-6785-4BD0-B04F-2A2B7C767D05.png)

图虽然粗糙了点，但就是这么个意思。他们都是相对于视口的。

> 在`Gecko 1.9.1`中为`TextRectangle`对象添加了`width`和`height`属性。

除了上面的还有两点需要注意：

 - `left`等6个属性是相对于元素的`border box`的
 - 当需要滚动时才能看见元素，`left`和`top`是相对于视口，也就是没有滚动时浏览器的左上角

下面用实例看下这两点：

实例一：border box

```c
<style>
body {
    margin: 0;
    padding: 0;
}
#demo {
    width: 200px;
    position: relative;
    left: 100px;
    top: 100px;
    height: 100px;
    background: #ccc;
    padding: 10px;
    border: 5px solid #ccc;
}
</style>

<div id="demo"></div>

<script>
var demo = document.getElementById('demo');
console.log(demo.getBoundingClientRect());
</script>
```

实例二：出现滚动条

```c
body {
    margin: 0;
    padding: 0;
}
#scroll {
    height: 1000px;
}
#demo {
    width: 200px;
    position: relative;
    left: 100px;
    top: 100px;
    height: 100px;
    background: #ccc;
    padding: 10px;
    border: 5px solid #ccc;
}
</style>

<div id="demo"></div>

<script>
var demo = document.getElementById('demo');
console.log(demo.getBoundingClientRect());
</script>
```

### element.getClientRects()

`Element.getClientRects()`是返回一组矩形表明了每一个盒子的矩形。

它返回的矩形对象和`getBoundingClientRect()`一样，就不再介绍。

对于行内元素`getClientRects()`对于每一个行框返回一个`TextRectangle`对象：

```c
<style>
body {
    margin: 0;
    padding: 0;
}
#demo {
    width: 400px;
    background: #ccc;
    padding: 10px;
    border: 5px solid #ccc;
}
</style>

<div id="demo">
    <span id="span">8点1氪：阿里巴巴IPO首日收盘价93.89美元，较发行价暴涨38.07% | 今日8点1氪内容包括： 戴尔发布业界首款5K屏显示器；Youtube再投数百位美元支持原创视频；打车软件重创出租车，洛杉矶出租车载客量跌幅达60%；微软关闭硅谷研究实验室。</span>
</div>

<script>
var span = document.getElementById('span');
console.log(span.getClientRects());
</script>
```

### element.getElementsByClassName()

和[document.getElementsByClassName()](https://github.com/cookfront/learn-note/blob/master/JavaScript/javascript-document.md)一样，此时只会在element的子元素中寻找有对应`class`的元素。

### element.getElementsByTagName()

类似[document.getElementsByTagName()](https://github.com/cookfront/learn-note/blob/master/JavaScript/javascript-document.md)，此时只会在element的子元素中寻找有对应`tag name`的元素。需要注意的是，返回值是动态更新的，意味着你不用每次在`DOM`中插入元素后去调用一次`getElementsByTagName()`。

### element.hasAttribute()

`hasAttribute()`返回一个布尔值，表明元素是否有指定的属性。

语法：

```c
var result = element.hasAttribute(attrName)
```

### element.insertAdjacentHTML()

`insertAdjacentHTMl()`方法将指定的文本解析为`HTML`或`XML`，然后插入到`DOM树`中的指定位置。它不会去重新解析将用到的`element`，因此它不会腐败（corrupt）现有元素中内部存在的元素。从而避免了额外的序列化，使得它比`innerHTML`速度更快。

语法：

```c
element.insertAdjacentHTML(position, text);
```

`position`是相对于`element`的位置，它有以下4个值：

 - beforebegin
 - afterbegin
 - beforeend
 - afterend

看看这个就一目了然的知道了他们的位置了：

```c
<!-- beforebegin -->
<p>
<!-- afterbegin -->
foo
<!-- beforeend -->
</p>
<!-- afterend -->
```

实例：

```c
// <div id="one">one</div> 
var d1 = document.getElementById('one'); 
d1.insertAdjacentHTML('afterend', '<div id="two">two</div>');

// At this point, the new structure is:
// <div id="one">one</div><div id="two">two</div>
```

### element.match()

这还是一个实验性的方法。

如果`element`符合`match()`中传入的指定的选择器字符串时，返回`true`。

语法：

```c
result = element.matches(selectorString) 
```

实例：

```c
<div id="foo">This is the element!</div>
<script type="text/javascript">
    var el = document.getElementById("foo");
    if (el.matches("div")) {
      alert("Match!");
    }
</script>
```

### element.querySelector()

### element.querySelectorAll()

上面这两个方法和`Document`中一样，只是会在`element`的后代中寻找，而不是整个文档。

### element.removeAttribute()

移除当前元素指定的特性。

语法：

```c
element.removeAttribute(attrName); 
```

### element.removeAttributeNode()

移除当前元素的指定特性，和`removeAttribute()`不同的是它有一个返回值，返回一个属性节点。

语法：

```c
removedAttr = element.removeAttributeNode(attributeNode)
```

### element.requestFullScreen()

`requestFullscreen()`方法使得浏览器全屏。

语法：

```c
element.requestFullScreen();
```

由于该方法还是实验性的方法，使用时需要判断浏览器支持性：

```c
function launchFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.msRequestFullscreen){ 
    element.msRequestFullscreen();  
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullScreen();
  }
}
```

实例：

```c
<button id="demo">click me to request full screen</button>

<script>
var demo = document.getElementById('demo');
demo.onclick = function (e) {
    launchFullscreen(demo);
}
</script>
```

### element.requestPointerLock()

可以看这里[Pointer Lock](https://developer.mozilla.org/zh-CN/docs/API/Pointer_Lock_API)

### element.scrollIntoView()

### element.setAttribute()

设置当前元素的指定特性。

语法：

```c
element.setAttribute(name, value);
```

> 1. `setAttribute`设置特性时会将`name`小写
> 2. 如果设置特性时，指定的特性已经存在，则`value`会替换当前特性的值，如果不存在该特性，则会创建它

### element.setAttributeNode()

`setAttributeNode()`是将一个属性节点设置到指定元素。

语法：

```c
var replacedAttr = element.setAttributeNode(attribute);
```

实例：

```c
// <div id="one" align="left">one</div> 
// <div id="two">two</div> 
var d1 = document.getElementById("one"); 
var d2 = document.getElementById("two"); 
var a = d1.getAttributeNode("align"); 
d2.setAttributeNode(a.cloneNode(true)); 
alert(d2.attributes[1].value) 
// returns: `left'
```








