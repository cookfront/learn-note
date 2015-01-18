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
一个[变换函数](http://www.w3.org/TR/css-transforms-1/#transform-functions)其实等价于一个特性4*4矩阵（看这里：[Mathematical Description of Transform Functions](http://www.w3.org/TR/css-transforms-1/#mathematical-description)）。特性变换函数的例子有`translate(0)`、`translate3d(0, 0, 0)`、`translateX(0)`、`translateY(0)`、`translateZ(0)`、`scale(1)`、`scaleX(1)`、`scaleY(1)`、`scaleZ(1)`、`rotate(0)`、`rotate3d(1, 1, 1, 0)`、`rotateX(0)`、`rotateY(0)`、`rotateZ(0)`、`skew(0, 0)`、`skewX(0)`、`skewY(0)`、`matrix(1, 0, 0, 1, 0, 0)`和`matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)`。一种特别的情况是透视（perspective）：`perspective(infinity)`。`M34`的值变得无穷小，变换函数因此假定它等于单位矩阵。

**3D渲染上下文（3D rendering context）**
一个包含块层次结构的一个或多个水平，通过元素的[transform-style](http://www.w3.org/TR/css-transforms-1/#propdef-transform-style)属性的`preserve-3d`计算值实例化，其元素有一个共同的三维坐标系。

## 5 二维子集（Two Dimensional Subset）

用户代理可能不能总是渲染出三维变换，那么它们只支持该规范的一个二维子集。在这种情况下，[三维变换](http://www.w3.org/TR/css-transforms-1/#three-d-transform-functions)和[transform-style](http://www.w3.org/TR/css-transforms-1/#propdef-transform-style)、[perspective](http://www.w3.org/TR/css-transforms-1/#propdef-perspective)、[perspective-origin](http://www.w3.org/TR/css-transforms-1/#propdef-perspective-origin)和[backface-visibility](http://www.w3.org/TR/css-transforms-1/#propdef-backface-visibility)属性将不被支持。[3D变换渲染](http://www.w3.org/TR/css-transforms-1/#3d-transform-rendering)章节也不会应用到。矩阵分解使用从“图形宝石II，由吉姆·阿尔沃编辑”中的`unmatrix`的方法所采取的技术，简化为2D的情况。[Mathematical Description of Transform Functions](http://www.w3.org/TR/css-transforms-1/#mathematical-description)章节荏苒是有效的，只是它们减少为一个3*3的变换矩阵，其中`a`等于`m11`，`b`等于`m12`，`c`等于`m21`，`d`等于`m22`，`e`等于`m41`，`f`等于`m42`。

<center>
![enter image description here](http://www.w3.org/TR/css-transforms-1/3x3matrix.png)
</center>
<center>
图片一：二维变换的3*3矩阵
</center>

**实例一：**

如果用户代理不提供三维变换支持，作者可以很容易地提供一个备用方案。下面的例子中对于[transform](http://www.w3.org/TR/css-transforms-1/#propdef-transform)属性有两条属性定义。第一个定义包含了两个二维的变换函数。第二个包含了一个二维的和一个三维的变换函数。

```css
div {
  transform: scale(2) rotate(45deg);
  transform: scale(2) rotate3d(0, 0, 1, 45deg);
}
```

有了3D的支持，第二条定义会覆盖第一条。如果没有3D的支持，第二条定义是不合法的，用户代理会退回到第一条定义。

## 6 变换渲染模型（The Transform Rendering Model）

当指定了一个除[none](http://www.w3.org/TR/css-transforms-1/#none)之外的[transform](http://www.w3.org/TR/css-transforms-1/#propdef-transform)属性值时在元素上建立了一个[局部坐标系](http://www.w3.org/TR/css-transforms-1/#local-coordinate-system)，并且它被应用。映射是从元素已经渲染到的局部坐标系中通过元素的[变换矩阵](http://www.w3.org/TR/css-transforms-1/#transformation-matrix)给定。变换是累积的。也就是说，元素在父坐标系中建立自己的局部坐标系。从用户的视角来看，一个元素有效地累积祖先的所有[变换](http://www.w3.org/TR/css-transforms-1/#propdef-transform)属性以及任何的局部变换被应用。这些变换的累积为元素定义了[当前变换矩阵（current transformation matrix）](http://www.w3.org/TR/css-transforms-1/#current-transformation-matrix-ctm)（CTM）。

坐标空间是有两个轴的一个坐标系：`X`轴是水平向右增加，`Y`轴是垂直向下增加。三维变换函数则扩展了这个坐标空间到三维，添加了垂直于屏幕平面一个`Z`轴，并且沿着观察者的方向增加。

<center>
![enter image description here](http://www.w3.org/TR/css-transforms-1/coordinates.svg)
</center>

<center>
图片2：初始坐标空间的示范
</center>

[变换矩阵](http://www.w3.org/TR/css-transforms-1/#transformation-matrix)是通过[transform](http://www.w3.org/TR/css-transforms-1/#propdef-transform)和[transform-origin](http://www.w3.org/TR/css-transforms-1/#propdef-transform-origin)通过以下步骤计算而来：

 1. 通过特性矩阵开始
 2. 通过[transform-origin](http://www.w3.org/TR/css-transforms-1/#propdef-transform-origin)的计算出的`X`，`Y`值来转换
 3. 从左到右乘以在[transform](http://www.w3.org/TR/css-transforms-1/#propdef-transform)属性中的每一个变换函数
 4. 通过[transform-origin](http://www.w3.org/TR/css-transforms-1/#propdef-transform-origin)的负计算`X`，`Y`值来转换

变换应用到[可变换元素](http://www.w3.org/TR/css-transforms-1/#transformable-element)上。

> 注意：变换会影响画布上的视觉布局（visual layout），但对CSS布局本身没有影响。这也意味着不会影响在IE浏览器下的[getClientRects()](http://www.w3.org/TR/cssom-view/#dom-element-getclientrects)和标准浏览器的[getBoundingClientRect()](http://www.w3.org/TR/cssom-view/#dom-element-getboundingclientrect)函数的值。

**实例二：**

```css
div {
  transform: translate(100px, 100px);
}
```

上面的代码会将元素在`X`和`Y`方向上移动`100px`。

<center>
![enter image description here](http://www.w3.org/TR/css-transforms-1/examples/translate1.svg)
</center>

**实例三：**

```css
div {
  height: 100px; width: 100px;
  transform-origin: 50px 50px;
  transform: rotate(45deg);
}
```

[transform-origin](http://www.w3.org/TR/css-transforms-1/#propdef-transform-origin)属性将变换的原点在`X`和`Y`方向上分别移动了`50px`。旋转变换将元素以原点顺时针方向旋转45度。在所有的变换函数被应用后，原点的转化被转化为在`X`和`Y`方向上返回`-50px`。

<center>
![enter image description here](http://www.w3.org/TR/css-transforms-1/examples/origin1.svg)
</center>

**实例四：**

```css
div {
  height: 100px; width: 100px;
  transform: translate(80px, 80px) scale(1.5, 1.5) rotate(45deg);
}
```

该变换分别将元素在`X`和`Y`方向移动`80px`，然后将元素缩放150%，然后绕`Z`轴顺时针旋转45度。可以注意到缩放和旋转是以元素的中心来操作的，由于元素具有`50％ 50％`的默认变换原点。

<center>
![enter image description here](http://www.w3.org/TR/css-transforms-1/examples/compound_transform.svg)
</center>

> 注意：一个相同的渲染可以通过用等效变换的嵌套元素来获得：

```html
<div style="transform: translate(80px, 80px)">
  <div style="transform: scale(1.5, 1.5)">
      <div style="transform: rotate(45deg)"></div>
  </div>
</div>
```

对于布局是由CSS盒模型支配的元素，`transform`属性不影响变换元素周围的内容的流动。然而，溢出区域的范围考虑到了被变换元素。它的行为类似于元素通过相对定位来偏移时的情况。因此，如果[overflow](http://www.w3.org/TR/css-overflow-3/#overflow)属性的值为`scroll`或`auto`时，根据需要为了看到内容，滚动条会出现，因为被变换到了可视区域的外面。

对于布局是由CSS盒模型支配的元素，任何非[none](http://www.w3.org/TR/css-transforms-1/#none)值的`transform`会导致创建一个堆栈上下文和包含块。这个对象作为一个包含块，为它固定定位的后代。

在根元素上的[固定背景](http://www.w3.org/TR/css3-background/#fixed0)受到任何为那个元素被指定的变换的影响。对于任何其他元素被一个变换所影响（例如，应用一个变换到它们自身或者任何它们的祖先元素），当[background-attachment](http://dev.w3.org/csswg/css-backgrounds-4/#background-attachment)属性的值为`fixed`时，它会被认为好像值是`scroll`。[background-attachment](http://dev.w3.org/csswg/css-backgrounds-4/#background-attachment)的计算值不会受到影响。

### 6.1 3D变换渲染（3D Transform Rendering）

通常情况下，元素是在平面上渲染，并且作为其包含块会被渲染到同一平面。通常，这个平面就是被页面其他部分共享的平面。二维变换函数可以改变的元素的呈现，但是元素仍然作为其包含块被渲染到同一平面。

三维变换可导致变换矩阵具有非零的`Z`分量。这会导致元素对于它的包含块渲染到不同到平面，这可能会导致影响那个元素相对于其他元素的从前到后的渲染顺序，以及会导致它与其他元素相交。这种行为取决于元素是否是[3D渲染上下文](http://www.w3.org/TR/css-transforms-1/#3d-rendering-context)中的一员，将在下面描述。

**实例五：**

这个例子展示了被应用了三维变换元素的效果。

```html
<style>
div {
  height: 150px;
  width: 150px;
}
.container {
  border: 1px solid black;
  background-color: #ccc;
}
.transformed {
  transform: rotateY(50deg);
  background-color: blue;
}
</style>

<div class="container">
  <div class="transformed"></div>
</div>
```

<center>
![enter image description here](http://www.w3.org/TR/css-transforms-1/examples/simple-3d-example.png)
</center>

该变换沿着`Y`轴旋转了50度。可以注意到这会使蓝色的盒子更窄，但不是立体的。

[perspective](http://www.w3.org/TR/css-transforms-1/#propdef-perspective)和[perspective-origin](http://www.w3.org/TR/css-transforms-1/#propdef-perspective-origin)属性可以被用于添加一种深度的感觉到场景中，它是使元素在`Z`轴更高（更接近观看者），从而会显得更大，那些远的将会显得更小。`d`缩放成比例于`d/(d − Z)`，[perspective](http://www.w3.org/TR/css-transforms-1/#propdef-perspective)的值，是从绘图平面（drawing plane）到观看者的眼睛假定位置的距离。

<center>
![enter image description here](http://www.w3.org/TR/css-transforms-1/perspective_distance.png)
</center>

<center>
图片3：示意图展示了缩放如何依赖于[perspective](http://www.w3.org/TR/css-transforms-1/#propdef-perspective)属性和`Z`的位置。在上面的示意图，`Z`是`d`的一半。为了使其显示的原始圆（实线轮廓）出现在Z（虚线圆），画布上的实体圆将扩大两倍，如浅蓝色的圆。在底部的示意图，圆按比例缩小，致使虚线圆出现在画布后面，并且z的大小是距原始位置三分之一。
</center>

通常情况下，观看者的眼睛的假定位置为图的中心。这个位置可以根据需要移动－例如，如果一个网页包含多个图形应该共享一个共同的视角，可以通过设置[perspective-origin](http://www.w3.org/TR/css-transforms-1/#propdef-perspective-origin)。

<center>
![enter image description here](http://www.w3.org/TR/css-transforms-1/perspective_origin.png)
</center>

<center>
图片4：示意图展示了将视角上移的效果。
</center>

[透视矩阵](http://www.w3.org/TR/css-transforms-1/#perspective-matrix)将按照以下来计算：

 1. 通过特性矩阵开始
 2. 通过[perspective-origin](http://www.w3.org/TR/css-transforms-1/#propdef-perspective-origin)的计算`X`，`Y`值来转换
 3. 乘以从[perspective](http://www.w3.org/TR/css-transforms-1/#propdef-perspective)变换函数获得的矩阵，其中长度是由[perspective](http://www.w3.org/TR/css-transforms-1/#propdef-perspective)属性的值提供
 4. 通过[perspective-origin](http://www.w3.org/TR/css-transforms-1/#propdef-perspective-origin)的负计算`X`，`Y`值来转换

**实例6：**

这个例子说明了`perspective`如何被用于一个三维变换，使其看起来更加真实。

```html
<style>
div {
  height: 150px;
  width: 150px;
}
.container {
  perspective: 500px;
  border: 1px solid black;
}
.transformed {
  transform: rotateY(50deg);
  background-color: blue;
}
</style>

<div class="container">
  <div class="transformed"></div>
</div>
```

<center>
![enter image description here](http://www.w3.org/TR/css-transforms-1/examples/simple-perspective-example.png)
</center>

内部的元素和前面的例子中是有着一样的变换，但它的渲染现在被它父元素的`perspective`属性影响。`perspective`导致有正的`Z`坐标（更接近观看者）的顶点在`X`和`Y`轴伸缩，使那些远离的按比例缩小，给人一种深度的感觉。

具有三维变换的元素，当它不包含在3D渲染上下文中，渲染时会有适当变换被应用，但不与任何其他元素相交。三维变换在这种情况下，可以被认为就像一个喷绘效果，就像二维变换。类似地，变换不影响绘制顺序。例如，一个正Z平移变换使元素看起来更大，但不会导致元素渲染到没有Z平移元素的前面。

具有三维变换的元素，当它包含在3D渲染上下文中，它可以明显的与在相同3D渲染上下文中的其他元素进行交互；参与到相同3D渲染上下文的元素集合可能会隐藏彼此或者相交，基于它们计算后的变换。它们被渲染就好像它们全是兄弟元素，定位在一个共同的三维坐标空间。在该三维空间中每个元素的位置由通过是对于给定元素是一个包含块的每个元素建立了3D渲染上下文的元素的变换矩阵的累积决定，将在下面描述。

**实例7：**

```html
<style>
div {
  height: 150px;
  width: 150px;
}
.container {
  perspective: 500px;
  border: 1px solid black;
}
.transformed {
  transform: rotateY(50deg);
  background-color: blue;
}
.child {
  transform-origin: top left;
  transform: rotateX(40deg);
  background-color: lime;
}
</style>

<div class="container">
  <div class="transformed">
      <div class="child"></div>
  </div>
</div>
```

这个例子展示了在[transform-style: preserve-3d](http://www.w3.org/TR/css-transforms-1/#propdef-transform-style)缺席的情况下嵌套的3D变换如何被渲染。蓝色的`div`就像前面例子中一样被变换，其渲染受到了父元素`perspective`的影响。绿黄色的元素也有一个3D变换，是一个绕`X`轴的旋转。然而，绿黄的元素被渲染到父元素到平面上，因为它不是3D渲染上下文的一个成员，父元素是扁平的。

<center>
![enter image description here](http://www.w3.org/TR/css-transforms-1/examples/3d-rendering-context-flat.png)
</center>

元素建立和参与到3D渲染上下文如下所示：

 - 一个[3D渲染上下文](http://www.w3.org/TR/css-transforms-1/#3d-rendering-context)由[transform-style](http://www.w3.org/TR/css-transforms-1/#propdef-transform-style)属性的计算值为`preserve-3d`的[可变换元素](http://www.w3.org/TR/css-transforms-1/#transformable-element)建立，且它自身不是3D渲染上下文的一部分。需要注意的是这样的元素始终是一个包含块。一个建立了3D渲染上下文的元素同样会参与到那个上下文中。（这种就是上面的.container）
 - 一个[transform-style](http://www.w3.org/TR/css-transforms-1/#propdef-transform-style)属性的计算值为`preserve-3d`的元素，且它自身也参与到了一个3D渲染上下文，它扩展那个3D渲染上下文，而不是建立一个新的。
 - 如果元素的包含块建立或扩展了3D渲染上下文，该元素则参与到了3D渲染上下文中。

变换的最终值用于元素在3D渲染上下文中的渲染，这个最终值是由[累计3D变换矩阵（accumulated 3D transformation matrix）](http://www.w3.org/TR/css-transforms-1/#accumulated-3d-transformation-matrix)累积计算而来，下面计算步骤：

 1. 通过特性矩阵开始
 2. 对于在3D渲染上下文的根和问题元素之间的任何包含块：
   3. 将被累积的矩阵（accumulated matrix）乘以元素包含块上的透视矩阵（perspective matrix）（如果有包含块的话）。包含块不是必须为一个3D渲染上下文的成员。
   4. 应用被累积矩阵的平移，等价于元素相对于它的包含块在水平和垂直方向的偏移
   5. 将被累积的矩阵乘以[变换矩阵](http://www.w3.org/TR/css-transforms-1/#transformation-matrix)

**实例8：**

```html
<style>
div {
  height: 150px;
  width: 150px;
}
.container {
  perspective: 500px;
  border: 1px solid black;
}
.transformed {
  transform-style: preserve-3d;
  transform: rotateY(50deg);
  background-color: blue;
}
.child {
  transform-origin: top left;
  transform: rotateX(40deg);
  background-color: lime;
}
</style>
```

这个例子和前面的例子是相同的，只是在蓝色元素上额外添加了[transform-style: preserve-3d](http://www.w3.org/TR/css-transforms-1/#propdef-transform-style)属性。蓝色元素现在建立了一个3D渲染上下文，其中的绿黄元素就是一个成员。现在蓝色和绿黄元素共享共同的三维空间，所以绿黄元素渲染为从其父元素倾斜，是由容器的透视所影响。

<center>
![enter image description here](http://www.w3.org/TR/css-transforms-1/examples/3d-rendering-context-3d.png)
</center>

在相同的3D渲染上下文元素可以彼此相交。用户代理必须通过细分所描述的[纽维尔算法](http://en.wikipedia.org/wiki/Newell%27s_algorithm)交叉元素的面来渲染交集。

在3D渲染上下文中没有变换的元素在`Z=0`平面渲染，但仍可能与变换元素相交。

在一个3D渲染上下文内，非相交元素的渲染顺序是基于应用的被累积矩阵在`Z`轴上的位置。

**实例9：**

```html
<style>
div {
  width: 150px;
  height: 150px;
}
.container {
  background-color: rgba(0, 0, 0, 0.3);
  transform-style: preserve-3d;
  perspective: 500px;
}
.container > div {
  position: absolute;
  left: 0;
}
.container > :first-child {
  transform: rotateY(45deg);
  background-color: orange;
  top: 10px;
  height: 135px;
}
.container > :last-child {
  transform: translateZ(40px);
  background-color: rgba(0, 0, 255, 0.75);
  top: 50px;
  height: 100px;
}
</style>

<div class="container">
  <div></div>
  <div></div>
</div>
```

该例子展示了元素在3D上下文中可以相交，容器元素为它自身和两个孩子建立了3D渲染上下文。孩子互相相交，且橘色多元素与容器相交。（目前浏览器支持还不是很好，可能看不到下面图片的效果）

<center>
![enter image description here](http://www.w3.org/TR/css-transforms-1/examples/3d-intersection.png)
</center>

使用三维变换，有可能将元素变换的反面朝向观看者。3D变换元素在两侧显示相同的内容，所以背面看起来像前面的镜像。通常情况下，元素的反面朝向观看者并保持可见。然而，[backface-visibility](http://www.w3.org/TR/css-transforms-1/#propdef-backface-visibility)属性允许作者使元素不可见，当元素的背面朝向观看者的时候。这种行为是`生动`的；如果一个[backface-visibility: hidden](http://www.w3.org/TR/css-transforms-1/#propdef-backface-visibility)的元素正在动画，使得其正面和反面分别交替地可见，此时只有当正面朝向观察者的时候才是可见的。

### 6.2 透视变换盒的处理（Processing of Perspective-Transformed Boxes）

[累计3D变换矩阵（accumulated 3D transformation matrix）](http://www.w3.org/TR/css-transforms-1/#accumulated-3d-transformation-matrix)是一个4*4的矩阵，而将被变换的对象是二维盒子。要变换盒子的每个脚（a, b）

// todo

## 7 `transform`属性

一个变换被应用到坐标系的元素是通过`transform`属性来渲染。这个属性包含了一个[变换函数](http://www.w3.org/TR/css-transforms-1/#transform-functions)列表。一个坐标系的最终变换值是将列表中的每个函数转换其相应的矩阵来取得的，就像在[变换函数的数学描述](http://www.w3.org/TR/css-transforms-1/#mathematical-description)中定义的，然后将这些矩阵相乘。

 - 名称：`transform`
 - 取值：`none | <transform-list>`
 - 初始值：`none`
 - 应用于：[可变换元素](http://www.w3.org/TR/css-transforms-1/#transformable-element)
 - 继承：无
 - 媒体：视觉
 - 计算值：指定的值，相对的值会转化成绝对值
 - 百分比：相对于[边界框](http://www.w3.org/TR/css-transforms-1/#bounding-box)的尺寸
 
对于变换的结果，任何除了[`none`](http://www.w3.org/TR/css-transforms-1/#none)的计算值会创建一个堆栈上下文和包含块。这个对象会为它固定定位的后代扮演包含块的角色。

上面取值的`<transform-list>`为：

```c
<transform-list> = <transform-function>+
```

## 8 `transform-origin`属性

 - 名称：`transform-origin`
 - 取值：` [ left | center | right | top | bottom | <percentage> | <length> ]
| 
  [ left | center | right | <percentage> | <length> ]
  [ top | center | bottom | <percentage> | <length> ] <length>?
|
  [ center | [ left | right ] ] && [ center | [ top | bottom ] ] <length>?`
  
 - 初始值：`50% 50%`
 - 应用于：[可变换元素](http://www.w3.org/TR/css-transforms-1/#transformable-element)
 - 继承：无
 - 媒体：视觉
 - 计算值：对于`<length>`的取值为绝对值，否则为百分比
 - 百分比：相对于[边界框](http://www.w3.org/TR/css-transforms-1/#bounding-box)的尺寸
 - 能否动画：一个[长度、百分比或计算值](http://dev.w3.org/csswg/css3-transitions/#animtype-lpcalc)的[简单列表](http://dev.w3.org/csswg/css3-transitions/#animtype-simple-list)

对于`SVG`元素没有关联的`CSS`布局框时该属性默认值为`0 0`。

`transform`和`transform-origin`属性的值是被用于计算[变换矩阵](http://www.w3.org/TR/css-transforms-1/#transformation-matrix)，像上面描述的一样。

如果只指定了一个值，第二个被假设为`center`。如果指定了一个或两个值，第三个值被假设为`0px`。

如果定义了两个或多个值时，或者这些值没有一个关键字时，或只使用了`center`关键字，然后第一个关键字代表水平位置，第二个关键字代表垂直位置。第三个值代表`Z`轴位置且它必须是`<length>`类型。

属性值的意义：

**`<percentage>`**
 对于水平偏移的百分比是相对于[边界框](http://www.w3.org/TR/css-transforms-1/#bounding-box)的宽度，对于垂直偏移的百分比是相对于[边界框](http://www.w3.org/TR/css-transforms-1/#bounding-box)的高度。水平和垂直的偏移值代表了从[边界框](http://www.w3.org/TR/css-transforms-1/#bounding-box)左上角的偏移。
 
 **`<length>`**
 一个`length`值给出了固定的长度作为偏移。水平和垂直的偏移值代表了从[边界框](http://www.w3.org/TR/css-transforms-1/#bounding-box)左上角的偏移。

对于`SVG`元素没有关联的`CSS`布局框时水平和垂直的偏移值代表了从元素的局部坐标空间的原点的偏移。

**top**
计算为垂直位置的`0%`

**right**
计算为水平位置的`100%`

**bottom**
计算为垂直位置的`100%`

**left**
计算为水平位置的`0%`

**center**
当水平位置没有指定时计算为水平位置的`50%`，或垂直位置的`50%`

## 9 `transform-style`属性

 - 名称：`transform-style`
 - 取值：`flat | preserve-3d`
 - 初始值：`flat`
 - 应用于：[可变换元素](http://www.w3.org/TR/css-transforms-1/#transformable-element)
 - 继承：无
 - 媒体：视觉
 - 计算值：指定的值
 - 百分比：`N/A`
 - 可动画：否

`transform-style`的`preserve-3d`值会创建一个堆栈上下文。

下面的`CSS`属性值要求用户代理在被应用之前创建后代元素的扁平表示，所以会覆盖`transform-style: preserve-3d`的行为。

 - [`overflow`](http://www.w3.org/TR/css-overflow-3/#overflow)：除了`visible`的任何值
 - [`filter`](http://www.w3.org/TR/filter-effects/#effects)：除了`none`的任何值
 - [`clip`](http://www.w3.org/TR/css-masking/#propdef-clip)：除了`auto`的任何值
 - [`clip-path`](http://www.w3.org/TR/css-masking/#propdef-clip-path)：除了`none`的任何值
 - [`isolation`](http://www.w3.org/TR/compositing-1/#propdef-isolation)：使用值`isolate`
 - [`mask-image`](http://www.w3.org/TR/css-masking/#propdef-mask-image)：除了`none`的任何值
 - [`mask-box-image-source`](http://www.w3.org/TR/css-masking/#propdef-mask-box-image-source)：除了`none`的任何值
 - [`mix-blend-mode`](http://www.w3.org/TR/compositing-1/#propdef-mix-blend-mode)：除了`normal`的任何值

`transform-style`的计算值不会被影响。

`transform`和`transform-origin`属性的值是被用于计算[变换矩阵](http://www.w3.org/TR/css-transforms-1/#transformation-matrix)，像上面描述的一样。

## 10 `perspective`属性

 - 名称：`perspective`
 - 取值：`none | <length>`
 - 初始值：`none`
 - 应用于：[可变换元素](http://www.w3.org/TR/css-transforms-1/#transformable-element)
 - 继承：无
 - 媒体：视觉
 - 计算值：绝对长度或none
 - 百分比：`N/A`
 - 可否动画：同[length](http://dev.w3.org/csswg/css3-transitions/#animtype-length)

`<length>`的值必须是正数的。

属性值的意义：

**`<length>`**
距离投影中心的距离。

**`none`**
没有透视变换被应用。它的效果类似于一个无穷大的`<length>`值。所有的对象在画布上呈平面显示。

使用这个属性的非`none`值时会建立一个堆栈上下文。它同样建立了一个包含块，就像[transform](http://www.w3.org/TR/css-transforms-1/#propdef-transform)属性一样。

[perspective](http://www.w3.org/TR/css-transforms-1/#propdef-perspective)和[perspective-origin](http://www.w3.org/TR/css-transforms-1/#propdef-perspective-origin)属性的值是用于计算[透视矩阵](http://www.w3.org/TR/css-transforms-1/#perspective-matrix)，就如上面描述的。

## 11 `perspective-origin`属性

 - 名称：`perspective-origin`
 - 取值：` [ left | center | right | top | bottom | <percentage> | <length> ]
| 
  [ left | center | right | <percentage> | <length> ]
  [ top | center | bottom | <percentage> | <length> ] <length>?
|
  [ center | [ left | right ] ] && [ center | [ top | bottom ] ] <length>?`
  
 - 初始值：`50% 50%`
 - 应用于：[可变换元素](http://www.w3.org/TR/css-transforms-1/#transformable-element)
 - 继承：无
 - 媒体：视觉
 - 计算值：对于`<length>`的取值为绝对值，否则为百分比
 - 百分比：相对于[边界框](http://www.w3.org/TR/css-transforms-1/#bounding-box)的尺寸
 - 能否动画：一个[长度、百分比或计算值](http://dev.w3.org/csswg/css3-transitions/#animtype-lpcalc)的[简单列表](http://dev.w3.org/csswg/css3-transitions/#animtype-simple-list)

[perspective](http://www.w3.org/TR/css-transforms-1/#propdef-perspective)和[perspective-origin](http://www.w3.org/TR/css-transforms-1/#propdef-perspective-origin)属性的值是用于计算[透视矩阵](http://www.w3.org/TR/css-transforms-1/#perspective-matrix)，就如上面描述的。

如果只指定了一个值，第二个被假设为`center`。

如果两个值中至少一个不是关键字，第一个关键字代表水平位置，第二个关键字代表垂直位置。

`perspective-origin`的值代表了从[边界框](http://www.w3.org/TR/css-transforms-1/#bounding-box)左上角透视原点的一个偏移。

**`<percentage>`**
 对于水平偏移的百分比是相对于[边界框](http://www.w3.org/TR/css-transforms-1/#bounding-box)的宽度，对于垂直偏移的百分比是相对于[边界框](http://www.w3.org/TR/css-transforms-1/#bounding-box)的高度。水平和垂直的偏移值代表了从[边界框](http://www.w3.org/TR/css-transforms-1/#bounding-box)左上角的偏移。
 
 **`<length>`**
 一个`length`值给出了固定的长度作为偏移。水平和垂直的偏移值代表了从[边界框](http://www.w3.org/TR/css-transforms-1/#bounding-box)左上角的偏移。

**top**
计算为垂直位置的`0%`

**right**
计算为水平位置的`100%`

**bottom**
计算为垂直位置的`100%`

**left**
计算为水平位置的`0%`

**center**
当水平位置没有指定时计算为水平位置的`50%`，或垂直位置的`50%`

## 12 `backface-visibility`属性

`backface-visibility`属性决定了当一个被变换元素的背面朝向观看者时背面是否可见。使用特性矩阵，元素的前面是朝向观看者的。当应用了一个绕`Y`轴旋转180度的变换时背面朝向了观看者。

 - 名称：`backface-visibility`
 - 取值：`visible | hidden`
 - 初始值：`visible`
 - 应用于：[可变换元素](http://www.w3.org/TR/css-transforms-1/#transformable-element)
 - 继承：无
 - 媒体：视觉
 - 计算值：指定值
 - 百分比：`N/A`
 - 可否动画：否

一个`backface-visibility: hidden`的元素的可见性由以下决定：

 1. 对于一个在[3D渲染上下文](http://www.w3.org/TR/css-transforms-1/#3d-rendering-context)的元素，计算它的累积3D变换矩阵。对于一个不在[3D渲染上下文](http://www.w3.org/TR/css-transforms-1/#3d-rendering-context)的元素，计算它的[变换矩阵](http://www.w3.org/TR/css-transforms-1/#transformation-matrix)
 2. 如果矩阵的第三行第三列是负数的，则元素应该被隐藏。否则它是可见的。

## 13 SVG的`transform`属性
## 14 SVG动画

这两个章节没有翻译，有兴趣的自行研究哟。[SVG](http://www.w3.org/TR/css-transforms-1/#svg-transform)

## 15 变换函数

`transform`属性的值一个`<transform-function>`的列表。允许的变换函数集合在下面给出了。当在该规范中[`<angle>`](http://www.w3.org/TR/css3-values/#angle-value)被使用时，一个等价于0的[`<number>`](http://www.w3.org/TR/css3-values/#number-value)是同样被允许的，它被认为是角度0一样。

### 15.1 2D变换函数

[2D Transform Functions](http://www.w3.org/TR/css-transforms-1/#two-d-transform-functions)

### 15.2 3D变换函数

[3D Transform Functions](http://www.w3.org/TR/css-transforms-1/#three-d-transform-functions)