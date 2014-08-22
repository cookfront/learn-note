----------


## 标准标签

### a

`HTML`的`a`元素定义了一个超链接，用于从一个页面链接到其他页面（也可以用于链接到本页面的一些锚点）。

#### 属性

##### download `HTML5`
 
```c
<!-- will download as "expenses.pdf" -->
<a href="/files/adlafjlxjewfasd89asd8f.pdf" download="expenses.pdf">Download</a>
```

当用户点击该链接时，会强制下载`/files/adlafjlxjewfasd89asd8f.pdf`文件，但是会以`expenses.pdf`的名字出现在下载内容中。例如：文件名在服务端可能需要保持文件名唯一，但是通过`download`属性定义的名字使得对用户更加有意义。

理论上，`download`属性的内容是没有任何限制的，但是实际上并非如此，例如，在`Windows`中凡斜杠`\`就不能用于文件名，或者在`*nix`或`OS X`系统上斜杠`/`用于文件名，因此浏览器会对`download`属性值进行调整。

`dowoload`属性可以使用[blob][1]或者[data URI][2]，当你的用户需要在你的应用中保存动态的内容时，这将是非常有用的（例如：绘图应用）。

因此，你只需设置`href`属性位`blob`或`data URI`，然后将`download`属性值设置为有意义的名字。下面看实例：

HTML：

    <section>
        <canvas id="c" width="400" height="400"></canvas>
        <footer>
            <a id="download-canvas" href="#">Download</a>
        </footer>
    </section>
    
JavaScript：

    (function() {
        var canvas = document.getElementById('c'),
            cxt = canvas.getContext('2d'),
            downloadLink = document.getElementById('download-canvas');
     
        cxt.fillRect(100, 100, 200, 200);
        cxt.clearRect(150, 150, 100, 100);
     
        downloadLink.href = canvas.toDataURL();
        downloadLink.download = "squares.png";
    })();
    

> 注：
1.如果HTTP头的Content-Disposition：存在，并且给出了一个不同的文件名 和这个属性相比，HTTP头优先于此属性。
2.如果这个属性存在Content-Disposition：被设置为内联，火狐优先考虑Content-Disposition，像文件名​​的情况下，而Chrome 下载属性优先。

可以点击线上的[demo][3]。

[点击这里查看download兼容性][4]

##### href

这是对于`a`标签唯一必须定义的属性，这个属性定义了所需要链接的目的链接。它可以是一个`URL`或者`URL fragment`。一个`URL fragment`是以`#`开始，并且链接到当前文档的一个目标位置。`URLs`则可以是浏览器支持的任何协议。例如：`file`、`ftp`或`mailto`可以在大多数的用户代理工作。

> 你可以使用一个特殊的`fragment`,`top`创建了一个回到页面顶部的`fragment`，这个只能在`HTML5`中使用。例如：`<a href="#top">Return to top</a>`。

##### hreflang

该属性用于指定被链接文档的语言。仅在使用 href 属性时才可以指定 hreflang 属性。和 lang 属性类似，hreflang 属性的值也是 ISO 标准的双字符语言代码。和 lang 属性不同的是，hreflang 属性不会指定标签中的内容所使用的语言，而是指定被 href 属性调用的文档所使用的语言。hreflang允许的值由HTML5 BCP47 和HTML RFC1766所决定。

##### media

对于天天和`CSS`打交道的我们对于`media`属性肯定是很熟悉的，通常用于`link`标签或者`CSS 3`的`media query`。现在你可以在超链接中定义`media`属性，就像在`CSS`中一样使用。

这个属性绝对是非常有用的，例如，在对于不同的设备提供不同的下载链接：

    <ul>
        <li>
            <a href="download/320" media="min-width: 320px">
                <img src="files/320.jpg" alt="">
            </a>
        </li>
        <li>
            <a href="download/1382" media="min-width: 1382px">
                <img src="files/1382.jpg" alt="">
            </a>
        </li>
    </ul>
    
##### rel

对于存在`href`属性的锚点，这个属性定义了当前文档与目标URL的关系。它的值是一个以空格分隔的关系值列表。该值和语义可能将会被一些权威文档编者赋予不同的含义。默认的关系值为`void`，且必须在`href`属性定义的情况下才能定义该属性。`rel`详细的[关系值][5]。

##### target

这个属性定义了在哪里显示链接的资源。有以下值：

 - _self：如果没有定义该属性时的属性值，表示在当前页面加载链接的资源
 - _blank：在新的未命名的`HTML4 window`或者`HTML5 browsing context`加载响应。
 - _parent：在`HTML4`中当前框架的父框架或者`HTML5`的父浏览上下文加载响应，如果没有父亲，则和`_self`一样
 - _top：这个目标使得文档载入包含这个超链接的窗口，用 _top 目标将会清除所有被包含的框架并将文档载入整个浏览器窗口。


