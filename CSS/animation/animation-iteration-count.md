animation-iteration-count
========

`animation-iteration-count`属性指定动画的循环次数。

语法：

```c
<single-animation-iteration-count> [ ‘,’ <single-animation-iteration-count> ]*
<single-animation-iteration-count> = infinite | <number>
```

上面的`infinite`代表了无限次，即动画会一直循环。


 - 初始值：1
 - 应用于：所有元素以及::before和::after伪元素
 - 继承：无


```c
animation-iteration-count: infinite
animation-iteration-count: 3
animation-iteration-count: 2.3

animation-iteration-count: 2, 0, infinite
```