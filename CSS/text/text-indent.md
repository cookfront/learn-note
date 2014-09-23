text-indent
========

`text-indent`属性指定元素文本内容的第一行开始部分向左的水平缩进。水平缩进是相对于包含块的左边界。

 - 取值：`<length>` | `<percentage>` && [ hanging || each-line ]
 - 初始值：0
 - 应用于：块容器（block containers）
 - 继承：yes
 - 百分比：相对于包含块的宽度
 
 语法：

```c
text-indent: <length> | <percentage> && [ hanging || each-line ]
```

属性值的意义：

 - `<length>`：指定的绝对长度，负值是允许的
 - `<percentage>`：相对于包含块宽度的百分比
 - handing：反转所有被缩进作用的行
 - each-line：Indentation affects the first line of each block container and each line after a forced line break (but not lines after a soft wrap break).