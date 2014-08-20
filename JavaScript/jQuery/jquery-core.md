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

    // 因为$其实返回的是`init`的构造函数，这里将`constructor`更正到`jQuery`，没了这句就是返回`init`了哦
	constructor: jQuery,

	// Start with an empty selector
	// 默认选择器为空
	selector: "",

	// The default length of a jQuery object is 0
	// 默认长度为0
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
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

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
 


 


  [1]: http://stackoverflow.com/questions/4754560/help-understanding-jquerys-jquery-fn-init-why-is-init-in-fn
  [2]: http://cookfront.qiniudn.com/E6F1A1E2-5A90-4AEB-AE5A-F806F9DE2A3A.png