#### 实例

```c
<a href="https://developer.mozilla.org/en-US/" target="_blank">
    <img src="http://lamaquinadiferencial.files.wordpress.com/2012/02/128px-mozilla_firefox_3-5_logo_256.png?w=500" alt="firefox logo" />
</a>
```

### abbr

HTML中的<abbr>元素（或HTML缩写元素）表示一个缩写，并且可以视需要对它提供完整描述。如果提供描述，那么title属性的值必须是这个完整描述，而不能是其他值。

#### 属性

这个元素只有[全局属性][6]。

使用title属性定义对缩写的完整描述时，很多用户代理把完整描述以提示框的形式描述。

#### 实例

```c
<p>Tony Blair is the prime minister of the <abbr title="United Kingdom">UK</abbr></p>
```
 
### address

HTML的`<address>`元素可以让作者为它最近的`<article>`或者`<body>`祖先元素提供联系信息。在后一种情况下，它应用于整个文档。

> 用法说明
1.当表示一个和联系信息无关的任意的地址时，使用`<p>`元素而不是`<address>`元素。
2.这个元素不能包含除了联系信息之外的任何信息，比如出版日期（这应该包含在`<time>`元素中）。
3.通常，`<address>`元素可以放在当前section的`<footer>`元素中，如果存在的话。

#### 属性

这个元素只有[全局属性][7]。

#### 实例

```c
<address>
    You can contact author at <a href="http://www.somedomain.com/contact">www.somedomain.com</a>.<br>
    If you see any bugs, please <a href="mailto:webmaster@somedomain.com">contact webmaster</a>.<br>
    You may also want to visit us:<br>
    Mozilla Foundation<br>
    1981 Landings Drive<br>
    Building K<br>
    Mountain View, CA 94043-0801<br>
    USA
</address>
```

还可以看看这里[The Address Element][8]。[The Address Element翻译版][9]。

### area

`HTML`中的`area`元素在一个图片上定义了一个热点区域，并且可选的关联了一个超链接地址。该元素只能用在`<map>`元素中。

#### 属性

##### alt

当浏览器不能显示图片时的替换文本。

##### coords

这个属性设置了`area`的坐标，它要和`shape`属性来结合使用。

 - shape="rect"：矩形。`coords`需要定义为类似这样`coords="x1,y1,x2,y2"`，`x1,y1`为左上角坐标，`x2,y2`为右下角坐标
 - shape="circle"：圆形。`coords`需要定义为类似这样`coords="x,y,r"，这里`x,y`定义了圆心的位置，`r`则定义了圆的半径
 - shape="polygon"：多边形。`coords`需要定义多对`x,y`坐标，类似这样`coords="x1,y1,x2,y2,x3,y3"`

##### download `HTML5`

这个和`a`标签的[download][10]属性一样。

##### href

该属性代表了该区域的超链接。它的值必须为一个有效的`URL`。

##### hreflang `HTML5`

表明了链接资源的语言，只有在使用了`href`属性时才能使用该属性。

##### media `HTML5`

这个和`a`标签的[media][11]属性一样。

##### rel

对于存在`href`属性的锚点，这个属性定义了当前文档与目标URL的关系。它的值是一个以空格分隔的关系值列表。该值和语义可能将会被一些权威文档编者赋予不同的含义。默认的关系值为`void`，且必须在`href`属性定义的情况下才能定义该属性。`rel`详细的[关系值][12]。

##### shape

在上面的`coords`中已经介绍了。

##### target

这个属性定义了在哪里显示链接的资源。有以下值：

 - _self：如果没有定义该属性时的属性值，表示在当前页面加载链接的资源
 - _blank：在新的未命名的`HTML4 window`或者`HTML5 browsing context`加载响应。
 - _parent：在`HTML4`中当前框架的父框架或者`HTML5`的父浏览上下文加载响应，如果没有父亲，则和`_self`一样
 - _top：这个目标使得文档载入包含这个超链接的窗口，用 _top 目标将会清除所有被包含的框架并将文档载入整个浏览器窗口。

#### 实例

```c
<img src="/i/eg_planets.jpg" border="0" usemap="#planetmap" alt="Planets" />

<map name="planetmap" id="planetmap">

<area shape="circle" coords="180,139,14" href ="/example/html/venus.html" target ="_blank" alt="Venus" />

<area shape="circle" coords="129,161,10" href ="/example/html/mercur.html" target ="_blank" alt="Mercury" />

