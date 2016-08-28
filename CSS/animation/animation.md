animation
========

`animation`属性是一个简写属性。

它接受一个或多个逗号分隔的值，其中每一个值使用普通动画属性调用并控制一个`@keyframes`动画。例如：

```css
/* syntax of one animation definition */
animation: [animation-name] [animation-duration] [animation-timing-function] [animation-delay] [animation-iteration-count] [animation-fill-mode];

/* two animation definitions */
animation: [animation-name] [animation-duration] [animation-timing-function] [animation-delay] [animation-iteration-count] [animation-fill-mode],
           [animation-name] [animation-duration] [animation-timing-function] [animation-delay] [animation-iteration-count] [animation-fill-mode];
```

普通动画属性是用空格分开的，它们的顺序不重要，但是当你同时使用`animation-duration`和`animation-delay`时，它们必须是语法中的顺序。所以当你定义了两个`<time>`时，第一个代表了`animation-duration`，第二个代表`animation-delay`。

任何你没有明确设置的值，都会使用它的默认值。这就是为什么你必须指定一个`animation-name`，否则将不会有任何动画被执行。如果你没有设置`animtion-duration`，它的默认值将会是`0s`，这会使动画立即执行，因此`keyframe`没有任何效果。

## 语法

- 语法：

```css
animation: <single-animation> [ ‘,’ <single-animation> ]*
<single-animation> = <single-animation-name> || <single-animation-duration> || <single-animation-timing-function> || <single-animation-delay> || <single-animation-iteration-count> || <single-animation-direction> || <single-animation-fill-mode> || <single-animation-play-state>
```

- 应用于：任何元素，和`::before`和`::after`伪元素

## 示例

```css
/* one animation */
animation: bounce .3s ease-in-out 1s infinite;
animation: rotate-out 1s steps(3, end);
animation: .3s ease 1s reverse open-up;

/* multiple animations */
animation: shake .3s alternate,
           jump 1s cubic-bezier(.17,.67,.85,.06) alternate;
```


