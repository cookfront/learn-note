border
========

`CSS`的`border`属性可以用于设置元素的边框。它可以用于一次性设置：`border-width`、`border-style`和`border-color`。

就像所有的简写属性，在简写时缺失了某个普通写法的值时，这个值将是其初始值。例如，这里设置`border: 1px solid;`时，`border-color`将使用它的初始值。这可以用`border`重置所有的`border`设置。

 - 初始值：
	 - border-width
		 - border-top-width: medium
		 - border-right-width: medium
		 - border-bottom-width: medium
		 - border-left-width: medium
	 - border-style
		 - border-top-style: none
		 - border-right-style: none
		 - border-bottom-style: none
		 - border-left-style:none
	 - border-color
		 - border-top-color: currentColor
		 - border-right-color: currentColor
		 - border-bottom-color: currentColor
		 - border-left-color: currentColor
 - 应用于：所有元素
 - 继承：无

语法：

```c
border: <br-width> || <br-style> || <color>
```

实例：

```c
<div class="brd"> look at my borders </div>
<p>you can play with the css bellow to test properties changes</p>
<style contenteditable>
  .brd { border: 1px solid black }
</style>
```