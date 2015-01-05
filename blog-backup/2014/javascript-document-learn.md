title: JavaScript document 详解
date: 2014-08-05 10:19:04
categories: JavaScript
tags: [JavaScript, document]
---


本文是从[MDN document][1]整理。

`document`对象应该算是`DOM`操作中使用最频繁的，它是文档的根节点，`window.document`就是属于这个对象。浏览器中加载的每一个网页都有它自己的文档对象。`Document`接口作为网页内容的入口，提供了相对于全局的功能函数（例如页面的URL和在页面新建一个元素等）。

那么如何获得`document`呢？

 - 通常情况下，你使用的`js`脚本是在文档的文件脚本中时，直接使用`document`。同样你也可以通过`window.document`。
 - 在`iframe`的文档中通过[contentDocument][2]来获取
 - 在文档的节点或者元素通过[ownerDocument][3]来获取

## document属性

### document.URL

这个属性返回文档的URL，返回类型为字符串。

<a href="#" onclick="alert(document.URL)" style="font-size: 16px;">click me to get document.URL</a>

```c
<a href="#" onclick="alert(document.URL)">click me to get document.URL</a>
```

### document.activeElement

该属性时获取文档中当前获取焦点(focus)的元素。

```c
<textarea id="text"></textarea>

var text = document.getElementById('text');
text.focus();
console.log(document.activeElement);
```

### document.anchors

该属性用于获取文档中的所有锚点。

[view demo][4]

### document.body

返回当前文档的`<body>`或`<frameset>`节点，如果没有这样的元素则返回`null`。需要注意的是，在`iframe`中，`document.body`是返回最外层的`<frameset>`元素。

```c
<body id="body-id>
</body>

var body = document.body;
alert(body.id);
```

### document.cookie

设置或者获取关于当前文档的`cookie`。

#### 获取cookie

```c
allCookie = document.cookie;
```

通过`document.cookie`可以获取页面所有的cookie。

#### 设置cookie

```c
document.cookie = updateOfCookie;
```

设置cookie时，`updateOfCookie`是一个`name=val`类型的字符串，当然除了名值对之外还可以设置cookie的路径、到期时间等，通过在名值对后面�加分号分割的各个设置项：

 - ;path=path：如果没有设置该属性时，默认是当前文档的当前路径或者其子路径可以访问该cookie。当设置了类似`/mydir`类似的路径时，就只能`/mydir`和其子目录可以访问到设置的cookie了。如果需要cookie在其他目录或者是父目录能访问时，可以设置path为`path=/`。
 - ;domain=domain：当没有设置该选项时，默认为当前文档的所在位置的主机部分。
 - ;max-age=max-age-in-seconds：该选项定义cookie的存活时间（例如：60*60*24*365为一年）
 - ;expires=date-in-GMTString-format：该选项定义cookie的到期时间。如果没有设置则为本次会话的结束时间。
 - ;secure：设置该选项cookie将通过安全协议来传输

下面时参照[Aralejs.cookie][5]写的：

