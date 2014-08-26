`SVG`的`<defs>`元素用于嵌入定义的可重用的形状。例如，你可以将`SVG`形状组合在一起，然后可以重用它们为一个形状。

## 实例

```c
<svg>
    <defs>
        <g>
            <rect x="100" y="100" width="100" height="100" />
            <circle cx="100" cy="100" r="100" />
        </g>
    </defs>
</svg>
```

在`<defs>`中定义的形状不会在`SVG`图像中显示，它们必须通过`<use>`元素来引用。例如：

```c
<svg>
  <defs>
    <g id="shape">
        <rect x="50" y="50" width="50" height="50" />
        <circle cx="50" cy="50" r="50" />
    </g>
  </defs>

  <use xlink:href="#shape" x="50" y="50" />
  <use xlink:href="#shape" x="200" y="50" />

</svg>
```

必须在`<g>`元素上设置`ID`属性，这样才能在`<use>`元素中引用到，通过设置`xlink:href`的值为`<g>`元素的`ID`属性即可。

`<use>`元素通过`x`和`y`属性来指定定义在`<defs>`中形状的位置。注意：在`<g>`元素中的形状位于`0, 0`的位置，那是因为它们是在`<use>`元素中的位置。