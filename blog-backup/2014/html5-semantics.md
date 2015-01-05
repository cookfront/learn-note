title: HTML5 语义化标签
date: 2014-03-31 11:19:04
categories: HTML/HTML5
tags: HTML5
---

本文是介绍`HTML5`的语义化元素，以及如何时使用某元素，何时不应该使用某元素等。

## header

在`HTML4`时代，我们经常用以下代码来定义我们的头部：

```c
<div id="header"></div>
```

### 元素定义

但是在`HTML5`中那已经不在需要了，因为我们有了`<header>`元素。下面看看[W3C 规范][1]是如何定义`<header>`元素的：

> A header typically contains a group of introductory or navigational aids. A header element typically contains the section’s heading (an h1–h6 element or an hgroup element), but can also contain other content, such as a table of contents, a search form, or any relevant logos.

上面的一段话大概意思就是：一个`header`通常包含一组介绍性或者帮助导航的内容。一个`header`元素通常包含章节的标题（一个h1-h6元素或者一个`hgroup`元素），但是仍然可以包含其他内容，例如一个表内容，一个搜索表单或任何相关的logos。这段话里面非常重要的一点是`<header>`元素可以不引入一个新的章节而作为一个章节的头部。

### 如何使用

最明显使用`<header>`元素的地方就是每个页面的开始：

```c
<header>
<h1>页面首标题</h1>
<p>With some supplementary information</p>
</header>
```

非常重要的一点是你不需要严格限制每个页面只有一个`<header>`，你可以使用多个`<header>`，每一个`<header>`会成为文档章节的头部：

```c
<header>
<h1>页面首标题</h1>
<p>With some supplementary information</p>

<article>
    <header>
        <h1>文章标题</h1>
        <p>文章作者</p>
    </header>
</article>
```

我们可以发现在上面的例子中使用了两个`<h1>`，这在`HTML5`（和`HTML4`）中是有效的，但是会导致访问性问题，所以建议谨慎使用。

### header元素中必须有的内容

我们现在知道一个页面中可以包含多个`<header>`，但是在`<header>`元素中什么是必须有的以通过验证呢？

简单的说，一个`<header>`通常至少包含一个标题标签（h1-h6），`header`元素当然还可以包含其他内容，例如：表内容，logos或者搜索框等。在最近更改的规范中你可以在`<header>`元素中包含`<nav>`元素。

以上内容翻译自：[The header element][2]。


## footer

和`<header>`元素一样，在一段时间我们通常看到类似`<div id="footer"></div>`的代码在一个页面的底部，但是随着HTML5的引入，这段代码将要 say goodbye了，因为`<footer>`元素的引入带来了更好的使用范围和灵活性。

### 元素定义

> The footer element represents a footer for its nearest ancestor sectioning content or sectioning root element. A footer typically contains information about its section such as who wrote it, links to related documents, copyright data, and the like.

上面这段话的意思是：`footer`元素代表了它距离它最近祖先章节内容的页脚或者说章节的根元素。`footer`通常包含一些章节的信息，例如：谁写的，链接到其他的文档，版权数据和喜好。

### 如何使用

在之前的代码中大部分人可能会像下面这样布局一个`footer`：

```c
<div id="footer">
    <ul>
        <li>copyright</li>
        <li>sitemap</li>
        <li>contact</li>
        <li>to top</li>
    </ul>
<div>
```

然而由于`HTML5`的创建将不再是这样了，正如你可能已经知道，有很多元素不再需要去使用`<div>`元素了。在我们的例子中，我们指的是页脚，当然最适合的标记是`<footer>`了。

```c
<footer>
  <ul>
     <li>copyright</li>
     <li>sitemap</li>
     <li>contact</li>
     <li>to top</li>
  </ul>
</footer>
```

当然`<footer>`元素不仅仅只使用在页面底部，其实和`<header>`很相似，它也可以使用在文章的页脚，章节的页脚。当然每个页面不局限于只使用一个`<footer>`元素：

```c
<section>
   Section content appears here.
   <footer>
   Footer information for section.
   </footer>
</section>
```

或者：

```c
<article>
   Article content appears here.
   <footer>
   Footer information for article.
   </footer>
</article>
```

### 更新

`footer`元素的内容模型已经被更改允许章节内容，例如`<header>`或`<nav>`，实际上它现在和`<header>`元素很相似。然而，非常重要的一个说明：`footer`不是一个章节的内容，也不会引入一个新的章节。


## nav

`<nav>`元素是`HTML5`的新元素之一，让你将一组链接放在一起，从而导致更多的语义标记和额外的结构以帮助屏幕阅读器。在本篇文章中，我将讨论如何以及在何处使用它，还有我的规范定义的一些保留。

起初，我以为`<nav>`元素是非常简单的。而且它仍然非常容易使用，我发现规范不是那么有用，很多决定都留给了开发人员。

### 规范定义

> The nav element represents a section of a page that links to other pages or to parts within the page: a section with navigation links. Not all groups of links on a page need to be in a nav element only sections that consist of major navigation blocks are appropriate for the nav element. In particular, it is common for footers to have a list of links to various key parts of a site, but the footer element is more appropriate in such cases, and no nav element is necessary for those links.

