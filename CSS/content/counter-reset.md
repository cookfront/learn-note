counter-reset
========

`counter-reset`属性用于重置计数器为一个指定的值。

语法：

```c
counter-reset: [<user-ident> <integer>?]+ | none
```

 - 初始值：none
 - 应用于：所有元素
 - 继承：无

属性值的意义：

 - `<user-ident>`：计数器的名称
 - `<integet>`：定义计算器被复位的数值，可以为负值，默认值为0

实例：

```c
counter-reset: counter-name        /* Set counter-name to 0 */
counter-reset: counter-name -1     /* Set counter-name to -1 */
counter-reset: counter1 1 counter2 4 /* Set counter1 to 1, and counter2 to 4 */

counter-reset: none                /* Cancel any reset that could have been set in less specific rules */

counter-reset: inherit
```
