Node Buffer
========

## Buffer对象

`Buffer`对象类似于数组，它的元素是16进制的两位数，即0到255的数值。还有需要注意的是，不同编码的字符串占用的元素个数各不相同。

我们可以通过以下几种方式来创建一个`Buffer`对象：

 - new Buffer(size)
 - new Buffer(array)
 - new Buffer(str, [encoding])

`Buffer`的类方法：

 - Buffer.isEncoding(encoding)：如果给定的编码 encoding 是有效的，返回 true，否则返回 false
 - Buffer.isBuffer(buf)：测试`buf`是否是一个`Buffer`
 - Buffer.byteLength(string, [encoding])：将会返回这个字符串真实byte长度。 `encoding`编码默认是： `utf8`。 这个和`String.prototype.length`是不一样的，因为那个方法返回这个字符串中有几个字符的数量。
	 - string：String类型
	 - encoding：String类型, 可选参数, 默认是: 'utf8'

实例：

```c
var str = '½ + ¼ = ¾';
// 9
console.log(str.length);
// 12
console.log(Buffer.byteLength(str));
```

 - Buffer.concat(list, [totalLength])：返回一个buffer对象，这个buffer对象是传入`list`数组拼接在一起的`buffer`对象。如果传入的数组没有内容，或者`totalLength`参数是0，那将返回一个zero-length的buffer。如果数组中只有一项，那么这第一项就会被返回。如果数组中的项多于一个，那么一个新的Buffer实例将被创建。如果`totalLength`参数没有提供，虽然会从buffer数组中计算读取，但是会增加一个额外的循环来计算它，所以提供一个明确的 totalLength 参数将会更快。
	 - list {Array}数组类型，Buffer数组，用于被连接。
	 - totalLength {Number}类型 上述Buffer数组的所有Buffer的总大小。（译者：注意这里的totalLength不是数组长度是数组里Buffer实例的大小总和）

## buf实例

`buf`实例就是`new Buffer()`

### buf.length

返回buffer的bytes大小。注意这未必是这buffer里面内容的大小。`length`的依据是buffer对象所分配的内存数值，它不会随着这个buffer对象内容的改变而改变。

### buf.write(string, [offset], [length], [encoding])

 - string：String类型 - 将要被写入 buffer 的数据
 - offset：Number类型, 可选参数，写入时的偏移量，默认: 0
 - length：Number类型, 可选参数，默认: buffer.length - offset
 - encoding：String类型, 可选参数, 默认: 'utf8'

根据参数`offset`偏移量和指定的`encoding`编码方式，将参数`string`数据写入`buffer`。 `offset`偏移量 默认是 0, `encoding`编码方式默认是 'utf8'。 length长度是将要写入的字符串的bytes大小。 返回number类型，表示多少8位字节流被写入了。如果buffer 没有足够的空间来放入整个string，它将只会写入部分的字符串。 `length`默认是 `buffer.length - offset`。 这个方法不会出现写入部分字符。

### buf.toString([encoding], [start], [end])

 - encoding String类型, 可选参数, 默认: 'utf8'
 - start Number类型, 可选参数, 默认: 0
 - end Number类型, 可选参数, 默认: buffer.length

根据`encoding`参数（默认是 'utf8'）返回一个解码的 string 类型。还会根据传入的参数 start (默认是0) 和 end (默认是`buffer.length`)作为取值范围。

### buf.toJSON()

返回一个JSON表示的Buffer实例。JSON.stringify将会默认调用来字符串序列化这个Buffer实例。

### buf[index]

获取或者设置在指定index索引位置的8位字节。这个值是指单个字节，所以这个值必须在合法的范围，16进制的0x00 到0xFF，或者0 到255。

### buf.copy(targetBuffer, [targetStart], [sourceStart], [sourceEnd])

 - targetBuffer Buffer 类型对象 - 将要进行拷贝的Buffer
 - targetStart Number类型, 可选参数, 默认: 0
 - sourceStart Number类型, 可选参数, 默认: 0
 - sourceEnd Number类型, 可选参数, 默认: buffer.length

进行buffer的拷贝，源和目标可以是重叠的。`targetStart`目标开始偏移和`sourceStart`源开始偏移 默认都是 0。` sourceEnd`源结束位置偏移默认是源的长度 `buffer.length`。

如果传递的值是`undefined/NaN`或者是`out of bounds`超越边界的，就将设置为他们的默认值。

### buf.slice([start], [end])

 - start Number类型, 可选参数, 默认: 0
 - end Number类型, 可选参数, 默认: buffer.length

返回一个新的buffer，这个buffer将会和老的buffer引用相同的内存地址，只是根据 start (默认是 0) 和end (默认是`buffer.length`) 偏移和裁剪了索引。 负的索引是从buffer尾部开始计算的。

> 注：修改这个新的buffer实例slice切片，也会改变原来的buffer

## Buffer内存分配

不得不说的8kb。

## Buffer转换

### 字符串转Buffer

通过`new Buffer(str, [encoding])`的方式就可以将字符串转换为Buffer。

### Buffer转字符串

```c
buf.toString([encoding], [start], [end])
```

## Buffer拼接




