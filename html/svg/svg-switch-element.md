`SVG`的`<switch>`元素用于在`SVG`图像上绘制文本。

`<switch>`使你能够根据用户的语言来显示不同形状。通常你会使用`<switch>`来显示不同文本，但也有可能显示不同文本。

```c
<switch>
    <g systemLanguage="en-UK">
        <text x="10" y="20">UK English</text>
    </g>
    <g systemLanguage="en">
        <text x="10" y="20">English</text>
    </g>
    <g systemLanguage="es">
        <text x="10" y="20">Spanish</text>
    </g>
</switch> 
```