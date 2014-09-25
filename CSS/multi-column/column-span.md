column-span
========

`column-span`属性用于指定元素是否横跨所有列。

语法：

```c
column-span: none | all
```

 - 初始值：none
 - 应用于：除浮动和绝对定位之外的块级元素
 - 继承：无

属性值的意义：

 - none：此值为默认值，表示不跨越任何列
 - all：这个值跟none刚好相反，他表示的是元素跨越所有列

```c
<style>
.columnBreak {
     -moz-column-count: 3;
     -webkit-column-count: 3;
     column-count: 3;
     -moz-column-gap: 30px;
     -webkit-column-gap: 30px;
     column-gap: 30px;
   }
  .columnBreak h2 {
     background: orange;
     border-bottom: 3px double green;
     margin: 5px 0;
     -webkit-column-span: all;
     column-span: all;
  }
</style>

<div class="demo columnBreak"> 
    <p>Column gaps and rules are placed between columns in the same multicol element. The length of the column gaps and column rules is equal to the length of the columns. Column gaps take up space. That is, column gaps will push apart content in adjacent columns (within the same multicol element).
A column rule is drawn in the middle of the column gap with the endpoints at opposing content edges of the multicol element. Column rules do not take up space. That is, the presence or thickness of a column rule will not alter the placement of anything else. If a column rule is wider than its gap, the column rule will overlap adjacent column boxes, and possibly extend outside the box of the multicol element. Column rules are painted just above </p> 
    <h2>test header</h2>
    <p>exercitation  ... unt mollit anim id est laborColumn gaps and rules are placed between columns in the same multicol element. The length of the column gaps and column rules is equal to the length of the columns. Column gaps take up space. That is, column gaps will push apart content in adjacent columns (within the same multicol element).
A column rule is drawn in the middle of the column gap with the endpoints at opposing content edges of the multicol element. Column rules do not take up space. That is, the presence or thickness of a column rule will not alter the placement of anything else. If a column rule is wider than its gap, the column rule will overlap adjacent column boxes, and possibly extend outside the box of the multicol element. Column rules are painted just above um.</p>
</div>
```