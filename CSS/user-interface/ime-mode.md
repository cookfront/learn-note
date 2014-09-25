ime-mode
========

`ime-mode`属性指定是否允许用户激活输入中文，韩文，日文等的输入法（IME）状态。

语法：

```c
ime-mode: auto | normal | active | inactive | disabled
```

 - 默认值：auto
 - 应用于：所有输入文本框

属性值意义：

 - auto：不影响IME的状态。
 - normal：正常的IME状态
 - active：指定所有使用ime输入的字符。即激活本地语言输入法。用户仍可以撤销激活ime
 - inactive：指定所有不使用ime输入的字符。即激活非本地语言。用户仍可以撤销激活ime
 - disabled：完全禁用ime。对于有焦点的控件(如输入框)，用户不可以激活ime