CSS 选择器
========

## 相邻兄弟选择器（E＋ F）

相邻兄弟选择器可以选择紧接在另一元素后的元素，而且他们具有一个相同的父元素，换句话说，EF两元素具有一个相同的父元素，而且Ｆ元素在Ｅ元素后面，而且相邻，这样我们就可以使用相邻兄弟元素选择器来选择Ｆ元素。

### 语法

```c
former_element + target_element { style properties }
```

### 实例

```c
li:first-of-type + li {
  color: red;
}

<ul>
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
</ul>
```

## 属性选择器

属性选择器选择给定属性或给定属性值的元素。

 - [attr]：代表具有属性名`attr`的元素
 - [attr=value]：代表具有属性名`attr`且其值为`value`的元素
 - [attr~=value]：代表具有属性名`attr`且其值是一个空白分隔的值列表，并且在这个值列表中有一个`value`的值的元素
 - [attr|=value]：代表了具有属性名`attr`，且其值为`value`或以`value-`开头的元素
 - [attr^=value]：代表了具有属性名`attr`，且其值以`value`开头的元素
 - [attr$=value]：代表了具有属性名`attr`，且其值以`value`结尾的元素
 - [attr*=value]：代表了具有属性名`attr`，且其值中包含`value`的元素

### 实例

```c
/* All spans with a "lang" attribute are bold */
span[lang] {font-weight:bold;}
 
/* All spans in Portuguese are green */
span[lang="pt"] {color:green;}

/* All spans in US English are blue  */
span[lang~="en-us"] {color: blue;}

/* Any span in Chinese is red, matches simplified (zh-CN) or traditional (zh-TW) */
span[lang|="zh"] {color: red;}

/* All internal links have a gold background */
a[href^="#"] {background-color:gold}

/* All links to urls ending in ".cn" are red */
a[href$=".cn"] {color: red;}

/* All links to with "example" in the url have a grey background */
a[href*="example"] {background-color: #CCCCCC;}
```

```c
<div class="hello-example">
    <a href="http://example.com">English:</a>
    <span lang="en-us en-gb en-au en-nz">Hello World!</span>
</div>
<div class="hello-example">
    <a href="#portuguese">Portuguese:</a>
    <span lang="pt">Olá Mundo!</span>
</div>
<div class="hello-example">
    <a href="http://example.cn">Chinese (Simplified):</a>
    <span lang="zh-CN">世界您好！</span>
</div>
<div class="hello-example">
    <a href="http://example.cn">Chinese (Traditional):</a>
    <span lang="zh-TW">世界您好！</span>
</div>
```

## 子元素选择器(E > F)

子元素选择器只能选择某元素的子元素，其中E为父元素，而F为子元素，其中E>F所表示的是选择了Ｅ元素下的所有子元素Ｆ。这和后代选择器（Ｅ Ｆ）不一样，在后代选择器中Ｆ是Ｅ的后代元素，而子元素选择器Ｅ > F，其中Ｆ仅仅是Ｅ的子元素而以。

### 语法

```c
selector1 > selector2 { style properties }
```

### 实例

```c
span { background-color: white; }
div > span {
  background-color: DodgerBlue;
}

<div>
  <span>Span 1. In the div.
    <span>Span 2. In the span that's in the div.</span>
  </span>
</div>
<span>Span 3. Not in a div at all</span>
```

## class选择器

这个用法之普遍就不说了。

## 后代选择器(E F)

后代选择器也被称作包含选择器,所起作用就是可以选择某元素的后代元素，比如说:E F，前面E为祖先元素，Ｆ为后代元素，所表达的意思就是选择了Ｅ元素的所有后代Ｆ元素，请注意他们之间需要一个空格隔开。这里Ｆ不管是E元素的子元素或者是孙元素或者是更深层次的关系，都将被选中，换句话说，不论Ｆ在Ｅ中有多少层关系，都将被选中。

### 语法

```c
selector1 selector2 { style properties }
```

### 实例

```c
span { background-color: white; }
div span { background-color: DodgerBlue; }

<div>
  <span>Span 1.
    <span>Span 2.</span>
  </span>
</div>
<span>Span 3.</span>
```

## 通用兄弟选择器(E ~ F)

通用兄弟元素选择器是CSS3新增加一种选择器，这种选择器将选择某元素后面的所有兄弟元素，他们也和相邻兄弟元素类似，需要在同一个父元素之中，换句话说，E和F元素是属于同一父元素之内，并且F元素在Ｅ元素之后，那么E ~ F 选择器将选择中所有Ｅ元素后面的Ｆ元素。

### 语法

```c
element ~ element { style properties }
```

### 实例

```c
p ~ span {
  color: red;
}

<span>This is not red.</span>
<p>Here is a paragraph.</p>
<code>Here is some code.</code>
<span>And here is a span.</span>
```

## ID选择器

这个也太常用了。

## 类型选择器

`CSS`的类型选择器通过`node name`（元素名）来匹配元素。

### 语法

```c
element { style properties }
```

### 实例

```c
span {
  background-color: DodgerBlue;
  color: #ffffff;
}

<span>Here's a span with some text.</span>
<p>Here's a p with some text.</p>
```

## 通用选择器(*)

通用选择器将匹配所有的元素。

### 实例

```c
*[lang^=en]{color:green;}
*.warning {color:red;}
*#maincontent {border: 1px solid blue;}

<p class="warning">
  <span lang="en-us">A green span</span> in a red paragraph.
</p>
<p id="maincontent" lang="en-gb">
  <span class="warning">A red span</span> in a green paragraph.
</p>
```





