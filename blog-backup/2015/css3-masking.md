CSS Masking Module Level 1
========

## 1. 介绍

该规范定义了两种不同的图形操作，它们都可以完全或部分隐藏对象的一部分：剪切和蒙板。

### 1.1 剪切

一个封闭的矢量路径，形状或多边形定义了一个所谓的剪切路径。剪切路径是一个区域，所有在这个区域内的都将被显示，所有在该区域之外的都将被剪切掉，并且不会在画布上显示。

**实例1：**

<center>
![enter image description here](http://www.w3.org/TR/css-masking-1/images/clipping-path.svg)
</center>

<center>
图片1：一个剪切路径被应用在一个有着不同颜色的多边形上（最左）。右边是剪切后的结果。
</center>

[clip-path](http://www.w3.org/TR/css-masking-1/#propdef-clip-path)属性可以用于指定基本形状作为剪切路径，或者引用一个有图形元素的[`<clipPath`>](http://www.w3.org/TR/css-masking-1/#elementdef-clippath)元素用于剪切路径。

### 1.2 蒙板

应用一个蒙板到一个图形对象的结果就好像该图形对象通过一个蒙板被绘制在背景上，从而完全或部分的遮盖了图形对象。

**实例2：**

<center>
![enter image description here](http://www.w3.org/TR/css-masking-1/images/luminance-mask.svg)
</center>

<center>
图片2：一个亮的蒙板被应用在填充渐变的图形上（左），右边是蒙板被应用后的图形。
</center>

蒙板是使用[mask-image](http://www.w3.org/TR/css-masking-1/#propdef-mask-image)和[mask-border-source](http://www.w3.org/TR/css-masking-1/#propdef-mask-border-source)属性来应用的。

另外，对于许多简单的用途，[mask-image](http://www.w3.org/TR/css-masking-1/#propdef-mask-image)属性可直接参考图片被用于蒙板，放弃需要一个明确的[`<mask>`](http://www.w3.org/TR/css-masking-1/#elementdef-mask)元素。这个蒙板可以被定义尺寸、位置，就像`CSS`背景图片一样，这里我们使用[mask-position](http://www.w3.org/TR/css-masking-1/#propdef-mask-position)、[mask-size](http://www.w3.org/TR/css-masking-1/#propdef-mask-size)和其他特征属性。

[mask-border-source](http://www.w3.org/TR/css-masking-1/#propdef-mask-border-source)属性将蒙板分成9块，这些块可能以各种方式被切成薄片，被伸缩和被扩展，从而适应蒙板边框图片区域的尺寸。[mask-border](http://www.w3.org/TR/css-masking-1/#propdef-mask-border)属性作为[mask-border-source](http://www.w3.org/TR/css-masking-1/#propdef-mask-border-source)和其他特征属性的简写。

[mask](http://www.w3.org/TR/css-masking-1/#propdef-mask)属性作为[mask-image](http://www.w3.org/TR/css-masking-1/#propdef-mask-image)和[mask-border](http://www.w3.org/TR/css-masking-1/#propdef-mask-border)的简写。

## 2. 模块交互

该规范定义了一组CSS属性，这组属性会影响元素被应用的属性的视觉渲染。在元素根据[[CSS21]](http://www.w3.org/TR/css-masking-1/#biblio-css21)中的视觉格式模型确定尺寸和位置后，这些效果然后被应用。

## 3. 取值

该规范遵循[CSS21](http://www.w3.org/TR/css-masking-1/#biblio-css21)中的(http://www.w3.org/TR/css-masking-1/#biblio-css21)[CSS属性定义约定](http://www.w3.org/TR/CSS21/about.html#property-defs)。一些基本形状定义在`CSS Shapes Module Level 1`中[[CSS-SHAPES]](http://www.w3.org/TR/css-masking-1/#biblio-css-shapes)。在该规范中没有定义的值类型定义在`CSS Values and Units Module Level 3`[CSS3VAL](http://www.w3.org/TR/css-masking-1/#biblio-css3val)。