上面的这段定义大概意思为：`nav`元素代表了页面的一个部分去链接到其他页面或者本页面的其他部分：一个导航链接的部分。不是所有的页面链接都放在`nav`元素中，而仅仅一些主要的导航块适合`nav`元素。特别的，可以作为页脚的一个列表链接到站点的各个关键部分，但是`footer`在这种情况下可能更为适合，而且对于这些链接没有`nav`元素是必须的（感觉读的不顺畅呀，英语不好）。

这里面的一个关键短语是“major navigation（主要导航）”。

看看下面的例子就知道了，在下面的例子中，页面中有多个地方存在链接，但是只有一部分被认为是导航部分。

```c
<body>
<header>
  <h1>Wake up sheeple!</h1>
  <p>
    <a href="news.html">News</a> -
    <a href="blog.html">Blog</a> -
    <a href="forums.html">Forums</a>
  </p>
  <p>Last Modified: <time>2009-04-01</time></p>

<nav>
  <h1>Navigation</h1>
  <ul>
    <li><a href="articles.html">Index of all articles</a></li>
    <li><a href="today.html">Things sheeple need to wake up for today</a></li>
    <li><a href="successes.html">Sheeple we have managed to wake</a></li>
  </ul>
</nav>

</header>
<article>
  <p>...page content would be here...</p>
</article>
<footer>
  <p>Copyright © 2006 The Example Company</p>
  <p><a href="about.html">About</a> -
  <a href="policy.html">Privacy Policy</a> -
  <a href="contact.html">Contact Us</a></p>
</footer>
</body>
```

我不得不说，这些对我是没有用的，有六个导航元素在`header`元素内。但是只有三个在`nav`标签中。也没有去解释前三个链接和后三个链接的不同之处，都是去往不同的页面，而且都在站点内部。

他们同样给出了第二个例子：

```c
<body>
    <h1>The Wiki Center Of Exampland</h1>

    <nav>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/events">Current Events</a></li>
            ...more...
        </ul>
    </nav>

    <article>
        <header>
            <h1>Demos in Exampland</h1>

            <nav>
                <ul>
                    <li><a href="#public">Public demonstrations</a></li>
                    <li><a href="#destroy">Demolitions</a></li>
                    ...more...
                </ul>
            </nav>

        </header>
        <section id="public">
            <h1>Public demonstrations</h1>
            <p>...more...</p>
        </section>
        <section id="destroy">
            <h1>Demolitions</h1>
            <p>...more...</p>
        </section>
        ...more...
        <footer>
            <p><a href="?edit">Edit</a> | <a href="?delete">Delete</a> | <a href="?Rename">Rename</a></p>
        </footer>
    </article>
    <footer>
        <p><small>© copyright 1998 Exampland Emperor</small></p>
    </footer>
</body>
```

这个才是有所帮助的，因为我找到`<nav>`元素最大的问题是：决定哪些元素被归类为主要导航。

### 何处使用

如果你查看本站点(指的是[html5doctor][3])的页面源代码，可以发现三个地方使用了`<nav>`元素——我们在主导航和`footer`上面用到了它。我们还决定将它使用在跳过链接（skip links）上，因为可访问性的原因而包含它。

可以看看站点的内容，肯定会有一些讨论`<nav>`元素可以用在侧边栏中的近期文章和分类中。你应不应该这样做呢？老实说，我觉得从规范定义中这很难说，但是我可以说这不是“主要导航”，但它会引诱人去点击它。特别是如果你在分析建议这些导航区域是主要的途径,用户可以通过它在你的站点上进行导航。

### 其他用法

下面是一些更多的例子，在站点的其他区域可以考虑使用`<nav>`元素：

 - 目录：对于这个我会说非常肯定的。它对于特特别的内容是主要的导航
 - 上一个/下一个按钮（或者分页）：因为它对于站点/博客是非常重要的层次结构和整体结构
 - 搜索表单：搜索表单是一个站点非常重要的一部分，特别是某些大型网站几乎依赖它们的搜索引擎
 - 面包屑导航：尽管面包屑导航并不总是必要的，且可以使用当并不适用时（can be used when not applicable，不懂作者的心呀），在大型网站中面包屑导航是一个非常重要的导航设备。

### nav和menu的不同

如果你没有意识到还有另外一个元素会混淆这个问题，可以看看`menu`元素在[HTML规范][4]中的定义。我注意到一些开发者使用`<menu>`元素比`<nav>`元素更多。我们认为最好澄清：`<menu>`元素是用于一些命令的列表，且是一个交互的元素，更容易被专门用于Web应用程序。

以上内容翻译自：[Semantic navigation with the nav element][5]

## aside

首先，看看`HTML5`规范中对`<aside>`元素的定义：

> The aside element represents a section of a page that consists of content that is tangentially related to the content around the aside element, and which could be considered separate from that content. Such sections are often represented as sidebars in printed typography.

大致意思为：`aside`元素代表了页面的一个部分，这个部分包含了与主内容无关的内容包含在`aside`元素周围，可以被认为是独立于内容的。这样的部分往往代表在排版印刷中的侧边栏/工具条。

> The element can be used for typographical effects like pull quotes or sidebars, for advertising, for groups of nav elements, and for other content that is considered separate from the main content of the page.

大致意思为：这个元素可以被用于引用或者侧边栏的排版结果，对于广告，对于一组`nav`元素和一些被认为独立于页面主内容的其他内容。

