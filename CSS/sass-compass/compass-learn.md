Compass 使用教程
========

`Compass`主要分为5个模块，在使用每个模块前必须使用`@import module`来导入相关的模块。

## Reset

如果你需要全局重置，只需要：

```c
@import "compass/reset";
```

这个会在你的`css`文件中生成：

```c
/* Welcome to Compass. Use this file to write IE specific override styles.
 * Import this file using the following HTML or equivalent:
 * <!--[if IE]>
 *   <link href="/stylesheets/ie.css" media="screen, projection" rel="stylesheet" type="text/css" />
 * <![endif]--> */
/* line 5, ../../../../Ruby200-x64/lib/ruby/gems/2.0.0/gems/compass-core-1.0.1/stylesheets/compass/reset/_utilities.scss */
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
  font-size: 100%;
  vertical-align: baseline;
}

/* line 22, ../../../../Ruby200-x64/lib/ruby/gems/2.0.0/gems/compass-core-1.0.1/stylesheets/compass/reset/_utilities.scss */
html {
  line-height: 1;
}

/* line 24, ../../../../Ruby200-x64/lib/ruby/gems/2.0.0/gems/compass-core-1.0.1/stylesheets/compass/reset/_utilities.scss */
ol, ul {
  list-style: none;
}

/* line 26, ../../../../Ruby200-x64/lib/ruby/gems/2.0.0/gems/compass-core-1.0.1/stylesheets/compass/reset/_utilities.scss */
table {
  border-collapse: collapse;
  border-spacing: 0;
}

/* line 28, ../../../../Ruby200-x64/lib/ruby/gems/2.0.0/gems/compass-core-1.0.1/stylesheets/compass/reset/_utilities.scss */
caption, th, td {
  text-align: left;
  font-weight: normal;
  vertical-align: middle;
}

/* line 30, ../../../../Ruby200-x64/lib/ruby/gems/2.0.0/gems/compass-core-1.0.1/stylesheets/compass/reset/_utilities.scss */
q, blockquote {
  quotes: none;
}
/* line 103, ../../../../Ruby200-x64/lib/ruby/gems/2.0.0/gems/compass-core-1.0.1/stylesheets/compass/reset/_utilities.scss */
q:before, q:after, blockquote:before, blockquote:after {
  content: "";
  content: none;
}

/* line 32, ../../../../Ruby200-x64/lib/ruby/gems/2.0.0/gems/compass-core-1.0.1/stylesheets/compass/reset/_utilities.scss */
a img {
  border: none;
}

/* line 116, ../../../../Ruby200-x64/lib/ruby/gems/2.0.0/gems/compass-core-1.0.1/stylesheets/compass/reset/_utilities.scss */
article, aside, details, figcaption, figure, footer, header, hgroup, main, menu, nav, section, summary {
  display: block;
}
```

我们可以来看看`compass/reset`中的内容：

```c
@import "reset/utilities";

@include global-reset;
```

只有两行代码，其实就是导入了`reset/utilities`中的`global-reset`的`mixins`。我们可以来再看看`global-reset`的内容：

```c
@mixin global-reset {
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    @include reset-box-model;
    @include reset-font; }
  // Unlike Eric's original reset, we reset the html element to be compatible
  // with the vertical rhythm mixins.
  html {
    @include reset-body; }
  ol, ul {
    @include reset-list-style; }
  table {
    @include reset-table; }
  caption, th, td {
    @include reset-table-cell; }
  q, blockquote {
    @include reset-quotation; }
  a img {
    @include reset-image-anchor-border; }
  @include reset-html5; }
```

`global-reset`其实就是包装了多个更小粒度的`reset`。有时候你可能需要更细粒度的控制`reset`，这时你就需要通过`@import "compass/reset/utilities"来导入`_utilities.scss`，例如，你需要重置盒模型：

```c
@import "compass/reset/utilities";

