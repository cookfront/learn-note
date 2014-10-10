title: Sass 中文手册
date: 2014-04-14 18:52:20
categories: CSS
tags: [Sass, CSS]
---

`SASS`可以说是`CSS`的一个扩展，可以让你写出更优雅的`CSS`代码。它允许你定义变量，嵌套规则，`mixins`和`imports`等，所有的这些都可以很好的兼容`CSS`代码。`SASS`可以让你的样式文件很好的被组织并且跑的更快。

## 特性

 - 完全兼容CSS3
 - 语言扩展，例如变量、嵌套和混入
 - 许多有用的函数用于操作颜色和其他值
 - 可以像其他编程语言一样的控制指令
 - 良好的格式和可定制的输出
 - Firebug的整合
 
## 语法

在`Sass`中有两种可用的语法。第一种，被称为`SCSS`(Sassy CSS)，是对`CSS3`语法的扩展。这意味着所有合法的`CSS3`样式表都是一个合法的`SCSS`文件。此外，`SCSS`理解许多的`CSS hacks`和浏览器前缀的语法。这种语法更高级的部分将在下面介绍到，使用这种语法的文件使用`.scss`作为文件扩展名

第二种语法是一种老式的语法，被称为缩进语法（或有时只是“`Sass`”），提供了一种编写`CSS`更简洁的方式。它采用缩进而不是括号来表示嵌套，且使用换行而不是分号来分隔属性。有些人发现这种语法非常容易阅读且能比`SCSS`更快的编写样式表。这种缩进语法具有所有相同的特性，但其中有一些稍微不同的语法，这将在[缩进语法参考][1]中描述。使用这种语法的文件使用`.sass`作为扩展名。

然而这两种格式之间可以很好的互相转化：

```c
# 将Sass转换为Scss
$ sass-convert style.sass style.scss

# 将Scss转换为Sass
$ sass-convert style.scss style.sass
```

## 使用Sass

为了运行`Sass`可以在命令行中敲入一下命令：

```c
sass input.scss output.css
```

这样就可以将`.scss`文件转换为`.css`文件了。你还可以告诉`Sass`去监控`Sass`文件的改变，每当`Sass`文件改变就能将其立即转换为`CSS`文件。

```c
sass --watch input.scss:output.css
```
如果你在一个目录下有许多的`Sass`文件需要监控，你同样可以告诉`Sass`监控整个目录：

```c
sass --watch app/sass:public/stylesheets
```

如果在使用中遇到不懂的需要帮助，可以敲入`sass --help`。

## CSS扩展

### 嵌套规则（Nested Rules）

`Sass`允许嵌套`CSS`规则，可以看下面的例子：

```c
#main p {
  color: #00ff00;
  width: 97%;

  .redbox {
    background-color: #ff0000;
    color: #000000;
  }
}
```

上面的代码将被编译成：

```c
#main p {
  color: #00ff00;
  width: 97%; }
  #main p .redbox {
    background-color: #ff0000;
    color: #000000; }
```

嵌套带来了什么好处呢？它可以让你减少重复编写父选择器，可以让复杂的`CSS`布局因为嵌套的选择器而变得更简单。例如：

```c
#main {
  width: 97%;

  p, div {
    font-size: 2em;
    a { font-weight: bold; }
  }

  pre { font-size: 3em; }
}
```

将编译成：

```c
#main {
  width: 97%; }
  #main p, #main div {
    font-size: 2em; }
    #main p a, #main div a {
      font-weight: bold; }
  #main pre {
    font-size: 3em; }
```

### 父选择器引用：&

这个特别适合设置一些伪类，当你需要为选择器设置鼠标`hover`时的样式时，在这种情况下，你可以使用`&`插入到父选择器需要的地方了。例如：

```c
a {
  font-weight: bold;
  text-decoration: none;
  &:hover { text-decoration: underline; }
  body.firefox & { font-weight: normal; }
}
```
将编译成：

```c
a {
  font-weight: bold;
  text-decoration: none; }
  a:hover {
    text-decoration: underline; }
  body.firefox a {
    font-weight: normal; }
```
在`CSS`中所有出现`&`的地方会被父选择器所替换，这意味着，如果你有一个更深层次的嵌套，父选择器将被全面解决在`&`被替换之前，（好绕口呀），直接看demo吧：

```c
#main {
  color: black;
  a {
    font-weight: bold;
    &:hover { color: red; }
  }
}
```

将被编译成：

```c
#main {
  color: black; }
  #main a {
    font-weight: bold; }
    #main a:hover {
      color: red; }
```
可以看到编译后的代码`&`被替换为`#main a`。

`&`必须出现在复合选择器的开始，但是可以跟随一个将被添加到父选择器的后缀。例如：

```c
#main {
  color: black;
  &-sidebar { border: 1px solid; }
}
```
编译后的代码为：

```c
#main {
  color: black; }
  #main-sidebar {
    border: 1px solid; }
```

### 属性嵌套（Nested Properties）

`CSS`有一些属性它们有相同的“命名空间”，例如，`font-family`，`font-style`，`font-color`它们全部在字体的命名空间下。在`CSS`中，如果你想在同样的命名空间下设置一串属性，你必须每次打出来。`Sass`为此提供了一个快捷方式：只写一次命名空间，然后将子属性嵌套在其中。例如：

```c
.funky {
  font: {
    family: fantasy;
    size: 30em;
    weight: bold;
  }
}
```

将被编译成：

```c
.funky {
  font-family: fantasy;
  font-size: 30em;
  font-weight: bold; }
```
这个命名空间它自己也可以有一个值。例如：

```c
.funky {
  font: 2px/3px {
    family: fantasy;
    size: 30em;
    weight: bold;
  }
}
```
将被编译成：

```c
.funky {
  font: 2px/3px;
    font-family: fantasy;
    font-size: 30em;
    font-weight: bold; }
```

### 注释/* */和//

`Sass`支持`CSS`标准的多行注释`/**/`，同样支持单行注释`//`。在可能的情况下，多行注释被保存在`CSS`的输出中，而单行注释被删除。例如：

