transition
========

`transition`属性是一个简写属性，是对于`transition-property`、`transition-duration`、`transition-timing-function`和`transition-delay`的简写。

语法：

```c
transition: <single-transition> [ ‘,’ <single-transition> ]*
<single-transition> = [ none | <single-transition-property> ] || <time> || <single-transition-timing-function> || <time>
```

 - 初始值：取决于独立属性
	 - transition-delay: 0s
	 - transition-duration: 0s
	 - transition-property: all
	 - transition-timing-function: ease
 - 应用于：所有元素以及::before和::after伪元素
 - 继承：无


## 开始过渡（Starting of transitions）

当一个可动画（animatable）属性的计算值改变时，就必须根据`transition-property`、`transition-duration`、`transition-timing-function`和`transition-delay`的属性值来决定需要应用哪一个过渡（transition），并使这个可动画的属性过渡到新的计算值。这意味着在一个属性的改变可能会导致过渡时任何一个`transition-*`属性也在同一时间改变，则新的`transition-*`属性会控制这个过渡（也就是会覆盖掉之前设置的值）。

实例：

```c
li {
  transition: background-color 1s linear 0s;
  background: blue;
}
li:hover {
  background-color: green;
  transition-duration: 2s; /* applies to the transition *to* the :hover state */
}
```

当我们进入列表元素的hover状态时，`transition-duration`将会使用`2s`的值，也就是说从`blue`到`green`要持续2s。然而，当我们离开列表元素的`hover`状态时，`green`到`blue`则会花费1s。




