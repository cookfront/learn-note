position
========

position 属性设置元素的定位方式。

 - 初始值：static
 - 应用于：所有元素
 - 继承性：不可继承
 - media：visual
 - 计算值：指定的值
 
语法：

```c
position: static | relative | absolute | sticky | center | page | fixed | inherit
```

取值：

 - static：元素生成的框是按正常排版方式来摆放的普通框。其`top`、`ight`、`bottom`与 `left` 属性不起作用。
 - relative：元素生成的框先按正常排版方式来计算其位置（这称作在正常排版下的位置），然后框相对于其正常位置进行偏移。若框 B 使用了相对定位，则会以假设框 B 还没有发生偏移之前的状态来计算其后面的框的位置。本规范未定义 `position: relative` 在table-row-group、table-header-group、table-footer-group、table-row、table-column-group、table-column、table-cell、and table-caption元素上的效果。
 - absolute：框的位置（可能包括大小）由`top`、`ight`、`bottom`与 `left` 属性来指定。这些属性指定了框相对于其包含块的偏移量。绝对定位框会被排除在正常排版之外，这意味着它们对之后的兄弟框的布局没有影响。另外，虽然绝对定位框有外边距，这些外边距不与其他外边距折叠。
 - fixed：框的位置按照 'absolute' 模型来计算，但是框相对于某个参考位置固定。如同 'absolute' 模型，框的外边距不与别的外边距折叠。若媒介型态是手持、投影、萤幕、打字机或是电视，则框相对于视口固定，而并不随着卷轴移动。若媒介型态是打印机，则框要渲染在每一页，并相对于页面框渲染，就算页面透过视口阅读（举例来说，预览列印的时候），也是这样。本规范未定义这个值在其他媒介型态上的呈现方式。网页作者可依媒介指定 'fixed' 值，举例来说，网页作者可能希望一个框维持在萤幕视口的上方，但又不在出现在印出来的每个页面的上方。
 - sticky：对象在常态时遵循常规流。它就像是 relative 和 fixed 的合体，当在屏幕中时按常规流排版，当卷动到屏幕外时则表现如fixed。该属性的表现是现实中你见到的吸附效果。
 - center：对象脱离常规流，使用top，right，bottom，left等属性指定盒子的位置或尺寸大小。盒子在其包含容器垂直水平居中。盒子的偏移位置不影响常规流中的任何元素，其margin不与其他任何margin折叠。
 - page：盒子的位置计算参照absolute。盒子在分页媒体或者区域块内，盒子的包含块始终是初始包含块，否则取决于每个absolute模式。

实例：

relative：

```c
.box {
	width: 100px;
	height: 100px;
}
.box-1 {
	background: red;
}
.box-2 {
	background: blue;
}
.box-3 {
	background: yellow;
}

<div class="box box-1"></div>
<div class="box box-2"></div>
<div class="box box-3"></div>
```

上面的代码也没啥特殊的，现在我们设置`.box-2`为`position: relative`并`left: 100px;`

```c
.box {
	width: 100px;
	height: 100px;
}
.box-1 {
	background: red;
}
.box-2 {
	background: blue;
	position: relative;
	left: 100px;
}
.box-3 {
	background: yellow;
}

<div class="box box-1"></div>
<div class="box box-2"></div>
<div class="box box-3"></div>
```

可以看到`box-2`相对于自己的原始位置偏移了`100px`。并且没有影响其他元素。

absolute：

```c
<div class="container">
	<div class="box box-1"></div>
	<div class="box box-2"></div>
	<div class="box box-3"></div>
</div>

.container {
	width: 500px;
	height: 500px;
	border: 1px solid #ccc;
	position: relative;
	padding: 100px;
}
.box {
	width: 100px;
	height: 100px;
}
.box-1 {
	background: red;
	position: absolute;
	top: 0;
	left: 0;
}
.box-2 {
	background: blue;
}
.box-3 {
	background: yellow;
}
```

这里我设置了`container`为`position: relative`，所以`container`为`box-1`的包含块，否则如果`container`没有设置`position: relative`时，`box-1`的包含块为初始包含块。

还有一点需要注意的是：`position: absolute`的元素是相对于包含块的`padding`定位的，拿上面的例子，设置`container`为`padding: 100px`，可以在浏览器中打开看看效果。

```c
.container {
	width: 500px;
	height: 500px;
	border: 1px solid #ccc;
	position: relative;
	padding: 100px;
}
```