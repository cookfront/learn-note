grunt 实例
========

这里使用[load-grunt-config](https://github.com/firstandthird/load-grunt-config)插件来加载模块化的构建文件。

## grunt-contrib-concat

`concat.js`

```c
module.exports = {
	js: {
		src: ['js/**/*.js'],
		dest: 'build/js/common.js'
	},
	css: {
		src: ['css/**/*.css'],
		dest: 'build/css/common.css'
	}
};
```

也可以使用文件数组格式：

```c
module.exports = {
	js: {
		files: [
			{ src: ['js/**/*.js'], dest: 'build/js/common.js', filter: 'isFile' }
		]
	},
	css: {
		files: [
			{ src: ['css/**/*.css'], dest: 'build/css/common.css', filter: 'isFile' }
		]
	}
};
```

## grunt-contrib-uglify

`uglify.js`

```c
module.exports = {
	dist: {
		src: 'build/js/common.js',
		dest: 'build/js/common.min.js'
	}
};
```

这样一个一个配置肯定很麻烦，下面利用动态文件对象来构建（[关于动态文件对象还请点我](http://www.gruntjs.org/docs/configuring-tasks.html)）：

我们将`js`目录下的所有文件压缩到`build/js`：

```c
module.exports = {
	dist: {
		expand: true,
		cwd: 'js/',
		src: '*.js',
		dest: 'build/js',
		ext: '.min.js'
	}
};
```

## grunt-contrib-jshint

`jshint`是用来语法检查的。

```c
module.exports = {
	options: {
		'jshintsrc': true
	},
	src: ['js/**/*.js']
};
```

上面配置`jshintsrc`为`true`时，会自动相对于语法检查的文件寻找`.jshintsrc`文件来做语法检查，其实上面代码等价为：

```c
module.exports = {
	options: {
		'jshintsrc': '.jshintsrc'
	},
	src: ['js/**/*.js']
};
```

也可以在`options`中配置需要检查的项，例如：

```c
module.exports = {
	options: {
		curly: true,
		eqeqeq: true,
		eqnull: true,
	},
	src: ['js/**/*.js']
};
```

## grunt-contrib-copy

`copy`是用于复制文件的。

以下配置将`src`目录的文件拷贝到`dest`目录：

```c
module.exports = {
	main: {
		src: 'src/**',
		dest: 'dest'
	}
};
```

如果你需要更细粒度到控制，可以这样：

```c
module.exports = {
	main: {
		expand: true,
		cwd: 'src/',
		src: '**',
		dest: 'dest/',
		filter: 'isFile'
	}
};
```

## grunt-contrib-watch

`watch`用于监听文件到改变，当文件发生改变时，执行某些任务：

```c
module.exports = {
	js: {
		files: 'js/**/*.js',
		tasks: ['jshint'],
		options: {
			livereload: true
		}
	},
	css: {
		files: 'sass/**/*.scss',
		tasks: ['sass'],
		options: {
			livereload: true
		}
	}
};
```

上面的`files`配置需要监听的文件，`tasks`则配置文件改变时执行的任务，`options`则是一些配置选项，此处配置`livereload: true`你就可以不用每次按刷新啦。


