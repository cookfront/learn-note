user-select
========

`user-select`属性用于指定用户是否能选中文本。

> IE6-9不支持该属性，但支持使用标签属性 onselectstart="return false;" 来达到 user-select:none 的效果；Safari和Chrome也支持该标签属性；
直到Opera12.5仍然不支持该属性，但和IE6-9一样，也支持使用私有的标签属性 unselectable="on" 来达到 user-select:none 的效果；unselectable 的另一个值是 off；
除Chrome和Safari外，在其它浏览器中，如果将文本设置为 -ms-user-select:none;，则用户将无法在该文本块中开始选择文本。不过，如果用户在页面的其他区域开始选择文本，则用户仍然可以继续选择将文本设置为 -ms-user-select:none; 的区域文本；

语法：

```c
user-select: none | text | all | element
```

 - 默认值：text
 - 应用于：除替换元素外的所有元素
 - 继承：无

属性值的意义：

 - none：文本不能被选择
 - text：可以选择文本
 - all：当所有内容作为一个整体时可以被选择。如果双击或者在上下文上点击子元素，那么被选择的部分将是以该子元素向上回溯的最高祖先元素。
 - element：可以选择文本，但选择范围受元素边界的约束