text-decoration
========

`text-decoration`属性用于指定文本的装饰，可以是`underline`或`overline`等。

在`CSS3`中这个属性其实是其他三个属性的简写：

 - text-decoration-line
 - text-decoration-style
 - text-decoration-color
 
 - 默认值：取决于每个独立属性
 - 适用于：所有元素
 - 继承：无

语法：

```c
text-decoration: [ text-decoration-line ] || [ text-decoration-style ] || [ text-decoration-color ]
```

在`CSS2`中`text-decoration`其实是相当于`CSS3`中的`text-decoration-line`，只能指定线的位置。

实例：

```c
<p style="text-decoration: underline">text-decoration: underline</p>
<p style="text-decoration: overline">text-decoration: overline</p>
<p style="text-decoration: none">text-decoration: none</p>
<p style="text-decoration: line-through">text-decoration: line-through</p>
<p style="text-decoration: blink">text-decoration: blink</p>
<p style="-moz-text-decoration-line: underline; -moz-text-decoration-color: red;">text-decoration: underline red dashed</p>
```

目前只有`Firefox`支持`text-decoration-line`属性。