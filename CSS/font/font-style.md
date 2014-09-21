font-style
========

`font-style`属性允许选择斜体（italic）或倾斜(oblique)的外观。

 - 取值：normal | italic | oblique
 - 初始值：normal
 - 应用于：所有元素
 - 继承：yes

斜体形式通常是自然的手写体，而倾斜外观是规则外观的倾斜版本。倾斜外观通过人工的倾斜规则外观的字形而模拟形成。比较处于灰色的人工倾斜而产生的Palatino“a”和Baskerville“N”与实际的斜体版本：

![enter image description here](http://www.w3.org/TR/css3-fonts/realvsfakeitalics.png)

值‘normal’选择被分类为“normal”的外观，而‘oblique’选择被标为‘oblique’的字体。值‘italic’选择被标为‘italic’的字体，或者如果其不可用，则选择被标为‘oblique’的字体。如果斜体和倾斜的外观均不可用，则可以通过在normal外观上应用倾斜变换而合成一个倾斜的外观。