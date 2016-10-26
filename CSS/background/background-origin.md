background-origin
========

`background-origin`属性指定了称之为`background position`的区域。也就是说，当背景被绘制时，它指定了背景图片的原点在哪里。

> 注：当`background-attachment: fixed`时，`background-origin`属性将会忽略。

以下为`CSS`的盒模型图：

![](http://codropspz.tympanus.netdna-cdn.com/codrops/wp-content/uploads/2014/09/box-areas.png)

而我们的背景图片通常是在元素的`padding-box`的左上角。

当我们设置多个背景图片时，`background-origin`也可以接受逗号分隔的值，从而可以细粒度的设置每一个背景图片的`background-origin`。

**语法：**

```c
background-origin: <box> [ , <box> ]*

/* where */

<box> = padding-box | border-box | content-box
```

其初始值为`padding-box`。


**Demo：**

```css
background-origin: border-box;
background-origin: padding-box;
background-origin: content-box;

.element {
    background-image: url(path/to/first/image.jpg), url(path/to/second/image.png);
    background-origin: content-box, border-box;
}
```
