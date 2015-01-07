CSS3 Media Query
========

2015年的第一篇文章，新的一年更加努力的学习前端，重新开始，之前翻译的文章以及自己写的和一些笔记都放在了这里[2014‘s Blog](https://github.com/cookfront/learn-note/tree/master/blog-backup/2014)。

下面就进入正题了，这篇文章主要是[W3C官方 Media Query](http://www.w3.org/TR/css3-mediaqueries/)的一个学习和翻译。主要还是为了以后脑子不好使，可以回过头来看看复习复习。

## 摘要和背景

在`HTML4`和`CSS2`只支持对于不同的[媒体类型](http://www.w3.org/TR/CSS2/media.html)来设置样式，例如一个文档在屏幕（screen）上显示时使用`sans-serif`字体，而在打印（print）时使用`serif `字体，这里的`screen`和`print`是定义好的两种媒体类型。而`Media Query`扩充了`Media Type`的功能，并且使我们能够更精准的应用样式表。

例如，在`HTML4`中：

**实例一**

```html
<link rel="stylesheet" type="text/css" media="screen" href="sans-serif.css">
<link rel="stylesheet" type="text/css" media="print" href="serif.css">
```

或者：

**实例二**

```css
@media screen {
  * { font-family: sans-serif }
}
```

一个`Media Query`包含了一个`Media Type`以及0个或多个来检查特定的媒体特性条件的表达式。在这些媒体特性中能在`Media Query`中被使用的是`width`，`height`和`color`。通过使用`Media Query`，页面的呈现可以在特定的终端中显示，而不需要去改变内容。




## 兼容性

在了解`Media Query`之前需要了解浏览器对它的支持情况，以便在项目中更好的使用。可以在这里看到[Media Query](http://caniuse.com/#search=media%20query)对于浏览器的一个支持情况。对于IE永远是坑爹的，它只有在`IE8+`才支持`Media Query`。

那么在不支持的情况下有什么办法呢，社区的大牛给我们提供了[Respond.js](https://github.com/scottjehl/Respond)，它可以支持`IE8`及以下的浏览器。

## Media Queries

就如上面摘要提到的，一个`Media Query`包含了一个`Media Type`以及0个或多个来检查特定的媒体特性条件的表达式。

在本节中有关媒体`Media Query`的声明我们假设遵循了下面的[语法](#%E8%AF%AD%E6%B3%95)章节。没有遵循语法的`Media Query`将在[错误处理](#%E9%94%99%E8%AF%AF%E5%A4%84%E7%90%86)章节讲到。

**实例三：**

```html
<link rel="stylesheet" media="screen and (color)" href="example.css" />
```

这个实例表达了一个确定的样式表（example.css）应用于一个确定的媒体类型（screen）以及确定的特性（必须为彩色屏幕）

**实例四：**

对于上面的实例三，我们也可以用`@import`语句：

```css
@import url(color.css) screen and (color);
```

一个`media queries`是一个逻辑表达式，它可能为真也可能为假。`media queries`为真当媒体类型匹配当前正在运行的用户代理所在设备的媒体类型，且在`media queries`中所有表达式为真时，我们的`media queries`就为真。

对于媒体类型为`all`的`media queries`有一种简写法，也就是只有`@media and ()...`：

**实例五：**

```css
/* 以下两个样式表是等价的 */
@media all and (min-width:500px) { … }
@media (min-width:500px) { … }

/* 以下两个样式表是等价的 */
@media (orientation: portrait) { … }
@media all and (orientation: portrait) { … }
```

许多的`media queries`可以构成一个媒体查询列表。对于以逗号分隔的`media queries`，只要其中一个或多个为`true`时我们的列表就为真，否则为`false`，在`media queries`语法中，逗号代表了逻辑或，而`and`关键字代表了逻辑与。

**实例六：**

```css
@media screen and (color), projection and (color) { … }
```

如果媒体查询列表为空（或者说为空字符串或空白），它将被认为为真：

**实例七：**

```css
@media all { … }
@media { … }
```

逻辑否可以通过`not`关键字。其实就是和编程一样啦，大家懂的，加上了`not`，假就是真，真就是假。

**实例八：**

```html
<link rel="stylesheet" media="not screen and (color)" href="example.css" />
```

关键字`only`是用于隐藏老的用户代理的样式表。它的功能仅仅在于此了。而对于其他用户代理，处理以`only`开头的`media queries`时，要像`only`不存在一样。

**实例九：**

```html
<link rel="stylesheet" media="only screen and (color)" href="example.css" />
```

`media queries`语法可以用于`HTML`、`XHTML`、`XML`和`CSS`规则等`@media`和`@import`中。

**实例十：**

```c
<link rel="stylesheet" media="screen and (color), projection and (color)" rel="stylesheet" href="example.css">

<link rel="stylesheet" media="screen and (color), projection and (color)" rel="stylesheet" href="example.css" />

<?xml-stylesheet media="screen and (color), projection and (color)" rel="stylesheet" href="example.css" ?>

@import url(example.css) screen and (color), projection and (color);

@media screen and (color), projection and (color) { … }
```

如果有一个媒体特性没有应用到当前正在运行的用户代理的设备上时，包含该表达式的媒体特性讲为假。

**实例十一：**

媒体特性`device-aspect-ratio`只应用于视觉设备，所以对于音频设备该表达式将永远为`false`。

```c
<link rel="stylesheet" media="aural and (device-aspect-ratio: 16/9)" href="example.css" />
```

如果衡量单位没有应用于当前设备，表达式也将永远为`false`。

**实例十二：**

`px`没有应用于`speech`媒体类型，所以下面的媒体查询将永远为`false`。

```c
<link rel="stylesheet" media="speech and (min-device-width: 800px)" href="example.css" />
```

## 语法

```c
media_query_list
 : S* [media_query [ ',' S* media_query ]* ]?
 ;
media_query
 : [ONLY | NOT]? S* media_type S* [ AND S* expression ]*
 | expression [ AND S* expression ]*
 ;
media_type
 : IDENT
 ;
expression
 : '(' S* media_feature S* [ ':' S* expr ]? ')' S*
 ;
media_feature
 : IDENT
 ;
```

## 错误处理

对于不遵循用户代理的`media queries`需要遵守本节中描述的规则。

 - 未知媒体类型：未知媒体类型被计算为`false`。它可以有效的被认为是不匹配当前设备类型的媒体类型。
 - 未知媒体特性：当某个指定的媒体特性不知道时，用户代理将媒体查询相当于`not all`

**实例十五：**

在这个例子中，第一个媒体查询将相当于`not all`，并且计算为`false`，第二个媒体查询计算时就好像第一个媒体查询不存在。

```html
<link rel="stylesheet" media="screen and (max-weight: 3kg) and (color), (color)" href="example.css" />
```

 - 未知媒体特性值：和未知媒体特性一样，用户代理会将媒体查询相当于`not all`，当某个媒体特性值不知道时。

**实例：**

因为在`max-width`中负值是不允许的，所以相当于`not all`

```css
@media (min-width: -100px) { … }
```

 - 畸形的媒体查询：具有意外的`token`的媒体查询相当于`not all`。

**实例：**

```css
@media (example, all,), speech { /* only applicable to speech devices */ }
@media &test, screen           { /* only applicable to screen devices */ }
```

## 媒体特性

在句法上，媒体特性类似于`CSS`属性：它们有名字并且接受确定的值。然而，属性和媒体特性之间也有几点重要到不同：

 - 属性被用于声明给文档提供信息从而如何呈现文档。而媒体特性则是一些表达式用于描述对于输出设备的要求。
 - 许多的媒体特性能够接受可选的`min-`和`max-`前缀来表达`大于等于`或`小于等于`。这种语法的使用是为了阻止`<`和`>`字符与`HTML`和`XML`冲突。这些媒体特性经常使用前缀来使用，当然也会单独使用了。
 - 属性总是需要一个值才能形成一个声明，另一方面，媒体特性也能不需要值。对于一个媒体特性，如果`(feature: x)`有一个值`x`，且`x`是除了0或0加上一个单位的值时，则`(feature)`会计算为`true`。而对于使用`min-`和`max-`前缀的媒体特性则必须使用一个值。当一个媒体特性用到了`min-`和`max-`前缀时，这会被认为是一个畸形的媒体查询。
 - 属性可以接收更多复杂的值，例如，通过其他值计算出来的值。而媒体特性只能接受单一的值：一个关键字、一个数字或者一个数字带有一个单位。

### width

 - 取值：`<length>`
 - 应用于：视觉或触觉媒体类型
 - 接受`min/max`前缀：是

`width`媒体特性描述了输出设备目标显示区域的宽度。对于一个连续媒体，这个就是视口(`viewport`)的宽度，并且包含了滚动条的宽度（如果有的话）。对于分页媒体，这是页框的宽度。

需要注意的是，`<length>`不能为负值。

**实例：**

下面的实例说明样式表只能应用于打印输出大于25cm的设备。

```html
<link rel="stylesheet" media="print and (min-width: 25cm)" href="http://…" />
```

**实例：**

这个实例说明样式表只能应用于视口宽度在`400px`和`700px`之间的设备。

```css
@media screen and (min-width: 400px) and (max-width: 700px) { … }
```

**实例：**

这个实例说明样式应用于`handheld`和`screen`媒体类型，且最小宽度为`20em`，`em`是相对于初始的`font-size`值。

```css
@media handheld and (min-width: 20em), 
  screen and (min-width: 20em) { … }
```

### height

 - 取值：`<length>`
 - 应用于：视觉或触觉媒体类型
 - 接受`min/max`前缀：是

`height`媒体特性和`width`几乎一样（但是height不常用），只是宽度与高度的区别，它同样包含了页面的水平方向滚动条的高度（如果有的话）。

负值也是不允许对。

### device-width

 - 取值：`<length>`
 - 应用于：视觉或触觉媒体类型
 - 接受`min/max`前缀：是

`device-width`媒体特性描述的是输出设备呈现表面的宽度（和`width`还是有很大区别的，对于连续媒体，`width`是指视口的宽度）。对于连续媒体，`device-width`指的是屏幕的宽度，对于分页媒体，这是页面纸张尺寸的宽度。

负值是不允许的。

`device-width`一般是用于移动端。

实例：

下面的例子表明样式表应用于媒体类型为`screen`，且水平宽度为`800px`的设备。

```css
@media screen and (device-width: 800px) { … }
```

### device-height

 - 取值：`<length>`
 - 应用于：视觉或触觉媒体类型
 - 接受`min/max`前缀：是

`device-height`媒体特性描述的是输出设备呈现表面的高度。对于连续的媒体，这是屏幕的高度。对于分页媒体，这是页面纸张尺寸的高度。

负值是不允许的。

**实例：**

```html
<link rel="stylesheet" media="screen and (device-height: 600px)" />
```

### orientation

 - 取值：`portrait | landscape`
 - 应用于：位图媒体类型
 - 接受`min/max`前缀：否

`orientation`一般是用于检测移动端是横向还是竖向的。当`height`的值大于等于`width`的媒体特性值时，`orientation`的值为`portrait`，否则为`landscape`。

实例：

```css
@media all and (orientation:portrait) { … }
@media all and (orientation:landscape) { … }
```
### aspect-ratio

 - 取值：`<value>`
 - 应用于：位图媒体类型
 - 接受`min/max`前缀：是

`aspect-ratio`描述了输出设备目标显示区域的宽高比。该值包含两个以`/`分隔的正整数。代表了水平像素数（第一个值）与垂直像素数（第二个值）的比例。

**实例：**

下面为显示区域宽高至少为一比一的设备选择了一个特殊的样式表。

```css
@media screen and (min-aspect-ratio: 1/1) { ... }
```

### device-aspect-ratio

- 取值：`<value>`
- 应用于：位图媒体类型
- 接受`min/max`前缀：是

这个和`aspect-ratio`很类似，描述的是输出设备的宽高比。该值包含两个以`/`分隔的正整数。代表了水平像素数（第一个值）与垂直像素数（第二个值）的比例。

**实例：**

例如，如果一个设备的屏幕媒体特性中，宽度为`1280px`，高度为`720px`，也就是等于`16/9`，则以下的所有媒体查询将匹配它：

```css
@media screen and (device-aspect-ratio: 16/9) { … }
@media screen and (device-aspect-ratio: 32/18) { … }
@media screen and (device-aspect-ratio: 1280/720) { … }
@media screen and (device-aspect-ratio: 2560/1440) { … }
```

### color

 - 取值：`<integer>`
 - 应用于：视觉媒体类型
 - 接受`min/max`前缀：是

`color`指定输出设备每个像素单元的比特值。如果设备不支持输出颜色，则该值为0。

`<integet>`不能为负值。

这个媒体特性用的也是比较少的。

**实例：**

```css
@media all and (color) { … }
@media all and (min-color: 1) { … }
```

### color-index

 - 取值：`<integer>`
 - 应用于：视觉媒体类型
 - 接受`min/max`前缀：是

`color-index`指定了输出设备中颜色查询表中的条目数量。

**实例：**

向所有使用至少256个索引颜色的设备应用样式表：

```css
<link rel="stylesheet" media="all and (min-color-index: 256)" href="http://foo.bar.com/stylesheet.css" />
```

### monochrome

 - 取值：`<integer>`
 - 应用于：视觉媒体类型
 - 接受`min/max`前缀：是

指定了一个黑白（灰度）设备每个像素的比特数。如果不是黑白设备，值为0。

**实例：**

向每个像素至少8比特的黑白设备应用样式表：

```css
@media all and (min-monochrome: 8) { ... }
```

### resolution

- 取值：`<resolution>`
- 应用于：位图媒体类型
- 接受`min/max`前缀：是

`resolution`指定输出设备的分辨率（像素密度）。分辨率可以用每英寸（dpi）或每厘米（dpcm）的点数来表示。

**实例：**

为每英寸至多300点的打印机应用样式：

```css
@media print and (min-resolution: 300dpi) { ... }
```

### scan

- 取值：`progressive | interlace`
- 应用于：`tv`媒体类型
- 接受`min/max`前缀：否

`scan`描述了电视输出设备的扫描过程。

**实例：**

向以顺序方式扫描的电视机上应用样式表：

```css
@media tv and (scan: progressive) { ... }
```

### grid

- 取值：`<integer>`
- 应用于：视觉或触觉媒体类型
- 接受`min/max`前缀：否

`grid`判断输出设备是网格设备还是位图设备。如果设备是基于网格的（例如电传打字机终端或只能显示一种字形的电话），该值为1，否则为0。

对于`grid`，有效的值只有`1`和`0`。其他一切都会创建一个畸形都媒体查询。

**实例：**

向一个15字符宽度或更窄的手持设备应用样式：

```css
@media handheld and (grid) and (max-width: 15em) { ... }
```

标准中还包括了一些值、单位的介绍，这里就不一一说了，具体还是[点我吧](http://www.w3.org/TR/css3-mediaqueries/)

需要看媒体查询的一些例子，可以看看这里：[http://mediaqueri.es/](http://mediaqueri.es/)

还可以看看W3Cplus的文章：[http://www.w3cplus.com/content/css3-media-queries](http://www.w3cplus.com/content/css3-media-queries)