```c
var decode = decodeURIComponent;
var encode = encodeURIComponent;

function parseCookie (text, shouldDecode) {
	var cookies = {};

	if (typeof text === 'string' && text.length > 0) {
		var cookieParts = text.split(/;\s/g),
			len = cookieParts.length,
			decodeFunc = shouldDecode ? decode : function (s) { return s; };
			cookieName, cookieValue, cookieNameValue, i, item;

		for (i = 0; i < len; i++) {
			item = cookieParts[i];
			cookieNameValue = item.match(/([^=]+)=/i);
			if (cookieNameValue instanceof Array) {
				cookieName = decodeFunc(cookieNameValue[1]);
				cookieValue = decodeFunc(item.substring(cookieNameValue.length + 1));
			} else {
				cookieName = decodeFunc(item);
				cookieValue = '';
			}

			if (cookieName) {
				cookies[cookieName] = cookieValue;
			}
		}
	}

	return cookies;
}

var Cookie = {
	get: function (name, options) {
		// validate cookie name
		if (typeof name !== 'string' || name === '') {
			throw new Error('Cookie name muse be a non-empty string');
		}

		options = options || {};
		return parseCookie(document.cookie, !options.raw)[name];
	},
	set: function (name, value, options) {
		// validate cookie name
		if (typeof name !== 'string' || name === '') {
			throw new Error('Cookie name muse be a non-empty string');
		}

		options = options || {};

		// cache variable
		var path = options['path'],
			domain = options['domain'],
			expires = options['expires'],
			secure = options['secure'];

		// if options raw is false, encode value
		if (!options[raw]) {
			value = encode(value);
		}

		var text = name + '=' + value;

		// path
		if (typeof path === 'string' && path !== '') {
			text += '; path=' + path;
		}

		// domain
		if (typeof domain === 'string' && domain !== '') {
			text += '; domain=' + domain;
		}

		// expires
		if (typeof expires === 'number') {
			var date = new Date();
			date.setDate(date.getDate() + expires);
		}
		if (date instanceof Date) {
			text += '; expires=' + date.toUTCString();
		}

		if (secure) {
			text += '; secure';
		}

		document.cookie = text;
		return text;
	},
	remove: function (name, options) {
		options = options || {};
		options.expires = new Date(0);
		this.set(key, '', options);
	}
};
```

### document.defaultView

在浏览器中关联该文档的[window][6]对象，如果没有可用的，则返回null。

```c
console.log(document.defaultView === window)
```

### document.domain

设置或者获取当前文档的域，经常用在[同源策略][7]中。

### document.embeds

该属性返回一个当前文档的嵌入对象列表。

### document.forms

该属性返回当前文档中的`form`元素的集合。

```c
<form id="aa">
	<button onclick="alert(document.forms[0].id)">form 0</button>
</form>

<form id="bb">
	<button onclick="alert(document.forms[1].id)">form 1</button>
</form>
```

### document.head

该属性返回当前文档的`head`元素，如果存在多个`<head>`元素，则返回第一个。

```c
console.log(document.head === document.querySelector('head'));
```

### document.images

该属性返回当前文档的所有`img`元素集合。

```c
<img src="aa.jpg" alt="" id="img-1">
<a href="" onclick="alert(document.images[0].id)">img-1</a>

<img src="bb.jpg" alt="" id="img-2">
<a href="" onclick="alert(document.images[1].id)">img-2</a>
```

### document.lastModified

该属性返回文档文件的上一次修改时间。

```c
console.log(document.lastModified);
```

### document.links

该属性返回文档中所有`<area>`和`<a>`元素的集合，它们有一个特点就是有一个`href`属性。

```c
<a href="">aaa</a>
<area shape="" coords="" href="" alt="">
<a href="">bbb</a>
<p>ccc</p>

console.log(document.links);
```

### document.location

该属性为只读属性，它返回一个``[Location][8]对象，这个对象包含了文档URL的信息，并且提供了方法来改变URL和加载其他URL。

尽管`Document.location`是一个只读的`Location`对象，你同样可以为它指定一个[DOMString][9]。这意味着在多数情况下，可以像使用字符串一样来使用`document.location`。`document.location = 'http://www.example.com`和`document.location.href = 'http://www.example.com'`具有同样的效果。

为了将URL检索为字符串，只读的`document.URL`同样是可以被使用的。

如果当前的文档不是在浏览器环境时，将会返回`null`。

### document.readyState

当文档正在加载时，该属性返回`loading`，当文档完成解析，并且在加载子资源时返回`interactive`，当文档全部加载完毕时返回`complete`。

当文档的`readyState`改变时会触发`onreadystatechange`事件。

```c
// alternative to load event
document.onreadystatechange = function () {
  if (document.readyState == "complete") {
    initApplication();
  }
}
```

### document.referrer

该属性返回链接到该页面的URI。

> 当用户直接访问该页面时（例如：通过书签访问），此时该属性为空字符串。

### document.scripts

该属性返回文档中`<script>`元素的集合，返回的`scriptList`是一个[HTMLCollection][10]。

### document.stylesheets

