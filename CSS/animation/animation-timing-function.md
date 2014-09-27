animation-timing-function
========

`animation-timing-funciton`属性指定动画的缓动函数。

语法：

```c
animation-timing-function: <single-timing-function> [ ‘,’ <single-timing-function> ]*
```

 - 初始值：ease
 - 应用于：所有元素以及::before和::after伪元素
 - 继承：无

```c
animation-timing-function: ease
animation-timing-function: ease-in
animation-timing-function: ease-out
animation-timing-function: ease-in-out
animation-timing-function: linear
animation-timing-function: cubic-bezier(0.1, 0.7, 1.0, 0.1)
animation-timing-function: step-start
animation-timing-function: step-end
animation-timing-function: steps(4, end)

animation-timing-function: ease, step-start, cubic-bezier(0.1, 0.7, 1.0, 0.1)
```