<area shape="rect" coords="0,0,110,260" href ="/example/html/sun.html" target ="_blank" alt="Sun" />

</map>
```

> 注意：
需要在图片中设置好`usemap`属性，引用 map 元素中的 "id" 或 "name"属性（根据浏览器），所以我们同时向 map 元素添加了 "id" 和 "name" 属性。

### b

`HTML`中的`b`元素代表了一些不同于普通文本样式的文本，并且没有表达任何重要性和相关性。通常用于总结中的关键字，评论中的产品名或者其他通常表现为加粗的文本。另一个用途是用于一篇文章每一个段落的引导句。

> 使用注意：
1.不要混淆了`<b>`元素和[strong][13]、[em][14]、[mark][15]元素。`<strong>`元素代表了某些重要的文本。`<em>`元素主要是向文本添加了一些强调，`<mark>`元素则代表了一定相关性的文字。`<b>`元素不传达这样特殊的语义信息，只有当其他不合适时，才使用它。
2.同样的，不要使用`<b>`元素来标记标题。这是应该使用`<h1>`到`<h6>`元素。此外，样式表可以改变这些元素的默认的样式，其结果是它们不必以粗体显示。
3.最好能在`<b>`元素上使用`class`属性，这样可以传达额外的语义信息（例如：`<b class="lede">`用于段落中的第一个句子）。
4.在之前，`<b>`元素是为了让文本加粗。因为HTML4的样式信息已经过时，所以在<b>元素的意义也已经改变。
5.如果在使用<b>元素没有任何语义的目的，使用`CSS`属性的`font-weight`可能是更好的选

#### 属性

这个元素只有[全局属性][16]。

#### 实例

```c
<p>
  This article describes several <b>text-level</b> elements. It explains their usage in an <b>HTML</b> document.   
</p>
```

### base

`HTML`的`base`元素指定了用于包含在文档中的所有相对URL的基本URL。

> 使用注意：如果定义了多个`base`元素，则只有第一个包含`href`和`target`属性起作用，其他的都将被忽略。


#### 属性

##### href

可以用于整个文档相对URL地址的基本URL。如果指定此属性，这个元素必须出现在任何带有`URLs`地址属性的元素之前，其值是网址。

绝对和相对的`URLs`都是允许的。

##### target

这个属性定义了在哪里显示链接的资源。有以下值：

 - _self：如果没有定义该属性时的属性值，表示在当前页面加载链接的资源
 - _blank：在新的未命名的`HTML4 window`或者`HTML5 browsing context`加载响应。
 - _parent：在`HTML4`中当前框架的父框架或者`HTML5`的父浏览上下文加载响应，如果没有父亲，则和`_self`一样
 - _top：这个目标使得文档载入包含这个超链接的窗口，用 _top 目标将会清除所有被包含的框架并将文档载入整个浏览器窗口。

#### 实例

```c
<base href="http://www.example.com/">
<base target="_blank" href="http://www.example.com/"> 
```

#### 笔记

 - 可以通过`document.baseURI`检索到基本`URL`
 - `href`属性的相对`URL`是在`Gecko 2.0`添加的

### bdo

`HTML`的`bdo`元素用于覆盖当前的文本的方向性。

#### 属性

##### dir

在这个元素中文本的方向性。可能的值有：

 - ltr：表明文本从左到右显示
 - rtl：表明文本从右到左显示
 - auto：浏览器决定文本的方向性

#### 实例

```c
<!-- Switch text direction -->
<p>This text will go left to right.</p>
<p><bdo dir="rtl">This text will go right to left.</bdo></p>
```

### blockquote

`HTML`的`<blockquote>`元素表明该元素中围绕的文本是一个扩展的引文。并且浏览器会渲染一些缩进。对于引文来源的`URL`可能通过`cite`属性来指定，然而文本表示的来源可以通过`<cite>`元素给出。
 
#### 属性

这个元素包含[全局属性][17]。

##### cite

`cite`属性规定引用的来源。该属性的值是一个包含在引号中并指向联机文档的URL，以及（如果有可能的话）引用在该文档中的确切位置。

#### 实例

```c
<blockquote cite="http://developer.mozilla.org">
  <p>This is a quotation taken from the Mozilla Developer Center.</p>