该属性是一个只读属性，它返回一个[StyleSheetList][11]的样式表对象，这些样式表直接嵌入到文档中或者链接到文档中。

### document.title

该属性设置或者获取文档的标题。

```c
<!DOCTYPE html>
<html>
<head>
<title>Hello World!</title> 
</head>
<body>

<script>
alert(document.title); // displays "Hello World!"
document.title = "Goodbye World!";
alert(document.title); // displays "Goodbye World!"
</script>

</body>
</html>
```

### document.compatMode

该属性表明文档是在[怪癖模式][12]还是严格模式渲染。

```c
mode = document.compatMode;
```

上面的`mode`如果是在怪癖模式下则返回`BackCompat`，在严格模式下则返回`BackCompat`。

### document.currentScript

该属性返回当前正在处理的`<script>`元素。

```c
var curScriptElement = document.currentScript;
```

### document.documentElement

该属性为只读属性，返回文档的根元素（在html文档中，返回`<html>`元素）。

```c
var rootElement = document.documentElement;
```

### document.implementation

该属性返回一个关联当前文档的[DOMImplementation][13]对象。

```c
DOMImpObj = document.implementation;
```
在返回的[DOMImplementation][14]对象中常用的就是`hasFeature`方法，该方法用于判断某个`DOM`模块是否被浏览器支持。例如：

```c
document.implementation.hasFeature('MutationEvents','2.0')
// true
```

## document方法

### document.createNodeIterator()

该方法返回一个[NodeIterator][15]对象。

#### 语法

```c
var nodeIterator = document.createNodeIterator(root, whatToShow, filter);
```

参数介绍：

 - root：[NodeIterator][16]开始遍历的根节点
 - whatToShow：是一个数字常量表明哪种类型的节点会被遍历
     - NodeFilter.SHOW_ALL：显示所有节点
     - NodeFilter.SHOW_ATTRIBUTE ：显示特性节点
     - NodeFilter.SHOW_CDATA_SECTION ：显示[CDATASection][17]节点
     - NodeFilter.SHOW_COMMENT：显示注释节点
     - NodeFilter.SHOW_DOCUMENT：显示[Document][18]节点
     - NodeFilter.SHOW_DOCUMENT_FRAGMENT：显示DocumentFragment节点
     - NodeFilter.SHOW_DOCUMENT_TYPE：显示[DocumentType][19]节点
     - NodeFilter.SHOW_ELEMENT：显示元素节点
     - NodeFilter.SHOW_TEXT：显示文本节点
 - filter：一个实现了[NodeFilter][20]接口的对象，用于过滤节点。它的`acceptNode()`方法会在会被子树中的每一个节点调用，这些节点是基于根节点和`whatToShow`标识哪些会包含在遍历的节点中。这个方法会返回`NodeFilter.FILTER_ACCEPT`，`NodeFilter.FILTER_REJECT`和`NodeFilter.FILTER_SKIP`。
     - FILTER_ACCEPT：当`NodeFilter.acceptNode()`返回这个值是节点将被接受
     - FILTER_REJECT：忽略这个节点和它的子节点
     - FILTER_SKIP：忽略这个节点但是不忽略它的子结点

```c
<div>
	<div>
		<div>
			<div>
				<p>ccc</p>
			</div>
		</div>
	</div>
</div>

<script>
var nodeIterator = document.createNodeIterator(
    document.body,
    NodeFilter.SHOW_ELEMENT,
    function(node) {
        return node.nodeName.toLowerCase() === 'p' ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    },
    false
);
var pars = [];
var currentNode;

while (currentNode = nodeIterator.nextNode()) {
  pars.push(currentNode);
}
</script>
```

### document.createRange()

该方法返回一个[Range][21]对象。

```c
range = document.createRange();
```

### document.createTreeWalker()

该方法返回一个[TreeWalker][22]对象。

```c
treeWalker = document.createTreeWalker(root, whatToShow, filter, entityReferenceExpansion);
```

参数和上面的`document.createNodeIterator()`方法一样，只是多了一个`entityReferenceExpansion`的参数。这个参数是一个布尔值参数，它表明当丢弃一个[EntityReference][23]时，它的子树是不是也需要丢弃。

