title: Node.js path模块的使用以及实现
date: 2014-07-22 15:19:04
categories: Node
tags: Node
---

`Node.js`的`path`模块主要是用于处理和转换文件路径的，在使用该模块前首先需要使用`require('path')`引用该模块，下面来介绍该模块函数的使用以及源代码的分析：

## path.normalize

该方法主要是将文件路径中的`..`和`.`规范话，以及在出现多个`/`的地方替换为一个`/`。

### 语法

```c
path.normalize(path)
```

### 参数

传入一个文件路径作为参数，该方法会将该路径中的`..`、`.`以及多余的`/`规范化。

### 实例

```c
path.normalize('/foo/bar//baz/asdf/./quux/..')
// returns
'/foo/bar/baz/asdf'
```

### 源代码

这里主要分析在非`Windows`系统下的源代码，具体的思路就是将路径用`/`分隔后就会得到一个数组，然后将数组中的非空的字符插入到另一个数组，最后就是将数组中的`..`和`.`去除，具体还是看代码吧，首先需要看的是一个`normalizeArray`，这个函数的作用就是将数组中的`..`和`.`去除：

```c
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}
```

可以看到函数是遍历数组中的元素，如果遇到`.`则直接将其从数组中移除，如果遇到`..`，则将其移除的同时并将`up`加1，后续遍历时当`up`不为0时就需要将当前元素移除数组了。最后是如果允许超出根路径时的判断。我也利用栈的先进后出的原理实现了上面同样的功能，代码更容易看懂一点吧：

```c
function normalizeArray (parts, allowAboveRoot) {
  var result = [];

  for (var i = 0; i < parts.length; i++) {
    var item = parts[i];
    if (item === '.') {
      continue;
    } else if (item === '..') {
      if (result.length != 0 && result[result.length - 1] != '..') {
        result.pop();
      } else if (allowAboveRoot) {
        result.push(item);
      }
    } else {
      result.push(item);
    }
  }

  return result;
}
```

有了上面的函数后面的操作就容易了，只需将数组中多余的`/`去除就行，只需要将数组用`/`分隔后，将非空的元素插入一个数组即可。

```c
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = path[path.length - 1] === '/',
      segments = path.split('/'),
      nonEmptySegments = [];

  // Normalize the path
  // 将非空的元素插入数组
  for (var i = 0; i < segments.length; i++) {
    if (segments[i]) {
      nonEmptySegments.push(segments[i]);
    }
  }
  path = normalizeArray(nonEmptySegments, !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

```

## path.join

这个函数的作用是将所有参数合并后并调用`normalize`。参数必须为字符串，在`v0.10`版本中传入非字符串的参数会抛出一个异常。

### 语法

```c
path.join([path1], [path2], [...]);
```

### 参数

可以传入任意个路径参数。

### 实例

```c
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..')
// returns
'/foo/bar/baz/asdf'

path.join('foo', {}, 'bar')
// throws exception
TypeError: Arguments to path.join must be strings
```

### 源代码

```c
exports.join = function() {
  var path = '';
  for (var i = 0; i < arguments.length; i++) {
    var segment = arguments[i];
    if (!util.isString(segment)) {
      throw new TypeError('Arguments to path.join must be strings');
    }
    if (segment) {
      if (!path) {
        path += segment;
      } else {
        path += '/' + segment;
      }
    }
  }
  return exports.normalize(path);
};
```

上面的思路还是非常清楚的，如果为非字符串则抛出异常，如果字符串为非空，则合并到路径中，最后调用`normalize`规范化路径。

## path.resolve

该方法的作用是将最后一个参数相对前面的参数解析成一个绝对路径。

### 语法

```c
path.resolve([from ...], to)
```

### 参数

最后一个参数`to`为需要解析成绝对路径的，前面的任意个参数是`to`相对于解析的路径。

如果to不是一个相对于from参数的绝对路径，to会被添加到from的右边，直到找出一个绝对路径为止。如果使用from路径且仍没有找到绝对路径时，使用当前路径作为目录。返回的结果已经规范化，得到的路径会去掉结尾的斜杠，除非得到的当前路径为root目录。非字符串参数将被忽略。

### 实例

```c
path.resolve('foo/bar', '/tmp/file/', '..', 'a/../subfile')

// return '/tmp/subfile'
```

当路径中没有绝对路径时：

```c
path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif')
// if currently in /home/myself/node, it returns
'/home/myself/node/wwwroot/static_files/gif/image.gif'
```

当最后一个参数就是绝对路径时：

