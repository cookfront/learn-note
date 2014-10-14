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

这个方法返回一个新的数组，并将这个数组传入到`callback`中作为参数。对于`iterator`中的`callback`，它只接收一个`true`或`false`的参数。

参数：

 - arr：需要遍历的数组
 - iterator(item, callback)：遍历数组元素的函数
   - callback(truthValue)：必须传入一个`boolean`作为参数执行
 - callback(results)：results为过滤的新数组

实例：

```c
var async = require('async');

async.filter([1, 2, 3, 4], function (item, callback) {
  callback(item === 3);
}, function (results) {
  console.log(results);
});
```

### filterSeries(arr, iterator, callback)

上面的`filter()`不保证执行的顺序，但是`filterSeries()`会保证执行顺序。

### reject(arr, iterator, callback)
### rejectSeries(arr, iterator, callback)

和`filter()`和`filterSeries()`相反。

### detect(arr, iterator, callback)

该方法是找到数组中第一个通过`truth`测试的值，并传入到`callback`做为参数。

参数：

 - arr：需要遍历的数组
 - iterator(item, callback)：遍历数组元素的函数
   - callback(truthValue)：必须传入一个`boolean`作为参数执行
 - callback(result)：result为找到的第一个通过`truth`测试的值

实例：

```c
var async = require('async');

async.detect([1, 2, 3, 4], function (item, callback) {
  callback(item % 2 == 0);
}, function (result) {
  // 2
  console.log(result);
});

async.filter([1, 2, 3, 4], function (item, callback) {
  callback(item % 2 == 0);
}, function (results) {
  // [2, 4]
  console.log(results);
});
```

注意上面`filter`与`detect`的区别。

### detectSeries(arr, iterator, callback)

序列化的`detect()`。

### some(arr, iterator, callback)

如果数组中有一个元素通过`async`测试时，返回`true`，并传入到`callback`作为参数。

参数：

 - arr：需要遍历的数组
 - iterator(item, callback)：遍历数组元素的函数
   - callback(truthValue)：必须传入一个`boolean`作为参数执行
 - callback(result)：result为`true`或`false`

实例：

```c
var async = require('async');

async.some([1, 5, 3, 7], function (item, callback) {
  callback(item % 2 == 0);
}, function (result) {
  console.log(result);
});
```

### every(arr, iterator, callback)

`every`是数组中的每个元素通过`async`测试时返回`true`，并传入`callback`作为参数。

参数：

 - arr：需要遍历的数组
 - iterator(item, callback)：遍历数组元素的函数
   - callback(truthValue)：必须传入一个`boolean`作为参数执行
 - callback(result)：result为`true`或`false`

实例：

```c
var async = require('async');

async.every([1, 5, 3, 7], function (item, callback) {
  callback(item % 2 == 1);
}, function (result) {
  console.log(result);
});
```

### sortBy(arr, iterator, callback)

将数组通过`iterator`来排序。

参数：

 - arr：需要遍历的数组
 - iterator(item, callback)：遍历数组元素的函数
   - callback(err, sortValue)：sortValue为排序的条件
 - callback(err, results)：results为排好序的数组

实例：

```c
var async = require('async');

async.sortBy([19, 5, 23, 7], function (item, callback) {
  callback(null, item);
}, function (err, results) {
  console.log(results);
});
```

### concat(arr, iterator, callback)

该方法是通过`iterator`来遍历`arr`，并将结果组合在一起传入到`callback`中。

参数：

 - arr：需要遍历的数组
 - iterator(item, callback)：遍历数组元素的函数
   - callback(err, results)
 - callback(err, results)：results组合后的数组

实例：

```c
async.concat(['dir1','dir2','dir3'], fs.readdir, function(err, files){
    // files is now a list of filenames that exist in the 3 directories
});
```

### concatSeries(arr, iterator, callback)

序列化的`concat()`。

## Control Flow

### series(tasks, [callback])

该方法会序列化的执行`tasks`数组中的函数，每个函数是上一个函数执行完后才会执行。如果在序列中的任何一个函数传递了一个`error`到`callback`，后面的函数不会再执行，并且`callback`会立即以`error`为参数执行。当`tasks`执行完毕后，`callback`接收一个数组结果作为第二个参数。

`series()`同样可以传入对象代替数组作为参数。每一个属性会作为一个函数运行，同样传入`callback`的结果也是一个对象。这种写法具有更好的可读性。

参数：

 - tasks：数组或对象包含了需要运行的函数，每个函数都会传入一个`callback(result)`作为参数，这个`callback`传入`err`或`result`作为参数。
 - callback(err, results)：可选的回调函数

实例：

