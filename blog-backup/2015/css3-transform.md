CSS3 Transform
========

本文是[CSS Transforms Module Level 1](http://www.w3.org/TR/css-transforms-1/)的翻译，翻译主要还是自己去熟悉标准、学习标准，最后再分享出来。文中如有读不通的地方可以移步官方文档哟，英语渣渣呀。

## 摘要

`CSS`变换允许元素的样式在二维或三维空间变换。该规范集合了[CSS 2D 变换](http://www.w3.org/TR/css3-2d-transforms/)、[CSS 3D 变换](http://www.w3.org/TR/css3-3d-transforms/)和[SVG 变换](http://www.w3.org/TR/2009/WD-SVG-Transforms-20090320/)的规范。[CSS](http://www.w3.org/TR/CSS/)是一种用于在`screen`、`paper`等中描述结构化文档（例如：HTML和XML）的语言。

## 1 介绍

`CSS`的[视觉格式化模型](http://www.w3.org/TR/REC-CSS2/visuren.html)在每一个定位元素里描述了一个坐标系统。在该坐标空间中的位置和大小可以被看作是以像素来表达，