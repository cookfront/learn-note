HTML Import
========

## 链接类型import

为了能在HTML中声明`import`，HTML的`link`标签增加了一个新的链接类型：

> `import`关键字可以用于`link`元素。 此关键字创建一个`导入`的外部资源链接。
>
> `import`关键字给资源指定的默认类型是 text/html。
> 
> `link`元素有一个`async`属性。`async`属性是一个`布尔属性`。
> 
> 获取资源的适当时间是，当外部资源链接`被创建`或它的元素`被插入到文档中`。
> 
> 不论`link`的`media`导入始终会被获取和应用。

下面的文档导入位于`/imports/heart.html`：

```html
<!DOCTYPE html>
<html lang="en-US">
    <head>
        <title>Human Being</title>
        <link rel="import" href="/imports/heart.html">
    </head>
    <body>
        <p>What is a body without a heart?</p>
    </body>
</html>
```

## HTMLLinkElement接口扩展

```c
partial interface HTMLLinkElement {
    readonly attribute Document? import;
};
```

对于`link`元素，新增了一个新的属性`import`，此属性必需返回导入的导入文档，由`link`元素呈现。

这是如何访问前面例子中提到的导入文档：

```js
var link = document.querySelector('link[rel=import]');
var heart = link.import;
// Access DOM of the document in /imports/heart.html
var pulse = heart.querySelector('div.pulse');
```

`import`属性必需返回`null`，如果：

- `link`不表示一个导入
- `link`元素不在`Document`中

`import`为`null`的两种情况，一种使用`async`加载的`link`标签，此时`import`的还未加载到文档中

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>HTML import</title>
  <link rel="import" href="./test2.html" async>
</head>
<body>

<script>
var linkNode = document.querySelector('link[rel="import"]').import;
var importNode = linkNode.querySelector('.something');
// null
console.log(importNode);
</script>
</body>
</html>
```

另一种情况：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>HTML import</title>
</head>
<body>

<script>
var linkElement = document.createElement('link');
linkElement.rel = 'import';
linkElement.href = './test2.html';
document.body.appendChild(linkElement);
// null
console.log(linkElement.import);
linkElement.onload = function() {
  // document
  console.log(linkElement.import);
}
</script>
</body>
</html>
```

## Document接口扩展

如果对导入的文档调用`open()`，`write()`和`close()`方法会抛出`InvalidStateError`异常。

## document.currentScript

## 样式style