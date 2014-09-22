@font-face
========

`@font-face`规则允许到字体的链接，该字体在需要的时候会自动激活。这允许编码人员选择更接近该页面设计目标的字体，而不必在选择字体的时候被全平台可用字体集所限制。一个字体描述符集定义了一个字体资源的位置（既可以是本地位置也可以是远程位置）以及个体外观的样式特征。多个`@font-face`规则可以用于产生拥有不同外观的字体家族。使用CSS字体匹配规则，用户代理可以有选择的仅仅下载这些外观中指定的部分文本。

语法：

```c
@font-face {
	字体描述
}
```

每个`@font-face`规则指定为所有字体描述符指定一个值，这可以是隐含的也可以是明确的。对于那些规则中没有给出明确值的情况，将使用本规范中为每个描述符列出的初始值。这些描述符仅在定义它们的`@font-face`的上下文中适用，不会被应用于文档语言元素。没有关于描述符适用于的元素或子元素是否会继承这些值的概念。如果一个描述符在给定的`@font-face`规则中出现了多次，则指使用最后指定的值，忽略所有该描述符之前的值。

实例：

```c
@font-face {
  font-family: Gentium;
  src: url(http://example.com/fonts/Gentium.ttf);
}

p { font-family: Gentium, serif; }
```

用户代理将下载Gentium，并在渲染段落元素中的文本时使用。如果由于某些原因服务器上的字体不可用，则使用默认的serif字体。

## font-family描述符

此描述符定义了将用于所有CSS字体家族名称匹配的字体架子名称，其重新定义了隐含字体数据中包含的字体家族名称。如果该字体家族名称与用户环境中可用的字体家族相同，则其有效的在使用该样式表的文档中隐藏了这个底层的字体。这允许web编码任意自由的选择字体家族的名称，而不必担心其会与给定的用户环境中现场的字体家族名称冲突。加载字体的错误不会影响字体名称的匹配行为。如果一个用户代理将平台字体别名规则应用到由`@font-face`规则所定义的字体家族名称上，则这个用户代理是不符合规范的。

## src描述符

与CSS中的其他URI相似，此URI可以是局部的，在这种情况下其相对于包含该`@font-face`规则的样式表的位置。对于SVG字体，该URL指向一个包含SVG字体定义的文档中的元素。如果元素引用被省略，则意味着引用到第一个定义的字体。类似地，对于能够包含超过一个字体的字体容器格式，一个给定的`@font-face`规则必须载入并仅能载入一个字体。片段标识符用于表示要载入哪个字体。如果一个容器格式没有定义片段标识符方案，实践应当从1开始索引这些方案（即“font-collection#1”为第一个字体、“font-collection#2”为第二个字体）

实例：

```c
src: url(fonts/simple.ttf);   /* 相对于样式表位置加载simple.ttf */
src: url(/fonts/simple.ttf);  /* 从绝对位置加载simple.ttf */
src: url(fonts.svg#simple);   /* 加载id为‘simple’的SVG字体 */
```

外部引用由一个URI、以及一个紧跟的可选的用于描述该URI所引用的字体资源的格式的提示。这个格式提示包含一个逗号分隔的列表，列表中的元素是表示众所周知的字体格式的格式字符串。如果格式提示都是不支持或未知的字体格式，则符合规范的用户代理必须跳过对这些字体资源的下载。如果没有提供格式提示，则用户代理应当下载这些字体资源。

```c
/* 如果WOFF自己可用则进行载入，否则使用OpenType字体 */
@font-face {
  font-family: bodytext;
  src: url(ideal-sans-serif.woff) format("woff"),
       url(basic-sans-serif.ttf) format("opentype");
}
```

如果编码人员希望使用给定字体的本地可用副本，并且在其不存在的时候下载该字体，则可以使用local()。本地已安装的`<font-face-name>`是一个格式特定的字符串，其唯一标识一个大的家族中的一个单独的字体外观。一个`<font-face-name>`的语法是由“local(”和“)”包围的一个唯一的字体外观名称。

实例：

```c
/* Gentium的规则外观 */
@font-face {
  font-family: MyGentium;
  src: local(Gentium),   /* 使用本地可用的Gentium */
       url(Gentium.ttf); /* 否则进行下载 */
}
```

## font-style、font-weight和font-stretch描述符