```c
path.resolve('/foo/bar', '/tmp/file/')
// returns
'/tmp/file'
```

### 源代码

该方法的思路是首先需要一个变量来存储当前路径是否为绝对路径`resolveAbsolute`，然后倒序遍历参数列表，直到遇到绝对路径或者数组遍历完时还没有遇到绝对路径时，使用当前路径`process.cwd()`，最后是调用`normalizeArray`方法：

```c
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  // 当遇到绝对路径时或者遍历到i=-1时会退出循环
  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    // i < 0 则说明参数列表已经遍历完，且没有遇到绝对路径，使用当前路径作为绝对路径
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    // 非字符串抛出异常
    if (!util.isString(path)) {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) { // 空字符串直接continue
      continue;
    }

    // 将路径加入到临时变量中
    resolvedPath = path + '/' + resolvedPath;
    // 当路径的第一个字符为`/`时即为绝对路径
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  // 规范化路径
  resolvedPath = normalizeArray(resolvedPath.split('/').filter(function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};
```

## path.relative

### 语法

```c
path.relative(from, to)
```

### 参数

参数`from`和`to`都是路径字符串，该函数的作用就是将`from`和`to`解析成`from`相对于`to`的路径，打个比方，在`Linux`环境下，你需要从`/data/orandea/test/aaa`到`/data/orandea/impl/bbb`需要在命令行中输入：`../../impl/bbb`。这个函数的作用就在于此。

### 实例

```c
path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb')
// returns
'../../impl/bbb'
```

### 源代码

```c
exports.relative = function(from, to) {
  // 将from和to解析成绝对路径
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  // 去除数组首尾的空字符元素，返回一个新的数组
  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  // 去除from和to路径首尾的空字符元素
  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  // 找到fromParts和toParts中长度最小的，后面遍历会用到
  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    // 当fromParts[i]和toParts[i]不相等，退出循环，此时samePartsLength就是fromParts和toParts相同部分的长度
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  // 循环samePartsLength次，并将'..'插入到outputParts中
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  // 将outputParts与toParts中除了相同部分的剩下部分合并就是需要的relative path了
  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};
```

## path.dirname

该返回一个路径的目录名。

### 语法

```c
path.dirname(p)
```

### 参数

传入需要解析出路径的字符串作为参数。

### 实例

```c
path.dirname('/foo/bar/baz/asdf/quux')
// returns
'/foo/bar/baz/asdf'
```

### 源代码

体现正则表达式强大的地方到了，这个解析路径主要是通过一个正则表达式匹配出一个路径的`root`、`dir`、`basename`、`ext`，下面看看这个强大的正则表达式：

```c
var splitPathRe =
      /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
```
看看这个正则表达式的组成，第一个括号内是匹配`/`或空的，这个对应了路径的`root`，第二个括号内匹配的是路径的`dirname`，第三个括号里面又包含了两个括号，有一个是非捕获括号，这第三个括号整个就能匹配到路径的`basename`了，第三个括号中的第二个括号可以匹配到`ext`，最后一个也是非捕获。如有不懂可以看看昨天写的[JavaScript 正则表达式有关函数学习][1]。

通过这个正则表达式，然后对路径使用`exec`方法就会返回一个关于路径信息的数组了，数组的第一个元素是匹配的所有项，后面依次是`root`、`dir`、`basename`、`ext`了。

```c
var splitPath = function(filename) {
    return splitPathRe.exec(filename).slice(1);
  };
```

最后看看`dirname`的算法也就很简单了：

```c
exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};
```

## path.basename

### 语法

```c
path.basename(p, [ext])
```

### 参数

包含一个必须参数，即为路径字符串，和一个可选参数为扩展名。

### 实例

```c
path.basename('/foo/bar/baz/asdf/quux.html')
// returns
'quux.html'

path.basename('/foo/bar/baz/asdf/quux.html', '.html')
// returns
'quux'
```

### 源代码

这个方法当然也是通过强大的正则表达式了：

```c
exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};
```

## path.extname

返回路径的扩展名

### 语法

```c
path.extname(p)
```

### 参数

传入一个路径字符串参数

### 实例

```c
path.extname('index.html')
// returns
'.html'

path.extname('index.coffee.md')
// returns
'.md'

path.extname('index.')
// returns
'.'

path.extname('index')
// returns
''
```

### 源代码

就是返回正则表达式匹配的最后一个元素就是扩展名了

```c
exports.extname = function(path) {
  return splitPath(path)[3];
};
```


  [1]: http://cookfront.github.io/2014/07/21/javascript-regexp/