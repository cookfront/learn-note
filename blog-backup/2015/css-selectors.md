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

在属性选择器中的属性名是以[CSS限定名](http://www.w3.org/TR/css3-namespace/#css-qnames)给出：