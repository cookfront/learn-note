# background

`background` 其实是在样式表中设置背景时的一种简写。 `background` 可以被用于设置1个或多个后面这些属性中的值： `background-clip`、 `background-color`、 `background-image`、 `background-origin`、 `background-position`、 `background-repeat`、 `background-size` 和 `background-attachment` 。

## 语法 
- 语法：
```c
background: [ <bg-layer>, ]* <final-bg-layer>

<bg-layer> = [ background-image ] || [ background-position ] [ / background-size ]? || [ background-repeat ] || [ background-attachment ] || [ [ background-origin ] || [ background-clip ] ]{1,2}

<final-bg-layer> = [ background-color ] || [ background-image ] || [ background-position ] [ / background-size ]? || [ background-repeat ] || [ background-attachment ] || [ [ background-origin ] || [ background-clip ] ]{1,2}
```
- 初始值：
	 - background-image: none
	 - background-position: 0% 0%
	 - background-size: auto auto
	 - background-repeat: repeat
	 - background-origin: padding-box
	 - background-clip: border-box
	 - background-color: transparent
 - 应用于：所有元素
 - 继承：无
 - 百分比：
	 - background-position：相对于 `background position` 区域的大小减去 `background image` 的大小。
	 - background-size：相对于 `background position` 区域
