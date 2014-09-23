Node Buffer
========

## Buffer对象

`Buffer`对象类似于数组，它的元素是16进制的两位数，即0到255的数值。还有需要注意的是，不同编码的字符串占用的元素个数各不相同。

我们可以通过以下几种方式来创建一个`Buffer`对象：

 - new Buffer(size)
 - new Buffer(array)
 - new Buffer(str, [encoding])

