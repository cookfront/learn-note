title: CSS 单一职责
date: 2014-06-26 00:57:04
categories: CSS
tags: [CSS]
---

最近做了一个比较大的手机端项目，差不多有一百多个页面，其中也包括很多可以重用的组件，但自己做但一团糟，没有很好的组织`CSS`代码以及重用一些相同的组件，导致后期修改和维护上工程量巨大，而且修改起来非常的烦躁。今天在[CSS Weekly][1]上看到了一篇比较好的文章，就翻译出来做做笔记，也供大家学习。

原文出处：[http://drewbarontini.com/articles/single-responsibility/?utm_source=CSS-Weekly&utm_campaign=Issue-113&utm_medium=web][2]

以下是翻译部分：

当开始书写模块化当`CSS`时，我试着尽可能当坚持单一职责的原则。这样将会限制你的模块的一个作用范围，并且允许你更容易的建造和合并他们去创建更加灵活的样式模式。

## 定义(Definition)

> 在面向对象编程中，单一责任的原则指出：每一个类应该只有一个责任。这个责任完全由类封装好。所有的服务应该严格的为了这个责任。

有两个部分的定义我想提及到:

 1. 单一职责
 2. 封装

## 单一职责(Single Responsibility)

非常明显，正如它的名字显示，每一个模块都应该有一个单一都职责，那么这个模块应该干些什么呢？例如：一个`thumb`的模块可能是为了处理一个缩略图，例如一个用户的图标。我们的模块可能看起来像这样：

    .thumb {
      border-radius: 50%;
      display: block;
    }

我们的`thumb`模块为我们的使用的图片创建一个圆形的图像，就像这样：

    <img class="thumb" src="user.jpg" alt="User Name"  />
    
就是这样，模块只有一项工作，而且它非常简单。

## 封装(Encapsulation)

> ...这个职责应该完全由这个类所封装

现在这个想法是怎样让我们的模块被封装？封装在不同的编程技术中有不同的定义，但是当谈到`CSS`时，我认为它是一种信息隐藏机制。我们不想我们的模块与其他模块交流，也即需要和其他模块之间才能工作，他们应该不知道或者不关心其他模块。这样使他们保持伸缩性且放到任何上下文需要它的地方。让我们看一个示例：

我们有一个边栏块，而且我们默认的按钮没有自己定位在我们的边栏中。我们想我们的按钮成为一个粘性的按钮，它绝对定位在边栏的底部。

    <aside class="sidebar">
      <!-- ... -->
      <a class="btn" href="#">Button</a>
    </aside>
    
我们可以在`.sidebar`内定位我们的`.btn`类，然后使其适合的调整其位置，就像这样：

    .sidebar .btn {
      bottom: 1.25em;
      left: 1.25em;
      position: absolute;
      right: 1.25em;
    }
    
这样可以工作，但是它破坏了`sidebar`和`btn`两个模块之间的封装。`sidebar`在告诉按钮如何表现，如果我们遵循我们应该遵循的封装的想法，`sidebar`应该不知道`button`的存在，为什么呢？我们这种对｀.btn｀样式的修改方式只有其在`.sidebar`内时才会被影响，这样的话我们就需要寻找单独的模块去决定它的样式，然后对其调整。这样不好。

好的，现在让我们改变一下：

    <a class="sidebar-btn btn" href="#">Button</a>
    
    .sidebar-btn {
      bottom: 1.25em;
      left: 1.25em;
      position: absolute;
      right: 1.25em;
    }

我们像`sidebar`模块中添加了一个新的子模块：`.sidebar-btn`。这个子模块现在负责处理对于在`.sidebar`中的`.btn`类的特定样式。更多的是，使用`module-submodule`的命名习惯，我们明确的声明了这个按钮的样式是依赖于`.sidebar`类的，即是其的子类。现在，我们的两个保持着分离于封装，而且他们不用担心任何一方的任何问题。

噢！我们有一个问题，当我们位`.btn`设置了`position: absolute`时，它已经脱离了布局上下文，这意味着我们新的`sidebar`内容将会在这个按钮之下。另外，`.sidebar`需要为了`.sidebar-btn`设置定位环境，即`position: relative`，以此来保证`.sidebar-btn`正确的在`.sidebar`中被定位。

    .sidebar {
      padding-bottom: 5em;
      position: relative;
    }
    
好的，现在我们为`.sidebar`添加了一些底部的`padding`和`position: relative`，现在什么都看起来非常好。然而，不完全是，如果我们在`.sidebar`内没有一个`.sidebar-btn`子模块时？那么这个底部的`padding`就不是必要的。我们可以通过一个上下文(context)类来修复此问题。

## 上下文(context)

    .has-sidebar-btn {
      padding-bottom: 5em;
      position: relative;
    }
    
非常好，现在我们的标记是：

    <aside class="sidebar has-sidebar-btn">
      <!-- ... -->
      <a class="sidebar-btn btn" href="#">Button</a>
    </aside>
    
所以我们做了什么呢？我们创建了一个上下文类，并将其应用在需要设置一些样式的父元素上，这些父元素是基于需要设置一些样式的单独的模块。（翻译的确实是。。，通俗点来讲就是：当对于一些单独对子模块，比如某个页面的`.btn`，它的父元素需要设置一些其他样式，例如上面的`padding`，就在父元素上添加一个上下文类，这样就说明了这个父元素上有基于子模块但一些其他样式）。

> 注：我们这里使用`has-`前缀来表明上下文类。


## 重构(Refactoring)

当我们正在建设网站时，我们发现这种模式重现了。我们有一个其他的容器需要它的按钮粘在底部。而不是复制一些样式(保持Don't repeat yoursele)，我们知道我们需要做一些重构。我们使用一个修饰语将`.sidebar-btn`的样式移动到`.btn`模块，这是另一种为元素设置样式到方式。

    .btn--sticky {
      bottom: 1.25em;
      left: 1.25em;
      position: absolute;
      right: 1.25em;
    }
    
> 注：我们这里使用两个连字符(-)去修饰一个带有修饰符到模块。

现在我们有了我们的`.btn--sticky`样式，从而我们可以将其应用到其他新到元素上，并且能在站点上很好到重用。

    <div class="card">
      <!-- ... -->
      <a class="btn btn--sticky" href="#">Button</a>
    </div>
    
噢！那我们的上下文类`.has-sidebar-btn`咋办呢？我们同样需要将其移动到我们到`.btn`模块类。

    .has-btn--sticky {
      padding-bottom: 5em;
      position: relative;
    }
    
    <div class="card has-btn--sticky">
      <!-- ... -->
      <a class="btn btn--sticky" href="#">Button</a>
    </div>
    
现在我们有了一个伸缩的`.btn--sticky`模块和`.has-btn--sticky`的上下文类来处理对于父容器需要的样式。这允许我们能很好的将样式应用到任何需要它到容器。
 
  [1]: http://css-weekly.com
  [2]: http://drewbarontini.com/articles/single-responsibility/?utm_source=CSS-Weekly&utm_campaign=Issue-113&utm_medium=web