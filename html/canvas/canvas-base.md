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

## path

### 开始和结束路径

 - beginPath()
 - closePath()

### 实际绘图

#### lineGap

`lineCap`属性设置或返回线条末端线帽的样式。可能的值有：

 - butt：默认。向线条的每个末端添加平直的边缘。
 - round：向线条的每个末端添加圆形线帽。
 - square：向线条的每个末端添加正方形线帽。

```c
<!DOCTYPE html>
<html>
<body>

<p>三种不同的线帽：</p>
<canvas id="myCanvas" width="300" height="150" style="border:1px solid #d3d3d3;">
Your browser does not support the HTML5 canvas tag.
</canvas>

<script>

var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");

ctx.beginPath();
ctx.lineWidth=10;
ctx.lineCap="butt";
ctx.moveTo(20,20);
ctx.lineTo(200,20);
ctx.stroke();

ctx.beginPath();
ctx.lineCap="round";
ctx.moveTo(20,40);
ctx.lineTo(200,40);
ctx.stroke();

ctx.beginPath();
ctx.lineCap="square";
ctx.moveTo(20,60);
ctx.lineTo(200,60);
ctx.stroke();

</script>

</body>
</html>
```

![enter image description here](http://cookfront.qiniudn.com/3292860E-8B48-4AE1-A74C-7EABE88AA131.png)

从上面应该可以很清楚的看到这三个属性值的区别了。

#### lineJoin

`lineJoin`属性设置或返回所创建边角的类型，当两条线交汇时。可能的属性值有：

 - miter：创建尖角
 - bevel：创建斜角
 - round：创建圆角

```c
<!DOCTYPE html>
<html>
<body>

<canvas id="myCanvas" width="300" height="450" style="border:1px solid #d3d3d3;">
Your browser does not support the HTML5 canvas tag.
</canvas>

<script>

var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
ctx.beginPath();
ctx.lineWidth=10;
ctx.lineJoin="round";
ctx.moveTo(20,20);
ctx.lineTo(100,50);
ctx.lineTo(20,100);
ctx.stroke();

ctx.beginPath();
ctx.lineWidth=10;
ctx.lineJoin="miter";
ctx.moveTo(20,170);
ctx.lineTo(100,200);
ctx.lineTo(20,250);
ctx.stroke();

ctx.beginPath();
ctx.lineWidth=10;
ctx.lineJoin="bevel";
ctx.moveTo(20,320);
ctx.lineTo(100,350);
ctx.lineTo(20,400);
ctx.stroke();

</script>

</body>
</html>
```

![enter image description here](http://cookfront.qiniudn.com/69515479-96CA-4A98-8E20-6ADC45DCFA6D.png)

从图片中可以看的很清楚了。

#### lineWidth

这个属性决定了线条的宽度。

#### strokeStyle

`strokeStyle`属性设置或返回用于笔触的颜色、渐变或模式。

#### arc()

语法：

```c
context.arc(x, y, radius, startAngle, endAngle, anticlockwise)
```

这里的`x`和`y`定义了圆弧的中心，`radius`定义了圆弧的半径。这里的`startAngle`和`endAngle`从名字中也能看出来，分别是开始角度和结束角度，不过它们都是弧度值，而不是角度。那么如何从角度转弧度呢？因为一弧度为`180°/π`，约57.29577951°，以度数表示的角度，把数字乘以`π/180`便转换成弧度；以弧度表示的角度，乘以`180/π`便转换成度数。`anticlockwise`则是一个可选的布尔值参数，它规定应该逆时针还是顺时针绘图。False = 顺时针，true = 逆时针。

```c
var context = document.getElementById('canvasOne').getContext('2d');

context.beginPath();
context.strokeStyle = "black";
context.lineWidth = 5;
context.arc(100, 100, 40, (Math.PI/180)*0, (Math.PI/180)*180, true);

//full circle
context.stroke();
context.closePath();
```

#### arcTo()

语法：

```c
context.arcTo(x1, y1, x2, y2, radius)
```

`arcTo()`方法在画布上创建介于两个切线之间的弧/曲线。

先看一个例子，再来解释各个参数的意思：

```c
<canvas id="canvasOne" width="500" height="500"></canvas>


var context = document.getElementById('canvasOne').getContext('2d');

context.beginPath();
context.strokeStyle = "black";
context.lineWidth = 5;
context.moveTo(0,0);
context.lineTo(100, 200);
context.arcTo(350,350,100,100,25);
context.stroke();

context.beginPath();
context.strokeStyle = 'red';
context.lineWidth = 1;
context.moveTo(100,200);
context.lineTo(350, 350);
context.lineTo(100, 100);
context.stroke();
```

上面的代码绘制出的图形：

![enter image description here](http://cookfront.qiniudn.com/CF89159E-CFB3-48D2-B01E-646DDEDD1B49.png)

可以看到两条红线其实是那个黑色圆弧的切线，`arcTo`里面的`x1, y1`就是两条红线相交的那个点，`x2, y2`是第二条直线的最后那个点，`radius`就是圆弧半径，这两条红线构成了一个夹角，然后`arcTo`就是绘制一个半径为`radius`且和两条线相切的圆弧了。实践下就知道了。囧。。

#### bezierCurveTo

三次贝塞尔曲线。三次贝塞尔曲线需要指定两个控制点`cp1x, cp1y`和`cp2x, cp2y`，然后一个圆弧的终点`x, y`。

语法：

```c
bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
```

实例：

```c
var context = document.getElementById('canvasOne').getContext('2d');

context.beginPath();
context.strokeStyle = "black";
context.lineWidth = 5;
context.moveTo(150,0);
context.bezierCurveTo(0,125,300,175,150,300);
context.stroke();
```

#### quadraticCurveTo

二次贝塞尔曲线。二次贝塞尔曲线只需指定一个控制点`cpx, cpy`，还有一个圆弧的终点`x, y`。

语法：

```c
quadraticCurveTo(cpx, cpy, x, y)
```

实例：

```c
var context = document.getElementById('canvasOne').getContext('2d');

context.beginPath();
context.strokeStyle = "black";
context.lineWidth = 5;
context.moveTo(0,0);
context.quadraticCurveTo(100,25,0,50);
context.stroke();
```

#### rect()

绘制矩形。

语法：

```c
rect(x, y, width, height)
```

`x, y`分别是绘制矩形时矩形的左上角坐标，`width`和`height`分别是矩形的宽高。

```c
var context = document.getElementById('canvasOne').getContext('2d');

context.beginPath();
context.strokeStyle = "black";
context.lineWidth = 5;
context.rect(10, 10, 100, 150);
context.stroke();
```

#### clip()

`clip()`方法从原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内（不能访问画布上的其他区域）。您也可以在使用 clip() 方法前通过使用 save() 方法对当前画布区域进行保存，并在以后的任意时间对其进行恢复（通过 restore() 方法）。

实例：

```c
var context = document.getElementById('canvasOne').getContext('2d');

context.beginPath();
context.rect(50, 20, 200, 120);
context.stroke();
context.clip();
context.fillStyle = 'green';
context.fillRect(0, 0, 150, 100);
```

从这个例子中我们可以看到，绘制的绿色填充色的矩形从`0, 0`点到`50, 20`没有显示，因为被`clip()`限制了从`50, 20`的大小为`200, 120`的矩形区域。