> Note: It's not appropriate to use the aside element just for parentheticals, since those are part of the main flow of the document.

注意：对于作为插入语`aside`元素是不适合的，因为这些是文档主流程的一部分。

### 如何使用

下面的实例展示了`aside`元素如何在一篇大文章中作为一个引用shiyong：

```c
...

<p>He later joined a large company, continuing on the same work.
<q>I love my job. People ask me what I do for fun when I'm not at
work. But I'm paid to do my hobby, so I never know what to
answer. Some people wonder what they would do if they didn't have to
work... but I know what I would do, because I was unemployed for a
year, and I filled that time doing exactly what I do now.</q></p>

<aside>
 <q> People ask me what I do for fun when I'm not at work. But I'm
 paid to do my hobby, so I never know what to answer. </q>
</aside>

<p>Of course his work — or should that be hobby? —
isn't his only passion. He also enjoys other pleasures.</p>

...
```

下面的实例展示了`aside`可以被用在友情链接和博客另一边的内容：

```c
<body>
 <header>
  <h1>My wonderful blog</h1>
  <p>My tagline</p>
 </header>
 <aside>
  <!-- 这里的aside包含了两部分与页面无关的内容，换句话说，链接到其他博客的链接，和链接到本博客里其他的文章 -->
  <nav>
   <h1>My blogroll</h1>
   <ul>
    <li><a href="http://blog.example.com/">Example Blog</a>
   </ul>
  </nav>
  <nav>
   <h1>Archives</h1>
   <ol reversed>
    <li><a href="/last-post">My last post</a>
    <li><a href="/first-post">My first post</a>
   </ol>
  </nav>
 </aside>
 <aside>
  <!-- 这个aside同样包含了与页面无关的内容，它包含了博客作者twitter上的信息 -->
  <h1>Twitter Feed</h1>
  <blockquote cite="http://twitter.example.net/t31351234">
   I'm on vacation, writing my blog.
  </blockquote>
  <blockquote cite="http://twitter.example.net/t31219752">
   I'm going to go on vacation soon.
  </blockquote>
 </aside>
 <article>
  <!-- this is a blog post -->
  <h1>My last post</h1>
  <p>This is my last post.</p>
  <footer>
   <p><a href="/last-post" rel=bookmark>Permalink</a>
  </footer>
 </article>
 <article>
  <!-- this is also a blog post -->
  <h1>My first post</h1>
  <p>This is my first post.</p>
  <aside>
   <!-- 这个aside是和博客文章相关的，因为它在`<article>`元素里面，这个僵尸错误的，作为实例，把友情链接放在这里，因为友情链接和这个文章不是真的相关的，而致使和整个页面相关的 -->
   <h1>Posting</h1>
   <p>While I'm thinking about it, I wanted to say something about
   posting. Posting is fun!</p>
  </aside>
  <footer>
   <p><a href="/first-post" rel=bookmark>Permalink</a>
  </footer>
 </article>
 <footer>
  <nav>
   <a href="/archives">Archives</a> —
   <a href="/about">About me</a> —
   <a href="/copyright">Copyright</a>
  </nav>
 </footer>
</body>
```

## section

我们接到最多的问题是`section`元素的使用，我们也意识到我们总是错误的使用`section`元素。

对不起！

我们一直在错误的使用`section`元素包含内容，从而对它应用样式，或者与主要内容划分界限，例如：nav、header、footer等。这些是div的工作，而不是section。

在`section`中的定义指出：

> The section element represents a generic document or application section…The section element is not a generic container element. When an element is needed only for styling purposes or as a convenience for scripting, authors are encouraged to use the div element instead. A general rule is that the section element is appropriate only if the element’s contents would be listed explicitly in the document’s outline.

上面一段话的意思为：`section`元素代表了一个通用的文档或者应用的片段（section），且`section`不是一个通用的容器元素。当一个元素仅仅为了应用样式的目的或者为了方便脚本，作者应该被鼓励使用`div`元素作为代替。一个通用的规则是：`section`元素仅仅只适用在当该元素的内容会被明确的在文档的大纲中列出来时才使用。

`section`是一个blob的内容，从而你可以把它存储在数据库中的一个单独的记录中。它通常看起来像这样：

```c
<body>
...
<section>
<h2>level of heading = section nesting level</h2>
rest of the content
</section>
...
</body>
```

除了少数例外，`section`不应该使用在没有正常头部的情况。

规范定义中说到：

> The theme of each section should be identified, typically by including a heading (h1-h6 element) as a child of the section element.

意思是：每个section的主题应该是可以被鉴别的，特别的在其中包含了一个标题（h1-h6）在其中作为section的子元素。

检查你的工作在[HTML 5 outliner tool][6]。如果你看到任何一个实例“untitled section”对应一个section元素时，说明你可能做错了（然而，对于nav和aside是可以为untitled的）。

### main元素怎么样

使用`main`元素标记文档的主要内容区域。可以看这里[The main element][7]。

### 如何使用section的规则

当然，总是会有例外的，但这些应该会在99%的情况下给出有用的指导：

 - 不要为了应用样式和脚本使用它，那是div的事情
 - 不要使用它，当article、aside和nav更适合的时候
 - 不要使用它，除非在section的开始有一个标题
 - 修改的规范中说到：
