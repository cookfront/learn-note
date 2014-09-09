grunt
========

## package.json

这个文件被用来存储已经作为npm模块发布的项目元数据(也就是依赖模块)。你将在这个文件中列出你的项目所依赖的Grunt(通常我们在这里配置Grunt版本)和Grunt插件(相应版本的插件)。

```c
{
	"name": "grunt-test-project",
	"version": "0.0.1",
	"devDependencies": {
		"grunt": "~0.4.1",
		"grunt-contrib-jshint": "~0.10.0",
		"grunt-contrib-concat": "~0.1.1",
		"grunt-contrib-uglify": "~0.1.2",
		"grunt-contrib-cssmin": "~0.8.0"
	}
}
```

然后运行`npm install`就会将所有的依赖下载到本地。你也可以通过`npm install grunt --save-dev`的方式去下载某个依赖，并且它会自动更新`package.json`中对应的依赖。

## Gruntfile.js

它用于配置或者定义Grunt任务和加载Grunt插件。

```c
/**
 * Gruntfile.js
 *
 * @author cookfront@gmail.com
 * @date 2014-09-09
 */
module.exports = function (grunt) {
	grunt.initConfig({
		jshint: {
			options: {
				'jshintsrc': true
			},
			src: ['js/**/*.js']
		},
		concat: {
			js: {
				src: ['js/**/*.js'],
				dest: 'build/js/common.js'
			},
			css: {
				src: ['css/**/*.css'],
				dest: 'build/css/common.css'
			}
		},
		cssmin: {
			dist: {
				src: 'build/css/common.css',
				dest: 'build/css/common.min.css'
			}
		},
		uglify: {
			dist: {
				src: 'build/js/common.js',
				dest: 'build/js/common.min.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('test', ['jshint']);
	grunt.registerTask('default', ['concat', 'cssmin', 'uglify']);
};
```

是不是厌烦了每次都要`loadNpmTasks()` N次呢？还有就是当你需要使用一个新的`grunt`插件时，你需要同时配置`package.json`和更新`Gruntfile.js`，或者说你不需要某插件了，并且更新了你的`package.json`，但是你忘记了更新`Gruntfile.js`，这时构建就会失败，这样是不是很烦人呢？下面介绍一个`grunt`插件：[load-grunt-tasks](https://github.com/sindresorhus/load-grunt-tasks)。这个插件可以分析你的`package.json`文件，自动加载`grunt`相关的模块。

在使用`load-grunt-tasks`前：

```c
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-uglify');
```

也许还会更多。使用后：

```c
require('load-grunt-tasks')(grunt);
```

是不是觉得高大上呀。还有一个`grunt`插件是：[load-grunt-config](https://github.com/firstandthird/load-grunt-config)。这个插件可以让你编写模块化的`grunt`，啥叫模块化的`grunt`呢，上面的`Gruntfile.js`是将所有的任务写在一个文件中，有了`load-grunt-config`你就可以将不同的任务写在不同的文件中，增强了可维护性。

