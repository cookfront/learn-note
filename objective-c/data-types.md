## NSLog

在介绍数据类型前，首先看看`NSLog`的打印格式， `NSLog`可以让我们在`Xcode`控制台输出你想输出的内容，是调试程序时不可获取的一个函数。下面看看`NSLog`的打印数据格式：

说明 | 描述  
------|:------:
%@  | Objective c 对象
%%  | `%`字符串
%d, %D, %i | 整数
%u, %U | 无符号整数
%x, %X | 无符号整数，使用十六进制格式打印，`%x`和`%X`的区别就是使用`%x`是打印小写的`a-f`，`%X`则为大写的`a-f`
%o, %O | 无符号整数，使用八进制格式打印
%f | 64位的浮点数
%e, %E | 使用科学计数法打印浮点数，`%e`和`%E`的区别在于大小写
%g, %G | 当指数小于`-4`或大于等于精度时，使用`%e`（`%G`则使用`%E`）打印浮点数。否则使用`%f`
%c | 8位无符号字符（unsigned char），使用`ASCII`格式打印
%C | 16位Unicode字符（unichar）
%s | 以`NULL`结尾的8位无符号字符数组，也即字符串
%S | 以`NULL`结尾的16位Unicode字符数组
%p | 指针

点击这里[官方文档详细版的NSLog][1]

## 原始数据类型

因为`Objective c`是`C`的一个超集，所以它拥有`C`的所有类型。

### Boolean

`Objective c`使用`BOOL`数据类型存储`Boolean`型数据，分别用`YES`和`NO`代表`true`和`false`。需要打印`BOOL`值可以通过`%i`，1就是`YES`，0就是`NO`。

    BOOL isEnter = NO;
    NSLog(@"%i", isEnter);
    
### char

`Objective c`使用`C`一样的`char`类型，它可以用于存储`-128到127`之间的整数或者一个`ASCII`字符，如果要将字符打印成整数，可以通过`%i`，如需打印成字符则使用`%c`。

    char letter = 'z';
    NSLog(@"The ASCII letter %c is actually the number %i", letter, letter);
    
正如有整数还有无符号整数一样，同样可以分配一个无符号字符，可以存储`0-255`，无符号字符需要通过`%u`来打印。

    unsigned char tinyInt = 255;
    NSLog(@"The unsigned char is: %u", tinyInt);
    
### short int

`short int`存储两位的整数，可以存储`-32678到32677`之间的数字，要打印它，需要通过`%hi`，如果是无符号`unsigned short int`，则通过`%hu`打印：

    short int  a = 1000;
    NSLog(@"short int: %hi", a);
    unsigned short int b = 10000;
    NSLog(@"unsigned short int: %hu", b);
    
### int

`int`存储4位的整数，可以存储`-2147483648`到`2147483647`之间的整数，如果是无符号类型则可以存储`0–4294967295`之间的整数。通过`%i, %d, %D`都可以打印`int`。

### long int

如果`int`不能满足你的要求，你可以使用`long int`，在大多数操作系统，它是利用8位来存储数据，可以存储`-9223372036854775808`到`9223372036854775807`之间的数字，如果是无符号的话，可以存储`0-18446744073709551615`。需要打印的话分别通过`%li`或`lu`来打印。

    long int bigInt = 9223372036854775807;
    NSLog(@"The big integer is: %li", bigInt);
    unsigned long int uBigInt = 18446744073709551615;
    NSLog(@"The even bigger integer is: %lu", uBigInt);
    
### float/double

`float`和`double`分别用4位和8位存储浮点数，可以通过`%f`来打印他们。

## Foundation数据类型

### NSNumber

`NSNumber`是[NSValue][2]的子类，`NSNumber`用于封装原始类型，对于c语言的原始类型`bool char int float double`，需要封装成NSNumber对象后才能放到NSArray跟NSDictionary等集合对象里面。

`NSNumber`提供了一套方法用于设置和获取值，这些方法主要分为三大类：`numberWithXXX`，`initWithXXX`，`XXXValue`，前面两类方法是用于设置值，`XXXValue`用于返回`XXX`类型的值。
首先看看`numberWithXXX`，`numberWithXXX`是类方法：

    int someInteger = -27;
    NSNumber *someNumber = [NSNumber numberWithInt:someInteger];
    NSLog(@"%@", someNumber);
    
`double`类型则可以通过`numberWithFloat`来创建对象。

下面再看看`initWithXXX`，它也是用于设置值，但它是实例方法，所以需要创建一个`NSNumber`对象时需要像下面这样：

    NSNumber *someInteger = [[NSNumber alloc] initWithInt: 100];
    NSLog(@"some integet: %@", someInteger);
    
应该可以看出`numberWithXXX`和`initWithXXX`的区别了吧。

最后是需要从`NSNumber`对象中获取对应类型的原始类型值时通过`XXXValue`方法来获取，`XXXValue`是实例方法：

    NSNumber *someInteger = [[NSNumber alloc] initWithInt: 100];
    int intVal = [someInteger intValue];
    NSLog(@"some integet: %@", someInteger);
    NSLog(@"int value: %i", intVal);
    
