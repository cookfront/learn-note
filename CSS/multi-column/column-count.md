column-count
========

`column-count`属性用于定义元素的列数。

语法：

```c
column-count: <number> | auto
```

 - 初始值：auto
 - 应用于：除table外的非替换块级元素，`display:table-cell`元素, 内联块元素
 - 继承：无

属性值意义：

 - `<number>`：用整数值来定义列数。不允许负值
 - auto：表明元素的列数由其他CSS属性决定，例如column-count

实例：

```c
.content-box {
  border: 10px solid #000000;
  column-count:3;
}
```