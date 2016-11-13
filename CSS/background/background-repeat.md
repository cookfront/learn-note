# background-repeat

如果元素指定了背景图片， `background-repeat` 属性指定图片如何重复。

图片可以设置垂直、水平或同时垂直和水平重复，或者不重复。

如果重复背景图片，有可能会发生背景图片重复时不是整数次数，这会导致背景图片被裁剪。在CSS3之前，没有任何开发人员能阻止这种情况发生。但是在   [backgrounds and borders module level 3](http://www.w3.org/TR/css3-background/#background-repeat) 中，引入了两个新的值，它允许开发者可以防止背景图片裁剪发生，通过缩放图片以适应整数次，或者还是重复图片，多余的空间填充在图片间隔中。

`background-repeat` 属性可以接受一个或两个关键字值，这个值指定图片在水平和垂直方向上如何重复。

如果指定了一个值，该值将视为两个值语法的缩写，而另一个值由浏览器设置。如果指定了两个值，则第一个用于水平方向的重复，第二个用于垂直方向的重复。

 `background-repeat` 属性还可以采用逗号分隔的值，以便在元素设置了多个背景图片时，每个值被应用于对应的背景图片。

## 语法

- 语法：
```
background-repeat: <repeat-style> [ , <repeat-style> ]*

/* where */

<repeat-style> = repeat-x | repeat-y | [repeat | space | round | no-repeat]{1,2}
```
* 初始值： `repeat`
* 应用于： 所有元素
* 动画： 否

## 取值

- repeat-x

被计算为 `repeat no-repeat` ，背景图片在水平方向重复，在垂直方向上不重复。

* repeat-y

被计算为 `no-repeat repeat` ，背景图片在垂直方向重复，在水平方向上不重复。

* repeat

被计算为 `repeat repeat` ，背景图片即在水平方向重复，又在垂直方向上重复。

* space（CSS3新增的值）

被计算为 `space space` ，在水平和垂直方向重复的图片之间添加间距。

* round（CSS3新增的值）

被计算为 `round round` ，背景图像自动缩放直到适应且填充满整个容器。

* no-repeat

被计算为 `no-repeat no-repeat` ，背景图片在水平和垂直方向都不重复。

