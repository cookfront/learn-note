animation-delay
========

`animation-delay`属性指定动画什么时候开始。

默认值为`0s`，当指定一个正数时间时，表示动画需要延迟多少时间再开始。当指定一个负数时间时，

语法：

```c
animation-delay: <time> [, <time>]*
```

 - 初始值：0s
 - 应用于：所有元素以及::before和::after伪元素
 - 继承：无

```c
animation-delay: 3s
animation-delay: 2s, 4ms
```