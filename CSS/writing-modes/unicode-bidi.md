unicode-bidi
=======

`unicode-bidi`属性通常和`direction`属性一起使用，以解决文档中的双向文本的问题。例如：一个文本块中即包含了`left-to-right`的文本，又包含了`right-to-left`的文本，这时候用户代理用一个复杂的`Unicode`算法来决定如何显示这些文本。这个属性用于覆盖这个算法并且允许开发者来控制文本的嵌入。

语法：

```c
unicode-bidi: normal | embed | isolate | bidi-override | isolate-override | plaintext
```

 - 初始值：normal
 - 应用于：所有元素，尽管某些属性值在非行内元素上没有效果
 - 继承：无

属性值的意义：

 - normal：对象不打开附加的嵌入层，对于内联元素，隐式重排序跨对象边界进行工作。
 - embed：如果元素为内联的，这个属性值打开额外级别的嵌入关于双向文本算法。这个嵌入级别的方向由`direction`属性决定
 - bidi-override：对于内联元素，这个值创建了一个覆盖。对于块容器元素（block container elements），为其不在其他块容器的后代内联元素创建了覆盖。这意味着在元素内，重新排序是严格按照`direction`属性的，内在的双向算法将被忽略