```c
var treeWalker = document.createTreeWalker(
  document.body,
  NodeFilter.SHOW_ELEMENT,
  { acceptNode: function(node) { return NodeFilter.FILTER_ACCEPT; } },
  false
);

var nodeList = [];

while(treeWalker.nextNode()) nodeList.push(treeWalker.currentNode);
```

### document.getElementsByName()

该方法传入一个名字参数，并且返回一个带有这名字的nodelist集合。

#### 语法

```c
elements = document.getElementsByName(name)
```

 - elements：返回的[NodeList][24]集合
 - name：时元素特性值`name`的值

#### 实例

```c
<!DOCTYPE html>
<html lang="en">
<head>
 ...
</head>

<body>
<form name="up"><input type="text"></form>
<form name="down"><input type="text"></form>

<script>
var up_forms = document.getElementsByName("up");
console.log(up_forms[0].tagName); // returns "FORM"
</script>
</body>
</html>
```

### document.releaseCapture()

如果本文档的元素当前被激活时，释放鼠标的捕获。在元素上启用鼠标捕获时通过调用`element.setCapture()`。

```c
document.releaseCapture();
```
一旦鼠标事件被释放时，鼠标事件将不再直接指向启用鼠标捕获的元素。

### document.createAttribute()

该方法创建一个新的特性节点，并将其返回。

#### 语法

```c
attribute = document.createAttribute(name) 
```

 - attribute：是一个特性节点
 - name：一个字符串包含了特性的名字

#### 实例

```c
<html>

<head>
<title> create/set/get Attribute example</title>

<script type="text/javascript">

function doAttrib() {
  var node = document.getElementById("div1");
  var a = document.createAttribute("my_attrib");
  a.nodeValue = "newVal";
  node.setAttributeNode(a);
  alert(node.getAttribute("my_attrib")); // "newVal"
}

// alternative form not actually using createAttribute
//function doAttrib() {
//  var node = document.getElementById("div1");
//  node.setAttribute("my_attrib", "newVal");
//  alert(node.getAttribute("my_attrib")); // "newVal"
//}

</script>
</head>

<body onload="doAttrib();">
<div id="div1">
<p>Some content here</p>
</div>
</body>
</html>
```

### document.createDocumentFragment()

该方法返回一个空的[DocumentFragment][25]

#### 语法

```c
var docFragment = document.createDocumentFragment();
```

`docFragment`是一个空[DocumentFragment][26]对象的引用。

#### 描述

[DocumentFragment][27]s是DOM节点。但它们不在DOM树中。通常的用法是创建一个`DocumentFragment`，然后将元素附加到文档碎片中，最后再将文档碎片附加到文档中。附加子元素到文档碎片中不会导致文档的[reflow][28]，从而可以获得更好的性能。

#### 实例

```c
var ul = document.getElementsByTagName("ul")[0]; // assuming it exists
var docfrag = document.createDocumentFragment();
var browserList = ["Internet Explorer", "Mozilla Firefox", "Safari", "Chrome", "Opera"];

browserList.forEach(function(e) {
  var li = document.createElement("li");
  li.textContent = e;
  docfrag.appendChild(li);
});

ul.appendChild(docfrag);
```

### document.createElement()

在HTML文档中创建指定的`HTML`元素或者[HTMLUnknowElement][29]。

#### 语法

```c
var element = document.createElement(tagName);
```

 - element：创建的[element][30]对象
 - tagName：指定将要创建的元素名称。

#### 实例

```c
function addElement () { 
  // create a new div element 
  // and give it some content 
  var newDiv = document.createElement("div"); 
  var newContent = document.createTextNode("Hi there and greetings!"); 
  newDiv.appendChild(newContent); //add the text node to the newly created div. 

  // add the newly created element and its content into the DOM 
  var currentDiv = document.getElementById("div1"); 
  document.body.insertBefore(newDiv, currentDiv); 
}
```

### document.createElementNS()

