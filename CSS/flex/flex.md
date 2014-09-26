flex
========

`flex`属性是一个简写属性，它可以使一个`flex`项改变它的尺寸以填充可用空间的能力。在应用该属性时需要在父元素上应用`display: flex`或`display: inline-flex`。这样子元素就成为了一个伸缩项目。

语法：

```c
flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
```

 - 初始值：取决于独立属性
	 - flex-grow: 0
	 - flex-shrink: 1
	 - flex-basis: auto
 - 应用于：flex项目，以及常规流的伪元素
 - 继承：无

```c
flex: none                                            /* value 'none' case */
flex: <'flex-grow'>                                   /* One value syntax, variation 1 */
flex: <'flex-basis'>                                  /* One value syntax, variation 2 */
flex: <'flex-grow'> <'flex-basis'>                    /* Two values syntax, variation 1 */
flex: <'flex-grow'> <'flex-shrink'>                   /* Two values syntax, variation 2 */
flex: <'flex-grow'> <'flex-shrink'> <'flex-basis'>    /* Three values syntax */

flex: inherit
```