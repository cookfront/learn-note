Custom Element
========

以下内容基于最新的`W3C`的`Custom Element`标准：[Custom Elements](http://w3c.github.io/webcomponents/spec/custom/)。最新的标准和之前的标准接口都有所不同，之前的标准请看这里：[Custom Elements 中文规范](http://w3c-html-ig-zh.github.io/webcomponents/spec-zh/custom/)。也可以看这里关于`Custom Element`的介绍：[Custom Elements](http://www.html5rocks.com/zh/tutorials/webcomponents/customelements/)

## 自定义元素命名

新标准和旧标准中唯一相同的地方就是对于自定义元素的命名。

> 自定义元素类型标识一个自定义元素接口必须和NCName产生方式相匹配的字符串，必须包含一个`U+002D`连字符号字符，且不能包含任何ASCII大写字母。

且自定于元素不能为以下名称中的任何一个：

- annotation-xml
- color-profile
- font-face
- font-face-src
- font-face-uri
- font-face-format
- font-face-name
- missing-glyph

## 自定义元素类型

自定义元素类型包含：

- autonomous custom elements
- customized built-in element

### autonomous custom elements

规范中这样定义`独立自定义元素`（autonomous custom elements）：

> An autonomous custom element, which is defined with no extends option. These types of custom elements have a local name equal to their defined name.

意思是：一个`独立自定义元素`，它没有`extends`选项，这种类型的自定义元素有自己的名字且与它定义的名字相同。例如：`<flag-icon country="nl"></flag-icon>`。

我们想定义一个国家旗帜图标的自定义元素，我们的目标是这样使用它：

```html
<flag-icon country="nl"></flag-icon>
```

首先，我们需要为该自定义元素定义一个`class`继承自`HTMLElement`：

```js
class FlagIcon extends HTMLElement {
  constructor() {
    super();
    this._countryCode = null;
  }

  static get observedAttributes() { return ["country"]; }

  attributeChangedCallback(name, oldValue, newValue) {
    // name will always be "country" due to observedAttributes
    this._countryCode = newValue;
    this._updateRendering();
  }
  connectedCallback() {
    this._updateRendering();
  }

  get country() {
    return this._countryCode;
  }
  set country(v) {
    this.setAttribute("country", v);
  }

  _updateRendering() {
    // Left as an exercise for the reader. But, you'll probably want to
    // check this.ownerDocument.defaultView to see if we've been
    // inserted into a document with a browsing context, and avoid
    // doing any work if not.
  }
}
```

然后我们需要使用上面的类来定义该元素：

```js
customElements.define("flag-icon", FlagIcon);
```

这样当解释器遇到`flag-icon`标签，就回去构造一个`FlagIcon`类的实例，当然我们也可以使用`DOM API`来创建我们的`flag-icon`元素：

```js
const flagIcon = document.createElement("flag-icon")
flagIcon.country = "jp"
document.body.appendChild(flagIcon)
```

最后，我们还能使用自定义元素的构造函数来创建该元素：

```js
const flagIcon = new FlagIcon()
flagIcon.country = "jp"
document.body.appendChild(flagIcon)
```

### customized built-in element

规范中这样定义`自定义内置元素`（customized built-in element）：

> A customized built-in element, which is defined with an extends option. These types of custom elements have local name equal to the value passed in their extends option, and their defined name is used as the value of the is attribute.

意思是：一个`自定义内置元素`，是通过`extends`选项来定义。这种类型的自定义元素有一个`本地名`等于`extends`选项中传入的名字，它们的`定义名称`用作`is`属性的属性值。例如：`<button is="plastic-button">Click Me!</button>`。

`自定义内置元素`是一种不同类型的自定义元素，它在使用和定义上都和`独立自定义元素`不同。它们存在的意义是允许重用现有HTML元素的行为，通过扩展这些元素，使它们有新的功能。

### 独立自定义元素的缺点
