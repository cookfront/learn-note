JavaScript Element
========

## 属性

### element.accessKey

`accessKey`属性设置或返回在元素上设置的`accessKey`。

`accessKey`是指定一个快捷键，这个快捷键可以用于激活元素（使元素获得焦点）。

实例：

```c
<input type="text" id="test">

<script>
document.getElementById('test').accessKey = 'w';
</script>
```

注意按快捷键时需要按住`alt`键。

### element.attributes