这些描述符定义了字符外观的特征，其被用于匹配样式到指定外观的过程中。对于被定义拥有多个@font-face规则的字体家族，用户代理可以下载所有家族中的外观，也可以使用这些描述符有选择地下载匹配文档中使用的实际样式的字体外观。这些描述符的值与相应的字体属性相同，但不允许使用相对关键字（‘bolder’和‘lighter’）。如果忽略了这些描述符，则假定为默认值。

这些字体外观样式属性的值被用于替代底层字体数据所隐含的样式。这允许编码人员灵活的组合外观，即使是在源字体数据拥有不同安排的情况下。实现了合成粗体和倾斜的用户代理必须在字体描述符暗示其需要的情况下仅应用合成样式，而不是基于字体数据所暗示的样式属性。

## unicode-range描述符

此描述符定义给定字体所支持的Unicode字符的范围。其值<urange>使用十六进制数表示，其前缀“U+”，与Unicode字符码位相对应。Unicode范围描述符被用作用户代理决定是否下载一个字体资源时的提示。

Unicode范围值使用十六进制值编写且不区分大小写。每个都由“U+”作为前缀并重复，不连续的范围以逗号分隔。逗号之前或之后的空格将被忽略。有效的字符码在0至10FFFF之间（包含）变化。一个单独的范围有三种基本形式：

 - 一个单独的码位（如：U+416）
 - 一个区间值范围（如：U+400-4ff）
 - 一个尾随表示“任意数字值”的“?”字符的范围（如：U+4??）

任何不符合上述三种形式的范围都被认为会解析出错并忽略该描述符。有一个单独码位组成的区间范围是有效的。使用“?”且没有起始数字的范围（如：U+???）也是有效的，其被认为是在问号之前有一个单独的0（因此，“U+???”=“U+0???”=“U+0000-0FFF”）。“U+??????”不是一个语法错误，但“U+0??????”是。范围是可以重叠的，但向下的区间范围（如：U+400-32f）是无效的且会被忽略但不会出现解析错误；它们不会影响在同一个范围列表中的其他范围。范围会被剪裁到Unicode码位的范围（当前包括0-10FFFF）；完全超出集合的范围会被忽略。没有有效范围的描述符将被忽略。用户代理可能会将这些范围列表标准版的列入一个不同但表示相同字母码位集合的列表。

字符范围可以是底层字体完整字符映射的子集。映射字符到字体上时所使用的有效Unicode范围是Unicode范围指定的和底层字体字符映射的交集。这意味着编码人员不需要精确的定义一个字体的Unicode范围，可以使用字符中所定义的码位的稀疏集的广泛范围。超出Unicode范围的码位将被忽略，而不论该字体是否包含该码位的字形。下载了超出Unicode范围所定义码位的用户代理被认为是不符合规范的。相同的，在显示某个字符时使用了Unicode范围定义没有包含该字符的字体的用户代理也被认为是不符合规范的。

特定语言或字符范围的例子：

Unicode范围：U+A5;
	一个独立码位，日元/人民币元符号。
Unicode范围：U+0-7F;
	基本ASCII字符范围。
Unicode范围：U+590-5ff;
	希伯来语字符范围。
Unicode范围：U+A5, U+4E00-9FFF, U+30??, U+FF00-FF9F;
	日语汉字、平假名片假名字符和日元/人民币元符号范围。

## font-variant 和 font-feature-settings描述符

 - 名称：font-variant
 - 取值：normal | [ `<common-lig-values>` | | `<discretionary-lig-values>` | | `<historical-lig-values>` | | `<contextual-alt-values>` | | stylistic(`<feature-value-name>`) | | historical-forms | | styleset(`<feature-value-name>`#) | | character-variant(`<feature-value-name>`#) | | swash(`<feature-value-name>`) | | ornaments(`<feature-value-name>`) | | annotation(`<feature-value-name>`) | | [ small-caps | all-small-caps | petite-caps | all-petite-caps | titling-caps | unicase ] | | `<numeric-figure-values>` | | `<numeric-spacing-values>` | | `<numeric-fraction-values>` | | ordinal | | slashed-zero | | `<east-asian-variant-values>` | | `<east-asian-width-values>` | | ruby ]
 - 初始值：normal


 - 名称：font-feature-settings
 -  取值：normal | `<feature-tag-value>`#
 - 初始值：normal

此描述符定义了在由@font-face所定义的字体被显示时所应用的设置。它们不会影响字体选择。这个会在对应的[font-variant](https://github.com/cookfront/learn-note/blob/master/CSS/font/font-variant.md)和[font-feature-settings](https://github.com/cookfront/learn-note/blob/master/CSS/font/font-feature-settings.md)讲到。