</blockquote>
```

### body

这个元素应该是我们最熟悉的了。它代表了文档的内容，且每个文档中只有一个`<body>`元素。可以通过`document.body`在`JavaScript`中获取到`body`元素。

#### 属性

这个元素包含[全局属性][18]。

##### onafterprint `HTML5`

当用户打印文档后的调用的函数。

##### onbeforeprint `HTML5`

当用户请求打印文档时调用的函数。

##### onbeforeunload `HTML5`

当文档将被卸载时调用的函数。

##### onblur `HTML5`

当文档失去焦点时调用的函数。

##### onerror `HTML5`

当文档加载错误时调用的函数。

##### onfocus `HTML5`

当文档或取到焦点时调用的函数。

##### onhaschange `HTML5`

当文档的片段标识符（以`#`开头的字符）在当前文档的地址中发生变化时调用的函数。

##### onload `HTML5`

当文档加载完成后调用的函数。

##### onmessage `HTML5`

当文档接收到一个消息时调用的函数。

##### onoffline `HTML5`

当网络连接失败时调用的函数。

##### ononline `HTML5`

当网络连接恢复时调用的函数。

##### onpopstate `HTML5`

当用户导航到历史记录时调用的函数。

##### onredo `HTML5`

当用户正在撤销交易历史时调用的函数。

##### onresize `HTML5`

当文档改变大小时调用的函数。

##### onstorage `HTML5`

当存储区域发生变化时调用的函数。

##### onundo `HTML5`

Function to call when the user has moved backward in undo transaction history.

##### onunload `HTML5`

当文档要卸载时调用的函数。

### button

`HTML`的`<button>`元素代表了一个可点击的按钮。

#### 属性

这个元素包含[全局属性][19]。

##### autofocus `HTML5`

该属性是一个布尔值属性，让你指定页面加载完后是否应该获取焦点，除非用户覆盖了它。且在文档中，只有一个表单关联的元素能设置此属性。

##### disabled

该属性是一个布尔值属性，表明用户不能与该按钮交互。如果该属性没有指定，该按钮继承该包含元素的设置，例如`<fieldset>`，如果包含元素中没有设置`disabled`，则该按钮是激活的。

##### form `HTML5`

该属性指定该元素关联的`form`元素。且它的属性值必须是相同文档中`<form>`元素的`id`属性值。如果该属性没有指定，则`<button>`元素必须是`form`元素的后代。这个属性可以让你将`button`放置在任何地方，而不一定要作为`form`元素的后代。

##### formaction `HTML5`

指定表单提交时的处理的URL，该属性会覆盖掉拥有该按钮的`form`元素中的`action`属性。

##### formenctype `HTML5`

如果该按钮时一个提交按钮，该属性指定了从表单提交到服务器的内容的类型。可能的值有：

 - application/x-www-form-urlencoded：如果该属性没有指定时的默认值
 - multipart/form-data：如果你有一个`<input>`类型为`file`需要提交时使用
 - text/plain

如果指定了该属性，将会覆盖掉`<form>`元素中的`enctype`属性。

##### formmethod `HTML5`

如果该按钮时一个提交按钮，该属性指定了表单提交时的`HTTP method`。可能的值有：

 - post
 - get

如果指定了该属性，将会覆盖掉`<form>`元素中的`method`属性。

##### formnovalidate `HTML5`

如果该按钮时一个提交按钮，这个布尔属性指定了在表单提交时将不需要被验证。如果指定了该属性，将会覆盖掉`<form>`元素中的`novalidate`属性。

##### formtarget `HTML5`

如果该按钮是一个提交按钮，该属性指定了当表单被提交后在哪里显示返回的响应。如果指定了该属性，将会覆盖掉`<form>`元素中的`target`属性。

 - _self
 - _blank
 - _parent
 - _top

##### name

该属性指定了按钮的名字，将会和表单数据一起被提交。

##### type

按钮的类型。可能的值有：

 - submit
 - reset
 - button

##### value

按钮的默认值。

#### 实例

```c
<button name="button">Click me</button>
```

### caption

`HTML`的`caption`元素代表了`table`的标题。尽管它总是作为`<table>`元素的第一个后代，然而可以使用`CSS`将它放在任何地方，相对于`table`。

这个元素拥有[全局属性][20]。

### cite

`HTML`的`<cite>`元素包含了一个作品的标题，例如一本书、一首歌、一部电影等。

这个元素只有[全局属性][21]。

```c
More information can be found in <cite>[ISO-0000]</cite>
```

### code

`HTML`的`<code>`元素代表了一段计算机代码片段。默认情况下，它会在浏览器中显示默认等宽字体。


这个元素只有[全局属性][22]。

```c
<p>Regular text. <code>This is code.</code> Regular text.</p>
```

### dl, dt, dd

这三个元素一般是联合起来使用的。

`dl`的全称是`Definition List`，中文是`定义列表`。一个定义列表由一个或多个`dt`与`dd`组合而成。

