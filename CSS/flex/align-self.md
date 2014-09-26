align-self
========

`align-self`属性会覆盖掉`align-items`属性，它是指定伸缩项目在当前伸缩行中的对齐方式，注意它是应用在伸缩项目，而`align-items`是应用于伸缩容器。

语法：

```c
align-self: auto | flex-start | flex-end | center | baseline | stretch
```

 - 初始值：auto
 - 应用于：flex项目，以及常规流的伪元素
 - 继承：无

属性值的意义：

![enter image description here](http://www.w3.org/TR/css3-flexbox/images/flex-align.svg)

实例：

```c
<style>
#container {
	display: -webkit-flex;
	display: flex;
	-webkit-flex-direction: row;
	width: 900px;
	height: 500px;
	border:1px solid black;
	align-items: center;
}
.item {
	border: 1px solid #ccc;
	flex: 1;
	width: 200px;
}
.item-1 {
	background: red;
	height: 300px;
	/* 这里指定伸缩项目的对齐为flex-start，覆盖了align-items*/
	align-self: flex-start;
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