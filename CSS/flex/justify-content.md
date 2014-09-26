justify-content
========

`justify-content`属性用来定义伸缩项目沿着主轴线的对齐方式。当一行上的所有伸缩项目都不能伸缩或可伸缩但是已经达到其最大长度时，这一属性才会对多余的空间进行分配。当项目溢出某一行时，这一属性也会在项目的对齐上施加一些控制。

语法：

```c
justify-content: flex-start | flex-end | center | space-between | space-around
```

 - 初始值：flex-start
 - 应用于：伸缩容器
 - 继承：无

属性值的意义：

![enter image description here](http://www.w3.org/TR/css3-flexbox/images/flex-pack.svg)

实例：

```c
#container {
	display: -webkit-flex;
	display: flex;
	-webkit-flex-direction: row;
	width: 900px;
	height: 500px;
	border:1px solid black;
	align-items: center;
	justify-content: space-between;
}
.item {
	border: 1px solid #ccc;
	width: 200px;
}
.item-1 {
	background: red;
	height: 300px;
}
.item-2 {
	background: blue;
	height: 200px;
}
.item-3 {
	background: yellow;
	height: 400px;
}
</style>

<div id="container">
	<div class="item item-1">1</div>
	<div class="item item-2">2</div>
	<div class="item item-3">3</div>
</div>
```