创建具有指定命名空间URI（namespace URI）和指定名字的元素。

#### 语法

```c
element = document.createElementNS(namespaceURI, qualifiedName);
```

 - element：被创建的元素
 - namespaceURI：是一个字符串指定了关联元素的[namespace URI][31]。被创建元素的[namespaceURI][32]属性被初始化为参数中`namespaceURI`的值
     - HTML - Use http://www.w3.org/1999/xhtml
     - XUL - Use http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul
     - SVG - Use http://www.w3.org/2000/svg
 - qualifiedName：是一个字符串，指定被创建元素的类型。被创建元素的[nodeName][33]属性被初始化为`qualifiedName`的值

#### 实例

```c
<?xml version="1.0"?>
<page xmlns="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul"
      xmlns:html="http://www.w3.org/1999/xhtml"
      title="||Working with elements||"
      onload="init()">

<script type="text/javascript"><![CDATA[
 var container;
 var newdiv;
 var txtnode;

 function init(){
   container = document.getElementById("ContainerBox");
   newdiv = document.createElementNS("http://www.w3.org/1999/xhtml","div");
   txtnode = document.createTextNode("This is text that was constructed dynamically with createElementNS and createTextNode then inserted into the document using appendChild.");
   newdiv.appendChild(txtnode);
   container.appendChild(newdiv);
 }

]]></script>

 <vbox id='ContainerBox' flex='1'>
  <html:div>
   The script on this page will add dynamic content below:
  </html:div>
 </vbox>

</page>
```
 
### document.createEvent()
 
创建一个指定类型的[event][34]，该方法返回的对象应该首先被初始化，然后可以被传递到[element.dispatchEvent][35]。

#### 语法

```c
var event = document.createEvent(type);
```

 - event：被创建的event对象
 - type：一个字符串，指定了将被创建的事件类型。可能的事件类型包含：`UIEvents`、`MouseEvents`、`MutationEvents`和`HTMLEvents`。

#### 实例

```c
var event = new Event('build');

// Listen for the event.
elem.addEventListener('build', function (e) { ... }, false);

// Dispatch the event.
elem.dispatchEvent(event);
```

### document.createTextNode()

创建一个文本节点。

#### 语法

```c
text = document.createTextNode(data);
```

 - text：返回的文本节点
 - data：将被插入到文本节点的字符串数据

#### 实例

```c
<!DOCTYPE html>
<html lang="en">
<head>
<title>createTextNode example</title>
<script>
function addTextNode(text) {
  var newtext = document.createTextNode(text),
      p1 = document.getElementById("p1");

  p1.appendChild(newtext);
}
</script>
</head>

<body>
  <button onclick="addTextNode('YES! ');">YES!</button>
  <button onclick="addTextNode('NO! ');">NO!</button>
  <button onclick="addTextNode('WE CAN! ');">WE CAN!</button>

  <hr />

  <p id="p1">First line of paragraph.</p>
</body>
</html>
```

### document.getElementById()

通过元素的`id`获取到元素的引用。

```c
element = document.getElementById(id);
```

### document.getElementsByClassName()

该方法需要传入一个或多个`class name`，并且返回一个类数组的对象。当你在`document`上调用该方法时，整个文档都会被搜索，包括根节点。你同样可以在任何元素上调用`getElementsByClassName()`，此时只会通过`class names`搜索调用该元素的子孙元素。

#### 语法

```c
var elements = document.getElementsByClassName(names); // or:
var elements = rootElement.getElementsByClassName(names);
```

 - elements：是发现元素的[HTMLCollection][36]
 - names：可以通过空格分隔指定一个或多个类名，如果指定多个说明元素必须同时有传入的多个类名时才会返回
 - getElementsByClassName()不仅仅只是在`document`上调用，同样可以在文档中任何其他元素调用

#### 实例

通过单个类名获取元素：

```c
document.getElementsByClassName('test');
```

通过多个类名获取元素，此时元素必须符合包含指定的类名`red test`

```c
document.getElementsByClassName('red test');
```
### document.getElementsByTagName()

