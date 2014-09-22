font-synthesis
========

该属性控制是否允许用户代理在字体家族缺少粗体或斜体外观时字形合成粗体或倾斜的字体外观。如果没有指定‘weight’，则用户代理禁止合成粗体外观；如果没有指定‘style’，则用户代理禁止合成斜体外观。值‘none’禁止所有合成外观。

 - 取值：	nont | [ weight | | style ]
 - 初始值：weight style
 - 应用于：所有元素
 - 继承：yes

实例：

下面的样式规则不能使用合成的倾斜阿拉伯语：

```c

*:lang(ar) { font-synthesis: none; }
```