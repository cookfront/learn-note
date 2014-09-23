text-align
========

`text-align`属性描述行级内容在块容器内水平的对齐方式。

 - 取值：start | end | left | right | center | justify | match-parent | start end
 - 初始值：如果`direction`为`ltr`，则其初始值为`left`，如果`direction: rtl`，则初始值为`right`
 - 应用于：块容器（block containers）
 - 继承：yes
 
 语法：

```c
text-align: start | end | left | right | center | justify | match-parent | start end
```

各属性值的意义如下：

 - start：内容对齐开始边界
 - end：内容对齐结束边界
 - left：左对齐
 - right：右对齐
 - center：居中对齐
 - justify：两端对齐
 - match-parent：这个值和`inherit`表现一致，只是该值继承的`start`或`end`关键字是针对父母的`direction`值并计算的，计算值可以是`left`和`right`。
 - start end：指定`start`对齐第一行和任何强制打断的行；`end`对齐所有剩余的行不受`text-align-last`影响

