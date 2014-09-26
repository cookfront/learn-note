flex-direction
========

`flex-direction`属性通过设置伸缩容器主轴的方向来指定伸缩项目在伸缩容器中如何放置。

> 注：`row`和`row-reverse`会被伸缩容器的方向性所影响，如果`dir: ltr`，`row`就是从左到右，`row-reverse`就是从右到左。如果`dir: rtl`则相反。

语法：

```c
flex-direction: row | row-reverse | column | column-reverse
```

 - 初始值：row
 - 应用于：flex容器
 - 继承：无

属性值的意义：

 - row：在“ltr”排版方式下从左向右排列；在“rtl”排版方式下从右向左排列
 - row-reverse：与row排列方向相反，在“ltr”排版方式下从右向左排列；在“rtl”排版方式下从左向右排列
 - column：类似 于row，不过是从上到下排列
 - column-reverse：类似于row-reverse，不过是从下到上排列

实例：

```c
<style>
#container {
	display: -webkit-flex;
	display: flex;
	-webkit-flex-direction: column-reverse;
	width: 900px;
}
.item {
	border: 1px solid #ccc;
	flex: 1;
}
</style>

<div id="container">
	<div class="item">1</div>
	<div class="item">2</div>
	<div class="item">3</div>
</div>
```