```c
async.series([
    function(callback){
        // do some stuff ...
        callback(null, 'one');
    },
    function(callback){
        // do some more stuff ...
        callback(null, 'two');
    }
],
// optional callback
function(err, results){
    // results is now equal to ['one', 'two']
});


// an example using an object instead of an array
async.series({
    one: function(callback){
        setTimeout(function(){
            callback(null, 1);
        }, 200);
    },
    two: function(callback){
        setTimeout(function(){
            callback(null, 2);
        }, 100);
    }
},
function(err, results) {
    // results is now equal to: {one: 1, two: 2}
});
```

### parallel(tasks, [callback])

这个方法与`series()`的区别就是并行执行`tasks`，也就是`tasks`不用等待前一个执行完才能执行。

参数：

 - tasks：数组或对象包含了需要运行的函数，每个函数都会传入一个`callback(result)`作为参数，这个`callback`传入`err`或`result`作为参数。
 - callback(err, results)：可选的回调函数

实例：

```c
async.parallel([
    function(callback){
        setTimeout(function(){
            callback(null, 'one');
        }, 200);
    },
    function(callback){
        setTimeout(function(){
            callback(null, 'two');
        }, 100);
    }
],
// optional callback
function(err, results){
    // the results array will equal ['one','two'] even though
    // the second function had a shorter timeout.
});


// an example using an object instead of an array
async.parallel({
    one: function(callback){
        setTimeout(function(){
            callback(null, 1);
        }, 200);
    },
    two: function(callback){
        setTimeout(function(){
            callback(null, 2);
        }, 100);
    }
},
function(err, results) {
    // results is now equals to: {one: 1, two: 2}
});
```

### parallelLimit(tasks, limit, [callback])

这个与`parallel()`的区别就是控制了每次并发的数量为`limit`。

参数：

 - tasks：数组或对象包含了需要运行的函数，每个函数都会传入一个`callback(result)`作为参数，这个`callback`传入`err`或`result`作为参数。
 - limit：同时执行的`task`个数
 - callback(err, results)：可选的回调函数

### whilst(test, fn, callback)

该方法是当`test`为`true`时重复执行`fn`。`callback`会在出错或者`fn`重复完后执行。

参数：

 - test()：每一次执行`fn`时同步测试函数
 - fn(callback)：每次`test()`通过执行的函数，该函数传入`callback(err)`作为参数，且必须执行一次
 - callback(err)：回调函数

实例：

```c
var async = require('async');

var count = 0;

async.whilst(
    function () { return count < 5; },
    function (callback) {
        count++;
        callback();
    },
    function (err) {
        console.log(count);
    }
);
```

### doWhilst(fn, test, callback)

这个是后检查版本的`whilst()`。也就是先执行`fn`，再检查`test`。参数顺序也不相同。

### until(test, fn, callback)

直到`test()`返回`true`时`fn`停止执行。也就是和`whilst()`相反。

### doUntil(fn, test, callback)

后检查版本的`until()`。

### forever(fn, errback)

序列化的一直执行`fn`，除非发生错误，`errback`才会执行，否则它永远都不会执行。

实例：

```c
async.forever(
    function(next) {
        // next is suitable for passing to things that need a callback(err [, whatever]);
        // it will result in this function being called again.
    },
    function(err) {
        // if next is called with a value in its first parameter, it will appear
        // in here as 'err', and execution will stop.
    }
);
```

### waterfall(tasks, [callback])

这个方法和`series()`有点类似，但是也有区别就是：它会序列化的执行`tasks`中的每一个函数，并且没一个会传递他们的结果到下一个函数。如果任何函数执行错误，后面的函数将不会执行，并且`callback`会立即执行。

参数：

 - tasks：需要运行函数的数组，每一个函数会传递一个`callback(err, result1, result2,...)`作为参数。第一个参数为`err`，可以为`null`，后面的参数会传入到后面的函数中作为参数。
 - callback(err, [results])

实例：

```c
async.waterfall([
    function(callback){
        callback(null, 'one', 'two');
    },
    function(arg1, arg2, callback){
      // arg1 now equals 'one' and arg2 now equals 'two'
        callback(null, 'three');
    },
    function(arg1, callback){
        // arg1 now equals 'three'
        callback(null, 'done');
    }
], function (err, result) {
   // result now equals 'done'    
});
```

### compose(fn1, fn2...)

这个方法创建一个函数，这个函数是传入的函数的一个组合。每个函数会以下面的函数的返回值作为参数。例如：符合的`f()`、`g()`和`h()`等价于`f(g(h()))`。

参数：

 - functions....

实例：

```c
function add1(n, callback) {
    setTimeout(function () {
        callback(null, n + 1);
    }, 10);
}

function mul3(n, callback) {
    setTimeout(function () {
        callback(null, n * 3);
    }, 10);
}

var add1mul3 = async.compose(mul3, add1);

add1mul3(4, function (err, result) {
   // result now equals 15
});
```

