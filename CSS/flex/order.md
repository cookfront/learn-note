order
========

默认情况下，伸缩项目是按照文档流出现先后顺序排列。然而，`order`属性可以控制伸缩项目在他们的伸缩容器出现的顺序。

语法：

```c
order: <integer>
```

 - 初始值：0
 - 应用于：flex项目，以及常规流的伪元素
 - 继承：无

`<integer>`是一个整数值。数值小的排在前面。

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
	justify-content: space-between;
}
.item {
	border: 1px solid #ccc;
	width: 200px;
}
.item-1 {
	background: red;
	height: 300px;
	order: 3;
}
.item-2 {
	background: blue;
	height: 200px;
	order: 1;
}
.item-3 {
	background: yellow;
	height: 400px;
	order: 2;
}
</style>

<div id="container">
	<div class="item item-1">1</div>
	<div class="item item-2">2</div>
	<div class="item item-3">3</div>
</div>
```