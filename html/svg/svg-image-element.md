`SVG`的`<image>`元素用于嵌入位图到你的`SVG`图像中。例如：

```c
<svg xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">

  <rect x="10" y="10" height="130" width="500" style="fill: #000000"/>

  <image x="20" y="20" width="300" height="80"
     xlink:href="http://jenkov.com/images/layout/top-bar-logo.png" />
    
  <line x1="25" y1="80" x2="350" y2="80"
            style="stroke: #ffffff; stroke-width: 3;"/>
</svg>
```