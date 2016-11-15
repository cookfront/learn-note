# border-radius

`border-radius` 属性用于定于元素的圆角。

`border-radius` 属性是这4个属性的缩写： `border-top-left-radius`、 `border-top-right-radius`、 `border-bottom-right-ridius` 和 `border-bottom-left-radius` 的缩写。

`border-radius` 可以设置一到四个值，或由斜杠 `/` 分隔的八个值，在斜杠的每一侧有一到四个值：

- 如果没有斜杠，它可以接受一个，两个，三个或四个值。且 `x` 和 `y` 方向的半径值是相同的。
```
border-radius: [radius value] [radius value]? [radius value]? [radius value]?; // '?' indicates value is optional
```

	- 如果设置了四个值，则四个值分别设置每个角的半径；第一个值设置同时左上角 `x` 和 `y` 方向的半径值，以此类推第二个值设置右上角，第三个值设置右下角，第四个值设置左下角。
	* 如果设置了三个值，第一个值设置左上角，第二个值设置右上角和左下角，第三个值设置右下角。
	* 如果设置了两个值，第一个值设置左上角和右下角，第二个值设置右上角和左下角。
	* 如果设置了一个值，则这个值同时设置四个方向的圆角。

例如：

```
border-radius: 1em 3em 2em;
```	

等价于：

```
border-top-left-radius:     1em;
border-top-right-radius:    3em;
border-bottom-right-radius: 2em;
border-bottom-left-radius:  3em;
```

在上述每种情况下，不使用斜杠时，元素的四个角将是圆的，并且它们的曲率将是正圆。

![border-radius](http://codropspz.tympanus.netdna-cdn.com/codrops/wp-content/uploads/2014/09/circular-corner-curve.png)

- 如果使用了斜杠，则可以设置最多八个值，斜杠两边分别可以设置一到四个值。
```
border-radius: [top-left horizontal radius] [top-right horizontal radius]? [bottom-right horizontal radius]? [bottom-left horizontal radius]? / [top-left vertical radius] [top-right vertical radius]? [bottom-right vertical radius]? [bottom-left vertical radius]?
```

斜杠前面的值设置角的水平方向半径，斜杠后面的值设置角的垂直方向半径。例如：

```
border-radius: 2em 1em 4em / 0.5em 3em;
```

## 语法

- 语法： 
```
border-radius: [ <length> | <percentage> ]{1,4} [/ [ <length> | <percentage> ]{1,4} ]?
```
* 初始值： `0 0 0 0` 
* 应用于： 所有元素
* 动画： 是

## Demo
`border-radius` 可以产生很多形状，在 `CSS Secrets` 这本书中也降到了 `border-radius` 产生圆、椭圆、半椭圆和四分之一椭圆等形状的例子。

- 圆

要产生一个圆形，首先元素必须设置等高等宽，然后设置 `border-radius` 的值为宽的一半（50%）即可：

```
background: #ccc;
width: 200px;
height: 200px;
border-radius: 100px;
```

其实指定任何大于 **100px** 的半径，仍然可以得到一个圆形，规范中有讲到：

> When the sum of any two adjacent border radii exceeds the size of the border box, UAs must proportionally reduce the used values of all border radii until none of them overlap. 
> 当任意两个相邻圆角的半径之和超过 `border box` 的尺寸时，用户代理必须按比例减小各个边框半径所使用的值，直到它们不会相互重叠为止。

- 椭圆

如果有一个尺寸为 `200px * 150px` 的元素，为了得到一个椭圆，我们可以把它圆角的两个半径分别指定为元素宽高的一半：

```
border-radius: 100px / 75px;
```

但是这样元素尺寸发生变化后，我们的 `border-radius` 就需要跟着变了，这显然很不爽，我们可以设置 `border-radius` 为50%，百分比会基于元素的尺寸进行解析，即高度用于水平半径的解析，高度用于垂直半径的解析。因此：

```
border-radius: 50%;
```

- 半椭圆

线上Demo： [half-ellipse](http://dabblet.com/gist/e98d11da331bd9482bb0)

- 四分之一椭圆

其实四分之一椭圆比半椭圆更简单，我们只要其中一个角的水平和垂直半径都等于 `100%` 即可，其他三个角都不设置圆角：

```
border-radius: 100% 0 0 0;
```

线上Demo： [quarter-ellipse](http://dabblet.com/gist/2b75df0e72c9804e8abe)