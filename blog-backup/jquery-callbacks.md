title: jQuery callbacks 源代码研究
date: 2014-08-27 10:19:04
categories: JavaScript
tags: [JavaScript, jQuery]
---

本文介绍`jQuery.Callbacks`，`jQuery.Callbacks`主要是用于`jQuery`内部，例如`jQuery.Deferred`等。具体的用法看[这里](http://www.cnblogs.com/snandy/archive/2012/11/15/2770237.html)。这篇文章介绍的比较清楚。

首先看这一段代码：

```c
// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}
```

这里的`optionsCache`是用于缓存`string`的选项成一个对象。`createOptions`就是用于将字符串格式的选项转换成对象格式的选项，并存储在`optionsCache`中，例如：

```c
var callbacks = $.Callbacks('once memory');
```

此时可以看到`optionsCache`对象是这样的：

```c
{
	"memory once": {
		memory: true,
		once: true
	}
}
```

当有其他方式的调用`$.Callbacks('once')`时，`optionsCache`又会变成这样：

```c
{
	"memory once": {
		memory: true,
		once: true
	},
	"once": {
		once: true
	}
}
```

这个`optionsCache`就是在内部起到了缓存作用。

下面看核心的代码了：

```c
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	// 如果需要的话，将字符串格式的选项转换成对象格式的选项，
	// 因为首先会判断optionsCache中是否有对应的字符串格式选项的对象。
	// 如果是传入一个对象，则通过jQuery.extend来扩展
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		// memory选项
		memory,
		// Flag to know if list was already fired
		// 回调是否触发过的标识
		fired,
		// Flag to know if list is currently firing
		// 回调是否正在触发
		firing,
		// First callback to fire (used internally by add and fireWith)
		// 回调触发的开始位置
		firingStart,
		// End of the loop when firing
		// 正在触发的回调函数长度
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		// 当前正在触发的索引
		firingIndex,
		// Actual callback list
		// 实际回调函数列表
		list = [],
		// Stack of fire calls for repeatable lists
		// 当options.once不为true时，stack = []
		// 因为当options.once为true时只需触发一次，
		// 因此当正在触发(firing = true)时，也就不需要压入到栈中，因此也就不需要栈
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			// 获取memory，如果在options.memory中存在
			memory = options.memory && data;
			// 设置触发标识为true
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				// 如果回调函数返回false,且stopOnFalse为true时，中断回调函数队列，
				// 并设置memory为false，防止以后add时会调用
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false &&
					options.stopOnFalse ) {

					memory = false; // To prevent further calls using add
					break;
				}
			}
			// 回调函数触发完毕后将firing设置为false
			firing = false;
			if ( list ) {
				// 判断栈中是否还有需要触发的，
				// 因为在调用fireWith和fire时，如果正在触发，会将参数push到栈中
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				// 如果memory为true时，将list置为空
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					// 首先保存当前list的长度，主要用于memory参数为true时，记录下一个触发位置
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							// 如果参数类型为函数
							if ( type === "function" ) {
								// 如果参数unique为false时，直接添加到回调函数列表
								// 否则unique为true时，需要判断当前回调函数列表中是否有对应的回调函数
								// 没有则添加到回调函数列表
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								// 检查递归
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					// 如果正在触发，更新firingLength
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					// 当memory为true时，当首次调用fire后，之后每次add都会立即触发
					// 所以，保存firingStart后，触发回调
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						// 遍历回调函数列表中删除传入参数中需要删除的回调函数
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							// 如果正在触发
							if ( firing ) {
								// 如果index小于firingLength，将firingLength--即可
								if ( index <= firingLength ) {
									firingLength--;
								}
								// 如果index小于firingIndex，也将其减1
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			// 判断某函数是否在回调函数列表中
			// 如果没有传入参数，则判断回调函数列表是否为空
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			// 移除所有的回调函数
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			// 禁用回调函数
			// 调用后再使用add, remove, fire等方法均不起作用
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			// 是否被禁用
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			// 指定执行上下文触发
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					// 如果当前正在触发，则将参数放入到栈中
					if ( firing ) {
						stack.push( args );
					// 否则调用fire函数触发
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			// 是否触发过
			fired: function() {
				return !!fired;
			}
		};

	return self;
};
```
至此，`jQuery.Callbacks（）`就分析完了。