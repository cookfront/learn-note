border-image
========

通过`border-image`属性可以使一张图片作为元素边框的样式。这使得绘制复杂的组件更加简单了。

`border-image`被用于替代`border-style`属性给定的边框样式。有一个非常重要并且要注意的地方：`border-image-source`的计算值可以是通过`border-image-source`直接设置或者通过`border-image`简写的方式设置的，如果为`none`或者指定的图片不能显示，`border-style`指定的样式将被应用。

 - 初始值：
	 - border-image-source: none
	 - border-image-slice: 100%
	 - border-image-width: 1
	 - border-image-outset: 0s
	 - border-image-repeat: stretch
 - 继承：无
 - 百分比：
	 - border-image-slice：相对于`border-image-source`指定的边框图片的尺寸
	 - border-image-width：相对于`border image`区域的宽度和高度


语法：

```c
border-image: <'border-image-source'> || <'border-image-slice'> [ / <'border-image-width'> | / <'border-image-width'>? / <'border-image-outset'> ]? || <'border-image-repeat'>
```

下面来一一介绍上面的五个属性：

## border-image-source

该属性指定应用于边框样式的图片。如果该属性设置为`none`，或者不能显示时，将会使用`border-style`的值作为边框样式。

语法：

```c
border-image-source: url(image url) | none;
```

实例：

```c
border-image-source: none                                  /* no border-image, use the specified border-style */
border-image-source: url(image.jpg)                        /* the image.jpg is used as image */
border-image-source: linear-gradient(to top, red, yellow)  /* a gradient is used as image */

border-image-source: inherit
```

## border-image-slice

该属性将`border-image-source`指定的图片分割为9个区域：4个角落、4个边缘和中间。这是通过指定4个内部的偏移量。如果没有指定关键字`fill`时，中间的区域将被丢弃。

![enter image description here](https://developer.mozilla.org/files/3814/border-image-slice.png)

4个值控制了4条剪切线的位置。如果有一些没有指定，则会根据其他值来推断。如果`left`没有指定，则它将会和`right`一样；如果`bottom`没有指定，则会和`top`一样，如果`right`没有指定，则会和`top`一样。

中间区域不是边框自己使用，而是当其设置了`fill`关键字时，它会被作为`background-image`使用。这个`fill`关键字可以在属性值的任何地方指定，后面或前面或者中间都可以。

语法：

```c
border-image-slice: [<number> | <percentage>]{1,4} && fill?
```

```c
border-image-slice: slice                  /* One-value syntax   */  E.g. border-image-slice: 30%; 
border-image-slice: horizontal vertical    /* Two-value syntax   */  E.g. border-image-slice: 10% 30%; 
border-image-slice: top vertical bottom    /* Three-value syntax */  E.g. border-image-slice: 30 30% 45; 
border-image-slice: top right bottom left  /* Four-value syntax  */  E.g. border-image-slice: 7 12 14 5; 

border-image-slice: … fill /* The fill value can be placed between any value */ E.g. border-image-slice: 10% fill 7 12;

border-image-slice: inherit
```

> 注： 
> 1. 这里需要注意的一点是语法中的一个属性值是`number`，也就说明只需指定数字即可，专门指`px`，而不需要单位，加上单位反而是错误的。
> 2. 负值是不允许的，如果计算值大于图片的尺寸，则解释为`100%`。

通过`border-image-slice`给出的区域可能会重叠。然而如果`left`和`right`之和等于或大于图片的宽度时，此时对于`top`和`bottom`和中间的图片为空，这时就好像一个非空的透明图像指定了那个区域一样。对于`top`和`bottom`之和等于或大于图片的高度时也有类似情况。

## border-image-width

`border-image-width`其实就是`border-width`，用来指定边框宽度。我们也可以直接用border-width来代替border-image-width。

语法：

```c
border-image-width: [ <length> | <percentage> | <number> | auto ]{1,4} 
```

要注意的是，它的百分比值是相对于`border image`区域的宽度和高度。

## border-image-repeat

`border-image-repeat`属性用于定义边框图片的中间如何处理以适应边框的大小。它可以指定1个或2个值，指定一个值时水平方向和垂直方向`repeat`一样，指定2个值时，水平方向为第1个值。

语法：

```c
border-image-repeat: [ stretch | repeat | round ]{1,2} 
```

实例：

下面以这个图片作为`border-image-source`的值来看看各个`border-image-repeat`的效果。

![enter image description here](http://www.w3.org/TR/css3-background/border.png)

来看看默认值`stretch`的效果：

```c
<div class="demo">
</div>

.demo {
	width: 200px;
	height: 100px;
	border: 30px solid #ccc;
	border-image: url(http://www.w3.org/TR/css3-background/border.png) 27;
}
```

## border-image-outset








