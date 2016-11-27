# background-origin

`background-origin` 属性指定了所谓的背景定位区域（ `background position area` ）。也就是说，它指定了背景图片在绘制背景时的原点。

> 当 `background-attachment` 属性值设置为 `fixed` 时， `background-origin` 属性值将被忽略。

元素在CSS中有三个区域，称之为 `box` ，它们有： `border box` 、 `padding-box` 和 `content-box` 。

![box  model](http://codropspz.tympanus.netdna-cdn.com/codrops/wp-content/uploads/2014/09/box-areas.png)

通常，元素的背景图片是相对于 `padding-box` 的左上角来绘制的。

`background-origin` 属性也可以有多个逗号分隔的值，从而可以在我们设置多个背景图片时对每个背景图设置对应的 `background-origin` 。

## 语法

- 语法： 
```
background-origin: <box> [ , <box> ]*

/* where */

<box> = padding-box | border-box | content-box
```
* 初始值： `padding-box`
* 应用于： 所有元素
* 动画： 否

## Demo
单个背景图片时：

```
background-origin: border-box;
background-origin: padding-box;
background-origin: content-box;
```

多个背景图片时：

```
.element {
    background-image: url(path/to/first/image.jpg), url(path/to/second/image.png);
    background-origin: content-box, border-box;
}
```