## 标准标签

### a

`HTML`的`a`元素定义了一个超链接，用于从一个页面链接到其他页面（也可以用于链接到本页面的一些锚点）。

#### 属性

##### download `HTML5`
 
```c
<!-- will download as "expenses.pdf" -->
<a href="/files/adlafjlxjewfasd89asd8f.pdf" download="expenses.pdf">Download</a>
```

当用户点击该链接时，会强制下载`/files/adlafjlxjewfasd89asd8f.pdf`文件，但是会以`expenses.pdf`的名字出现在下载内容中。例如：文件名在服务端可能需要保持文件名唯一，但是通过`download`属性定义的名字使得对用户更加有意义。

理论上，`download`属性的内容是没有任何限制的，但是实际上并非如此，例如，在`Windows`中凡斜杠`\`就不能用于文件名，或者在`*nix`或`OS X`系统上斜杠`/`用于文件名，因此浏览器会对`download`属性值进行调整。

`dowoload`属性可以使用[blob][1]或者[data URI][2]，当你的用户需要在你的应用中保存动态的内容时，这将是非常有用的（例如：绘图应用）。

因此，你只需设置`href`属性位`blob`或`data URI`，然后将`download`属性值设置为有意义的名字。下面看实例：

HTML：

    <section>
        <canvas id="c" width="400" height="400"></canvas>
        <footer>
            <a id="download-canvas" href="#">Download</a>
        </footer>
    </section>
    
JavaScript：

    (function() {
        var canvas = document.getElementById('c'),
            cxt = canvas.getContext('2d'),
            downloadLink = document.getElementById('download-canvas');
     
        cxt.fillRect(100, 100, 200, 200);
        cxt.clearRect(150, 150, 100, 100);
     
        downloadLink.href = canvas.toDataURL();
        downloadLink.download = "squares.png";
    })();

可以点击线上的[demo][3]。

[点击这里查看download兼容性][4]

##### href

这是对于`a`标签唯一必须定义的属性，这个属性定义了所需要链接的目的链接。它可以是一个`URL`或者`URL fragment`。一个`URL fragment`是以`#`开始，并且链接到当前文档的一个目标位置。`URLs`则可以是浏览器支持的任何协议。例如：`file`、`ftp`或`mailto`可以在大多数的用户代理工作。

> 你可以使用一个特殊的`fragment`,`top`创建了一个回到页面顶部的`fragment`，这个只能在`HTML5`中使用。例如：`<a href="#top">Return to top</a>`。

##### media

对于天天和`CSS`打交道的我们对于`media`属性肯定是很熟悉的，通常用于`link`标签或者`CSS 3`的`media query`。现在你可以在超链接中定义`media`属性，就像在`CSS`中一样使用。

这个属性绝对是非常有用的，例如，在对于不同的设备提供不同的下载链接：

    <ul>
        <li>
            <a href="download/320" media="min-width: 320px">
                <img src="files/320.jpg" alt="">
            </a>
        </li>
        <li>
            <a href="download/1382" media="min-width: 1382px">
                <img src="files/1382.jpg" alt="">
            </a>
        </li>
    </ul>
    

##### ping
##### rel

对于存在`href`属性的锚点，这个属性定义了当前文档与目标URL的关系。它的值是一个以空格分隔的关系值列表。默认的关系值为`void`，且必须在`href`属性定义的情况下才能定义该属性。`rel`详细的[关系值][5]。

##### target

这个属性定义了在哪里显示链接的资源。有以下值：

 - _self：如果没有定义该属性时的属性值，表示在当前页面加载链接的资源
 - _blank：在新的未命名的`HTML4 window`或者`HTML5 browsing context`加载响应。
 - _parent：在`HTML4`中当前框架的父框架或者`HTML5`的父浏览上下文加载响应，如果没有父亲，则和`_self`一样
 - _top：这个目标使得文档载入包含这个超链接的窗口，用 _top 目标将会清除所有被包含的框架并将文档载入整个浏览器窗口。

##### title

`title`属性定义了`a`标签的额外属性，当鼠标悬浮时会显示一个类似文本提示的文字。

#### 实例

```c
<a href="https://developer.mozilla.org/en-US/" target="_blank">
    <img src="http://lamaquinadiferencial.files.wordpress.com/2012/02/128px-mozilla_firefox_3-5_logo_256.png?w=500" alt="firefox logo" />
</a>
```
 
  
 
  
 

 
 
参考文献：

 1. [New HTML5 Attributes for Hyperlinks: download, media, and ping][6]


  [1]: https://developer.mozilla.org/en-US/docs/Web/API/URL.createObjectURL
  [2]: http://www.sitepoint.com/reducing-http-requests-with-generated-data-uris/
  [3]: http://jsbin.com/buhoreli/1/edit
  [4]: http://caniuse.com/download
  [5]: http://www.w3school.com.cn/tags/att_a_rel.asp
  [6]: http://www.sitepoint.com/new-html5-attributes-hyperlinks-download-media-ping/