```c
/* This comment is
 * several lines long.
 * since it uses the CSS comment syntax,
 * it will appear in the CSS output. */
body { color: black; }

// These comments are only one line long each.
// They won't appear in the CSS output,
// since they use the single-line comment syntax.
a { color: green; }
```

将被编译成：

```c
/* This comment is
 * several lines long.
 * since it uses the CSS comment syntax,
 * it will appear in the CSS output. */
body {
  color: black; }

a {
  color: green; }
```

当注释的第一个字母是`!`时，不管是在压缩输出模式下，这个注释都将被插入。这给你生成的`CSS`添加版权声明将是非常有用的。

### 变量： $

最简单的来使用`SassScript`的方式是使用变量。变量以美元符号开始，并且是和`CSS`一样设置：

```c
$width: 5em;
```

然后你可以在属性中使用这个变量：

```c
#main {
  width: $width;
}
```

> 注：变量只在它定义在的嵌套选择器中有用，如果在任何嵌套选择器之外定义，它们可以在任何地方使用。

例如：

```c
#main {
  $width: 5em;

  width: $width;
}
#other {
  width: $width;
}
```
可以看到上面的代码在`Sass`中会跑出一个变量未定义的错误：

```c
Syntax error: Undefined variable: "$width".
        on line 7 of test.scss
```

### 数据类型（Data Types）

