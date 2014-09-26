flex-flow
========

`flex-flow`属性是`flex-direction`和`flex-wrap`两个属性的简写形式。

语法：

```c
flex-flow: <'flex-direction'> || <'flex-wrap'>
```

 - 初始值：取决于独立属性
	 - flex-direction: row
	 - flex-wrap: nowrap
 - 应用于：flex容器
 - 继承：无


实例：

```c
element { 
  /* Main-axis is the block direction with reversed main-start and main-end. Flex items are laid out in multiple lines */
  flex-flow: column-reverse wrap;            
}
```