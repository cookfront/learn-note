# box-shadow

`box-shadow`属性用于将一个或多个投影投射到元素上。实际上，任何元素都可以使用该属性获取投影。

每个阴影都由一至五个部分组成：水平偏移值、垂直偏移值、可选的模糊半径、可选的扩展半径和可选的颜色。

```
box-shadow: [horizontal offset] [vertical offset] [blur radius] [spread radius] [color];
```

阴影也可以在函数内部创建——称之为`内阴影`——在元素内部产生深度的错觉。可以通过在声明中添加`inset` 关键字来定义内阴影。

```
box-shadow: inset [horizontal offset] [vertical offset] [blur radius] [spread radius] [color];
```

如果一个元素设置了圆角，阴影也会有圆角效果。但要注意的是`border-image`不会影响`box-shadow`的形状。

当应用多个阴影在元素时，可以通过逗号分隔的阴影列表来声明多个阴影。`box-shadow`的设置效果是从前到后的，第一个阴影显示在最前面，其他的依次按顺序排列。`box-shadow`不会去影响布局和影响其他元素。

`box-shadow`虽能创建很好的阴影效果，但是阴影的渲染成本是很高的，特别是在固定元素上应用大的阴影时会变得更糟糕。因为它需要强制浏览器在页面滚动时重绘页面的大部分。可以看这里：[Fixed elements and large CSS box shadows can bring browsers to a crawl](https://makandracards.com/makandra/12123-fixed-elements-and-large-css-box-shadows-can-bring-browsers-to-a-crawl)。所以最好避免在你的应用中使用很大的阴影或者说很多阴影，因为它会对您的应用程序的性能产生显着不良的影响。

还有一个需要注意的点是`box-shadow`和`border-radius`一起使用时，需要更多的渲染时间。可以看这篇文章： [CSS Paint Times and Page Render Weight - HTML5 Rocks](https://www.html5rocks.com/en/tutorials/speed/css-paint-times/)

## 语法

- 语法
```
box-shadow: none | [inset? && [ <offset-x> <offset-y> <blur-radius>? <spread-radius>? <color>? ] ]#
```
 - 初始值：none
 - 应用于：所有元素
 * 动画：否

## 取值

 - inset：默认阴影在边框外。使用inset后，阴影在边框内（即使是透明边框），背景之上内容之下
 - offset-x：设置阴影的水平偏移量，如果是负值则阴影位于元素左边
 - offset-y：设置阴影的垂直偏移量，如果是负值则阴影位于元素上面
 - blur-radius：值越大，模糊面积越大，阴影就越大越淡。 不能为负值。默认为0，此时阴影边缘锐利
 - spread-radius：伸缩半径，取正值时，阴影扩大；取负值时，阴影收缩。默认为0，此时阴影与元素同样大
 - color：阴影颜色

## Demo 

多个外阴影：

```c
box-shadow: 10px 10px 20px -5px red, 
            5px 5px 20px -2px blue;
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
