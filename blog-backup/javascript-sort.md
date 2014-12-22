JavaScript之排序
========

## Array.prototype.sort()

说到`JavaScript`的排序最开始能想到的就是`Array.prototype.sort()`，这个方法是用于对数组排序的，并且可以传入一个比较的回调函数，当没有传入回调函数时，该方法会将比较的数组项转换为字符串后再进行比较，这样就会有一个问题，当数组的元素都是数字时，例如`80`就会排在`9`前面。

> If compareFunction is not supplied, elements are sorted by converting them to strings and comparing strings in lexicographic ("dictionary" or "telephone book," not numerical) order. For example, "80" comes before "9" in lexicographic order, but in a numeric sort 9 comes before 80.

```js
var arr = [12, 9, 8, 4, 39, 222];
// [ 12, 222, 39, 4, 8, 9 ]
console.log(arr.sort());
```

当然我们可以通过传入一个自定义的回调函数来解决这个问题，回调函数接受两个参数，我们就暂且称它们为`a`和`b`

 - 当你需要返回的数组中`a`在`b`前面时，回调函数返回`-1`
 - 当回调函数返回0，`a`和`b`的位置不会改变
 - 当你需要`a`在`b`后面，在回调函数中返回`1`

```js
var arr = [12, 9, 8, 4, 39, 222];

// [ 4, 8, 9, 12, 39, 222 ]
console.log(arr.sort(function (a, b) {
	if (a - b < 0) {
		return -1;
	} else if (a - b > 0) {
		return 1;
	} else {
		return 0;
	}
}));
```

## 插入排序

对于`n`个元素的数组，插入排序要进行`n - 1`趟排序，即从`1`到`n - 1`，插入排序是基于这样一个事实，在第`k`趟排序时，`0`到`k - 1`之间到元素是已经拍好序的，对于第`k`个元素，我们需要将它插入到合适的位置。算法描述如下：

 1. 从第一个元素开始，该元素可以认为已经被排序
 2. 取出下一个元素，在已经排序的元素序列中从后向前扫描
 3. 如果该元素（已排序）大于新元素，将该元素移到下一位置
 4. 重复步骤3，直到找到已排序的元素小于或者等于新元素的位置
 5. 将新元素插入到该位置后
 6. 重复步骤2~5


| 初始        | [12, 9, 8, 4, 39, 222]           |
| ------------- |:-------------:|
| k=1      | [9, 12, 8, 4, 39, 222] |
| k=2      | [8, 9, 12, 4, 39, 222]      |
| k=3 | [4, 8, 9, 12, 39, 222]      |
| k=4 | [4, 8, 9, 12, 39, 222]      |
| k=5 | [4, 8, 9, 12, 39, 222]      |
| k=6 | [4, 8, 9, 12, 39, 222]      |

```js
function insertSort (arr) {
	var len = arr.length;
	for (var i = 1; i < len; i++) {
		var tmp = arr[i];
		for (var j = i; j > 0 && arr[j - 1] > tmp; j--) {
			arr[j] = arr[j - 1];
		}
		arr[j] = tmp;
	}

	return arr;
}

var arr = [12, 9, 8, 4, 39, 222];
console.log(insertSort(arr));
```

## 希尔排序

希尔排序又称之为缩小增量排序，它使用一个序列`h1, h2, ..., ht`，叫做增量序列，只要`h1 = 1`，任何增量序列都是可行的，在使用增量`hk`的一趟排序之后，对于每一个`i`我们都有`A[i] <= A[i + hk]`，所有相隔`hk`的元素都被排好序了。

```js
function shellSort (arr) {
	var len = arr.length;
	for (var increment = parseInt(len / 2, 10); increment > 0; increment = parseInt(increment / 2, 10)) {
		for (var i = increment; i < len; i++) {
			var tmp = arr[i];
			for (var j = i; j >= increment && tmp < arr[j - increment]; j -= increment) {
				arr[j] = arr[j - increment];
			}
			arr[j] = tmp;
		}
	}
	return arr;
}

var arr = [12, 9, 8, 4, 39, 222];
console.log(shellSort(arr));
```

其实从代码中可以看出来，希尔排序的内两层循环其实是和插入排序是一样的，只是多了最外层的一层不断缩小增量的循环。希尔排序的运行时间主要依赖于增量的选择，不同的增量可能会对排序的运行时间造成很大的影响。

## 堆排序

对于堆排序你可能会想到利用最小堆，不断的将堆的根元素`delete`，并将其`push`到另外一个数组中，直到堆中没有元素，这时另外一个元素中的数组就是排好序的了。这种方式存在的一个问题是我们需要额外的一个数组。

更聪明的做法是利用最大堆，每次`delete`根节点后，堆缩小了1，此时堆中的最后单元正好可以用来存放我们刚刚删掉的元素，使用这种做法当最后一次`delete`后数组中的元素即排好序了。