`dt`的全称是`Definition Term`，中文是`定义项目`。
`dd`的全称是`Definition Description`，中文是`定义描述`。

可以看看这篇文章：[`HTML <dl/>, <dt/> 與 <dd/> 的誤用`][23]。

这几个元素只有[全局属性][22]。

```c
<dl>
  <dt>Firefox</dt>
  <dd>A free, open source, cross-platform, graphical web browser developed by the Mozilla Corporation and hundreds of volunteers.</dd>

  <!-- other terms and definitions -->
</dl>
```

### del

`HTML`的`<del>`元素代表了一段已经从文档中删除的文本。这个元素中的文本通常会渲染成带有一条删除线，但不是必须。

#### 属性

这个元素包含[全局属性][22]。

##### cite

这个属性是一个`URL`，解释了文档的改变。

##### datetime

这个属性表明了文档改变的时间。

#### 实例

```c
<p><del>This text has been deleted</del></p
```

### dfn

`HTML`的`<dfn>`元素用于标记特殊的术语或者短语。

> HTML5 使用注意：
> 1. `<dfn>`用于标记被定义的术语，术语的定义应该在`<p>, <section>`元素中或者是在定义列表中（dt, dd）。
> 2. 该术语的准确值定义由以下规则确定：
  > 如果`<dfn>`元素由一个`title`属性，则术语的为这个属性的值
  > 如果只有一个`<abbr>`元素包含了一个`title`属性，则术语为这个`title`属性值
  > 否则术语为`<dfn>`元素中的值

#### 属性

这个元素包含[全局属性][22]。

在`HTML5`中`title`含有特殊的意义，就如上面所说。

#### 实例

```c
<p><dfn id="def-internet">The Internet</dfn> is a global system of interconnected networks that use the Internet Protocol Suite (TCP/IP) to serve billions of users worldwide.</p>


<dl>
  <!-- Define "World-Wide Web" and reference definition for "the Internet" -->
  <dt>
    <dfn>
      <abbr title="World-Wide Web">WWW</abbr>
    </dfn>
  </dt>
  <dd>The World-Wide Web (WWW) is a system of interlinked hypertext documents accessed on <a href="#def-internet">the Internet</a>.</dd>
</dl>
```

### div

`HTML`中的`<div>`元素应该是最常见的元素了，它通常是流内容的一个容器，这本身并没有代表什么。它通常用于将元素组合起来然后定义样式的目的（使用`class`或`id`）。只有当没有其他合适的语义化元素（例如：`<article>`或`<nav>`）时才使用`<div>`。

这个元素包含[全局属性][22]。

```c
<div>
  <p>Any kind of content here. Such as &lt;p&gt;, &lt;table&gt;. You name it!</p>
</div> 
```

### em

`HTML`的`<em>`元素用于标记那些需要强调的文本。`<em>`元素可以被嵌套，嵌套的每个级别显示更大程度的强调。

> 使用注意：
> 通常这个元素被显示为斜体的，它不应该简单的应用斜体样式，应该使用`CSS`样式来达到这个目的。使用`<cite>`元素代表作品的标题（书籍、音乐等），通常也是被显示为斜体，但是`<cite>`具有不同的含义。使用`<strong>`元素来标记那些更重要的文本。

这个元素只有[全局属性][22]。

```c
<p>
  In HTML 5, what was previously called <em>block-level</em> content is now called <em>flow</em> content.
</p>
```

#### `<i>` vs. `<em>`

对于新手开发者，通常会有困惑：为什么有这么多元素用于在文本上表达强调。`<i>`和`<em>`应该是最普遍的了。那么为什么使用`<em>`和`<i>`呢？它们产生相同的结果，对不对？

这个是不完全正确的。视觉上的结果是，默认情况下，这两个标签都会将它们的内容渲染成斜体。但是语义化的含义却是不一样的。`<em>`元素代表了在文本上的强调，然而`<i>`元素代表了从正常散文出发的文本，例如电影或书籍的名字，或者说文本代表了一个词的定义，而不是其语义含义。

`<em>`的例子："Just *do* it already!"或"We *had* to do something about it"，人们朗读时可能会对其中的斜体字添加一个强调。

`<i>`的例子："The *Queen Mary* sailed last night"。这里没有为单词"Queen Mary"添加强调或者重要性，它只是表示对象中的问题不是一个叫做`Marry`的女王，而是一条船叫做`Queen Mary`。

### fieldset

`HTML`的`<fieldset>`元素用于将一些控制组合起来，同样也包括了`web`表单中的`<label>`。

#### 属性

这个元素包含[全局属性][22]。

##### disabled `HTML5`

