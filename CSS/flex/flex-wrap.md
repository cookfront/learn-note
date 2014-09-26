flex-wrap
========

`flex-wrap`属性指定儿子是否强制在一行显示还是可以在多行显示。

语法：

```c
flex-wrap: nowrap | wrap | wrap-reverse
```

 - 初始值：nowrap
 - 应用于：伸缩容器
 - 继承：无

属性值的意义：

 - nowrap：伸缩容器单行显示，“ltr”排版下，伸缩项目从左到右排列；“rtl”排版上伸缩项目从右向左排列
 - wrap：伸缩容器多行显示，“ltr”排版下，伸缩项目从左到右排列；“rtl”排版上伸缩项目从右向左排列
 - wrap-reverse：伸缩容器多行显示，“ltr”排版下，伸缩项目从右向左排列；“rtl”排版下，伸缩项目从左到右排列。（和wrap相反）