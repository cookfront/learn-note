`SVG`的`marker`用于标记一条线段或路径的开始、中间和最后。例如，你可以用一个圆或正方形来标记路径的开始，然后用一个剪头来标记路径的最后。

## 实例

这里有一个例子展示使用`marker`的例子。

![enter image description here](http://cookfront.qiniudn.com/C4FCC384-2FC8-42F6-9755-E0201039749D.png)

`marker`使用`<marker>`元素来创建，且必须嵌套在`<defs>`元素中。`<defs>`元素通常用于定义一些重用的`SVG`图片。

下面给出上面图片的代码：

```c
<defs>
    <marker id="markerCircle" markerWidth="8" markerHeight="8" refx="5" refy="5">
        <circle cx="5" cy="5" r="3" style="stroke: none; fill:#000000;"/>
    </marker>

    <marker id="markerArrow" markerWidth="13" markerHeight="13" refx="2" refy="6"
           orient="auto">
        <path d="M2,2 L2,11 L10,6 L2,2" style="fill: #000000;" />
    </marker>
</defs>

<path d="M100,10 L150,10 L150,60" style="stroke: #6666ff; stroke-width: 1px; fill: none; marker-start: url(#markerCircle); marker-end: url(#markerArrow);" />
```

首先注意到在`<defs>`元素中定义了两个`<marker>`，这两个`<marker>`定义了上面图片中的开始和最后的`marker`。

然后注意下`<path>`元素如何引用到这两个`<marker>`，使用`marker-start`和`marker-end`这两个`CSS`属性，这就是你如何在一个给定的`path`中使用`marker`。

## 定义marker

使用`<marker>`元素来定义一个`marker`。例如：

```c
<marker id="markerCircle" markerWidth="8" markerHeight="8" refx="5" refy="5">
    <circle cx="5" cy="5" r="3" style="stroke: none; fill:#000000;"/>
</marker>
```

这个例子定义了一个长宽都是8的`marker`。长和宽都必须是明确给出的，因为`marker`是一个单独的徒刑元素。

`<marker>`元素的`id`属性是用于在`<path>`中可以通过`id`名引用到`marker`。

`refx`和`refy`坐标设置`marker`中的哪一个点被用于参考点。这个参考点是位于路径开始的部分。在这个例子中，`refx`和`refy`被设置为圆心的位置，意味着圆心会放置在路径的开始。如果你不设置`refx`和`refy`，它们将被假定为0，这将会把该`marker`放置在路径开始的左上角。

在这个例子中的`<marker>`元素内是一个`circle`元素。这个`circle`元素定义了圆心为`5, 5`，这个中心点是`marker`虚拟框中的中心。它不是位于图片上的位置。在`<marker>`元素中通过`markerWidth`和`markerHeight`，虚拟框被设置为`8, 8`的大小。

## Auto Orientation

这里给出另外一个`<marker>`定义的例子。

```c
<marker id="markerArrow" markerWidth="13" markerHeight="13" refx="2" refy="6"
       orient="auto">
    <path d="M2,2 L2,11 L10,6 L2,2" style="fill: #000000;" />
</marker>
```

在`<marker>`元素中的`<path>`绘制了一个三角形指向右边，如果这个路径不是一条水平线，你需要这个三角形进行旋转从而适应路径的方向。你可以通过设置`orient`属性为`auto`，这将会旋转`<marker>`元素内的形状以适应引用它的路径。

你同样可以设置`orient`属性为一个固定的角度值（例如：45），这将会使`marker`旋转对应的角度。

## 在路径中引用marker

你可以通过以下`CSS`属性来引用`marker`：

 - marker-start
 - marker-mid
 - marker-end


```c
<defs>
  <marker id="markerSquare" markerWidth="7" markerHeight="7" refx="4" refy="4"
          orient="auto">
      <rect x="1" y="1" width="5" height="5" style="stroke: none; fill:#000000;"/>
  </marker>

  <marker id="markerArrow" markerWidth="13" markerHeight="13" refx="2" refy="7"
          orient="auto">
      <path d="M2,2 L2,13 L8,7 L2,2" style="fill: #000000;" />
  </marker>
</defs>

<path d="M100,20 l50,0 l0,50 l50,0"
      style="stroke: #0000cc; stroke-width: 1px; fill: none;
                   marker-start: url(#markerSquare);
                   marker-mid: url(#markerSquare);
                   marker-end: url(#markerArrow);

                 "
        />
```

## marker单位

`marker`的大小可以被设置为伸缩的以适应路径的`stroke-width`。例如：

![enter image description here](http://cookfront.qiniudn.com/8BA09C1B-7ED7-4EEA-B967-03CC31757F22.png)

你可以通过设置`<marker>`元素的`markerUnits`为`strokeWidth`来达到这种效果。这是该属性的默认值，所以如果你没有设置该属性时，这是默认的行为。

```c
<marker id="markerSquare" markerWidth="7" markerHeight="7" refx="4" refy="4"
    orient="auto" markerUnits="strokeWidth">
    <rect x="1" y="1" width="5" height="5" style="stroke: none; fill:#000000;"/>
</marker>
```

