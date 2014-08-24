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

下面再来看`./attributes/prop.js`，这个主要设置元素的属性的。其实懂了上面的代码之后，看下面的代码就很容易了：

```c
// 可以获取焦点的元素
var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	// 通过access调用jQuery.prop
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	// 属性修正
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		// 不要在text、comment和attributes节点上设置特性
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		// 如果value不为undefined，则表明是设置属性
		// 如果在propHooks存在对应set的钩子，则通过钩子设置
		// 否则通过elem[name] = value直接设置
		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		// 如果propHooks存在对应的get钩子，则通过钩子设置
		// 否则直接获取
		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	// propHooks
	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) ||
					rfocusable.test( elem.nodeName ) || elem.href ?
						elem.tabIndex :
						-1;
			}
		}
	}
});

if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

// propFix 属性修正
jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});
```

不知道上面的代码看懂了没有，下面我们继续看`./attribues/classes.js`。这个文件主要是`addClass`，`removeClass`，`toggleClass`和`hasClass`方法。

```c
var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	/**
	 * 支持两种方式：
	 * 1. .addClass(value) 为每个匹配元素所要增加的一个或多个class名。
	 * 2. .addClass(function (index, currentClass)) 这个函数返回一个或更多用空格隔开的要增加的class名
	 */
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		// 如果value为函数，则遍历各元素添加被函数调用后的class名
		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		// 如果value为string，且value不为空
		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			// 利用rnotwhite 即/\S+/g将value分离成一个数组的多个class名
			classes = ( value || "" ).match( rnotwhite ) || [];

			// 遍历各元素，添加class
			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// 获取当前className，并替换掉\t\r\n\f，且在首尾添加" "
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					// 遍历classes添加class（如果在cur中存在的话）
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					// 去掉cur两端的空白
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;
		
		// 如果value为函数，则遍历各元素移除被函数调用后的class名
		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}

		// value为字符串，且不为空
		if ( proceed ) {
			// 利用rnotwhite 即/\S+/g将value分离成一个数组的多个class名
			classes = ( value || "" ).match( rnotwhite ) || [];

			// 遍历各元素移除class
			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				// 获取当前className，并替换掉\t\r\n\f，且在首尾添加" "
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					// 遍历classes，如果当前class中有则移除某个class
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					// 移除两端空白
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		// .toggleClass(value, stateVal) 调用方式
		// stateVal为true则添加class，否则移除class
		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		// .toggleClass(function (index, class, switch), switch) 调用方式
		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass(
					value.call(this, i, this.className, stateVal), stateVal
				);
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// Toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				// 遍历classNames如果元素有某个className则移除，否则添加
				while ( (className = classNames[ i++ ]) ) {
					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			// 切换所有的class名
			// 如果type为typeof undefined或type为boolean时移除所有的class
			} else if ( type === strundefined || type === "boolean" ) {
				// 如果存在className，则将其保存在元素上
				if ( this.className ) {
					// store className if set
					dataPriv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				// 如果value为false，则将className设为空，否则设为保存的className
				this.className = this.className || value === false ?
					"" :
					dataPriv.get( this, "__className__" ) || "";
			}
		});
	},

	// 判断是否有某个类
	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 &&
				(" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {

				return true;
			}
		}

		return false;
	}
});
```

介绍文了`classes.js`，还有就是`val.js`了，这里面就一个函数`.val()`，用于`<input>`或`<select>`等元素中的值的获取。下面看代码：

```c
var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		// 无参数为获取val的情况
		if ( !arguments.length ) {
			if ( elem ) {
				// 首先获取钩子
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				// 如果有get钩子，则通过get钩子获取值
				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				// 否则直接从elem.value中获取值
				ret = elem.value;

				// 替换掉ret中的\r为""
				return typeof ret === "string" ?
					// Handle most common string cases
					ret.replace(rreturn, "") :
					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		// value是否为函数
		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			// 如果不为元素节点直接返回
			if ( this.nodeType !== 1 ) {
				return;
			}

			// 如果value为函数，则将调用后的存储在val中
			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			// 如果val是数组，则转换为字符串
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			// 首先获取钩子
			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			// 如果不存在set钩子或者set钩子返回undefined，则通过this.value = val的方式
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

// 钩子
jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});
```

最后就剩下一个`support.js`了，这个主要是用于判断某些特性的支持，就不介绍了。至此`attributes`就介绍完了。