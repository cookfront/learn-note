title: HTML5 Notification
date: 2014-04-04 10:19:04
categories: HTML/HTML5
tags: HTML5
---

`Notification`是`HTML5`新增的一个api，它可以用于创建原生的通知，比如在Gmail中，如果用于允许显示通知的话，当有邮件到了，就会向用户显示一个通知，提示你有新的邮件。

## 浏览器支持

`Notification`目前主要是在`webkit`，和`gecko`的浏览器中被支持，也就是`Chrome`，`Safari`和`Firefox`，IE始终是落后呀。[浏览器支持情况][1]

那么既然有些浏览器不支持，就需要去判断浏览器是否支持，支持就使用该`api`，不支持则直接返回了：

```c
/**
 * Notification is supported?
 */
Notify.isSupported = function () {
  if ('Notification' in window) {
    return true;
  }
  return false;
};
```

## 获取用户许可

在使用`Notification`之前需要向用户获取许可，如果用户允许显示通知，才会去显示`Notification`，在`Notification`中提供了一个`requestPermission`方法，这个方法就是用于向用户请求许可，许可的状态主要有三个状态：`default`，`denied`，`granted`，`default`即为默认状态，`denied`被用户拒绝了，`granted`被用户同意显示通知，这个状态会保存在`Notification.permission`中。例如可以这样使用`requestPermission`：

```c
Notification.requestPermission(function (permission) {
  // 如果用户允许显示通知，则显示一个通知
  if (permission === 'granted') {
    var notification = new Notification('hello'); 
  }
});
```

```c
/**
 * request the permission
 *
 * @param {Function} onGranted
 * @param {Function} onDenied
 */
Notify.requestPermission = function (onGranted, onDenied) {
  if (Notify.isSupported()) {
    Notification.requestPermission(function (permission) {
      switch (permission) {
        case 'granted':
          if (typeof onGranted === 'function') {
            onGranted();
          }
          break;
        case 'denied':
          if (typeof onDenied === 'function') {
            onDenied();
          }
          break;
      }
    });
  }
};
```

上面的`requestPermission`是被封装过的，它需要传入两个函数作为参数，第一个参数为允许时执行的函数，第二个为拒绝时执行的函数。然后是去判断浏览器的支持，如果支持就向用户请求许可，`Notification.requestPermission`接受一个函数作为参数，并且这个函数的参数就是获取来的请求状态，要么为`granted`，要么就是`denied`了。

## 显示通知

向用户请求许可之后就是需要去显示通知了，只要新建一个`Notification`对象，就会显示一个通知：

```c
var notification = new Notification(title, options)
```

`title`即为通知的标题，`options`为通知的一些需要配置的参数，它包括：

 - dir： 通知显示的方向
 - lang： 通知使用的代码语言
 - body： 通知的主体内容
 - icon： 一个url，配置通知显示的图标
 - tag： 通知的id

例如，可以这样去配置一个通知：

```c
var notification = new Notification('hello', {
  body: 'the notification content'
});
```

一般主要用到的还是`body`，除了配置这些参数，还为通知添加了一些事件：

 - click： 当通知被点击时触发
 - show： 当通知显示时触发
 - error： 当通知发生错误时触发
 - close： 当通知关闭时触发

新建的通知对象可以为其添加上面这些事件，当这些事件触发时会执行相应的回调函数：

```c
notification.addEventListener('click', function () {
  console.log('notification clicked');
}, false);
```
## 实例代码

下面的代码来自于：[Notify.js][2]，做了一些小的改动：

```c
/**
 * Notify constructor
 * initial the title and options
 *
 * @param {String} title
 * @param {Object} options
 *  - icon
 *  - body
 *  - tag
 */
function Notify (title, options) {
  this.title = typeof title === 'string' ? title : null;

  this.options = {
    tag: null,
    icon: null,
    body: null,
    timeout: null,
    notifyshow: null,
    notifyClick: null,
    notifyClose: null,
    notifyError: null
  };

  if (typeof options === 'object') {
    for (var i in options) {
      if (options.hasOwnProperty(i)) {
        this.options[i] = options[i];
      }
    }

    if (typeof options.notifyshow === 'function') {
      this.options.notifyshow = options.notifyshow;
    }

    if (typeof options.notifyClick === 'function') {
      this.options.notifyClick = options.notifyClick;
    }

    if (typeof options.notifyClose === 'function') {
      this.options.notifyClose = options.notifyClose;
    }

    if (typeof options.notifyError === 'function') {
      this.options.notifyError = options.notifyError;
    }
  }
}

/**
 * Notification is supported?
 */
Notify.isSupported = function () {
  if ('Notification' in window) {
    return true;
  }
  return false;
};

/**
 * Is need to request permission
 */
Notify.needPermission = function () {
  if (Notify.isSupported() && Notification.permission === 'granted') {
    return false;
  }
  return true;
};


/**
 * request the permission
 *
 * @param {Function} onGranted
 * @param {Function} onDenied
 */
Notify.requestPermission = function (onGranted, onDenied) {
  if (Notify.isSupported()) {
    Notification.requestPermission(function (permission) {
      switch (permission) {
        case 'granted':
          if (typeof onGranted === 'function') {
            onGranted();
          }
          break;
        case 'denied':
          if (typeof onDenied === 'function') {
            onDenied();
          }
          break;
      }
    });
  }
};

/**
 * show the Notification
 */
Notify.prototype.show = function () {
  if (!Notify.isSupported()) {
    return;
  }

  this.myNotify = new Notification(this.title, {
    tag: this.options.tag,
    icon: this.options.icon,
    body: this.options.body
  });

  if (this.options.timeout && !isNaN(this.options.timeout)) {
    setTimeout(this.close.bind(this), this.options.timeout * 1000);
  }

  this.myNotify.addEventListener('click', this.options.notifyclick, false);
  this.myNotify.addEventListener('show', this.options.notifyshow, false);
  this.myNotify.addEventListener('error', this.options.notifyerror, false);
  this.myNotify.addEventListener('close', this.options.notifyclose, false);
};

/**
 * close the Notification
 */
Notify.prototype.close = function () {
  this.myNotify.close();
};

```
 那么如何使用呢？
 
```c
<button id="btn">Notify</button>
<script>
var btn = document.getElementById('btn');
btn.addEventListener('click', function () {
  function show () {
    console.log('show');
  }

  function close () {
    console.log('close')
  }

  var notify = new Notify('hello', {
    body: 'Notification',
    timeout: 1,
    notifyshow: show,
    notifyclose: close
  });
  function onGranted () {
    notify.show();
  }
  // 如果需要许可，则向用户请求，否则直接显示通知
  if (Notify.needPermission()) {
    Notify.requestPermission(onGranted);
  } else {
    notify.show();
  }
}, false);
</script>
```
 


  [1]: http://caniuse.com/notifications
  [2]: https://github.com/alexgibson/notify.js/blob/master/notify.js