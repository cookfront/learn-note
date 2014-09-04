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

## fs.statSync(path)

该方法是`fs.stat()`的同步版本。

## fs.lstat(path, callback)