body {
  @include reset-box-model;
}
```

`utilities`中还提供了以下重置`mixins`：

 - reset-box-model
 - reset-font
 - reset-focus
 - reset-body
 - reset-list-style
 - reset-table
 - reset-table-cell
 - reset-quotation
 - reset-image-anchor-border
 - reset-html5
 - reset-display

## Typography

`typography`包含了排版相关的许多`mixins`。在使用`typography`时，你可以通过以下来导入`typography`：

```c
@import "compass/typography";
```

其实上面实际是这样的：

```c
@import "typography/links";
@import "typography/lists";
@import "typography/text";
@import "typography/vertical_rhythm";
```

当你只需要引入单独的`mixins`时，你可以`@import "compass/typography/links"`来导入。

### links

`links`主要包含了链接相关的`mixins`。

#### hover-link

实例：

```c
@import "compass/typography/links";

a {
  @include hover-link();
}
```

生成的`css`代码如下：

```c
a {
  text-decoration: none;
}

a:hover, a:focus {
  text-decoration: underline;
}
```

其源代码：

```c
@mixin hover-link {
  text-decoration: none;
  &:hover, &:focus {
    text-decoration: underline; } }
```

#### link-colors

这个`mixin`用于设置链接的颜色。

实例：

```c
@import "compass/typography/links";

