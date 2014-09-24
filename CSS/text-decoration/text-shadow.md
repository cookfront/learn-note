text-shadow
========

`text-shadow`属性用于指定文本的阴影。可以通过逗号分隔的列表指定一个或多个阴影。当定义多个阴影时，是从`front-to-back`的，也就是第一个指定的阴影在上面。

语法：

```c
text-shadow: none | [<shadow>,]* <shadow>
	where <shadow> is: [ <color>? <offset-x> <offset-y> <blur-radius>? | <offset-x> <offset-y> <blur-radius>? <color>? ]
```

属性值和[box-shadow](https://github.com/cookfront/learn-note/blob/master/CSS/border/box-shadow.md)一样，只是没有了内阴影和阴影扩展半径。