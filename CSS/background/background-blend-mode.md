# background-blend-mode

`background-blend-mode` 属性用于指定元素的每个背景层的混合模式（ `blend mode` ）。

每个背景层必须与元素的背景层和元素的背景颜色混合。背景层不能与元素后面的内容混合，而是它们被独立渲染。

## 语法

- 语法： `background-blend-mode: <blend-mode>`
* 初始值： `normal`
* 应用于： 所有元素
* 动画： 否

## Demo

```
.el {
    background-image: url(blend-mode-example.jpg);
    background-color: #51B7D3;
    background-blend-mode: luminosity;
}
```