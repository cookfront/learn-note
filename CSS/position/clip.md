clip
========

`clip`属性定义了元素的哪一部分是可见的。clip 属性只适用于 `position: absolute`和`position: fixed`的元素。

## 语法

`clip`属性值只有三个可用值：

 - shape：目前只有`rect()`（矩形）
 - auto：默认属性，和没有设置该属性一样
 - inherit：从父元素继承该属性

```c
clip: shape | auto | inherit
```

## rect()方法

`rect()`方法需要传入4个以逗号分隔的值：

```c
clip: rect(<top>, <right>, <bottom>, <left>);
```

注意，这里的`right`和`bottom`和`CSS`中`margin`类似属性的`right`不同，请看下图：

![enter image description here](http://codropspz.tympanus.netdna-cdn.com/codrops/wp-content/uploads/2013/01/schema-clip.jpg)

从上图中可以看出，`right`是最左边算起，而不是最右，`bottom`是从最顶部算起。看一个例子：

```c
clip: rect(40px, 260px, 150px, 80px);
```

![enter image description here](http://codropspz.tympanus.netdna-cdn.com/codrops/wp-content/uploads/2013/01/schema1.jpg)

