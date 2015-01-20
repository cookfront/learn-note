CSS3 Animation
========

本文是[Web Animations 1.0](http://www.w3.org/TR/web-animations/)的学习和翻译，如有翻译不好的可以看看原文哟。

## 1 介绍

`CSS`的[transition](http://www.w3.org/TR/css3-animations/#CSS3-TRANSITIONS)提供了一种在它们基本属性改变时插入`CSS`属性值的方式。这提供了一种简单的方法来实现一些简单的动画，但动画的开始和结束状态是由现有的属性值来控制，`transition`在动画如何进行上给作者提供了很少的控制。

该提案中介绍了定义动画，其中作者可以使用`keyframe`来指定`CSS`属性随着时间的变化。`Animation`类似于`transition`，因为它们随时间改变CSS属性的表象值（presentational value）。主要的区别是，`transition`是当属性值改变时触发，`animation`是在`animation`属性被应用后明确的执行。正因为如此，`animations`对于正在被动画的属性需要明确的值。这些值是使用动画关键帧（keyframes）来指定的，将在下面描述。

动画的许多方面可以被控制，包括多少次动画迭代，是否交替开始和结束之间的值，动画是否应该运行还是暂停。动画同样可以延迟它的开始时间。

## 2 取值

该规范遵循[CSS21](http://www.w3.org/TR/css3-animations/#CSS21)中的[CSS属性定义约定](http://www.w3.org/TR/CSS21/about.html#property-defs)。在该规范中没有定义的值的类型被定义在`CSS Level 2 Revision 1`[[CSS21]](http://www.w3.org/TR/css3-animations/#CSS21)。其他CSS模块可能扩展这些值类型的定义：例如[[CSS3VAL)]](http://www.w3.org/TR/css3-animations/#CSS3VAL)，当与该模块结合时，扩展`<length>`值类型的定义将在本规范中使用。

除了在它们的定义中列出的属性的特定值，在该规范中定义的所有属性也接受了[initial](http://dev.w3.org/csswg/css3-values/#common-keywords)和[inherit](http://www.w3.org/TR/CSS21/cascade.html#value-def-inherit)关键字作为他们的属性值。因为可读性原因，并未明确重复。

## 3 动画

`CSS`动画影响属性的计算值。在动画的执行期间，对于属性的计算值是由动画控制。这将会覆盖在正常样式系统中指定的值。动画覆盖所有一般规则，但会被`!important`规则所覆盖。

如果在一个时间点有多个动画为同一个属性指定了行为，则该动画名出现在[animation-name](http://www.w3.org/TR/css3-animations/#animation-name)值的最后一个会覆盖其他动画。

一个动画在动画应用程序之前、动画延迟到期前和动画结束后不会影响计算值。

<center>
![enter image description here](http://www.w3.org/TR/css3-animations/sandwich.png)
</center>

<center>
图片1：动画属性值的计算
</center>

上图显示了属性值如何计算。本身的样式显示在图的顶部，当动画没有运行和动画被延迟时，计算值是从本身样式衍生而来。在动画运行期间，计算样式是由动画值衍生而来。

动画的开始时间是后面的两个时刻：样式被解析出指定了动画的时间，或文档的`load`事件被触发。因此，在文档的样式表中指定的动画是在文档加载后开始。通过修改元素样式的指定动画会在文档被加载后且该样式被解析后开始。这可能在伪元素样式规则下立即执行，例如`hover`，或者是脚本引擎将控制返回给浏览器。

当元素有一个[animation-name](http://www.w3.org/TR/css3-animations/#animation-name)的值引用了一个有效的`keyframes`规则时，动画才会应用到元素上。一旦动画开始，它会继续直到结束，或者[animation-name](http://www.w3.org/TR/css3-animations/#animation-name)被移除。用于关键帧和动画属性的值当动画开始时被快照。在动画执行期间改变它们是没有效果的。另外要注意，改变[animation-name](http://www.w3.org/TR/css3-animations/#animation-name)的值并不一定会重新启动动画（例如：如果一个动画列表被应用，且其中一个从列表中移除，只有那个动画会暂停，其他动画会继续运行）。为了重新启动动画，它必须被移除，然后重新应用。

动画的结束是由[animation-duration](http://www.w3.org/TR/css3-animations/#animation-duration)、[animation-iteration-count](http://www.w3.org/TR/css3-animations/#animation-iteration-count)和[animatioin-fill-mode](http://www.w3.org/TR/css3-animations/#animation-fill-mode)属性结合一起定义的。

**实例1：**

```css
div {
  animation-name: diagonal-slide;
  animation-duration: 5s;
  animation-iteration-count: 10;
}

@keyframes diagonal-slide {

  from {
    left: 0;
    top: 0;
  }

  to {
    left: 100px;
    top: 100px;
  }

}
```

以上会产生用五秒将元素`(0, 0)`移动到`(100px, 100px)`，并且重复十次。

当设置`display`属性为`none`时，会终止任何被应用在元素和它后代的运行中的动画。如果元素的`diaplay`为`none`，当更新它的`display`值不为`none`的任何值时所有通过[animation-name](http://www.w3.org/TR/css3-animations/#animation-name)运用到元素的动画会开始运行，也同样包括它后代的`display`不为`none`的动画。

虽然作者可以使用动画来创建动态变化的内容，动态变化的内容可以导致在某些用户癫痫。有关如何避免内容导致癫痫发作的信息，可以看[Guideline 2.3: Seizures: Do not design content in a way that is known to cause seizures](http://www.w3.org/TR/WCAG20/#seizure)

## 4 关键帧（keyframes）

关键帧被用于在动画过程中指定用于在各个点的动画属性的值。关键帧指定了动画的一个周期的行为，动画可以迭代一次或多次。

关键帧是使用专门的`CSS`的`@`规则来指定。一个`@keyframes`规则包含了关键字`@keyframes`，然后跟着标识符给出动画的名称（它会被[animation-name](http://www.w3.org/TR/css3-animations/#animation-name)引用到），最后是一组样式规则（由大括号分隔）。

对于关键帧样式规则的**关键帧选择器（keyframe selector）**包含了由逗号分隔的百分比值列表或关键字`from`或`to`。选择器用于指定沿该关键帧代表的该动画的持续时间的百分比。关键帧本身是通过在选择器声明的属性值块中指定。关键字`from`等价于`0%`，关键字`to`等价于`100%`。

如果`0%`或`from`没有被指定，那么用户代理会使用将要动画的属性的计算值构造一个`0%`的关键帧。如果`100%`或`to`没有被指定，那么用户代理会使用将要动画的属性的计算值构造一个`100%`的关键帧。如果关键帧选择器指定了一个负的或者是大于`100%`百分比值，该关键帧将被忽略。

一个关键帧规则的**关键帧声明块（keyframe declaration block）**包含属性和值，那些不能动画的属性将在规则中被忽略，