display
========

这个属性指定元素所使用的渲染盒（rendering box）类型。在 HTML 这类的语言中，元素的行为都得到了完整的定义，其默认的“display”属性取决于 HTML 规范所描述的行为或浏览器/用于的默认样式表。在 XML 这类没有定义显示行为的语言中，其默认值为“inline”。

除了众多已定义的显示盒类型外，还有一个名为“none”的值用于隐藏元素，而且此元素的所有子元素都会被隐藏。文档的显示效果与此元素不存在于文档树中的效果相同。这个值功能强大，但是应当小心使用。

 - 初始值：inline
 - 适用于：所有元素
 - 继承：否


## 语法

```c
display: <display-value> | inherit
```

## 取值

### inline

这个值让元素产生一个或多个的行内框。例如：`<span>`、`<em>`等元素。

`inline`的元素可以接受`margin`和`padding`，但不是和你想像的那样。它只对水平方向的`margin`和`padding`有效。

`inline`元素不接受`height`和`width`属性，如果指定了，会忽略它们。

可以看看这篇文章：[Inline elements and padding](http://www.maxdesign.com.au/articles/inline/)

### inline-block

这个值让元素产生一个行级块容器。行内块（inline-block）的内部会被当作块框来格式化，而此元素本身会被当作原子行级框来格式化。

这里有一篇一丝大牛的：[inline-block 前世今生](http://www.iyunlu.com/view/css-xhtml/64.html)

上面这篇文章将`inline-block`介绍的非常清楚。我就不啰嗦了。

### block

这个值让元素产生一个块框。

### list-item

这个值让元素（例：HTML 里的 LI）产生一个主块框与标记框。

### none

这个值让元素不出现在排版结构中（也就是在视觉媒体中，元素既不产生框也不影响布局）。其子孙元素也不产生任何框：该元素及其内容会被从排版结构中完全移除。对子孙元素设定 `display` 属性不能覆盖这个结果。

请注意`display`属性取值为 `none` 并不会产生隐形的框：`none` 完全不产生任何框。CSS 具有可以让元素在排版结构中出现并影响排版，但是框本身却不可见的属性。

注意与`visibility: hidden`的区别。`visibility: hidden`的元素不可见，但是它还会继续影响布局。就像隐形了一样。而`display: none`没有产生任何框，也不会影响布局。

### flex

将对象作为弹性伸缩盒显示。具体后面讲`flex`时会详细解释。

### inline-flex

将对象作为内联块级弹性伸缩盒显示。

### run-in

根据上下文决定对象是内联对象还是块级对象。

这里有一篇大牛的文章：[CSS display: run-in;](http://swordair.com/css-display-run-in/)

### table

指定一个元素定义一个块级表格：其是一个块格式化上下文中的矩形块。类同于html标签`<table>`。

### inline-table

指定一个元素定义一个行内表格：其是一个行内格式化上下文中的矩形块。

### table-row

指定一个元素为一个单元格组成的行。类似于html的`<tr>`。

### table-row-group

指定一个元素为至少一个行组成的群组。类似于html的`<tbody>`。

### table-header-group

与‘table-row-group’类似，但对于视觉格式化，此行群组总是显示在所有其他行和行群组之前，且在任意顶部标题之后。印刷用户代理可能会在贯穿表格的所有页面上重复头部行。如果表格包含多个‘display: table-header-group’的元素，则仅有第一个被显示为头部；其他元素被认为与‘display: table-row-group’相同。

类似于html的`<thead>`。

### table-footer-group

与‘table-row-group’类似，但对于视觉格式化，此行群组总是显示在所有其他行和行群组之后，且在任意底部标题之前。印刷用户代理可能会在贯穿表格的所有页面上重复脚部行。如果表格包含多个‘display: table-footer-group’的元素，则仅有第一个被显示为脚部；其他元素被认为与‘display: table-row-group’相同。

类似于html的`<tfoot>`。

### table-column

指定一个元素描述单元格的一列。类似于html的`<col>`。

### table-column-group

指定一个元素为至少一个列组成的群组。类似于html的`<colgroup>`。

### table-cell

指定一个元素表示一个表格单元格。类似于html的`<td>`和`<th>`。

### table-caption

指定一个表格的标题。类似于html的`<caption>`。


更多关于表格布局的信息：[CSS2/tables](http://www.w3.org/html/ig/zh/wiki/CSS2/tables#tables-intro)

