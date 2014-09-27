animation-fill-mode
========

`animation-fill-mode`属性设置动画时间之外的状态。

语法：

```c
animation-fill-mode: <single-animation-fill-mode> [ ‘,’ <single-animation-fill-mode> ]*
<single-animation-fill-mode> = none | forwards | backwards | both
```

 - 初始值：none
 - 应用于：所有元素以及::before和::after伪元素
 - 继承：无

属性值的意义：

 - none：不设置对象动画之外的状态
 - forwards：对象状态为动画结束时的状态
 - backwards：对象状态为动画开始时的状态
 - both：对象状态为动画结束或开始的状态

```c
animation-fill-mode: none
animation-fill-mode: forwards
animation-fill-mode: backwards
animation-fill-mode: both

The # indicates that several values may be given, separated by commas.
Each applies to the animation defined in the same order in animation-name.
animation-fill-mode: none, backwards
animation-fill-mode: both, forwards, none
```