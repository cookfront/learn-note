# border-radius

`border-radius` 属性用于定于元素的圆角。

`border-radius` 属性是这4个属性的缩写： `border-top-left-radius`、 `border-top-right-radius`、 `border-bottom-right-ridius` 和 `border-bottom-left-radius` 的缩写。

`border-radius` 可以设置一到四个值，或由斜杠 `/` 分隔的八个值，在斜杠的每一侧有一到四个值：

- 如果没有斜杠，它可以接受一个，两个，三个或四个值。
```
border-radius: [radius value] [radius value]? [radius value]? [radius value]?; // '?' indicates value is optional
```

	- 如果设置了四个值，则四个值分别设置每个角的半径；
	* 如果设置了三个值，
	* 如果设置了两个值，
	* 如果设置了一个值，

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

## 语法

## 取值

## Demo
`border-radius` 可以产生很多形状，在 `CSS Secrets` 这本书中也降到了 `border-radius` 产生圆、椭圆、半椭圆和四分之一椭圆等形状的例子。

- 圆

要产生一个圆形，首先元素必须设置等高等宽，然后设置 `border-radius` 的值为宽的一半即可：

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

- 半椭圆

- 四分之一椭圆