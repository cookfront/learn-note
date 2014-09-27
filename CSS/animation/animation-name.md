animation-name
========

在介绍`animation-name`属性前，首先需要看下`Keyframes`。

## Keyframes

`Keyframes`用于为动画属性指定在动画期间的多个时刻的值。`Keyframes`指定了一个动画循环中的行为，动画可能循环一次或者多次。

`Keyframes`具有其自己的语法规则，他的命名是由`@keyframes`开头，后面紧接着是这个`动画的名称`加上一对花括号`{}`，括号中就是一些不同时间段样式规则，有点像我们css的样式写法一样。

于一个`@keyframes`中的样式规则是由多个百分比构成的，如`0%`到`100%`之间，我们可以在这个规则中创建多个百分比，我们分别给每一个百分比中给需要有动画效果的元素加上不同的属性，从而让元素达到一种在不断变化的效果，比如说移动，改变元素颜色，位置，大小，形状等，不过有一点需要注意的是，我们可以使用`fromt`和`to`来代表一个动画是从哪开始，到哪结束，也就是说这个 `from`就相当于`0%`而`to`相当于`100%`，值得一说的是，其中`0%`不能像别的属性取值一样把百分比符号省略，我们在这里必须加上百分符号（“%”）如果没有加上的话，我们这个`keyframes`是无效的，不起任何作用。因为`keyframes`的单位只接受百分比值。

如果我们没有指定一个`0%`或`from`的`keyframes`时，则用户代理会利用将要动画属性的计算值构建一个`0%`的`keyframes`。如果我们没有指定一个`100%`或`to`的`keyframes`时，则用户代理会利用将要动画属性的计算值构建一个`100%`的`keyframes`。如果`keyframes`指定了一个负值的百分笔或者超过`100%`的百分比，则这个`keyframe`会忽略。

```c
@keyframes wobble {
  0% {
    left: 100px;
  }

  40% {
    left: 150px;
  }

  60% {
    left: 75px;
  }

  100% {
    left: 100px;
  }
}
```

在`keyframes`中还可以定义缓动函数，这个缓动函数将用于动画到下一个`keyframe`。

例如：

```c
@keyframes bounce {

  from {
    top: 100px;
    animation-timing-function: ease-out;
  }

  25% {
    top: 50px;
    animation-timing-function: ease-in;
  }

  50% {
    top: 100px;
    animation-timing-function: ease-out;
  }

  75% {
    top: 75px;
    animation-timing-function: ease-in;
  }

  to {
    top: 100px;
  }

}
```

## animation-name

`animation-name`属性中定义应用在元素上的动画列表名，每一个名字代表了一个`@keyframes`的名称。如果定义的名字不匹配任何的`@keyframes`，则没有属性会`animate`，动画也不会去执行。如果动画名为`none`，则不会产生任何动画。这个可以用于覆盖在层叠表中的任何动画。当有许多动画要修改同一个属性时，则在动画列表中最后的会胜出。

语法：

```c
animation-name: <single-animation-name> [ ‘,’ <single-animation-name> ]*
<single-animation-name> = none | <IDENT>
```

 - 初始值：none
 - 应用于：所有元素以及::before和::after伪元素
 - 继承：无

```c
animation-name: test_05
animation-name: -specific
animation-name: sliding-vertically

animation-name: test1
animation-name: test1, animation4
animation-name: none, -moz-specific, sliding
```