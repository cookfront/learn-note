CSS Flexbox
========

这篇文章主要是`W3C`官方[CSS Flexible Box Layout Module Level 1](http://www.w3.org/TR/css-flexbox-1/)的学习，内容可能有删减。`Flex`绝对是`CSS`未来布局的趋势，有了`Flex`什么垂直居中、水平居中、响应式等都是小菜一碟了。所以把它彻底搞懂还是很有必要的，文章比较长，不过如果能耐心的读完，对`Flex`肯定会有一个透彻的了解。

## 摘要

这份规范描述了为用户界面设计而优化的框模型（`box model`）。在`Flex`布局模型中，`flex`容器的孩子可以布置在任何方向，并且能`伸缩`它们的尺寸，它们可以伸展它们的尺寸以此填充未使用的空间，或者收缩它们的尺寸以避免溢出父元素。对于子元素的水平和垂直对齐将变得非常容易操作。这些框嵌套（水平内垂直或垂直内水平）可用于在两个维度来构建布局。

## 1 介绍

`CSS 2.1`定义了四种布局模式－确定它们尺寸以及位置的算法是基于它们与兄弟和祖先盒子的关系：

 - `block`布局：为文档（document）布局而设计
 - `inline`布局：为文本布局而设计
 - `table`布局：为以表格形式的二维数据的布局而设计
 - `position`布局：为非常明确的定位，且不考虑文档中的其他元素的布局而设计

该模块引入了一个新的布局模式，**`flex`布局**，它是为更加复杂的应用和网页而设计的。

### 1.1 概述

`flex`布局表面上类似于`block`布局。它缺少许多在`block`布局中使用的更复杂的以文本(`text-`)和文档(`document-`)为中心的属性，例如[floats](http://www.w3.org/TR/CSS21/visuren.html#floats)和[columns](http://www.w3.org/TR/css3-multicol/)。作为回报，它获得了简单和更加强大的工具，使它能以多种方式来分配空间和对齐内容，而这些就是web应用和网页所需要的。以下是`flex`容器的内容：

 - 它可以在任何方向上布局（向左，向右，向下，甚至向上！）
 - 可以将显示的内容顺序[颠倒](http://www.w3.org/TR/css-flexbox-1/#valdef-flex-direction-row-reverse)（`flex-direction: row-reverse`）或者[重新安排](http://www.w3.org/TR/css-flexbox-1/#order-property)它们的顺序（`order`）
 - 可以线性布局在单个（[主](http://www.w3.org/TR/css-flexbox-1/#main-axis)）轴，也可以沿（[侧](http://www.w3.org/TR/css-flexbox-1/#cross-axis)）轴[包裹](http://www.w3.org/TR/css-flexbox-1/#flex-wrap-property)在多行中
 - 可以`伸缩`它们的尺寸以响应可用的空间
 - 能够相对于它们的容器[对齐](http://www.w3.org/TR/css-flexbox-1/#alignment)，或者彼此对齐
 - 可以动态的沿着主轴折叠或不折叠，同时保持容器的侧轴尺寸

### 1.2 模块交互

该模块扩展了`[CSS21]`中`display`属性的定义，添加了新的`block-level`和`inline-level`的`display`类型，并且定义一个新的类型的格式化上下文连同属性来控制其布局。该模块中定义的属性都不能应用在`::first-line`和`::first-letter`伪元素中。

## 2 `Flex`布局盒模型以及术语

一个`flex`容器是一个元素[`display`](http://www.w3.org/TR/CSS21/visuren.html#propdef-display)属性的计算值为[`flex`](http://www.w3.org/TR/css-flexbox-1/#valdef-display-flex)或[`inline-flex`](http://www.w3.org/TR/css-flexbox-1/#valdef-display-inline-flex)时，生成的盒子。在`flex`容器内的常规流子元素，称之为`flex items`，并且使用`flex`布局模型来布局。

不同于`block`和`inline`布局，它们的布局是基于`block`和`inline`流的方向来计算的，而对于`flex`布局，是基于`flex directions`（flex方向？）的。为了更容易简单的说明`flex`布局，本节中定义了一组`flex`相关的`flow-relative`术语。[`flex-flow`](http://www.w3.org/TR/css-flexbox-1/#propdef-flex-flow)的值决定了这些术语如何映射到物理方向（上/右/下/左），轴（垂直/水平），以及尺寸（宽/高）。

![enter image description here](http://www.w3.org/TR/css-flexbox-1/images/flex-direction-terms.svg)

**主轴（main axis）**
**主轴维度（main dimension）**
`flex`容器的主轴，伸缩项目（flex items）主要沿着这条轴进行排列布局

**主轴起点（main-start）**
**主轴终点(main-end)**
伸缩项目放置在`flex`容器内从主轴起点（main-start）向主轴终点（main-start）方向

**主轴尺寸（main size）**
**主轴尺寸属性（main size property）**
一个伸缩项目的宽度或高度，它是在`主轴维度（main dimension）`里面的，且是项目的`主尺寸`。伸缩项目的`主尺寸属性`是`宽度`或`高度`属性，它是在`主轴维度（main dimension）`里面的。

**侧轴（cross axis）**
**侧轴维度（cross dimension）**
垂直于主轴称为侧轴。它的方向主要取决于主轴方向

**侧轴起点（cross-start）**
**侧轴终点(cross-end)**
伸缩行的配置从容器的侧轴起点边开始，往侧轴终点边结束

**侧轴尺寸（cross size）**
**侧轴尺寸属性（cross size property）**
一个伸缩项目的宽度或高度，它是在`侧轴维度（main dimension）`里面的，且是项目的`主尺寸`。伸缩项目的`侧轴尺寸属性`是`宽度`或`高度`属性，它是在`侧轴维度（main dimension）`里面的。


## 3 Flex容器：`display`属性为`flex`或`inline-flex`

 - 名称：`display`
 - 取值：`flex ｜ inline-flex`

属性取值的意义：

 - flex：该值使元素生成一个`block-level`的`flex`容器盒子
 - inline-flex：该值使元素生成一个`inline-level`的`flex`容器盒子

一个`flex`容器为它的内容建立了一个新的`flex`格式上下文。这和建立块级上下文是相同的，不同之处在于`flex`布局是用于代替`block`布局的：浮动不会闯入到`flex`容器中，并且**`flex`容器到外边距也不会与其内容的外边距折叠**。`Flex`容器为它的内容形成一个包含块，就像块容器一样。[overflow](http://www.w3.org/TR/css-overflow-3/#overflow)属性是可以应用于`flex`容器的。

`Flex`容器不是块容器（block containers），所以一些假定为`block`布局而设计的属性是不能应用于`flex`布局的。特别是：

 - 所有的在多列模块中的`column-*`属性对`flex`容器是不起作用的
 - [`float`](http://www.w3.org/TR/CSS21/visuren.html#propdef-float)和[`clear`](http://www.w3.org/TR/CSS21/visuren.html#propdef-clear)属性对[伸缩项目](http://www.w3.org/TR/css-flexbox-1/#flex-item)是不起作用的，也不会使它脱离常规流。然而`float`属性仍然会影响盒子的`display`属性的计算值。具体怎么影响[Relationships between 'display', 'position', and 'float'](http://www.w3.org/TR/CSS21/visuren.html#dis-pos-flo)
 - [`vertical-align`](http://www.w3.org/TR/CSS21/visudet.html#propdef-vertical-align)对伸缩项目是不起作用的
 - `::first-line`和`::first-letter`伪元素是不可以应用于`flex`容器的，并且`flex`容器也不会为它的祖先贡献第一格式化行或首字母

如果一个元素的`display`属性指定为`inline-flex`时，在某些情况下，它的`display`属性会被计算为`flex`：[CSS 2.1 章节9.7](http://www.w3.org/TR/CSS2/visuren.html#dis-pos-flo)中的`Table`会被修改为包含一个附加行，当它指定值为`inline-flex`时，会被计算为`flex`。

## 4 伸缩项目(flex items)

不严格地说，伸缩容器（flex containers）的伸缩项目是从元素内容生成的常规流盒子，从而进一步生成了伸缩容器。

每一个伸缩容器的常规流子元素会变成一个伸缩项目，并且包含在伸缩容器中的每个连续运行的文本会被包裹在一个匿名的伸缩项目中。然而，一个匿名的伸缩项目仅仅只包含空白时，它并不会被渲染出来，就好像它被设置了`display: none`一样。

一个伸缩项目为它的内容建立了一个新的格式上下文，像通常一样，它的格式上下文的类型是由它的`display`属性决定的。然而，伸缩项目是`flex-level`盒子，而不是`block-level`盒子：它们参与到了它们容器到`flex`格式上下文中，而不是块级格式上下文。

**实例：**

```html
<div style="display:flex">

    <!-- flex item: block child -->
    <div id="item1">block</div>

    <!-- flex item: floated element; floating is ignored -->
    <div id="item2" style="float: left;">float</div>

    <!-- flex item: anonymous block box around inline content -->
    anonymous item 3

    <!-- flex item: inline child -->
    <span>
        item 4
        <!-- flex items do not split around blocks -->
        <div id=not-an-item>item 4</div>
        item 4
    </span>
</div>
```

如果一个元素的常规流子元素指定的[display-outside](http://www.w3.org/TR/2014/WD-css-display-3-20140911/#propdef-display-outside)生成的伸缩容器是`inline-level`，它将会计算成`block-level`。

在一个设置了`display: table`的伸缩项目上，该`table`的包装盒子会变成一个伸缩项目，并且[`order`](http://www.w3.org/TR/css-flexbox-1/#propdef-order)和[`align-self`](http://www.w3.org/TR/css-flexbox-1/#propdef-align-self)属性可以应用到它。任何标题框的内容会贡献到`table`包装盒的最小含量和最大内容尺寸的计算。然而，像[`width`](http://www.w3.org/TR/CSS21/visudet.html#propdef-width)和[`height`](http://www.w3.org/TR/CSS21/visudet.html#propdef-height)属性，`flex`的普通写法可以应用于`table`，如下所示：伸缩项目的最终尺寸是通过执行布局来计算的，就好像计算`table`包装盒边缘之间的距离。`table`盒子的内容边缘是`table`盒子的`padding + border`区域，并且`table`盒子是伸缩项目。

### 4.1 绝对定位的`Flex`儿子

一个伸缩容器的绝对定位的子元素不参与到`flex`布局中。然而，它会参与到[重新排序](http://www.w3.org/TR/css-flexbox-1/#algo-flex-order)中（详细见：[order](http://www.w3.org/TR/css-flexbox-1/#propdef-order)），会对他们的绘制顺序有一个影响。

一个伸缩容器的绝对定位的子元素的[静态位置](http://www.w3.org/TR/CSS21/visudet.html#abs-non-replaced-width)被确定为使得子元素就好像是 伸缩容器的唯一伸缩项目那样去定位，这会假设子元素和伸缩容器的使用尺寸(used size)为固定大小的盒子。

换句话说，一个伸缩容器的绝对定位的子元素的[静态位置](http://www.w3.org/TR/CSS21/visudet.html#abs-non-replaced-width)被确定为：当将子元素的[静态位置矩形](http://www.w3.org/TR/css-flexbox-1/#static-position-rectangle)设置到伸缩容器的内容盒子后，然后再将绝对定位的儿子在这个矩形中通过在伸缩容器上设置的[`justify-content`](http://www.w3.org/TR/css-flexbox-1/#propdef-justify-content)值和设置在伸缩项目上的[align-self](http://www.w3.org/TR/css-flexbox-1/#propdef-align-self)值来进行对齐。

> **静态位置矩形：**
> 静态位置矩形是[对齐容器](http://www.w3.org/TR/css3-align/#alignment-container)用于决定绝对定位元素的静态位置偏移。在`block`布局中它对应了[ CSS2.1§10.3.7](http://www.w3.org/TR/CSS21/visudet.html#abs-non-replaced-width)中描述的`假想盒子`的位置。

### 4.2 伸缩容器的外边距和内边距

毗邻的伸缩项目的`margin`是不会折叠的。自动外边距则在相应的维度吸收额外的空间，并且可以用于对齐和相邻伸缩项目之间的距离。[可以看`auto`外边距的对齐](http://www.w3.org/TR/css-flexbox-1/#auto-margins)。

在伸缩项目上设置的百分比的外边距和内边距总是相对于它们自身的尺寸来解析，而不像`blocks`，它们并不总是相对于他们的包含块的行内尺寸来解析。

### 4.3 伸缩项目的Z轴顺序

伸缩项目的绘制和行内块是相同的，只是[`order`](http://www.w3.org/TR/css-flexbox-1/#propdef-order)会修改文档的顺序，从而代替原始文档的顺序，并且[z-index](http://www.w3.org/TR/css3-positioning/#z-index)设置了除`auto`值之外的其他值是会创建一个层叠上下文，即使`position`被设置为`static`。

### 4.4 被折叠的项目（Collapsed Items）

当在一个伸缩容器上指定了`visibility:collapse`，此时伸缩项目成为了一个被折叠的项目，产生了一种类似于在`table-row`和`table-column`元素上设置`visibility:collapse`的效果：被折叠的伸缩项目完全从渲染中移除，但是它留下了一个`支柱`，以此保持伸缩线侧轴尺寸的稳定。因此，如果一个伸缩容器只有一个伸缩行（flex line），动态折叠和未折叠的项目会保证对伸缩容器的侧轴没有影响，并且不会造成页面布局的其余部分`摆动`。伸缩行换行会在折叠后重新做，然而，一个有着多行的伸缩容器的侧轴尺寸可能改变，也可能不改变。

尽管被折叠的项目不会重新渲染，但是它们出现在格式化结构中。所以，它不像`display: none`项目，影响是依赖的盒子出现在格式化结构中，并且仍然作用在折叠的元素上。

**实例：**

在下面的例子中，一个侧栏被设置以适应其内容的尺寸。[`visibility: collapse`](http://www.w3.org/TR/CSS21/visufx.html#propdef-visibility)被用于动态对隐藏导航栏部分，且不影响他们的宽度，即使最宽的部分是一个折叠部分。

```html
<style>
  @media (min-width: 60em) {
    /* two column layout only when enough room (relative to default text size) */
    header + div { display: flex; }
    #main {
      flex: 1;         /* Main takes up all remaining space */
      order: 1;        /* Place it after (to the right of) the navigation */
      min-width: 12em; /* Optimize main content area sizing */
    }
  }
  /* menu items use flex layout so that visibility:collapse will work */
  nav > ul > li {
    display: flex;
    flex-flow: column;
  }
  /* dynamically collapse submenus when not targetted */
  nav > ul > li:not(:target):not(:hover) > ul {
    visibility: collapse;
  }
</style>
…
</header>
<div>
  <article id="main">
    Interesting Stuff to Read
  </article>
  <nav>
    <ul>
      <li id="nav-about"><a href="#nav-about">About</a>
        …
      <li id="nav-projects"><a href="#nav-projects">Projects</a>
        <ul>
          <li><a href="…">Art</a>
          <li><a href="…">Architecture</a>
          <li><a href="…">Music</a>
        </ul>
      <li id="nav-interact"><a href="#nav-interact">Interact</a>
        …
    </ul>
  </nav>
</div>
```

为了计算`支柱`的尺寸，`flex`布局首先以所有项目未折叠来处理，然后重新运行使所有的折叠项目用`支柱`来替换，且维持该项目原始行的原始侧轴。可以看[Flex布局算法](http://www.w3.org/TR/css-flexbox-1/#layout-algorithm)与`visibility: collapse`的相互作用。

> 在任何伸缩项目上使用`visibility: collapse`会导致`flex`布局算法会重复中途部分，并且运行最昂贵的步骤。所以建议作者继续使用`display: none`，如果不需要动态的折叠或不折叠项目时，因为它对于布局引擎更加高效。

### 4.5 伸缩项目隐含的最小尺寸

为了给伸缩项目提供更合理的默认最小尺寸，规范中引入了一个新的值`auto`作为[`min-width`](http://www.w3.org/TR/CSS21/visudet.html#propdef-min-width)和[`min-height`](http://www.w3.org/TR/CSS21/visudet.html#propdef-min-height)属性的初始值（在[CSS2.1](http://www.w3.org/TR/css-flexbox-1/#biblio-css21)中定义）。

 - 名称：`min-width`，`min-height`
 - 取值：`auto`
 - 新的计算值：指定的百分比或绝对长度或关键字
 - 新的初始值：`auto`

**auto**
在[主轴](http://www.w3.org/TR/css-flexbox-1/#main-axis)上，在一个`overflow`为`visible`的伸缩项目上，当在伸缩项目当主轴上指定了最小尺寸属性，下面的表格给出了最小尺寸：



## 5 排序和方向（Ordering and Orientation）

一个伸缩容器的内容可以布置在任何方向或者任何排序。这使得作者很容易达到的效果，而在之前这些需要复杂或者易碎的方法才能达到，例如使用[`float`](http://www.w3.org/TR/CSS21/visuren.html#propdef-float)和[`clear`](http://www.w3.org/TR/CSS21/visuren.html#propdef-clear)属性的`hacks`。这些功能是通过[`flex-direction`](http://www.w3.org/TR/css-flexbox-1/#propdef-flex-direction)、[`flex-wrap`](http://www.w3.org/TR/css-flexbox-1/#propdef-flex-wrap)和[`order`](http://www.w3.org/TR/css-flexbox-1/#propdef-order)属性来暴露。

> `flex`布局的重排序功能只会影响视觉到渲染。

作者不可以使用`order`或`flex-flow`和`flex-direction`的`*-reverse`值来替代正确源排序，因为这会破坏文档的可访问性。

### 5.1 伸缩流方向：`flex-direction`属性

 - 名称：`flex-direction`
 - 取值：`row | row-reverse | column | column-reverse`
 - 初始值：`row`
 - 应用于：伸缩容器
 - 媒体：视觉
 - 计算值：指定的值

`flex-direction`属性指定了伸缩项目如何在伸缩容器中放置，是通过设置伸缩容器的主轴的方向。这决定了伸缩项目在布局中的方向。

属性值的意义：

 - row：伸缩容器的主轴和当前的[书写模式](http://www.w3.org/TR/css-writing-modes-3/#writing-mode0)的[行内轴](http://www.w3.org/TR/css-writing-modes-3/#inline-axis-)方向是一致的。[`main-start`](http://www.w3.org/TR/css-flexbox-1/#main-start)和[`main-end`](http://www.w3.org/TR/css-flexbox-1/#main-end)的方向等价于[`inline-start`](http://www.w3.org/TR/css-writing-modes-3/#inline-start)和[`inline-end`](http://www.w3.org/TR/css-writing-modes-3/#inline-end)的方向，各自的在当前书写模式
 - row-reverse：和`row`比较相同，只是[`main-start`](http://www.w3.org/TR/css-flexbox-1/#main-start)和[`main-end`](http://www.w3.org/TR/css-flexbox-1/#main-end)它们的方向交换了
 - column：伸缩容器的主轴和当前的[书写模式](http://www.w3.org/TR/css-writing-modes-3/#writing-mode0)的[块轴](http://www.w3.org/TR/css-writing-modes-3/#block-axis-)方向是一致的。[`main-start`](http://www.w3.org/TR/css-flexbox-1/#main-start)和[`main-end`](http://www.w3.org/TR/css-flexbox-1/#main-end)的方向等价于[`block-start`](http://www.w3.org/TR/css-writing-modes-3/#block-start)和[`black-end`](http://www.w3.org/TR/css-writing-modes-3/#block-end)的方向，各自的在当前书写模式
 - column-reverse：和`column`比较相同，只是[`main-start`](http://www.w3.org/TR/css-flexbox-1/#main-start)和[`main-end`](http://www.w3.org/TR/css-flexbox-1/#main-end)它们的方向交换了

> `reverse`的取值不是反转了盒子的排序：就像[书写模式](http://www.w3.org/TR/css-writing-modes-3/#writing-mode0)和[direction](http://www.w3.org/TR/css-writing-modes-3/#propdef-direction)，它只是改变了流的方向。

### 5.2 伸缩行换行：`flex-wrap`属性

 - 名称：`flex-wrap`
 - 取值：`nowrap | wrap | wrap-reverse`
 - 初始值：`nowrap`
 - 应用于：伸缩容器
 - 继承：无
 - 媒体：视觉
 - 计算值：指定的值

`flex-wrap`属性控制了伸缩容器是否在[单行](http://www.w3.org/TR/css-flexbox-1/#single-line)显示还是在[多行](http://www.w3.org/TR/css-flexbox-1/#multi-line)显示，并且侧轴的方向，决定了新的行层叠的方向。

属性值的意义：

 - nowrap：伸缩容器在单行显示。[`cross-start`](http://www.w3.org/TR/css-flexbox-1/#cross-start)的方向等价于当前[书写模式](http://www.w3.org/TR/css-writing-modes-3/#writing-mode0)中[`inline-start`](http://www.w3.org/TR/css-writing-modes-3/#inline-start)或[`block-start`](http://www.w3.org/TR/css-writing-modes-3/#block-start)中一个的方向。无论哪个是[`cross-start`](http://www.w3.org/TR/css-flexbox-1/#cross-start)，[`cross-end`](http://www.w3.org/TR/css-flexbox-1/#cross-end)是和[`cross-start`](http://www.w3.org/TR/css-flexbox-1/#cross-start)的方向正好相反
 - wrap：伸缩容器在多行显示。[`cross-start`](http://www.w3.org/TR/css-flexbox-1/#cross-start)的方向等价于当前[书写模式](http://www.w3.org/TR/css-writing-modes-3/#writing-mode0)中[`inline-start`](http://www.w3.org/TR/css-writing-modes-3/#inline-start)或[`block-start`](http://www.w3.org/TR/css-writing-modes-3/#block-start)中一个的方向。无论哪个是[`cross-start`](http://www.w3.org/TR/css-flexbox-1/#cross-start)，[`cross-end`](http://www.w3.org/TR/css-flexbox-1/#cross-end)是和[`cross-start`](http://www.w3.org/TR/css-flexbox-1/#cross-start)的方向正好相反
 - wrap-reverse：和`wrap`相同，只是`cross-start`和`cross-end`交换了

### 5.3 伸缩方向和换行：`flex-flow`属性

 - 名称：`flex-flow`
 - 取值：`<flex-direction> || <flex-wrap>`
 - 初始值：取决于`flex-direction`和`flex-wrap`的初始值
 - 应用于：伸缩容器
 - 继承：取决于`flex-direction`和`flex-wrap`的初始值
 - 媒体：视觉
 - 计算值：取决于`flex-direction`和`flex-wrap`的初始值

`flex-flow`属性是`flex-direction`和`flex-wrap`的简写。它一起定义了伸缩容器的主轴和侧轴。

**实例：**

```css
div { flex-flow: row; }
/* Initial value. Main-axis is
   inline, no wrap. */
```

![enter image description here](http://www.w3.org/TR/css-flexbox-1/images/flex-flow1.svg)

```css
div { flex-flow: column wrap; }
/* Main-axis is block-direction (top to bottom)
   and lines wrap in the inline direction (rightwards). */
```

![enter image description here](http://www.w3.org/TR/css-flexbox-1/images/flex-flow2.svg)

```css
div { flex-flow: row-reverse wrap-reverse; }
/* Main-axis is the opposite of inline direction
   (right to left). New lines wrap upwards. */
```

![enter image description here](http://www.w3.org/TR/css-flexbox-1/images/flex-flow3.svg)

### 5.4 显示顺序：`order`属性

伸缩项目在默认情况下是按着它们源文档中出现的顺序来布局的。`order`属性可以被用于改变这些顺序。

 - 名称：`order`
 - 取值：[`<integer>`](http://www.w3.org/TR/css-syntax-3/#typedef-integer)
 - 初始值：0
 - 应用于：伸缩项目和伸缩容器的绝对定位儿子
 - 继承：无
 - 媒体：视觉
 - 计算值：指定的值
 - 是否可以动画：是

`order`属性控制在伸缩容器内子元素在伸缩容器中的顺序，通过将它们分配到有序组。它只接受单一的[`<integer>`](http://www.w3.org/TR/css-syntax-3/#typedef-integer)作为属性值，并且指定的就是伸缩项目属于的有序组。

一个伸缩容器把它的内容布局在`被修改的文档顺序`，从最小数字的有序组开始，并以此类推。当项目具有相同的值时，它们就按照他们在源文档中的顺序来布局。这个会影响[绘制顺序](http://www.w3.org/TR/CSS2/zindex.html)，就好像伸缩项目在源文档中被重排序。

实例：

下图显示了一个简单的标签式界面，标签中的活动窗格永远是第一个：

![enter image description here](http://www.w3.org/TR/css-flexbox-1/images/flex-order-example.png)

这可以通过以下`CSS`代码来实现：

```css
.tabs {
  display: flex;
}
.tabs > * {
  min-width: min-content;
  /* Prevent tabs from getting too small for their content. */
}
.tabs > .current {
  order: -1; /* Lower than the default of 0 */
}
```

#### 5.4.1 重排序和可访问性

`order`属性不会影响非视觉媒体的排序。同样的，`order`不影响连续导航模式的默认遍历顺序。作者只能在视觉媒体中使用`order`属性。

**实例：**

许多网页在标记上具有类似的形状，在顶部的头部，在底部的页脚，然后一个内容区域和一个或在中间的两个附加列。一般情况下，内容最好首先出现在页面的源代码中，在其他列之前。然而，这是非常常见的设计，例如简单的将附加列放在左边而内容区域放在右边，这是难以实现的。这在许多方面已经得到解决，这经常被命名为“圣杯布局”，它有两个附加列。例如，利用网页代码和以下草图实现所需的布局：

```html
<!DOCTYPE html>
<header>...</header>
<div id='main'>
   <article>...</article>
   <nav>...</nav>
   <aside>...</aside>
</div>
<footer>...</footer>
```

![enter image description here](http://www.w3.org/TR/css-flexbox-1/images/flex-order-page.svg)

这种布局可以轻松的通过`Flex`布局来实现：

```css
#main { display: flex; }
#main > article { order: 2; min-width: 12em; flex:1; }
#main > nav     { order: 1; width: 200px; }
#main > aside   { order: 3; width: 200px; }
```

作为一个额外的奖励，我们是所有的列默认情况下等高的，主内容则尽可能宽的填充屏幕。此外，这可以结合`media queries`来实现在窄屏幕下将所有的列垂直布局。

```css
@media all and (max-width: 600px) {
  /* Too narrow to support three columns */
  #main { flex-flow: column; }
  #main > article, #main > nav, #main > aside {
    /* Return them to document order */
    order: 0; width: auto;
  }
}
```

## 6 伸缩行（Flex Lines）

伸缩项目在伸缩容器内被布局，并通过伸缩行来对齐。假设容器（hypothetical containers）则被布局算法用于分组和对齐。一个伸缩容器可以是[单行](http://www.w3.org/TR/css-flexbox-1/#single-line)，也可以是[多行](http://www.w3.org/TR/css-flexbox-1/#multi-line)的，这取决于`flex-wrap`属性：

 - 一个`单行`的伸缩容器将它的所有儿子布局在单行，即使这会导致它的内容溢出。
 - 一个`多行`的伸缩容器将伸缩项目跨越多行，这类似于当文本太宽时折行出新行以适应现有行。当附加的行被创建时，它们通过`flex-wrap`属性并沿着侧轴堆栈在伸缩容器内。每一行至少包含一个`伸缩项目`，除非伸缩容器本身是空的。

**实例：**

这个例子显示了四个按钮，并且在水平方向不能完全适应（容不下四个）：

```html
<style>
#flex {
  display: flex;
  flex-flow: row wrap;
  width: 300px;
}
.item {
  width: 80px;
}
</style>

<div id="flex">
  <div class='item'>1</div>
  <div class='item'>2</div>
  <div class='item'>3</div>
  <div class='item'>4</div>
</div>
```

因为容器只有`300px`，只有三个的项目适应到单行。它们占了`240px`，并且剩下了`60px`的剩余空间。因为伸缩容器的`flex-flow`属性指定了这是一个多行的，所以伸缩容器会创建一个附加的行来包含最后一个项目。

![enter image description here](http://www.w3.org/TR/css-flexbox-1/images/multiline-no-flex.svg)

一旦内容被分成多行，每行都是独立布局的；伸缩尺寸和`justify-content`和`align-self`属性仅仅将项目认为是单行的。

当一个伸缩容器有多行时，[侧轴尺寸](http://www.w3.org/TR/css-flexbox-1/#cross-size)的每一行是该行包含的伸缩项目的最小必须尺寸，并且所有的行在伸缩容器内的对齐是通过[align-content](http://www.w3.org/TR/css-flexbox-1/#propdef-align-content)属性来对齐的。当一个伸缩容器（即使是一个多行的伸缩容器，flex-wrap: wrap）只有一行时，该行 的侧轴尺寸是伸缩容器侧轴的尺寸，此时应用[align-content](http://www.w3.org/TR/css-flexbox-1/#propdef-align-content)没有效果。一行的[主轴尺寸](http://www.w3.org/TR/css-flexbox-1/#main-size)总是和伸缩容器的内容盒子的主轴尺寸的大小一样。

**实例：**

这里是一个和前面相同的例子，只是我们在伸缩项目上设置了`flex: auto`。第一行有剩余的`60px`，所有的项目具有相同的伸缩性，所以三个项目中的每一个都会得到额外的`20px`。最后一个项目则会伸缩到整行。

![enter image description here](http://www.w3.org/TR/css-flexbox-1/images/multiline-flex.svg)

## 7 伸缩性

`flex`布局的定义方面是使伸缩项目可伸缩的能力，改变它们的宽度/高度，以填补在[主轴维度](http://www.w3.org/TR/css-flexbox-1/#main-dimension)中的可用空间。这是通过[flex](http://www.w3.org/TR/css-flexbox-1/#propdef-flex)属性来完成的。伸缩容器将它的可用空间成比例的分配到它的伸缩项目中，这个比例通过伸缩项目的[伸缩增长因素](http://www.w3.org/TR/css-flexbox-1/#flex-grow-factor)决定，或者成比例缩小它们以防止溢出，这个比例是通过伸缩项目的[伸缩缩小因素](http://www.w3.org/TR/css-flexbox-1/#flex-shrink-factor)决定。

### 7.1 `flex`简写

 - 名称：`flex`
 - 取值：`none | auto | [ <‘flex-grow’> <‘flex-shrink’>? || <‘flex-basis’> ]`
 - 应用于：伸缩项目
 - 初始值：单个属性决定
 - 媒体：视觉
 - 计算值：单个属性决定

`flex`属性指定了组件的伸缩长度：[伸缩增长因素](http://www.w3.org/TR/css-flexbox-1/#flex-grow-factor)、[伸缩缩小因素](http://www.w3.org/TR/css-flexbox-1/#flex-shrink-factor)和[伸缩基础](http://www.w3.org/TR/css-flexbox-1/#flex-basis)。当一个盒子是伸缩项目时，`flex`属性被咨询并代替[主轴尺寸属性](http://www.w3.org/TR/css-flexbox-1/#main-size-property)去决定盒子的[主轴尺寸](http://www.w3.org/TR/css-flexbox-1/#main-size)。如果一个盒子不是伸缩项目，`flex`属性对其没有效果。

下面是各取值组件的意义：

 - [flex-grow](http://www.w3.org/TR/css-flexbox-1/#propdef-flex-grow)：这个`<number>`组件是[flex-grow](http://www.w3.org/TR/css-flexbox-1/#propdef-flex-grow)的普通写法，它指定了`伸缩增长因素`，它决定了该伸缩项目相对于有正的可用空间的伸缩容器中其他伸缩项目的增长比例。当省略时，它被设置为`1`。
 - [flex-shrink](http://www.w3.org/TR/css-flexbox-1/#propdef-flex-shrink)：这个`<number>`组件是[flex-shrink](http://www.w3.org/TR/css-flexbox-1/#propdef-flex-shrink)的普通写法，它指定了`伸缩缩小因素`，它决定了该伸缩项目相对于有负的可用空间的伸缩容器中其他伸缩项目的缩小比例。当省略时，它被设置为`1`。当分发负的空间时，[伸缩缩小因素](http://www.w3.org/TR/css-flexbox-1/#flex-shrink-factor)是乘以[伸缩基础](http://www.w3.org/TR/css-flexbox-1/#flex-basis)的。
 - [flex-basis](http://www.w3.org/TR/css-flexbox-1/#propdef-flex-basis)：该组件，具有和`width`属性相同的属性值，是设置[flex-basis](http://www.w3.org/TR/css-flexbox-1/#propdef-flex-basis)的普通写法，指定了`伸缩基础`：是伸缩项目的初始[主轴尺寸](http://www.w3.org/TR/css-flexbox-1/#main-size)，它是在根据伸缩因素分发可用空间之前设置的。当在`flex`简写中省略了它，它的指定值为`0%`。

![enter image description here](http://www.w3.org/TR/css-flexbox-1/images/rel-vs-abs-flex.svg)

上面这个图片展示了绝对和相对的`flex`。

 - auto：关键字`auto`相当于`1 1 main-size`
 - none：关键字`none`相当于`0 0 main-size`

`flex`属性的组件的初始值是等价于`0 1 main-size`的。

### 7.2 `flex`的常用值

下面的列表总结了最常见的`flex`值的效果：

**flex: 0 main-size**
**flex: initial**
等价于`flex: 0 1 main-size`（这个是初始值）。当有正当可用空间时，这会使得当伸缩项目是不可伸缩的，但是当空间不足时允许伸缩项目收缩到它的最小尺寸。

**flex: auto**
等价于`flex: 1 1 main-size`。

**flex: none**
等价于`flex: 0 0 main-size`

**flex: `<position-number>`**
等价于`flex: <position-number> 1 0％`


### 7.3 伸缩性的组件

伸缩性的各个组件可以通过独立的普通写法属性来控制。

> 作者被建议使用`flex`简写法来设置，而不是通过各个组件来设置，因为简写法可以正确的重置任何未指定的组件以适应常见的用途。

#### 7.3.1 `flex-grow`属性

 - 名称：`flex-grow`
 - 取值：`<number>`
 - 应用于：伸缩项目
 - 初始值：0
 - 继承：无
 - 媒体：视觉
 - 计算值：指定的值
 - 是否能动画：是

`flex-grow`属性用`<number>`来设置[伸缩增长因素](http://www.w3.org/TR/css-flexbox-1/#flex-grow-factor)，负值是不允许的。

#### 7.3.2 `flex-shrink`属性

 - 名称：`flex-shrink`
 - 取值：`<number>`
 - 应用于：伸缩项目
 - 初始值：1
 - 继承：无
 - 媒体：视觉
 - 计算值：指定的值
 - 是否能动画：是

`flex-shrink`属性用`<number>`来设置[伸缩缩小因素](http://www.w3.org/TR/css-flexbox-1/#flex-shrink-factor)，负值是不允许的。

#### 7.3.2 `flex-basis`属性

 - 名称：`flex-basis`
 - 取值：`main-size | <‘width’>`
 - 应用于：伸缩项目
 - 初始值：`main-size`
 - 继承：无
 - 媒体：视觉
 - 计算值：指定的值，长度将被转换为绝对值
 - 百分比：相对于伸缩容器的内部[主尺寸](http://www.w3.org/TR/css-flexbox-1/#main-size)（inner main size）
 - 是否能动画：是

`flex-basis`属性设置[伸缩基础](http://www.w3.org/TR/css-flexbox-1/#flex-basis)，它接受和`width`和`height`属性相同的属性值。

当在伸缩项目上设置了`main-size`关键字，会去检索[主轴尺寸属性](http://www.w3.org/TR/css-flexbox-1/#main-size-property)的值。

`flex-basis`是和`width`在水平书写模式解析一样：百分比的值是相对于伸缩项目的包含块，例如，它的伸缩容器，如果包含块的尺寸是[不确定的](http://www.w3.org/TR/css-flexbox-1/#indefinite)，其结果和`auto`的主尺寸一样。类似的，`flex-basis`决定了内容盒子的尺寸，除非指定了`box-sizing`等。

## 8 对齐（Alignment）

当一个伸缩容器的内容完成了伸缩后，并且所有的伸缩项目的尺寸都最后确定了，它们可以在伸缩容器中对齐。

[margin](http://www.w3.org/TR/CSS21/box.html#propdef-margin)属性可以以一种类似的方式来对齐项目，但是更强大。

### 8.1 用`auto`的margin来对齐

在伸缩项目上的`auto margins`和块级流中的`auto margins`在效果上是非常类似的：

 - 在计算伸缩基础和伸缩的长度期间，`auto margins`被当作为`0`
 - 优先于通过[justify-content](http://www.w3.org/TR/css-flexbox-1/#propdef-justify-content)和[align-self](http://www.w3.org/TR/css-flexbox-1/#propdef-align-self)的对齐，在相应维度中任何正的可用空间被分配到`auto margins`
 - 溢出的盒子会忽略它们的`auto margins`，且溢出会在[end](http://www.w3.org/TR/css-writing-modes-3/#end)方向

> 要注意：如果可用空间被分发到`auto margins`，则对齐属性在这个维度上没有效果，因为在伸缩后`margins`偷走了所有到可用空间。

**实例：**

一种`auto`的`margins`是在主轴上将伸缩项目清晰的分成组。下面的例子展示了如何使用它去模仿一个通用的`UI`图案－一个有许多动作的单一栏有一些左对齐，另外的右对齐。

```html
<style>
nav > ul {
  display: flex;
}
nav > ul > li {
  min-width: min-content;
  /* Prevent items from getting too small for their content. */
}
nav > ul > #login {
  margin-left: auto;
}
</style>
<nav>
  <ul>
    <li><a href=/about>About</a>
    <li><a href=/projects>Projects</a>
    <li><a href=/interact>Interact</a>
    <li id='login'><a href=/login>Login</a>
  </ul>
</nav>
```

### 8.2 轴对齐：`justify-content`属性

 - 名称：`justify-content`
 - 取值：`flex-start | flex-end | center | space-between | space-around`
 - 初始值：`flex-start`
 - 应用于：伸缩容器
 - 继承：无
 - 媒体：视觉
 - 计算值：指定的值

`justify-content`属性沿着伸缩容器当前行的[主轴](http://www.w3.org/TR/css-flexbox-1/#main-axis)来对齐项目。当任何伸缩长度和任何[auto margins](http://www.w3.org/TR/css-flexbox-1/#auto-margins)被解析后，会被执行。通常情况下，当在一行中的任何伸缩项目都是不可伸缩的或者是可伸缩但达到了它们的最大尺寸时，它会帮助分配剩余的额外空间。当项目溢出行时，它也施加了一些控制在项目对对齐上。

属性取值就不翻译了，看个图片就明白了：

![enter image description here](http://www.w3.org/TR/css-flexbox-1/images/flex-pack.svg)

### 8.3 侧轴对齐：`align-items`和`align-self`属性

**align-items：**

 - 名称：`align-items`
 - 取值：`flex-start | flex-end | center | baseline | stretch`
 - 初始值：`stretch`
 - 应用于：伸缩容器
 - 继承：无
 - 媒体：视觉
 - 计算值：指定的值

**align-self：**

 - 名称：`align-self`
 - 取值：`auto | flex-start | flex-end | center | baseline | stretch`
 - 初始值：`auto`
 - 应用于：伸缩项目
 - 继承：无
 - 媒体：视觉
 - 计算值：`auto`的计算值是父亲的`align-items`属性值，否则为指定的值

伸缩项目可以在伸缩容器当前行的侧轴上对齐，类似于`justify-content`，只是在垂直方向上。`align-items`为伸缩容器的项目设置了默认的对齐方式，包括匿名的伸缩项目。在单独的伸缩项目上`align-self`则允许默认的对齐方式被覆盖。

如果任何伸缩项目的侧轴的`margins`为`auto`，则`align-self`的设置没有效果。

下面还是用一个图片来看看各属性值的意义：

![enter image description here](http://www.w3.org/TR/css-flexbox-1/images/flex-align.svg)

### 8.4 `align-content`属性

 - 名称：`align-content`
 - 取值：`flex-start | flex-end | center | space-between | space-around | stretch`
 - 初始值：`stretch`
 - 应用于：多行的伸缩容器
 - 继承：无
 - 媒体：视觉
 - 计算值：指定的值

当在侧轴上有额外的空间时，`align-content`属性是对齐在伸缩容器中的伸缩行，类似于`justify-content`在主轴上对齐单个的伸缩项目。要注意的是，当**伸缩容器只有一行时**，该属性是没有效果的。

属性值的意义看下图啦：

![enter image description here](http://www.w3.org/TR/css-flexbox-1/images/align-content-example.svg)

### 8.5 `Flex`基线（Flex Baselines）

伸缩容器的基线由以下来决定：

**主轴基线**

 1. 如果伸缩项目中的任何一个伸缩项目的第一行参与到了[基线对齐](http://www.w3.org/TR/css-flexbox-1/#baseline-participation)，伸缩容器的主轴基线是这些项目的伸缩基线
 2. 否则，如果伸缩容器有至少一个伸缩项目，它的第一个伸缩项目有一个平行于伸缩容器主轴的基线，则伸缩容器的主轴基线就是那个基线
 3. 否则，伸缩容器的主轴基线由第一个项目的内容盒子来合成，或者如果那个失败了，则由伸缩容器的内容盒子来合成

**侧轴基线**

 1. 如果伸缩容器至少有一个伸缩项目，且它的第一个伸缩项目有一个平行于伸缩容器侧轴的基线，则伸缩容器的侧轴基线就是那个基线
 2. 否则，伸缩容器的侧轴基线由第一个项目的内容盒子来合成，或者如果那个失败了，则由伸缩容器的内容盒子来合成

当根据上面的规则来计算基线时，如果盒子贡献了基线且它有一个`overflow`的值允许滚动时，这个盒子在决定基线时必须认为它在初始的滚动位置。

当决定一个`table cell`的基线时，一个伸缩容器提供了类似于行框（line box）或`table-row`所做的那样的基线。

## 9 Flex布局算法
## 10 分割Flex布局

// todo

