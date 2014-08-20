`SVG`的`<rect>`元素代表了一个矩形。使用这个元素你可以绘制出各种尺寸的矩形，并且可以设置它们的填充色、圆角等。

## 实例

```c
<svg xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink">

    <rect x="10" y="10" height="100" width="100"
        style="stroke:#006600; fill: #00cc00"/>

</svg>
```

矩形的位置由`x`和`y`属性决定，要注意的是矩形的位置是相对于它最近的父元素的位置定位。矩形的大小由`width`和`height`属性决定。`style`属性让你可以对矩形设置额外的样式，例如：`stroke`、`fill`等。

## 圆角

属性`rx`和`ry`用于分别设置`x`和`y`方向的圆角大小。

```c
<svg xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">

    <rect x="10" y="10" height="50" width="50"
          rx="5" ry="5"
          style="stroke:#006600; fill: #00cc00"/>
    <rect x="70" y="10" height="50" width="50"
          rx="10" ry="10"
          style="stroke:#006600; fill: #00cc00"/>
    <rect x="130" y="10" height="50" width="50"
          rx="15" ry="15"
          style="stroke:#006600; fill: #00cc00"/>
</svg>
```

上面的例子中`rx`和`ry`被设置了一样，`rx`和`ry`也可以分别设置不同的值：

```c
<svg xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink">

    <rect x="10" y="10" height="50" width="50"
          rx="10" ry="5"
          style="stroke:#006600; fill: #00cc00"/>
    <rect x="130" y="10" height="50" width="50"
          rx="10" ry="15"
          style="stroke:#006600; fill: #00cc00"/>
</svg>
```

## 矩形的stroke

你可以在`style`属性中设置矩形的`stroke`属性，或者用`stroke-width`设置`stroke`的宽度。
```c
<rect x="20" y="20" width="100" height="100" style="stroke: #009900; stroke-width: 3; fill: none;" />
```

![enter image description here][1]

你还可以通过[stroke-dasharray][2]来设置`stroke`的线型。

```c
<rect x="20" y="20" width="100" height="100" style="stroke: #009900; stroke-width: 3; stroke-dasharray: 10 5; fill: none;" />
```

![enter image description here][3]

还可以通过`stroke-opacity`来设置`stroke`颜色的透明度：

```c
<rect x="20" y="20" width="100" height="100" style="stroke: #009900; stroke-width: 20; stroke-opacity: 0.5; stroke-dasharray: 10 5; fill: none;" />
```

## 矩形的fill

可以利用`fill`来为矩形设置填充颜色，透明度等。如果不需要填充，则可以设置`fill: none`：

```c
<rect x="20" y="20" width="100" height="100" style="stroke: #009900; fill: none;" />
```

或者说设置一个填充颜色：

```c
<rect x="20" y="20" width="100" height="100" style="stroke: #009900; fill: #33ff33;" />
```

![enter image description here][4]

还可以利用`fill-opacity`设置填充颜色的透明度：

```c
<rect x="20" y="20" width="100" height="100" style="stroke: #009900; fill: #33ff33;" />
<rect x="50" y="50" width="100" height="100" style="stroke: #000099; fill: #3333ff; fill-opacity: 0.5;" />
```

![enter image description here][5]


  [1]: http://cookfront.qiniudn.com/529363A2-4782-443F-8ACE-FBF4CEEC3582.png
  [2]: http://tutorials.jenkov.com/svg/stroke.html#stroke-dasharray-stroke-dashoffset
  [3]: http://cookfront.qiniudn.com/A87E31B7-AD88-4768-A346-B5FE2CA0D6CA.png
  [4]: http://cookfront.qiniudn.com/C8A29039-420D-4174-AFBB-5C3ACCFF867C.png
  [5]: http://cookfront.qiniudn.com/D9AA8E0F-2876-4BF9-B417-3943513BA323.png