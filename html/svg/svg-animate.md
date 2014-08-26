`SVG`的动画。

## 实例

```c
<svg xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">
    
    <rect x="10" y="10" height="110" width="110"
         style="stroke:#ff0000; fill: #0000ff">
    
        <animateTransform
            attributeName="transform"
            begin="0s"
            dur="20s"
            type="rotate"
            from="0 60 60"
            to="360 60 60"
            repeatCount="indefinite" 
        />
    </rect>

</svg>
```

## Animation选项

有五个动画有关的元素：

 1. `<set>`
 2. `<animate>`
 3. `<animateColor>`
 4. `<animateTransform>`
 5. `<animateMotion>`

### set

`set`元素是最简单的`SVG`动画元素。它仅仅在特定的时间过去后将一个属性设置为特定的值。因此，形状是不连续的动画，且属性值只改变一次。

```c
<svg>
  <circle cx="30" cy="30" r="25" style="stroke: none; fill: #0000ff;">
    <set attributeName="r" attributeType="XML"
         to="100"
         begin="2s"  />

</circle>

</svg>
```

这个例子表明将在2秒后将圆的半径设置为`100`。

可以注意到`<set>`元素是嵌套在`<circle>`元素中，这就是`<set>`元素如何应用在一个形状上，通过嵌套在你想应用的元素内。

将要设置的属性名定义在`attributeName`中，将要设置属性名被设置的值定义在`to`属性中，设置的时间定义在`begin`属性中。上面例子中`attributeName`为`r`，说明要设置的属性是`r`，即半径，`r`被设置的值为`100`，设置的时间为`begin = 2s`，即第2s设置`r`为100。

上面的例子还有一个`attributeType`属性，它的值被设置为`xml`。那是因为在这个例子中设置的属性值是`SVG`的`circle`元素，因为`SVG`元素是`XML`元素，`SVG`属性也是`XML`属性。

你也可以通过`CSS`属性来创建动画。如果你这样做，你必须设置`attributeType`为`CSS`，如果你没有提供一个`attributeType`属性，然后浏览器将尝试猜测动画属性是一个XML属性或CSS属性。

## animate

`animate`元素用于为`SVG`形状的一个属性创建动画。你应该将`animate`元素嵌套在你想应用的元素上。例如：

```c
<circle cx="30" cy="30" r="25" style="stroke: none; fill: #0000ff;">
    <animate attributeName="cx" attributeType="XML"
             from="30"  to="470"
             begin="0s" dur="5s"
             fill="remove" repeatCount="indefinite"/>

</circle>
```

这个例子使圆的`cx`从`30`运动到`470`，这个动画开始于0秒，并且持续时间为5s。

当动画结束后，动画属性被设置为最早的值（fill="remove"设置的），如果你想动画保持动画的`to`值，设置`fill`属性为`freeze`。动画的无限循环通过`repeatCount`属性设置为`indefinite`。

## animateColor

`<animateColor>`元素用于形状的颜色，而不是位置或尺寸。你不能通过`<animate>`元素来使颜色动画。你只能通过`<animateColor>`元素。

```c
<circle cx="30" cy="30" r="25" style="stroke: none; fill: #0000ff;">
    <animateColor attributeName="fill"
                  from="#0000ff"  to="#ff0000"
                  begin="0s" dur="5s"
                  fill="freeze" repeatCount="indefinite"/>

</circle>
```

## animateTransform

`<animateTransform>`元素用于动画形状的`transform`属性。`<animate>`元素不能做到这些。

```c
<rect x="20" y="20" width="100" height="40"
    style="stroke: #ff00ff; fill:none;" >
  <animateTransform attributeName="transform"
                    type="rotate"
                    from="0 100 100" to="360 100 100"
                    begin="0s" dur="10s"
                    repeatCount="indefinite"
          />
</rect>
```

`type`属性被设置为`rotate`，意味着动画变幻是一个旋转。`form`和`to`属性设置了传给`rotate`函数的参数。这个例子从围绕`100, 100`旋转从0到360度。

下面给出一个正方形伸缩的例子：

```c
<rect x="20" y="20" width="40" height="40"
      style="stroke: #ff00ff; fill: none;" >
    <animateTransform attributeName="transform"
                      type="scale"
                      from="1 1" to="2 3"
                      begin="0s" dur="10s"
                      repeatCount="indefinite"
            />
</rect>
```

## animateMotion

`<animateMotion>`元素可以使一个形状沿着一个路径来运动。

```c
<rect x="0" y="0" width="30" height="15"
        style="stroke: #ff0000; fill: none;">
      <animateMotion
              path="M10,50 q60,50 100,0 q60,-50 100,0"
              begin="0s" dur="10s" repeatCount="indefinite"
              />
</rect>
<path d="M10,50 q60,50 100,0 q60,-50 100,0" style="fill: none; stroke-width: 1; stroke: red;" />
```

为了旋转的正方形沿着山坡的路径，你可以设置`rotate`属性为`auto`。


```c
<rect x="0" y="0" width="30" height="15"
        style="stroke: #ff0000; fill: none;">
      <animateMotion
              path="M10,50 q60,50 100,0 q60,-50 100,0"
              begin="0s" dur="10s" repeatCount="indefinite"
              rotate="auto"
              />
</rect>
```

你同样可以设置`rotate`为`20`或`30`这样的值。这样就会旋转特定的角度。

更多详细请点[这里](http://tutorials.jenkov.com/svg/svg-animation.html)


