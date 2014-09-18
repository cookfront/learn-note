z-index
========

z-index 属性指定了一个元素及其子元素的 z-order。 当元素之间重叠的时候，z-order 决定哪一个元素覆盖在其余元素的上方显示。 通常来说 z-index 较大的元素会覆盖较小的一个。

对于一个固定位置的元素，z-index 属性指定：

 1. 元素在当前堆叠上下文中的堆叠层级。
 2. 元素是否创建一个新的局部堆叠上下文。

语法：

```c
z-index: auto | <integer>
```

z-index 接受的属性值为：关键字auto和整数，整数可以是负值（Firefox2.0及之前不支持负值）。

需要注意的是 z-index 虽然很给力，却只能应用于定位元素（即设置了 position 属性为非 static 值），其它情况下，z-index 将被忽略。

以上部分内容来自于：[你需要了解的z-index世界](https://github.com/doyoe/blog/blob/master/posts/css/2014-01-21-%E4%BD%A0%E9%9C%80%E8%A6%81%E4%BA%86%E8%A7%A3%E7%9A%84z-index%E4%B8%96%E7%95%8C.md)。这篇文章对`z-index`介绍的很清楚。

上文中在`IE`下的`bug`来源：[RM8015: IE6 IE7 IE8(Q) 中定位元素 'z-index' 为默认值在某些情况下会产生新的层叠上下文](http://w3help.org/zh-cn/causes/RM8015)

这里还有一篇介绍`z-index`的文章：[KB013: 分层的显示( Layered presentation )](http://w3help.org/zh-cn/kb/013/)

2014.9.18补充：

mdn中关于层叠上下文的介绍：[Stacking context](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Understanding_z_index/The_stacking_context)




