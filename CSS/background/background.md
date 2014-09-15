background
========

`background`其实是在样式表中设置背景时的一种简写。`background`可以被用于设置1个或多个后面这些属性中的值：`background-clip`、`background-color`、`background-image`、`background-origin`、`background-position`、`background-repeat`、`background-size`和`background-attachment`。

 - 初始值：
	 - background-image: none
	 - background-position: 0% 0%
	 - background-size: auto auto
	 - background-repeat: repeat
	 - background-origin: padding-box
	 - background-clip: border-box
	 - background-color: transparent
 - 应用于：所有元素
 - 继承：无
 - 百分比：
	 - background-position：相对于`background position`区域的大小减去`background image`的大小。
	 - background-size：相对于`background position`区域
 
语法：

```c
background: [ <bg-layer> , ]* <final-bg-layer>
               where <bg-layer> = <bg-image> || <position> [ / <bg-size> ]? || <repeat-style> || <attachment> || <box>{1,2} 
                                       ^            ^              ^                 ^                ^              ^
                              <'background-image'>  |     <'background-size>         |    <'background-attachment'>  |
                                           <'background-position'>         <'background-repeat'>            <'background-origin'>
                                                                                                            & <'background-clip'>
               and <final-bg-layer> = <bg-layer> || <'background-color'>
```

## background-image

`background-image`属性为元素设置一个或多个背景图片。图片的绘制顺序是第一个指定的图片距离用户最近，也就是说第一个指定的在最上方。例如：

```c
background-image:url("../images/seven.png") ,url("../images/eight.png"),url("../images/nine.png");
```

上面的代码显示效果为：

![enter image description here](http://cdn2.w3cplus.com/sites/default/files/card-small-big.png)

可以看到`7`显示在最上面。

还有要注意的是元素的边框会绘制在图片上面，`background-color`绘制在图片下方。

那么指定了多个图片，这多个图片如何相对于盒子定位呢？通过`background-clip`和`background-position`属性来指定。

语法：

```c
background-image: <bg-image>[ , <bg-image> ]*
```

实例：

```c
.demo {
	margin: 0 auto;
	width: 800px;
	height: 600px;
	border: 20px solid #ccc;
	padding: 20px;
	background-image: url(http://pic.wenwen.soso.com/p/20110521/20110521194720-46706206.jpg), url(http://pic.wenwen.soso.com/p/20110521/20110521194824-1933765895.jpg);
	background-position: 0 0, 50px 30px;
	background-repeat: no-repeat;
	background-origin: content-box;
}

<div class="demo"></div>
```

> 用户应该总是指定`background-color`，这样当指定的图片不能加载时，会显示指定的背景颜色。

## background-color

`background-color`用于指定一个元素的背景颜色。

语法：

```c
background-color: <color>
```

`color`的多种形式：

```c
background-color: red
background-color: rgb(255, 255, 128)
background-color: hsla(50, 33%, 25%, 0.75)
background-color: currentColor
background-color: transparent
background-color: #bbff00

background-color: inherit
```

## background-size

`background-size`指定背景图片的大小。

> 注：如果先指定了一个`background-size`属性，然后后面又用`background`简写，但是没有指定`background-size`时，这时`background-size`属性会被重置为初始值。

 - 初始值：auto auto
 - 应用于：所有元素
 - 继承：无
 - 百分比：相对于`background position`区域

语法：

```c
background-size：<bg-size> [ , <bg-size> ]*
```

`background-size`属性值：

 - <length>：指定的长度值。可以将背景图片伸缩到指定的长度。负值是不允许的。
 - <percentage>：
 - auto：使用背景图片本身的大小
 - cover：`cover`指定背景图片应该伸缩到尽可能小，同时保证尺寸大于或等于相应维度的背景定位区域。（例如，一个小于盒子大小的背景图片，使用该属性值时会伸展到和盒子一样大小）
 - contain：`contain`指定图片应该伸缩到尽可能到，同时保证尺寸小于或等于相应唯独的背景定位区域。（例如，一个大于盒子大小的背景图片，使用该属性会伸展到盒子一样大小）

## background-attachment

如果`background-image`指定了，`background-attachment`指定了图片的位置是在视口中固定还是根据包含块的滚动而移动。（滚动视差的有些页面就是使用到了`background-attachment: fixed`）

 - 初始值：scroll
 - 应用于：所有元素
 - 继承：无

语法：

```c
background-attachment: <attachment>[ , <attachment> ]*
```

注意到后面为什么还多了个`[ , <attachment> ]*`呢？因为`CSS3`中允许指定多个背景图片：

```c
body {
  background-image: url("img1.png"), url("img2.png");
  background-attachment: scroll, fixed;
}
```



`background-attachment`可以指定以下属性值：

 - fixed：背景相对视口固定，即使一个元素有滚动机制
 - local：背景图像相对于元素内容固定，也就是说当元素随元素滚动时背景图像也会跟着滚动，因为背景图像总是要跟着内容。
 - scroll：背景是相对元素自己固定的，并且不会跟随元素内容的滚动而滚动

视差滚动例子：[视差滚动的爱情故事](http://www.alloyteam.com/2014/01/parallax-scrolling-love-story/)


