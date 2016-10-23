box-shadow
=======


`box-shadow`属性可以通过逗号分隔的列表指定一个或多个阴影，可以用到几乎任何元素上。如果元素同时设置了`border-radius`，阴影也会有圆角效果。

 - 初始值：none
 - 应用于：所有元素
 - 继承：无

语法：

```c
box-shadow: none | [inset? && [ <offset-x> <offset-y> <blur-radius>? <spread-radius>? <color>? ] ]#
```

 - inset：默认阴影在边框外。使用inset后，阴影在边框内（即使是透明边框），背景之上内容之下
 - offset-x：设置阴影的水平偏移量，如果是负值则阴影位于元素左边
 - offset-y：设置阴影的垂直偏移量，如果是负值则阴影位于元素上面
 - blur-radius：值越大，模糊面积越大，阴影就越大越淡。 不能为负值。默认为0，此时阴影边缘锐利
 - spread-radius：伸缩半径，取正值时，阴影扩大；取负值时，阴影收缩。默认为0，此时阴影与元素同样大
 - color：阴影颜色

如果一个元素设置了`border-radius`，阴影也会有圆角效果。

当`box-shadow`没有设置`inset`时，称之为`outer box-shadow`，此时阴影具有和`border box`一样的大小和形状（前提是`spread-radius`为0），也是相对于`border box`来偏移的。当`box-shadow`设置了`inset`时，称之为`inner box-shdaow`，此时阴影具有和`padding box`一样的大小和形状（前提是`spread-radius`为0），也是相对于`padding box`来偏移的。

`box-shadow`的设置效果是从前到后的，第一个阴影显示在最前面，其他的依次按顺序排列。`box-shadow`不会去影响布局和影响其他元素。

实例：

多个外阴影：

```c
box-shadow: 10px 10px 20px -5px red, 5px 5px 20px -2px blue;
```

内阴影：

```c
box-shadow: inset 10px 10px 20px red;
```

利用`box-shadow`的多个外阴影我们可以实现一种类似多边框的效果：

```css
.box {
    width: 100px;
    height: 100px;
    background-color: #ccc;
    box-shadow: 0 0 0 10px #655,
                0 0 0 15px deeppink,
                0 0 0 20px green;
}
```

还有一种实现多边框效果的是`outline`，不过使用它你最多能得到两层边框，还有个问题就是`outline`不会应用圆角属性，即`outline`不会因为设置`border-radius`而有圆角，而`box-shadow`会有对应的圆角效果。但`box-shadow`的缺点就是只能模拟实线边框，如果你要实现虚线边框，`box-shadow`就无能为力了。所以要根据实际场景来选择。

更多请看标准：[box-shadow](http://www.w3.org/TR/css3-background/#the-box-shadow)
