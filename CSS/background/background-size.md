# background-size
#css/background

`background-size` 属性是用于指定背景图片的大小。

背景图片可以设置为覆盖元素的整个背景区域，或者是由CSS作者定义的确定尺寸。

可以使用 `cover` 关键字设置背景图片覆盖元素的整个背景区域。也可以使用 `contain` 关键字设置背景图片尽可能的大，同时包含在元素的背景区域内。如果使用了两个关键字中的任意一个，且图片具有固有的尺寸和比例时，则图片的高度和宽度的固有比率会被保留。

`background-size` 属性可以取一个关键字值（ `cover` 或 `contain` ），或者是一对非关键字值（ `<length>` 或 `<percentage>` ），或者是一个非关键字值和值 `auto` 。例如：

```
background-size: cover; /* keyword value */
background-size: contain; /* keyword value */
background-size: 100% 50%; /* pair of non-keyword values */
background-size: 300px 200px; /* pair of non-keyword values */
background-size: 50% auto; /* non-keyword value + the value 'auto' */
```

对于一对值的情况，第一个值设置图片的宽度，第二个值则设置图片的高度。

如果只有一个非关键字值被设置，则另外一个值被假设为 `auto` 。

`background-size` 属性也可以采用逗号分隔值，因此当元素有多个背景图片时，每个值可以被应用于相应的背景图片。

## 语法
- 语法：
```
background-size: <bg-size> [ , <bg-size> ]*
/* where */

<bg-size> = [ <length> | <percentage> | auto ]{1,2} | cover | contain
```
* 初始值： `auto`
* 应用于： 所有元素
* 动画： 是，除了关键字值（ `cover` 或 `contain` ）

## 取值
* `<length>`

一个`<length>`取值会将背景图片在指定的方向上将图片伸缩到指定的尺寸。负值是不允许的。

* `<percentage>`

一个 `<percentage>` 值会将图片伸缩到相对元素的 `background positioning area` 的指定百分比值，这个 `background positioning area` 是由 `background-origin` 属性决定的。负百分比值是不允许的。

* `contain`

伸缩图片到尽可能大的尺寸，同时保留其固有的纵横比（如果有的话），使得其宽度和高度可以适合在背景定位区域（ `background positioning area` ）内。如果图片没有固有的尺寸和比例，则以背景定位区域大小渲染。

* `cover`

伸缩图片到尽可能小的尺寸，同时保留其固有的纵横比（如果有的话），使得其宽度和高度可以完全覆盖背景定位区域。如果图片没有固有的尺寸和比例，则以背景定位区域大小渲染。

* `auto`

  - 如果图片的宽度和高度都有固有尺寸，则按照其固有尺寸来渲染。
  * 如果图片没有固有尺寸和比例，则以背景定位区域大小渲染。
  * 如果图片没有固有尺寸，但是有固有比例，它会按照被设置了 `contain` 关键字一样渲染。
  * 如果图片有一个固有尺寸和比例，它会按照由这个固有尺寸和比例决定的大小来渲染。
  * 如果图片有一个固有尺寸，但没有固有比例，则有固有尺寸的按照固有尺寸来渲染，没有固有尺寸的按照背景定位区域大小来渲染。

> `contain`  和 `cover` 的区别
> `cover` 关键字很容易理解，就是伸缩图片到图片能覆盖整个背景定位区域，且要保持图片的固有尺寸和比例；而 `contain` 关键字则是让我们的背景图片被包含在背景定位区域内，且在保持纵横比的情况下，尽可能大的伸缩。