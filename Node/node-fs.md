Node.js fs 模块
========

## fs.rename(oldPath, newPath, callback)

该方法用于重命名一个路径，可以是文件也可以是目录。

重命名一个文件：

```c
var fs = require('fs');

fs.rename('./event', './eventemitter', function (err) {
	if (err) {
		throw new Error('rename file error!');
	}
});
```

重命名一个目录：

```c
var fs = require('fs');

fs.rename('./dirname', './newDirname', function (err) {
	if (err) {
		throw new Error('rename file error!');
	}
});
```

## fs.renameSync(oldPath, newPath)

这个方法是上面`rename()`的同步版本，只需要传入两个参数即可。


## fs.ftruncate(fd, len, callback)

首先应该说明下这里的参数`fd`，其实它的全称是`file descriptor`，中文名`文件描述符`。可以看下维基中关于[文件描述符](http://zh.wikipedia.org/zh/%E6%96%87%E4%BB%B6%E6%8F%8F%E8%BF%B0%E7%AC%A6)的解释。

那怎么得到一个`fd`呢？通过`fs.open`就可以得到一个文件描述符。这个函数得作用就是对打开得文件描述符进行截断。

```c
var fs = require('fs');

fs.open('./test.txt', 'r+', function (err, fd) {
	if (err) {
		throw new Error();
	}
	fs.ftruncate(fd, 2, function (err) {
		if (err) {
			throw new Error('ftruncate file error');
		}
		console.log('ftruncate complete');
	});
});
```

## fs.ftruncateSync(fd, len)

这个方法是`fs.ftruncate()`的同步版本。

## fs.truncate(path, len, callback)

这个相对于上面的`fs.ftruncate()`的区别是只要直接传入一个路径就可以了。完成时的回调函数(callback)只接受一个参数：可能出现的异常信息。

```c
var fs = require('fs');

fs.truncate('./test.txt', 2, function (err) {
	if (err) {
		throw new Error('truncate error');
	}
	console.log('truncate complete');
});
```

## fs.truncateSync(path, len)

这个是`fs.truncate()`同步版本。

## fs.stat(path, callback)

该方法用于获取一个路径的有关信息，`callback`接受两个参数：`(err, stats)`，其中`stats`是一个[fs.Stats](http://nodejs.org/api/fs.html#fs_class_fs_stats)对象。它是类似下面这样的：

```c
{ dev: 16777218,
  mode: 33188,
  nlink: 1,
  uid: 501,
  gid: 20,
  rdev: 0,
  blksize: 4096,
  ino: 8031654,
  size: 2,
  blocks: 8,
  atime: Wed Sep 03 2014 21:30:14 GMT+0800 (CST),
  mtime: Wed Sep 03 2014 21:30:12 GMT+0800 (CST),
  ctime: Wed Sep 03 2014 21:30:12 GMT+0800 (CST) }
```

`fs.Stats`对象上还有一些方法：

 - stats.isFile()
 - stats.isDirectory()
 - stats.isBlockDevice()
 - stats.isCharacterDevice()
 - stats.isSymbolicLink() (仅在与 fs.lstat()一起使用时合法)
 - stats.isFIFO()
 - stats.isSocket()

## fs.statSync(path)

该方法是`fs.stat()`的同步版本。

## fs.lstat(path, callback)

回调函数`callback`接收两个参数：`(err, stats)`其中`stats`是一个[fs.Stats](http://nodejs.org/api/fs.html#fs_class_fs_stats)对象。 `lstat()`与 `stat()`相同，区别在于： 若`path`是一个符号链接时（symbolic link）,读取的是该符号链接本身，而不是它所链接到的文件。

## fs.lstatSync(path)

`fs.lstat()`的同步版本。

## fs.fstat(fd, callback)

这个方法和`stat()`作用相同，但是传入的第一个参数是文件描述符（file descriptor）。

实例：

```c
var fs = require('fs');

fs.open('./test.txt', 'r+', function (err, fd) {
	if (err) {
		throw new Error('file open error');
	}
	fs.fstat(fd, function (err, stats) {
		if (err) {
			throw new Error('fstat error');
		}
		console.log(stats);
	});
});
```

## fs.fstatSync(fd)

`fs.fstat()`的同步版本。

## fs.link(srcpath, dstpath, callback)

该方法是为`srcpath`创建一个`dstpath`的硬连接，回调函数`callback`只接受一个参数：可能出现的异常信息。

关于硬连接和软连接还请移步：[理解 Linux 的硬链接与软链接](http://www.ibm.com/developerworks/cn/linux/l-cn-hardandsymb-links/)

实例：

```c
var fs = require('fs');

fs.link('test.txt', 'test.txt.link', function (err) {
	if (err) {
		throw new Error('link error');
	}
});
```

## fs.linkSync(srcpath, dstpath)

`fs.link()`的同步版本。

## fs.symlink(srcpath, dstpath, [type], callback)

该方法是为`srcpath`创建一个`dstpath`的软连接，回调函数`callback`只接受一个参数：可能出现的异常信息。

`type`可以是 `dir`， `file`, 或者`junction` (默认是 `file`)，此参数仅用于 Windows 系统（其他系统平台会被忽略）。 注意： Windows 系统要求目标路径（译者注：即`dstpath`参数）必须是一个绝对路径，当使用`junction`时，`dstpath`参数会自动转换为绝对路径。

实例：

```c
var fs = require('fs');

fs.symlink('test.txt', 'test.txt.link', function (err) {
	if (err) {
		throw new Error('link error');
	}
});
```

## fs.symlinkSync(srcpath, dstpath, [type])

`fs.symlink()`的同步版本。

## fs.readlink(path, callback)

该方法用于读取`path`（path为一个`symbolic link`）所链接的文件。只能用于软连接的文件。

实例：

```c
var fs = require('fs');

fs.readlink('test.txt.link', function (err, linkString) {
	if (err) {
		throw new Error('read link error');
	}
	console.log(linkString);	// test.txt
});
```

## fs.readlinkSync(path)

同步版的`fs.readlink()`。

## fs.realpath(path, [cache], callback)

该方法是将相对地址的`path`转换为绝对地址。`callback`接受两个参数：`err`-错误消息、`resolvePath`-解析出的绝对路径。

`cache`是一个对象直接量，是各个相对地址到绝对地址的映射。

实例：

```c
var fs = require('fs');

fs.realpath('../Node', function (err, resolvePath) {
	if (err) {
		throw new Error('resolve path error');
	}
	console.log(resolvePath);
});
```

## fs.realpathSync(path, [cache])

同步版的`fs.realpath()`。

## fs.unlink(path, callback)

该方法用于删除一个文件。`callback`接受一个参数：可能的异常信息。

实例：

```c
var fs = require('fs');

fs.unlink('./test.txt', function (err) {
	if (err) {
		throw new Error('resolve path error');
	}
});
```

## fs.unlinkSync(path)

同步版的`fs.unlink()`。

## fs.rmdir(path, callback)

该方法用于删除一个路径，`callback`接受一个参数：可能的异常信息。

> 注意：这个方法只能删除一个空目录。也就是说如果目录中包含文件，调用这个方法时将抛出异常。

实例：

```c
var fs = require('fs');

fs.rmdir('./test', function (err) {
	if (err) {
		throw new Error('rmdir error');
	}
});
```

## fs.rmdirSync(path)

同步版的`fs.rmdir()`。

## fs.mkdir(path, [mode], callback)

该方法用于创建一个目录，`callback`接受一个参数：可能的异常信息。文件`mode`默认为`0777`。

实例：

```c
var fs = require('fs');

fs.mkdir('./test', '0755', function (err) {
	if (err) {
		throw new Error('mkdir error');
	}
});
```

## fs.mkdirSync(path, [mode])

同步版的`fs.mkdir()`。

## fs.readdir(path, callback)

该方法用于读取一个目录。`callback`接受两个参数：`(err, files)`其中`files`是一个存储目录中所包含的文件名称的数组，数组中不包括 `.` 和 `..`。

实例：

```c
var fs = require('fs');

fs.readdir('./test', function (err, files) {
	if (err) {
		throw new Error('mkdir error');
	}
	files.forEach(function (file, i) {
		console.log(file);
	});
});
```

## fs.readdirSync(path)

同步版的`fs.readdir()`。

## fs.close(fd, callback)

该方法用于关闭一个文件描述符，完成时的回调函数(callback)只接受一个参数:可能出现的异常信息。

实例：

```c
var fs = require('fs');

fs.open('./test.txt', 'r+', function (err, fd) {
	if (err) {
		throw new Error('open file error');
	}
	fs.close(fd, function (err) {
		if (err) {
			throw new Error('close file error');
		}
		console.log('close complete');
	});
})
```

## fs.closeSync(fd)

同步版的`fs.close()`。

## fs.open(path, flags, [mode], callback)

该方法用于打开一个文件，`path`为文件路径，`flags`为打开的标识。具体可以看官网的：[fs.open()](http://nodejs.org/documentation/api/)。

参数`mode`用于设置文件模式 (permission and sticky bits), 不过前提是这个文件是已存在的. 默认情况下是`0666`, 有可读和可写权限.

该`callback`接收两个参数`(err, fd)`。

实例：

```c
var fs = require('fs');

fs.open('./test.txt', 'r+', function (err, fd) {
	if (err) {
		throw new Error('open file error');
	}
	console.log('open complete');
});
```

## fs.openSync(path, flags, [mode])

同步版的`fs.open()`。

## fs.utimes(path, atime, mtime, callback)/fs.utimesSync(path, atime, mtime)

更改 path 所指向的文件的时间戳。

关于上面的`atime`和`mtime`看这里：[linux中ctime,mtime,atime的区别](http://jianjian.blog.51cto.com/35031/103231)

## fs.futimes(fd, atime, mtime, callback)/fs.futimesSync(fd, atime, mtime)

更改文件描述符 (file discriptor) 所指向的文件的时间戳。

## fs.fsync(fd, callback)

该方法写入所有与特定文件描述符相关的缓冲区数据。

关于[unix sync](http://zh.wikipedia.org/wiki/Sync_%28Unix%29)

## fs.fsyncSync(fd)

同步版的`fs.fsync()`。

## fs.write(fd, buffer, offset, length[, position], callback)

通过文件描述符`fd`，向指定的文件中写入`buffer`。

`offset`和`length`可以确定从哪个位置开始写入`buffer`，写入多少`buffer`。

`position`是参考当前文档光标的位置，然后从该处写入数据。如果typeof position !== 'number'，那么数据会从当前文档位置写入，请看pwrite(2)。

`callback`接受三个参数：`(err, written, buffer)`，第一个参数为错误信息，`written`为从`buffer`写入的字节数。

实例：

```c
var fs = require('fs');

var buffer = new Buffer('something');

fs.open('./test.txt', 'r+', function (err, fd) {
	if (err) {
		throw new TypeError();
	}
	fs.write(fd, buffer, 2, 5, 2, function (err, written, buffer) {
		if (err) {
			throw new TypeError();
		}
		console.log(written);
		console.log(buffer.toString());
	})
});
```

## fs.write(fd, data[, position[, encoding]], callback)

这个其实和上面的差不多，只是参数略有不同，这里的`data`如果不是一个`buffer`对象，则会强制转换成一个字符串。`position`是参考当前文档光标的位置，然后从该处写入数据。`encoding`是预期得到一个字符串编码。回调函数的参数还是和上面一样。

实例：

```c
var fs = require('fs');

fs.open('./test.txt', 'r+', function (err, fd) {
	if (err) {
		throw new TypeError();
	}
	fs.write(fd, 'something', 2, 'utf8', function (err, written, buffer) {
		if (err) {
			throw new TypeError();
		}
		console.log(written);
		console.log(buffer.toString());
	})
});
```

## fs.writeSync(fd, buffer, offset, length[, position])/fs.writeSync(fd, data[, position[, encoding]])

这两个方法为上面`fs.write()`的同步版本。

## fs.read(fd, buffer, offset, length, position, callback)

该方法从指定的文件描述符读取文件数据。`buffer`是缓冲区，数据将会写入到这里。`offset`是向缓冲区写入数据时的偏移量。`length`是一个整形值，指定了读取的字节数。`position`是一个整形值，指定了从哪里开始读取文件，如果`position`为`null`，将会从文件当前的位置读取数据。`callback`给定了三个参数：`(err, bytesRead, buffer)`分别是错误消息、读取的字节数和缓冲区。

实例：

```c
var fs = require('fs');

var buf = new Buffer(4);

fs.open('./test.txt', 'r+', function (err, fd) {
	if (err) {
		throw new TypeError();
	}
	fs.read(fd, buf, 0, 4, 0, function (err, bytesRead, buf) {
		console.log(bytesRead, buf.toString());
	});
});
```

## fs.readSync(fd, buffer, offset, length, position)

`fs.read()`的同步版本。

## fs.readFile(filename, [options], callback)

该方法用于读取文件，和上面`fs.read()`不同的是只要传入一个文件名即可。`filename`即为读取的文件名。`options`支持以下参数：

 - encoding：读取的编码
 - flag：读取的标识，默认为`r`。

回调函数`callback`给定了两个参数：`(err, data)`，其中`data`为读取文件的内容，如果未指定编码，则会返回原生的`buffer`。

实例：

```c
var fs = require('fs');

fs.readFile('./test.txt', {encoding: 'utf8'}, function (err, data) {
	if (err) {
		throw new TypeError();
	}
	console.log(data);
});
```

如果这里没有传入`{encoding: 'utf8'}`可以看看控制台输出的数据：

```c
<Buffer 61 62 63 20 64 65 67 68 69 20 6a 6b>
```

这个就是返回的原生`buffer`数据啦。

## fs.readFileSync(filename, [options])

`fs.readFile()`的同步版本。

## fs.writeFile(filename, data, [options], callback)

该方法向文件中写入数据。如果文件原先存在的话，会被替换。

参数解析：

 - filename：写入数据的文件名
 - data：写入的数据
 - [options]：可选参数，
	 - encoding：编码
	 - mode：默认为`438`
	 - flag：默认为`w`
 - callback：回调函数只接受一个参数`err`

`data`可以是一个`string`，也可以是一个原生`buffer`。

`encoding`选项会被忽视如果`data`不是`string`而是原生`buffer`。`encoding`缺省为`utf8`。

实例：

```c
var fs = require('fs');

var buf = new Buffer('something');

fs.writeFile('./aa.txt', buf, function (err) {
	if (err) {
		throw new TypeError();
	}
	console.log('write file complete');
});
```

## fs.writeFileSync(filename, data, [options])

`fs.writeFile()`的同步版本。

## fs.appendFile(filename, data, [options], callback)

该方法用于将数据添加到一个文件的尾部。如果文件不存在，则会创建一个新的文件。

参数解析：

 - filename：添加数据的文件名
 - data：添加的数据
 - [options]：添加数据时的选项
	 - encoding
	 - mode
	 - flag
 - callback：回调函数也只需要给定一个参数`err`

`data`可以是一个`string`，也可以是一个原生`buffer`。

实例：

```c
var fs = require('fs');

fs.appendFile('./test.txt', 'data to be appended', function (err) {
	if (err) {
		throw new TypeError();
	}
	console.log('append complete');
});
```

## fs.appendFileSync(filename, data, [options])

`fs.appendFile()`的同步版本。

## fs.exists(path, callback)

检查指定路径的文件或者目录是否存在。接着通过 callback 传入的参数指明存在 (true) 或者不存在 (false)。

实例：

```c
var fs = require('fs');

fs.exists('./test.txt', function (exists) {
	console.log(exists);
});
```

## fs.existsSync(path)

`fs.exists()`的同步版本。

## fs.createReadStream(path, [options])

返回一个新的 ReadStream 对象。

## fs.createWriteStream(path, [options])

返回一个新的 WriteStream 对象。

