CSS3 Transform
========

本文是[CSS Transforms Module Level 1](http://www.w3.org/TR/css-transforms-1/)的翻译，翻译主要还是自己去熟悉标准、学习标准，最后再分享出来。文中如有读不通的地方可以移步官方文档哟，英语渣渣呀。

## 摘要

`CSS`变换允许元素的样式在二维或三维空间变换。该规范集合了[CSS 2D 变换](http://www.w3.org/TR/css3-2d-transforms/)、[CSS 3D 变换](http://www.w3.org/TR/css3-3d-transforms/)和[SVG 变换](http://www.w3.org/TR/2009/WD-SVG-Transforms-20090320/)的规范。[CSS](http://www.w3.org/TR/CSS/)是一种用于在`screen`、`paper`等中描述结构化文档（例如：HTML和XML）的语言。

## 1 介绍

`CSS`的[视觉格式化模型](http://www.w3.org/TR/REC-CSS2/visuren.html)在每一个定位元素里描述了一个坐标系统。在该坐标空间中的位置和大小可以被看作是以像素来表达，

这个坐标空间可以通过[transform](http://www.w3.org/TR/css-transforms-1/#propdef-transform)属性来修改。使用`transform`，元素可以在二维或三维空间转化，旋转和伸缩。

一些额外到属性使得变换更加简单，且允许作者控制如何与被嵌套的三维变换进行交互。

 - [`transform-origin`](http://www.w3.org/TR/css-transforms-1/#propdef-transform-origin)属性提供了一种方便的控制被应用变换到元素变换时的原点的方法
 - [`perspective`](http://www.w3.org/TR/css-transforms-1/#propdef-perspective)
 - [`transform-style`](http://www.w3.org/TR/css-transforms-1/#propdef-transform-style)
 - [`backface-visibility`](http://www.w3.org/TR/css-transforms-1/#propdef-backface-visibility)

## 2 模块交互

该模块定义了一组CSS属性，它会影响应用了这些属性元素的视觉渲染；这些影响会在元素根据[CSS21](http://www.w3.org/TR/css-transforms-1/#css21)中[视觉格式模型](http://www.w3.org/TR/CSS2/visuren.html)确定尺寸和位置后被应用。这些属性的一些值会导致创建一个[包含块](http://www.w3.org/TR/CSS2/visuren.html#containing-block)，或[堆栈上下文](http://www.w3.org/TR/CSS21/visuren.html#x43)。

三维变换同样会影响到元素的视觉分层，并且因此会覆盖在[CSS21](http://www.w3.org/TR/css-transforms-1/#css21)中[附录 E](http://www.w3.org/TR/CSS2/zindex.html)中描述的从后到前的绘制顺序。

当元素的[background-attachment](http://dev.w3.org/csswg/css-backgrounds-4/#background-attachment)的值为`fixed`时，变换还会影响到元素背景的渲染，这个在[
CSS3BG](http://www.w3.org/TR/css-transforms-1/#css3bg)中被定义。

## 3 CSS值

此规范遵循[CSS21](http://www.w3.org/TR/css-transforms-1/#css21)中[CSS属性定义约定](http://www.w3.org/TR/CSS21/about.html#property-defs)。值的类型在此规范中没有定义，而是定义在[CSS Values and Units Module Level 3](http://www.w3.org/TR/css-transforms-1/#css3val)中定义。

除了在它们的定义中列出的属性的特定值，在这个规范中定义的所有属性也接受了[inherit](http://www.w3.org/TR/CSS21/cascade.html#value-def-inherit)关键字作为他们的属性值。因为可读性原因，并未明确重复。

## 4 术语

当在本规范中使用时，术语在本节被分配了含义。

**边界框（bounding box）**
