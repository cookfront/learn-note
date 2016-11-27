# background-image

`background-image` 属性设置元素的背景图片。它接受一个值，或者多个逗号分隔的值。

当设置多于一个背景图片时，根据其他背景属性中设置的对应值来对每个背景图片进行尺寸确定、定位或平铺。然后多个图片会按照设置的顺序从上到下堆叠，也就是说第一个设置的图片在顶部。

当设置背景图片时，CSS作者应该还应该设置一个背景颜色，以防背景图片不可用时优雅降级。当背景图片可用时，它会绘制在背景颜色的上方。而元素上指定的任何边框都会绘制在背景上方。因此：背景颜色在最下面，背景图片次之，边框在最上方。

对于图片如何相对于元素的框和边框去绘制，则需要根据元素上设置的 `background-clip` 和 `background-origin` 属性。

## 语法

- 语法： `background-image: <image> | none`
* 初始值： `none`
* 应用于： 所有元素
* 动画： 否

## Demo

```
body { 
    background-image: url("marble.svg");
}
/* SVG format example */

p { 
    background-image: none; 
}

.multiple-bgs { 
    background-image: url(first.png), url(second.png);
}
```