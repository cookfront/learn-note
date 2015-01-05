title: HTML5 Web Storage
date: 2014-03-26 10:19:04
categories: HTML/HTML5
tags: HTML5
---

本地存储解决方案很多，比如Flash SharedObject、Google Gears、Cookie、DOM Storage、User Data、window.name、Silverlight、Open Database等。而Web Storage是网页存储的总称，由localStorage和sessionStorage组成。localStorage的特点是永久存储，除非你对它进行增、删、改的操作。而sessionStorage的特点是临时存储，用于在本地存储一个会话(session)中的数据。这些数据只有在同一个会话中的页面才能访问。当会话结束后，数据也会随之自动销毁。因此sessionStorage不是一种持久化的本地存储，仅仅是会话级别的存储。尽管页面关闭会导致存储于sessionStorage的数据被清楚，但是它可以跨越页面存在。

## localStorage

### 浏览器支持和兼容性

```c
if (window.localStorage) {
	alert('您的浏览器支持localStorage');
} else {
	alert('您的浏览器不支持localStorage');
}
```

IE8以下的浏览器不支持localStorage，所以这里提供了兼容性方案[https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Storage](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Storage)：

```c
if (!window.localStorage) {
	window.localStorage = {
		getItem: function(sKey) {
			if (!sKey || !this.hasOwnProperty(sKey)) return null;
			return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
		},
		setItem: function(sKey, sValue) {
			if (!sKey) return;
			document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
			this.length = document.cookie.match(/\=/g).length;
		},
		length: 0,
		key: function(nKeyId) {
			return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, "").split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]);
		},
		removeItem: function(sKey) {
			if (!sKey || !this.hasOwnProperty(sKey)) { return; }
			document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
			this.length--;
		},
		hasOwnProperty: function(sKey) {
			return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
		}
	};
	window.localStorage.length = (document.cookie.match(/\=/g) || window.localStorage).length;
}
```
	
### 接口和事件

就像上面兼容性中代码指出，localStorage接口如下：

* localStorage.getItem(key)：该接口用于获取指定key本地存储的值
* localStorage.setItem(key, value)：该接口用于将value存储到key字段
* localStorage.removeItem(key)：该接口用于删除指定key本地存储的值
* localStorage.length：该接口表示对象中存储的键值对的数量
* localStorage.key(index)：该接口用于返回指定的key，多用来遍历存入的对象。index从0开始
* localStorage.clear()：该接口用于清楚所有的本地存储

此外，localStorage提供一个onstorage监听事件，当localStorage中数据发生变化时，会触发此事件（在Chrome中未测试成功）。onstorage事件中的事件对象支持以下触发条件：

* 当键值改变时
* 当旧的键名所对应的值改变时
* 当增加一个新的键值时
* 当URL、源地址发生改变时
* 当存储空间发生异常和改变时

### localStorage实例

```c
localStorage.clear();
localStorage.setItem("name", "cookfront");
localStorage.setItem("age", "22");
var temp = localStorage.getItem("name");
console.log(temp);
window.onstorage = function() {
	console.log("storage");
};
localStorage.removeItem("age");
```
	
	
## sessionStorage

### 浏览器支持

```c
if (window.sessionStorage) {
	alert("您的浏览器支持sessionStorage");
} else {
	alert("您的浏览器不支持sessionStorage");
}
```

### 接口和事件

sessionStorage的接口和localStorage接口是一样的，当数据发生改变时，也会触发storage事件。

### sessionStorage实例

```c
sessionStorage.clear();
sessionStorage.setItem("name", "cookfront");
sessionStorage.setItem("age", "22");
var temp = sessionStorage.getItem("name");
console.log(temp);
window.onstorage = function() {
	console.log("storage");
};
sessionStorage.removeItem("age");
```
