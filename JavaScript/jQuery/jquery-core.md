主要分析下`core.js`中一些函数的用法和实现。

`core.js`是`jQuery`的一个核心文件，打开它首先看到的应该就是：

```c
// Define a local copy of jQuery
jQuery = function( selector, context ) {
	// The jQuery object is actually just the init constructor 'enhanced'
	// Need init if jQuery is called (just allow error to be thrown if not included)
	return new jQuery.fn.init( selector, context );
},
```

可以看到当你在js中使用`$(selector)`的时候其实是在调用`new jQuery.fn.init(selector, context)`，那为什么`jQuery`要通过这种方式呢？可以看看[这里][1]。

要理解这段还有代码必须展示出来：

```c
jQuery.fn = jQuery.prototype;

jQuery.fn = {
    init: function (selector, context) {
        ...
    },
    
    ...
};

jQuery.fn.init.prototype = jQuery.fn;
```

`init`其实是一个构造函数，当你使用`$()`的时候就会`new jQuery.fn.init()`，然后又将`jQuery.prototype`赋给了`init.prototype`。通过这种方式在`jQuery.prototype`上定义的方法也就属于`init.prototype`了。

当你在使用`$()`的时候返回了`init`构造函数的一个实例，因为`init.prototype`等于`jQuery.prototype`，从而在`jQuery.prototype`上定义的所有方法只需通过`$().someMethod()`去调用，然后又因为`someMethod()`返回了`this`，所以也就实现了`jQuery`的链式调用了。

那这个`init`的构造函数长啥样呢？先看看，后面还会介绍的哟。

```c
init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};
```

通过`new init()`返回的其实是一个类数组对象。在构造函数内部主要是会设置`this.selector`，`this.context`，这两个主要是参数中传入的`selector`和`context`，当然也有可能是通过这样一种方式传入参数`{ selector: selector, context: context }`，这种情况就是`selector.selector`和`selector.context`了。其次是会根据选择器获取到元素的个数设置`this.length`，还有就是`this[0]`，`this[1]`等分别为获取到的节点。

看看例子：

```c
<div id="aa"></div>

console.log($('#aa'));

```

下面是浏览器控制台的输出：

![jQuery][2]

其实输出的就是`init`构造函数的一个实例了。其中的`__proto__`就是它的原型，也即`jQuery.prototype`了。


那当你去调用`$.someMethod`又是在调用哪里呢？这个其实是在调用定义在`jQuery`上的类方法，而不是实例方法。像下面这样：

```c
jQuery.someMethod = function () {
};
```


还有好处：

 - 如注释所说，这段定义了一个`jQuery`的局部变量，最后会通过`window.jQuery = window.$ = jQuery;`导出`jQuery`，这样你就可以在全局使用`$`或者`jQuery`来获取元素了。
 - 你只需简单的使用`$()`就可以进行`DOM`操作了，而不是每次都需要去`new`一个`jQuery`对象。

下面再看看这一段代码：

```c
jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	/**
	 * 返回一个所有节点的数组，也即对象中的`this[0]`等
	 *
	 * 使用实例：
	 * $(selector).toArray() 
	 *
	 * @return {Array}
	 */
	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	/**
	 * 如果传入了参数num，则返回指定位置的元素，否则返回全部的元素
	 *
	 * 使用实例：
	 * $('.some').get(1); 或取第2个有`.some` class的元素
	 * 注意是以0开始的哟
	 * 
	 * @param {number} num 需要获取元素的位置
	 * @return {Array} 返回一个数组
	 */
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	/**
	 * 将一些DOM元素压入到jQuery栈中，这个方法会保存当前对象到新对象（elems）的prevObject属性中
	 * 当调用end()方法后就会返回当前对象
	 *
	 * 向 jQuery 栈中先压入一些元素，然后再删除它们，之后再退回到之前刚压入栈的状态。
	 * jQuery([]).pushStack( document.getElementsByTagName("div") ).remove().end();
	 *
	 * @param {Array} elems 将要压入jQuery栈的元素，用于生成一个新的jQuery对象。
	 * @param {Object} 新的jQuery对象
	 */
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	/**
	 * 遍历一个jQuery对象，为每个匹配元素执行一个函数。
	 *
	 * 遍历每一个li，并添加class
	 * $( "li" ).each(function() {
	 *   $(this).addClass( "foo" );
	 * });
	 *
	 * @param {Function} callback 遍历函数
	 * @param {Array} args 遍历函数的参数
	 */
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	/**
	 * 通过一个函数匹配当前集合中的每个元素,产生一个包含新的jQuery对象。
	 *
	 * $(':checkbox').map(function() {
     *     return this.id;
     * }).get().join();
	 *
	 * @param {Function} callback 匹配函数
	 */
	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	/**
	 * 根据指定的下标范围，过滤匹配的元素集合，并生成一个新的 jQuery 对象。
	 */
	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	/**
	 * 获取匹配元素集合中第一个元素。
	 */
	first: function() {
		return this.eq( 0 );
	},

	/**
	 * 获取匹配元素集合中最后一个元素。
	 */
	last: function() {
		return this.eq( -1 );
	},

	/**
	 * 获取指定的索引的那一个元素
	 *
	 * @param {number} i 指定的索引，如果为负数，则会加上jQuery对象的长度
	 */
	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		// 会判断j的位置是否合理
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	/**
	 * 终止在当前链的最新过滤操作，并返回匹配的元素的以前状态。
	 */
	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};
```

