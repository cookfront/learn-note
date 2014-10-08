Node Buffer
========

`Buffer`是一个全局的类，所以你在使用时不需要`require('buffer')`。

## 新建一个buffer

 - new Buffer(size)
 - new Buffer(str, [encoding])

在创建一个`buffer`时，不得不说的就是`8kb`，这个也可以 从`node`的源码反映出：

```c
Buffer.poolSize = 8 * 1024;
```

具体点说就是当我们实例化一个新的Buffer类，会根据实例化时的大小去申请内存空间，如果需要的空间小于8KB，则会多一次判定，判定当前的8KB载体剩余容量是否够新的buffer实例，如果够用，则将新的buffer实例保存在当前的8KB载体中，并且更新剩余的空间。如果不够用则重新内存。还有一种情况是，当需要超过8KB的Buffer对象，将会直接以对象大小申请内存，而不会去判断8KB中剩余或者重新创建一个8KB的`pool`。

可以看看源代码：

```c
// 8KB
Buffer.poolSize = 8 * 1024;
// 全局对象保存pool的大小，偏移，当前的pool
var poolSize, poolOffset, allocPool;

// 创建一个pool
function createPool() {
  poolSize = Buffer.poolSize;
  // 更新pool
  allocPool = alloc({}, poolSize);
  // 偏移为0
  poolOffset = 0;
}
// 初始化时新建一个pool
createPool();


function Buffer(subject, encoding) {
  // this是否为Buffer，如果不是则实例化一个
  // 实际就是判断buf instanceof Buffer
  if (!util.isBuffer(this))
    return new Buffer(subject, encoding);
  
  // 如果subject为数字
  // new Buffer(size)
  if (util.isNumber(subject))
    this.length = subject > 0 ? subject >>> 0 : 0;
  // 如果subject为字符串
  // new Buffer(string, [encoding])
  else if (util.isString(subject))
    this.length = Buffer.byteLength(subject, encoding = encoding || 'utf8');
  // 如果subject为对象
  // 通过buf.toJSON()返回的是
  // {
  //   type: 'Buffer',
  //   data: Array.prototype.slice.call(this, 0)
  // }
  else if (util.isObject(subject)) {
    if (subject.type === 'Buffer' && util.isArray(subject.data))
      subject = subject.data;

    this.length = +subject.length > 0 ? Math.floor(+subject.length) : 0;
  // 否则抛出异常
  } else
    throw new TypeError('must start with number, buffer, array or string');

  // 如果length大于kMaxLength抛出异常
  if (this.length > kMaxLength) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength.toString(16) + ' bytes');
  }

  if (this.length <= (Buffer.poolSize >>> 1) && this.length > 0) {
    // 如果length大于当前poolSize剩余空间，则重新申请内存
    if (this.length > poolSize - poolOffset)
      createPool();
    this.parent = sliceOnto(allocPool,
                            this,
                            poolOffset,
                            poolOffset + this.length);
    poolOffset += this.length;
  // 如果this.length > (Buffer.poolSize >>> 1),即4kb，则直接申请内存，而不通过createPool()
  } else {
    alloc(this, this.length);
  }

  if (!util.isNumber(subject)) {
    // 如果subject为string，将subject写入
    if (util.isString(subject)) {
      // In the case of base64 it's possible that the size of the buffer
      // allocated was slightly too large. In this case we need to rewrite
      // the length to the actual length written.
      var len = this.write(subject, encoding);

      // Buffer was truncated after decode, realloc internal ExternalArray
      if (len !== this.length) {
        this.length = len;
        truncate(this, this.length);
      }
    } else {
      if (util.isBuffer(subject))
        subject.copy(this, 0, 0, this.length);
      else if (util.isNumber(subject.length) || util.isArray(subject))
        for (var i = 0; i < this.length; i++)
          this[i] = subject[i];
    }
  }
}
```

## buf相关属性和方法

### buf.length

返回这个`buf`的bytes大小。需要注意的是，这未必是`buf`里面内容的大小。`length`依据的是`buf`对象所分配的内存数值。可以看源代码中这一行：

```c
this.length = Buffer.byteLength(subject, encoding = encoding || 'utf8');
```

它会调用`Buffer.byteLength()`去获取到所分配的内存数值。对于不同的编码，length是不同的，可以看`byteLength()`的源代码：


```c
Buffer.byteLength = function(str, enc) {
  var ret;
  str = str + '';
  switch (enc) {
    case 'ascii':
    case 'binary':
    case 'raw':
      ret = str.length;
      break;
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = str.length * 2;
      break;
    case 'hex':
      ret = str.length >>> 1;
      break;
    default:
      ret = internal.byteLength(str, enc);
  }
  return ret;
};
```

### buf.write(string, [offset], [length], [encoding])

这个方法是向`buf`对象中写入字符。

 - string：将要写入的数据
 - [offset]：在`buf`中的偏移量
 - [length]：将要写入的字符串的bytes大小
 - [encoding]：写入时的编码

例如：

```c
var buf = new Buffer(100);
buf.write('other thing');
console.log(buf.toString());
```

源代码：

