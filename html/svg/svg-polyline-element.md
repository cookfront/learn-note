`SVG`的`<polyline>`用于绘制多条连接的线段。实例：

```c
<svg xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">

    <polyline points="0,0  30,0  15,30"
        style="stroke:#006600;"/>
</svg>
```

多条线段通过点来指定，每一个点都是通过`x,y`这种方式来指定。这个实例使用了三个点来定义一个三角形。

默认的填充颜色为黑色，这里给出一个填充不是黑色的例子：

```c
<svg xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">

    <polyline points="10,2  60,2  35,52"
        style="stroke:#006600; stroke-width: 2;
               fill: #33cc33;"/>
</svg>
```

![enter image description here](http://cookfront.qiniudn.com/5EFA43F5-C679-424C-B80C-CA6CAD12FA73.png)

细心的你可能发现只有两条边有`stroke-color`，其原因是，只有点之间的线被绘制出来，也就是说只绘制出了两条线，要想有三条边，则必须添加第一个点到最后：

```c
<svg xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">

    <polyline points="10,2  60,2  35,52  10,2"
        style="stroke:#006600; fill: #33cc33;"/>
</svg>
```

这样看起来就是这样的拉：

![enter image description here](http://cookfront.qiniudn.com/1DAB0A78-9E81-4C0D-A507-46F83A6B283F.png)