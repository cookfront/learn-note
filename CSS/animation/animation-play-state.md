animation-play-state
========

`animation-play-state`属性定义动画是否运行还是暂停。一个运行的动画可以通过设置该属性的属性值为`paused`来暂停动画。需要继续运行动画，可以设置属性值为`running`。

语法：

```c
animation-play-state: <single-animation-play-state> [ ‘,’ <single-animation-play-state> ]*
<single-animation-play-state> = running | paused
```

  - 初始值：running
 - 应用于：所有元素以及::before和::after伪元素
 - 继承：无

```c
animation-play-state: running
animation-play-state: paused

animation-play-state: paused, running, running
```