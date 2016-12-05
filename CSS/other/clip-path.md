CSS3 clip-path
========

`clip-path`属性是指定一个基本形状（[`<base-shape>`](http://tympanus.net/codrops/css_reference/basic-shape)）或引用一个`SVG`路径（[`<clipPath>`](http://www.w3.org/TR/2014/WD-css-masking-1-20140213/#elementdef-clippath)）作为元素的剪切路径。

## 概念和术语

### 什么是剪切

剪切是一个图形操作，它允许你完全或部分隐藏元素的部分。元素的该部分的显示和隐藏取决于剪切路径。

### 剪切路径 & 区域

一个剪切路径可以为基本形状或矢量路径。该路径定义了区域，在这个区域中的将会显示，在该区域外的将被剪切，并且不会在画布中显示。该区域称之为剪切区域。

概念上来说，元素的任何在剪切区域外的部分将不会绘制。这包括了任何内容、背景、边框、文本修饰、轮廓和元素的可见滚动机制，这些都将被应用剪切路径以及它们的子孙。

![enter image description here](http://codropspz.tympanus.netdna-cdn.com/codrops/wp-content/uploads/2014/10/clipping-path.png)

剪切路径在概念上等同于应用剪切路径元素的一个自定义视口。因此，它影响元素的渲染，但是它不影响元素的固有几何形状。一个被剪切元素的边界必须就像它没有被剪切一样。元素会影响它周围的流动就如它通常那样，页面上的任何其他元素仍将看到并且将该元素视为一个矩形，即使它被剪切为一个非矩形的形状。如果你想改变元素周围内容的流动，并且响应剪切路径定义的形状，你可以使用[shape-outside](http://tympanus.net/codrops/css_reference/shape-outside)属性。

### 剪切区域和指针事件

元素仍然会响应指针事件就像`hover`和`click`，即使是`hover`和`click`在可视区域外。

### 动画剪切路径

剪切路径可从一个形状进行动画到另一个形状，因为它是由点组成。这些点有长度或百分比值的坐标，由于长度和百分比是可动画的，形状也是可以动画的。所以，基本上，你是动画这些组成形状的点。

## 官方语法

 - 语法
```css
clip-path: <clip-source> | [ <basic-shape> || <geometry-box> ] | none

/* where */
<clip-source> = <url> /* URL references an SVG <clipPath> element  */

/* and */
<geometry-box> = <shape-box> | fill | stroke | view-box
```
 - 初始值：`none`
 - 应用于：所有元素。在`SVG`中，它应用于容器元素除了`<defs>`元素和所有的图形元素。
 - 动画：见[shape-outside](http://tympanus.net/codrops/css_reference/shape-outside)

## 取值

 - `<clip-source>`

该属性值是一个`url`，该`url`指向一个SVG的`clipPath`元素，这个`clipPath`元素被用于剪切路径。

 - `<basic-shape>`

该属性值是在`CSS Shapes module`中定义的一个基本形状函数。基本形状利用指定的参考框来决定基本形状的大小和位置。如果没有制定参考框，`border-box`将被用作参考框。

 - `<geometry-box>`

它的值可以为`<shape-box>`或`fill`、`stroke`或`view-box`。

一个`<shape-box>`是应用于`HTML`元素，可以是四种可能的框值之一：`margin-box`、`border-box`、`padding-box`和`content-box`。

如果结合`<basic-shape>`来制定，它为`<basic-shape>`提供了参考框。

如果由本身指定，使用指定框的边缘作为参考框，包括任何角落形状（例如，由`border-radius`定义），作为剪切路径。

除了`<shape-box>`值，其他三个值可被应用于`SVG`元素，它们有以下的含义：