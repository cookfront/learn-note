vertical-align
========

`vertical-align`属性指定一个行内或`table-cell`盒子的垂直对齐方式。

 - 取值：baseline | sub | super | top | text-top | middle | bottom | text-bottom | `<percentage>` | `<length>`
 - 初始值：baseline
 - 应用于：行内或`table-cell`元素
 - 继承：无
 - 百分比：相对于元素本身的`line-height`

语法：

```c
vertical-align: baseline | sub | super | text-top | text-bottom | middle | top | bottom | <percentage> | <length>
```

各属性值的意义：

 - baseline：将支持valign特性的对象的内容与基线对齐
 - sub：垂直对齐文本的下标
 - super：垂直对齐文本的上标
 - text-top：将支持valign特性的对象的文本与对象顶端对齐
 - text-bottom：将支持valign特性的对象的文本与对象顶端对齐
 - top：将支持valign特性的对象的内容与对象顶端对齐
 - bottom：将支持valign特性的对象的文本与对象底端对齐
 - `<percentage>`：用百分比指定由基线算起的偏移量
 - `<length>`：用长度值指定由基线算起的偏移量

向看看各个值的效果可以看这里：[http://jsfiddle.net/cookfront/9hqoj0my/](http://jsfiddle.net/cookfront/9hqoj0my/)