该方法和`document.getElementsByClassName()`类似，返回元素的[HTMLCollection][37]，并且需要传入一个标签名作为参数。它也不仅仅只作用在`document`上。可以看这里[document.getElementsByTagName][38]。

### document.getElementsByTagNameNS()

返回一个指定标签名和指定命名空间的元素列表。

#### 语法

```c
elements = document.getElementsByTagNameNS(namespace, name)
```

### document.querySelector()

该方法返回指定选择器在文档中的第一个元素。如果没有匹配，则返回`null`。

#### 语法

```c
element = document.querySelector(selectors);
```

 - element：返回的[element][39]对象
 - selectors：一个或多个CSS选择器

#### 实例

```c
var el = document.querySelector(".myclass");
```
 
### document.querySelectorAll()

该方法返回一个[NodeList][40]，通过指定的选择器返回文档中所有匹配的元素。

#### 语法

```c
elementList = document.querySelectorAll(selectors);
```

#### 实例

```c
var matches = document.querySelectorAll("div.note, div.alert");
```
 
最后，简单的测试了一下`getElementById()`和`getElementsByClassName()`等方法的性能：[性能测试][41]。
 
 
          
 


  [1]: https://developer.mozilla.org/en-US/docs/Web/API/document
  [2]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement#Properties
  [3]: https://developer.mozilla.org/en-US/docs/Web/API/Node.ownerDocument
  [4]: http://jsfiddle.net/S4yNp/
  [5]: https://github.com/aralejs/cookie/blob/master/index.js
  [6]: https://developer.mozilla.org/en-US/docs/DOM/window
  [7]: https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy
  [8]: https://developer.mozilla.org/en-US/docs/Web/API/Location
  [9]: https://developer.mozilla.org/en-US/docs/Web/API/DOMString
  [10]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection
  [11]: https://developer.mozilla.org/en-US/docs/Web/API/StyleSheetList
  [12]: https://developer.mozilla.org/en/Quirks_Mode_and_Standards_Mode
  [13]: https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation
  [14]: https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation
  [15]: https://developer.mozilla.org/en-US/docs/Web/API/NodeIterator
  [16]: https://developer.mozilla.org/en-US/docs/Web/API/NodeIterator
  [17]: https://developer.mozilla.org/en-US/docs/Web/API/CDATASection
  [18]: Document
  [19]: https://developer.mozilla.org/en-US/docs/Web/API/DocumentType
  [20]: https://developer.mozilla.org/en-US/docs/Web/API/NodeFilter
  [21]: https://developer.mozilla.org/en-US/docs/Web/API/Range
  [22]: https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker
  [23]: https://developer.mozilla.org/en-US/docs/Web/API/EntityReference
  [24]: https://developer.mozilla.org/en-US/docs/Web/API/NodeList
  [25]: https://developer.mozilla.org/en-US/docs/DOM/DocumentFragment
  [26]: https://developer.mozilla.org/en-US/docs/DOM/DocumentFragment
  [27]: https://developer.mozilla.org/en-US/docs/DOM/DocumentFragment
  [28]: http://code.google.com/speed/articles/reflow.html
  [29]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLUnknownElement
  [30]: https://developer.mozilla.org/en-US/docs/DOM/element
  [31]: http://www.w3.org/TR/2004/REC-DOM-Level-3-Core-20040407/glossary.html#dt-namespaceURI
  [32]: https://developer.mozilla.org/en-US/docs/DOM/element.namespaceURI
  [33]: https://developer.mozilla.org/en-US/docs/DOM/element.nodeName
  [34]: https://developer.mozilla.org/en-US/docs/DOM/event
  [35]: https://developer.mozilla.org/en-US/docs/DOM/element.dispatchEvent
  [36]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection
  [37]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection
  [38]: https://developer.mozilla.org/en-US/docs/Web/API/document.getElementsByTagName
  [39]: https://developer.mozilla.org/en-US/docs/DOM/element
  [40]: https://developer.mozilla.org/en-US/docs/Web/API/NodeList
  [41]: http://jsperf.com/javascript-selector-performance