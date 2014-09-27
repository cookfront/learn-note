animation-direction
========

`animation-direction`属性用来指定元素动画播放的方向，默认值为`normal`，如果设置为`normal`时，动画的每次循环都是向前播放。

语法：

```c
animation-direction: <single-animation-direction> [ ‘,’ <single-animation-direction> ]*
<single-animation-direction> = normal | reverse | alternate | alternate-reverse
```

 - 初始值：normal
 - 应用于：所有元素以及::before和::after伪元素
 - 继承：无

属性值的意义：

 - normal：动画每次从0%开始播放到100%
 - reverse：动画每次从100%开始播放到0%
 - alternate：动画的奇数次从0%开始播放到100%，偶数次从100%开始播放到0%
 - alternate-reverse：动画的奇数次从100%开始播放到0%，偶数次从0%开始播放到100%

实例：

```c
<style>
#demo {
	width: 100px;
	height: 100px;
	background: red;
	position: relative;
	-webkit-animation-name: test;
	-webkit-animation-duration: 5s;
	-webkit-animation-iteration-count: 2;
	-webkit-animation-direction: alternate-reverse;
}
@-webkit-keyframes test {
	0% {
		left: 0px;
	}
	50% {
		left: 100px;
		background: blue;
	}
	100% {
		left: 120px;
		background: yellow;
	}
}
</style>

<div id="demo">
</div>
```

