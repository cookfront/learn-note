title: Compass Sprite
date: 2014-09-16 15:41:42
categories: CSS
tags: [CSS, Compass]
---

compass sprite
========

首先如果你没有添加`compass`到项目中，则进入项目运行：

```c
compass init
```

运行完之后就会生成相关的配置文件和目录等。然后就是需要将`config.rb`中相关配置成你对应的目录：

```c
require 'compass/import-once/activate'
# Require any additional compass plugins here.

# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "stylesheets"
sass_dir = "sass"
images_dir = "img"
javascripts_dir = "javascripts"
```

我这里只将图片目录改为了`img`，现在到了本文的关键啦。在`img`目录新建一个目录，这里以`icons`为例，并在目录中放入你需要合并的图片。然后新建一个`sprite.scss`（示例文件）文件：

```c
@import "compass/utilities/sprites";
@import "icons/*.png";

@include all-icons-sprites;
```

在命令行运行：`compass compile`，此时会在`stylesheets`目录生成一个`sprite.css`文件，并且会在`img`目录生成合并的图片，其内容如下：

```c
/* line 56, icons/*.png */
.icons-sprite, .icons-alistapart, .icons-amazon {
  background-image: url('/img/icons-s99619934d5.png');
  background-repeat: no-repeat;
}

/* line 84, ../../../../Ruby200-x64/lib/ruby/gems/2.0.0/gems/compass-core-1.0.1/stylesheets/compass/utilities/sprites/_base.scss */
.icons-alistapart {
  background-position: 0 0;
}

/* line 84, ../../../../Ruby200-x64/lib/ruby/gems/2.0.0/gems/compass-core-1.0.1/stylesheets/compass/utilities/sprites/_base.scss */
.icons-amazon {
  background-position: 0 -64px;
}
```

可以看到`compass`为我们生成了合并后的图片和代码，是不是觉得高大上呀。仅仅这些肯定还是不够的。

当我们对单个`sprite`生成`CSS`代码时，我们可以`icons-sprite(img-name)`（这里`icons`为目录名）。例如：

```c
@import "compass/utilities/sprites";
@import "icons/*.png";

.amazon {
	@include icons-sprite(amazon);
}
```

生成的代码如下：

```c
/* line 56, icons/*.png */
.icons-sprite, .amazon {
  background-image: url('/img/icons-s99619934d5.png');
  background-repeat: no-repeat;
}

/* line 4, ../sass/sprite.scss */
.amazon {
  background-position: 0 -64px;
}
```

## 配置sprite

语法：

```c
$<map>-<property>: setting;
$<map>-<sprite>-<property>: setting;
```

上面的`map`就是目录名，本位为`icons`，`property`是你需要配置的属性，`sprite`就是单个的`sprite`，例如：

```c
$icons-spacing: 5px;
$icons-amazon-spacing: 10px;
```

上面配置全局间隔为`5px`，amazon的间隔为`10px`。

### 配置sprite间隔

语法：

```c
$<map>-spacing: setting;
$<map>-<sprite>-spacing: setting;
```

实例：

```c
$icons-spacing: 10px;
$icons-close-spacing: 5px;

@import "compass/utilities/sprites";
@import "icons/*.png";

@include all-icons-sprites;
```

### 配置sprite重复

语法：

```c
$<map>-repeat: setting;
$<map>-<sprite>-repeat: setting;
```

### 配置sprite位置

语法：

```c
$<map>-position: setting;
$<map>-<sprite>-position: setting;
```

### 配置sprite布局

语法：

```c
$<map>-layout: vertical/horizontal/diagonal/smart
```

### 配置是否清除旧的sprite图片（就是之前合并的图片）

语法：

```c
$<map>-clean-up: true/false;
```

默认情况下该配置为`true`，也就是会清除之前合并的图片。我们可以配置其为`false`，这样就不会删除之前合并的图片了：

```c
$icons-clean-up: false;

@import "compass/utilities/sprites";
@import "icons/*.png";

@include all-icons-sprites;
```

## 定制sprite合并的CSS

### 配置sprite尺寸

如果你想为某个指定的sprite指定尺寸，你可以使用以下方法：

```c
<map>-sprite-height($name);
<map>-sprite-width($name);
```

这里的`$name`就是对应某个图片的名字。

例如:

```c
@import "compass/utilities/sprites";
@import "icons/*.png";

.close {
	@include icons-sprite(close);
	width: icons-sprite-width(close);
	height: icons-sprite-height(close);
}
```

生成的代码如下：

```c
/* line 64, icons/*.png */
.icons-sprite, .close {
  background-image: url('/img/icons-s9fe78d709f.png');
  background-repeat: no-repeat;
}

/* line 4, ../sass/sprite.scss */
.close {
  background-position: 0 0;
  width: 14px;
  height: 14px;
}
```

如果你希望自动生成尺寸属性，你可以设置：

```c
$<map>-sprite-dimensions: true/false;
```

该配置默认为`false`。

### 配置base class

compass会自动生成一个基类，例如上面的`.icons-sprite`。我们可以配置基类的类名：

```c
$icons-sprite-base-class: '.icons';
```

这样生成的`CSS`代码基类就是`.icons`了：

```c
/* line 64, icons/*.png */
.icons, .close {
  background-image: url('/img/icons-s9fe78d709f.png');
  background-repeat: no-repeat;
}

/* line 6, ../sass/sprite.scss */
.close {
  background-position: 0 0;
  width: 14px;
  height: 14px;
}
```

### 配置魔法伪类选择器(magic pseudo selectors)

compass会自动为伪类选择器生成代码，例如我们的`icons`中有`close.png`和`close_hove.png`就会生成以下代码：

```c
/* line 64, icons/*.png */
.icons-sprite, .icons-close {
  background-image: url('/img/icons-sfcd081c545.png');
  background-repeat: no-repeat;
}

/* line 84, ../../../../Ruby200-x64/lib/ruby/gems/2.0.0/gems/compass-core-1.0.1/stylesheets/compass/utilities/sprites/_base.scss */
.icons-close {
  background-position: 0 0;
}
/* line 59, ../../../../Ruby200-x64/lib/ruby/gems/2.0.0/gems/compass-core-1.0.1/stylesheets/compass/utilities/sprites/_base.scss */
.icons-close:hover, .icons-close.close-hover {
  background-position: 0 -14px;
}
```

有时候你可能不需要这样，你可以通过以下配置禁用：

```c
$disable-magic-sprite-selectors: true;
```

## sprite map

上面都是通过`@import "icons/*.png"`的方式，配置时也只能使用对应的`icons`，有了`sprite map`我们可以通过映射来使用不同的名字：

```c
@import "compass/utilities/sprites";
$other: sprite-map("icons/*.png", $layout: smart);
```

然后我们可以这样写代码：

```c
@import "compass/utilities/sprites";
$other: sprite-map("icons/*.png", $layout: smart);

.close {
	background: sprite($other, close) no-repeat;
}
```

还有更多的帮助函数：`sprite-position($other, close)`

```c
.close {
	background-position: sprite-position($other, close);
}
```

也可以通过`sprite-background-position`的mixin。例如：

```c
.close {
	@include sprite-background-position($other, close);
}
```

要注意这两种写法的区别。还有一个mixin `sprite-dimensions()`，这个会生成`width`和`height`：

```c
.close {
	@include sprite-dimensions($other, close);
}
```
