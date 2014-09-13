border-radius
========

`CSS`的`border-radius`属性用于定义元素的圆角，每一个角都可以定义一个或两个半径。

![enter image description here](https://developer.mozilla.org/files/3638/border-radius-sh.png)

`border`属性是这4个属性的缩写：`border-top-left-radius`、`border-top-right-radius`、`border-bottom-right-ridius`和`border-bottom-left-radius`的缩写。

 - 初始值：
	 - border-top-left-radius: 0
	 - border-top-right-radius: 0
	 - border-bottom-right-radius: 0
	 - border-bottom-left-radius: 0
 - 应用于：所有元素。但是用户代理在`table`和`inline-table`的元素上`border-collapse`为`collapse`时，`border-radius`没有定义
 - 继承：无
 - 百分比：相对于对应的`border box`的尺寸。例如，水平方向的半径相对于`border box`尺寸的宽度，垂直方向的半径相对于`border box`的高度。

语法：

```c
border-radius: [ <length> | <percentage> ]{1,4} [ / [ <length> | <percentage> ]{1,4} ]?
```

可以看到`border-radius`也可以设置一到四个值，这个其实和`margin`很想，只是分别对应了`border-top-left-radius`、`border-top-right-radius`、`border-bottom-right-ridius`和`border-bottom-left-radius`。这里说下稍微复杂的`border-radius`设置三个值时的情况：

```c
border-radius: 20px 30px 10px; 

/* 等价于 */
border-top-left-radius: 20px;
border-top-right-radius: 30px;
border-bottom-right-radius: 10px;
border-bottom-left-radius: 30px;
```

可以看到`border-radius`后面还跟着一个`/`的，这又是什么意思呢？这里`/`前面的代表水平方向半径，`/`后面的代表垂直方向的半径。这可以使你更细粒度的控制各个角的`radius`。

例如：

```c
border-radius: 20px/10px;
```

当然你也可以通过`border-top-left-radius`等来分别设置各个角的`radius`：

例如：

```c
border-top-left-radius: 20px 10px; /* 这里表示top left处的水平半径为20px，垂直半径为10px */
```

再来说说百分比，因为在部分旧版浏览器和移动端浏览器有部分`bug`：

 - 在旧版本的`chrome`和`safire`不支持百分比，现在已修复
 - `Opera`的11.5版本前的百分比有bug
 - 在`Gecko 2.0`之前的版本没有按照标准来实现。水平和垂直的半径都是相对于`border box`的宽度。
 - 在`ios`的5.0之前的版本和`Android`旧版本不支持百分比

这里还有一篇一丝关于移动端`border-radius`的相关文章：[border-radius 移动之伤](https://github.com/yisibl/blog/issues/2)