如果设置了这个布尔值属性，它后代中的表单控制将会被禁用，除了可选的第一个后代元素`<legend>`。它们不能编辑，也不能接受任何的浏览器事件。

##### form `HTML5`

该属性指定该元素关联的`form`元素。且它的属性值必须是相同文档中`<form>`元素的`id`属性值。如果该属性没有指定，则`<button>`元素必须是`form`元素的后代。这个属性可以让你将`button`放置在任何地方，而不一定要作为`form`元素的后代。

##### name `HTML5`

组关联的名字，将会在提交的时候随着表单数据一起发送。

#### 实例


```c
<form action="test.php" method="post">
  <fieldset>
    <legend>Title</legend>
    <input type="radio" name="radio" id="radio"> <label for="radio">Click me</label>
  </fieldset>
</form>
```

另一个更详细的：

```c
<!doctype html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Editable [pseudo]select</title>
<style type="text/css">

/* Generic form fields */

fieldset.elist, input[type="text"], textarea, select, option, fieldset.elist ul, fieldset.elist > legend, fieldset.elist input[type="text"], fieldset.elist > legend:after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

input[type="text"] {
  padding: 0 20px;
}

textarea {
  width: 500px;
  height: 200px;
  padding: 20px;
}

textarea, input[type="text"], fieldset.elist ul, select, fieldset.elist > legend {
  border: 2px #cccccc solid;
  border-radius: 10px;
}

input[type="text"], fieldset.elist, select, fieldset.elist > legend {
  height: 32px;
  font-family: Tahoma;
  font-size: 14px;
}

input[type="text"]:hover, textarea:hover, select:hover, fieldset.elist:hover > legend {
  background-color: #ddddff;
}

select {
  padding: 4px 20px;
}

option {
  height: 30px;
  padding: 5px 4px;
}

option:not(:checked), textarea:focus {
  background-color: #ffcccc;
}

fieldset.elist > legend:after, fieldset.elist label {
  height: 28px;
}

input[type="text"], fieldset.elist {
  width: 316px;
}

input[type="text"]:focus {
  background: #ffcccc url("data:image/gif;base64,R0lGODlhEAAQANU5APnoxuvr6+uxPdvb2+rq6ri4uO7qxunp6dPT06SHV+/rx8vLy+nezLO0sbe3t9Ksas+qaaCEV8rKyp2dnf39/QAAAK6ursifZHFxcc/Qzu3mxYyMjExCJnV1dc6maO7u7o+Pj2tXNoaGhtfDpKCDVu3lxM+tcaKEV9bW1qOFVWNjY8KrisTExNra2nBbObGxsby8vO/mu7Kyso9ZAuzs7MSgAIiKhf///8zMzP///wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADkALAAAAAAQABAAAAaXwJxwSCwOYzWkMpkkZmoAqDQaJdpqAqw2m53NRjlboAarFczomcE0C99o8DgNMVM8Tm3bbYDr9x11DwkzDG5yc2oQJIRCenx/MxoeETM2Q3pxATMlF4MYlo17OAsdLispMyAioIY0BzMcITMTKBasjgssFTMqGxItMjYUoTQBBAQHxgE0wZcfMtDRMi/QrA022NnaNg1CQQA7") no-repeat 2px center !important;
}

input[type="text"]:focus, textarea:focus, select:focus, fieldset.elist > legend {
  border: 2px #ccaaaa solid;
}

fieldset {
  border: 2px #af3333 solid;
  border-radius: 10px;
}

/* Editable [pseudo]select (i.e. fieldsets with [class=elist]) */

fieldset.elist {
  display: inline-block;
  position: relative;
  vertical-align: middle;
  overflow: visible;
  padding: 0;
  margin: 0;
  border: none;
}

fieldset.elist ul {
  position: absolute;
  width: 100%;
  max-height: 320px;
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: transparent;
}

fieldset.elist:hover ul {
  background-color: #ffffff;
  border: 2px #af3333 solid;
  left: 2px;
  overflow: auto;
}

fieldset.elist ul > li {
  list-style-type: none;
  background-color: transparent;
}

fieldset.elist label {
  display: none;
  width: 100%;
}

fieldset.elist input[type="text"] {
  width: 100%;
  height: 30px;
  line-height: 30px;
  border: none;
  background-color: transparent;
  border-radius: 0;
}

fieldset.elist > legend {
  display: block;
  margin: 0;
  padding: 0 0 0 5px;
  position: absolute;
  width: 100%;
  cursor: default;
  background-color: #ccffcc;
  line-height: 30px;
  font-style: italic;
}

fieldset.elist:hover > legend {
  position: relative;
  overflow: hidden;
}

fieldset.elist > legend:after {
  width: 20px;
  content: "\2335";
  float: right;
  text-align: center;
  border-left: 2px #cccccc solid;
  font-style: normal;
  cursor: default;
}

fieldset.elist:hover > legend:after {
  background-color: #99ff99;
}

fieldset.elist ul input[type="radio"] {
  display: none;
}

fieldset.elist input[type="radio"]:checked ~ label {
  display: block;
  width: 292px;
  background-color: #ffffff;
}

fieldset.elist:hover input[type="radio"]:checked ~ label {
  width: 100%;
}

fieldset.elist:hover label {
  display: block;
  height: 100%;
}

fieldset.elist label:hover {
  background-color: #3333ff !important;
}

fieldset.elist:hover input[type="radio"]:checked ~ label {
  background-color: #aaaaaa;
}

</style>

</head>
<body>

<form name="tshirt" method="get" action="test.php">

<fieldset>
    <legend>Order a T-Shirt</legend>
    <p>Write your name (simple textbox): <input type="text" name="myname" /></p>
    <p>Choose your size (simple select):
    <select name="size">
        <option value="s">Small</option>
        <option value="m">Medium</option>
        <option value="l">Large</option>
        <option value="xl">Extra Large</option>
    </select></p>
    <div>What address do you want to use? (editable pseudoselect)
    <fieldset class="elist">
        <legend>Address&hellip;</legend>
        <ul>
            <li><input type="radio" name="address-chosen" value="1" id="address-switch_1" checked /><label for="address-switch_1"><input type="text" name="address-item_1" value="19 Quaker Ridge Rd. Bethel CT 06801" /></label></li>
            <li><input type="radio" name="address-chosen" value="2" id="address-switch_2" /><label for="address-switch_2"><input type="text" name="address-item_2" value="1000 Coney Island Ave. Brooklyn NY 11230" /></label></li>
            <li><input type="radio" name="address-chosen" value="3" id="address-switch_3" /><label for="address-switch_3"><input type="text" name="address-item_3" value="2962 Dunedin Cv. Germantown TN 38138" /></label></li>
            <li><input type="radio" name="address-chosen" value="4" id="address-switch_4" /><label for="address-switch_4"><input type="text" name="address-item_4" value="915 E 7th St. Apt 6L. Brooklyn NY 11230" /></label></li>
        </ul>
    </fieldset>
    </div>
    <p>Write a comment:<br />
    <textarea name="comment"></textarea></p>
    <p><input type="reset" value="Reset" /> <input type="submit" value="Send!" /></p>
</fieldset>

</form>

</body>
</html>
```

