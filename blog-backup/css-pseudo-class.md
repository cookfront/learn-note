title: CSS 伪类选择器
date: 2014-03-30 10:19:04
categories: CSS
tags: [CSS, CSS3]
---

## :active

`:active` CSS伪类主要匹配当一个元素被用户激活时，这样就给页面一个反馈，说明浏览器已经检测到元素的激活。当用鼠标进行交互时，这通常代表了用户按下鼠标与释放鼠标这之间的过程。通常一般用于`<a>`和`<button>`元素上，但不仅仅只限于这些元素。

> 注：IE6,7只支持a元素的`:active`，从IE8开始支持其它元素的`:active`。

说到`:active`肯定会想起另外几个CSS伪类，那就是`:link`、`:hover`、`:visited`。下面来一一讲解，并用一个demo来展示。

## :link

`:link` CSS伪类可以让你设置链接在未被访问之前的的样式，但是必须将`:link`规则放在其他规则之前，遵循`LVHA-order`，也就是`:link` — `:visited` — `:hover` — `:active`。

## :visited

`:visited` CSS伪类让你选择那些已经被访问过的链接，同样需要遵循`LVHA-order`。

> 出于隐私保护的原因，浏览器严格限制了能应用在`:visited`元素上的样式。只能应用这些属性： `color`, `background-color`, `border-color`, `border-bottom-color`, `border-left-color`, `border-right-color`, `border-top-color`, `outline-color`, `column-rule-color`, `fill` 和 `strok`。[点这了解更多][1]

## :hover

`:hover` CSS伪类设置元素在鼠标悬停时的样式。

> 注： 1.IE6只支持a元素的:hover，从IE7开始支持其它元素的:hover。

下面来看看一个运用上面伪类的例子：[click me][2]。在这个demo中可以看到链接未访问之前是红色的，访问之后变为蓝色，当鼠标悬停时颜色为灰色，而当鼠标按下时有一个背景色。

## :checked

`:checked` CSS伪类只适用于`radio`、`checkbox`和`option`元素，当它们被选中时可以利用`:checked`设置它们的样式。

### 语法

```c
element:checked { style properties }
```

来看一个demo:[click me][3]

## :default

`:default` CSS伪类代表了任何用户界面中一组相同元素中默认的一个。例如，利用这个伪类在一大堆按钮中可以选择默认的按钮。而且允许选择多个默认的元素。[demo][4]

### 语法

```c
:default { style properties }
```


## :disabled

`:disabled` CSS伪类代表了那些被禁用的元素。一个元素被禁用，如果它不能被激活（例如，选中，点击或接受文本输入）或者接受焦点。元素还有一个激活状态，其中它可以被激活或接受焦点。

### 实例

```c
input[type="text"]:disabled { background: #ccc; }

<form action="#">
  <fieldset>
    <legend>Shipping address</legend>
    <input type="text" name="shipping_firstName" disabled>
    <input type="text" name="shipping_lastName" disabled>
    <input type="text" name="shipping_address1" disabled>
    <input type="text" name="shipping_address2" disabled>
    <input type="text" name="shipping_zipCode" disabled>
    <input type="text" name="shipping_town" disabled>
  </fieldset>
  <fieldset>
    <legend>Billing address</legend>
    <label>
      <input type="checkbox" name="billing_is_shipping" value="true" checked> 
      Billing address is the same as shipping address
    </label>
    <input type="text" name="billing_firstName" disabled>
    <input type="text" name="billing_lastName" disabled>
    <input type="text" name="billing_address1" disabled>
    <input type="text" name="billing_address2" disabled>
    <input type="text" name="billing_zipCode" disabled>
    <input type="text" name="billing_town" disabled>
  </fieldset>
</form>
```

## :empty

`:empty` CSS伪类代表那些没有子孙的元素。只有元素节点或者文本会被考虑。注释或处理指令不影响是否一个元素被认为是空或不是。

### 语法

```c
<element>:empty { style properties }
```

### 实例

```c
.box {
  background: red;
  height: 200px;
  width: 200px;
}

.box:empty {
  background: lime;
}

<div class="box"><!-- I will be lime --></div>
<div class="box">I will be red</div>
```

## :enabled

`:enabled` CSS伪类正好和`disabled`相反，它代表那些被激活的元素。

## :first-child

`:first-child` CSS伪类代表了任何元素是其父元素的第一个元素时。

### 语法

```c
element:first-child { style properties }
```

### 实例