> Authors are encouraged to use the article element instead of the section element when it would make sense to syndicate the contents of the element.

作者在section元素将使有意义辛迪加元素的内容时，应该被鼓励使用article元素代替section元素。（这里的辛迪加不知道啥意思）。

这里博文和评论通常是被聚合的，它们应该使用article。

以上内容翻译自：[The section element][8]

## meter

HTML5提供了几个比较有用的元素，为页面的标记添加了更深一层的意义。这些新元素包含了`time`、`mark`，这里还有另外一个`meter`,它是一个行内元素，所以能在大部分元素中使用它，包括一个头部或者段落中。

### 规范定义

> The meter element represents a scalar measurement within a known range, or a fractional value; for example disk usage, the relevance of a query result, or the fraction of a voting population to have selected a particular candidate.

意思大致为：`meter`元素代表了一个在已知范围内的标量度量，或者是一个分数值；例如磁盘使用情况，在不同的查询结果的相关性，或者投票人数的比例来选择一个特定的人。

当我第一次读到`meter`标签，我马上想到这将对属性页面非常有用，例如高度或宽度，或者年龄，标记在一个不错的定义列表。然而，定义的第三行说到：

> The meter element also does not represent a scalar value of arbitrary range — for example, it would be wrong to use this to report a weight, or height, unless there is a known maximum value

意思大致为： `meter`元素也不代表任意范围内的标量值，例如，使用这个去报道重量或宽度时错误的，除非有一个知道的最高值。

所以去我的想法。规范定义的重点在于：一个已知范围内的标量度量。

### 属性

在`meter`标签中允许使用六个属性：value, min, max, high, low和optimum。我们将在下面提到，重点是作者应该正确的使用它们。

#### Value

这个将被解析出来——实际值。如果你不适用value属性，则在标签中的第一个数字为这个值：`<meter> 2 out of 10</meter>`，如果没有使用一个真实数字，则value为0.

#### Min

允许的最小值。如果没有min属性，则假设最小值为0。如果没有定义，则这个值为0.

#### Max

允许的最大值。如果最大值小于最小值，则最小值被使用为最大的。如果没有定义，则该值为1。然而，如果有可能在内容中指定这个值，例如一个百分比记号，最大值为100%。

#### Low

这被认为是值的低的部分，它必须小于或等于high属性的值。而且，如果low属性值小于min属性值时，则它和min的值一样。

#### High

这被认为是值的高的部分，如果high值小于low的边界，则high值和low值一样。同样，如果high值大于max值时，它和max值一样。

#### optimum

这个被认为是最佳值，且必须介于min和max之间。它可以比high值高。

### 实例

#### 一个投票或评价工具

```c
<p>Your score is:  <meter>2 out of 10</meter></p>
```
我们可以通过给定最小值和最大值给这个进一步的含义：

```c
<p>Your score is: <meter min="0" max="10">2 out of 10</meter></p>
<p>Your score is: <meter value="91" min="0" max="100" low="40" high="90" optimum="100">A+</meter></p>
```

#### 没有属性值

```c
<meter>80%</meter>
<meter>3/4</meter>
```

### 真实用法

#### 圣诞节日历/倒计时

```c
<p>Christmas is in <meter value ="30" min="1" max="366" title="days">30 days!</p>
```

注意我们可以使用title属性来指定单位。


#### Just Giving

![Just Giving][9]

```c
<dl>
  <dt>Target</dt>
  <dd><meter min="145" value="145" title="pounds">£145</meter></dd>
  <dt>Amount raised so far</dt>
  <dd><meter min="0" max="1000" low="50" high="125" value="145" optimum="145" title="pounds">£145</meter></dd>
</dl>
```

### 错误用法

#### 空标签

如果你这样使用：

```c
<meter min="0" max="100" value="75"></meter>
```
在你的页面中将不会显示任何东西，在规范中定义：

> The recommended way of giving the value is to include it as contents of the element

意思为：建议的方法是给定值包含在元素内作为其内容。

所以你应该在这个标签内添加一些内容，且不一定需要有一个数字。规范中有一个好的实例：

```c
<p><meter value="0.5">Moderate activity,</meter> Usenet, 618 subscribers</p>
<p><meter value="0.25">Low activity,</meter> Usenet, 22 subscribers</p>
<p><meter value="0.25">Low activity,</meter> Usenet, 66 subscribers</p>
```

将会在页面中这样显示：

![enter image description here][10]

正如我前面所提到，使用重量或者高度将是错误的，除非有一个最大值。规范中给出了例子：

```c
<p>The grapefruit pie had a radius of <meter>12cm</meter>  and a height of <meter>2cm</meter>.</p> <!-- BAD! -->
```

> Instead, one would either not include the meter element, or use the meter element with a defined range to give the dimensions in context compared to other pies:

意思为：相反，人们要么不包括`meter`元素，或者使用`meter`元素在给定了一个范围去给出尺寸的情况下，以此和其他比较：
```c
<p>The grapefruit pie had a radius of 12cm and a height of 2cm.</p>
<dl>
<dt>Radius: <dd> <meter min=0 max=20 value=12>12cm</meter>
<dt>Height: <dd> <meter min=0 max=10 value=2>2cm</meter>
</dl>
```

### 浏览器支持

