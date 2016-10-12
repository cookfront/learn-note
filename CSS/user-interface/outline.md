outline
========

`outline`属性是一个简写属性，是`outline-color`、`outline-style`和`outline-width`属性的简写，用于绘制元素的轮廓。`outline`是绘制在一个元素的边框外，它通常用于可访问性的原因，或者装饰性的目的。

`outline`和`border`很相似，但有以下几点不同：

 - `outline`不占用空间。`outline`不是元素盒模型的一部分，所以它不会影响元素的尺寸或者元素周围的其他元素。添加或移除`outline`也不会引起`reflow`
 - `outline`绘制在元素的四条边上。你不能像`border`一样指定某条边显示或不显示
 - `outline`不能被应用圆角。当你对元素设置`border-radius`时，`outline`不会有对应的圆角效果
 - `outline`也有可能不是矩形

通常我们的`outline`是绘制在边框的右侧，紧挨着边框，我们可以通过`outline-offset`来设置我们轮廓的偏移量。

`outline`可以用于实现多边框效果，但是它最多能实现两层边框，相比于`box-shadow`它可以设置虚线的模拟边框。例如：

```css
.box {
    width: 100px;
    height: 100px;
    background-color: #ccc;
    border: 3px solid red;
    outline: 3px dashed green;
}
```

语法：

```c
outline: <'outline-color'> || <'outline-style'> || <'outline-width'>
```

 - 初始值：根据独立元素
   - outline-color: invert
   - outline-style: none
   - outline-width: medium
 - 应用于：所有元素
 - 继承：无

下面再一一介绍其他三个属性。

## outline-color

用于绘制轮廓的颜色。

语法：

```c
outline-color: <color> | invert
```

## outline-style

用于决定轮廓的样式。

语法：

```c
outline-style: auto | <br-style>
```

```c
outline-style: auto

outline-style: none
outline-style: dotted
outline-style: dashed
outline-style: solid
outline-style: double
outline-style: groove
outline-style: ridge
outline-style: inset
outline-style: outset

outline-style: inherit
```

## outline-width

用于决定轮廓的宽度。

语法：

```c
outline-width: <br-width>
```