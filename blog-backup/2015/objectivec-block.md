title: Objective-C基础学习之block
date: 2015-04-18 18:07:42
categories: iOS
tags: [iOS]
---

以下学习内容是翻译自Apple的[Programming with Objective-C](https://developer.apple.com/library/ios/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/ProgrammingWithObjectiveC.pdf)，内容有部分删减，主要是自己一个学习和理解的过程，如有翻译不当，还请谅解。

`Block`是被添加到`C`、`Objective-C`和`C++`的语言级别的特性，它允许你创建不同的代码片段，这些代码片段可以作为值传入到方法或函数中。`Blocks`是`Objective-C `对象，这意味着它可以被添加到类似`NSArray`和`NSDictionary`的集合中。他们同样有从封闭作用域中捕获值的能力，使他们类似于其他编程语言的`closures`和`lambdas`。

## Block语法

定义一个`block`是使用`^`符号，就像这样：

```c
^{
     NSLog(@"This is a block");
}
```

就像函数和方法的定义，大括号表明了`block`的开始和结束。在这个例子中，`block`没有返回任何值，也没有任何参数。

以同样的方式，您可以使用一个函数指针来引用一个C函数，你可以定义一个变量来记录一个`block`，就像这样：

```c
void (^simpleBlock)(void);
```

这个例子定义了一个变量：`simpleBlock`，该变量用于引用一个`block`，且该`block`没有参数且不返回值，这意味着您可以像下面这样将`block`字面赋给`simpleBlock`变量，就像这样：

```c
simpleBlock = ^{
    NSLog(@"This is a block");
};
```

要注意的是大括号末尾的分号。您同样可以结合变量定义和赋值：

```c
void (^simpleBlock)(void) = ^{
    NSLog(@"This is a block");
};
```

最后你就可以像下面这样来调用`block`了：

```c
simpleBlock();
```

## 带参数和返回值的Block

`Block`是可以接受参数和返回值的，就像函数和方法那样。

作为一个例子，考虑一个变量引用到一个`block`，该`block`返回两个值的乘积：

```c
double (^multiplyTwoValues)(double, double);
```

关联的`block`字面可能是这样的：

```c
^ (double firstValue, double secondValue) {
    return firstValue * secondValue;
}
```

当你声明和定义好了`block`，你可以调用它就像一个函数一样：

```c
double (^multiplyTwoValues)(double, double) =
                          ^(double firstValue, double secondValue) {
                              return firstValue * secondValue;
                          };
double result = multiplyTwoValues(2,4);
NSLog(@"The result is %f", result);
```

## Block能从封闭作用域中捕获值

如果你在一个方法中定义了一个`block`，例如，它能从该方法的作用域中捕获任何能访问到的值，就像这样：

```c
- (void)testMethod {
    int anInteger = 42;
    void (^testBlock)(void) = ^{
        NSLog(@"Integer is: %i", anInteger);
};
    testBlock();
}
```

在这个例子中，`anInteger`是定义在`block`之外的，但是当`block`定义时该变量被捕获到了。

只有值被捕获了，除非你指定。这意味着当你在定义`block`和调用`block`之间改变该变量的外在值时，就像这样：

```c
int anInteger = 42;
void (^testBlock)(void) = ^{
    NSLog(@"Integer is: %i", anInteger);
};
anInteger = 84;
testBlock();
```

被`block`捕获的值并没有受到影响。这意味着同样会输出：

```c
Integer is: 42
```

### 使用__block来共享存储

如果你需要能够在`block`中改变捕获变量的值，你可以使用`__block`存储类型修饰符对原变量声明。这意味着该变量所在的存储是在原始变量的词法作用域和任何定义在该作用域的`block`之间共享。

作为一个例子，你可以重写之前都例子：

```c
__block int anInteger = 42;
void (^testBlock)(void) = ^{
    NSLog(@"Integer is: %i", anInteger);
};
anInteger = 84;
testBlock();
```

因为`anInteger`被定义为一个`__block`变量，它的存储会在`block`定义中共享。上面的代码会输出：

```c
Integer is: 84
```

这也意味着在`block`中可以修改原始值，就像这样：

```c
__block int anInteger = 42;
void (^testBlock)(void) = ^{
    NSLog(@"Integer is: %i", anInteger);
    anInteger = 100;
};
testBlock();
NSLog(@"Value of original variable is now: %i", anInteger);
```

以上会输出：

```c
Integer is: 42
Value of original variable is now: 100
```

## 你可以传递Block给方法或函数作为参数

在前面的所有例子中，你都是定义`block`之后立即调用它。实践中，传递`block`给函数或方法调用是非常常见的。你可能会使用`Grand Central Dispatch`在后台调用`block`，例如，或者定义一个`block`代表重复被调用的任务，例如当枚举一个集合的时候。

`Block`也同样可以被用于回调，定义一些代码在任务完成后执行。作为一个例子，你的app可能需要通过创建一个对象来响应用户的动作以此处理复杂的任务，例如从web服务器请求信息。因为这个任务可能会需要很长一段时间，在任务正在进行时您应该显示某种进度指示器，而一旦任务完成，您就需要隐藏掉任务指示器。

这将可能使用委托来完成这些：您需要创建一个合适的委托协议，实现必须的方法，设置您的对象为任务的委托，然后等待您的对象在任务完成时调用委托方法。

`Block`使这些变得更加容易，然而，因为你可以定义回调行为在你初始化任务的时候，就像这样：

```c
- (IBAction)fetchRemoteInformation:(id)sender {
    [self showProgressIndicator];
    XYZWebTask *task = ...
    [task beginTaskWithCallbackBlock:^{
        [self hideProgressIndicator];
}]; }
```

这个例子调用了一个方法来显示进度指示器，然后创建任务并开始。回调的`block`指定了在任务完成后执行的代码；在这种情况下，它只是调用了一个方法来隐藏进度指示器。要注意，这个回调`block`为了能够调用`hideProgressIndicator`方法而捕获了`self`。有一点非常重要的是在捕获`self`时要非常注意，因为它会造成`strong reference cycle`。

在代码的可读性方面，`block`使得很容易在一个地方看出在任务完成之前和之后会发生什么，避免了需要通过跟踪委托方法来找出发生了什么事情。

下面是`beginTaskWithCallbackBlock:`方法的声明：

```c
- (void)beginTaskWithCallbackBlock:(void (^)(void))callbackBlock;
```

`(void (^)(void))`指定了这个参数是一个不接受任何参数也没有返回值的`block`。该方法的实现可以以通常的方式来调用`block`：

```c
- (void)beginTaskWithCallbackBlock:(void (^)(void))callbackBlock {
    ...
    callbackBlock();
}
```

### block必须为方法的最后的参数

在方法中只使用一个`block`参数通常是最好的做法。如果一个方法同样需要其他的非`block`参数，那么`block`应该放在最后：

```c
￼- (void)beginTaskWithName:(NSString *)name completion:(void(^)(void))callback
```

这也使得在方法调用时代码具有更好的可读性，就像这样：

```c
self beginTaskWithName:@"MyTask" completion:^{
    NSLog(@"The task is complete");
}];
```

## 使用类型定义简化block语法

如果你需要定义不只一个`block`，且它们具有相同的签名，你可能想定义自己的类型签名。

作为一个例子，你可以定义一个没有参数也没有返回值的简单`block`类型，就像这样：

```c
typedef void (^XYZSimpleBlock)(void);
```

然后你就可以使用你的自定义类型来创建`block`了：

```c
XYZSimpleBlock anotherBlock = ^{
    ...
};
```

## 对象使用属性来记录block

该语法定义了一个属性来记录一个`block`，这很类似一个`block`变量：

```c
@interface XYZObject : NSObject
@property (copy) void (^blockProperty)(void);
@end
```

一个`block`属性就像其他`block`变量一样被设置和调用：

```c
self.blockProperty = ^{
    ...
};
self.blockProperty();
```

同样可能使用类型定义来定义`block`属性声明，就像这样：

```c
typedef void (^XYZSimpleBlock)(void);
@interface XYZObject : NSObject
@property (copy) XYZSimpleBlock blockProperty;
@end
```

## 捕获self时避免Strong Reference Cycles

如果你需要在`block`中捕获`self`，例如，当定义一个回调`block`，有一点非常重要当是要考虑内存管理的影响。

`Block`保持对任何捕获对象的强引用，也包括`self`，这意味着最后很容易造成强引用循环，例如，一个对象为一个`block`保持为一个`copy`属性然后捕获了`self`：

```c
@interface XYZBlockKeeper : NSObject
@property (copy) void (^block)(void);
@end
```

```c
@implementation XYZBlockKeeper
- (void)configureBlock {
	self.block = ^{
          [self doSomething];
	};
}
... @end
```

编译器会警告你一个简单的例子是这样的，但更复杂的例子可能涉及到对象创建周期之间的多个强引用，使之更难以诊断。

为了避免这个问题，捕获一个对`self`对弱引用是最好的办法，就像这样：

```c
- (void)configureBlock {
    XYZBlockKeeper * __weak weakSelf = self;
    self.block = ^{
        [weakSelf doSomething];   // capture the weak reference
                                  // to avoid the reference cycle
	}
}
```

## Block简化枚举

除了一般的完成处理，许多`Cocoa`和`Cocoa Touch API `使用`block`来简化常用的任务，如集合枚举。`NSArray`类，例如，提供了三个基于`block`的方法，包括：

```c
- (void)enumerateObjectsUsingBlock:(void (^)(id obj, NSUInteger idx, BOOL
*stop))block;
```

该方法接受一个参数，它是一个`block`会被数组中的每一个元素调用：

```c
NSArray *array = ...
[array enumerateObjectsUsingBlock:^ (id obj, NSUInteger idx, BOOL *stop) {
    NSLog(@"Object at index %lu is %@", idx, obj);
}];
```

## Block简化并发任务

`block`代表了一个工作的不同单位，结合可执行代码和从周围作用域捕获的可选状态。这使得它非常适用于在iOS和OS X中使用并发选项之一来异步调用。而不必弄清楚如何与低层次的机制工作，就像线程，您可以使用`block`简单地定义你的任务，然后让系统执行这些任务随着处理器资源可用。

OS X和iOS提供了各种技术的并发性，其中包括两个任务调度机制：操作队列和`Grand Central Dispatch`，这些机制围绕队列任务等待被执行的想法。您按照您想`block`执行的顺序将`blocks`添加到队列中，然后系统将它们出列直到处理器时间和资源可用。

串行队列只允许一个任务同时执行——队列中的下一个任务将不被出列并调用直到前一个任务已完成。并发队列调用尽可能多的任务，无需等待前一个任务来完成。

### 使用Block操作与操作队列

操作队列是`Cocoa`和`Cocoa Touch`的任务调度方式。你创建一个`NSOperation`实例为了封装工作单位以及任何必要的数据，然后将那个操作添加到`NSOperationQueue`执行。

尽管你创建了你自己的自定义`NSOperation`子类去实现复杂的任务，但还是可能去使用`NSBlockOperation`来用`block`创建一个操作，就像这样：

```c
NSBlockOperation *operation = [NSBlockOperation blockOperationWithBlock:^{
    ...
}];
```

这是可能手动去执行操作，但是操作可能通常被添加到一个已经存在到操作队列或你自己创建的一个队列，准备执行：

```c
 // schedule task on main queue:
NSOperationQueue *mainQueue = [NSOperationQueue mainQueue];
[mainQueue addOperation:operation];
// schedule task on background queue:
NSOperationQueue *queue = [[NSOperationQueue alloc] init];
[queue addOperation:operation];
```

如果你使用一个操作队列，你可以在操作之间配置优先级和依赖，例如指定某个操作必须在其他一些操作执行后才能操作。

### 调度Block在GCD的调度队列（Schedule Blocks on Dispatch Queues with Grand Central Dispatch）

如果你需要调度执行代码的任意块，你可以直接使用被GCD（Grand Central Dispatch ）控制的调度队列，调度队列使得操作任务更加简单，不管是相对于调用者的同步或异步操作，且执行这些任务的顺序为先进先出。

你可以创建你自己的调度队列或使用GCD提供的队列。如果你需要调度一个任务为并发执行，例如，你可以通过`dispatch_get_global_queue()`获取一个存在队列的引用，和指定一个队列优先级，就像这样：

```c
dispatch_queue_t queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);
```

为了将`block`调度到队列，您可以使用`dispatch_async()`或`dispatch_sync()`函数。`dispatch_async()`函数是立即返回，不用去等待`block`的执行。

```c
dispatch_async(queue, ^{
    NSLog(@"Block for asynchronous execution");
});
```
