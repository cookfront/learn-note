CSS Media Queries Level 4
========

## 摘要

[Media Queries](http://www.w3.org/TR/mediaqueries-4/#media-query)允许作者测试和查询用户代理或显示设备的值或特性，独立于正在渲染对文档。它们被用在`CSS`的`@media`规则来有条件的将样式应用到文档，也可在各种其他上下文和语言中应用，如HTML和Javascript。

`Media Queries Level 4`描述了媒体查询、媒体类型和媒体特性的机制和语法。它扩展和取代了在`Media Queries Level 3`定义的特性。[CSS](http://www.w3.org/TR/CSS/)是一种用于描述结构化文档在`screen`、在`paper`和`speech`上渲染的一种语言。

## 1. 介绍

`HTML4`定义了一种机制来支持媒体相关的样式表，针对不同的[媒体类型](http://www.w3.org/TR/mediaqueries-4/#media-type)。例如，一个文档对于`screen`和`print`使用不同的样式表。在`HTML`中，它们可以这样写：

**实例1：**

```html
<link rel="stylesheet" type="text/css" media="screen" href="style.css">
<link rel="stylesheet" type="text/css" media="print" href="print.css">
```

`CSS`通过它的[`@media`](http://dev.w3.org/csswg/css-conditional-3/#at-ruledef-media)和[`@import`](http://www.w3.org/TR/css3-cascade/#at-ruledef-import)规则适应并且扩展了这个功能，添加了查询单个特性值的能力：

**实例2：**

在一个`CSS样式表里，我们可以声明用于特定[媒体类型](http://www.w3.org/TR/mediaqueries-4/#media-type)的块：

```css
@media screen {
  * { font-family: sans-serif }
}
```

同样的，样式表可以基于媒体查询有条件的导入：

```css
@import "print-styles.css" print;
```

[媒体查询](http://www.w3.org/TR/mediaqueries-4/#media-query)可以和`HTML`、`XHTML`、`XML`和`CSS`的`@import`和`@media`规则一起使用。

**实例3：**

这是一个用`HTML`、`XHTML`、`XML`、`@import`和`@media`写的同一个例子：

```html
<link media="screen and (color), projection and (color)"
        rel="stylesheet" href="example.css">

<link media="screen and (color), projection and (color)"
        rel="stylesheet" href="example.css" />

<?xml-stylesheet media="screen and (color), projection and (color)"
                   rel="stylesheet" href="example.css" ?>

@import url(example.css) screen and (color), projection and (color);

@media screen and (color), projection and (color) { … }
```

### 1.1 模块交互

该模块替代和扩展了定义在[CSS21](http://www.w3.org/TR/mediaqueries-4/#biblio-css21)第7章节和[[MEDIAQ]](http://www.w3.org/TR/mediaqueries-4/#biblio-mediaq)中的媒体查询、媒体类型和媒体特性。

### 1.2 取值

### 1.3 单位