### form

`HTML`的`<form>`元素能够包含各种`input`等，可以使用户能将信息提交到服务器。

#### 属性

这个元素包含[全局属性][22]。

##### accept

这个属性指定了服务器接受的内容类型，是一个逗号分隔的内容类型列表。

> 注意：该属性在`HTML5`中已经被移除，且不会再使用。作为代替，使用指定`<input>`元素上的`accept`属性。

##### accept-charset

一个字符串编码列表指定服务器接受的编码类型。

##### action

一个`URL`指定向何处发送表单数据。这个属性会被`<input>`或`<button>`的`formaction`属性所覆盖。

##### autocomplete `HTML5`

表明表单控件是否会被浏览器默认的自动完成。这个设置会被属于`form`的子元素的`autocomplete`属性所覆盖。可能的值有：

 - off：用户必须明确的在每个字段中输入一个值，或者说文档提供了它自己的自动完成方法。
 - on：浏览器会根据用户之前在该表单输入的值进行自动完成。

> 注：如果你在表单上设置了`autocomplete`为`off`，但是因为文档提供了自己的`auto-complete`，因此你应该在表单的每一个`input`元素上设置`autocomplete`为`off`。

##### enctype

如果`method`属性为`post`时，这个属性时内容的[MIME type](http://en.wikipedia.org/wiki/Mime_type)，用于将表单提交到服务器。可能的值有：

 - application/x-www-form-urlencoded：默认值（如果该属性没有被设置）
 - multipart/form-data：如果你有`<input>`类型为`file`的元素，使用该值
 - text/plain

> 注意：这个值会被`<input>`和`<button>`元素的`formenctype`属性所覆盖

##### method

浏览器用于提交表单的的`HTTP method`。可能的值有：

 - post
 - get

> 注意：这个值会被`<input>`和`<button>`元素的`formmethod`属性所覆盖

##### name

表单的名字。在`HTML4`中使用会被反对。必须在文档中具有唯一性，且在`HTML5`中不能是空值。

##### novalidate `HTML5`

这个布尔属性指定了在表单提交时将不需要被验证。这个值会被`<input>`和`<button>`元素的`formnovalidate`属性所覆盖。

##### target

该属性指定了当表单被提交后在哪里显示返回的响应。可能的值有：

 - _self
 - _parent
 - _top
 - _blank

#### 实例

```c
<!-- Simple form which will send a GET request -->
<form action="">
  <label for="GET-name">Name:</label>
  <input id="GET-name" type="text" name="name">
  <input type="submit" value="Save">
</form>

<!-- Simple form which will send a POST request -->
<form action="" method="post">
  <label for="POST-name">Name:</label>
  <input id="POST-name" type="text" name="name">
  <input type="submit" value="Save">
</form>

<!-- Form with fieldset, legend, and label -->
<form action="" method="post">
  <fieldset>
    <legend>Title</legend>
    <input type="radio" name="radio" id="radio"> <label for="radio">Click me</label>
  </fieldset>
</form>
```

### h1, h2, h3, h4, h5, h6

这几个都是标题元素，其中`h1`具有最重要，`h6`排最后。标题元素简要介绍了某部分的主题。标题元素可能会被用户代理使用，例如，自动为文档建立一个表内容（construct a table of contents for a document automatically）。

这几个元素包含[全局属性][22]。

```c
<h1>Heading level 1</h1>
<h2>Heading level 2</h2>
<h3>Heading level 3</h3>
<h4>Heading level 4</h4>
<h5>Heading level 5</h5>
<h6>Heading level 6</h6>
```

> 注意：
>  1. 不要为了降低字体大小而使用低级别的标题，使用`font-size`代替
>  2. 避免跳过标题层级，永远开始于`h1`，然后使用`h2`，等等。永远尝试只有一个第一层级在页面上
>  3. 在`HTML5`中使用`<section>`元素来定义文档大纲。标题元素为`section`或子`section`提供了标题。

### head

`HTML`的`<head>`元素代表了文档的元数据，并且包含了定义的脚本或样式表等。

### html

`HTML`的`<html>`元素代表了`HTML`或`XHTML`文档的根。所有的元素都应该是该元素的后代。

#### 属性

这个元素包含[全局属性][22]。

##### manifest `HTML5`

用于`HTML5`中离线缓存的属性。指定一个`URI`，这个`URI`指定了哪些资源应该被缓存。

### i

`HTML`的`<i>`元素代表了一段文本因为某些原因不同于正常的文本，例如：科技术语、外文短语或虚构人物的想法。它通常显示为斜体。

这个元素只有[全局属性][22]。

```c
<p>The Latin phrase <i>Veni, vidi, vici</i> is often mentioned in music, art, and literature</p>
```

#### 使用注意

在早期版本的HTML规范中，`<i>`标签只是用来显示斜体文本表象的元素，就像在`<b>`标签来显示粗体文本。这不再是正确的，因为这些标签现在定义了语义，而不是为了排版显示。`<i>`标签应该代表一部分文本具有不同的语义，其典型的排版为斜体。这意味着浏览器将通常仍然显示其斜体字的内容，但是，根据定义，不再需要。

使用这个元素，只有当还没有一个更合适的语义元素。例如：

 - `<em>`：表明强调
 - `<strong>`：表明重要性
 - `<mark>`：表明相关性
 - `<cite>`：标记一个作品的名字
 - `<dfn>`：标记一个术语的实例

通常最好在该元素上使用`class`表明为什么使用该元素。

 
 
 
  
 
  
 

 
 
参考文献：

 1. [New HTML5 Attributes for Hyperlinks: download, media, and ping][16]



  [1]: https://developer.mozilla.org/en-US/docs/Web/API/URL.createObjectURL
  [2]: http://www.sitepoint.com/reducing-http-requests-with-generated-data-uris/
  [3]: http://jsbin.com/buhoreli/1/edit
  [4]: http://caniuse.com/download
  [5]: http://www.w3school.com.cn/tags/att_a_rel.asp
  [6]: https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes
  [7]: https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes
  [8]: http://html5doctor.com/the-address-element/
  [9]: http://cookfront.github.io/2014/03/31/html5-semantics/#address
  [10]: #a
  [11]: #a
  [12]: http://www.w3school.com.cn/tags/att_a_rel.asp
  [13]: http://devdocs.io/html/strong
  [14]: http://devdocs.io/html/em
  [15]: http://devdocs.io/html/mark
  [16]: https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes
  [17]: https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes
  [18]: https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes
  [19]: https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes
  [20]: https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes
  [21]: https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes
  [22]: https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes
  [23]: http://josephjiang.com/entry.php?id=340