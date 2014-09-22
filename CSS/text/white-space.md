white-space
========

`white-space`用于描述元素内的空白如何处理。

 - 取值：normal | pre | nowrap | pre-wrap | pre-line | inherit
 - 初始值：normal
 - 应用于：所有元素
 - 继承：yes

语法：

```c
white-space: normal | pre | nowrap | pre-wrap | pre-line
```

以上属性值的意义如下：

 - normal：用户代理将忽略空白
 - pre：空白将被保留。其行为方式就类似于HTML中的`<pre>`标签。
 - nowrap：文本不会换行，文本会在同一行上，直到碰到了换行标签<br />为止
 - pre-wrap：保留空白符序列，但是正常进行换行，此属性值不支技IE70-,Firefox3.0-版本浏览器
 - pre-line：合并空白符序列，但保留换行符，此属性不支持IE7.0-,Firefox30-,Opera9.2-下以版本浏览器

实例：

```c
<style>
p {
	white-space: pre-wrap;
}
</style>

<p>
	I have some      text.
	I have   other   text.
</p>
```

更多white-space: [css trick white-space](http://css-tricks.com/almanac/properties/w/whitespace/)
