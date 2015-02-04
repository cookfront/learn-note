CSS 选择器
========

本文是从[Selectors Level 3](http://www.w3.org/TR/css3-selectors/#selector-syntax)提取出的一些重点，如有不懂的地方可以看原文对照。

## 1. 选择器语法

一个选择器是一个或多个被[连结符](http://www.w3.org/TR/css3-selectors/#combinators)分隔的简单选择器序列组成的链。一个[伪元素](http://www.w3.org/TR/css3-selectors/#pseudo-elements)可能会附加到选择器中的最后一个简单选择器序列。

一个简单选择器序列是没有被[连结符](http://www.w3.org/TR/css3-selectors/#combinators)分隔的[简单选择器](http://www.w3.org/TR/css3-selectors/#simple-selectors-dfn)组成的链。它总是以一个[类型选择器](http://www.w3.org/TR/css3-selectors/#type-selectors)或[通用选择器](http://www.w3.org/TR/css3-selectors/#universal-selector)开始。除了类型选择器和通用选择器，没有其他类型的选择器允许在序列中。

一个简单选择器可以是[类型选择器](http://www.w3.org/TR/css3-selectors/#type-selectors)，[通用选择器](http://www.w3.org/TR/css3-selectors/#universal-selector)，[属性选择器](http://www.w3.org/TR/css3-selectors/#attribute-selectors)，[类选择器](http://www.w3.org/TR/css3-selectors/#class-html)，[id选择器](http://www.w3.org/TR/css3-selectors/#id-selectors)或[伪类](http://www.w3.org/TR/css3-selectors/#pseudo-classes)。

连结符可以是：空白、`>`、`+`、`~`。

一个文档树的元素被选择器所代表，它是选择器的主题（subject）。一个选择器组成了一个简单选择器的单一序列，代表了任何满足它需求的元素。前面加上其他的简单选择器序列，且序列中的连结符施加了额外的匹配限制，所以一个选择器的主题总是最后一个简单选择器序列所代表的元素的子集。

一个空的选择器，没有包含简单选择器序列和伪元素，是一个[无效的选择器](http://www.w3.org/TR/css3-selectors/#Conformance)。

选择器中的字符可以根据在`CSS2`中相同的[转义规则](http://www.w3.org/TR/CSS21/syndata.html#characters)并通过`\`来转义。

## 2.  选择器组

一个逗号分隔的选择器列表表示了被任何单一选择器选择的所有元素的组合。例如，在`CSS`中当一些选择器共享相同的声明时，它们可以组合成一个逗号分隔的列表。空格可能出现在逗号的前面或后面。

**`CSS`实例：**

```css
h1 { font-family: sans-serif }
h2 { font-family: sans-serif }
h3 { font-family: sans-serif }
```

上面等价于：

```css
h1, h2, h3 { font-family: sans-serif }
```

**注意：**在本例中等价是真的，因为所有的选择器是有效的选择器。如果选择器中的一个是无效的选择器，那么整个声明是无效的。

无效的`CSS`实例：

```css
h1 { font-family: sans-serif }
h2..foo { font-family: sans-serif }
h3 { font-family: sans-serif }
```

不等价于：

```css
h1, h2..foo, h3 { font-family: sans-serif }
```

在实际应用中也没有人这样写了。否则肯定早晚开除了。

## 3. 简单选择器

### 3.1 类型选择器

一个类型选择器是文档语言元素类型的名称，并使用[CSS qualified names](http://www.w3.org/TR/css3-namespace/#css-qnames)语法。一个类型选择器表示了在文档树中元素类型的实例。

**实例**：

以下的选择器表示了在文档树中的`h1`元素：

```css
h1
```

#### 3.1.1 类型选择器和命名空间

类型选择器允许一个可选的命名空间组件：一个命名空间前缀被定义在元素名的前面，并通过`|`符号来分隔。

命名空间可能为空，代表了选择器没有命名空间。

一个`*`可被用作为命名空间前缀，表明代表了元素的所有命名空间。

元素类型选择器在没有命名空间组件时代表了元素不会考虑元素的命名空间（等价于`*|`），除非定义了一个默认的命名空间。如果一个默认命名空间被声明，这些元素会代表在默认命名空间中的元素。

那怎么定义默认命名空间呢？

```css
@namespace "http://www.w3.org/1999/xhtml";
@namespace svg "http://www.w3.org/2000/svg";
```

上面的`http://www.w3.org/1999/xhtml`就为默认的命名空间。

总结(要注意的是`|`前后没有空格的哟)：

**ns|E**
元素为`E`且在命名空间`ns`中

***|E**
元素为`E`且在任何命名空间中

**|E**
元素为`E`且没有命名空间

**E**
如果没有为选择器定义默认的命名空间，这个等价于`*|E`。否则等价于`ns|E`，且`ns`为默认的命名空间。

`CSS`实例：

```css
@namespace foo url(http://www.example.com);
 foo|h1 { color: blue }  /* first rule */
 foo|* { color: yellow } /* second rule */
 |h1 { color: red }      /* ...*/
 *|h1 { color: green }
 h1 { color: green }
```

第一条规则只会匹配在`http://www.example.com`命名空间中的`h1`元素。
第二条规则会匹配在`http://www.example.com`命名空间中的所有元素。
第三条规则只会匹配没有命名空间的`h1`元素。
第四条规则会匹配在任何命名空间中的`h1`元素。
第五条规则等价于第四条规则，因为没有默认的命名空间被定义。

### 3.2 通用选择器

通用选择器，用`*`来表示，它代表了任何元素类型的限定名。它代表了在文档树中的任何命名空间的任何单一元素，如果没有为选择器指定默认的命名空间。如果指定了默认的命名空间，可以看下面的[通用选择器和命名空间](http://www.w3.org/TR/css3-selectors/#univnmsp)。

如果一个通用选择器不是选择器序列的唯一组件，或者它后面紧跟了[伪元素](http://www.w3.org/TR/css3-selectors/#pseudo-elements)，那么`*`可以省略，通用选择器隐含的表示存在。

**实例：**

 - `*[hreflang|=en]`和`[hreflang|=en]`是等价的
 - `*.warning`和`.warning`是等价的
 - `*#myid`和`#myid`是等价的

#### 3.2.1 通用选择器和命名空间

通用选择器允许一个可选的命名空间组件。它可以按照以下方式来使用：

`ns|*`
在`ns`命名空间中的所有元素

`*|*`
所有元素

`|*`
所有没有命名空间的元素

`*`
如果没有默认指定默认的命名空间，则等价于`*|*`，否则等价于`ns|*`，如果`ns`为默认的命名空间。

### 3.3 属性选择器

选择器允许表示元素的属性。当选择器被用作为一个表达式来匹配元素时，属性选择器必须认为匹配元素如果元素有一个属性且匹配属性选择器所代表的属性时。

#### 3.3.1 属性存在和值选择器

`CSS2`介绍了四种属性选择器：

`[att]`
代表了元素有一个`att`属性，不管属性的值是什么。

`[att=val]`
代表了元素有一个`att`属性，且值为`val`。这种可以用于选择例如：`input[type="text"]`

`[att~=val]`
代表了元素有一个`att`属性，且它的值为空白分隔的列表，其中的一个值为`val`，如果选择器中的`val`包含了空白，它永远不会代表什么。同样，如果`val`为空字符串，它永远不会代表什么。

`[att|=val]`
代表了元素有一个`att`属性，且它的值为`val`或者`val`紧跟着`-`。

**实例：**

下面的属性选择器代表了`h1`元素，且它有一个`title`属性，且不管值为多少：

```css
h1[title]
```

下面的例子选择器代表了一个`span`元素它的`class`属性的值为`example`：

```css
span[class="example"]
```

下面的选择器代表了一个`a`元素，且它的`hreflang`属性值为`en`或`en-US`等

```css
a[hreflang|="en"]
```

#### 3.3.2 子字符串匹配属性选择器

三个附加的属性选择器被提供给匹配属性值的子字符串：

`[att^=val]`
代表了元素有一个`att`属性，且值以`val`前缀开始。如果`val`为空字符串，则这个选择器不会代表任何元素

`[att$=val]`
代表了元素有一个`att`属性，且值以`val`后缀结束。如果`val`为空字符串，则这个选择器不会代表任何元素

`[att*=val]`
代表了元素有一个`att`属性，且值包含至少子字符串`val`的一个实例。如果`val`为空字符串，则这个选择器不会代表任何元素

**实例：**

下面的选择器代表了一个`HTML`的`object`，引用了一个图片：

```css
object[type^="image/"]
```

下面的选择器代表了一个`HTML`链接`a`，且它的`href`属性以`.html`结尾：

```css
a[href$=".html"]
```

下面的选择器代表了`HTML`段落中`title`属性包含了子字符串`hello`：
```css
p[title*="hello"]
```

#### 3.3.3 属性选择器和命名空间

在属性选择器中的属性名是以[CSS限定名](http://www.w3.org/TR/css3-namespace/#css-qnames)给出：先前已声明的命名空间前缀可预先准备给由命名空间分隔符`|`分隔的属性名。为了保持命名空间在`XML`中的推荐，默认的命名空间不会应用到属性中，因此，没有命名空间组件的属性选择器只应用到那些没有命名空间的属性。一个`*`可能被用于命名空间前缀以表明该选择器可匹配所有属性名而不用考虑属性的命名空间。

一个属性选择器有一个属性名包含了命名空间前缀，但是该命名空间没有在之前定义，这时该属性选择器是一个无效的选择器。

`CSS`实例：

```css
@namespace foo "http://www.example.com";
[foo|att=val] { color: blue }
[*|att] { color: yellow }
[|att] { color: green }
[att] { color: green }
```

第一条规则只匹配有在`http://www.example.com`命名空间下的属性`att`，且值为`val`的元素。

第二条规则只匹配具有属性`att`，且不管属性的命名空间。

最后两条规则是等价的，且只匹配具有属性`att`，且该属性不在任何命名空间下的元素。

#### 3.3.4 在`DTDs`中的默认属性值

属性选择器代表了在文档树中的属性值。文档树如何构建是在选择器之外的。在某些文档格式中，默认的属性值可以定义在`DTD`或其他地方，如果它们出现在文档树中的话，这些只能通过属性选择器来选择。选择器的设计应该使它们工作，不管默认值是否包含在文档树中。

例如，一个`XML`的用户代理可能并不需要去读取一个`DTD`的`外部子集`，但是需要在文档的`内部子集`寻找默认属性值（看这里：[XML10](http://www.w3.org/TR/css3-selectors/#XML10)）。取决于用户代理，一个定义在`DTD`的外部子集的默认的属性值可能会或可能不会出现在文档树中。

一个识别`XML`命名空间的用户代理可能不需要利用它的对于那个命名空间的认知来对待默认的属性值，就好像它们就在文档中。（例如，一个`XHTML`的用户代理不需要利用它内置的该`XHTML DTD`的认知）

**实例：**

考虑一个元素`example`，它有一个属性`radix`，且其默认值为`decimal`。`DTD`片段可能为：

```html
<!ATTLIST EXAMPLE radix (decimal,octal) "decimal">
```

如果样式表包含了这些规则：

```css
EXAMPLE[radix=decimal] { /*... default property settings ...*/ }
EXAMPLE[radix=octal]   { /*... other settings...*/ }
```

第一条规则可能不会匹配那些`radix`属性被设置为默认值的元素，即为明确设置。为了捕获所有情况，属性选择器的默认值必须被舍弃：

```css
EXAMPLE                { /*... default property settings ...*/ }
EXAMPLE[radix=octal]   { /*... other settings...*/ }
```

### 3.4 类选择器

与`HTML`工作，作者可能会使用`句点`符号（也就是`.`）来代替`~=`符号表示`class`属性。因此，对于`HTML`，`div.value`和`div[class~=value]`是具有同样的含义的。该属性值必须紧跟在`.`符号后面。

如果用户代理具有命名空间特定的知识，且允许它确定哪个属性是`class`属性用于各个命名空间，用户代理可能使用`.`符号在`XML`文档中应用选择器。

**CSS实例：**

我们可以通过以下方式来分配样式给所有`class~="pastoral"`的元素：

```css
*.pastoral { color: green }  /* all elements with class~=pastoral */
```

或者只是：

```css
.pastoral { color: green }  /* all elements with class~=pastoral */
```

以下只分配样式给所有`class~="pastoral"`的`h1`元素：

```css
H1.pastoral { color: green }  /* H1 elements with class~=pastoral */
```

### 3.5 ID选择器

文档语言可以包含声明为ID类型的属性。ID类型属性的特殊之处在于在一致性的文档中没有两个这样的属性可以有相同的值，且不管携带该属性的元素类型；无论什么文档语言，一个ID类型属性可被用于唯一地标识其元素。

ID选择器是以`#`开头，然后紧跟着ID值。

**实例：**

以下ID选择器代表了一个`h1`元素，且它的id属性值为`chapter1`

```css
h1#chapter1
```

不过很少会像上面这样写，一般是像下面这样：

```css
#chapter1
```

### 3.6 伪类

伪类的概念被引入以允许选择位于该文档树以外或者使用其他简单选择器不能表达的信息。

一个伪类总是包含`:`跟着伪类的名称和一个可选的值被放在圆括号之间。

伪类中允许包含在选择器中的所有简单选择器序列。伪类可以出现在简单选择器序列的任何地方，类型选择器和通用选择器（可能省略）后面。伪类名是不区分大小写。一些伪类是相互排斥的，而另一些可以同时施加到相同的元素。伪类可能是动态的，在这个意义上，元素可能获得或失去一个伪类当用户与文档进行交互的时候。

#### 3.6.1 动态伪类

动态伪类在特性上分类元素，除了它们的名字、属性或内容，原则上特性不能从文档树中推断出来。

动态伪类不会出现在文档源或文档树中。

##### 3.6.1.1 链接伪类：`:link`和`:visited`

用户代理通常显示未访问的链接不同于之前访问过的。选择器提供了伪类`:link`和`:visited`来区分它们。

 - `:link`伪类应用在那些没有被访问过的链接
 - `:visited`伪类应用在那些已经被用户访问过的链接

经过一定的时间，用户代理可能选择返回一个访问过的链接为`:link`状态。

这两种状态是互斥的。

**实例：**

下面的选择器代表了有一个`external`类的链接，且被访问过：

```css
a.external:visited
```

用户代理可能会因此对待所有的链接为未访问链接，或者采取其他措施以保护用户的隐私，而对访问和未访问链接渲染出不同。

##### 3.6.1.2 用户动作伪类`:hover`、`:active`和`:focus`

交互式用户代理有时会为了响应用户操作而改变呈现。选择器提供了三个伪类来选择这些用户正在作用的元素。

 - `:hover`伪类应用在当用户通过定位设备来指定元素，但不一定激活它时。例如，一个视觉用户代理可以应用伪类当光标悬停到元素所生成的盒子上时。用户代理不支持交互式媒体的不需要支持该伪类。支持交互式媒体的一些用户代理可能无法支持这个伪类。
 - `:active`伪类应用在正被用户激活的元素上。例如，在用户按下鼠标按钮和释放它之间。在多于一个鼠标按钮的系统，`:active`仅应用在主激活按钮（通常是鼠标左键），以及它们的任意别名。
 - `:focus`伪类应用在获得焦点的元素

这些伪类不是相互排斥的。一个元素可以在相同的时间匹配的几个伪类。

选择器没有定义当元素的父亲也在`:active`或`:hover`状态时。

**实例：**

```css
a:link    /* unvisited links */
a:visited /* visited links */
a:hover   /* user hovers */
a:active  /* active links */
```

或者结合多个动态伪类：

```css
a:focus
a:focus:hover
```

#### 3.6.2 目标伪类`:target`

一些`URIs`会引用资源内的一个位置。这种类型的`URI`是以`#`紧跟锚标识符结束。

有片段标识浮的`URIs`链接到文档内的某个元素，被称为目标元素。举例来说，这里给出了一个`URI`指向文档中一个名为`section_2`的锚。

```c
http://example.com/html/top.html#section_2
```

一个目标元素可以使用`:target`伪类来表示。如果文档的URI没有片段标识符，则该文档没有目标元素。

**实例：**

```css
p.note:target
```

这个选择器代表了一个`p`标签，且它有一个类`note`，且它是指定`URI`的目标元素时。

#### 3.6.3 语言伪类`:lang`



#### 3.6.4 UI元素状态伪类

#### 3.6.5 结构伪类

#### 3.6.6 空白

#### 3.6.7 否定伪类

## 7. 伪元素

### 7.1 `::first-line`伪元素

### 