每次都要通过`numberWithXXX`来包装对象是不是很烦呢？`Objective C`给我们提供了一种对象直接量的方式去创建一个`NSNumber`对象：

    // 整数
    NSNumber *fortyTwo = @42;             // 等价于 [NSNumber numberWithInt:42]
    NSNumber *fortyTwoUnsigned = @42U;    // 等价于 [NSNumber numberWithUnsignedInt:42U]
    NSNumber *fortyTwoLong = @42L;        // 等价于 [NSNumber numberWithLong:42L]
    NSNumber *fortyTwoLongLong = @42LL;   // 等价于 [NSNumber numberWithLongLong:42LL]

    // 浮点数
    NSNumber *piFloat = @3.141592654F;    // 等价于 [NSNumber numberWithFloat:3.141592654F]
    NSNumber *piDouble = @3.1415926535;   // 等价于 [NSNumber numberWithDouble:3.1415926535]

    // 布尔值
    NSNumber *yesNumber = @YES;           // 等价于 [NSNumber numberWithBool:YES]
    NSNumber *noNumber = @NO;             // 等价于 [NSNumber numberWithBool:NO]
    
`NSNumber`还提供了两个比较方法：`compare`和`isEqualToNumber`。

`compare`方法返回一个[NSComparisonResult][3]值，表明当前比较值是否大于、等于或小于指定需要比较的值。

    - (NSComparisonResult)compare:(NSNumber *)aNumber
    
如果`aNumber`大于当前比较值，则返回[NSOrderedAscending][4]（升序），当`aNumber`等于当前比较值，则返回[NSOrderedSame][5]，当`aNumber`小于比较值时则返回[NSOrderedDescending][6]。

`isEqualToNumber`方法则返回一个`BOOL`值，如果两个值相等则返回`YES`，否则返回`NO`。

### NSDecimalNumber

`NSDecimalNumber`是`NSNumber`的一个子类，相对于`float`和`double`，它可以提供更加准确的数据，可以用于代表一些精确的数据(例如：货币。可以看看这篇[Objective-C精确的货币计算][7])。最简单创建一个`NSDecimalNumber`的方法就是利用`decimalNumberWithString`:

```c
NSDecimalNumber *subtotal = [NSDecimalNumber decimalNumberWithString:@"10.99"];
```

还可以像`NSNumber`通过`initWithString`方法来创建一个`NSDecimalNumber`:

```c
NSDecimalNumber *decimal = [[NSDecimalNumber alloc] initWithString: @"10.55"];
```
有时候可能需要获取到`NSDecimalNumber`中的值，有两个方法`decimalValue`和`doubleValue`，这两个方法分别返回`NSDecimal`和`double`类型的数据。例如：

```c
NSDecimalNumber *decimal = [[NSDecimalNumber alloc] initWithString: @"10.55"];
double access = [decimal doubleValue];
NSLog(@"decimal %@", decimal);
NSLog(@"access %f", access);
```

`NSDecimalNumber`还提供了关于算数运算的一些方法：

 - `- (NSDecimalNumber *)decimalNumberByAdding:(NSDecimalNumber *)decimalNumber`：将当前的`NSDecimalNumber`与参数`decimalNumber`相加后的结果并返回
 - `- (NSDecimalNumber *)decimalNumberBySubtracting:(NSDecimalNumber *)decimalNumber`：减法
 - `- (NSDecimalNumber *)decimalNumberByMultiplyingBy:(NSDecimalNumber *)decimalNumber`：乘法
 - `- (NSDecimalNumber *)decimalNumberByDividingBy:(NSDecimalNumber *)decimalNumber`：除法
 - 

  [1]: https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/Strings/Articles/formatSpecifiers.html#//apple_ref/doc/uid/TP40004265
  [2]: https://developer.apple.com/library/mac/documentation/cocoa/reference/foundation/classes/NSValue_Class/Reference/Reference.html#//apple_ref/occ/cl/NSValue
  [3]: https://developer.apple.com/library/mac/documentation/cocoa/reference/foundation/Miscellaneous/Foundation_Constants/Reference/reference.html#//apple_ref/doc/c_ref/NSComparisonResult
  [4]: https://developer.apple.com/library/mac/documentation/cocoa/reference/foundation/Miscellaneous/Foundation_Constants/Reference/reference.html#//apple_ref/doc/c_ref/NSOrderedAscending
  [5]: https://developer.apple.com/library/mac/documentation/cocoa/reference/foundation/Miscellaneous/Foundation_Constants/Reference/reference.html#//apple_ref/doc/c_ref/NSOrderedSame
  [6]: https://developer.apple.com/library/mac/documentation/cocoa/reference/foundation/Miscellaneous/Foundation_Constants/Reference/reference.html#//apple_ref/doc/c_ref/NSOrderedDescending
  [7]: http://arthurchen.blog.51cto.com/2483760/761426