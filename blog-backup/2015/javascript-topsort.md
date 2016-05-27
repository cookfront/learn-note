title: JavaScript 拓扑排序
date: 2015-06-20 14:07:42
categories: JavaScript
tags: [JavaScript]
---

最近在学习数据结构，就试着用`JavaScript`来实现一些基本数据结构。本文介绍的主要是拓扑排序`JavaScript`实现。

拓扑排序是对有向无圈图（DAG）的一种排序，它使得如果存在一条从v<sub>i</sub>到v<sub>j</sub>的路径，那么在排序中v<sub>j</sub>必须出现在v<sub>i</sub>后面。

> 如果图是有圈的，那么拓扑排序是不可能的。因为对于两个圈上的两个顶点v和w，v先于w，w又同时先于v。

拓扑排序的实现原理：

 1. 从 DAG 图中选择一个 没有前驱（即入度为0）的顶点并输出
 2. 从图中删除该顶点和所有以它为起点的有向边
 3. 重复 1 和 2 直到当前的 DAG 图为空或当前图中不存在无前驱的顶点为止。后一种情况说明有向图中必然存在环。

![enter image description here](http://img.blog.csdn.net/20150507001759702)

以上得到拓扑排序后的结果是 `{ 1, 2, 4, 3, 5 }`

下面是`JavaScript`的实现：

```js
function EdgeNode (id) {
  this.id = id;
  this.afters = [];
  this.indegree = 0;
}

function topsort (edges) {
  var nodes = {};
  var result = [];
  var queue = [];

  // build data structres
  edges.forEach(function (edge) {
    var fromEdge = edge[0];
    var fromStr = fromEdge.toString();
    var fromNode;

    if (!(fromNode = nodes[fromStr])) {
      fromNode = nodes[fromStr] = new EdgeNode(fromEdge);
    }

    edge.forEach(function (toEdge) {
      // since from and to are in same array, we'll always see from again, so make sure we skip it..
      if (toEdge == fromEdge) {
        return;
      }

      var toEdgeStr = toEdge.toString();

      if (!nodes[toEdgeStr]) {
        nodes[toEdgeStr] = new EdgeNode(toEdge);
      }
      nodes[toEdgeStr].indegree++;
      fromNode.afters.push(toEdge);
    });
  });

  // topsort
  var keys = Object.keys(nodes);
  keys.forEach(function (key) {
    if (nodes[key].indegree === 0) {
      queue.push(key);
    }
  });
  while (queue.length !== 0) {
    let vertex = queue.shift();
    result.push(nodes[vertex].id);

    nodes[vertex].afters.forEach(function (after) {
      var afterStr = after.toString();

      nodes[afterStr].indegree--;
      if (nodes[afterStr].indegree === 0) {
        queue.push(afterStr);
      }
    });
  }

  return result;
}

var edges = [
    ['two', 'three'],
    ['four', 'six'],
    ['one', 'three'],
    ['two', 'four'],
    ['six', 'nine'],
    ['five', 'seven'],
    ['five', 'eight'],
    ['five', 'nine'],
    ['seven', 'eight'],
    ['eight', 'nine'],
    ['one', 'two'],
    ['four', 'five'],
    ['four', 'six'],
    ['three', 'six'],
    ['six', 'seven'],
    ['three', 'four']
];
var sorted = topsort(edges);
console.log(sorted);
```

以上参考链接：

 - [samuelneff/topsort](https://github.com/samuelneff/topsort/blob/master/lib/topsort.js)
 - [拓扑排序（Topological Sorting）](http://songlee24.github.io/2015/05/07/topological-sorting/)
