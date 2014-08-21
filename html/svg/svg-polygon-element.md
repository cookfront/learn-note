`SVG`的`polygon`元素用于绘制多边形。下面是一个例子：

```c
<svg xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">

  <polygon points="10,0  60,0  35,50"
         style="stroke:#660000; fill:#cc3333;"/>

</svg>
```

![enter image description here](http://cookfront.qiniudn.com/F5655FE6-FAEF-4208-9548-8F286B10826B.png)

你可以注意到所有的边都绘制出来了，尽管只指定了三条边。这是因为`<polygon>`元素绘制直线时是在所有的点之间绘制，包含了最后一个点到第一个点的边。然而要注意的是`<polyline>`不绘制最后一个点到第一个点的边。

另外一个例子，一个八边形：

```c
<svg xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">

  <polygon points="50,5   100,5  125,30  125,80 100,105
                   50,105  25,80  25, 30"
          style="stroke:#660000; fill:#cc3333; stroke-width: 3;"/>

</svg>
```