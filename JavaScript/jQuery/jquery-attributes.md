本文主要介绍`jQuery`的`attributes.js`。

`arrtributes.js`主要依赖了`./core`，`./attributes/attr`，`./attributes/prop`，`./attributes/classes`，`./attributes/val`，这五个文件，下面一一介绍。

`core.js`还请看这里[jQuery core](https://github.com/cookfront/learn-note/blob/master/JavaScript/jQuery/jquery-core.md)。

要注意的是`attr`和`prop`的区别，可以看这里：[attribute和property的区别](http://stylechen.com/attribute-property.html)

`./attributes/attr`：

首先来看看这段代码：

```c
jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		// 不要在text、comment和attributes节点上设置特性
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		// 如果不支持attributes，则使用prop
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		// 获取必要的钩子（如果定义了），非xml
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			// 首先判断attrHooks中是否有对应的钩子
			// 然后判断name是否为boolean值特性，如果为boolean值特性则调用boolHook，否则nodeHook
			// 如何判断是否为boolean值特性呢？ 利用这个正则表达式：/^(?:checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)$/i
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		// 值不为undefined，设置特性
		if ( value !== undefined ) {	

			// 如果value === null， 则移除相应的特性
			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			// 判断钩子是否存在，且钩子中存在`set`方法，则调用钩子中的set设置特性
			} else if ( hooks && "set" in hooks &&
				(ret = hooks.set( elem, value, name )) !== undefined ) {

				return ret;

			// 否则直接设置特性
			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		// 判断钩子中是否存在`get`方法，有则通过`get`钩子来获取特性
		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		// 否则直接get特性
		} else {
			// jQuery.extend( jQuery.find, {
			// 	attr: function( elem, name ) {
			// 		return elem.getAttribute( name );
			// 	}
			// });
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			// 将传入的value，利用正则表达式分隔成数组
			// 因为removeAttr支持value以空白分隔的多个值，即可以一次移除多个特性，只要以空白分隔
			// var value = "aa bb cc";
			// var rnotwhite = /\S+/g;
			// console.log(value.match(rnotwhite));	// ["aa", "bb", "cc"]
			attrNames = value && value.match( rnotwhite );

		// attrNames存在且为元素节点
		if ( attrNames && elem.nodeType === 1 ) {
			// 遍历attrNames移除多个特性
			while ( (name = attrNames[i++]) ) {
				// 修正属性名
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				// 可以看这里：http://bugs.jquery.com/ticket/10870
				// 判断是否为boolean值的特性
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	// attr方法中用到的钩子，这里只有type特性的set钩子
	// 设置或者获取特性时，首先需要从attrHooks中是否有对应的钩子，如果有则调用对应的钩子来设置或者获取
	// 而不是setAttribute或getAttribute
	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
// bool钩子
// 如果为boolean特性时，会调用该钩子来设置特性
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
```

上面的注释应该是非常清楚的了。不过是`jQuery.attr`和`jQuery.removeAttr`方法，那类似`$(selector).attr()`又在哪里呢？看下面哟：

```c
jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});
```

`$().attr()`内部就是通过`jQuery.attr`方法去设置或获取特性的，那access又是干嘛的呢？先看源代码再说`./core/access`：

```c
// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	// 通过对象直接量一次设置多个值
	// 类似这样
	// $(selector).attr({
	// 	name: 'something',
	// 	value: 10
	// });
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	// 设置一个值
	} else if ( value !== undefined ) {
		// value不等undefined时表示设置值，将chainable设置为true
		chainable = true;

		// 如果value不是function，则raw为true
		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		// bulk为true时，key == null
		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		// 设置elems
		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};
```

如注释所说，这个方法时一个多功能的方法，可以用来设置值，也可以用来获取值，还可以处理`value`为函数的情况，还有就是可以通过对象直接量来设置多个`key-value`。
