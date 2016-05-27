title: JavaScript实现数据结构中的排序算法
date: 2015-06-16 11:07:42
categories: JavaScript
tags: [JavaScript]
---

本文主要是用`JavaScript`实现数据结构中的各种排序算法，例如：插入排序
、希尔排序、合并排序等。

## 插入排序

插入排序应该算是最简单和容易理解的排序算法。它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。具有`n`个元素时它需要经过`n-1`趟排序。对于`p = 1`到`p = n-1`趟，插入排序保证从位置`0`到位置`p`上的元素为已排序状态。它就是基于这个事实来排序的。

![enter image description here](http://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Insertion-sort-example-300px.gif/220px-Insertion-sort-example-300px.gif)

```js
function insertSort (arr) {
  var len = arr.length;

  if (len <= 1) {
    return arr;
  }

  // 1~n-1趟排序
  for (var i = 1; i < len; i++) {
    let tmp = arr[i];
    for (var j = i; j > 0 && arr[j - 1] > tmp; j--) {
      arr[j] = arr[j - 1];
    }
    arr[j] = tmp;
  }

  return arr;
}

var arr = [12, 290, 219, 278, 21, 43, 89, 78, 4432];
console.log(insertSort(arr));
```

如果目标是把`n`个元素的序列升序排列，那么采用插入排序存在最好情况和最坏情况。最好情况就是，序列已经是升序排列了，在这种情况下，需要进行的比较操作需`(n-1)`次即可。最坏情况就是，序列是降序排列，那么此时需要进行的比较共有`n(n-1)/2`次。插入排序的赋值操作是比较操作的次数减去(n-1)次。平均来说插入排序算法复杂度为`O(n2)`。因而，插入排序不适合对于数据量比较大的排序应用。但是，如果需要排序的数据量很小，例如，量级小于千，那么插入排序还是一个不错的选择。 插入排序在工业级库中也有着广泛的应用，在STL的sort算法和stdlib的qsort算法中，都将插入排序作为快速排序的补充，用于少量元素的排序（通常为8个或以下）。

## 希尔排序

希尔排序的名称源自于它的发明者`Donald Shell`。它又称之为`缩小增量排序`。它其实是插入排序的一种更高效的版本。

希尔排序的原理是使用一个增量序列：h<sub>1</sub>、h<sub>2</sub>、...、h<sub>n</sub>。希尔排序的原理是在使用增量h<sub>k</sub>的一趟排序之后，对于每一个i我们有A[i] ≤ A[i + h<sub>k</sub>]，所有相隔h<sub>k</sub>的元素都被排序。此时称文件为h<sub>k</sub>-排序。但是对于不同的增量序列，排序的性能也会有所影响。我们一般使h<sub>n</sub> = Math.floor(N / 2)和h<sub>k</sub>=Math.floor(h<sub>k-1</sub> / 2)。算法实现如下：

```js
function shellSort (arr) {
  var len = arr.length;

  if (len <= 1) {
    return arr;
  }

  // 增量
  for (var increment = Math.floor(len / 2); increment > 0; increment = Math.floor(increment / 2)) {
    for (var i = increment; i < len; i++) {
      var tmp = arr[i];
      for (var j = i; j >= increment; j -= increment) {
        if (arr[j] < arr[j - increment]) {
          arr[j] = arr[j - increment];
        } else {
          break;
        }
      }
      arr[j] = tmp;
    }
  }
  return arr;
}

var arr = [12, 290, 219, 278, 21, 43, 89, 78, 4432];
console.log(shellSort(arr));
```

## 堆排序

二叉堆我们可以利用数组来实现，要进行排序，我们第一步时执行建堆操作，然后我们再依次执行`deleteMin`操作就可以得到我们的排好序的元素。我们可以使用最小堆，每次`deleteMin`时向一个临时数组中插入元素。这种情况的问题是多了一倍的空间需求。为了避免使用第二个数组，在每次`deleteMin`之后，堆缩小1，位于堆中最后的单元就可以用于存放刚刚删除的元素。但这样元素会按递减的顺序排列。为了达到递增的效果，我们这里要使用最大堆。

下面是`js`实现的堆排序：

```js
function leftChild (i) {
  return 2 * i + 1;
}

function swap (arr, i, j) {
  var tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

function precDown (arr, i, len) {
  var index = i;
  var child;
  var tmp;

  for (tmp = arr[index]; leftChild(index) < len; index = child) {
    child = leftChild(index);

    if (child !== len - 1 && arr[child + 1] > arr[child]) {
      child++;
    }
    if (tmp < arr[child]) {
      arr[index] = arr[child];
    } else {
      break;
    }
  }
  arr[index] = tmp;
}

function heapSort (arr) {
  var len = arr.length;

  // build max heap
  for (let i = Math.floor(len / 2); i >= 0; i--) {
    precDown(arr, i, len)
  }
  // delete max element
  for (let i = len - 1; i > 0; i--) {
    swap(arr, 0, i);
    precDown(arr, 0, i);
  }
  return arr;
}

var arr = [1, 42, 53, 2432, 422, 5443, 89];
console.log(heapSort(arr));
```

堆排序的算法复杂度是`O(NlogN)`

## 归并排序

归并排序其实使用到了算法设计思想里面的分治法，分而治之。分治法是按照以下方案来工作的：

 1. 将问题的实例划分为同一问题的几个较小的实例，最好拥有同样的规模
 2. 对这些较小的实例求解
 3. 如果必要的话，合并这些较小问题的解，以得到原始问题的解

归并排序的思想就是将需要排序的数组`A[0...n-1]`一分为二，`A[0...Math.floor(n/2)-1]`和`A[Math.floor(n - 1)...n-1]`，并对每个子数组递归排序，然后将这两个排好序的子数组合并为一个有序数组。归并排序最主要的部分就是`merge`过程。下面看`js`实现：

```js
function merge (left, right) {
  var result = [];
  var leftIndex = 0;
  var rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex++]);
    } else {
      result.push(right[rightIndex++]);
    }
  }

  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

function mergeSort (arr) {
  var len = arr.length;

  if (len <= 1) {
    return arr;
  }

  var middle = Math.floor(len / 2);
  var left = arr.slice(0, middle);
  var right = arr.slice(middle);

  return merge(mergeSort(left), mergeSort(right));
}

var arr = [21, 53, 643, 654, 24, 892, 5338];
console.log(mergeSort(arr));
```

归并算法的运行时间为`O(NlogN)`，但是它很难用于主存排序，主要问题在于合并两个排序的表需要线性附加内存，在整个算法中还要将数据拷贝到临时数组再拷贝回来这样一些附加的工作，其结果严重放慢了排序的速度。

## 快速排序

正如它的名字，快速排序是在时间中最快的已知排序算法，它的平均运行时间是O(NlogN)。快速排序也是一种分治的递归算法。将数组S排序的基本算法由下列简单的四步组成：

 1. 如果S中元素个数是0或1，则返回
 2. 取S中任一元素`v`，称之为`枢纽元`
 3. 将`S - {v}`分成两个不相交的集合：S<sub>1</sub> = {x∈S - {v} | x ≤ v}和S<sub>2</sub> = {x∈S - {v} | x ≥ v}
 4. 返回{quicksort(S<sub>1</sub>)}，继续v，继而quicksort(S<sub>2</sub>)

由于对枢纽元的处理会导致第三步中的分割不唯一，因此，我们希望把等于枢纽元的大约一半的关键字分到S<sub>1</sub>中，而另外一半分到S<sub>2</sub>中，那怎么去选择一个好的枢纽元呢？

### 选取枢纽元

#### 一种错误的方法

通常的，没有经过充分考虑的选择是将第一个元素用作枢纽元。如果输入是随机的，那么这是可以接受的，但是如果输入是预排序或是反序的，那么这样的枢纽元就会产生一个劣质的分割，因为所有的元素不是都被划入S<sub>1</sub>就是被划入S<sub>2</sub>。

#### 一种安全的作法

一种安全的方针是随机选取枢纽元。但是另一方面，随机数的生成一般是昂贵的，根本减少不了算法奇遇部分的平均运行时间。

#### 三数中值分割法

一组N个数的中值是第`Math.ceil(N/2)`个最大的数。枢纽元的最好的选择是数组的中值。不幸的是，这很难算出，且会减慢快速排序的速度。因此一般的做法是使用左端、右端和中心位置上的三个元素的中值作为枢纽元。例如，输入为`8, 1, 4, 9, 6, 3, 5, 2, 7, 0`，它的左边元素是8，右边元素是0，中心位置为`Math.floor((left + right) / 2)`上的元素是6，于是枢纽元`v=6`。

下面来看看具体实现了：

```js
function swap (arr, i, j) {
  var tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

function median3 (arr, left, right) {
  var center = Math.floor((left + right) / 2);

  if (arr[left] > arr[center]) {
    swap(arr, left, center);
  }
  if (arr[left] > arr[right]) {
    swap(arr, left, right);
  }
  if (arr[center] > arr[right]) {
    swap(arr, center, right);
  }

  swap(arr, center, right - 1);
  return arr[right - 1];
}

function qSort (arr, left, right) {
  // 枢纽元
  var pivot = median3(arr, left, right);
  var i = left;
  var j = right - 1;

  while (i < j) {
    while (arr[++i] < pivot) {}
    while (arr[--j] > pivot) {}
    if (i < j) {
      swap(arr, i, j);
    } else {
      break;
    }
  }
  swap(arr, i, right - 1);
  if (left < i - 1) {
    qSort(arr, left, i - 1);
  }
  if (i + 1 < right) {
    qSort(arr, i + 1, right);
  }

  return arr;
}

function quickSort (arr) {
  return qSort(arr, 0, arr.length - 1);
}


var arr = [21, 53, 643, 654, 24, 892, 5338];
console.log(quickSort(arr));
```
