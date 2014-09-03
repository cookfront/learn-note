visibility
========

`visibility`属性有两个目的：

 1. `hidden`值设置元素不可见，但是仍然会影响布局。
 2. `collapse`值主要用于隐藏表格的行或列。隐藏的行或列能够被其他内容使用。


语法：

```c
visibility: visible | hidden | collapse
```

其中`visible`为默认值，即为元素是可见的。


实例：

```c
p        { visibility: hidden; }    /* paragraphs won't be visible */
p.showme { visibility: visible; }   /* except of these with class showme */
tr.col   { visibility: collapse; }  /* table rows with class col will collapse */
```

要注意`display: none`与`visibility: hidden`的区别。