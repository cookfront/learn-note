align-items
========

`align-items`属性主要用来定义伸缩项目可以在伸缩容器的当前行的侧轴上对齐方式。可以把他想像成侧轴（垂直于主轴）的`justify-content`。

语法：

```c
align-items: flex-start | flex-end | center | baseline | stretch
```

 - 初始值：stretch
 - 应用于：flex容器
 - 继承：无

属性值的意义：

![enter image description here](http://cdn2.w3cplus.com/sites/default/files/styles/print_image/public/blogs/2013/flexbox-guide-3.jpg)

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