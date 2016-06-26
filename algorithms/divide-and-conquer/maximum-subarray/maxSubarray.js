/**
 * 分治法O(nlgn)
 */
function maxCrossSubarray(arr, low, mid, high) {
	var sum = 0;
	var leftMax = Math.max();
	for (var i = mid; i >= low; i--) {
		sum += arr[i];
		if (sum > leftMax) {
			leftMax = sum;
		}
	}
	var rightMax = Math.max();
	sum = 0;
	for (var j = mid + 1; j <= high; j++) {
		sum += arr[j];
		if (sum > rightMax) {
			rightMax = sum;
		}
	}

	return Math.max(leftMax, rightMax, leftMax + rightMax);
}

function maxSubSum(arr, low, high) {
	var len = arr.length;

	if (low === high) {
		return arr[low];
	}

	var mid = parseInt((low + high) / 2, 10);
	var leftMax = maxSubSum(arr, low, mid);
	var rightMax = maxSubSum(arr, mid + 1, high);
	var crossMax = maxCrossSubarray(arr, low, mid, high);
	return Math.max(leftMax, rightMax, crossMax);
}

function maxSubArray(arr) {
	return maxSubSum(arr, 0, arr.length - 1);
}

var arr = [-2, -1];
console.log(maxSubArray(arr));

