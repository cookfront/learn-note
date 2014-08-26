`SVG`的`<textpath>`可以用于在路径上显示文本，例如在一个圆上，这看起来很酷。

```c
<svg xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink">


    <defs>
        <path id="myTextPath"
              d="M75,20
                 a1,1 0 0,0 100,0
               "
                />
    </defs>

    <text x="10" y="100" style="stroke: #000000;">
      <textPath xlink:href="#myTextPath" >
            Text along a curved path...
      </textPath>
    </text>

</svg>
```