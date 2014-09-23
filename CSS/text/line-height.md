line-height
========

在块级元素上，`line-height` 用來指定元素内行盒的「最小」高度。

在非置换行内元素上，`line-height`用来指定用来计算行高高度的一个高度。

在置换行内元素上没有效果。

 - 取值：normal | `<length`> | `<percentage>` | `<number>`
 - 初始值：normal
 - 适用于：所有元素
 - 继承：yes
 - 百分比：相对于元素本身字体的大小

语法：

```c
line-height: normal | <length> | <percentage> | <number>
```

各属性值的意义：

 - normal：根据用户代理来决定
 - `<length>`：使用指定长度的行高
 - `<percentage>`：元素字体大小乘以百分比。定义为百分比时该属性的计算值为百分比乘以元素字体大小
 - `<number>`：元素字体大小乘以number。定义为number时该属性的计算值为指定的number，这个需要特别注意

