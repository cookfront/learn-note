font-size
========

`font-size`属性用来指定字体的大小，表示来自于字体的期望高度。

 - 取值：	<绝对字号> | <相对字号> | <长度> | <百分比>
 - 初始值：medium
 - 应用于：所有元素
 - 继承：yes
 - 百分比：相对于父元素的字号
 - 计算值：绝对长度

其属性值意义如下：

 - 绝对字号：关键字是指由用户代理所计算并保存的字号表中的一个条目。可能的值包括：[ xx-small | x-small | small | medium | large | x-large | xx-large ]
 - 相对字号：关键字相对于字号表和父元素的字号进行解释。可能的值包括：
[ larger | smaller ]
 - 长度：长度值指定一个绝对字号（其独立于用户代理的字体表）。负长度是非法的。
 - 百分比：百分比值指定一个相对于其父元素字号的绝对字号。

实例：

```c
font-size: xx-small  /* <absolute-size> values */
font-size: x-small
font-size: small
font-size: medium
font-size: large
font-size: x-large
font-size: xx-large

font-size: larger    /* <relative-size> values */
font-size: smaller

font-size: 12px      /* <length> values */
font-size: 0.8em

font-size: 80%       /* <percentage> values */

font-size: inherit
```

还有一个特殊的`em`单位：

`em`的值是动态的。当定义了`font-size`属性时，一个`em`等于应用于父元素字体的大小。如果你在页面中没有设置任何字体大小，那么就是浏览器默认的的字体大小，可能是`16px`。所以，默认情况下`1em = 16px`。如果你在`body`元素上面设置了字体大小为`20px`时，则`1em = 20px`。

所以可以得出计算`em`的公式：

```c
em = desired element pixel value / parent element font-size in pixels
```

例如，如果在默认情况下，`1em`为`16px`，如果我们要设置`12px`的字体，我们可以使用`12/16 = 0.75`，即0.75em。

实例：

```c
body {
  font-size: 62.5%; /* font-size 1em = 10px */
}
p {
  font-size: 1.6em; /* 1.6em = 16px */
}
```

