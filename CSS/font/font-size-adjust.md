font-size-adjust
========

对于给出的字号，显式的字号和方便阅读的文本使用不同的字体。对于诸如拉丁或斯拉夫的区分大、小写字母的脚本，小写字母与和其对应的大写字母的相对高度取决于易读性因素。这通常被称为纵横值。精确定义是，其等于字体的x轴高度除以字号。

在使用后备字体的情况下，后备字体可能不会与期望的字体家族共享相同的纵横比，因此也会造成可读性降低。`font-size-adjust`属性是一种在使用后备字体时保持文本可读性的方法。其使用的方法是调整字号，来使得无论使用何种字体都使其拥有相同的x轴高度。

实例：

下面的样式定义Verdana为期望的字体，但如果Verdana不可用，则使用Futura或Times。

```c
p { 
    font-family: Verdana, Futura, Times; 
}

<p>Lorem ipsum dolor sit amet, ...</p>
```

Verdana具有较高的纵横比，小写字母与大写字母的比例相对较高，所以较小字号的字体能够清晰的显示。Times具有较低的纵横比，所以如果使用后备字体，较小字号的字体较Verdana会具有较低的清晰度。

这些字体将如何显示的比较如下，各列分别展示用Verdana、Futura和Times显示的文本。每行中的各单元格使用相同的‘font-size’值，其中的红线展示在x轴高度上的差异。在上半部分中各行使用相同的‘font-size’值显示。‘font-size’值的相同同样适用于下半部分，但在下半部分中，同时设置了‘font-size-adjust’属性，这使得实际的字号被调整为保持各行的x轴高度。注意在下半部分中较小的文本仍然能够清晰的显示。

![enter image description here](http://www.w3.org/TR/css3-fonts/fontsizeadjust.png)

此属性允许编码人员为一个元素指定一个纵横值，这能够有效的保持首选字体的x轴高度，而不考虑首选字体是否被替代。其值的意义如下：

 - none：不保持字体的x轴高度
 - 数值：指定用于计算下列公式的纵横值，以计算调整后的字号。

```c
c  =  ( a / a' ) s
```

其中：

 - s = font-size值
 - a = font-size-adjust属性指定的纵横值
 - a'= 实际字体的纵横值
 - c = 调整后的font-size

该值将应用于任意选中的字体，但典型的用户是，其应当基于font-family列表中第一个字体的纵横值。如果进行了精确指定，则上述公式中的(a/a')对于第一个字体直接为1，且不需要进行调整。如果进行了不精确指定，使用家族列表中第一个字体显示的文本将与在不支持font-size-adjust的旧用户代理上的显示不同。