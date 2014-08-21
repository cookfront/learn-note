`SVG`的`<path>`可以用于绘制更高级的形状，例如直线、圆弧和曲线等。

## 实例

```c
<svg xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">

    <path d="M50,50
             A30,30 0 0,1 35,20
             L100,100
             M110,110
             L100,0"
          style="stroke:#660000; fill:none;"/>    
</svg>
```

在`<path>`元素中的所有绘制工作都是通过`d`属性来指定的。`d`属性包含了各种绘制指令。在实例中`M`表示`移动到指定坐标处`，`A`表示`圆弧`，`L`表示直线。这些指令就像一个`虚拟的钢笔`，这个钢笔可以绘制任何图形。

## 设置和移动钢笔

在`<path>`元素的`d`属性中第一个绘制指令应该时`M`。在你绘制任何东西之前，你应该将`钢笔`移动到某个位置。

```c
<svg xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">

    <path d="M50,50"
          style="stroke:#660000; fill:none;"/>
</svg>
```

通过将`钢笔`移动到某个点，接下来你就可以通过其他绘制指令从该点开始绘制形状了。

### Lines

绘制一条直线利用`L`指令（或小写的`l`）。
```c
<svg xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">

    <path d="M50,50
             L100,100"
          style="stroke:#660000; fill:none;"/>
</svg>
```

这个例子从`50, 50`这个点绘制一条直线到`100, 100`这个点。

大写和小写的区别在于：大写是使用绝对位置来绘制点，而小写是使用相对位置来绘制。例如：

```c
<svg xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">

    <path d="M50,50
             l100,100"
          style="stroke:#660000; fill:none;"/>
</svg>
```

这个例子会绘制一条相对点`50, 50`的一条长100的直线，会在`x`和`y`方向分别偏移100。

### Arcs



