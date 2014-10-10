title: NodeJS query string 解析
date: 2014-04-04 18:04:39
categories: Node
tags: Node
---

`Node`的`query string`解析器在`0.3.x`中被移除了，所以我们的[TJ大神][1]写了一个`qs`的库提供对查询字符串的解析，So研究了一下它的源代码。对于查询字符串的解析可能存在几类情况：

下面先看看第一类情况，这种情况是查询字符串中不包含`[]`时：

 - name=cookfront&age=22：解析出`{ name: 'cookfront', age: '22' }`
 - name=cookfront&name=zhangmin： 解析出 `{ name: [ 'cookfront', 'age' ] }`
 - name：解析出`{ name: '' }`

这一类情况的字符串比较容易解析，只需要利用字符串的`&`把字符串分割成数组，然后再对数组的每一项进行处理，每一项的`key`即为`=`前面的字符串，`value`即为`=`后面的字符串。

```c
function parse (str) {
  var ret = {};

  var pairs = str.split('&');
  pairs.forEach(function (pair) {
    var eql = pair.indexOf('='),
      key = pair.substr(0, eql),
      val = pair.substr(eql + 1, pair.length);

    // ?foo
    if ('' == key) {
      key = pair;
      val = '';
    }
    if ('' == key) {
      return ret;
    }

    set(ret, key, val);
  });

  return ret;
}

function set (obj, key, val) {
  var v = obj[key];

  if (v === undefined) {
    obj[key] = val;
  } else if (typeof v === 'array') {
    obj[key].push(val);
  } else {
    obj[key] = [v, val];
  }
}

console.log(parse('name=cookfront&age=22'));
console.log(parse('name=cookfront&name=zhangmin'));
console.log(parse('name'));
```

上面的代码就能实现解析第一类情况的查询字符串，那么第二类就是更复杂的带`[]`的情况：

 - user[name][first]=Tobi&user[email]=tobi@learnboost.com：被解析出`{ user: { name: { first: 'Tobi' }, email: 'tobi@learnboost.com' } }`
 - name[]=cookfront：解析出`{ name: [ 'cookfront' ] }`

那么这种类型的字符串又如何解析呢？

```c

function parse (str) {
  var ret = { base: {} };

  var pairs = str.split('&');
  pairs.forEach(function (pair) {
    var eql = pair.indexOf('='),
      key = pair.substr(0, eql),
      val = pair.substr(eql + 1, pair.length);

    // ?foo
    if ('' == key) {
      key = pair;
      val = '';
    }
    if ('' == key) {
      return ret;
    }

    merge(ret, key, val);
  });

  return ret.base;
}

function merge (parent, key, val) {
  if (~key.indexOf(']')) {
    var parts = key.split('[');

    parsePart(parts, parent, 'base', val);
  }
}

function parsePart (parts, parent, key, val) {
  var part = parts.shift();

  if (!part) {
    set(parent, key, val);
  } else {
    var obj = parent[key] = parent[key] || {};
    if (']' == part) {
      if (Array.isArray(obj)) {
        if ('' != val) obj.push(val);
      } else {
        obj = parent[key] = [val];
      }
    } else if (~part.indexOf(']')) {
      part = part.substr(0, part.length - 1);
      parsePart(parts, obj, part, val);
    } else {
      parsePart(parts, obj, part, val);
    }
  }
}

function set (obj, key, val) {
  var v = obj[key];

  if (v === undefined) {
    obj[key] = val;
  } else if (typeof v === 'array') {
    obj[key].push(val);
  } else {
    obj[key] = [v, val];
  }
}

console.log(parse('user[name][]=Tobi&user[name][]=cookfront'));
console.log(parse('user[name][first]=Tobi&user[email]=tobi@learnboost.com'));
```

最后来个完整版的代码，实现了这两类情况的字符串解析：

```c
/**
 * parse the given string
 *
 * @param {String} str
 * @return {Object}
 */
function parse (str) {
  var ret = { base: {} };

  var pairs = str.split('&');
  pairs.forEach(function (pair) {
    var eql = pair.indexOf('='),
      key = pair.substr(0, eql),
      val = pair.substr(eql + 1, pair.length);

    // ?foo
    if ('' == key) {
      key = pair;
      val = '';
    }
    if ('' == key) {
      return ret;
    }

    merge(ret, key, val);
  });

  return ret.base;
}

function merge (parent, key, val) {
  if (~key.indexOf(']')) {
    var parts = key.split('[');

    parsePart(parts, parent, 'base', val);
  } else {
    set(parent.base, key, val);
  }
}

function parsePart (parts, parent, key, val) {
  var part = parts.shift();

  if (!part) {
    set(parent, key, val);
  } else {
    var obj = parent[key] = parent[key] || {};
    if (']' == part) {
      if (Array.isArray(obj)) {
        if ('' != val) obj.push(val);
      } else {
        obj = parent[key] = [val];
      }
    } else if (~part.indexOf(']')) {
      part = part.substr(0, part.length - 1);
      parsePart(parts, obj, part, val);
    } else {
      parsePart(parts, obj, part, val);
    }
  }
}

function set (obj, key, val) {
  var v = obj[key];

  if (v === undefined) {
    obj[key] = val;
  } else if (typeof v === 'array') {
    obj[key].push(val);
  } else {
    obj[key] = [v, val];
  }
}

console.log(parse('user[name][]=Tobi&user[name][]=cookfront'));
console.log(parse('user[name][first]=Tobi&user[email]=tobi@learnboost.com'));
console.log(parse('user[name][first]=Tobi&user[email]=tobi@learnboost.com&age=22'));
```

以上代码的思路来自于TJ大神的[node-querystring][1]模块，只是把其中的字符串解析抽出来。如需深入研究可以去看[node-querystring][1]的源代码哟。
 
 
  [1]: https://github.com/visionmedia/node-querystring