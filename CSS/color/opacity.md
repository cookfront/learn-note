opacity
========

`opacity`属性用于指定一个元素的透明度。

这个属性应用于整个元素，包括其内容，以及不被子元素继承的值。因此，一个元素和它的子孙都有一个相同的透明度。

使用该属性需要注意的一点是当其属性值设置为小于1时，会创建一个新的局部层叠上下文。[stacking context](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Understanding_z_index/The_stacking_context)。还有[doyoe](https://github.com/doyoe)大牛`z-index`文章也介绍了相关内容：[你需要了解的z-index世界](https://github.com/doyoe/blog/blob/master/posts/css/2014-01-21-%E4%BD%A0%E9%9C%80%E8%A6%81%E4%BA%86%E8%A7%A3%E7%9A%84z-index%E4%B8%96%E7%95%8C.md)

语法：

```c
opacity: <number>
```

需要注意的是，这里的`<number>`是`0.0`到`1.0`之间的值（包括他们）。