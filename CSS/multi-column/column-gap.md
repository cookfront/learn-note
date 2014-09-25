column-gap
========

`column-gap`属性用于设置列于列之间的间隙。它必须应用在指定了多列的元素上。

语法：

```c
column-gap: <length> | normal
```

 - 初始值：normal
 - 应用于：多列元素
 - 继承：无

属性值的意义：

 - `<length>`：用长度值来定义列与列之间的间隙。不允许负值
 - normal：与font-size大小相同。假设该对象的font-size为16px，则normal值为16px

实例：

```c
.content-box {
  border: 10px solid #000000;
  column-count: 3;
  column-gap: 20px;
}
```