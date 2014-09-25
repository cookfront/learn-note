outline
========

`outline`属性是一个简写属性，是`outline-color`、`outline-style`和`outline-width`属性的简写，用于绘制元素的轮廓。

对于`outline`需要注意的是：

 - `outline`不占用空间，它绘制在元素的内容上
 - `outline`也可能不是矩形。

语法：

```c
outline: <'outline-color'> || <'outline-style'> || <'outline-width'>
```

 - 初始值：根据独立元素
	 - outline-color: invert
	 - outline-style: none
	 - outline-width: medium
 - 应用于：所有元素
 - 继承：无

下面再一一介绍其他三个属性。

## outline-color

用于绘制轮廓的颜色。

语法：

```c
outline-color: <color> | invert
```

## outline-style

用于决定轮廓的样式。

语法：

```c
outline-style: auto | <br-style>
```

```c
outline-style: auto

outline-style: none
outline-style: dotted
outline-style: dashed
outline-style: solid
outline-style: double
outline-style: groove
outline-style: ridge
outline-style: inset
outline-style: outset

outline-style: inherit
```

## outline-width

用于决定轮廓的宽度。

语法：

```c
outline-width: <br-width>
```