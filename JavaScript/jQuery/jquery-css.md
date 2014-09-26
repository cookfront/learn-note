jQuery CSS
========

`CSS`模块主要是关于设置和获取样式表的相关操作，以及`hide()`、`show()`和`toggle()`方法。下面就来一一分析。

首先看下`jQuery.style()`，这个在api中是不存在的，主要是`jQuery`内部设置`CSS`属性时使用。在看这个方法的源代码之前，首先要看下面一个浏览器前缀修正的函数：

```c
	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// Check for vendor prefixed names
	// 检查浏览器前缀名是否存在
	// capName：name传入时时类似boxShadow的，capName则变成BoxShadow
	var capName = name[0].toUpperCase() + name.slice(1),
		// 保存当前name
		origName = name,
		i = cssPrefixes.length;

	// 遍历cssPrefies，确定name
	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}
```

上面这个方法主要是对于`CSS3`中一些方法需要添加浏览器前缀才能正常使用。例如，`box-shadow`在`webkit`内核的浏览器经过这个函数转换后就会成为`WebkitBoxShadow`。在这个方法之前`CSS`属性名已经经过了一层`jQuery.camelCase(name)`，这个方法就是把`box-shadow`转换为`boxShadow`。具体可以看这里：[jQuery core](https://github.com/cookfront/learn-note/blob/master/JavaScript/jQuery/jquery-core.md)。

经过了上面的转换后，就成了需要的名称了。下面看看`jQuery.style()`方法：

```c
// Get and set the style property on a DOM Node
style: function( elem, name, value, extra ) {

	// Don't set styles on text and comment nodes
	// 判断节点不存在或类型不正确时
	if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
		return;
	}

	// Make sure that we're working with the right name
	var ret, type, hooks,
		origName = jQuery.camelCase( name ),
		style = elem.style;

	// 更正name
	name = jQuery.cssProps[ origName ] ||
		( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

	// Gets hook for the prefixed version, then unprefixed version
	// 获取css钩子
	hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

	// Check if we're setting a value
	// 如果value不为undefined则是设置style
	if ( value !== undefined ) {
		type = typeof value;

		// Convert "+=" or "-=" to relative numbers (#7345)
		// rrelNum: /^([+-])=([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))/i
		// 这个主要用于value为 +=10 这样的，经过exec就会：
		// ["+=10", "+", "10", index: 0, input: "+=10"]
		if ( type === "string" && (ret = rrelNum.exec( value )) ) {
			// value就成为了最终要设置的值了
			value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
			// Fixes bug #9237
			type = "number";
		}

		// Make sure that null and NaN values aren't set (#7116)
		// 确保不会设置null或NaN的值
		if ( value == null || value !== value ) {
			return;
		}

		// If a number was passed in, add 'px' (except for certain CSS properties)
		// 如果type为number且CSS属性不是一个属性值为number的属性时，则加上`px`
		if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
			value += "px";
		}

		// Support: IE9-11+
		// background-* props affect original clone's values
		// support.clearCloneStyle = div.style.backgroundClip === "content-box";
		if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
			style[ name ] = "inherit";
		}

		// If a hook was provided, use that value, otherwise just set the specified value
		// 如果set提供了钩子，则使用钩子来设置style，否则通过style[name]的方式
		if ( !hooks || !("set" in hooks) ||
			(value = hooks.set( elem, value, extra )) !== undefined ) {

			style[ name ] = value;
		}

	} else {
		// If a hook was provided get the non-computed value from there
		// 如果存在get钩子，则使用钩子来获取
		if ( hooks && "get" in hooks &&
			(ret = hooks.get( elem, false, extra )) !== undefined ) {

			return ret;
		}

		// Otherwise just get the value from the style object
		// 否则通过style[name]
		return style[ name ];
	}
},
```

下面来看`jQuery.css()`，这个在内部用于获取元素的CSS属性值，首先要看一个函数，这个函数文件在`src/css/curCSS.js`：

这个函数是用于获取elem元素的`CSS`中name属性计算后的值。

```c
function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	// 通过getComputedStyle(elem)获取计算后的样式
	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	// 如果存在计算样式，则获取相关CSS属性名name的存在ret中
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		// ret为空且在document中不存在elem时，则通过jQuery.style(elem, name)获取
		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values,
		// but width seems to be reliably pixels
		// this is against the CSSOM draft spec:
		// http://dev.w3.org/csswg/cssom/#resolved-values
		// 如果ret的值为长度，且单位不为px，且name为margin
		// 也就是如果margin样式的值不为px单位时
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}
```

看完了这个`curCSS()`下面这个`jQuery.css()`就很简单了，它是获取元素的CSS属性值：

```c
css: function( elem, name, extra, styles ) {
	var val, num, hooks,
		origName = jQuery.camelCase( name );

	// Make sure that we're working with the right name
	name = jQuery.cssProps[ origName ] ||
		( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

	// Try prefixed name followed by the unprefixed name
	// 获取对应钩子
	hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

	// If a hook was provided get the computed value from there
	// 如果提供了get钩子，则获取值存在val中
	if ( hooks && "get" in hooks ) {
		val = hooks.get( elem, true, extra );
	}

	// Otherwise, if a way to get the computed value exists, use that
	// 否则，通过curCSS()获取对应计算的值
	if ( val === undefined ) {
		val = curCSS( elem, name, styles );
	}

	// Convert "normal" to computed value
	// 将属性值为normal的转换为计算后的值
	// cssNormalTransform = {
	// 	letterSpacing: "0",
	// 	fontWeight: "400"
	// },
	// 这里即使如果name为font-weight时且设置了normal，则会转换为400
	if ( val === "normal" && name in cssNormalTransform ) {
		val = cssNormalTransform[ name ];
	}

	// Make numeric if forced or a qualifier was provided and val looks numeric
	if ( extra === "" || extra ) {
		num = parseFloat( val );
		return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
	}
	return val;
}
```

上面介绍完了`jQuery.style()`和`jQuery.css()`，其实这两个函数都是为`.css()`服务的，当设置值时通过`jQuery.style()`，当获取值时通过`jQuery.css()`。下面看看源代码：

```c
css: function( name, value ) {
	return access( this, function( elem, name, value ) {
		var styles, len,
			map = {},
			i = 0;

		// 如果name为数组时
		if ( jQuery.isArray( name ) ) {
			// 获取元素的计算样式
			styles = getStyles( elem );
			len = name.length;

			// 遍历name，并将其属性值存入map中，并返回
			for ( ; i < len; i++ ) {
				map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
			}

			return map;
		}

		return value !== undefined ?
			jQuery.style( elem, name, value ) :
			jQuery.css( elem, name );
	}, name, value, arguments.length > 1 );
},
```

上面的`access`在[jQuery attributes](https://github.com/cookfront/learn-note/blob/master/JavaScript/jQuery/jquery-attributes.md)介绍过。

最后就是`show()`和`hidden()`了，这两个方法都是通过一个`showHide()`来实现。首先看看`show()`和`hidden()`代码：

```c
show: function() {
	return showHide( this, true );
},
hide: function() {
	return showHide( this );
},
```

可以看到`showHide()`第二个参数为`true`时就是显示，否则隐藏。下面看看`showHide()`代码：

```c
function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		// 获取存储的olddisplay，也可能为空
		values[ index ] = dataPriv.get( elem, "olddisplay" );
		// 获取元素的display
		display = elem.style.display;
		// 如果是显示元素
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			// 如果不存在`values[index]`，也即上面通过`dataPriv`获取的，且display为none时
			// 重置display为 ""
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			// 如果display为空且isHidden(elem)
			// isHidden()在display: none或元素不在文档中时返回true
			if ( elem.style.display === "" && isHidden( elem ) ) {
				// 存储olddisplay
				values[ index ] = dataPriv.access(
					elem,
					"olddisplay",
					defaultDisplay(elem.nodeName)
				);
			}
		} else {
			// 元素是否hidden
			hidden = isHidden( elem );

			// 如果display不为none，且不hidden
			if ( display !== "none" || !hidden ) {
				// 存储olddisplay
				dataPriv.set(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		// 设置display
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}
```

至此，`CSS`模块就介绍的差不多了。