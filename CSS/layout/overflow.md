overflow
========

一般来说，一个块盒的内容展示局限在盒的内部，但是在某些情况下，盒可能会溢出。也就是盒的内容部分跑到盒的外面。例如：

 - 无法换行导致行盒比块盒宽
 - 块级盒比它的包含块宽
 - 元素的高度超过它的包含块
 - 一个绝对定位的子孙元素，部分内容在盒子外。但超出的部分不是总会被剪裁。子孙元素的内容就不会被子孙元素和其包含块之间的祖先元素的overflow的设置所剪裁。
 - 子孙盒通过负边距定位到盒外
 - `text-indent`属性让行内盒跑到块盒的左边或右边

而`overflow`属性指定了是否显示内容、渲染滚动条还是裁剪这些内容。

语法：

```c
overflow: visible | hidden | scroll | auto
```

使用`overflow`属性值不为`visible`的值会创建一个[BFC](https://developer.mozilla.org/en-US/docs/Web/CSS/block_formatting_context)。

它的各属性值的含义如下：

 - visible：默认值。不裁剪内容。
 - hidden：隐藏溢出容器的内容且不出现滚动条。
 - scroll：隐藏溢出容器的内容，溢出的内容将以卷动滚动条的方式呈现。
 - auto：当内容没有溢出容器时不出现滚动条，当内容溢出容器时出现滚动条，按需出现滚动条。

实例：

```c
p {  
    width: 12em;
    border: dotted;
    height: 50px;
    overflow: scroll;
}

<p>
overflow
Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
</p>
```

这里有一篇关于`overflow`是否失效的文章，值得学习：[overflow:hidden真的失效了吗](http://www.aliued.cn/2012/12/30/overflowhidden%E7%9C%9F%E7%9A%84%E5%A4%B1%E6%95%88%E4%BA%86%E5%90%97.html)

这里还有一篇关于`overflow`更详细的介绍：[CSS Overflow 属性](http://www.qianduan.net/css-overflow-property.html)


除了`overflow`，还有两个属性`overflow-x`和`overflow-y`，这两个属性就是分别设置`x`和`y`方向的`overflow`。粒度更细。