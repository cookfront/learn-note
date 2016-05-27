title: iOS UIView 学习
date: 2015-05-18 11:47:42
categories: iOS
tags: [iOS]
---

本文主要翻译自：[View Programming Guide for iOS](https://developer.apple.com/library/ios/documentation/WindowsViews/Conceptual/ViewPG_iPhoneOS/Introduction/Introduction.html#//apple_ref/doc/uid/TP40009503-CH1-SW2)，内容有删减。

`UIView`类在屏幕上定义了一个矩形区域和一些在那个区域处理内容的接口。在运行时，一个`view`对象处理那个区域任何内容的渲染，还处理与这些内容的任何交互。`UIView`类它自己提供了用一个背景颜色填充它的矩形区域的基本行为。更复杂的内容可以通过继承`UIView`来呈现，并自身实现必要的绘制和事件处理代码。`UIKit`框架还包括一组标准的子类，从简单的按钮到复杂的表格可以使用。例如，一个[UILabel](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UILabel_Class/index.html#//apple_ref/occ/cl/UILabel)对象绘制一个文本字符串，一个[UIImageView](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIImageView_Class/index.html#//apple_ref/occ/cl/UIImageView)对象绘制一张图片。

因为`view`对象是你的应用与用户交互的主要方式，所以它们具有许多职责。这里仅仅是几个：

 - 绘制和动画
   - 视图使用例如`UIKit`，`Core Graphics`和`OpenGL ES`的技术在它们的矩形区域绘制内容
   - 一些视图属性可以动画到新的值
 - 布局和子视图管理
   - 一个视图可能包含0个或多个子视图
   - 每一个视图定义了相对于它的父视图的它们自己默认的尺寸调整行为
   - 视图可以根据需要限定的它的子视图的尺寸和位置
 - 事件处理
   - 视图是一个应答器，并能处理触摸事件以及由`UIResponder`类定义的其它事件
   - 视图可以使用[addGestureRecognizer:](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIView_Class/index.html#//apple_ref/occ/instm/UIView/addGestureRecognizer:)方法安装手势识别以处理常见的手势

视图可以嵌入其他视图，并创建复杂的视觉层次。这在被嵌入的视图（被称为subview）和父视图做嵌入（被称为superview）之间创建了一种`父－子`关系。通常情况下，一个`subview`的可见区域不会在它的`superview`的边界被剪切，但是在`iOS`中你可以使用[clipsToBounds](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIView_Class/index.html#//apple_ref/occ/instp/UIView/clipsToBounds)来更新这种行为。一个父视图可以包含任意多个`subview`，但每个`subview`只有一个`superview`，该`superview`负责适当定位其子视图。

## 视图绘制周期

`UIView`类使用一个按需绘制的模式来呈现内容。当一个视图第一次出现在屏幕上时，系统要求它绘制它的内容。系统捕捉内容的快照，并使用快照作为视图的可视化表示。如果你从未改变过视图内容，视图的绘制代码可能永远不会被再次调用。快照图片对于涉及视图的大部分操作中被重用。如果你更改了内容，你通知系统视图被改变了。视图重复绘制视图和捕捉新结果的快照。

当视图内容改变的时候，你不需要直接重绘这些变化。相反，你使用`setNeedsDisplay`或`setNeedsDisplayInRect:`中任何一个方法使视图失效。这些方法告诉系统视图中的内容被改变了，需要在下次机会被重绘。

当到了渲染视图内容的时候，实际的绘制过程取决于视图和它的配置。系统视图通常实现私有绘图方法来呈现其内容。这些相同的系统视图通常暴露接口，使用接口你可以配置视图的实际外观。对于自定义的`UIView`子类，你通常覆盖你视图的`drawRect:`方法，并使用该方法来绘制视图的内容。也有其他的方式来提供视图的内容，例如，直接设计内容底部的`layer`，但是覆盖`drawRect:`方法是最常用的技术。

下面再来看下上面提到的三个方法：

 - `- setNeedsDisplay`

**声明：**

SWIFT

```c
func setNeedsDisplay()
```

OBJECTIVE-C

```c
- (void)setNeedsDisplay
```

你可以使用该方法或[setNeedsDisplayInRect:](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIView_Class/index.html#//apple_ref/occ/instm/UIView/setNeedsDisplayInRect:)方法来通知系统你的视图内容需要被重绘了。这个方法发起请求并立即返回。视图并不是真的在重绘直到下一个绘制周期，在该点所有失效的视图被更新。

你应该只在视图的内容和外观改变时使用该方法来请求视图重绘。如果你只是简单地更改视图的几何结构，视图通常不会重新绘制。作为代替，它的现有内容基于视图的`contentMode`属性的值进行调整。重新显示现有的内容通过避免重绘并没有改变的内容而提供了性能。

 - `- setNeedsDisplayInRect:`

**声明：**

SWIFT

```c
func setNeedsDisplayInRect(_ invalidRect: CGRect)
```

OBJECTIVE-C

```c
- (void)setNeedsDisplayInRect:(CGRect)invalidRect
```

 - `- drawRect:`

**声明：**

SWIFT

```c
func drawRect(_ rect: CGRect)
```

OBJECTIVE-C

```c
- (void)drawRect:(CGRect)rect
```

**参数：**

参数名|参数描述
---|---
rect|视图的边界部分。你的视图在第一绘制时，该矩形是通常是视图的整个可见边界。然而，在随后的绘制操作中，矩形可能被指定为视图的一部分。

该方法的默认实现不做任何事情。使用技术，例如`Core Graphics`和`UIKit`来绘制它们的视图内容时，子类应该覆盖该方法并在该方法中实现它们的绘制代码。如果你的视图通过其他方式来设置它的内容，则你不需要覆盖该方法。例如，你不需要覆盖该方法如果你的视图仅显示一个背景颜色时或者你的视图通过底层的`layer`对象直接设置它们的内容。

在该方法被调用时，`UIKit`已经正确的为您的视图配置好绘制环境，你可以简单的调用任何绘制方法和功能来渲染你的内容。具体来说，`UIKit`创建和配置了一个图形上下文来绘制和调整在那个上下文中的转换，从而它的原点匹配你视图边界矩形的原点。你可以通过[UIGraphicsGetCurrentContext](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIKitFunctionReference/index.html#//apple_ref/c/func/UIGraphicsGetCurrentContext)函数来获取到该图形上下文的引用，但是不要建立一个强引用到该图形上下文，因为它会因为`drawRect:`方法的调用被改变。

需要注意的是，你永远不要直接调用该方法。我们可以通过`setNeedsDisplay`和`setNeedsDisplayInRect:`方法来告诉视图需要重绘。

## Content Mode

每个视图有一个内容模式，它控制视图在响应视图的几何结构改变时如何回收其内容，以及是否回收其内容。当视图第一次显示时，它和平常一样渲染内容，且结果在底层的位图中被捕获。在那之后，更改视图的几何形状并不总是导致位图重新被创建。作为替代，`contentMode`属性的值决定了位图是否应该缩放以适应新的边界，或简单的固定到一个角落或视图的边缘。

当你做以下事情时，一个视图的内容模式被应用：

 - 改变视图的`frame`或`bounds`矩形的宽度或高度
 - 分配一个包括一个伸缩因子的变换到视图的`transform`属性

默认情况下，对于大多数视图的`contentMode`属性被设置为`UIViewContentModeScaleToFill`，这将导致视图的内容被伸缩以适应新的框架尺寸。下面的图显示了几个`contentMode`属性值之间的比较：

![enter image description here](https://developer.apple.com/library/ios/documentation/WindowsViews/Conceptual/ViewPG_iPhoneOS/Art/scale_aspect.jpg)

内容模式有利于回收利用视图的内容，但是你也可以设置内容模式为`UIViewContentModeRedraw`，当你需要你的自定义视图在伸缩或调整操作时重绘它们自己。设置你的视图的内容模式为该值时，会强制系统调用你视图的`drawRect:`方法以响应几何尺寸的改变。一般情况下，只要有可能你应该避免使用这个值，你当然不应该在标准的系统视图中使用它。

## 内置动画支持（Built-In Animation Support）

在每一个视图后面有一个`layer`对象的一个好处是，你可以轻松动画许多视图相关的改变。动画是一种将信息传达给用户的非常有用的方式，在您的应用程序的设计过程中应该始终考虑它。`UIView`类的许多属性是可动画的——也就是说，半自动的支持从一个值到另一个值的动画。为了对这些动画属性之一执行动画，你所要做的是：

 1. 告诉`UIKit`你要执行的动画
 2. 改变属性的值

`UIView`对象上你可以设置动画的属性为以下这些：

 - frame：使用这个来动画视图的位置和尺寸
 - bounds：使用这个来动画视图的尺寸
 - center：使用这个来动画视图的位置
 - transform：使用这个来旋转或伸缩视图
 - alpha：使用这个来改变视图的透明性
 - backgroundColor：使用这个来改变视图的背景色
 - contentStretch：使用这个来改变视图如何伸缩

## 视图几何结构和坐标系统（View Geometry and Coordinate Systems）

在`UIKit`中默认的坐标系统有一个原点在左上角，且坐标轴向原点处往右和下延伸。坐标值是使用浮点数来代表，这使得精确布局和内容定位不考虑底层的屏幕分辨率。下图展示了相对于屏幕的坐标系统。

![enter image description here](https://developer.apple.com/library/ios/documentation/WindowsViews/Conceptual/ViewPG_iPhoneOS/Art/native_coordinate_system.jpg)

因为每个视图和`window`定义了它们自己的局部坐标系统，你需要知道在任何给定时间是哪个坐标系在起作用。任何时候你在视图中绘制或改变它的几何结构时，你这样做，相对于一些坐标系统。在正在绘制的情况下，你指定相对于视图自己的坐标系统的坐标。在几何结构改变的情况下，你指定相对于`superview`坐标系统的坐标。`UIWindow`和`UIView`类都包含了方法来帮助你从一个坐标系统转换为另一个。

### `frame`、`bounds`和`center`属性之间的关系

一个视图对象使用`frame`、`bounds`和`center`属性来跟踪它的尺寸和位置：

 - frame：`frame`属性包含了框架矩形，它指定了视图相对于`superview`坐标系统的尺寸和位置
 - bounds：`bounds`属性包含了边界矩形，它指定了视图相对于它的局部坐标系统的尺寸和位置
 - center：`center`属性包含了视图在`superview`坐标系统的中电

你使用`center`和`frame`属性主要用于操作当前视图的几何结构。例如，当你在构建你的视图层级或在运行时改变一个视图的位置和尺寸时，你可以使用这些属性。如果你仅仅只是想改变视图的位置，`center`属性是首选的方法。`center`属性的值始终是有效的，即使伸缩或旋转因素被添加到视图的变换中。在同样情况下，对于`frame`属性则不正确，这被认为是无效的，如果视图的变换不等于恒等变换。

你使用`bounds`属性主要在绘制期间。边界矩形是在视图自己的局部坐标系统中的表示。该矩形的默认原点为`(0, 0)`，且它的尺寸匹配框架矩形的尺寸。任何你在该矩形中绘制的东西是视图可见内容的一部分。如果你改变边界矩形的原点，任何你在新的矩形中绘制的东西称为视图可见内容的一部分。

下图显示了这三个属性之间的关系：

![enter image description here](https://developer.apple.com/library/ios/documentation/WindowsViews/Conceptual/ViewPG_iPhoneOS/Art/frame_bounds_rects.jpg)

虽然你改变`frame`、`bounds`和`center`属性独立于其他，但是改变其中一个属性会按以下方式来改变其他属性：

 - 当你设置`frame`属性，`bounds`属性中的尺寸值也相应改变以匹配框架矩形的新尺寸。`center`属性的值也同样改变以匹配框架矩形中xin的中点。
 - 当你设置`center`属性，在`frame`属性中的原点值也会相应改变。
 - 当你设置`bounds`属性的尺寸时，`frame`属性中的尺寸值也相应改变以匹配边界矩形中的新尺寸。

默认情况下，一个视图的框架（frame）不会被其`superview`的框架剪切。你可以改变这种行为，通过设置`superview`的`clipToBounds`属性为`YES`。

### 坐标系统转换

坐标系统转换提供了一种方式来更快和更简单的更新你的视图。一个仿射变换是一个数学矩阵，它指定了点如何从一个坐标系统映射到另一个坐标系统。你可以应用仿射变换到你的整个视图，以改变尺寸、位置或相对于其`superview`的方向。你也可以使用仿射变换在你的绘制代码中，去以单个块的渲染内容来执行相同类型的操作。如何应用仿射变换取决于上下文：

 - 要改变你的整个视图，改变你视图中`transform`属性的仿射变换。
 - 要改变你视图的`drawRect:`方法的指定块的内容，改变关联当前活跃图形上下文的仿射变换。

通常，您可以修改视图的`transform`属性，当你想要实现动画时。例如，你可以使用该属性创建一个你视图围绕中点旋转的动画。你不能使用该属性永久改变你的视图，例如改变视图在它的`superview`坐标空间的尺寸和位置。对于那种类型的改变，你应该改变框架矩形作为替代。

在你的`drawRect:`方法中，你可以使用仿射变换来定位和适应你计划绘制的元素。而不是固定在你视图某个位置的一个对象的位置，去创建相对于一个固定点的每个对象是非常简单的，通常`(0, 0)`，使用一个`transform`来定位该对象在立即绘制之前。在那种方式，该对象的位置在你的视图中改变，所有你所要做的就是修改变换，这是更快，更便宜的，相对于重新创建一个对象在它的新位置。你可以通过使用`CGContextGetCTM`函数来检索关联图形上下文的仿射变换，且你可以使用相关的`Core Graphics`函数在绘制期间设置和修改变换。

`当前变换矩阵（current transformation matrix (CTM)）`是在任何给定时间当前正在使用的仿射变换。当操作整个视图的几何结构时，`CTM`是储存在你视图的`transform`属性的仿射变换。在你的`drawRect:`方法中，`CTM`是关联当前活跃图形上下文的仿射变换。

每个子视图的坐标系建立在其祖先的坐标系上。所以当你修改一个视图的`transform`属性时，这些改变会影响视图和它的所有子视图。然而，这些改变只影响视图在屏幕上的最后渲染。因为任何视图绘制它的内容和布局它的子视图是相对于它自己的边界，它在绘制和布局期间会忽略它的`superview`的变换。

## 创建和管理视图层次

管理视图层次是开发应用程序用户界面的重要组成部分。你的视图的组织影响你的应用程序的外观和应用程序如何响应变化和事件。例如，在视图层次中的`父－子`关系决定了哪个对象可能处理某个指定的触摸事件。同样的，`父－子`关系定义了每个视图如何响应界面方向改变。

### 添加和移除子视图

`Interface Builder`是建立视图层次的最方便的方式，因为你以图形化的方式组装视图，可以看到视图之间的关系，同样可以看到这些视图如何在运行时显示。当使用`Interface Builder`，你保存你的结果视图层级在一个`nib`文件中，你可以在运行时加载相应需要的视图。

如果你更愿意以程序的方式来创建你的视图，你创建和初始化它们，然后使用以下方法安排它们到层次：

 - 要添加一个子视图到父亲，在父视图上调用`addSubview:`。该方法添加子视图到父视图的子视图列表的末尾。
 - 要插入一个子视图到父视图的子视图列表的中间，可以在父视图上调用任何和`insertSubview:...`相关的方法。
 - 要重排父视图中现有的子视图，调用父视图的`bringSubviewToFront:`、`sendSubviewToBack:`或`exchangeSubviewAtIndex:withSubviewAtIndex:`方法。使用这些方法比移除子视图或重新插入它们更快。
 - 要从父视图中移除一个子视图，在子视图上调用`removeFromSuperview`方法。

添加一个子视图到另一个视图中最常见的例子发生在`application:didFinishLaunchingWithOptions:`方法中。下面显示了一个该方法的版本，它将视图从应用程序的主视图控制器安装到应用程序的`window`。`window`和视图控制器都是储存在应用程序的主`nib`文件中，它会在该方法调用前被加载。然而，由视图控制器管理的视图层级实际上不会加载，直到`view`属性被访问。

添加一个子视图到`window`：

```c
- (BOOL)application:(UIApplication *)application
didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    // Override point for customization after application launch.
    // Add the view controller's view to the window and display.
    [window addSubview:viewController.view];
    [window makeKeyAndVisible];
return YES; }
```

另一个常见的地方你可能添加子视图到视图层级中是在视图控制器的`loadView`和`viewDidLoad`方法中。如果你正在利用程序构建视图，你讲创建视图的代码放在视图控制器的`loadView`方法中。无论你是使用程序的方式，还是使用`nib`文件加载的方式来创建视图，你可能会在`viewDidLoad`方法中包含额外的视图配置代码。

添加视图到已存在的视图层级：

```c
- (void)viewDidLoad
{
      [super viewDidLoad];
      self.title = NSLocalizedString(@"TransitionsTitle", @"");
// create the container view which we will use for transition animation (centered horizontally)
      CGRect frame = CGRectMake(round((self.view.bounds.size.width - kImageWidth) /
   2.0),
                                                        kTopPlacement, kImageWidth,
   kImageHeight);
      self.containerView = [[[UIView alloc] initWithFrame:frame] autorelease];
      [self.view addSubview:self.containerView];
      // The container view can represent the images for accessibility.
      [self.containerView setIsAccessibilityElement:YES];
      [self.containerView setAccessibilityLabel:NSLocalizedString(@"ImagesTitle",
  @"")];
      // create the initial image view
      frame = CGRectMake(0.0, 0.0, kImageWidth, kImageHeight);
      self.mainView = [[[UIImageView alloc] initWithFrame:frame] autorelease];
      self.mainView.image = [UIImage imageNamed:@"scene1.jpg"];
      [self.containerView addSubview:self.mainView];
      // create the alternate image view (to transition between)
CGRect imageFrame = CGRectMake(0.0, 0.0, kImageWidth, kImageHeight); self.flipToView = [[[UIImageView alloc] initWithFrame:imageFrame] autorelease];
      self.flipToView.image = [UIImage imageNamed:@"scene2.jpg"];
}
```

当你添加子视图到另一个视图，`UIKit`通知父视图和子视图这些改变。如果你实现了自定义视图，你可以覆盖以下方法来拦截这些通知：`willMoveToSuperview:`、`willMoveToWindow:`、`willRemoveSubview:`、`didAddSubview:`、`didMoveToSuperview`或`didMoveToWindow`。您可以使用这些通知以更新与您的视图层次中相关的任何状态信息或执行其他任务。

### 隐藏视图

为了在视觉上隐藏视图，你可以通过设置`hidden`属性为`YES`或者设置`alpha`属性为`0.0`。一个隐藏的视图不从系统接收触摸事件。然而，隐藏的视图仍然参与到自动调整大小和其他关联视图层级的布局操作。因此，当你需要从视图层级移除视图，隐藏视图通常是一个方便的选择，特别是如果你计划在某个点再重新显示视图。

如果你想动画一个视图，从可见过渡到隐藏（或者相反），你必须使用视图的`alpha`属性。因为`hidden`属性不是一个可动画的属性，所以你在上面做的改变会立即发生。

### 在视图层级中定位视图

有两种方法在视图层级中定位视图：

 - 在适合的位置存储任何有关视图的指针，例如，在拥有该视图的视图控制器。
 - 分配一个唯一的整数到每个视图的`tag`属性，然后使用`viewWithTag:`来定位它。

储存相关视图的引用是最常见定位视图的方式，且使得访问这些视图非常容易。如果你使用`Interface Builder`来创建你的视图，你可以在你的`nib`文件中使用`outlets`连接对象到另一个。对于你用程序创建的视图，你可以在私有成员变量中保存这些视图的引用。无论你是使用`outlets`还是私有成员变量，你负责在需要时保留视图，或者释放它们。保证对象保留和释放最好的办法是使用声明的属性。

标签是减少硬编码依赖和支持动态和灵活的解决方案的有效方式。而不是保存视图的指针，你可以使用`tag`来定位它。标签也是引用视图的一种更持久的方式。

### 平移，缩放和旋转视图

每个视图有一个关联的仿射变换，你可以使用它来平移、伸缩和旋转视图的内容。视图变换改变视图的最终渲染外观，且通常用于实现滚动，动画，或其他视觉效果。

`UIView`的`transform`属性包含了一个应用变换的`CGAffineTransform`结构。默认情况下，这个属性被设置为恒等变换，不修改视图的外观。你可以在任何时候给该属性赋一个新的变换。例如，将一个视图旋转45度，你可以使用以下代码：

```c
// M_PI/4.0 is one quarter of a half circle, or 45 degrees.
CGAffineTransform xform = CGAffineTransformMakeRotation(M_PI/4.0);
self.view.transform = xform;
```

![enter image description here](https://developer.apple.com/library/ios/documentation/WindowsViews/Conceptual/ViewPG_iPhoneOS/Art/rotated_view.jpg)

## 在视图层级中转换坐标

在不同的时间，特别是处理事件时，应用程序可能需要从一个框架的引用到另一个之间转换坐标值。例如，触摸事件是在`window`坐标系统中报告每一次触摸的位置，但是视图对象通常在视图的局部坐标系统中需要这些信息。`UIView`类定义了以下方法来转换坐标：

```c
convertPoint:fromView:
convertRect:fromView:
convertPoint:toView:
convertRect:toView:
```

`convert...:fromView:`方法从其他视图坐标系统转换坐标到当前视图的局部坐标系统。相反的，`convert...:toView:`方法从当前视图坐标系统转换坐标到指定的视图的坐标系统。如果对于任何方法你指定`nil`为引用的视图，是从包含当前视图的`window`的坐标系统中转换。

除了`UIView`的转换方法，`UIWindow`类也同样定义了几个转换方法。

```c
convertPoint:fromWindow:
convertRect:fromWindow:
convertPoint:toWindow:
convertRect:toWindow:
```

##  实现自定义视图的清单

自定义视图的工作是呈现内容和管理与这些内容的交互。一个成功的自定义视图的实现包含了不仅绘制和事件处理。在实现自定义视图时，下面的清单包括了你应该覆盖的比较重要的方法：

 - 为你的视图定义相应的初始化方法：
   - 对于你想用程序创建的视图，覆盖`initWithFrame:`方法，或者定义一个自定义初始化方法
   - 对于你想从`nib`文件加载的视图，覆盖`initWithCoder:`方法。
 - 实现一个`dealloc`方法处理任何自定义数据的清理工作。
 - 要处理自定义的绘制，覆盖`drawRect:`方法，并在其中实现你的绘制代码。
 - 设置视图的`autoresizingMask`属性以定义它的自动调整大小行为。
 - 如果你的视图类管理一个或多个完整的子视图，做以下几点：
   - 在你的视图初始化阶段创建这些子视图
   - 对于每个子视图在创建时设置`autoresizingMask`属性
   - 如果你的子视图需要自定义布局，覆盖`layoutSubviews`方法，并在其中实现你的布局代码
 - 为了处理触摸相关的事件，做以下几点：
   - 使用`addGestureRecognizer:`方法附加任何合适的手势识别到视图中
   - 对于你要自己处理触摸的情况下，覆盖`touchesBegan:withEvent:`、`touchesMoved:withEvent:`、`touchesEnded:withEvent:`和`touchesCancelled:withEvent:`方法
 - 如果你想你视图的绘制版本看起来不同于屏幕上的版本，实现`drawRect:forViewPrintFormatter:`方法

## 动画

### 使用基于块的方法开始动画

在iOS4和以后，你可以使用基于块的类方法来初始化动画。有几个基于块的方法为动画块提供了不同级别的配置。它们为：

 - `animateWithDuration:animations:`
 - `animateWithDuration:animations:completion:`
 - `animateWithDuration:delay:options:animations:completion:`

因为它们是类方法，使用它们创建的动画块不依赖于单个视图。因此，你可以使用该方法来创建一个包含改变多个视图的动画。例如：

```c
[UIView animateWithDuration:1.0 animations:^{
          firstView.alpha = 0.0;
          secondView.alpha = 1.0;
}];
```

如果你想对动画有更多的配置，那就要使用`animateWithDuration:delay:options:animations:completion:`了，例如：

```c
- (IBAction)showHideView:(id)sender
{
      // Fade out the view right away
      [UIView animateWithDuration:1.0
          delay: 0.0
          options: UIViewAnimationOptionCurveEaseIn
          animations:^{
               thirdView.alpha = 0.0;
          }
          completion:^(BOOL finished){
            // Wait one second and then fade in the view
        [UIView animateWithDuration:1.0
             delay: 1.0
             options:UIViewAnimationOptionCurveEaseOut
             animations:^{
                thirdView.alpha = 1.0;
             }
             completion:nil];
          }];
}
```

### 创建在视图间过渡的动画

当在视图层级中添加、移除、隐藏和展示视图时，视图间过渡帮助你隐藏立即的改变。你可以使用视图过渡去实现以下类型的改变：

 - 更改现有视图的可见子视图
 - 在你的视图层级中替换某个视图为另外一个视图

#### 改变一个视图的子视图

在iOS4及以后，你可以使用`transitionWithView:duration:options:animations:completion:`方法来为视图初始化一个过渡动画。例如：

```c
- (IBAction)displayNewPage:(id)sender
{
    [UIView transitionWithView:self.view
        duration:1.0
        options:UIViewAnimationOptionTransitionCurlUp
        animations:^{
            currentTextView.hidden = YES;
            swapTextView.hidden = NO;
        }
        completion:^(BOOL finished){
            // Save the old text and then swap the views.
            [self saveNotes:temp];
            UIView*    temp = currentTextView;
      currentTextView = swapTextView;
      swapTextView = temp;
}]; }
```

#### 替换视图为不同的视图

在iOS4及以后，你可以使用`transitionFromView:toView:duration:options:completion:`方法在视图间过渡。这个方法实际会将第一个视图从你的层级中移除，然后插入另外一个，因此，你应该确保如果你想保持第一个视图时，你有一个到第一个视图的引用。如果你想隐藏视图来代替从视图层级中移除，传递`UIViewAnimationOptionShowHideTransitionViews`关键字作为选项。例如：

```c
- (IBAction)toggleMainViews:(id)sender {
    [UIView transitionFromView:(displayingPrimary ? primaryView : secondaryView)
    toView:(displayingPrimary ? secondaryView : primaryView)
    duration:1.0
    options:(displayingPrimary ? UIViewAnimationOptionTransitionFlipFromRight : UIViewAnimationOptionTransitionFlipFromLeft)
  completion:^(BOOL finished) {
      if (finished) {
          displayingPrimary = !displayingPrimary;
      }
  )];
}
```