`SassScript`支持六种主要的数据类型：

 - 数字(例如：1.2, 13, 10px)
 - 使用引号或不使用引号的文本字符串(例如："foo", 'bar', baz)
 - 颜色(例如：blue, #04a3f9, rgba(255, 0, 0, 0.5))
 - 布尔类型(例如：true, false)
 - nulls(例如：null)
 - 用空格或逗号隔开的值列表(例如：1.5em 1em 0 2em, Helvetica, Arial, sans-serif)
 - 从一个值到另一个值的映射(例如：(key1: value1, key2: value2))

`SassScript`同样支持其他类型的`CSS`属性值，例如Unicode范围或`!important`声明。然而，它没有任何特殊处理这些类型。他们就像不带引号的字符串处理。

### 字符串（Strings）

`CSS`定义了两种类型的字符串：包含引用的，例如： "Lucida Grande" 和 'http://sass-lang.com'，不包含引用的，例如：`sans-serif`和`bold`。`SassScript`识别这两种类型的字符串，一般如果一种类型的字符串在`Sass`文档中使用，这样的字符串将在所得的CSS使用。

有一个例外，当使用`#{} interpolation`，带引号的字符串是无报价的（quoted strings are unquoted）。这使得它更容易使用，例如在`mixins`中的选择器名。例如：

```c
@mixin firefox-message($selector) {
  body.firefox #{$selector}:before {
    content: "Hi, Firefox users!";
  }
}

@include firefox-message(".header");
```

将被编译成：

```c
body.firefox .header:before {
  content: "Hi, Firefox users!"; }
```

### Lists (列表)

列表是`Sass`如何代表`CSS`声明的值，就像`margin: 10px 15px 0 0`或`font-face: Helvetica, Arial, sans-serif`。列表只是一系列的其他值，无论是被空格或逗号隔开。事实上，个体值也被算作列表，它们只是列出了一个值。
对于它们自己，列表不会做太多，但是对`SassScript list functions`非常有用。[nth function][2]可以在一个列表中获取一项，[join function][3]可以将多个列表加入到一起。[append function][4]可以添加项到列表中。[@each directive][5]同样可以为列表中的每一项添加样式。

除了包含简单的值，列表可以包含其他列表。例如：`1px 2px, 5px 6px`是一个包含两个项的列表，它分别包含了列表`1px 2px`和`5px 6px`。如果内部列表和外部列表具有相同的分隔符，你需要使用括号以清楚的表明内部列表的开始和结束。例如，`(1px 2px) (5px 6px)`同样是一个包含两个项的列表。和前面一个不同的是，第一个外部列表使用逗号分隔，而后面一个使用空格分隔。

当列表变成纯`CSS`时，`Sass`不添加任何括号，因为`CSS`不理解它们。这意味着`(1px 2px) (5px 6px)`和`1px 2px 5px 6px`在变成`CSS`时将会是一样的。但是，它们在`Sass`中是不同的，第一个是包含两个列表的列表，第二个则是包含四个值的列表。

列表可以在没有任何项目，这些列表被表示为`()`（这也是一个空映射）。它们不能直接输出到`CSS`，如果你尝试这样做：`font-family: ()`，`Sass`会引发一个错误。如果一个列表包含了空值或`null`值，就像`1px 2px () 3px`或`1px 2px null 3px`，空列表和`null`值将在变成`CSS`之前被删除。例如：

```c
#test {
  margin: 1px 2px () 3px;
}
```
将被编译成：

```c
#test {
  margin: 1px 2px 3px; }
```
逗号分隔的列表可以有一个尾随逗号。这是特别有用，因为它可以让你代表一个单元素列表。例如：`(1,)`是一个包含1的列表，` (1 2 3,)`是一个逗号分隔的列表包含了一个空格分隔的列表包含1, 2, 3。

### Maps(映射)

映射代表了键和值之间的一个关联，其中键是用来查找值的。他们可以很容易地收集到的值命名组和动态地访问这些组。他们没有直接并联在CSS中，虽然他们在语法上类似媒体查询表达式：

```c
$map: (key1: value1, key2: value2, key3: value3);
```

不同于列表，映射必须始终用括号括起来，必须始终用逗号分隔。无论是在映射的键和值可以是任何`SassScript`对象。一张映射只能有一个与给定键关联的值（尽管该值可以是一个列表）。一个给定的值可能与许多密钥相关联。

像列表一样，映射主要被`SassScript`的函数操纵。`map-get`函数在映射中寻找值，`map-merge`函数添加值到映射中。[@each directive][6]可以被用于为映射中的每一个`key/value`添加样式。且映射的顺序和它被创建的时候是一致的。

映射可以在任何能使用列表的地方被使用。当使用一个列表函数时，映射被视为一个列表对。例如：`(key1: value1, key2: value2) `将在列表函数中被视为`key1 value1, key2 value2`。列表不能被视为映射，不过，唯一的例外是空的列表。 `()`既是一个无键/值对，没有任何元素的列表和映射。

映射不能被转换为纯CSS。使用一个作为一个变量或参数为CSS函数的值会导致错误。

### Operations(操作符)

#### Number Operations(数字操作符)

`SassScript`支持对数字标准的算术运算（加+，减 - ，乘*，除/，和模％），如果它能，将在单位之间自动转换：

```c
p {
  width: 1in + 8pt;
}
```

将被编译成：

```c
p {
  width: 1.111in; }
```

##### Division and /(除法和/)

`CSS`允许`/`出现在属性值作为分隔数字的方式。由于SassScript是CSS属性语法的延伸，它必须支持此功能，同时还允许`/`用于除法。这意味着，在默认情况下，如果在SassScript中两个数字是由`/`分开，那么他们会和`CSS`中`/`的功能一样。

但是，有以下三种情况下的`/`将被解释为除法。这些涵盖了除法大多数的使用情况。它们分别是：

 - 如果该值，或它的任何部分，被存储在一个变量或是函数的返回。
 - 如果该值用括号括起来。
 - 如果该值是作为另一个算术表达式的一部分。

例如：

```c
p {
  font: 10px/8px;             // Plain CSS, no division
  $width: 1000px;
  width: $width/2;            // Uses a variable, does division
  width: round(1.5)/2;        // Uses a function, does division
  height: (500px/2);          // Uses parentheses, does division
  margin-left: 5px + 8px/2px; // Uses +, does division
}
```
将被编译成：

```c
p {
  font: 10px/8px;
  width: 500px;
  width: 1;
  height: 250px;
  margin-left: 9px; }
```

如果你想使用变量和纯`CSS`的`/`，你可以使用`#{}`插入它们，例如：

```c
p {
  $font-size: 12px;
  $line-height: 30px;
  font: #{$font-size}/#{$line-height};
}
```
将被编译为：

```c
p {
  font: 12px/30px; }
```

#### Color Operations(颜色操作符)

对于颜色值支持所有算术运算，它们是分段工作的，它们分别对红、绿和蓝进行操作。例如：

```c
p {
  color: #010203 + #040506;
}
```
计算 `01 + 04 = 05`, `02 + 05 = 07`, 和`03 + 06 = 09`, 将编译成：

```c
p {
  color: #050709; }
```

在达到相同的效果上，通常使用颜色函数将比颜色算法更加有用。

算数元算同样可以在数字和颜色之间工作，同样是分段工作。例如：

```c
p {
  color: #010203 * 2;
}
```

计算`01 * 2 = 02`, `02 * 2 = 04`和`03 * 2 = 06`，将编译成：

```c
p {
  color: #020406; }
```

> 注：颜色带有alpha通道（那些用RGBA或HSLA功能创建的）都必须有相同的alpha值，以便于颜色算数对它们运算。算数不会影响alpha的值。例如：

```c
p {
  color: rgba(255, 0, 0, 0.75) + rgba(0, 255, 0, 0.75);
}
```

将被编译成：

```c
p {
  color: rgba(255, 255, 0, 0.75); }
```
颜色的Alpha通道可以使用[opacify][7]和[transparentize][8]功能进行调整。例如：

```c
$translucent-red: rgba(255, 0, 0, 0.5);
p {
  color: opacify($translucent-red, 0.3);
  background-color: transparentize($translucent-red, 0.25);
}
```

将编译成：

```c
p {
  color: rgba(255, 0, 0, 0.8);
  background-color: rgba(255, 0, 0, 0.25); }
```

IE滤镜需要所有的颜色包含alpha层，并且和`#AABBCCDD`一样严格的格式。你可以轻松的使用[ie_hex_str][9]函数。例如：

```c
$translucent-red: rgba(255, 0, 0, 0.5);
$green: #00ff00;
div {
  filter: progid:DXImageTransform.Microsoft.gradient(enabled='false', startColorstr='#{ie-hex-str($green)}', endColorstr='#{ie-hex-str($translucent-red)}');
}
```

将被编译成：

```c
div {
  filter: progid:DXImageTransform.Microsoft.gradient(enabled='false', startColorstr='#FF00FF00', endColorstr='#80FF0000'); }
```

### String Operations(字符串操作符)

`+`运算可以用来连接字符串：

```c
p {
  cursor: e + -resize;
}
```

将编译成：

```c
p {
  cursor: e-resize; }
```
请注意，如果带引号的字符串添加到一个不带引号的字符串（也就是引号的字符串是向+的左边），结果是带引号的字符串。例如：

```c
p:before {
  content: "Foo " + Bar;
  font-family: sans- + "serif";
}
```
编译成：

```c
p:before {
  content: "Foo Bar";
  font-family: sans-serif; }
```

在一个文本字符串，`#{}`风格插值可以用来在字符串中放置动态值：

```c
p:before {
  content: "I ate #{5 + 10} pies!";
}
```
编译成：

```c
p:before {
  content: "I ate 15 pies!"; }
```

`null`值被视为空字符串被插入到字符串中：

```c
$value: null;
p:before {
  content: "I ate #{$value} pies!";
}
```

编译成：

```c
p:before {
  content: "I ate  pies!"; }
```

### Boolean Operations(布尔运算符)

`SassScript`支持与，或和非的布尔运算符。

### List Operations(列表运算符)

列表不支持任何特别的运算符。作为替代，它们利用列表函数来操纵。

### Parentheses(括号)

括号可以用来影响操作顺序：

```c
p {
  width: 1em + (2em * 3);
}
```

编译成：

```c
p {
  width: 7em; }
```

### Functions(函数)

`SassScript`定义了使用普通`CS`S函数的语法调用了一些有用的功能：

```c
p {
  color: hsl(0, 100%, 50%);
}
```

编译成：

```c
p {
  color: #ff0000; }
```

### Keyword Arguments(关键字参数)

`Sass`函数也可以使用明确的关键字参数调用。上面的例子中，也可以写为：

```c
p {
  color: hsl($hue: 0, $saturation: 100%, $lightness: 50%);
}
```

虽然是不太简洁，它可以使样式表更容易阅读。它也允许函数呈现更加灵活的接口，提供了很多参数，而不会变得更难调用。

命名参数可以以任何顺序传递，并且默认值的参数可以省略。由于命名参数是变量名，下划线和破折号可以互换使用。

### Interpolation(插值)

你也可以使用`SassScript`变量在选择器中和属性名使用`#{}`插值语法：

```c
$name: foo;
$attr: border;
p.#{$name} {
  #{$attr}-color: blue;
}
```

编译成：

```c
p.foo {
  border-color: blue; }
```

同样可以使用`#{}`使用在属性值上。在大多数情况下，这不会比使用一个变量更好，但是似乎用`#{}`意味着任何运算符都将被视为纯`CSS`。例如：

```c
p {
  $font-size: 12px;
  $line-height: 30px;
  font: #{$font-size}/#{$line-height};
}
```

编译成：

```c
p {
  font: 12px/30px; }
```

### Variable Defaults: !default(变量默认值)

使用`!default`的好处是：当你给一个变量赋值时，它会使用赋值后的值，但是如果没有赋值时，就会使用一个默认值。例如：

```c
$content: "First content";
$content: "Second content?" !default;
$new_content: "First time reference" !default;

#main {
  content: $content;
  new-content: $new_content;
}
```

编译成：

```c
#main {
  content: "First content";
  new-content: "First time reference"; }
```
具有空值的变量都视为未指定：

```c
$content: null;
$content: "Non-null content" !default;

#main {
  content: $content;
}
```
编译成：

```c
#main {
  content: "Non-null content"; }
```

## @-Rules and Directives(@规则和指令)

`Sass`支持所有的`CSS3`@-规则，以及额外被`Sass`称为指令的。

### @import

`Sass`扩展了`CSS`的`@import`规则，允许导入`Scss`和`Sass`文件，所有导入的`Scss`和`Sass`文件将被合并成一个单独的`CSS`文件。另外，在导入文件中定义的任何变量或`mixins`可以在主文件中使用。

`@import`需要一个导入的文件名。默认情况下，它看起来对`Sass`文件直接导入，但也有极少数的情况下才会编译成一个CSS`@import`规则：

 - 如果文件扩展名为`.css`
 - 如果文件名以`http://`开始
 - 如果文件名是一个`url()`
 - 如果这个`@import`含有任何`media queries`

如果上面所有的都不匹配且文件扩展名为`.scss`或`.sass`时，这时会导入命名的`Scss`或`Sass`文件。如果没有扩展名，`Sass`会试图寻找以这个名字命名的`.scss`或`.sass`文件，然后导入。

例如：

```c
@import "foo.scss";
```

或

```c
@import "foo";
```

上面的都会导入文件`foo.scss`，然而：

```c
@import "foo.css";
@import "foo" screen;
@import "http://foo.com/bar";
@import url(foo);
```

被编译成：

```c
@import "foo.css";
@import "foo" screen;
@import "http://foo.com/bar";
@import url(foo);
```
同样可以通过`@import`引入多个文件，例如：

```c
@import "rounded-corners", "text-shadow";
```

这将会引入`rounded-corners`和`text-shadow`文件。

导入可能包含`#{}`插值，但是有一定的限制。通过变量动态导入一个`Sass`文件是不可能的，插值仅仅用于`CSS`导入。因此，它仅仅适用于`url()`导入。例如：

```c
$family: unquote("Droid+Sans");
@import url("http://fonts.googleapis.com/css?family=#{$family}");
```

编译成：

```c
@import url("http://fonts.googleapis.com/css?family=Droid+Sans");
```

### Partials(局部模板)

如果你有一个`Scss`或`Sass`文件，你想导入它但是不希望它编译成`CSS`文件，你可以添加一个下划线在文件名的开始。这会告诉`Sass`不要将它编译成一个标准的`CSS`文件。你可以导入这些文件，且不需要使用下划线。

例如，你可能有一个`_colors.scss`的文件，然后没有`_colors.css`文件被创建，你可以这样做：

```c
@import "colors";
```

### Nested @import(嵌套的@import)

虽然大部分时间在文档的顶层使用`@import`是最有用的，也有可能在`CSS`规则和`@media`规则包含它们。就像一个基础层级（base-level）的`@import`，这包含了`@import`文件导入的内容。然而，导入的规则会被嵌套在相同的地方作为一个原型的`@import`。

例如，如果`example.scss`文件为：

```c
.example {
  color: red;
}
```

然后：

```c
#main {
  @import "example";
}
```

将被编译成：

```c
#main .example {
  color: red;
}
```

### @media

在`Sass`中的`@media`指令和在纯`CSS`中是一样的，有一个额外的功能：它们可以嵌套在`CSS`规则中。如果一个`@media`指令出现在一个`CSS`规则中，它会冒泡到样式表的顶层，把所有的选择器放在这个规则内。这可以很容易地添加`media-specific`样式，而无需重复选择或打破样式表的流动。例如：

```c
.sidebar {
  width: 300px;
  @media screen and (orientation: landscape) {
    width: 500px;
  }
}
```

编译成：

```c
.sidebar {
  width: 300px; }
  @media screen and (orientation: landscape) {
    .sidebar {
      width: 500px; } }
```

`@media queries`同样可以嵌套在另一个`@media queries`中。这些`queries`会使用`and`运算符来结合。例如：

```c
@media screen {
  .sidebar {
    @media (orientation: landscape) {
      width: 500px;
    }
  }
}
```
将编译成：

```c
@media screen and (orientation: landscape) {
  .sidebar {
    width: 500px; } }
```

最后，`@media queries`可以包含`SassScript`表达式（包含变量、函数和操作符）。例如：

```c
$media: screen;
$feature: -webkit-min-device-pixel-ratio;
$value: 1.5;

@media #{$media} and ($feature: $value) {
  .sidebar {
    width: 500px;
  }
}
```

编译成：

```c
@media screen and (-webkit-min-device-pixel-ratio: 1.5) {
  .sidebar {
    width: 500px; } }
```

### @extend

当设计一个页面时，有一个经常发生的情况是，一个`class`应该含有另一个`class`的所有样式时，且有自己特定的样式时。处理这种情况最常见的方法时在`HTML`同时使用更一般的`class`和更具体的`class`。例如：假设我们要设计一个正常的错误和一个严重的错误。我们可以像这样写我们的标记：

```c
<div class="error seriousError">
  Oh no! You've been hacked!
</div>
```

样式会使这样：

```c
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.seriousError {
  border-width: 3px;
}
```

不幸的是，这意味着我们必须记住使用总是同时`.error`和`.seriousError`。这是一个维护的负担，并导致棘手的bug，并在标记中带来非语义的风格。

`@extend`避免了这种问题，它告诉`Sass`一个选择器应该继承另一个选择器的样式。例如：

```c
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
```
编译成：

```c
.error, .seriousError {
  border: 1px #f00;
  background-color: #fdd;
}

.seriousError {
  border-width: 3px;
}
```

这意味着所有`.error`定义的样式都将应用到`.seriousError`上，除了为`.seriousError`指定的样式。实际上，每一个带有`.seriousError`的元素同样有类`.error`。

#### 它是如何工作的呢

`@extend`通过插入扩展的选择器（例如，`.seriousError`）到任何被扩展选择器（例如：`.error`）出现的地方。就像上面的例子：

```c
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.error.intrusion {
  background-image: url("/image/hacked.png");
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
```

被编译成：

```c
.error, .seriousError {
  border: 1px #f00;
  background-color: #fdd; }

.error.intrusion, .seriousError.intrusion {
  background-image: url("/image/hacked.png"); }

.seriousError {
  border-width: 3px; }
```

当合并选择器时，`@extend`相当聪明，会避免不必要的重复。

#### 扩展复杂的选择器

`class`选择器不是唯一可以被扩展的。涉及一个单一元素，可以包含任何选择器，例如：`a:hover`, 或 `a.user[href^="http://"]`。例如：

```c
.hoverlink {
  @extend a:hover;
}
```
就像`class`，这意味着所有为`a:hover`定义的所有样式都将被应用到`.hoverlink`上，例如：

```c
.hoverlink {
  @extend a:hover;
}
a:hover {
  text-decoration: underline;
}
```

编译成：

```c
a:hover, .hoverlink {
  text-decoration: underline; }
```

就像上面的` .error.intrusion`，任何使用在`a:hover`上的规则都将为`.hoverlink`工作，即使它有其他的选择器。例如：

```c
.hoverlink {
  @extend a:hover;
}
.comment a.user:hover {
  font-weight: bold;
}
```

编译成：

```c
.comment a.user:hover, .comment .user.hoverlink {
  font-weight: bold; }
```

#### 多重继承

一个单一选择器可以扩展超过一个的选择器。这意味着你可以继承所有被扩展选择器的样式。例如：

```c
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.attention {
  font-size: 3em;
  background-color: #ff0;
}
.seriousError {
  @extend .error;
  @extend .attention;
  border-width: 3px;
}
```

将被编译成：

```c
.error, .seriousError {
  border: 1px #f00;
  background-color: #fdd; }

.attention, .seriousError {
  font-size: 3em;
  background-color: #ff0; }

.seriousError {
  border-width: 3px; }
```

实际上，任何有`.seriousError`的元素都将有`.error`和`.attention`类。因此，在定义的样式中，后面定义的样式有更高的优先级。可以看到`.seriousError`拥有背景色`#ff0`，而不是`#fdd`。

多重继承同样可以用逗号分隔的写法，例如：`@extend .error, .attention`和`@extend .error; @extend.attention.`是一样的。

#### 链式继承（Chaining Extends）

一个选择器可以继承另外一个选择器，然后另外一个选择器又可以继承第三个选择器。例如：

```c
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
.criticalError {
  @extend .seriousError;
  position: fixed;
  top: 10%;
  bottom: 10%;
  left: 10%;
  right: 10%;
}
```
现在，所有的`.seriousError`同样有类`.error`，所有的`.criticalError`同样有类`.seriousError`和`.error`。将编译成：

```c
.error, .seriousError, .criticalError {
  border: 1px #f00;
  background-color: #fdd; }

.seriousError, .criticalError {
  border-width: 3px; }

.criticalError {
  position: fixed;
  top: 10%;
  bottom: 10%;
  left: 10%;
  right: 10%; }
```

#### 选择器序列(Selector Sequences)

选择器序列，例如：`.foo .bar` 或 `.foo + .bar`，目前还不能进行扩展。只能嵌套选择器本身使用`@extend`。例如：

```c
#fake-links .link {
  @extend a;
}

a {
  color: blue;
  &:hover {
    text-decoration: underline;
  }
}
```

编译成：

```c
a, #fake-links .link {
  color: blue; }
  a:hover, #fake-links .link:hover {
    text-decoration: underline; }
```

##### 合并选择器序列

有时候一个选择器序列出现在扩展的另一个选择器出现在另一个序列中。在这种情况，这两个序列需要被合并。例如：

```c
#admin .tabbar a {
  font-weight: bold;
}
#demo .overview .fakelink {
  @extend a;
}
```

这将生成所有匹配序列的可能的选择器，这可能导致样式表文件过大。上面这个简单的例子，比如，会使用十个选择器。相反，`Sass`产生只可能是有用的选择器。

上面的代码将编译成：

```c
#admin .tabbar a,
#admin .tabbar #demo .overview .fakelink,
#demo .overview #admin .tabbar .fakelink {
  font-weight: bold; }
```

如果两个选择器序列共享一些选择器，这样会将它们合并，只有不同的部分才会被更新。例如：

```c
#admin .tabbar a {
  font-weight: bold;
}
#admin .overview .fakelink {
  @extend a;
}
```
编译成

```c
#admin .tabbar a,
#admin .tabbar .overview .fakelink,
#admin .overview .tabbar .fakelink {
  font-weight: bold; }
```

#### @extend-只有选择器

有时候，你会为一个`class`写样式，你只想使用它来被`@extend`，而且永远不会直接在你的`HTML`中使用。写`Sass`的时候尤其如此，你会提供样式给用户去`@extend`，如果它们需要或者忽略当他们不需要。

如果你对于这个使用标准的`class`，当生成样式表时，你最终创造了很多额外的`CSS`样式，并且冒着与其他类碰撞的风险。这就是为什么`Sass`支持占位符选择器了。

占位符选择器看起来很像`class`和`id`选择器，只是`#`和`.`被`%`所替换了。它可以使用在任何`class`或`id`能使用的地方，对于它们自己，它们阻止规则及被渲染成`CSS`。例如：

```c
// This ruleset won't be rendered on its own.
#context a%extreme {
  color: blue;
  font-weight: bold;
  font-size: 2em;
}
```

然而，占位符选择器可以被扩展，就像`classes`和`ids`。继承的选择器会被生成，但是占位符选择器不会。例如：

```c
.notice {
  @extend %extreme;
}
```

被编译成：

```c
#context a.notice {
  color: blue;
  font-weight: bold;
  font-size: 2em; }
```

#### !optional标记

通常，当你扩展一个选择器，如果是一个错误，因为`@extend`不工作了。例如，当你写`a.important {@extend .notice}`，这是一个错误，因为没有选择器包含`.notice`。

有时候，你想允许一个`@extend`不去产生任何新的选择器。为了做到这些，只要将`!optional`标记添加到选择器后面。例如：

```c
a.important {
  @extend .notice !optional;
}
```

#### 指令中的@extend

当在指令（例如：@media）中使用`@extend`时会有一些限制。`Sass is unable to make CSS rules outside of the @media block apply to selectors inside it without creating a huge amount of stylesheet bloat by copying styles all over the place.`（这句实在是翻译有点。。）。这意味着当你在`@media`中使用`@extend`时，你可能只能扩展扩展相同指令块内的选择器。例如：

下面的代码将工作的很好，因为`@extend`扩展`@media`块内的选择器

```c
@media print {
  .error {
    border: 1px #f00;
    background-color: #fdd;
  }
  .seriousError {
    @extend .error;
    border-width: 3px;
  }
}
```

而下面这个会产生错误：

```c
.error {
  border: 1px #f00;
  background-color: #fdd;
}

@media print {
  .seriousError {
    // INVALID EXTEND: .error is used outside of the "@media print" directive
    @extend .error;
    border-width: 3px;
  }
}
```

### @at-root

`@at-root`使一个或多个规则在文档的根发射（emit），而不是被嵌套在其父选择器的下方。它可以被用于一个单一的内联选择器：

```c
.parent {
  @at-root .child { ... }
}
```

或者有一个块包含多个选择器：

```c
.parent {
  @at-root {
    .child1 { ... }
    .child2 { ... }
  }
}
```

这些分别产生为：

```c
.child { ... }

.child1 { ... }
.child2 { ... }
```

####  @at-root (without: ...) 和 @at-root (with: ...) 

默认情况下，`@at-root`只是排除选择器。然而，也是可能使用`@at-root`移动到嵌套指令的外部，例如：`@media`。例如：

```c
@media print {
  .page {
    width: 8in;
    @at-root (without: media) {
      color: red;
    }
  }
}
```

产生：

```c
@media print {
  .page {
    width: 8in;
  }
}
.page {
  color: red;
}
```
你可以使用`@at-root (without: ...)`去移动到任何指令的外部。你同样可以使用空格分开的多个指令：`@at-root (without: media supports)`去移动到`@media`和`@supports`的外部。

有两个特殊的值你可以传入`@at-root`，`rules`代表标准的`CSS`规则，`@at-root (without: rule)`是和`@at-root`没有查询是一样的。` @at-root (without: all)`意味着应该移动到所有指令的外部。

### @debug

`@debug`指令打印出`SassScript`表达式的值到标准错误输出流。这是用于调试具有复杂`SassScript`回事`Sass`文件很有用。例如：

```c
@debug 10em + 12em;
```

输出：

```c
Line 1 DEBUG: 22em
```

### @warn

`@warn`指令打印出`SassScript`表达式的值到标准错误输出流。这对于那些需要提醒弃用的用户或轻微混入用法错误中恢复的库非常有用。`@warn`和`@debug`之间有两个主要区别：

 1. 你可以关闭警告使用`--quiet`命令行参数或者`:quiet`的`Sass`参数
 2. 样式表跟踪将被打印出来的消息，以便被警告，用户可以看到自己的样式引起了警告。

使用实例：

```c
@mixin adjust-location($x, $y) {
  @if unitless($x) {
    @warn "Assuming #{$x} to be in pixels";
    $x: 1px * $x;
  }
  @if unitless($y) {
    @warn "Assuming #{$y} to be in pixels";
    $y: 1px * $y;
  }
  position: relative; left: $x; top: $y;
}
```

## Control Directives & Expressions(控制指令和表达式)

为了在某些指定条件下包含样式或者包含样式几次，`SassScript`支持基础的控制指令和表达式。

> 注：控制指令是一种先进的功能，在日常的样式中是罕见的。它们的存在主要是为了在`mixins`，特别是那些像`compass`库的一部分，使用等需要大量的灵活性。

### if()

就像其他编程语言一样，去判断括号内的表达式是否为true，如果为true，则执行相应的指令。

### @if

`@if`需要一个SassScript表达式，如果该表达式返回任何`false`或`null`以外的值时，将使用嵌套在它下面的样式：

```c
p {
  @if 1 + 1 == 2 { border: 1px solid;  }
  @if 5 < 3      { border: 2px dotted; }
  @if null       { border: 3px double; }
}
```

将编译成：

```c
p {
  border: 1px solid; }
```

`@if`声明还可以跟随多个`@else if`声明和一个`@else`声明。如果`@if`声明失败，则判断`@else if`，否则执行`@else`。例如：

```c
$type: monster;
p {
  @if $type == ocean {
    color: blue;
  } @else if $type == matador {
    color: red;
  } @else if $type == monster {
    color: green;
  } @else {
    color: black;
  }
}
```
编译成：

```c
p {
  color: green; }
```

### @for

`@for`指令重复输出一组样式。对于每次重复，计数变量被用来调整输出。该指令有两种形式：`@for $var from <start> through <end>`和`@for $var from <start> to <end>`。注意关键字`through`和`to`之间的不同，`$var`可以为任何变量名，就像：`$i`，`<start>`和`<end>`在`SassScript`应该返回整数表达式。当`<start>`大于`<end>`计数器将递减增量。

`@for`声明设置`$var`在指定范围内的连续数，并且每次输出嵌套样式时使用`$var`的值。对于`from ... through`形式，范围包括了`<start>`和`<end>`，但是`from ... to`形式不包含`<end>`的值，这点需要特别小心和注意。使用`through`的实例：

```c
@for $i from 1 through 3 {
  .item-#{$i} { width: 2em * $i; }
}
```

将编译成：

```c
.item-1 {
  width: 2em; }
.item-2 {
  width: 4em; }
.item-3 {
  width: 6em; }
```

### @each

`@each`指令使用这种形式：`@each $var in <list or map>`，`$var`可以为任何变量名，就像`$length`等，`<list or map>`是一个`SassScript`表达式返回一个列表或映射。

`@each`规则设置`$var`为列表或映射中的每一项，然后输出包含`$var`的值的样式表。例如：

```c
@each $animal in puma, sea-slug, egret, salamander {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
  }
}
```

编译成:

```c
.puma-icon {
  background-image: url('/images/puma.png'); }
.sea-slug-icon {
  background-image: url('/images/sea-slug.png'); }
.egret-icon {
  background-image: url('/images/egret.png'); }
.salamander-icon {
  background-image: url('/images/salamander.png'); }
```

#### 多个赋值

`@each`指令也能使用多个变量，就像这样`@each $var1, $var2, ... in <list>`，如果`<list>`是一个包含多个列表的列表，子列表中的每个元素被分配给相应的变量。例如：

```c
@each $animal, $color, $cursor in (puma, black, default),
                                  (sea-slug, blue, pointer),
                                  (egret, white, move) {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
    border: 2px solid $color;
    cursor: $cursor;
  }
}
```
将编译成：

```c
.puma-icon {
  background-image: url('/images/puma.png');
  border: 2px solid black;
  cursor: default; }
.sea-slug-icon {
  background-image: url('/images/sea-slug.png');
  border: 2px solid blue;
  cursor: pointer; }
.egret-icon {
  background-image: url('/images/egret.png');
  border: 2px solid white;
  cursor: move; }
```

由于映射被视为列表对，所以多个赋值对它们同样有用。例如：

```c
@each $header, $size in (h1: 2em, h2: 1.5em, h3: 1.2em) {
  #{$header} {
    font-size: $size;
  }
}
```

编译成：

```c
h1 {
  font-size: 2em; }
h2 {
  font-size: 1.5em; }
h3 {
  font-size: 1.2em; }
```

### @while

`@while`指令需要一个`SassScript`表达式和重复输出的嵌套样式，直到语句的计算结果为`false`。例如：

```c
$i: 6;
@while $i > 0 {
  .item-#{$i} { width: 2em * $i; }
  $i: $i - 2;
}
```

编译成：

```c
.item-6 {
  width: 12em; }

.item-4 {
  width: 8em; }

.item-2 {
  width: 4em; }
```

## Mixin指令

`Mixins`允许你定义可以重用(re-used)与整个样式表的样式，而无需去求助于非语义的类，例如：.float-left。`Mixins`也可以包含完整的`CSS`规则和任何其他在`Sass`文档别处允许的。它们甚至可以带参数，从而利用很少的`Mixins`生成更多款式的样式。

### Defining a Mixin(定义一个混入): @mixin

`Mixins`通过`@mixin`指令来定义的。它跟随`mixin`的名字和可选的参数，和含有`mixin`内容的块。例如，`large-text`混入像下面这样定义：

```c
@mixin large-text {
  font: {
    family: Arial;
    size: 20px;
    weight: bold;
  }
  color: #ff0000;
}
```

`Mixins`也有可能包含选择器，可能与属性混合。选择器甚至可以包含父选择器引用。例如：

```c
@mixin clearfix {
  display: inline-block;
  &:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
  * html & { height: 1px }
}
```

### 包含一个Mixin：@include

`Mixins`通过`@include`指令在文档中被包含。这需要一个`mixin`的名字和可选的参数被传入，并且包含在`mixin`中定义的样式到当前规则。例如：

```c
.page-title {
  @include large-text;
  padding: 4px;
  margin-top: 10px;
}
```

编译成：

```c
.page-title {
  font-family: Arial;
  font-size: 20px;
  font-weight: bold;
  color: #ff0000;
  padding: 4px;
  margin-top: 10px; }
```
`Mixins`同样可以包含在任何规则的外面（即在文档的根部），只要它们不直接定义任何属性或使用任何父引用。例如：

```c
@mixin silly-links {
  a {
    color: blue;
    background-color: red;
  }
}

@include silly-links;
```

将被编译成：

```c
a {
  color: blue;
  background-color: red; }
```

`Mixin`定义同样可以包含其他的`mixins`。例如：

```c
@mixin compound {
  @include highlighted-background;
  @include header-text;
}

@mixin highlighted-background { background-color: #fc0; }
@mixin header-text { font-size: 20px; }
```

### 参数

`Mixins`可以带`SassScript`值作为参数，它给出了当`mixin`被包括在内，使变量在`mixin`成为可能。

当定义一个`mixin`时，参数都写为以逗号分隔的变量名，所有参数都在`mixin`名字后的括号内。然后当包含一个`mixin`时，值可以通过同样的方式被传入。例如：

```c
@mixin sexy-border($color, $width) {
  border: {
    color: $color;
    width: $width;
    style: dashed;
  }
}

p { @include sexy-border(blue, 1in); }
```

编译成：

```c
p {
  border-color: blue;
  border-width: 1in;
  border-style: dashed; }
```

`Mixins`同样可以为参数定义默认值，使用正常的可变设置的语法。然后当`mixin`被包含的时候，如果那个参数没有被传入，则使用默认值，如果传入则使用新值。例如：

```c
@mixin sexy-border($color, $width: 1in) {
  border: {
    color: $color;
    width: $width;
    style: dashed;
  }
}
p { @include sexy-border(blue); }
h1 { @include sexy-border(blue, 2in); }
```

编译成：

```c
p {
  border-color: blue;
  border-width: 1in;
  border-style: dashed; }

h1 {
  border-color: blue;
  border-width: 2in;
  border-style: dashed; }
```

### Keyword Arguments(关键字参数)

`Mixins`在被包含时同样可以使用关键字参数。举例来说，我们上面的例子可以写成：

```c
p { @include sexy-border($color: blue); }
h1 { @include sexy-border($color: blue, $width: 2in); }
```

虽然这是不太简洁，它可以使样式表更容易阅读。它也允许函数呈现更加灵活的接口，提供了很多参数，而不会变得更难以调用。

命名的参数可以以任意顺序被传入，并且具有默认值的参数可以省略。由于命名参数是变量名，下划线和破折号可以互换使用。

### Variable Arguments(可变参数)

有时候对于一个`mixin`或`function`接受未知数目的参数是有意义的。例如，一个创建盒阴影的`mixin`任何数量的阴影参数。对于这些情况，`Sass`支持“可变参数”，这是在争论在一个`mixin`或函数声明的末尾接受一切剩余的参数且将它们打包成一个列表。这些参数看起来像被标准参数，但是跟随着`...`，例如：

```c
@mixin box-shadow($shadows...) {
  -moz-box-shadow: $shadows;
  -webkit-box-shadow: $shadows;
  box-shadow: $shadows;
}

.shadows {
  @include box-shadow(0px 4px 5px #666, 2px 6px 10px #999);
}
```

编译成：

```c
.shadows {
  -moz-box-shadow: 0px 4px 5px #666, 2px 6px 10px #999;
  -webkit-box-shadow: 0px 4px 5px #666, 2px 6px 10px #999;
  box-shadow: 0px 4px 5px #666, 2px 6px 10px #999;
}
```

可变参数同样包含任何被传入到`mixin`或`function`的关键字参数。它们可以通过[keyword($args) 函数][10]访问到，它返回一个从字符串到值的映射。

可变参数同样可以被用于一个`mixin`调用时。使用相同的语法，您还可以扩大值的列表，以便每个值传递作为一个单独的参数，或扩大值的映射，这样每一对被视为一个关键字参数。例如：

```c
@mixin colors($text, $background, $border) {
  color: $text;
  background-color: $background;
  border-color: $border;
}

$values: #ff0000, #00ff00, #0000ff;
.primary {
  @include colors($values...);
}

$value-map: (text: #00ff00, background: #0000ff, border: #ff0000);
.secondary {
  @include colors($value-map...);
}
```

将被编译成：

```c
.primary {
  color: #ff0000;
  background-color: #00ff00;
  border-color: #0000ff;
}

.secondary {
  color: #0000ff;
  background-color: #ff0000;
  border-color: #00ff00;
}
```

### Passing Content Blocks to a Mixin（传入内容到Mixin）

为了当`Mixin`被包含时在里面放置一些样式，有可能传入一块样式到`Mixin`。这些样式可能出现在任何在`Mixin`里面的`@content`指令。这使得能够定义关于选择器和指令结构的抽象。

例如：

```c
@mixin apply-to-ie6-only {
  * html {
    @content;
  }
}
@include apply-to-ie6-only {
  #logo {
    background-image: url(/logo.gif);
  }
}
```

生成：

```c
* html #logo {
  background-image: url(/logo.gif); }
```

同样的`mixins`也可以在以`.sass`为扩展名的缩进语法中使用：

```c
=apply-to-ie6-only
  * html
    @content

+apply-to-ie6-only
  #logo
    background-image: url(/logo.gif)
```

### Variable Scope and Content Blocks(可变作用域和内容块)

传递个`mixin`的块内容被评估为在这个块定义的作用域内，而不是在`mixin`的作用域内。这意味着在`mixin`内的局部变量不能用于被传入到`mixin`的样式块中，变量会解析成全局变量。

例如：

```c
$color: white;
@mixin colors($color: blue) {
  background-color: $color;
  @content;
  border-color: $color;
}
.colors {
  @include colors { color: $color; }
}
```

编译成：

```c
.colors {
  background-color: blue;
  color: white;
  border-color: blue;
}
```

此外，这使得它明确指出：用于被传递块里面的变量和`mixins`与围绕块定义的其他样式有关。例如：

```c
#sidebar {
  $sidebar-width: 300px;
  width: $sidebar-width;
  @include smartphone {
    width: $sidebar-width / 3;
  }
}
```

## Function Directives(函数指令)

在`Sass`中你可以定义自己的函数，以及在任何值或脚本上下文中使用它们。例如：

```c
$grid-width: 40px;
$gutter-width: 10px;

@function grid-width($n) {
  @return $n * $grid-width + ($n - 1) * $gutter-width;
}

#sidebar { width: grid-width(5); }
```

生成：

```c
#sidebar {
  width: 240px; }
```

正如你所看到看到函数可以获取到任何全局定义的变量，就像`mixin`中接受参数一样。一个函数可以包含多个语句，但是你必须使用`@return`设置函数的返回值。

正如`mixins`一样，你可以调用`Sass`定义的函数使用关键字参数。在上面的例子中，我们可以这样调用函数：

```c
#sidebar { width: grid-width($n: 5); }
```

建议为您的函数添加前缀以避免命名冲突，以让你的样式被读者查看时知道他们不是`Sass`或`CSS`的一部分。例如，比如你为`ACME`工作，你可以这样定义你的函数`-acme-grid-width`。

`Sass`中定义的函数同样支持可变参数，就像`mixin`中一样。


 
 


  [1]: http://sass-lang.com/documentation/file.INDENTED_SYNTAX.html
  [2]: http://devdocs.io/sass/sass/script/functions#nth-instance_method
  [3]: http://devdocs.io/sass/sass/script/functions#join-instance_method
  [4]: http://devdocs.io/sass/sass/script/functions#append-instance_method
  [5]: http://devdocs.io/sass/#each-directive
  [6]: http://devdocs.io/sass/#each-directive
  [7]: http://devdocs.io/sass/sass/script/functions#opacify-instance_method
  [8]: http://devdocs.io/sass/sass/script/functions#transparentize-instance_method
  [9]: http://devdocs.io/sass/sass/script/functions#ie_hex_str-instance_method
  [10]: http://devdocs.io/sass/sass/script/functions#keywords-instance_method