# background-clip

元素的背景通常绘制在 `border-box` 区域内。这将导致背景将绘制在边框下面的事实，这也是 `CSS`的默认行为。

`background-clip` 属性可用于将背景裁切到元素的三个框区域（ `box area` ）之一。当在属性中指定了一个框区域（ `box area` ） 时，背景将会被裁切到指定的框区域（ `box area` ），且不会延伸到该区域之外。

`background-clip` 属性也可以有多个逗号分隔的值，从而可以在我们设置多个背景图片时对每个背景图设置对应的 `background-clip` 。

> 根元素（html）有它自己的背景绘制区域，因此当我们在根元素上设置 `background-clip` 属性时是没有任何效果的。  

## 语法

- 语法： `background-clip: border-box | padding-box | content-box`
* 初始值： `border-box`
* 应用于： 所有元素
* 动画： 否

`background-clip` 和 `background-origin` 的不同之处在于 