Safari 4, Firefox 3.5, Chrome 2, Opera 9.64 以上的版本。如果想在IE6,7,8中使用，可以在代码中加入以下代码：

```c
<!--[if IE]>
  <script  src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
```

以上内容翻译自：[Measure up with the meter tag][11]

## address

`address`元素1995年起草的`HTML3`规范的时候就已经出现了，它还继续在最新起草的`HTML5`规范中存活下来。但是自它创建出来十五年，仍然在一些开发者中造成混淆。所以我们应该怎样在文档中使用`address`元素呢？

### 正确用法

> The address element provides contact information for a document or part of a document. Information provided by address may include the names of the document’s maintainers, links to the maintainers’ Web pages, e-mail addresses for feedback, postal addresses, phone numbers, and so on. The address element is not appropriate for all postal and e-mail addresses; it should be reserved for providing such information about the contact people for the document.

意思大致为：`address`元素为一个文档或文档的一部分提供了联系信息。用`address`提供的信息可能包括文档维护者的名字，链接到维护者的网站，回复的邮箱地址，邮政地址，电话号码等等。对于所有的邮政和邮箱地址`address`元素是不适合的，它应该被保留为对文档提供联系人的信息。

如果我们听从上面的建议，我们可以这么做：

```c
<address>
<a href="http://html5doctor.com/author/jacko">Jack Osborne</a>,
<a href="http://html5doctor.com/author/richc">Rich Clark</a>,
<a href="http://html5doctor.com/author/miker">Mike Robinson</a>,
<a href="http://html5doctor.com/author/toml">Tom Leadbetter</a>,
<a href="http://html5doctor.com/author/brucel">Bruce Lawson</a>,
<a href="http://html5doctor.com/author/remys">Remy Sharp</a>,
<a href="http://html5doctor.com/author/olib">Oli Studholme</a>
</address>
```

还有一个在页面中应用的其他例子：

```c
<footer>
<div class="vcard">by
 <address class="author">
<em class="fn"><a title="Posts by Jack Osborne" href="#">Jack Osborne</a></em>
</address> on
 <time datetime="2009-11-04" class="published updated">November 4th, 2009</time>
</div>
</footer>
```

