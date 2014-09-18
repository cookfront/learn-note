box-shadow
=======


`box-shadow`属性可以通过逗号分隔的列表指定一个或多个阴影，可以用到几乎任何元素上。如果元素同时设置了`border-radius`，阴影也会有圆角效果。多个阴影的`z-ordering`和多个`text shadows`规则相同(第一个阴影在最上面)。

 - 初始值：none
 - 应用于：所有元素
 - 继承：无

语法：

```c
box-shadow: none | [inset? && [ <offset-x> <offset-y> <blur-radius>? <spread-radius>? <color>? ] ]#
```

 - inset：默认阴影在边框外。使用inset后，阴影在边框内（即使是透明边框），背景之上内容之下
 - offset-x：设置阴影的水平偏移量，如果是负值则阴影位于元素左边
 - offset-y：设置阴影的垂直偏移量，如果是负值则阴影位于元素上面
 - blur-radius：值越大，糊糊面积越大，阴影就越大越淡。 不能为负值。默认为0，此时阴影边缘锐利
 - spread-radius：取正值时，阴影扩大；取负值时，阴影.收缩。默认为0，此时阴影与元素同样大
 - color：阴影颜色

实例：

多个外阴影：

```c
box-shadow: 10px 10px 20px -5px red, 5px 5px 20px -2px blue;
```

内阴影：

```c
box-shadow: inset 10px 10px 20px red;
```

2014.9.18补充：

今天培训的时候讲到`box-shadow`的位置问题，不清楚，于是看了下标准：

> An outer box-shadow casts a shadow as if the border-box of the element were opaque. Assuming a spread distance of zero, its perimeter has the exact same size and shape as the border box. The shadow is drawn outside the border edge only: it is clipped inside the border-box of the element.

> An inner box-shadow casts a shadow as if everything outside the padding edge were opaque. Assuming a spread distance of zero, its perimeter has the exact same size and shape as the padding box. The shadow is drawn inside the padding edge only: it is clipped outside the padding box of the element.

可以看到在标准中很清楚的说到外阴影是相对于元素的`border box`来偏移的，而且它的大小也是元素的`border box`的大小，而内阴影是相对于元素的`padding box`。


更多请看标准：[box-shadow](http://www.w3.org/TR/css3-background/#the-box-shadow)
