Angular.js Filter 过滤器
========

在`AngularJS`中，过滤器给我们提供了一种方法来格式化我们需要显示给用户的数据。`AngularJS`提供了不少内置的过滤器，当然我们也可以自己定义过滤器。

那怎么去调用过滤器呢？通过`|`在`{{ }}`中指定一个或多个过滤器。例如：

```c
{{ name | uppercase }}
```

我们还可以向过滤器中传入参数，通过`:`在过滤器名后面指定一个或多个参数。例如：

```c
{{ name | filterName:arg1:arg2 }}
```

## AngularJS 内置过滤器

`AngularJS`内部给我们提供了9种过滤器：

**1.currency**

用于将数字格式化为货币，默认是美元符号，你可以传入需要的符号，例如：

```c
{{ num | currency: '¥' }}
```

 **2.date**

用于格式化日期，你可以将日期格式化成你需要的格式。例如：

```c
{{date | date : 'yyyy-MM-dd hh:mm:ss EEEE'}}
```

**3.filter**

这个名字就是`filter`，有点容易混淆呀（第一眼看到的时候）。它用来处理一个数组，然后可以过滤出含有某个子串的元素，作为一个子数组来返回。可以是字符串数组，也可以是对象数组。如果是对象数组，可以匹配属性的值。它接受一个参数，用来定义子串的匹配规则。这个参数可以是字符串、对象或者是函数。例如：

```c
$scope.childrenArray = [
        {name:'kimi',age:3},
        {name:'cindy',age:4},
        {name:'anglar',age:4},
        {name:'shitou',age:6},
        {name:'tiantian',age:5}
    ];
$scope.func = function(e){return e.age>4;}

{{ childrenArray | filter : 'a' }} //匹配属性值中含有a的
{{ childrenArray | filter : 4 }}  //匹配属性值中含有4的
{{ childrenArray | filter : {name : 'i'} }} //参数是对象，匹配name属性中含有i的
{{childrenArray | filter : func }}  //参数是函数，指定返回age>4的
```

**4.json**

把一个js对象格式化为json字符串，没有参数。

```c
{{ {'name': 'Ari', 'City': 'San Francisco'} | json }}
<!-- {
  "name": "Ari",
  "City": "San Francisco"
}
-->
```

**5.limitTo**

`limitTo`用于截取数组或字符串，如果指定的数字为负数，则从数组或字符串的末尾开始算。例如：

```c
{{ San Francisco is very cloudy | limitTo:3 }}
<!-- San -->

{{ San Francisco is very cloudy | limitTo:-6 }}
<!-- cloudy -->

{{ ['a', 'b', 'c', 'd', 'e', 'f'] | limitTo:1 }}
<!-- ["a"] -->
```

**6.lowercase**

将字符串格式化为小写。例如：

```c
{{ "San Francisco is very cloudy" | lowercase }}
<!-- san francisco is very cloudy -->
```

**7.number**

格式化数字，接受一个参数，该参数指定数字保留几位小数。例如：

```c
{{ 123456789 | number }}
<!-- 1,234,567,890 -->
{{ 1.234567 | number:2 }}
<!-- 1.23 -->
```

**8.orderBy**

`orderBy`过滤器可以将一个数组中的元素进行排序，接收一个参数来指定排序规则，参数可以是一个字符串，表示以该属性名称进行排序。可以是一个函数，定义排序属性。还可以是一个数组，表示依次按数组中的属性值进行排序（若按第一项比较的值相等，再按第二项比较），还是拿上面的孩子数组举例：

```c
<div>{{ childrenArray | orderBy : 'age' }}</div>      //按age属性值进行排序，若是-age，则倒序
<div>{{ childrenArray | orderBy : orderFunc }}</div>   //按照函数的返回值进行排序
<div>{{ childrenArray | orderBy : ['age','name'] }}</div>  //如果age相同，按照name进行排序
```

**9.uppercase**

将字符串格式化为大写。例如：

```c
{{ "San Francisco is very cloudy" | uppercase }}
<!-- SAN FRANCISCO IS VERY CLOUDY -->
```

## 自定义过滤器

如果这些过滤器不能满足我们的需求时，这时候就需要自己定义过滤器了。先来看看自定义过滤器的形式：

```c
app.filter('过滤器名称', function(){
    return function(需要过滤的对象, 过滤器参数1, 过滤器参数2,...){
        //...做一些事情  
        return 处理后的对象;
    }
});
```

下面我们定义一个将字符串的首字符大写的过滤器。

```c
angular.module('app.filters', [])
	.filter('capitalize', function () {
		return function (input) {
			return input[0].toUppercase() + input.slice(1);
		};
	});
```

我们可以这样使用它：

````c
{{ something | capitalize }}
```