如果你查看我们页面的源代码，[http://html5doctor.com/][12]，你可以看到我们已经使用了`address`元素。

### 错误用法

`address`元素最常见的误解它应该被用来标记任何旧的地址。看看下面的例子：

```c
<!-- This is bad! -->
<address>
Dr. Jack Osborne<br>
HTML5 Hospital,<br>
Doctorville,<br>
Great Britain<br>
Tel: +44 (0)XXXX XXXXXX
</address>
```

想知道这个代码哪里错了嘛？非常简单，`address`元素不是为邮政地址而创建的。为了巩固这些，最新的规范定义中指出，`address`元素不能用来代表任意的地址（例如，邮政地址），除非这些地址确实是和文档或文档的章节相关的联系信息。

### 标记任意地址

那么，我们应如何处理不相关的文档的地址呢？一种解决方案是使用`p`元素结合[hCard microformat][13]。

```c
<div class="vcard">
<p class="fn"><a class="url" href="#">Dr. Jack Osborne</a><p>
<p class="adr">
<span class="street-address">HTML5 Hospital</span><br>
<span class="region">Doctorville</span><br>
<span class="postal-code">Postal Code</span><br>
<span class="country-name">Great Britain</span>
</p>
<p class="tel">+44 (0)XXXX XXXXXX</p>
</div>
```

以上内容翻译自：[The Address Element][14]


## article

我们已经在[HTML5Doctor][15]中讨论了许多新元素，但是`article`元素好像逃过了。`article`是新的章节元素之一。它通常和`section`与`div`混淆，但是不要担心，我们将在下面介绍它们之间的不同。

### 规范定义

> The article element represents a component of a page that consists of a self-contained composition in a document, page, application, or site and that is intended to be independently distributable or reusable, e.g. in syndication. This could be a forum post, a magazine or newspaper article, a blog entry, a user-submitted comment, an interactive widget or gadget, or any other independent item of content.
[W3C Specification][16]

意思大致为：`article`元素代表了一个页面的一个组件，这个组件包含了在文档、页面、应用或网站中的一个自包含的作品，意在于独立分配或者重用，例如：在发布中。这可能是一个论坛的帖子，杂志或报纸文章，博客条目，用户提交的评论，交互式小工具或小工具，或内容的任何其他独立的项目。

除了它的内容，一个`<article>`元素通常包含一个标题（通常在header元素里），有时是一个`footer`。最简单概念化`article`的方法时想想它在博客中的使用，就如规范实例中的“a blog entry（博客条目）”和“user-submitted comments（用户提交的评论）” 。在HTML5Doctor中，我们包裹每一篇博客文章在`article`元素中。我们还使用`<article>`在那些页面的“静态”内容中，如关于页面或者联系信息等。因为`article`可用于“内容的任何其他独立项目”。最棘手的部分是，究竟什么是“内容的独立项目”？

### 独立项目

内容的一个独立块，适于放置在一个`article`元素中，其内容是使自身有意义的。这个标准是否达到你的解释，但一个简单的嗅觉测试时使这个在RSS feed中有意义？当然在一个订阅器中博客文章和静态页面时有意义的。在另一方面，这篇文章的每一个段落的订阅作为一个独立的发布是不是非常有用的。这里的关键点是：内容要独立于它的上下文而有意义，例如，当所有周围的内容被剥离。

### 实例

我们只有一个标题和一些内容，但是足以使自己有意义(假设有关于苹果更多的内容;-)。

```c
<article>
  <h1>Apple</h1>
  <p>The <b>apple</b> is the pomaceous fruit of the apple tree...</p> ... 
</article>
```

一个发布日期导致我们添加一个`<header>`，同样有内容适用于一个`<footer>`元素中：

```c
<article>
  <header>
    <h1>Apple</h1> 
    <p>Published: <time pubdate="pubdate">2009-10-09</time></p> 
  </header>
  <p>The <b>apple</b> is the pomaceous fruit of the apple tree...</p> ... 
  <footer> 
    <p><small>Creative Commons Attribution-ShareAlike License</small></p> 
  </footer> 
</article>
```

这个实例显示了一个博客文章的评论。每个评论可以被一个`<article>`标记并包好在父`<article>`中。

```c
<article>
  <header> 
    <h1>Apple</h1> 
    <p>Published: <time pubdate datetime="2009-10-09">9th October, 2009</time></p> 
  </header> 
  <p>The <b>apple</b> is the pomaceous fruit of the apple tree...</p> ...  

  <section> 
    <h2>Comments</h2> 
    <article> 
      <header> 
        <h3>Posted by: Apple Lover</h3> 
        <p><time pubdate datetime="2009-10-10T19:10-08:00">~1 hour ago</time></p> 
      </header> 
      <p>I love apples, my favourite kind are Granny Smiths</p> 
    </article>  
    <article> 
      <header> 
        <h3>Posted by: Oranges are king</h3> 
        <p><time pubdate datetime="2009-10-10T19:15-08:00">~1 hour ago</time></p> 
      </header> 
      <p>Urgh, apples!? you should write about ORANGES instead!!1!</p> 
    </article> 
  </section> 
</article>
```
你可以使用`section`元素通过标题分离`article`为逻辑的组内容：

```c
<article> 
  <h1>Apple varieties</h1> 
  <p>The apple is the pomaceous fruit of the apple tree...</p>  

  <section> 
    <h2>Red Delicious</h2> 
    <p>These bright red apples are the most common found in many supermarkets...</p> 
  </section>  

  <section> 
    <h2>Granny Smith</h2> 
    <p>These juicy, green apples make a great filling for apple pies...</p> 
  </section>  
  
</article>
```

在适当的情况下一个`<section>`元素可以包含一个`<article>`元素。我们已经在上面的评论实例中看见了，其他常见的例子是一个博客的主页和分类页：

```c
<section> 
  <h1>Articles on: Fruit</h1>  
  <article> 
    <h2>Apple</h2> 
    <p>The apple is the pomaceous fruit of the apple tree...</p> 
  </article>  

  <article> 
    <h2>Orange</h2> 
    <p>The orange is a hybrid of ancient cultivated origin, possibly between pomelo and tangerine...</p> 
  </article>  

  <article> 
    <h2>Banana</h2> 
    <p>Bananas come in a variety of sizes and colors when ripe, including yellow, purple, and red...</p> 
  </article>  
</section>
```

规范中还提到一个交互的组件也可以是一个`<article>`。下面的实例：

```c
<article> 
  <h1>My Fruit Spinner</h1> 
  <object> 
    <param name="allowFullScreen" value="true"> <embed src="#" width="600" height="395"></embed> 
  </object> 
</article>
```
你可能注意到了在这些实例中的`pubdate`属性。`pubdate`属性是一个可选的布尔属性，它可能被添加到`<article>`元素中的`time`元素。如果当前表明`time`元素是`<article>`元素的发布日期。它有好几种写法，最常见的是：

```c
pubdate
pubdate="pubdate"
```

### article和section之间的不同

在`HTML5`中，在`<section>`和`<article>`元素之间的不同点存在许多的误解。`<article>`元素是一种特别的`<section>`；它比`<section>`元素含有更多特定的语义化含义，独立的、相关内容的自包含块。我们可以使用`<section>`，但是使用`<article>`将给予内容更多的语义。

相比之下，`<section>`仅仅只是一个相关的内容块，且`<div>`仅仅是一个内容块。就像上面提到的`pubdate`属性是不适合`<section>`元素的。要决定哪个元素更适合，选择第一个合适的选择：

 1. 内容是否使它自身有意义在一个阅读订阅器中，有意义则使用`<article>`
 2. 内容是否使相关的，相关的则使用`<section>`
 3. 最后如果没有语义化的联系，则使用`<div>`

如果上面的解释你还不是太明白可以看看这篇文章：[HTML5 articles and sections: what’s the difference?][17]

以上内容翻译自：[The article element][18]


## dl

在`HTML4`中是存在`dl`元素的，但是在`HTML5`中已经改变意图了。让[Doctor][19]来解释改变了什么和如何使用。

### 这一切都在说明

在`HTML4`中，`<dl>`被认为是一个“定义列表”，包含了术语组合他们的定义。术语和定义是一个多对多的关系，一个或多个术语对应一个或多个定义。该元素经常被误解，因此误用和不主张使用被更广泛的主张使用，和减少语义化标记。

为了解决这些问题，`<dl>`在`HTML5`中被重新定义为一说明列表。下面是规范定义：

> The dl element represents an association list consisting of zero or more name-value groups (a description list). Each group must consist of one or more names (dt elements) followed by one or more values (dd elements). Within a single dl element, there should not be more than one dt element for each name.

意思为：`dl`元素代表了一个关联列表，包含了0个或多个名-值对（一个说明列表）。每一对必须包含一个或多个名字（dt元素）跟随者一个或多个值（dd元素）。在一个单独的`dl`元素中，不应该出现对于每一个名字多于一个`dt`元素。

它维护者名值对之间多对多的关系，这些对用`<dt>`代表了术语或名字，`<dd>`代表了说明，还要注意最行一行的引用，以一个名字开始不应该使用在超过一个的`<dl>`中。

### 使用实例

我会将`<dl>`合适的用途放在一起，以激发你源源不断的创意。

#### 术语表

`<dl>`可以用来标记一个术语表，尽管你必须记得用`<dfn>`以表明这个词在这里被定义。

```c
<article>
  <h1>The article element</h1>
  <p>An independent piece of content, one suitable for putting in an
    article element, is content that makes sense on it’s own. This yardstick
    is up to your interpretation, but an easy smell test is would this make sense
    in an RSS feed? Of course weblog articles and static pages would make sense
    in a feed reader, and some sites have weblog comment feeds..</p>
  ...
  <aside>
    <h2>Glossary</h2>
    <dl>
      <dt><dfn>RSS</dfn></dt>
      <dd>An XML format for aggregating information from websites whose 
        content is frequently updated.</dd>
      <dt><dfn>Weblog</dfn></dt>
      <dd>Contraction of the term "web log", a weblog is a 
        website that is periodically updated, like a journal</dd>
    </dl>
  </aside>
</aticle>
```

这个例子的内容来源于我们[之前发布的article的文章][20]，在这个例子中，我拔光了术语“RSS”和“博客”，并定义它们在一个方便的术语表中。这些信息是为了对`article`的补充，术语表被放在`<aside>`元素中。

#### 元数据

`<dl>`也适用于标记内容的元数据，例如关于[现在如何使用HTML5在你的客户端工作][21]文章的信息。

```c
<dl>
  <dt>Authors:</dt>
  <dd>Remy Sharp</dd>
  <dd>Rich Clark</dd>
  <dt>Editor:</dt>
  <dd>Brandan Lennox</dd>
  <dt>Category:</dt>
  <dd>Comment</dd>
</dl>
```

由于雷米和理查德贡献了那篇文章，他们都列为作者，展示了这个配对的名（dt）值（dd）对。

#### 多个键对应一个值

就像上面提到的，一个`<dl>`可能会多个键（dt）对应多个值（dd），这意味着一个属于可能包含多个说明，或者多个术语说明着同样的事情，相关的`<dt>`每一个理解描述它们的`<dd>`。

```c
<dl>
  <dt lang="en-GB"><dfn>colour</dfn></dt>
  <dt lang="en-US"><dfn>color</dfn></dt>
  <dd>The visual result of light in their emission, transmission and/or reflection. This perception is determined by the hue, brightness and saturation of the light at a specific point. </dd>
</dl>
```

在这里，我已表明，“颜色”两种不同的拼法和组合这些术语具有相同的描述相匹配。

在一个`<dl>`里面使用一个键多次那是不合适的。你不能定义“汽车”为一样东西在`<dl>`的开头，然后又在`<dl>`的结尾又重新定义它。如果对于一个术语，你有多个描述，你应该列出多个`<dd>`并直接放在`<dt>`下面。

```c
<dl>
  <dt><dfn>Chips</dfn></dt>
  <dd>Strips of potato usually deep fried in fat. Commonly referred to as "french fries".</dd>
  <dd>A small fragment that has been broken off from a larger body (e.g. stone).</dd>
</dl>
```

### 它不应该被用来做什么

在`HTML4`中对话是`<dl>`元素被建议使用的一种用法，这被广泛讨论，且通常认为这是不合适的。这种应用的元素在`HTML5`中已经不再被推荐了，元素的新定义确实回本了。当标记一段对话，你不应该描述说话者，而是从他们说什么开始。随着`<dialog>`的死亡，对话在定义中没有标记元素。作为代替，该规范建议了[如何标记对话][22]。

### 总结

这些变化对于`<dl>`是相当小的，但新定义应清理混乱，使开发人员能够更恰当地使用它。你可以使用这个元素去代替语义化的名值对，将它们包围在`<detail>`或`<article>`这样的元素中去给予信息一个上下文。


## main

近日，`<main>`正式加入`W3C`规范了。现在，尘埃落定，是时候我们深入找出和什么时候适合使用`<MAIN>`。让我们开始吧。

### 历史

包含`main`元素已经有了很长在工作组有了很长一段时间的讨论了，包括作者和其他一些问为什么我们有新元素例如`<header>`，`<article>`和`<footer>`，但是却没有元素精确的包含页面的主要内容呢。

[Steve Faulkner][23]，一个可访问性顾问和新的Doctor，承担展开艰苦的研究，收集数据和用例，并与实施者对话以激起他们的兴趣。正如史蒂夫解释说，他谈到：

> as many implementers (both general browser implementers and accessibility implementers), developers, authors and users as I could and got advice and input from them. I went where the various people hung out; on IRC, mailing lists, twitter, blogs, conferences — anywhere.
[Steve Faulkner][24]

意思大致为：尽可能多的实现者（包括一般的浏览器执行者和实施者可访问性），开发者，作者和用户尽我所能，得到的建议和投入他们。我去聚集人多的地方，在IRC，邮件列表，推特，博客和任何地方。

这导致了他编写一个[`<main>`的扩展规范][25]和彻底的[用例的原理][26]。

该提议在2012年11月呗接受，`<main>`被添加到`HTML5.1`规范中。最近，它被无异议的加入到HTML5规范。让我们来看看如何规范描述`<main>`。

### W3C规范

`<main>`的主要目的是为了映射[ARIA里程碑的角色][27]在`HTML`中的一个主要元素。这将帮助屏幕阅读器和其他辅助技术了解的主要内容开始的地方。 W3C规范描述`<main>`：

> The main content of the body of a document or application. The main content area consists of content that is directly related to or expands upon the central topic of a document or central functionality of an application.

意思为：一个文档或应用的主体的主要内容。主要内容区域包含了与文档的中心主题或一个应用的核心功能直接相关的或扩展的内容。

自从`<main>`元素被包含到`HTML`规范中，`<body>`元素恢复了它在`HTML4`中的定义。

> The body element represents the content of the document.

`body`元素代表了文档的内容。

### 更多细节

`<main>`元素非常重要的一个方面是它只能在每一个页面中使用一次。 [Jeremy Keith 向工作组写到][28]去理解为什么是这样的（而不是允许很多的`<main>`）。虽然我不会细讲，讨论的是一个有趣的阅读。

按照该规范，如果您尝试在每个文档中使用多个`<main>`元素W3C验证会抛出一个错误。

另外一个规定是`<main>`元素不能`<article>`,`<header`，`<footer>`，`<aside>`，`<nav>`元素的子元素。

因为`main`元素不是章节元素，它不会像`<article>`，`<nav>`或`<section>`那样会影响文档大纲。

### Getting Going

正如在引入许多其他新的HTML5元素，并不是所有的浏览器都能识别`<main>`或有预设样式吧。你需要确保它显示在你的CSS块级元素：

```c
main {display:block;}
```

对于老版本的IE你还需要：

```c
<script>document.createElement('main');</script>
```
当然，如果你使用[html5shiv][29]，`main`元素就可以直接使用了。

### 在Html5Doctor中应用<main>

最简单应用`<main>`元素的地方就是替换掉那些`<div>`被添加了`main`或`content`的class或id。

在实践中它会看起来像哪样呢？这是Html5Doctor中`<main>`的标记：

```c
<body>
<header role="banner">
[...]
</header>

<div id="content" class="group" role="main">
[...]
</div>

<footer role="contentinfo">
    [...]
</footer>
</body>
And here's what it's like now:

We'll get around to removing the id="content" at some point too.
<body>
<header role="banner">
[...]
</header>

<main id="content" class="group" role="main">
[...]
</main>

<footer role="contentinfo">
    [...]
</footer>
</body>
```
 
是的，这非常简单，运气好的话，你需要不到五分钟就能应用它。

  [1]: http://www.w3.org/html/wg/drafts/html/master/sections.html#the-header-element
  [2]: http://html5doctor.com/the-header-element/
  [3]: http://html5doctor.com/
  [4]: http://www.whatwg.org/specs/web-apps/current-work/#menus
  [5]: http://html5doctor.com/nav-element/
  [6]: http://gsnedders.html5.org/outliner/
  [7]: http://html5doctor.com/the-main-element/
  [8]: http://html5doctor.com/the-section-element/
  [9]: http://html5doctor.com/wp-content/uploads/2009/08/just-giving-example.jpg
  [10]: http://html5doctor.com/wp-content/uploads/2009/09/sample-meter.png
  [11]: http://html5doctor.com/measure-up-with-the-meter-tag/
  [12]: http://html5doctor.com/
  [13]: http://html5doctor.com/microformats/#hcard
  [14]: http://html5doctor.com/the-address-element/
  [15]: http://html5doctor.com/
  [16]: http://www.w3.org/TR/html5/semantics.html#the-article-element
  [17]: http://www.brucelawson.co.uk/2010/html5-articles-and-sections-whats-the-difference/
  [18]: http://html5doctor.com/the-article-element/
  [19]: http://html5doctor.com/
  [20]: http://html5doctor.com/the-article-element/
  [21]: http://html5doctor.com/how-to-use-html5-in-your-client-work-right-now/
  [22]: http://www.w3.org/html/wg/drafts/html/master/Overview.html#conversations
  [23]: http://html5doctor.com/interview-steve-faulkner-html5-editor-new-doctor/
  [24]: http://html5doctor.com/interview-steve-faulkner-html5-editor-new-doctor/
  [25]: https://dvcs.w3.org/hg/html-extensions/raw-file/tip/maincontent/index.html
  [26]: http://www.w3.org/html/wg/wiki/User:Sfaulkne/main-usecases#Introduction
  [27]: http://www.w3.org/TR/wai-aria/roles#landmark_roles
  [28]: http://lists.w3.org/Archives/Public/public-html/2013Jan/0230.html
  [29]: https://github.com/aFarkas/html5shiv