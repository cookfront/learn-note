`SVG`的`<line>`元素用于绘制直线。

## 实例

```c
<svg xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">

    <line x1="0"  y1="10" x2="0"   y2="100" style="stroke:#006600;"/>
    <line x1="10" y1="10" x2="100" y2="100" style="stroke:#006600;"/>
    <line x1="20" y1="10" x2="100" y2="50"  style="stroke:#006600;"/>
    <line x1="30" y1="10" x2="110" y2="10"  style="stroke:#006600;"/>
</svg>
```

它需要指定两个坐标点，分别是直线的起点和终点。通过`x1`,`y1`,`x2`,`y2`来设置这两个点。