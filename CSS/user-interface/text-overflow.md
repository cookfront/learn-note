text-overflow
========

`text-overflow`属性用于决定溢出的内容如何显示。它可以被裁剪、或者显示省略符号，或者一个指定的字符串。

![enter image description here](https://developer.mozilla.org/@api/deki/files/5846/=text-overflow.png)

要注意的是裁剪发生在`border box`。

语法：

```c
text-overflow: [ clip | ellipsis | <string> ]{1,2}
```

 - 初始值：clip
 - 应用于：块容器元素（block containers element）
 - 继承：无

属性值的意义：

 - clip：当对象内文本溢出时不显示省略标记（...），而是将溢出的部分裁切掉
 - ellipsis：当对象内文本溢出时显示省略标记（...）
 - `<string>`：当对象内文本溢出时显示指定的字符串

注意到这里的属性值可以是一个或两个，当指定两个值时，第一个值代表左边的溢出，第二个代表右边的溢出。