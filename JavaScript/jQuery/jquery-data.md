jQuery Data
========

`jQuery`的`Data`模块是用于在元素中存取任意数据，也可以删除相关数据。这个模块在`jQuery`的内部使用也很广泛。比如`toggleClass()`方法。

下面就来分析分析它的源代码，首先可以看的是构造函数：

```c
function Data() {
	// Support: Android<4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Math.random();
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;
```

上面在`Data()`中定义了一个`cache`的属性，这个属性时一个对象直接量，并且定义了一个`0`的属性。`this.expando`是每次新建一个`Data`对象时就会有一个不同的随机数，这个用于后面在元素上设置缓存数据时使用到，是避免循环引用的神来之笔。`Data.accepts`接受一个参数，判断该参数是否能缓存数据。

那数据缓存到哪里呢？缓存到`this.cache`中，那怎么去缓存呢？是不是可以这样呢：

```c
this.cache[elem] = this.cache[elem] || {};
this.cache[elem][name] = value;
```

这样肯定是不行的，会造成循环引用导致内存无法释放的情况。例如：

```c
var a = $('a');
var b = $('b');

this.cache[a]['b'] = b;
this.cache[b]['a'] = a;
```

那么`jQuery`是如何做的呢？它通过下面一种方式：

```c
var uid = 1;

elem[expando] = uid++;
cache[uid] = {}
```

在构造函数中有一个`this.expando`，当存取数据时，就会设置`expando`为一个属性，并且值为一个递增的索引并且会和`cache`中匹配的。首先看看`Data`的`key`方法，这个方法就是用于获取这个索引：

```c
key: function( owner ) {
	// We can accept data for non-element nodes in modern browsers,
	// but we should not, see #8335.
	// Always return the key for a frozen object.
	// owner是否能存取数据
	if ( !Data.accepts( owner ) ) {
		return 0;
	}

	// 属性描述
	var descriptor = {},
		// Check if the owner object already has a cache key
		// 确认owner对象是否有一个缓存key
		unlock = owner[ this.expando ];

	// If not, create one
	// 如果没有则创建一个
	if ( !unlock ) {
		unlock = Data.uid++;

		// Secure it in a non-enumerable, non-writable property
		// 将expando定义为owner的属性
		try {
			descriptor[ this.expando ] = { value: unlock };
			Object.defineProperties( owner, descriptor );

		// Support: Android<4
		// Fallback to a less secure definition
		} catch ( e ) {
			descriptor[ this.expando ] = unlock;
			jQuery.extend( owner, descriptor );
		}
	}

	// Ensure the cache object
	// 确保cache对象存在
	if ( !this.cache[ unlock ] ) {
		this.cache[ unlock ] = {};
	}

	// 返回索引
	return unlock;
},
```

有了这个方法，存取数据就方便多了，每次首先需要获取`key`，然后再从`cache[key]`中获取现有数据，再存取数据：

```c
set: function( owner, data, value ) {
	var prop,
		// There may be an unlock assigned to this node,
		// if there is no entry for this "owner", create one inline
		// and set the unlock as though an owner entry had always existed
		unlock = this.key( owner ),
		cache = this.cache[ unlock ];

	// Handle: [ owner, key, value ] args
	// 设置单个数据
	if ( typeof data === "string" ) {
		cache[ data ] = value;

	// Handle: [ owner, { properties } ] args
	// 设置多个数据
	} else {
		// Fresh assignments by object are shallow copied
		if ( jQuery.isEmptyObject( cache ) ) {
			jQuery.extend( this.cache[ unlock ], data );
		// Otherwise, copy the properties one-by-one to the cache object
		} else {
			for ( prop in data ) {
				cache[ prop ] = data[ prop ];
			}
		}
	}
	return cache;
},
get: function( owner, key ) {
	// Either a valid cache is found, or will be created.
	// New caches will be created and the unlock returned,
	// allowing direct access to the newly created
	// empty data object. A valid owner object must be provided.
	// 获取相应的缓存数据
	var cache = this.cache[ this.key( owner ) ];

	// key为undefined则返回全部数据，否则返回对应的数据
	return key === undefined ?
		cache : cache[ key ];
},
```

`Data`模块还提供了一个`access`方法，这个方法的好处就是你即可以获取数据，也可以存储数据：

```c
access: function( owner, key, value ) {
	var stored;
	// In cases where either:
	//
	//   1. No key was specified
	//   2. A string key was specified, but no value provided
	//
	// Take the "read" path and allow the get method to determine
	// which value to return, respectively either:
	//
	//   1. The entire cache object
	//   2. The data stored at the key
	//
	if ( key === undefined ||
			((key && typeof key === "string") && value === undefined) ) {

		stored = this.get( owner, key );

		return stored !== undefined ?
			stored : this.get( owner, jQuery.camelCase(key) );
	}

	// [*]When the key is not a string, or both a key and value
	// are specified, set or extend (existing objects) with either:
	//
	//   1. An object of properties
	//   2. A key and value
	//
	this.set( owner, key, value );

	// Since the "set" path can have two possible entry points
	// return the expected data based on which path was taken[*]
	return value !== undefined ? value : key;
},
```

有了数据，当然也需要移除数据了：

```c
remove: function( owner, key ) {
	var i, name, camel,
		unlock = this.key( owner ),
		cache = this.cache[ unlock ];

	// 如果key为undefined，则移除所有数据
	if ( key === undefined ) {
		this.cache[ unlock ] = {};

	} else {
		// Support array or space separated string of keys
		// key为数组的情况，会将key进行camelCase，也就是`aa-bb`会转换为`aaBb`
		if ( jQuery.isArray( key ) ) {
			// If "name" is an array of keys...
			// When data is initially created, via ("key", "val") signature,
			// keys will be converted to camelCase.
			// Since there is no way to tell _how_ a key was added, remove
			// both plain key and camelCase key. #12786
			// This will only penalize the array argument path.
			name = key.concat( key.map( jQuery.camelCase ) );
		} else {
			camel = jQuery.camelCase( key );
			// Try the string as a key before any manipulation
			if ( key in cache ) {
				name = [ key, camel ];
			} else {
				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				name = camel;
				name = name in cache ?
					[ name ] : ( name.match( rnotwhite ) || [] );
			}
		}

		// 遍历name，移除相关数据
		i = name.length;
		while ( i-- ) {
			delete cache[ name[ i ] ];
		}
	}
},
```

以上就是`Data`的核心部分了，有了这个，就可以封装方法到`jQuery.fn`上了。