font
========

`font` 属性是在样式表中同一位置设置`font-style`、`font-variant`、`font-weight`等属性的简写方式。

 - 取值：[ [ `<‘font-style’>` | | `<font-variant-css21`> | | `<‘font-weight’>` ]? `<‘font-size’>` [ / `<‘line-height’>` ]? `<‘font-family’>` ] | caption | icon | menu | message-box | small-caption | status-bar
 - 初始值：查看单独属性的初始值
 - 应用于：所有元素
 - 继承：yes
 - 百分比：查看单独属性

以上：`<font-variant-css21> = [ normal | small-caps ]`

所有与字体相关的属性都会首先被重置为它们的初始值，包括在之前段落列出的、以及‘font-stretch’、‘font-size-adjust’、‘font-kerning’和所有字体特性属性。之后，设置那些在‘font’速记属性中明确设置的值。对于允许的定义和初始值，可以查看之前定义的属性。基于向后兼容的原因，不能使用‘font’速记属性将‘font-stretch’和‘font-size-adjust’设为其初始值之外的值；作为替代，请设置独立属性。

实例：

```c
p { font: 12pt/14pt sans-serif }
p { font: 80% sans-serif }
p { font: x-large/110% "new century schoolbook", serif }
p { font: bold italic large Palatino, serif }
p { font: normal small-caps 120%/120% fantasy }
p { font: oblique 12pt "Helvetica Neue", serif; font-stretch: condensed }
```

在第二个规则中，字号百分比值（‘80%’）涉及其父元素的字号。在第三个规则中，行高百分比（‘110%’）涉及该元素自身的字号。
前三个规则没有明确的指定‘font-variant’和‘font-weight’，所以这些属性取得他们的初始值（‘normal’）。注意字体家族名称“new century schoolbook”（其包含空格）是被引号包围的。第四个规则设置了‘font-weight’为‘bold’、‘font-style’为‘italic’、以及隐含的‘font-variant’为‘normal’。
第五个规则设置了‘font-variant’（‘small-caps’）、‘font-size’（其父亲字号的120%）、‘line-height’（字号的120%）以及‘font-family’（‘fantasy’）。于是，余下的两个属性‘font-style’和‘font-weight’应用了‘normal’。
第六个规则设置了‘font-style’、‘font-size’和‘font-family’，其他字体属性被设为它们的初始值。之后设置了‘font-stretch’为‘condensed’，这是因为‘font’速记属性不能将该属性设置为该值。