```js
function percDown (arr, i, n) {
	var child;

	// (2 * i + 1) -> arr[i]'s left child index
	for (var tmp = arr[i]; (2 * i + 1) < n; i = child) {
		child = 2 * i + 1;

		if (child != n - 1 && arr[child + 1] > arr[child]) {
			child++;
		}

		if (tmp < arr[child]) {
			arr[i] = arr[child];
		} else {
			break;
		}
	}
	arr[i] = tmp;
}

function heapSort (arr) {
	var len = arr.length,
		i;

	// build heap
	for (i = Math.floor(len / 2); i >= 0; i--) {
		percDown(arr, i, len);
	}
	// delet max
	for (i = len - 1; i > 0; i--) {
		swap(arr, 0, i);
		percDown(arr, 0, i);
	}

	function swap (arr, i, j) {
		var tmp;
		tmp = arr[i];
		arr[i] = arr[j];
		arr[j] = tmp;
	}

	return arr;
}

var arr = [12, 9, 8, 4, 3229, 222];
console.log(heapSort(arr));
```

## 归并排序

归并排序其实是用到了算法设计思想中的`分治法`，`分治法`是将问题`分`成一些小的问题，然后递归求解，而`治`的过程是将`分`阶段解得的各个答案修补到一起。

归并排序的算法描述为：如果`N ＝ 1`，只有一个元素，答案是显然的，直接返回即可。否则，递归地将前半部分和后半部分数据各自归并排序，得到排序后的两部分数据后，然后使用合并算法将两个已排序好的两部分数据进行合并后即得到排序后的数组。

```js
function merge (arr, tmpArr, lpos, rpos, right) {
	var i, leftEnd, numElements, tmpPos;

	leftEnd = rpos - 1;
	tmpPos = lpos;
	numElements = right - lpos + 1;

	while (lpos <= leftEnd && rpos <= right) {
		if (arr[lpos] <= arr[rpos]) {
			tmpArr[tmpPos++] = arr[lpos++];
		} else {
			tmpArr[tmpPos++] = arr[rpos++];
		}
	}

	while (lpos <= leftEnd) {
		tmpArr[tmpPos++] = arr[lpos++];
	}

	while (rpos <= right) {
		tmpArr[tmpPos++] = arr[rpos++];
	}

	for (i = 0; i < numElements; i++, right--) {
		arr[right] = tmpArr[right];
	}
}

function mSort (arr, tmpArr, left, right) {
	var len = arr.length,
		center;

	if (left < right) {
		center = parseInt((left + right) / 2, 10);
		mSort(arr, tmpArr, 0, center);
		mSort(arr, tmpArr, center + 1, right);
		merge(arr, tmpArr, left, center + 1, right);
	}
}

function mergeSort (arr) {
	var len = arr.length,
		tmpArr = [];

	mSort(arr, tmpArr, 0, len - 1);
	return arr;
}

var arr = [12, 9, 8, 4, 3229, 222];
console.log(mergeSort(arr));
```

## 快速排序

快速排序是在实践中最快的已知排序算法，它的平均运行时间是`O(NlogN)`，它的算法描述如下：

 1. 如果`S`中元素个数是0或1，则返回
 2. 取`S`中任一元素`v`，称之为枢纽元
 3. 将`S - {v}`分成两个不相交的集合：`S1 = {x 属于 S ｜ x <= v}` 和 `S2 = {x 属于 S | x >= v}`
 4. 返回`{quicksort(S1)}`后，然后继续`quicksort(S2)`

那么问题来了，枢纽元如何选择：

 - 选取第一个元素或者最后一个元素：如果输入是随机的，那么这是可以接受的，但是如果输入时预排序的或是反序的，那么这样的枢纽元将产生一个劣质的分割，因为所有的元素不是都被划入`S1`就是都被划入`S2`，所以应该谨慎选择它
 - 随机选取枢纽元：这种策略非常安全，但是有时候随机数的生成是昂贵的
 - 三数中值分割法：这种策略是使用左端、右端和中心位置上的三个元素的中值（第二大的值）作为枢纽元。例如，输入为`8 1 4 9 6 3 5 2 7 0`，左边的元素为`8`，右边的元素为`0`，中心位置的元素是`6`，于是枢纽元`v = 6`

枢纽元选择完了，那么怎么才能将数组分割成大于枢纽元和小于枢纽元的两部分呢？

 1. 首先将枢纽元与最后的元素交换，使得枢纽元离开要被分割的数据段
 2. `i`从第一个元素开始，`j`从倒数第二个元素开始（最后一个元素为枢纽元），当`i`在`j`的左边时，我们将`i`右移，移过那些小于枢纽元的元素，并将`j`左移，移过那些大于枢纽元的元素
 3. 当`i`和`j`停止时，`i`指向一个大于枢纽元的元素，而`j`指向一个小于枢纽元的元素，如果`i`在`j`的左边，那么将这两个元素进行交换
 4. 直到`i`在`j`右边，我们交换枢纽元与`i`所指向的元素，此时在`i`位置之前的元素就是小于枢纽元的元素了

这就是用到的`分割策略`。

还有个需要注意

那么最后就是实际的代码啦：

```js

```