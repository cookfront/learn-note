animation-delay
========

`animation-delay`属性指定动画什么时候开始。

默认值为`0s`，这意味着动画会在被应用于元素时尽快开始执行。一个正数的时间值代表一个偏移，定义了在动画开始之前有多长时间的延迟。

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