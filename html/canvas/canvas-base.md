## 矩形

### fillRect(x, y, width, height)

在位置`x, y`处绘制一个填充的矩形，且其宽高为分别为width和height。相关的属性有`fillStyle`。

### strokeRect(x, y, width, height)

在位置`x, y`处绘制一个矩形轮廓，且其宽高为分别为width和height。相关的属性有`strokeStyle`、`lineWidth`、`lineJoin`和`miterLimit`。

### clearRect()

清除`x, y`处宽高为`width`和`height`的指定区域，使其完全透明。

当我们使用这些函数之前，应该设置好`fill`和`stroke`样式。

## canvas状态保存与恢复

### save

为了保存当前状态到栈中：

```c
context.save()
```

### restore

恢复当前状态到最后一次save的状态：

```c
context.restore()
```