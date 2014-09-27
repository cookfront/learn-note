transition-timing-function
========

`transition-timing-function`属性指定过渡时的缓动函数（easing functions）。

语法：

```c
transition-timing-funciton: <single-transition-timing-function> [ ‘,’ <single-transition-timing-function> ]*
<single-transition-timing-function> = ease | linear | ease-in | ease-out | ease-in-out | step-start | step-end | steps(<integer>[, [ start | end ] ]?) | cubic-bezier(<number>, <number>, <number>, <number>)
```

 - 初始值：ease
 - 应用于：所有元素以及::before和::after伪元素
 - 继承：无

```c
transition-timing-function: ease
transition-timing-function: ease-in
transition-timing-function: ease-out
transition-timing-function: ease-in-out
transition-timing-function: linear
transition-timing-function: cubic-bezier(0.1, 0.7, 1.0, 0.1)
transition-timing-function: step-start
transition-timing-function: step-end
transition-timing-function: steps(4, end)

transition-timing-function: ease, step-start, cubic-bezier(0.1, 0.7, 1.0, 0.1)
```