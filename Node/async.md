Async.js 使用指南
========

## Collections

### each(arr, iterator, callback)

这个方法是将`iterator`应用到`arr`中的每一个元素，当所有执行完再调用`callback`。当在`iterator`中传入`error`到`callback`时，`callback`会立即执行。

参数：

 - arr：需要遍历的数组
 - iterator(item, callback)：遍历数组元素的函数
 - callback(err)：当遍历完成或者发生错误时调用

实例：

```c
var async = require('async');
var fs = require('fs');

fs.readdir('./bufferconcat', function (err, files) {
  async.each(files, function (file, callback) {
    if( file.length > 32 ) {
      console.log('This file name is too long');
      callback('File name too long');
    } else {
      // Do work to process file here
      console.log('File processed');
      callback();
    }
  }, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('read file');
    }
  });
});
```

### eachSeries(arr, iterator, callback)

这个方法的作用和上面的`each()`一样，唯一的区别就是下一个`iterator`只有在当前的`iterator`执行完后才会执行。也就是序列的执行。

参数：

 - arr：需要遍历的数组
 - iterator(item, callback)：遍历数组元素的函数
 - callback(err)：当遍历完成或者发生错误时调用

这个序列执行可以从其源代码中体现出来：

```c
async.eachSeries = function (arr, iterator, callback) {
    callback = callback || function () {};
    if (!arr.length) {
        return callback();
    }
    var completed = 0;
    var iterate = function () {
        iterator(arr[completed], function (err) {
            // 有错误时执行错误
            if (err) {
                callback(err);
                callback = function () {};
            }
            else {
                completed += 1;
                // 迭代完成，执行callback
                if (completed >= arr.length) {
                    callback();
                }
                // 执行下一个iterate
                else {
                    iterate();
                }
            }
        });
    };
    iterate();
};
```

### eachLimit(arr, limit, iterator, callback)

这个方法也和`each`类似，只是控制了迭代时同时`iterator`的个数为`limit`，也就是说同一时间只能执行`limit`个`iterator`。

参数：

 - arr：需要遍历的数组
 - limit：`iterator`迭代的最大个数
 - iterator(item, callback)：遍历数组元素的函数
 - callback(err)：当遍历完成或者发生错误时调用

实例：

```c
var async = require('async');
var fs = require('fs');

fs.readdir('./bufferconcat', function (err, files) {
  var count = 0;
  async.eachLimit(files, 2, function (file, callback) {
    if( file.length > 32 ) {
      console.log('This file name is too long');
      callback('File name too long');
    } else {
      // Do work to process file here
      console.log('File processed' + count++);
      callback();
    }
  }, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('read file');
    }
  });
});
```

### map(arr, iterator, callback)

`map`与`each`的区别就是`map`会将最后的迭代`results`作为`callback`的第二个参数。

参数：

 - arr：需要遍历的数组
 - iterator(item, callback)：遍历数组元素的函数
	 - callback(err, transformed)：必须执行一次
 - callback(err, results)：当遍历完成或者发生错误时调用

实例：

```c
var async = require('async');
var fs = require('fs');

fs.readdir('./bufferconcat', function (err, files) {
  var count = 0;
  async.map(files, function (file, callback) {
    callback(null, file);
  }, function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.log(results);
    }
  });
});
```

### mapSeries(arr, iterator, callback)
### mapLimit(arr, limit, iterator, callback)

上面两个方法和`eachSeries()`和`eachLimit()`类似，区别是将`results`作为`callback`的第二个参数。

### reduce(arr, memo, iterator, callback)

该方法是和`Array.reduce`一样，`memo`是初始值，最后会将`memo`传入`callback`作为第二个参数。

参数：

 - arr：需要遍历的数组
 - iterator(item, callback)：遍历数组元素的函数
	 - callback(err, reduction)：必须执行一次
 - callback(err, memo)：当遍历完成或者发生错误时调用

实例：

```c
var async = require('async');
var fs = require('fs');

async.reduce([1, 2, 3], 0, function (memo, item, callback) {
  callback(null, memo + item);
}, function (err, memo) {
  if (err) {
    console.log(err);
  } else {
    console.log(memo);
  }
});
```

### reduceRight(arr, memo, iterator, callback)

该方法和`reduce`有一个区别就是会从数组的最后一个元素向前迭代。

### filter(arr, iterator, callback)







