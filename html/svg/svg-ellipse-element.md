`SVG`的`<ellipse>`元素是用于绘制椭圆。

## 实例

```c
<svg xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">

  <ellipse cx="40" cy="40" rx="30" ry="15"
           style="stroke:#006600; fill:#00cc00"/>

</svg>
```

结果：

![enter image description here][1]

椭圆的中心和圆一样设置，通过`cx`和`cy`属性来设置椭圆的中心。这里的`rx`和`ry`分别设置`x`和`y`方向的半径，这里的`rx`设置比`ry`大，所以在`x`方向看起来更宽一点。当`rx`和`ry`设置成相同的值时，其实就是绘制了一个圆。

## 椭圆的stroke

同[rect][2]

## 椭圆的fill

同[rect][2]


  [1]: http://cookfront.qiniudn.com/51E64636-2520-4768-8FC9-78A5C5177E4B.png
  [2]: https://github.com/cookfront/learn-note/blob/master/html/svg/svg-rect-element.md