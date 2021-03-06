CSS3 will-change
========

`will-change`属性允许我们提前通知浏览器你将应用什么样类型的改变到元素，从而让浏览器提前优化如何处理该元素。

使用`will-change`，你可以允许浏览器为一些将来要发生的确定的改变做好准备。这使得它可以做适当的优化，从而当这些改变发生的时候，它能更快地渲染页面，因此避免了一个不小的启动成本，因为这可能对一个页面的响应产生负面影响。使用`will-change`，当改变发生时，页面更新将会变的更快。

然而，设置元素在一个新的`层`中是一个相对昂贵的操作，它会通过明显的几分之一秒延迟`transform`动画的开始。

为了在使用CSS变换和其他CSS操作时避免这种延迟，我们长期使用`translateZ`（或有时`translate3D`）以促进元素自身的层，从而实现了运行顺畅和更快的无故障硬件加速操作。然而，这种技术－也被称为`translateZ()或translate3d() Hack`－是有代价的。`Paul Lewis`写了关于这种技术一篇[非常有信息量的文章](http://aerotwist.com/blog/on-translate3d-and-layer-creation-hacks/)，如果你使用这种技术，你一定要看看。`will-change`在这里允许我们优化我们的动画而无需求助于这种技术，或任何其他的。

你可以告诉浏览器你的意图是改变元素的滚动位置、它的内容，或一个或更多CSS属性值通过指定属性值的名称，这些通过逗号来分隔。大多数属性在被指定后将不起作用，因为用户代理不为大多数属性的改变进行任何特殊的优化。当指定它们仍然是安全的，尽管没有任何效果。

如果你希望或计划改变一个元素的多个值/方面，可以提供用逗号分隔值的列表。以逗号分隔值的列表可以包括预定义的关键字和/或属性名称。

如果你声明的一个属性的任何非初始值会在元素上创建一个堆栈上下文，在`will-change`中指定那个属性也必须在元素上创建一个堆栈上下文。例如，设置`opacity`为任何其他除了1的值会在元素上创建一个堆栈上下文。因此，设置`will-change: opacity`同样会创建一个堆栈上下文，尽管`opacity`目前仍然是1。

同样地，如果一个属性的任何非初始值会导致该元素产生一个包含块用在固定位置的元素，在`will-change`中指定该属性也必须导致元素产生一个包含块用在固定位置的元素。

当在元素上指定`will-change`属性时，没有直接的影响，它完全是对于用户代理的一个渲染暗示，允许在某些类型的改变之前建立了潜在的、代价高昂的优化的实际变化开始出现。