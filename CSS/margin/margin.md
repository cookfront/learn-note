margin
========

`margin`属性设置元素四个角的外边距。它是`margin-top`、`margin-right`等的简写。

 - 初始值：0
 - 应用于：所有的元素除了`display`属性值为`table-caption`、`table`和`table-inline`的元素
 - 继承：无
 - 百分比值：相对于包含块的宽度。具体看这里[margin系列之百分比](https://github.com/doyoe/blog/blob/master/posts/css/2013-11-30-margin%E7%B3%BB%E5%88%97%E4%B9%8B%E7%99%BE%E5%88%86%E6%AF%94.md)
 
语法：

```c
margin: [ <length> | <percentage> | auto ]{1,4}
```

可以看到`margin`可以设置1到4个值。下面看看设置1到4个值的意义：

```c
margin: 0; /* 四个方向都为0 */
margin: 0 10px; /* top/bottom为0，left/right为10px */
margin: 0 10px 20px; /* top为0, left/right为10px，bottom为20px */
margin: 0 10px 20px 30px; /* top/right/bottom/left分别为设置的值 */
```

这里还有一篇关于`margin`的`auto`的介绍：[margin系列之keyword auto](https://github.com/doyoe/blog/blob/master/posts/css/2013-11-29-margin%E7%B3%BB%E5%88%97%E4%B9%8Bkeyword%20auto.md)

还有关于`margin`的各种`bug`：[margin](https://github.com/doyoe/blog/tree/master/posts/css)

还有一丝大牛的关于`margin`负值：[margin负值 – 一个秘密武器](http://www.iyunlu.com/view/css-xhtml/52.html)

`margin`还有一个需要注意的就是`margin collapse`：[外边距叠加collapsing-margin](http://www.smallni.com/collapsing-margin/)