Node.js Child Process
========

## child_process.spawn(command, [args], [options])

`spawan()`方法用于启动一个子进程来执行命令。

参数：

 - command {String}：需要运行的命令
 - args {Array}：该参数是一个数组，它是`command`执行时的参数
 - options {Object}：
	 - cwd {String}：子进程的当前工作目录
	 - stdio {Array|String}：子进程的stdio配置
	 - customFds {Array}：反对的。作为子进程 stdio 使用的 文件标示符
	 - env {Object}：环境变量的键值对
	 - detached {Boolean}：子进程将会变成一个进程组的领导者
	 - uid {Number}：设置进程的用户ID
	 - gid {Number}：设置进程的组ID
 - 返回值：ChildProcess对象

实例：运行`ls -al /usr`，并捕捉`stdout`和`stderr`：

```c
var spawn = require('child_process').spawn,
    ls    = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', function (data) {
  console.log('stdout: ' + data);
});

ls.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
});

ls.on('close', function (code) {
  console.log('child process exited with code ' + code);
});
```

还有个更加复杂的例子，`ps au`并将其`stdout`写入到`grep`：

```c
var spawn = require('child_process').spawn,
    ps    = spawn('ps', ['ax']),
    grep  = spawn('grep', ['ssh']);

ps.stdout.on('data', function (data) {
  grep.stdin.write(data);
});

ps.stderr.on('data', function (data) {
  console.log('ps stderr: ' + data);
});

ps.on('close', function (code) {
  if (code !== 0) {
    console.log('ps process exited with code ' + code);
  }
  grep.stdin.end();
});

grep.stdout.on('data', function (data) {
  console.log('' + data);
});

grep.stderr.on('data', function (data) {
  console.log('grep stderr: ' + data);
});

grep.on('close', function (code) {
  if (code !== 0) {
    console.log('grep process exited with code ' + code);
  }
});
```

## child_process.exec(command, [options], callback)

`exec()`也是启动一个子进程来执行命令，与`spawn()`不同的就是它有一个回调函数，并且传入的`command`也是不同的。

参数：

 - command {String}：需要执行的命令，并且带着以空格分隔的参数。例如：`ls -al /usr`
  - options {Object}：
	 - cwd {String}：子进程的当前工作目录
	 - env {Object}：环境变量的键值对
	 - encoding {String}：默认为`utf8`
	 - timeout {Number}：默认为0
	 - maxBuffer {Number}：默认为`200 * 1024`
	 - killSignal {String}：默认为`SIGTERM`
 - callback {Function}：
	 - err {Error}
	 - stdout {Buffer}
	 - stderr {Buffer}
 - 返回值：ChildProcess对象

实例：在shell中运行一个命令并输出：

```c
var exec = require('child_process').exec,
    child;

child = exec('cat *.js bad_file | wc -l',
  function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
});
```

回调函数接受三个参数，在成功时`error`参数为`null`。在发生错误的情况下，`error`时`Error`对象的一个实例，并且`error.code`为子进程退出时的代码，`error.signal`被设置为结束进程的信号名。

第二个参数的默认值为：

```c
{ encoding: 'utf8',
  timeout: 0,
  maxBuffer: 200*1024,
  killSignal: 'SIGTERM',
  cwd: null,
  env: null }
```

## child_process.execFile(file, [args], [options], [callback])

`execFile()`和`exec()`很类似，不同的是`execFile()`用于执行文件。

参数：

 - command {String}：要运行的程序的文件名
 - args {Array}：字符串参数列表
  - options {Object}：
	 - cwd {String}：子进程的当前工作目录
	 - env {Object}：环境变量的键值对
	 - encoding {String}：默认为`utf8`
	 - timeout {Number}：默认为0
	 - maxBuffer {Number}：默认为`200 * 1024`
	 - killSignal {String}：默认为`SIGTERM`
 - callback {Function}：
	 - err {Error}
	 - stdout {Buffer}
	 - stderr {Buffer}
 - 返回值：ChildProcess对象

## child_process.fork(modulePath, [args], [options])

`fork()`用于直接运行`Node.js`模块，例如`fork('./child.js')`，相当于`spawn('node', ['./child.js'])`。与默认的`spawn`不同的是，`fork`会在父进程与子进程直接建立一个IPC管道，用于父子进程之间的通信。

参数：

 - modulePath {String}：子进程中运行的模块
 - args {Array}：字符串参数列表
 - options {Object}：
	 - cwd {String}：子进程的当前工作目录
	 - env {Object}：环境变量的键值对
	 - encoding {String}：默认为`utf8`
	 - execPath {String}：创建子进程的可执行文件
	 - execArgv {Array}：传入可执行文件的字符串参数列表
	 - silent {String}：

## 事件

上面的四个函数都是返回了一个`ChildProcess`对象，这些对象还包含了一些事件:

**1. error**


	 
