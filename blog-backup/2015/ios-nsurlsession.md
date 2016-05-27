title: iOS NSURLSession
date: 2015-05-27 18:07:42
categories: iOS
tags: [iOS]
---

`NSURLSession`是`iOS7`中新的网络接口，负责处理数据的加载以及文件和数据在客户端与服务端之间的上传和下载。本文将从以下几个方面介绍：

 - NSURLSessionConfiguration：在使用`NSURLSession`首先要创建一个`NSURLSessionConfiguration`来配置我们的`NSURLSession`
 - NSURLSession
 - NSURLSessionTask：
	 - NSURLSessionDataTask：处理一般的 NSData 数据对象，比如通过GET或POST方式从服务器获取JSON或XML返回等等，但不支持后台获取
	 - NSURLSessionUploadTask：用于上传文件，支持后台上传
	 - NSURLSessionDownloadTask：用于下载文件，支持后台下载

## NSURLSessionConfiguration

一个`NSURLSessionConfiguration`对象定义了当使用`NSURLSession`对象上传和下载数据时的行为和使用策略。当你需要上传和下载数据时，创建一个配置对象总是你必须采取的第一步。从指定可用网络，到 cookie，安全性，缓存策略，再到使用自定义协议，启动事件的设置，以及用于移动设备优化的几个新属性，你会发现使用 `NSURLSessionConfiguration`可以找到几乎任何你想要进行配置的选项。

`NSURLSession`在初始化时会把配置它的`NSURLSessionConfiguration`对象进行一次 copy，并保存到自己的`configuration`属性中，而且这个属性是只读的。因此之后再修改最初配置`session`的那个`configuration`对象对于`session`是没有影响的。也就是说，`configuration`只在初始化时被读取一次，之后都是不会变化的。

`NSURLSessionConfiguration`提供了三个工厂方法来创建我们的`Session Configuration`对象：

 - `+ defaultSessionConfiguration`：该方法返回创建的一个默认`Session Configuration`对象。默认的`Session Configuration`会使用磁盘来缓存数据并在用户的`keychain`中存储凭证。它同样会存储`cookie`。
 - `+ ephemeralSessionConfiguration`：返回一个`session configuration`，且不会使用缓存，`cookie`和凭证。使用`ephemeral sessions`主要的优点就是隐私。因此，它可以用于实现像秘密浏览这种功能。
 - `+ backgroundSessionConfigurationWithIdentifier:`：返回一个后台的`session configuration`。后台`session`不同于常规的，普通的`session`，它甚至可以在应用程序挂起，退出或者崩溃的情况下运行上传和下载任务。初始化时指定的标识符，被用于向任何可能在进程外恢复后台传输的守护进程（daemon）提供上下文。

对于`NSURLSessionConfiguration`的属性配置，可以看这篇文章：[http://objccn.io/issue-5-4/](http://objccn.io/issue-5-4/)。

## NSURLSession

创建好了`NSURLSessionConfiguration`对象，我们就可以使用它来创建我们的`NSURLSession`对象了。`NSURLSession`提供了三个工厂方法来创建我们的`session`对象：

 - `+ sessionWithConfiguration:`：使用指定的`session configuration`来创建一个`session`，且会创建一个序列的`NSOperationQueue`对象来处理所有的委托方法和完成处理程序的调用
 - `+ sessionWithConfiguration:delegate:delegateQueue:`：使用指定的`session configuration`、`delegate`和`operation queue.`来创建`session`。这个方法可以更细粒度的创建`session`，可以设定回调的`delegate`（注意这个回调delegate会被强引用），并且可以设定`delegate`在哪个`OperationQueue`回调，如果我们将其设置为`[NSOperationQueue mainQueue]`就能在主线程进行回调非常的方便。
 - `+ sharedSession`：返回一个共享的单例`session`对象

## NSURLSessionTask

通过上面创建的`session`，我们就可以安排三种类型的任务：检索数据到存储器的数据任务、下载文件到硬盘的下载任务和从硬盘上传文件的上传任务。

`NSURLSessionTask`是一个抽象类，其下有 3 个实体子类可以直接使用：`NSURLSessionDataTask`、`NSURLSessionUploadTask`、`NSURLSessionDownloadTask`。这 3 个子类封装了现代程序三个最基本的网络任务：获取数据，比如 JSON 或者 XML，上传文件和下载文件。

所有的`task`都是可以取消，暂停或者恢复的。当一个 download task 取消时，可以通过选项来创建一个恢复数据（resume data），然后可以传递给下一次新创建的`download task`，以便继续之前的下载。

这里的`task`不同于其他的`alloc-init`初始化方法，它是需要通过`session`来创建的，`NSURLSession`提供了多个方法来创建`task`：

**Data Task：**

 - `- dataTaskWithURL:`
 - `- dataTaskWithURL:completionHandler:`
 - `- dataTaskWithRequest:`
 - `- dataTaskWithRequest:completionHandler:`

实例：

```c
NSURLSessionConfiguration *configuration = [NSURLSessionConfiguration defaultSessionConfiguration];
NSURL *url = [NSURL URLWithString:@"http://demo.com"];
NSURLRequest *request = [NSURLRequest requestWithURL:url];

NSURLSession *session = [NSURLSession sessionWithConfiguration:configuration];
NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
     // do something
}];
[dataTask resume];
```

**Download Task：**

 - `- downloadTaskWithURL:`
 - `- downloadTaskWithURL:completionHandler:`
 - `- downloadTaskWithRequest:`
 - `- downloadTaskWithRequest:completionHandler:`
 - `- downloadTaskWithResumeData:`
 - `- downloadTaskWithResumeData:completionHandler:`

实例：

```c
NSURL *URL = [NSURL URLWithString:@"http://example.com/file.zip"];
NSURLRequest *request = [NSURLRequest requestWithURL:URL];

NSURLSession *session = [NSURLSession sharedSession];
NSURLSessionDownloadTask *downloadTask = [session downloadTaskWithRequest:request                                                    completionHandler:^(NSURL *location, NSURLResponse *response, NSError *error) {
        NSString *documentsPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) firstObject];
        NSURL *documentsDirectoryURL = [NSURL fileURLWithPath:documentsPath];
        NSURL *newFileLocation = [documentsDirectoryURL URLByAppendingPathComponent:[[response URL] lastPathComponent]];
        [[NSFileManager defaultManager] copyItemAtURL:location toURL:newFileLocation error:nil];
}];

[downloadTask resume];
```

**Upload Task：**

 - `- uploadTaskWithRequest:fromData:`
 - `- uploadTaskWithRequest:fromData:completionHandler:`
 - `- uploadTaskWithRequest:fromFile:`
 - `- uploadTaskWithRequest:fromFile:completionHandler:`
 - `- uploadTaskWithStreamedRequest:`

实例：

```c
NSURL *URL = [NSURL URLWithString:@"http://example.com/upload"];
NSURLRequest *request = [NSURLRequest requestWithURL:URL];
NSData *data = ...;

NSURLSession *session = [NSURLSession sharedSession];
NSURLSessionUploadTask *uploadTask = [session uploadTaskWithRequest:request fromData:data completionHandler:
     ^(NSData *data, NSURLResponse *response, NSError *error) {
         // ...
     }];
[uploadTask resume];
```

以上就是本文的全部内容啦。如有不对还请指出。
