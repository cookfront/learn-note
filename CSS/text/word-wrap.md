word-wrap
========

`word-wrap`属性指定当内容超过指定容器的边界时是否断行。

 - 初始值：normal
 - 应用于：所有元素
 - 继承：yes

语法：

```c
word-wrap: normal | break-word
```

以上属性值的意义如下：

 - normal：允许内容顶开或溢出指定的容器边界
 - break-word：内容将在边界内换行（不截断英文单词换行，截断英文单词换行需要使用word-break: break-all属性）

实例：

```c
<style>
p {
	word-wrap: break-word;
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