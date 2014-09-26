transform
========

`transform`属性可以让你修改CSS可视化格式模型的坐标。使用它，你可以对元素进行`translate`、`rotate`等操作。

如果这个属性设置了一个非`none`的值时，会建立一个[stacking context](https://developer.mozilla.org/en-US/docs/CSS/Understanding_z-index/The_stacking_context)。

语法：

```c
transform: none | matrix(<number>,<number>,<number>,<number>,<number>,<number>)? translate(<length>[,<length>])? translateX(<length>)? translateY(<length>)? rotate(<angle>)? scale(<number>[,<number>])? scaleX(<number>)? scaleY(<number>)? skew(<angle>[,<angle>])? skewX(<angle>) || skewY(<angle>)?
```

 - 初始值：none
 - 应用于：可变换的元素
 - 继承：无

更详细的内容及实例：[w3cplus transform](http://www.w3cplus.com/content/css3-transform)