```c
span:first-child {
    background-color: lime;
}

<div>
  <span>This span is limed!</span>
  <span>This span is not. :(</span>
</div>
```

## :first-of-type

`:first-of-type` CSS伪类代表了父元素中的子孙节点时，当该元素为在同一个层级（即在DOM树种出于兄弟）的第一个同类子元素时。

### 语法

```c
element:first-of-type { style properties }
```

### 实例

```c
div span:first-of-type {
  background-color: lime;
}

<div>
  <span>This span is first!</span>
  <span>This span is not. :(</span>
  <span>what about this <em>nested element</em>?</span>
  <strike>This is another type</strike>
  <span>Sadly, this one is not...</span>
</div>
```

上面的例子代表了选择div中第一个span类型的元素。

## :focus

`:focus` CSS伪类应用在当一个元素获得焦点时。

### 语法

```c
<element>:focus { ... }
```

### 实例

```c
.first-name:focus { color: red; }
.last-name:focus { color: lime; }

<input class="first-name" value="I'll be red when focused">
<input class="last-name" value="I'll be lime when focused">
```
    
## :invalid

`:invalid`代表了任何`<input>`或`<form>`元素的内容基于`input`的类型（例如，email、url等类型）验证失败时。这可以让你轻松的对无效的区域采取不同的外观，以帮助用户发现和纠正错误。

### 实例

```c
<form>
  <label>Enter a URL:</label>
  <input type="url" />
  <br />
  <br />
  <label>Enter an email address:</label>
  <input type="email" required/>
</form>

input:invalid {
  background-color: #ffdddd;
}
  
input:valid {
  background-color: #ddffdd;
}
  
input:required {
  border-color: #800000;
  border-width: 3px;
}
```
    
## :last-child

`:last-child` CSS伪类代表了当一个元素是其父元素的最后一个元素时。

### 语法

```c
element:last-child { style properties }
```

### 实例

```c
li:last-child {
    background-color: lime;
}

<ul>
  <li>This item is not limed.</li>
  <li>This item is! :)</li>
</ul>
```

## :last-of-type

`:last-of-type`和`:first-of-type`类似，只是选择了在父元素中最后一个为此类型的同级元素。

### 语法

```c
element:last-of-type { style properties }
```
    
### 实例

```c
p em:last-of-type {
  color: lime;
}

<p>
  <em>I'm not lime :(</em>
  <strong>I'm not lime :(</strong>
  <em>I'm lime :D</em>
  <strong>I'm also not lime :(</strong>
</p>

<p>
  <em>I'm not lime :(</em>
  <span><em>I am lime!</em></span>
  <strong>I'm not lime :(</strong>
  <em>I'm lime :D</em>
  <span><em>I am also lime!</em> <strike> I'm not lime </strike></span>
  <strong>I'm also not lime :(</strong>
</p>
```
    
    
## :not

`:not` CSS伪类用法和其他伪类不太一样，它类似于JavaScript中的函数用法，它需要传入一个选择器作为参数，它将匹配不代表当前参数的元素，且参数不能包含其他`:not`伪类和其他伪类。

### 语法

```c
:not(selector) { style properties }
```

### 实例

```c
p:not(.classy) { color: red; }
:not(p) { color: green; }

<p>Some text.</p>
<p class="classy">Some other text.</p>
<span>One more text<span>
```

## :nth-child

`:nth-child(an+b)` CSS伪类可以匹配那些在它之前的document tree中有`an+b-1`个兄弟的元素（对于一个为正值的n或者n为0，且有一个父元素）。

### 语法

```c
element:nth-child(an + b) { style properties }
```

### 实例

```c
<div>
  <span>This span is limed!</span>
  <span>This span is not. :(</span>
  <em>This one is odd. </em>
  <span>Sadly, this one is not...</span>
  <span>But this one is!</span>
</div>

span:nth-child(2n+1) {
  background-color: lime;
}
```


## :nth-last-child

`:nth-last-child`和`nth-child`正好相反，它是匹配那些在它之后的document treee中有`an+b-1`个兄弟元素的节点。

### 语法

```c
element:nth-last-child(an + b) { style properties }
```

### 实例

```c
<div>
  <span>This span is limed!</span>
  <span>This span is not. :(</span>
  <em>This one is odd. </em>
  <span>Sadly, this one is not...</span>
  <span>But this one is!</span>
</div>

span:nth-child(2n+1) {
  background-color: lime;
}
```

