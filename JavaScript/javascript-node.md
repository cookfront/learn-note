Node
=======

本文从[MDN Node](https://developer.mozilla.org/en-US/docs/Web/API/Node)整理。


## 属性

### attributes

`attributes`返回元素已有属性的集合。

语法：

```c
var collAttributes = elementNodeReference.attributes;
```

该属性返回一个[NamedNodeMap](http://www.w3.org/TR/2004/REC-DOM-Level-3-Core-20040407/core.html#ID-1780488922)类型的集合，它是一个Attr节点的集合. 可以使用节点的名称和索引访问集合内的元素. 但是请注意, 它不像NodeList, NamedNodeMap维护其中元素的次序。

注意：`attributes`对象是实时更新的。

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

### childNodes

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

### firstChild

该属性返回节点在`DOM`中的第一个儿子，或者是`null`，如果该节点没有儿子。

语法：

```c
var childNode = node.firstChild;
```

实例：

```c
<p id="p1">
  <span>First span</span>
</p>

var p = document.getElementById('p1');
console.log(p.firstChild);
```

可以注意到在控制台打印的是`#text`，那是因为空白被当成一个文本节点，在`<p>`和`<span>`之间有一段空白。任何的空白都会引起`#text`节点的插入。在这个例子中另外一个`#text`节点是`</span>`和`</p>`之间。

当你将空白移除，变成下面这样：

```c
<p id="p1"><span>First span</span></p>

var p = document.getElementById('p1');
console.log(p.firstChild);
```

这时控制台打印的就是`span`了。

### lastChild

该属性返回节点在`DOM`中的最后儿子，或者是`null`，如果该节点没有儿子。

语法：

```c
var childNode = node.lastChild;
```

其他和`firstChild`一样。

### nextSibling

返回紧跟该元素的兄弟节点，如果该节点为父元素节点的最后一个节点，则返回`null`。

语法：

```c
nextNode = node.nextSibling
```

实例：

```c
<div id="div-01">Here is div-01</div>
<div id="div-02">Here is div-02</div>

<script type="text/javascript">
var el = document.getElementById('div-01').nextSibling,
    i = 1;

console.log('Siblings of div-01:');

while (el) {
  console.log(i + '. ' + el.nodeName);
  el = el.nextSibling;
  i++;
}

</script>

/**************************************************
  The following is written to the console as it loads:

     Siblings of div-01

      1. #text
      2. DIV
      3. #text
      4. SCRIPT

**************************************************/
```

### nodeName

返回节点的名称。

语法：

```c
var str = node.nodeName;
```

### nodeType

返回节点的类型。

语法：

```c
var str = node.nodeType;
```

这个属性返回一个数字值，表示当前的节点类型。具体的数字对应的节点类型请看下面：

![enter image description here](http://cookfront.qiniudn.com/nodetype.png)

### nodeValue

返回节点的值。

语法：

```c
var str = node.nodeValue;
```

该属性一般是用于`text`，`comment`节点，对于元素节点这个属性会返回`null`。

### ownerDocument

该属性返回当前节点所在的文档的文档节点。

语法：

```c
var str = node.ownerDocument;
```

实例：

```c
// given a node "p", get the top-level HTML child 
// of the document object

var d = p.ownerDocument; 
var html = d.documentElement;
```

### parentElement

返回该节点的父元素，如果没有则返回`null`，或者它的父亲不是一个[element](https://developer.mozilla.org/en-US/docs/Web/API/element)时也返回`null`。

语法：

```c
var str = node.parentElement;
```

实例：

```c
if (node.parentElement) {
    node.parentElement.style.color = "red";
}
```

### parentNode

返回节点的父节点。注意与上面`parentElement`的区别，上面返回的是一个`element`，而这里是一个`node`。可能是`element`节点，也可能是`document`节点或`DocumentFragment`节点。

语法：

```c
parentNode = node.parentNode
```

实例：

```c
if (node.parentNode) {
  // remove a node from the tree, unless 
  // it's not in the tree already
  node.parentNode.removeChild(node);
}
```

### previousSibling

返回该元素前面的兄弟节点，如果该节点为父元素节点的第一个节点，则返回`null`。

语法：

```c
previousNode = node.previousSibling;
```

实例：

```c
// <a><b1 id="b1"/><b2 id="b2"/></a>

alert(document.getElementById("b1").previousSibling); // null
alert(document.getElementById("b2").previousSibling.id); // "b1"
```

### textContent

读取或设置节点包含的文本内容。

语法：

```c
var text = element.textContent; element.textContent = "this is some sample text";
```

这个属性在`IE`中是不支持的，`IE`下对应的属性为`innerText`
，这两个属性通常可以互换使用，但是还是有不同的：

 - `textContent`属性获取所有元素的内容，包括`<script>`和`<style>`元素，但是`innerText`不包括这些内容。
 - `innerText`不会返回隐藏的文本，而`textContent`会。
 - `innerText`或引起一个`reflow`，而`textContent`不会。

实例：

```c
// Given the following HTML fragment:
//   <div id="divA">This is <span>some</span> text</div>

// Get the text content:
var text = document.getElementById("divA").textContent;
// |text| is set to "This is some text".

// Set the text content:
document.getElementById("divA").textContent = "This is some text";
// The HTML for divA is now:
//   <div id="divA">This is some text</div>
```

## 方法

### appendChild()

`appendChild()`方法用于在父节点的最后一个子节点后，再插入一个子节点。如果插入的节点已经存在，则将其从它的父节点中移除，再插入到新到父节点中。

语法：

```c
var child = element.appendChild(child);
```

这里`element`就是父节点，`child`就是需要插入的子节点。该方法返回一个到新插入节点的引用。

实例：

```c
// Create a new paragraph element, and append it to the end of the document body
var p = document.createElement("p");
document.body.appendChild(p);
```

注意：

如果`child`是当前文档中一个已经存在的节点，`appendChild`会将其从它当前的位置移动到新的位置。如果你希望`child`继续留在当前节点，你可以使用`cloneNode`复制后再`appendChild`。

### cloneNode()

`cloneNode()`方法用于克隆一个节点。它接受一个布尔值作为参数，表示是否同时克隆子节点，默认是false，即不克隆子节点。

语法：

```c
var dupNode = node.cloneNode(deep);
```

这里`node`即为需要复制的节点，返回一个克隆的新节点`dupNode`。

实例：

```c
var p = document.getElementById("para1");
var p_prime = p.cloneNode(true);
```

注意：

克隆一个节点会拷贝它的所有属性以及自身的监听器。但是不会拷贝`addEventListener()`和`node.onclick = fn`类似的事件监听器。

复制的节点不会被插入到文档中，除非用`appendChild()`类似的方法将它添加到文档。

如果`deep`被设置为`false`时，子节点不会被复制。

### contains()

`contains`方法检查一个节点是否为另一个节点的子节点。

语法：

```c
node.contains( otherNode )
```

如果`otherNode`为`node`的后代，则返回`true`，否则返回`false`。

实例：

```c
function isInPage(node) {
  return (node === document.body) ? false : document.body.contains(node);
}
```

### hasChildnodes()

该方法返回一个布尔值，如果它有子节点则返回`true`，否则返回`false`。

语法：

```c
node.hasChildNodes()
```

实例：

```c
var foo = document.getElementById("foo");

if ( foo.hasChildNodes() ) { 
  foo.removeChild( foo.childNodes[0] );
}
```

### insertBefore()

`insertBefore()`用于将子节点插入父节点的指定位置。它接受两个参数，第一个参数是所要插入的子节点，第二个参数是父节点下方的另一个子节点，新插入的子节点将插在这个节点的前面。

语法：

```c
var insertedElement = parentElement.insertBefore(newElement, referenceElement);
```

如果`referenceElement`为`null`或者`undefined`，`newElement`会插入到`parentElement`的子节点的最后，和`appendChild`效果一样。

实例：

```c
<div id="parentElement">
  <span id="childElement">foo bar</span>
</div>

<script>
// Create a new, plain <span> element
var sp1 = document.createElement("span");

// Get a reference to the element, before we want to insert the element
var sp2 = document.getElementById("childElement");
// Get a reference to the parent element
var parentDiv = sp2.parentNode;

// Insert the new element into the DOM before sp2
parentDiv.insertBefore(sp1, sp2);
</script>
```

### isEqualNode()

`isEqualNode()`方法用来检查两个节点是否相等。所谓相等的节点，指的是两个节点的类型相同、属性相同、子节点相同。

语法：

```c
var isEqualNode = node.isEqualNode(arg);
```

实例：

```c
var targetElm = document.getElementById("targetElm");
var firstDiv = document.getElementsByTagName("div")[0];

alert( targetElm.isEqualNode(firstDiv) );
```

### normalize()

将毗邻的两个文本节点合并。

语法：

```c
element.normalize();
```

实例：

```c
var wrapper = document.createElement("div");

wrapper.appendChild( document.createTextNode("Part 1 ") );
wrapper.appendChild( document.createTextNode("Part 2 ") );

// At this point, wrapper.childNodes.length === 2
// wrapper.childNodes[0].textContent === "Part 1 "
// wrapper.childNodes[1].textContent === "Part 2 "

wrapper.normalize();

// Now, wrapper.childNodes.length === 1
// wrapper.childNodes[0].textContent === "Part 1 Part 2 "
```

### removeChild()

removeChild() 方法用于从父节点移除一个子节点。并返回移除的节点。

语法：

```c
var oldChild = element.removeChild(child); element.removeChild(child);
```

此时移除的节点仍然还存在于内存中，但已经不是`DOM`的一部分了，在后面的代码中你可以重用这个节点，通过`oldChild`来引用。

如果移除的节点不是`element`的儿子时，将会抛出一个异常。

实例：

```c
<!--Sample HTML code-->

<div id="top" align="center">
  <div id="nested"></div>
</div>

// Removing a specified element when knowing its parent node
var d = document.getElementById("top");
var d_nested = document.getElementById("nested");
var throwawayNode = d.removeChild(d_nested);
```

### replaceChild()

`replaceChild()`方法用于将一个新的节点，替换父节点的某一个子节点。它接受两个参数，第一个参数是用来替换的新节点，第二个参数将要被替换走的子节点。

语法： 

```c
replacedNode = parentNode.replaceChild(newChild, oldChild);
```

实例：

```c
// <div>
//  <span id="childSpan">foo bar</span>
// </div>

// create an empty element node
// without an ID, any attributes, or any content
var sp1 = document.createElement("span");

// give it an id attribute called 'newSpan'
sp1.setAttribute("id", "newSpan");

// create some content for the new element.
var sp1_content = document.createTextNode("new replacement span element.");

// apply that content to the new element
sp1.appendChild(sp1_content);

// build a reference to the existing node to be replaced
var sp2 = document.getElementById("childSpan");
var parentDiv = sp2.parentNode;

// replace existing node sp2 with the new span element sp1
parentDiv.replaceChild(sp1, sp2);

// result:
// <div>
//   <span id="newSpan">new replacement span element.</span>
// </div>
```





