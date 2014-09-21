font-family
========

`font-family`属性允许指定一个优先字体家族（font family）名称列表和（或者）通用家族名为指定的选择元素。它不像其他`CSS`属性，它的属性值是以逗号分隔的多个值，这表明这些值是可替代的（下面会看到字体匹配算法）。浏览器首先选择列表中的第一个字体，如果该字体在用户电脑中已安装则使用，否则通过`@font-face`指定的信息来下载字体。

 - 初始值：根据用户代理的不同而不同
 - 取值：`[ <family-name> | <generic-family> ] #`
 - 应用于：所有元素
 - 继承：yes

这里存在两种字体家族（family）名称的类型：

 - 家族名称：例如`Helvetica`、`Verdana`
 - 通用家族名称：通用家族定义了下面的通用家族关键字：`serif`、`sans-serif`、`cursive`、`fantasy`和`monospace`。这些关键字可以被用作编码人员所选择的字体不可用时的通用后备机制。作为关键字，它们禁止使用引号。我们鼓励编码人员为了提高健壮性，将通用字体家族作为最终替代追加在字体列表之中。

字体家族名称必须是一个被引号包围的字符串，或者是没有被引号包围的一个或多个标识符序列。这意味着在没有被引号包围的字体家族名称中，必须避免在每个标记的起始处出现大部分标点字符和数字。

举例说明，下列声明是无效的：

```c
font-family: Red/Black, sans-serif;
font-family: "Lucida" Grande, sans-serif;
font-family: Ahem!, sans-serif;
font-family: test@foo, sans-serif;
font-family: #POUND, sans-serif;
font-family: Hawaii 5-0, sans-serif;
```

如果一个标识符序列作为字体家族名称给出，则其计算值是被转换为字符串的名称，在转换时，会将所有标识符通过一个单独的空格连接起来。

为了避免转码错误，我们建议把包含空格、数字或除连字符外标点字符的字体家族名称用引号包围：

```c
body { font-family: "New Century Schoolbook", serif }

<BODY STYLE="font-family: '21st Century', fantasy">
```

恰好与关键字值（‘inherit’、‘serif’、‘sans-serif’、‘monospace’、‘fantasy’和‘cursive’）相同的字体家族名称必须为了防止与同名关键字混淆而是用引号包围。关键字‘initial’和‘default’为未来使用而保留，且必须在用作字体名称时使用引号包围。

## 通用字体家族

### serif(衬线)

衬线字体的字形，如其在CSS中所使用的术语相同，拥有收笔、向外展开说收紧的端点、或者拥有实际的衬线端点（包括粗衬线）。衬线字体通常是按比例隔开的。通常在显示时，它们比‘无衬线（sans-serif）’通用字体家族在粗/细笔划间拥有更明显的变种。CSS将术语‘衬线（serif）’应用于所有脚本的字体，即使对于某些脚本其他名称可能更加熟悉，例如：Mincho（明朝体，日语）、Sung、Song或Kai（宋体、楷书，中文）、Batang（巴塘，韩语）。所有如此描述的字体都可能会被用于表示通用‘衬线（serif）’家族。

![enter image description here](http://www.w3.org/TR/css3-fonts/serifexamples.png)

### sans-serif(无衬线)

无衬线字体的字形，如其在CSS中所使用的术语相同，其笔划的端点没有格式——没有扩口、交叉笔划、或者其他装饰。无衬线字体通常是按比例隔开的。通常它们比‘衬线（serif）’家族的字体在粗/细笔划间拥有较小的差异。CSS将术语‘衬线（serif）’应用于所有脚本的字体，即使对于某些脚本其他名称可能更加熟悉，例如：Gothic（哥特式，日语）、Hei（黑体，中文）或Gulim（韩语）。所有如此描述的字体都可能会被用于表示通用‘无衬线（sans-serif）’家族。

![enter image description here](http://www.w3.org/TR/css3-fonts/sansserifexamples.png)

### cursive(手写体)

手写体字体的字形拥有连接的笔划或其他远超斜体字体字符的手写体特性。这些字形部分或完全的连接在一起，且产生的结果比印刷的字母更像是手写笔、手写刷。对于某些脚本，例如阿拉伯语，其几乎都是手写体。CSS将属于‘手写体（cursive）’应用于所有脚本的字体，即使对于某些脚本其他名称可能更加熟悉，例如： Chancery、Brush、Swing和Script。

![enter image description here](http://www.w3.org/TR/css3-fonts/cursiveexamples.png)

### fantasy(幻想)

幻想字体主要用于装饰包含幽默地表示字符的字体。它们不包括不表示实际字符的Pi或图片字体。

![enter image description here](http://www.w3.org/TR/css3-fonts/fantasyexamples.png)

### monospace(等宽字体)

等宽字体的唯一要求是所有字形都拥有相同的固定宽度。它们经常被用于显示计算机代码示例。

![enter image description here](http://www.w3.org/TR/css3-fonts/monospaceexamples.png)


## 字体匹配算法

首先来看看`CSS2.1`中对于字体匹配算法的描述：

 1. 用户代理访问一个数据库，里面有`CSS2.1`中属性相关的所有用户代理关注的字体。如果有两个字体有完全相同的属性（properties 是属性还是特性？），用户代理使用它们中的一个。
 2. 对于一个给定元素中的所有字符，用户代理收集应用于该元素的字体属性。使用所有的属性集，用户代理使用`font-family`属性去选择一个暂定的字体家族(family)。对家族的其余属性测试根据描述的匹配条件。如果匹配了所有剩余的属性，那么它就是给定元素或字符匹配的字体。
 3. 如果在第二步中处理时`font-family`没有匹配的字体，如果在`font-family`中还有下一个可替代的字体集，则用下一个可替代的`font-family`重复步骤2。
 4. 如果有一个匹配的字体，但是对于当前字符没有一个指定的字形(glyph)时，且有下一个可替代的`font-family`字体集，则用下一个可替代的`font-family`字体集重复步骤2。
 5. 如果没有一个合适的字体，则由用户代理来决定默认的`font-family`，并重复步骤2，使用默认的字体中获得一个最好的匹配字体。如果对于特定的字符在该字体不能显示时，那么用户代理可能使用其他的途径来决定一个合适的字体来显示该字符。用户代理必须匹配所有的字符，如果对于一个可见的符号没有合适的字体时，更可取的是使用一个`missing character`符号。

在上面的步骤2中每一个属性的匹配规则如下：

 1. `font-style`是首先尝试的。
 2. `font-variant`是第二个尝试的
 3. 接下来是`font-weight`，一般来说不会失败
 4. 最后是`font-size`，`font-size`必须匹配用户代理依赖的距离公差。（典型的，可缩放字体被四舍五入到最近的整数像素，而点阵字体的容差可以到20%。）进一步的计算（如其他属性中的“em”值）是基于使用的‘font-size’值，而不是指定的值。


上面翻译看不懂的话点这里：[fonts](http://www.w3.org/TR/CSS2/fonts.html)

然后点这里有相关`CSS3`中关于字体匹配算法的描述，这个描述更加详尽：[CSS3字体匹配算法](http://www.w3.org/html/ig/zh/wiki/CSS3%E5%AD%97%E4%BD%93%E6%A8%A1%E5%9D%97#.E5.AD.97.E4.BD.93.E5.8C.B9.E9.85.8D.E7.AE.97.E6.B3.95)

这里还有一篇：[浏览器如何渲染文本](http://blog.jjgod.org/2011/04/09/how-do-browsers-render-text/)
 
