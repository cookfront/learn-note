title: HTML <meta>标签的属性
date: 2014-03-31 10:19:04
categories: HTML/HTML5
tags: [HTML, HTML5]
---

## charset

这个属性用于声明页面的字符编码。但是它可以被页面任何元素的`lang`属性所覆盖。这个属性是一个字符串，而且它首选的MIME名称必须是[IANA][1]定义的字符编码之一。虽然标准不要求特定的字符编码，但提供了有关它的一些建议：

 - 鼓励作者使用UTF-8编码
 - 作者不应该使用ASCII兼容编码，因为这些代表了一些安全风险。
 - 作者不得使用CESU-8，UTF-7，BOCU-1和SCSU编码，也包括它们一类的编码，这些编码的跨脚本攻击已被记录在案。
 - 作者不得使用UTF-32，因为不是所有的HTML5编码算法可以从UTF-16中区别出来

### 说明：

 - 声明的字符集必须与页面所匹配，如果定义错误的字符集，会导致不良的用户体验，这是毫无意义的
 - `<meta>`元素必须在`<head>`标签里面，且在页面的第一个512字节之内。因为有些浏览器只看这些来选择页面的字符编码
 - `<meta>`元素仅仅是[计算页面字符集编码算法][2]的一部分。特别是，在HTTP Content-Type头和任何BOM元素的优先级高于这个元素。
 - 使用此属性来定义字符集是一个强烈推荐的做法。如果没有为页面定义一个字符集，几个跨脚本技术可能成为现实，而危害页面用户，例如[ UTF-7 fallback cross-scripting technique][3]。总是设置meta会防范这些风险。

## content

该属性给出的值与HTTP-EQUIV或name属性所关联，取决于上下文。

## http-equiv

此枚举属性定义的编译指示可以改变服务器和用户代理的行为。编译指示的值可以利用`content`或者下列之一：

 - content-language：该编译指令定义了页面的默认语言
> 使用注意：不要使用该指令，因为它已经过时了，使用`<body>`元素的`lang`属性代替。
 
 - content-type：这个属性定义了文档的MIME类型，其次是它的字符集
> 使用注意：1.不要使用该指令，因为它已经过时了，使用`<meta>`元素的`charset`属性来代替。2.只有HTML文档能使用content-type，所以大部分是多余的：这就是为什么它已经过时而由`charset`属性来代替。
 - default-style: 该指令指定了页面上使用的首选样式表。`content`属性必须包含一个`<link>`元素的id，且这个`<link>`的`href`属性链接到一个CSS样式表，或者是包含一个`<style>`元素的id，并且在其中包含样式表
 - refresh：该指令定义了
     - 如果`content`属性包含一个正整数时，这个属性定义了在这个正整数时间内页面必须重新加载
     - 如果`content`属性包含了一个正整数且跟随一个字符串‘;url=’和一个有效的URL时，这个属性定义了在这个正整数时间内页面必须重定向到另一个页面
 - set-cookie：该指令为页面定义了一个`cookie`。
> 注：不要使用该指令，因为它已经被弃用了。使用HTTP头部的`set-cookie`代替

## name

此属性定义文档级元数据的名称。如果某属性在http-equiv、itemprop或charset中已经定义，则不需要再定义。

本文档级数据名称都有一个值，与`content`属性所关联。通过`content`属性存储及其相关的值。

 - application-name：定义在网页中运行的web应用程序的名称
> 说明： 1.浏览器可以使用这个来标识应用程序。它通常区别于`<title>`元素，它通常包含应用程序的名字，但也可能包含一些特定的信息，比如文档名或者状态。2.简单的网页不应该使用来定义应用程序
 - author：文档的作者的名字
 - description：含有该页面内容的简短和准确的概括。几个浏览器，其中包括Firefox和Opera，当添加标签时使用这个元作为页面的默认描述
 - generator：定义该页面生成的软件
 - keywords：与页面内容相关联的关键字，通过逗号分隔的字符串
 - creator：文档的创建者的名称。注意，也可以是机构名称，如果有多于一个，可以使用多个`<meta>`
 - googlebot：机器人的代名词
 - publisher：文档的发行者名称，也可以是机构名称
 - robots：定义了一个爬虫在该页面上具有的行为。这是一个以逗号分隔的有下列值的列表：
![rebots][5]


说明
     
     - 只有合作的机器人会跟随由机器人名称定义的规则。
     - 该机器人还需要访问的页面，以读取元值。如果你想保持他们在海湾，比如防止带宽消耗，使用robots.txt文件来代替（或补充）
     - 如果你想删除一个索引页面，改变meta为`noindex`会使其工作，但是只有当机器人再次访问该页面时。可千万不要阻止这种访问，通过robots.txt文件，例如。有些搜索引擎有开发工具，允许快速去除一些页面。
     - 一些可能的值是互相排斥的，比如在同一时间定义index和noindex，follow和nofollow。在这些情况下，机器人的行为是未定义的，并且可能会有所不同从一个到另一个。所以要避免这些情况。
     - 有些搜索引擎爬虫机器人，像那些谷歌，雅虎搜索或Bing的，在HTTP指令中支持一个相同的值， X-Robot-Tags：这允许在非HTML文档中使用这些编译指示，如图像。
     

 - slurp：机器人代名词。雅虎搜索爬虫
 - viewport： 它提供了有关视口的初始大小的大小的提示。该指令仅用于几个移动设备

![viewport][6]

    说明
    
     - 虽然不规范，这个属性由不同的移动浏览器如Safari移动，火狐移动或Opera移动。
     - 默认值可能会改变，因为不同的设备，浏览器
     - 需要学习在Firefox手机浏览器下的，https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag


 

## scheme

此属性定义了元数据描述的方案。一个方案是一个上下文引导到内容价值的正确诠释，就像一个格式。

> 注：不要使用这个属性，因为它已经过时了

## 实例

```c
<!-- Defining the charset in HTML4 -->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

<!-- In HTML5 -->
<meta charset="utf-8">

<!-- Redirect page after 3 seconds -->
<meta http-equiv="refresh" content="3;url=http://www.mozilla.org/">
```
 
 

 
 
 


  [1]: http://www.iana.org/assignments/character-sets/character-sets.xhtml
  [2]: http://www.whatwg.org/specs/web-apps/current-work/multipage/parsing.html#encoding-sniffing-algorithm
  [3]: https://code.google.com/p/doctype-mirror/wiki/ArticleUtf7
  [4]: https://support.google.com/webmasters/answer/79812?hl=en
  [5]: /img/posts/rebots.png
  [6]: /img/posts/viewport.png
  
  