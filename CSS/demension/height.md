height
=======

## height

`height`指定一个元素内容区域的高度。内容区域是在元素的`padding`、`border`和`margin`里面。

对于`height`属性有几点需要注意的：

 - `height`属性不能应用于非替换(non-replaced)或行内元素，以及`table groups`和`table rows`
 - 对于绝对定位的元素，它们的百分比高度是相对于它们包含块的`padding box`计算的

语法：

```c
height: [<length> | <percentage>] | auto
```

## min-height

`min-height`设置一个给定元素的最小宽度，它可以阻止`height`属性的应用值小于`min-height`的值。

如果`min-height`属性的值大于`max-height`属性的值，`max-height`将会自动以`min-height`的值作为自己的值。

语法：

```c
min-height: <length> | <percentage> | max-content | min-content | fit-content | fill-available
```

## max-height

`max-height`设置一个给定元素的最大宽度，它可以阻止`height`属性的应用值大于`max-height`的值。

如果`max-height`属性的值小于`min-height`属性的值，`max-height`将会自动以`min-height`的值作为自己的值。

语法：

```c
min-height: <length> | <percentage> | max-content | min-content | fit-content | fill-available
```