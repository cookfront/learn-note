counter-increment
========

`counter-increment`属性用给定的值来增加`CSS`计数器的值，计数器的值也可以通过`counter-reset`属性来充值。

语法：

```c
counter-increment: [<user-ident> <integer>?]+ | none
```

 - 初始值：none
 - 应用于：所有元素
 - 继承：无

属性值的意义：

 - `<user-ident>`：计数器的名称
 - `<integet>`：定义计算器每次增加的数值，可以为负值

实例：

```c
counter-increment: counter-name        /* Increment counter-name by 1 */
counter-increment: counter-name -1     /* Decrement counter-name by 1 */
counter-increment: counter1 counter2 -4 /* Increment counter1 by 1, and decrement counter2 by 4 */

counter-increment: none                /* Do not increment/decrement anything: used to hide less specific values */ 

counter-increment: inherit
```

更多实例还请拜读大漠的：[CSS counters](http://www.w3cplus.com/css3/css-counters.html)