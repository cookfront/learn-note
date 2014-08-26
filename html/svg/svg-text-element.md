`SVG`的`<text>`元素用于绘制文本在`SVG`图片上。

## 实例

```c
<svg xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink">

    <text x="20" y="40">Example SVG text 1</text>
</svg>
```

这个文本定义了一段文本在`x=20`和`y=40`处，将要显示的文本是`Example SVG text 1`。

## 文本定位（Positioning Text）

文本的位置由`<text>`元素的`x`和`y`属性决定。`x`属性决定文本的左边缘位于何处，`y`属性决定文本的底部（不是顶部）位于何处。因此，文本的`y`属性和其他的矩形、线段的`y`属性是有区别的。下面是一个例子：

```c
<svg xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink">

    <text x="20"  y="40">Example SVG text 1</text>
    <line x1="10" y1="40" x2="150" y2="40" style="stroke: #000000"/>

</svg>
```

注意到`y`属性是定义文本的底部在何处。而不是顶部。

## 文本锚（Text Anchor）

文本的锚点决定文本的哪一部分定位在`x`属性的位置。默认情况下是文本的左边缘。你同样可以使用`middle`和`end`：

你可以通过设置`text-anchor`属性来设置文本的锚点。可能的值有：`start`、`middle`和`end`。

![enter image description here](http://cookfront.qiniudn.com/43F0D831-0B86-432D-86DB-4DC677C7607E.png)

```c
<text x="50" y="20"
      style="text-anchor: start">
    Start
</text>
<text x="50" y="40"
      style="text-anchor: middle">
    Middle
</text>
<text x="50" y="60"
      style="text-anchor: end">
    End
</text> 
```

## 文本的stroke和fill

如果你只指定`stroke`，文本将显示为带有轮廓线的文本。如果你只指定`fill`，文本渲染的和普通文本一样。

![enter image description here](http://cookfront.qiniudn.com/3D8B9217-59D9-4F1D-ABF5-4C0D92B35505.png)

```c
<text x="20" y="40"
      style="fill: #000000; stroke: none; font-size: 48px;">
    Fill only
</text>
<text x="20" y="100"
      style="fill: none; stroke: #000000;  font-size: 48px;">
    Stroke only
</text>
<text x="20" y="150"
      style="fill: #999999; stroke: #000000;  font-size: 48px;">
    Fill and stroke
</text>
```

## 字母间距和字距调整

字母间距和字距调整可以通过样式属性`letter-spacing`和`kerning`来控制。

```c
<svg xmlns="http://www.w3.org/2000/svg"
         xmlns:xlink="http://www.w3.org/1999/xlink">

    <text x="20"  y="20" >Example SVG text</text>
    <text x="20"  y="40" style="kerning:2;">Example SVG text</text>
    <text x="20"  y="60" style="letter-spacing:2;">Example SVG text</text>
</svg>
```

如果你使用一个负数，间距将会减小。

## 字间距（Word Spacing）

你可以使用`CSS`属性的`word-spacing`来设置字间距。

```c
<text x="20" y="20">
    Word spacing is normal
</text>
<text x="20" y="40"
      style="word-spacing: 4;">
    Word spacing is 4
</text>
<text x="20" y="60"
      style="word-spacing: 8;">
    Word spacing is 8
</text>
```

## 旋转文本

可以使用`SVG`的[transformation](http://tutorials.jenkov.com/svg/svg-transformation.html)来旋转文本。

```c
<svg xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink">

    <text x="20"  y="40"
          transform="rotate(30 20,40)"
          style="stroke:none; fill:#000000;"
          >Rotated SVG text</text>
</svg>
```

## 垂直文本（Vertical Text）

你可以通过旋转的方式来垂直文本，但是还有另外一种方式来垂直文本。你可以通过设置`CSS`属性`writing-mode`为`tb`（top to bottom）。

```c
<text x="10" y="20" style="writing-mode: tb;">
    Vertical
</text>
```

如果你想字母不会旋转，但是文本还是垂直的，你可以通过设置`glyph-orientation-vertical`属性为0。这个属性设置字符的旋转，默认值为90。


```c
<text x="10" y="10" style="writing-mode: tb; glyph-orientation-vertical: 0;">
    Vertical
</text>
<text x="110" y="10" style="writing-mode: tb; glyph-orientation-vertical: 90;">
    Vertical
</text>
```

## 文本方向

你可以通过`CSS`属性`direction`来设置文本方向。可能的值有：`ltr`和`rtl`。你同样还需要设置`unicode-bidi`为`bidi-override`。例如：

```c
<text x="100" y="40" style="direction: rtl; unicode-bidi: bidi-override;">
    Left to right
</text>
```

更具体的还请[看这里](http://tutorials.jenkov.com/svg/text-element.html)

