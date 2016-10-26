background-position
========

`background-position`属性设置背景图片的位置，它是相对于`background-origin`定义的位置来定位的。

> 注：如果先指定了一个`background-position`属性，然后后面又用`background`简写，但是没有指定`background-position`时，这时`background-position`属性会被重置为初始值。

 - 初始值：0% 0%
 - 应用于：所有元素
 - 继承：无
 - 百分比：相对于`background positoin`区域（默认情况下该区域为元素内容加上padding，可以通过`background-origin`属性去改变）的尺寸减去背景图片的尺寸。例如，垂直方向上百分比相对于`height of background positioning area - height of background image`

语法：

```c
background-position: <position> [ , <position> ]*
<position> = [ left | center | right | top | bottom | <percentage> | <length> ] | [ left | center | right | <percentage> | <length> ] [ top | center | bottom | <percentage> | <length> ] | [ center | [ left | right ] [ <percentage> | <length> ]? ] && [ center | [ top | bottom ] [ <percentage> | <length> ]? ]
```

属性值的意义：

 - `<length>`：用长度来指定背景图片的位置。允许负值
 - `<percentage>`：用百分比来指定背景图片的位置。上面已经介绍了百分比是相对于`background position - background image size`的。负值是允许的。
 - top：垂直方向上的0%
 - right：水平方向上的100%
 - bottom：垂直方向上的100%
 - left：水平方向上的0%
 - center：50%

这里需要注意的是，当`background-position`只定义了一个值时，第二个值则被假设为`center`。例如`background-position: left`等价于`background-position: left center`，`background-position: center`等价于`background-position: center center`。

在`CSS3`中允许为`background-position`提供3个或4个值，此时每一个`<percentage>`或`<length>`值前必须提供一个关键字，表明是定义哪个方向的偏移。例如：`background-position: bottom 10px right 20px`表明`10px`相对于`bottom`的垂直偏移，`20px`相对于`right`的水平偏移。也可以指定三个值，例如：`background-position: left 10px top`或`background-position: left top 10px`。

```c
background-position: left 10px top 15px;   /* 10px, 15px */
background-position: left      top     ;   /*  0px,  0px */
background-position:      10px     15px;   /* 10px, 15px */
background-position: left          15px;   /*  0px, 15px */
background-position:      10px top     ;   /* 10px,  0px */
background-position: left      top 15px;   /*  0px, 15px */
background-position: left 10px top     ;   /* 10px,  0px */
```
