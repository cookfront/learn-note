width
=======

`width`指定一个元素内容区域的宽度。内容区域是在元素的`padding`、`border`和`margin`里面。

对于`width`属性有几点需要注意的：

 - `width`属性不能应用于非替换(non-replaced)或行内元素，以及`table groups`和`table rows`
 - 对于绝对定位的元素，它们的百分比宽度是相对于它们包含块的`padding box`计算的

语法：

```c
width: [<length> | <percentage>] && [border-box | content-box]? | available | min-content | max-content | fit-content | auto
```

各属性值的意义：

 - `<length>`：固定宽度
 - `<percentage>`：相对于包含块的百分比宽度。注意绝对定位元素
 - border-box：`<length>`和`<percentage>`应用于元素的`border box`
 - content-box：`<length>`和`<percentage>`应用于元素的`content box`
 - min-content：内容的固有最小宽度。要注意，这个属性大部分浏览器还没有实现，所以要加浏览器前缀。这个属性非常有用，具体看这里：[Design From the Inside Out With CSS Min-Content](http://demosthenes.info/blog/662/Design-From-the-Inside-Out-With-CSS-MinContent)
 
 `css tricks`中也有一篇：[width](http://css-tricks.com/almanac/properties/w/width/)

下面通过一个例子来看看`min-content`，首先我们不设置`width: min-width`：

```c
figure {
  margin: 1em auto;
  background: #EFEFEF;
  border: 1px solid rgba(0,0,0,.1);
  padding: 1em;
}

img {
  display: block;
}

figcaption {
  padding: 1em 0;
}

<figure>
  <img src="http://cookfront.qiniudn.com/B5730971-FB5A-47DC-80DF-1CCB9F7A8181.png" alt="" />
  <figcaption>What a lovely kitten we got there in this image which is encapsulted in a figure element. How dear, look how long this caption is!</figcaption>
</figure>
```

你可以将代码拷贝到编辑器运行，看看效果是下面这样的：

![enter image description here](http://cookfront.qiniudn.com/7386A0E9-CA22-4EC1-ADB1-4F308270DC13.png)

然后再看看为`figure`添加`width: min-content`后：

```c
figure {
  width: -webkit-min-content;
  width: -moz-min-content;
  width: min-content;
  margin: 1em auto;
  background: #EFEFEF;
  border: 1px solid rgba(0,0,0,.1);
  padding: 1em;
}
```

效果如下：

![enter image description here](http://cookfront.qiniudn.com/F7B01591-61D4-457D-9446-D24E0FE0AFBE.png)


看到这个是不是惊呆了呀，`figure`的宽度竟然自适应了`img`标签中图片的宽度。

这个属性值的意义就是取用元素内容中固有宽度最小的宽度作为元素的宽度。如有误还请指正：cookfront@gmail.com

 - max-content：内容的固有首选宽度。解释的不明白，还是直接看例子吧，还是上面的代码，只是将`figure`改为`width: max-content`：

```c
figure {
  width: -webkit-max-content;
  width: -moz-max-content;
  width: max-content;
  margin: 1em auto;
  background: #EFEFEF;
  border: 1px solid rgba(0,0,0,.1);
  padding: 1em;
}
```

看看效果：

![enter image description here](http://cookfront.qiniudn.com/8F5ECB84-0AFB-4968-B086-1632C0954EBE.png)

可以看到这次`figure`是使用了`p`元素的宽度，我猜应该是会将元素内容中宽度最长的作为`figure`的宽度了。当我们再往`p`元素中添加一些内容，可以看到`figure`的宽度会不断增加。具体可以自己实验哟。

 - available：包含块的宽度减去水平 margin, border 和 padding。
 - fit-content：以下两种情况下的较大值：
	 - 固有的最小宽度（min-content）
	 - 固有首选宽度（max-content）和可用宽度（available）的较小值

