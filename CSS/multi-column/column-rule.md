column-rule
========

`column-rule`属性用于定义列与列之间的边框宽度，样式和颜色的。它其实是`column-rule-width`、`column-rule-style`和`column-rule-color`属性的简写。

简单点说，就有点类似于常用border属性。但column-rule是不占用任何倥间位置的，在列与列之间改变其宽度并不会改变任何元素的位置。这样的话，当column-rule的宽度大于column-gap时，column-rule将会和相邻的列重叠，甚至有可能延长超出了multi元素框，从而形成了元素的背景色；但有一点需要注意column-rule只存在两边都有内容的列之间。

语法：

```c
column-rule:  <'column-rule-width'> || <'column-rule-style'> || <'column-rule-color'>
```

 - 初始值：根据独立属性决定
	 - column-rule-width: medium
	 - column-rule-style: none
	 - column-rule-color: currentColor
 - 应用于：多列元素
 - 继承：无

实例：

```c
<style>
p {
	width: 300px;
	-webkit-column-count: 4;
	-webkit-column-gap: 20px;
	border: 1px solid #ccc;
	-webkit-column-rule: 10px dashed red;
}
</style>

<p>
	describes the optimal column width. The actual column width may be wider (to fill the available space), or narrower (only if the available space is smaller than the specified column width). Specified values must be greater than 0.
</p>
```

下面看看各个属性的意义：

## column-rule-width

此值是用来定义column-rule的宽度，默认值为“medium”，不允许取负值。类似于border-width属性

## column-rule-style

此值是用来定义column-rule的样式，其默认值为“none”，如果取值为默认值时，column-rule-width值将等于“0”，column-rule-style样式种类和border-style一样

## column-rule-color

此值用来定义column-rule的颜色，其默认值为前景色color的值，使用相当于border-color，如果不希望显示颜色，也可以将其设置为transparent(透明色)

