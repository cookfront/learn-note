column-width
========

`column-width`属性用于决定元素的列宽。但它仅仅是一个建议的最佳列宽。这不是一个绝对的值，而仅仅是一个提示。浏览器会根据根据建议的值调整列宽，从而达到适合不同的屏幕尺寸可伸缩的设计。

语法：

```c
column-width: <length> | auto
```

 - 初始值：auto
 - 应用于：除table外的非替换块级元素，`display:table-cell`元素, 内联块元素
 - 继承：无

属性值的意义：

 - `<length>`：这是一个长度值，给出了列宽的最佳长度值的提示。实际的列宽可能会更宽或者更窄
 - auto：表明列宽由其他CSS属性决定，例如：column-count

实例：

```c
column-width: auto
column-width: 6px     /* Different <length> values */
column-width: 25em
column-width: 0.3vw

column-width: inherit
```

长度值例子：

```c
div {
  width: 100px;
  column-width: 45px;
  column-gap: 0;
  column-rule: none;
}
```

上面的例子中在宽度为100px的元素内，有两个45px的列，为了适应可用的空间，实际列宽会增加到50px