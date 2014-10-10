title: HTML5 Geolocation
date: 2014-07-21 10:57:04
categories: HTML/HTML5
tags: HTML5
---


[Geolocation API][1]让我们在用户允许的条件下获取用户的地理位置，并且可以随着用户的移动重新获取地理位置。这个`API`作用是非常大的，比如可以为用户进行导航等。下面从几个方面详细讲解：

## 浏览器兼容性

可以从[caniuse][2]中看到浏览器的兼容性还是很好的，除了悲剧的IE，在`IE9`以下是不支持`geolocation`的，既然有支持该API和不支持该API的就需要检测浏览器的兼容性了，通过下面的代码就可以判断浏览器是否支持`geolocation`了：

```c
if (navigator.geolocation) {
  console.log('Geolocation is supported!');
}
else {
  console.log('Geolocation is not supported for this Browser/OS version yet.');
}
```

## 位置请求

### 单次位置请求：getCurrentPosition

这个函数只会请求一次用户的地理位置，而不会说随着用户的移动不断的获取用户的地理位置。

#### 用法

```c
void getCurrentPosition(updateLocation, optional handleLocationError, optional options);
```

这个函数接受一个必选参数和两个可选参数。

 - 必选参数是当位置数据可用时应该调用的函数。它接受一个参数，位置对象position，这个对象包含了坐标(coords)和一个获取位置时的时间戳。坐标中包含了很详细的地理位置信息，例如经度、纬度等：
     - latitude：纬度
     - longitude：经度
     - altitude：海拔高度，以m为单位
     - accuracy：准确度
     - altitudeAccuracy：海拔高l度的准确度，以m为单位
     - heading：行进方向，相对于正北而言
     - speed：速度，以m/s为单位
 - 可选参数handleLocationError，为错误处理的回调函数，比如用户拒绝获取个人的地理位置信息，或者由于网络的原因获取位置失败时，都会调用这个函数来处理。当获取位置失败时，这个函数会接受一个`positionError`的对象，这个对象包含了`code`和`message`两个属性，`message`即为返回的错误消息，`code`则是一个整数，不同的整数代表了不同的错误原因：
     - UNKNOWN_ERROR (0)：不包括在其它错误编号中的错误，需要通过 message 参数查找错误的详细信息。
     - PERMISSION_DENIED (1)：用户拒绝浏览器获得其位置信息。
     - POSITION_UNVAILABLE (2)：尝试获取用户信息失败。
     - TIMEOUT (3)：在 options 对象中设置了 timeout 值，尝试获取用户位置超时。
 - 可选参数options可以配置`HTML5 Geolocation`收集数据的方式。该对象有三个可选参数：
     - enableHighAccuracy：启用该参数，浏览器会启动高经度模式来收集位置数据，不过这会导致占用过多的时间和资源，应谨慎使用。默认为false
     - timeout：该参数设置了超时的时间，当在这个时间内没有获取到位置信息时，就会调用错误处理程序，默认值为Infinity，单位为ms
     - maximumAge：以 ms 为单位，表示浏览器重新获取位置信息的时间间隔。默认值为 0，这意味着浏览器每次请求时必须立即重新计算位置。

```c
function updatePosition (position) {
	var latitude = position.coords.latitude,
		longitude = position.coords.longitude;

	do_something(latitude, longitude);
}
function handleError (error) {
	switch (error.code) {
		case 0:
			alert('unkonw error');
			break;
		case 1:
			alert('permisson denied');
			break;
		case 2:
			alert('position unvailable');
			break;
		case 3:
			alert('time out');
			break;
	}
}
if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(updatePosition, handleError, { timeout: 10000 });
} else {
	alert('Your browser do not support geolocation');
}
```

### 监控位置请求：watchPosition

有时候，您的应用可能需要监控用户位置的改变，这个时候`getCurrentPosition`就不能达到我们的要求了，`HTML5`为我们提供了`watchPosition`，这个方法就是用于监控用户位置改变，并执行相应的回调函数。

#### 用法

```c
void watchPosition(updateLocation, optional handleLocationError, optional options);
```

这里面的参数和`getCurrentPosition`的参数是一模一样的。

如果在某种情况下你要关闭监控，这也是很简单的，只要通过`clearWatch()`函数就可以实现：

```c
var watchId = navigator.watchPosition(updateLocation, handleLocationError, options);
if (something_happen()) {
  clearWatch(watchId);
}
```



     
      
 
 
  [1]: http://dev.w3.org/geo/api/
  [2]: http://caniuse.com/geolocation