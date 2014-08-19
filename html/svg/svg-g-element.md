`SVG`的`<g>`元素用于将`SVG`的一些形状组合在一起。当将元素组合在一起后，你可以对整个组的元素进行变换，就好像对单个元素变换一样，非常简单。

## 实例

```c
<svg xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">
    
    <g>
      <line x1="10" y1="10" x2="85" y2="10"
          style="stroke: #006600;"/>

      <rect x="10" y="20" height="50" width="75"
          style="stroke: #006600; fill: #006600"/>

      <text x="10" y="90" style="stroke: #660000; fill: #660000">
        Text grouped with shapes</text>
    </g>

</svg>
```

![svg-g][1]

这个例子展示了将3个元素组合在一个`<g>`元素内，看上去好像没什么作用，现在我们对`<g>`元素进行变换看看：

```c
<svg xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">

    <g transform="rotate(45 50 50)">
      <line x1="10" y1="10" x2="85" y2="10"
          style="stroke: #006600;"/>

      <rect x="10" y="20" height="50" width="75"
          style="stroke: #006600; fill: #006600"/>

      <text x="10" y="90" style="stroke: #660000; fill: #660000">
        Text grouped with shapes</text>
    </g>

</svg>
```

![enter image description here][2]

可以看到所有的形状都围绕坐标`50,50`旋转了45d度。

## 样式继承

`<g>`元素的`CSS`样式会被它的子元素所继承。例如：

```c
<g style="stroke: #0000ff; stroke-width: 4px; fill: #ff0000">
    <rect    x="10"  y="10" width="100" height="50" />
    <circle cx="150" cy="35" r="25" />
    <circle cx="250" cy="35" r="25"
           style="stroke: #009900; fill: #00ff00;"/>
</g>
```

这个实例在`<g>`元素中定义了三个元素，其中两个元素没有定义`style`属性，所以会从`<g>`元素中继承。第三个元素中设置了部分样式，所以它会使用自己的`stroke`和`fill`，但是`stroke-width`依然会从`<g>`元素中继承。

![enter image description here][3]




  [1]: http://cookfront.qiniudn.com/9f775d285d1cc32b44b62b7a7384845b.png
  [2]: http://cookfront.qiniudn.com/4d97a402361980da88bcc9b5e30f4202.png
  [3]: http://cookfront.qiniudn.com/aea019c64c2ca25c809373d507e91549.png