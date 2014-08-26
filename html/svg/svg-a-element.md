`SVG`的`<a>`元素用于在`SVG`图像上创建链接。`SVG`的链接和`HTML`的链接很像。例如：

```c
<svg xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">

    <a xlink:href="/svg/index.html">
        <text x="10" y="20">/svg/index.html</text>
    </a>

    <a xlink:href="/svg/index.html" xlink:show="new">
        <text x="10" y="40">/svg/index.html
         (xlink:show="new")</text>
    </a>

    <a xlink:href="/svg/index.html" xlink:show="replace">
        <text x="10" y="60">/svg/index.html
         (xlink:show="replace")</text>
    </a>

    <a xlink:href="/svg/index.html" target="_blank">
        <text x="10" y="80">m/svg/index.html
         (target="_blank")</text>
    </a>

    <a xlink:href="/svg/index.html" target="_top">
        <text x="10" y="100">/svg/index.html
         (target="_top")</text>
    </a>

</svg>
```

你可以在`<a>`元素上设置`xlink:show`位`new`或`replace`，这表明链接的内容是在新窗口显示，还是替换当前窗口。

注意，当你的`SVG`图像在一个`iframe`内时，这时使用`replace`替换的是`iframe`而不是浏览器窗口，你可以通过设置`target`属性为`_top`。你也可以在`<a>`元素上设置`target`属性。

## 形状链接

```c
<svg xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">

    <a xlink:href="/svg/index.html" target="_top">
        <rect x="10" y="20" width="75" height="30"
                style="stroke: #333366; fill: #6666cc"/>
    </a>
    
</svg>
```