a {
  @include link-colors(#ccc, #999, #666, #333, #aaa);
}
```

生成的`css`代码如下：

```c
a {
  color: #ccc;
}
a:visited {
  color: #333;
}
a:focus {
  color: #aaa;
}
a:hover {
  color: #999;
}
a:active {
  color: #666;
}
```

源代码：

```c
@mixin link-colors($normal, $hover: false, $active: false, $visited: false, $focus: false) {
  color: $normal;
  @if $visited {
    &:visited {
      color: $visited; } }
  @if $focus {
    &:focus {
      color: $focus; } }
  @if $hover {
    &:hover {
      color: $hover; } }
  @if $active {
    &:active {
      color: $active; } } }
```

#### unstyled-link

实例：

```c
@import "compass/typography/links";

a {
  @include unstyled-link();
}
```

生成的`css`：

```c
a {
  color: inherit;
  text-decoration: inherit;
  cursor: inherit;
}
a:active, a:focus {
  outline: none;
}
```

源代码：

```c
@mixin unstyled-link {
  color: inherit;
  text-decoration: inherit;
  cursor: inherit;
  &:active, &:focus {
    outline: none; } }
```

### lists

`lists`主要包含了列表相关的`mixin`。

#### pretty-bullets

这个`mixin`是用于为列表项添加图片时非常有用，它可以自动计算图片的宽度以及`background-position`以使图片居中。

实例：

```c
@import "compass/typography/lists";

ul {
  @include pretty-bullets('icons/close.png', $padding: 20px, $line-height: 20px);
}
```

生成的`css`代码：

```c
ul {
  margin-left: 0;
}
ul li {
  padding-left: 20px;
  background: url('/img/icons/close.png?1409822321') no-repeat 3px 3px;
  list-style-type: none;
}
```

源代码：

```c
@mixin pretty-bullets($bullet-icon, $width: image-width($bullet-icon), $height: image-height($bullet-icon), $line-height: 18px, $padding: 14px) {
  margin-left: 0;
  li {
    padding-left: $padding;
    background: image-url($bullet-icon) no-repeat ($padding - $width) / 2 ($line-height - $height) / 2;
    list-style-type: none;
  }
}
```

#### no-bullet

这个`mixin`去除列表项的预设标记。

实例：

```c
@import "compass/typography/lists";

li {
  @include no-bullet();
}
```

生成的`css`代码：

```c
li {
  list-style-image: none;
  list-style-type: none;
  margin-left: 0;
}
```

源代码：

```c
@mixin no-bullet {
  list-style-image : none;
  list-style-type  : none;
  margin-left      : 0;
}
```

#### horizontal-list

这个`mixin`用于生成水平的列表。

实例：

```c
@import "compass/typography/lists";

ul {
  @include horizontal-list();
}
```

生成的`css`代码：

```c
ul {
  margin: 0;
  padding: 0;
  border: 0;
  overflow: hidden;
  *zoom: 1;
}
ul li {
  list-style-image: none;
  list-style-type: none;
  margin-left: 0;
  white-space: nowrap;
  float: left;
  padding-left: 4px;
  padding-right: 4px;
}
ul li:first-child {
  padding-left: 0;
}
ul li:last-child {
  padding-right: 0;
}
ul li.last {
  padding-right: 0;
}
```

#### inline-block-list

这个`mixin`用于生成`inline-block`的列表。

实例：

```c
@import "compass/typography/lists";

ul {
  @include inline-block-list();
}
```

生成的`css`代码：

```c
ul {
  margin: 0;
  padding: 0;
  border: 0;
  overflow: hidden;
  *zoom: 1;
}
ul li {
  list-style-image: none;
  list-style-type: none;
  margin-left: 0;
  display: inline-block;
  vertical-align: middle;
  *vertical-align: auto;
  *zoom: 1;
  *display: inline;
  white-space: nowrap;
}
```

#### inline-list

这个`mixin`用于生成`inline`的列表。

实例：

```c
@import "compass/typography/lists";

ul {
  @include inline-list();
}
```

生成的`css`：

```c
ul {
  list-style-type: none;
}
ul, ul li {
  margin: 0;
  padding: 0;
  display: inline;
}
```

#### delimited-list

这个`mixin`用于生成分隔符的列表，每个列表项之间会用一个指定的分隔符（例如：`,`）

实例：

```c
@import "compass/typography/lists";

ul {
  @include delimited-list();
}
```

生成的`css`：

```c
ul {
  list-style-type: none;
}
ul, ul li {
  margin: 0;
  padding: 0;
  display: inline;
}
ul li:after {
  content: ", ";
}
ul li:last-child:after {
  content: "";
}
ul li.last:after {
  content: "";
}
```

### text

`text`主要包含了文本相关的`mixin`。

#### ellipsis

这个`mixin`主要用于文本省略时使用。

实例：

```c
@import "compass/typography/text";

p {
  @include ellipsis();
}
```

生成的`css`代码：

```c
p {
  white-space: nowrap;
  overflow: hidden;
  -ms-text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}
```

#### nowrap

这个`mixin`其实就是`white-space: nowrap`。

实例：

```c
@import "compass/typography/text";

p {
  @include nowrap();
}
```

生成的`css`代码：

```c
p {
  white-space: nowrap;
}
```

#### replace-text

`replace-text`主要是用于文本替换（图片代替文本），它接受三个参数`$img, $x, $y`，`$img`为图片地址，`$x, $y`为背景图片位置。

实例：

```c
@import "compass/typography/text";

h2 {
  @include replace-text("icons/close.png");
}
```

生成的`css`代码：

```c
h2 {
  text-indent: -119988px;
  overflow: hidden;
  text-align: left;
  text-transform: capitalize;
  background-image: url('/img/icons/close.png?1409822321');
  background-repeat: no-repeat;
  background-position: 50% 50%;
}
```

## Layout

`Layout`主要是包含了布局相关的`mixin`。

### stricky-footer

`stricky-footer`是当你需要一个黏在底部的`footer`时使用，并且支持IE6，如果不需要支持IE6其实使用`position: fixed`就行了。

这个`stricky-footer`用到了：[Make the Footer Stick to the Bottom of a Page](http://ryanfait.com/resources/footer-stick-to-bottom-of-page/)

它接受四个参数：

 - $footer-height：底部高度
 - $root-selector：根选择器
 - $root-footer-selector：根的footer选择器
 - $footer-selector：footer选择器

实例：

```c
@include sticky-footer(40px, "#content", "#footer", "#sticky-footer");
```

### stretch

实例：

```c
@import "compass/layout";

#demo {
  @include stretch(5px, 5px);
}
```

生成的`css`代码：

```c
#demo {
  position: absolute;
  top: 5px;
  bottom: 0;
  left: 0;
  right: 5px;
}
```

## CSS3

### 