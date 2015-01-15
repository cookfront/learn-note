CSS3 Transform
========

本文是[CSS Transforms Module Level 1](http://www.w3.org/TR/css-transforms-1/)的翻译，翻译主要还是自己去熟悉标准、学习标准，最后再分享出来。文中如有读不通的地方可以移步官方文档哟，英语渣渣呀。

## 摘要

`CSS`变换允许元素的样式在二维或三维空间变换。该规范集合了[CSS 2D 变换](http://www.w3.org/TR/css3-2d-transforms/)、[CSS 3D 变换](http://www.w3.org/TR/css3-3d-transforms/)和[SVG 变换](http://www.w3.org/TR/2009/WD-SVG-Transforms-20090320/)的规范。[CSS](http://www.w3.org/TR/CSS/)是一种用于在`screen`、`paper`等中描述结构化文档（例如：HTML和XML）的语言。

## 1 介绍

`CSS`的[视觉格式化模型](http://www.w3.org/TR/REC-CSS2/visuren.html)在每一个定位元素里描述了一个坐标系统。在该坐标空间中的位置和大小可以被看作是以像素来表达，

这个坐标空间可以通过[transform](http://www.w3.org/TR/css-transforms-1/#propdef-transform)属性来修改。使用`transform`，元素可以在二维或三维空间转化，旋转和伸缩。

一些额外到属性使得变换更加简单，且允许作者控制如何与被嵌套的三维变换进行交互。

 - [`transform-origin`](http://www.w3.org/TR/css-transforms-1/#propdef-transform-origin)属性提供了一种方便的控制被应用变换到元素变换时的原点的方法。
 - [`perspective`](http://www.w3.org/TR/css-transforms-1/#propdef-perspective)属性允许作者使子元素与三维空间变换出现，就好像它们在一个共同的三维空间中一样。[perspective-origin](http://www.w3.org/TR/css-transforms-1/#propdef-perspective-origin)属性提供了控制哪个透视被应用的原点，有效的改变了`消失点（vanishing point）`的位置。
 - [`transform-style`](http://www.w3.org/TR/css-transforms-1/#propdef-transform-style)允许3D变换的元素和它们3D变换的后代共享一个共同的三维空间，允许三维对象等级制度的构建。
 - [`backface-visibility`](http://www.w3.org/TR/css-transforms-1/#propdef-backface-visibility)属性

> 注意：然而[transform](http://www.w3.org/TR/css-transforms-1/#propdef-transform)属性的有些值允许一个元素在三维坐标系统中被变换，该元素自身却不是一个三维对象。作为替代，它们存在于一个两维平面（平坦面），并没有任何深度。

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
边界框是一个对于没有关联`CSS`布局中的所有`SVG`元素的对象边界框和所有其他元素的边框(border box)。一个`table`的边界框是[table包含框](http://www.w3.org/TR/CSS21/tables.html#model)的边框，而不是它的`table`框。

**可变换元素（transformable element）**
一个可变换元素是下面一种类型的元素：

 - 一个元素的布局由`CSS`盒模型支配，且它是一个[block-level](http://www.w3.org/TR/CSS2/visuren.html#block-level)或[原子的inline-level](http://www.w3.org/TR/CSS2/visuren.html#x13)元素，或者它的[display](http://www.w3.org/TR/CSS21/visuren.html#propdef-display)属性被计算成`table-row`、`table-row-group`、`table-header-group`、`table-footer-group`、`table-cell`或`table-caption`
 - 一个在`SVG`命名空间的元素，且它不受`CSS`盒模型支配，且它有属性[transform](http://www.w3.org/TR/css-transforms-1/#propdef-transform)、[patternTransform](http://www.w3.org/TR/2011/REC-SVG11-20110816/pservers.html#PatternElementPatternTransformAttribute)或[gradientTransform](http://www.w3.org/TR/2011/REC-SVG11-20110816/pservers.html#LinearGradientElementGradientTransformAttribute)

**用户坐标系（user coordinate system）**
**局部坐标系（local coordinate system）**
在一般情况下，一个坐标系定义了当前画布上的位置和距离。当前局部坐标系（也包含用户坐标系）为当前活动的坐标系，这是用于定义坐标和长度如何被定位和计算，它们各自在当前画布中。

**透视矩阵（perspective matrix）**
从[perspective](http://www.w3.org/TR/css-transforms-1/#propdef-perspective)和[perspective-origin](http://www.w3.org/TR/css-transforms-1/#propdef-perspective-origin)属性值中计算出来的矩阵，将在下面讲到。

**变换矩阵（transformation matrix）**
一个矩阵定义了数学上从一个坐标系映射到另一个。它是从[transform](http://www.w3.org/TR/css-transforms-1/#propdef-transform)和[transform-origin](http://www.w3.org/TR/css-transforms-1/#propdef-transform-origin)属性的值计算而来，将在下面讲到。

**当前变换矩阵（current transformation matrix）**
一个矩阵定义了从局部坐标系到视口坐标系（viewport coordinate system）的映射。

**累计3D变换矩阵（accumulated 3D transformation matrix）**
一个矩阵从元素的[3D渲染上下文](http://www.w3.org/TR/css-transforms-1/#3d-rendering-context)中计算出来，将在下面讲到。

**2D矩阵（2D matrix）**
一个6个项的3*2的变换矩阵，或者是16个项的4*4矩阵且在这些项中m31, m32, m13, m23, m43, m14, m24, m34等于0，m33, m44等于1。

**3D矩阵（3D matrix）**
一个4*4的矩阵且不履行的2D矩阵的要求。

**特性变换函数（identity transform function）**
