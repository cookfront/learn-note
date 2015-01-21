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

一个关键帧规则的**关键帧声明块（keyframe declaration block）**包含属性和值，那些不能动画的属性将在规则中被忽略，除了[animation-timing-function](http://www.w3.org/TR/css3-animations/#animation-timing-function)之外，该属性的行为将在下面说明。此外，关键帧规则声明中想具有`!important`资格将被忽略（没有!important优先级）。

动画所使用的`@keyframes`规则将是在被排序后的规则顺序中最后一个遇到的，且匹配在[animation-name](http://www.w3.org/TR/css3-animations/#animation-name)引用到）属性中指定的动画名称 。`@keyframes`规则不会层叠；因此，一个动画永远不会从多个`@keyframes`规则中获得关键帧。

为了确定该组的关键帧，所有的选择器的值按时间递增顺序排序。如果有任何重复，那么`@keyframes`规则内指定的最后一个关键帧将被用于提供那时关键帧的信息。如果有多个关键帧指定了相同的关键帧选择器值时，在`@keyframes`规则中不会重叠。

如果一个属性不是为关键帧指定，或者它的指定是无效的，动画的那个属性进行就好像那个关键帧不存在一样。概念上，就好像构造一组关键帧的每个属性存在于任何关键帧，且动画是为每个属性独立运行的。

**实例2：**

```css
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

四个关键帧在动画名为`wobble`的动画中指定。在第一个关键帧中，显示了动画周期的开始，`left`属性的值被动画到`100px`。在`40%`时，`left`为`150px`。以此类推。下面的图展示了动画的状态，如果动画持续时间被指定为10s的话。

<ceter>
![enter image description here](http://www.w3.org/TR/css3-animations/animation1.png)
</center>

下面是关键帧规则的语法：

```c
keyframes_rule: KEYFRAMES_SYM S+ IDENT S* '{' S* keyframes_blocks '}' S*;

keyframes_blocks: [ keyframe_selector '{' S* declaration? [ ';' S* declaration? ]* '}' S* ]* ;

keyframe_selector: [ FROM_SYM | TO_SYM | PERCENTAGE ] S* [ ',' S* [ FROM_SYM | TO_SYM | PERCENTAGE ] S* ]*;

@{K}{E}{Y}{F}{R}{A}{M}{E}{S}   {return KEYFRAMES_SYM;}
{F}{R}{O}{M}                   {return FROM_SYM;}
{T}{O}                         {return TO_SYM;}
```

### 4.1 关键帧的缓动函数

关键帧样式同样可以定义缓动函数，这个缓动函数将用于动画从这个帧运行到下个帧。

**实例3：**

```css
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

动画名为`bounce`的动画指定了五个关键帧。在第一个关键帧到第二个关键帧之间使用的缓动函数为`ease-out`（也即0%到25%），25%到50%之间使用的缓动函数为`ease-in`，以此类推了。

在`100%`或`to`上指定的缓动函数将被忽略。

### 4.2 `animation-name`属性

`animation-name`属性定义了应用的动画列表。每一个名字被用于选择关键帧规则，以提供该动画的属性值。如果该名字没有匹配任何关键帧`@`规则，没有属性进行动画且动画将不会执行（这里指的是该名字指定的动画，而不是说整个动画不会执行）。此外，如果动画名称为`none`，那么将不会有动画。这可以用于覆盖层叠而来的任何动画。如果多个动画尝试修改同一个属性，那么靠近列表的最后的动画会胜出。

对于下面列出的其他动画属性的值，按名称列出的每个动画应该有相应的值（简单点说，比如我定义了animation-name: aa bb; 在animation-duration中应该有相应的值，例如animation-name: 2s 4s;或者其他）。如果对于其他动画属性值的列表不具有相同的长度，`animation-name`列表的长度决定了启动动画时检查每个列表项的数量。列表是从第一个值开始匹配：不使用尾部剩余的值。如果其他属性中的一个没有足够的逗号分隔的值去匹配`animation-name`属性值的数量时，用户代理必须通过列表中的值计算，直到有足够的值。这些截断和重复不影响属性的计算值。

 - 名称：`animation-name`
 - 取值：`<single-animation-name> [ ‘,’ <single-animation-name> ]*`
 - 初始值：`none`
 - 应用于：所有元素，`::before`和`::after`伪元素
 - 继承：无
 - 可否动画：否
 - 百分比：`N/A`
 - 媒体：视觉
 - 计算值：指定的值
 
其中：

```c
<single-animation-name> = none | <IDENT>
```

### 4.3 `animation-duration`属性

`animation-duration`属性一个动画完成一个周期的时间。

 - 名称：`animation-duration`
 - 取值：`<time> [, <time>]*`
 - 初始值：`0s`
 - 应用于：所有元素，`::before`和`::after`伪元素
 - 继承：无
 - 可否动画：否
 - 百分比：`N/A`
 - 媒体：视觉
 - 计算值：指定的值

初始值为`0s`，这意味着动画不花时间。当持续时间为`0s`时，`animation-fill-mode`仍然会被应用，所以一个动画填充为`backwards`将在一个延迟时间（如果有的话）后显示`0%`的关键帧，填充为`forwards`的将显示`100%`的关键帧，即使动画是瞬时的。同样，动画事件也会被触发。一个负的`animation-duration`值将导致该声明无效。

### 4.4 `animation-timing-function`属性

`animation-timing-function`属性描述了动画在一个周期内如何进展。更多关于缓动函数：http://www.w3.org/TR/css3-animations/#CSS3-TRANSITIONS

 - 名称：`animation-timing-function`
 - 取值：`<single-timing-function> [ ‘,’ <single-timing-function> ]*`
 - 初始值：`ease`
 - 应用于：所有元素，`::before`和`::after`伪元素
 - 继承：无
 - 可否动画：否
 - 百分比：`N/A`
 - 媒体：视觉
 - 计算值：指定的值

### 4.5 `animation-iteration-count`属性

这个属性看名字就能看出来了，它定义动画运行周期的次数。初始值为`1`，意味着动画会从开始到结束运行一次。一个`infinite`值将会使动画运行无限次。非整数的值将会导致动画运行到一个循环的一部分结束。`animation-iteration-count`属性值为负值时是无效的。这个属性通常结合`animation-direction`属性值的`alternate`使用，这会导致动画交替运行。

 - 名称：`animation-iteration-count`
 - 取值：`<single-animation-iteration-count> [ ‘,’ <single-animation-iteration-count> ]*`
 - 初始值：1
 - 应用于：所有元素，`::before`和`::after`伪元素
 - 继承：无
 - 可否动画：否
 - 百分比：`N/A`
 - 媒体：视觉
 - 计算值：指定的值

其中：

```c
<single-animation-iteration-count> = infinite | <number>
```

### 4.6 `animation-direction`属性

`animation-direction`属性定义了动画运行的方向。当一个动画运行是`reverse`（倒着运行）时，缓动函数也将是相反的。例如，当指定的缓动函数为`ease-in`，倒着运行时缓动函数为`ease-out`。

 - 名称：`animation-direction`
 - 取值：`<single-animation-direction> [ ‘,’ <single-animation-direction> ]*`
 - 初始值：`normal`
 - 应用于：所有元素，`::before`和`::after`伪元素
 - 继承：无
 - 可否动画：否
 - 百分比：`N/A`
 - 媒体：视觉
 - 计算值：指定的值

其中：

```c
<single-animation-direction> = normal | reverse | alternate | alternate-reverse
```

属性值的意义：

**normal**
动画的所有迭代按着指定的运行

**reverse**
动画的所有迭代按着定义的相反方向来运行

**alternate**
动画周期在奇数次按着`normal`方向运行，偶数次按着`reverse`方向运行。也就是交替运行

**alternate-reverse**
这个和`alternate`相反。奇数次按着`reverse`方向运行，偶数次按着`normal`方向运行

### 4.7 `animation-play-state`属性

`animation-play-state`属性定义了动画是否运行还是暂停。一个运行中的动画可以通过设置该属性为`pasued`。为了继续运行这个暂停的动画可以设置该属性为`running`。一个暂停的动画将继续处于静止状态显示动画的当前值，就好像动画的时间是常数。当已暂停的动画被恢复，它从当前值重新启动，而没必要从动画的开始。

 - 名称：`animation-play-state`
 - 取值：`<single-animation-play-state> [ ‘,’ <single-animation-play-state> ]*`
 - 初始值：`running`
 - 应用于：所有元素，`::before`和`::after`伪元素
 - 继承：无
 - 可否动画：否
 - 百分比：`N/A`
 - 媒体：视觉
 - 计算值：指定的值

其中：

```c
<single-animation-play-state> = running | paused
```

### 4.8 `animation-delay`属性

`animation-delay`属性定义了动画什么时候开始。它允许动画开始执行一段时间（就是延迟一段时间执行）后在它被应用之后。当`animation-delay`的值为`0s`，意味着动画会在被应用后立即执行。否则，该值指定了从动画被应用时刻的偏移，以及动画将用该偏移延迟执行。

如果`animation-delay`的值是负的时间偏移，则动画将在它被应用的时刻执行，但是会出现在指定的偏移开始执行。也就是说，动画会出现从运行周期的一部分开始。

 - 名称：`animation-delay`
 - 取值：`<time> [, <time>]*`
 - 初始值：0s
 - 应用于：所有元素，`::before`和`::after`伪元素
 - 继承：无
 - 可否动画：否
 - 百分比：`N/A`
 - 媒体：视觉
 - 计算值：指定的值

### 4.9 `animation-fill-mode`属性

`animation-fill-mode`属性定义了什么值被应用在动画之外的执行时间。默认情况下，动画不会影响在它被应用的时间和它开始执行的时间之间的属性值。同样，默认情况下动画也不会影响在动画结束后的属性值。`animation-fill-mode`可以覆盖这种行为。

如果`animation-fill-mode`的值为`backwards`，则动画会应用在定义在动画第一个迭代开始的关键帧的属性值，在定义在`animation-delay`的时间之间。

如果`animation-fill-mode`的值为`forwards`，则在动画结束后，动画将应用在动画结束后的属性值。

如果`animation-fill-mode`的值为`both`，则动画会遵循`backwards`和`forwards`的规则。也就是说，它会扩展两个方向的动画属性。

 - 名称：`animation-fill-mode`
 - 取值：`<single-animation-fill-mode> [ ‘,’ <single-animation-fill-mode> ]*`
 - 初始值：`none`
 - 应用于：所有元素，`::before`和`::after`伪元素
 - 继承：无
 - 可否动画：否
 - 百分比：`N/A`
 - 媒体：视觉
 - 计算值：指定的值

其中：

```c
<single-animation-fill-mode> = none | forwards | backwards | both
```

### 4.10 `animation`简写属性

`animation`属性是一个逗号分隔的动画定义列表，其中结合了7个动画属性成单个组件的值。

 - 名称：`animation`
 - 取值：`<single-animation> [ ‘,’ <single-animation> ]*`
 - 初始值：看单个属性的初始值
 - 应用于：所有元素，`::before`和`::after`伪元素
 - 继承：无
 - 可否动画：否
 - 百分比：`N/A`
 - 媒体：视觉
 - 计算值：看单个属性

其中：

```c
<single-animation> = <single-animation-name> || <time> || <single-animation-timing-function> || <time> || <single-animation-iteration-count> || <single-animation-direction> || <single-animation-fill-mode> || <single-animation-play-state>
```

要注意，在每个动画定义中顺序是非常重要的：第一个`<time>`值被赋给`animation-duration`，第二个`<time>`值赋给`animation-delay`。

## 5 动画事件

事件相关可以自己看文档啦：http://www.w3.org/TR/css3-animations/#animation-events

这里说下动画的三个事件：

 - animationStart：发生在动画开始
 - animationEnd：发生在动画结束
 - animationiteration：发生在动画每个迭代的结束