```c
var writeWarned = false;
var writeMsg = '.write(string, encoding, offset, length) is deprecated.' +
               ' Use write(string[, offset[, length]][, encoding]) instead.';
Buffer.prototype.write = function(string, offset, length, encoding) {
  // Buffer#write(string);
  if (util.isUndefined(offset)) {
    encoding = 'utf8';
    length = this.length;
    offset = 0;

  // Buffer#write(string, encoding)
  } else if (util.isUndefined(length) && util.isString(offset)) {
    encoding = offset;
    length = this.length;
    offset = 0;

  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0;
    if (isFinite(length)) {
      length = length >>> 0;
      if (util.isUndefined(encoding))
        encoding = 'utf8';
    } else {
      encoding = length;
      length = undefined;
    }

  // XXX legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    if (!writeWarned) {
      if (process.throwDeprecation)
        throw new Error(writeMsg);
      else if (process.traceDeprecation)
        console.trace(writeMsg);
      else
        console.error(writeMsg);
      writeWarned = true;
    }

    var swap = encoding;
    encoding = offset;
    offset = length >>> 0;
    length = swap;
  }

  var remaining = this.length - offset;
  if (util.isUndefined(length) || length > remaining)
    length = remaining;

  encoding = !!encoding ? (encoding + '').toLowerCase() : 'utf8';

  if (string.length > 0 && (length < 0 || offset < 0))
    throw new RangeError('attempt to write outside buffer bounds');

  var ret;
  switch (encoding) {
    case 'hex':
      ret = this.hexWrite(string, offset, length);
      break;

    case 'utf8':
    case 'utf-8':
      ret = this.utf8Write(string, offset, length);
      break;

    case 'ascii':
      ret = this.asciiWrite(string, offset, length);
      break;

    case 'binary':
      ret = this.binaryWrite(string, offset, length);
      break;

    case 'base64':
      // Warning: maxLength not taken into account in base64Write
      ret = this.base64Write(string, offset, length);
      break;

    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = this.ucs2Write(string, offset, length);
      break;

    default:
      throw new TypeError('Unknown encoding: ' + encoding);
  }

  return ret;
};
```

### buf.copy(targetBuffer, [targetStart], [sourceStart], [sourceEnd])

这个方法是向`targetBuffer`中写入内容。

 - targetBuffer：写入内容的Buffer对象
 - targetStart：默认为0，向Buffer对象写入内容开始的位置
 - sourceStart：默认为0
 - sourceEnd：默认为buf.length

实例：

```c
buf1 = new Buffer(26);
buf2 = new Buffer(26);

for (var i = 0 ; i < 26 ; i++) {
  buf1[i] = i + 97; // 97 is ASCII a
  buf2[i] = 33; // ASCII !
}

buf1.copy(buf2, 8, 16, 20);
console.log(buf2.toString('ascii', 0, 25));

// !!!!!!!!qrst!!!!!!!!!!!!
```

### buf.slice([start], [end])

返回一个新的`buffer`，这个`buffer`将会和老的`buffer`引用相同的内存地址，只是根据`start`(默认是 0)和`end`(默认是`buffer.length`) 偏移和裁剪了索引。 负的索引是从`buffer`尾部开始计算的。

实例：

```c
var buf1 = new Buffer(26);

for (var i = 0 ; i < 26 ; i++) {
  buf1[i] = i + 97; // 97 is ASCII a
}

var buf2 = buf1.slice(0, 3);
console.log(buf2.toString('ascii', 0, buf2.length));
buf1[0] = 33;
console.log(buf2.toString('ascii', 0, buf2.length));
```

### buf.toJSON()

返回一个`JSON`表示的`Buffer`实例。

实例：

```c
var buf = new Buffer('test');
console.log(buf.toJSON());
```

源代码：

```c
Buffer.prototype.toJSON = function() {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this, 0)
  };
};
```

### buf.toString([encoding], [start], [end])

该方法根据`encoding`参数返回一个解码的`string`字符串，还会根据传入的参数`start`(默认是0)和`end`(默认是`buffer.length`)作为取值范围。

实例：

```c
var buf = new Buffer('abcd');

console.log(buf.toString('utf8', 2));
```

源代码：

```c
// toString(encoding, start=0, end=buffer.length)
Buffer.prototype.toString = function(encoding, start, end) {
  var loweredCase = false;

  start = start >>> 0;
  end = util.isUndefined(end) || end === Infinity ? this.length : end >>> 0;

  if (!encoding) encoding = 'utf8';
  if (start < 0) start = 0;
  if (end > this.length) end = this.length;
  if (end <= start) return '';

  while (true) {
    switch (encoding) {
      case 'hex':
        return this.hexSlice(start, end);

      case 'utf8':
      case 'utf-8':
        return this.utf8Slice(start, end);

      case 'ascii':
        return this.asciiSlice(start, end);

      case 'binary':
        return this.binarySlice(start, end);

      case 'base64':
        return this.base64Slice(start, end);

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return this.ucs2Slice(start, end);

      default:
        if (loweredCase)
          throw new TypeError('Unknown encoding: ' + encoding);
        encoding = (encoding + '').toLowerCase();
        loweredCase = true;
    }
  }
};
```

## 类方法

### Buffer.isEncoding(encoding)

该方法判断指定的`encoding`是否有效。

实例：

```c
// true
console.log(Buffer.isEncoding('utf8'));
```

源代码：

```c
Buffer.isEncoding = function(encoding) {
  switch ((encoding + '').toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
    case 'raw':
      return true;

    default:
      return false;
  }
};
```

### Buffer.isBuffer(obj)

该方法判断`obj`是否为一个`buffer`对象。

```c
var buf = new Buffer();

// true
console.log(Buffer.isBuffer(buf));
```

原理就是通过`obj instanceof Buffer`来判断的。

### Buffer.byteLength(string, [encoding])

### Buffer.concat(list, [totalLength])
