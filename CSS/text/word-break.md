word-break
========

`word-break`属性用于指定文本的字内换行行为。

 - 初始值：normal
 - 应用于：所有元素
 - 继承：yes

语法：

```c
word-break: normal | break-all | keep-all
```

以上属性值的意义如下：

 - normal：使用默认的换行规则
 - break-all：可以强行截断英文单词，达到词内换行效果
 - keep-all：不允许字断开。如果是中文将把前后标点符号内的一个汉字短语整个换行，英文单词也整个换行，如果出现某个英文字符长度超过边界，则后面的部分将撑破容器，如果边框为固定属性，则后面部分无法显示

实例：

```c
<style>
p {
	word-break: keep-all;
	width: 200px;
	border: 1px solid #ccc;
}
</style>

<p>
测试文字测试文字测试文字测试文字
测试文字测试文字测试文字
dadasdasdsadsafdasfdsfdsfsdfsdf
测试文字测试文字测试文字测试文字
ffsa das das 
dadasdasdsadsafdasfdsfdsfsdfsdf
</p>
```