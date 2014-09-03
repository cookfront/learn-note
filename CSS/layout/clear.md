clear
=======

该属性表明元素的框的哪一边不能与先前的浮动框相邻。`clear`属性不考虑在元素自身或者在其它块格式化上下文里面的浮动。

当应用于非浮动的块框时，取值的含义如下：

 - left：要求框的顶边框边低于在源文档中之前生成的任何左浮动框的底外边距边。
 - right：要求框的顶边框边低于在源文档中之前生成的任何右浮动框的的底外边距边。
 - both：要求框的顶边框边低于在源文档中之前生成的任何浮动框的底外边距边。
 - none：对框相对于浮动框的位置没有额外的约束。

在`IE6/7`下`clear`会引发的`margin-top` bug。[margin系列之bug巡演](https://github.com/doyoe/blog/blob/master/posts/css/2013-12-17-margin%E7%B3%BB%E5%88%97%E4%B9%8Bbug%E5%B7%A1%E6%BC%94%EF%BC%88%E4%BA%8C%EF%BC%89.md)

我对于上面这篇文章中临界值的理解：

对于这篇文章中提到的临界值应该是要使`#demo`和`.b`元素不发生外边距折叠才有效的，我将代码该为如下：

```c
#demo {
	/*overflow: auto;*/
	width: 400px;
	margin: auto;
	/*padding: 10px 0;*/
	background: #ddd;
}
#demo div {
	height: 30px;
}
.a {
	float: left;
	margin: 10px;
	background: red;
}
.b {
	clear: left;
	background: green;
	margin-top: 120px;
}

<div id="demo">
	<div class="a">float:left</div>
	<div class="b">clear:left</div>
</div>
```

这时候无论你如何设置`b`元素的`margin`，它都是在`a`元素下方的`20px`，当去除`/*overflow: auto;*/`的注释后，`b`元素的`margin`就有效了，这里是触发了父元素的`BFC`，而当注释掉`/*overflow: auto;*/`，将`/*padding: 10px 0;*/`注释去掉时，`.b`元素的`margin`还是有效，或者是为`#demo`添加`border`。[外边距叠加collapsing-margin](http://www.smallni.com/collapsing-margin/)






