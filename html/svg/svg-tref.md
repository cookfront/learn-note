`SVG`的`<tref>`元素被用于引用定义在`<defs>`中的文本。这样你就可以多次显示同样的文字在你的`SVG`图片上。

```c
<svg xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink">

    <defs>
        <text id="theText">A text that is referenced.</text>
    </defs>

    <text x="20" y="10">
        <tref xlink:href="#theText" />
    </text>
    <text x="30" y="30">
        <tref xlink:href="#theText" />
    </text>
</svg>
```