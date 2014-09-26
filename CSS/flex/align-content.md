align-content
========

`align-content`属性用于当侧轴存在额外的空间时伸缩容器内的伸缩行的对齐方式。

语法：

```c
align-content: flex-start | flex-end | center | space-between | space-around | stretch
```

 - 初始值：stretch
 - 应用于：多列flex容器
 - 继承：无

属性值的意义：

![enter image description here](http://cdn1.w3cplus.com/sites/default/files/styles/print_image/public/blogs/2013/flexbox-guide-4.jpg)

实例：

```c
<style>
#container {
	display: -webkit-flex;
	display: flex;
	-webkit-flex-direction: row;
	width: 900px;
	height: 500px;
	align-content: space-around;
	flex-wrap: wrap;
	border:1px solid black;
}
.item {
	border: 1px solid #ccc;
	height: 100px;
	width: 900px;
}
.item-1 {
	background: red;
}
.item-2 {
	background: blue;
}
.item-3 {
	background: yellow;
}
</style>

<div id="container">
	<div class="item item-1">1</div>
	<div class="item item-2">2</div>
	<div class="item item-3">3</div>
</div>
```