下面介绍的是`jQuery.extend`，`jQuery`就是通过这个函数不断扩展的。

```c
jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	// 处理深度拷贝的情况，当为深度拷贝时，第一个参数为true或false
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	// 处理target不是对象或者函数的情况
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	// 当i === length 扩展的是自己
	// jQuery内部都是通过jQuery.extend({ ... })或jQuery.fn.extend({ ... })来扩展的
	if ( i === length ) {
		target = this;
		i--;
	}

	// 遍历各个需要拷贝的对象
	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		// 只有当对象不为null或者undefined时才处理
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				// 只有当deep为true，且copy不为空且copy为对象或者数组时才会执行深度拷贝
				if ( deep && copy && ( jQuery.isPlainObject(copy) ||
					(copyIsArray = jQuery.isArray(copy)) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				// 其他情况直接拷贝
				} else if ( copy !== undefined ) 
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	// 返回拷贝后的对象
	return target;
};
```

下面继续，这里就是通过上面的`jQuery.extend`来扩展`jQuery`自身，注意这里时扩展到`jQuery`对象的方法，而非实例方法。

```c
jQuery.extend({
	// Unique for each copy of jQuery on the page
	// 这个应该就是个唯一值区分每一个jQuery吧
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	// 假定jQuery已经ready
	isReady: true,

	// 抛出异常
	error: function( msg ) {
		throw new Error( msg );
	},

	// 什么也不做
	noop: function() {},

	// 判断obj是否为函数
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	// 是否为数组
	isArray: Array.isArray,

	// 是否为window对象，window对象的特征window === window.window
	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	// 是否为数字
	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	// 判断对象是否为对象字面量
	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		// 非对象字面量
		// － 任何toString()不返回"[object Object]"
		// － DOM节点
		// － window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		// 判断obj.constructor.prototype是否有"isPrototypeOf"方法
		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	// 遍历对象，如果for in中有对象，则返回false，否则返回true
	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// 传入参数，返回该参数对应的类型，例如"function"
	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android<4.0, iOS<6 (functionish RegExp)
		// class2type是类似这样的 { "[object Function]": "function" }，下面会介绍
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// 在全局上下文下执行一些JavaScript代码
	globalEval: function( code ) {
		var script = document.createElement( "script" );

		script.text = code;
		document.head.appendChild( script ).parentNode.removeChild( script );
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	// 将类似`border-radius`的字符串转换为`borderRadius`
	// 如果以`-ms-`开头的`-ms-border-radius`，则转换为`msBorderRadius`
	// 不同于`-webkit-border-radius`，转换为`WebkitBorderRadius`
	// 注意到首字母的大写了吗
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	// 判断elem的节点名称是否和name相等
	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	// args只是对内部使用
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		// 有args
		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		// 一个更普遍的用法
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	// rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
	// 利用rtrim正则清楚文本两端的空白
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	// 转换一个类似数组的对象成为真正的JavaScript数组
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			// arr为类数组情况，通过merge方法来合并，否则通过数组的push方法
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	// 在数组中查找指定值并返回它的索引
	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// 合并两个数组内容到第一个数组
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	/**
	 * 查找满足过滤函数的数组元素。原始数组不受影响
	 *
	 * @param {Array} elems 用于查询元素的数组
	 * @param {Function} callback 该函数来处理每项元素的比对。
	 * @param {Boolean} 如果“invert”为false，或没有提供，
	 * 函数返回一个“callback”中返回true的所有元素组成的数组。
	 * 如果“invert”为true，函数返回一个“callback”中返回false的所有元素组成的数组。
	 */
	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	// 将一个数组中的所有元素用callback遍历后并返回一个新数组
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	/**
	 * 接受一个函数，然后返回一个新函数，并且这个新函数始终保持了特定的上下文语境
	 *
	 * @param {Function} fn 将要改变上下文语境的函数
	 * @param {PlainObject} context 函数的上下文语境(this)会被设置成这个 object 对象
	 *
	 * 或
	 * @param {PlainObject} context 函数的上下文语境会被设置成这个 object 对象
	 * @param {String} name 将要改变上下文语境的函数名(这个函数必须是前一个参数 context 对象的属性)
	 */
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		// jQuery.proxy(context, name)
		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	// 现在时间
	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	// 支持
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),
function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

// 是否为数组或类数组
function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	// 类型为`function`或window时返回false
	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	// obj为元素节点时且length不为0，返回true
	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}

return jQuery;
});
```

上面的`class2type`我们看看它长啥样：

![enter image description here](http://cookfront.qiniudn.com/B5730971-FB5A-47DC-80DF-1CCB9F7A8181.png)

至此，`core.js`就介绍完毕了。


 


 


  [1]: http://stackoverflow.com/questions/4754560/help-understanding-jquerys-jquery-fn-init-why-is-init-in-fn
  [2]: http://cookfront.qiniudn.com/E6F1A1E2-5A90-4AEB-AE5A-F806F9DE2A3A.png