text-transform
========

`text-transform`属性用于指定如何大小写一个元素的文本。

 - 初始值：none
 - 应用于：所有元素
 - 继承：yes
 
语法：

```c
text-transform: none | capitalize | uppercase | lowercase | full-width
```

上面各个属性值的意义：

 - none：阻止所有字符进行更改
 - capitalize：将所有单词的第一个字母转换为大写。
 - uppercase：将所有字母转换为大写
 - lowercase：将所有字母转换为小写
 - full-width：将所有字符转换成fullwidth形式。如果字符没有相应的fullwidth形式，将保留原样。这个值通常用于排版拉丁字符和数字等表意符号。

实例：

```c
<style>
p {
	text-transform: uppercase;
}
</style>

<p>some text</p>
```

上面可以用其他关键字替换查看效果。