## :nth-last-of-type

`:nth-last-of-type` CSS伪类匹配的元素是在它之后的document tree中有`an+b-1`个相同类型的兄弟节点时。

### 语法

```c
element:nth-last-of-type(an + b) { style properties }
```
    
### 实例

```c
<div>
  <span>This span is first!</span>
  <span>This span is not. :(</span>
  <em>This one is odd. </em>
  <span>But this one is!</span>
  <strike>This is another type</strike>
  <span>Sadly, this one is not...</span>
</div>

span:nth-last-of-type(2) {
  background-color: lime;
}
```
    
## :nth-of-type

`:nth-of-type`和`:nth-last-of-type`正好相反，是匹配那些在它之前的document tree中有`an+b-1`个相同类型元素的兄弟节点时。

> 注：这里可能很容易困惑:nth-child和nth-of-type有啥区别呢？要注意nth-of-type判断的是在它之前的document tree中有`an+b-1`个**相同元素类型**，这个相同元素类型很重要，意思是它之前必须有`an+b-1`个相同元素类型的元素，而:nth-child不会做此类判断，它只会判断我前面是不是有`an+b-1`个兄弟节点，我的元素类型是不是选择器中指定的。

### 语法

```c
element:nth-of-type(an + b) { style properties }
```
    
### 实例

```c
p:nth-of-type(2n+1) { text-align: left; }
p:nth-of-type(2n) { text-align: right; }

<div>
    <p>First paragraph (left aligned)</p>
    <p>Second paragraph (right aligned)</p>
    <p>Third paragraph (left aligned)</p>
</div>
```
    
## :only-child

`:only-child` CSS伪类匹配的是当任何元素是其父元素的唯一儿子时。

### 语法

```c
parent child:only-child {
  property: value;
}
```

### 实例

```c
span:only-child {
  color: red;
}

<div>
    <span>This span is the only child of its father</span>
</div>

<div>
    <span>This span is one of the two children of its father</span>
    <span>This span is one of the two children of its father</span>
</div>
```
    
## :only-of-type

`only-of-type` CSS伪类匹配的是在给定的元素类型中那些元素没有兄弟节点。

### 语法

```c
element:only-of-type { style properties }
```
    
## :optional

`:optional` CSS伪类代表任何`<input>`元素上没有设置`required`属性在其上的元素。这对于表单可以轻易的获取可选的字段，从而为它们定义样式。

## :read-write

`:read-write` CSS伪类匹配那些可被用户编辑的元素，就像`input`类型为text的元素。

## :required

`:required` CSS伪类代表任何`<input>`元素上设置了`required`属性时。

## :root

`:root`匹配文档的根元素。在`HTML`中，`:root`代表`<html>`。

## :target

`:target` CSS伪类代表唯一的元素，如果有的话，用一个id匹配文档的URI片段标识符。

在URI中有一个文档标识符链接到文档中一个特定的元素，我们称之为目标元素（target element）。例如，这里有一个URI指向一个名为`section2`的锚点：`http://example.com/folder/document.html#section2`。

锚点可以为任何具有id属性的元素，例如`<h1 id="section2">`，例子中的目标元素可以被`:target`伪类所代表。

### 实例

```c
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>:target pseudoclass example</title>
<style>
#newcomment {
  display: none;
}

#newcomment:target {
  display: block;
}
</style>

</head>
<body>
 <p><a href="#newcomment">Add a comment</a></p>
 <div id="newcomment">
  <form name="myForm">
  <p>Write your comment:<br />
  <textarea name="myTextarea"></textarea></p>
  </form>
 </div>
</body>
</html>
```
    
可以将代码copy到文本编辑器并在浏览器中运行，可以看到当点击`Add a comment`时，id为`newcomment`的div和其子孙显示，也即当点击a标签时此时URI指向这个名为`newcomment`的锚点。

## :valid

`:valid` CSS伪类和前面说到的`:invalid`正好相反，它代表了任何`<input>`或`<form>`元素的内容基于`input`的类型（例如，email、url等类型）验证成功时。这样可以对表单采取什么措施让用户知道他们的数据格式是正确的。

到此，CSS3的伪类介绍完毕。

  [1]: https://developer.mozilla.org/en-US/docs/Web/CSS/Privacy_and_the_:visited_selector
  [2]: ../demo/css-pseudo-class/LVHA.html
  [3]: ../demo/css-pseudo-class/checked.html
  [4]: ../demo/css-pseudo-class/default.html