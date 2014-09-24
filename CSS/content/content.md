content
========

`content`属性是和`::before`和`::after`伪元素一起使用，在元素内生成内容。

语法：

```c
content: normal | none | [ <string> | <uri> | <counter> | attr(<identifier>) | open-quote | close-quote | no-open-quote | no-close-quote ]+ | inherit
```

 - 初始值：normal
 - 应用于：::before和::after伪元素
 - 继承：无

```c
content: normal                                /* Keywords that cannot be combined with other values */
content: none

content: 'prefix'                              /* <string> value, non-latin characters must be encoded e.g. \00A0 for &nbsp; */
content: url(http://www.example.com/test.html) /* <uri> value */
content: chapter_counter                       /* <counter> values */
content: attr(value string)                    /* attr() value linked to the HTML attribute value */
content: open-quote                            /* Language- and position-dependant keywords */
content: close-quote
content: no-open-quote
content: no-close-quote

content: open-quote chapter_counter            /* Except for normal and none, several values can be used simultaneously */

content: inherit
```

