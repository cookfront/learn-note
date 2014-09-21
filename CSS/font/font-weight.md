font-weight
========

`font-weight`决定字形的重量，这取决于黑度等级或笔划粗细。

 - 取值：normal | bold | bolder | lighter | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
 - 初始值：normal
 - 应用于：所有元素
 - 继承：yes
 
其属性值的意义如下：

 - 100至900 ：这些有序排列中的每个值，表示至少与其起身拥有相同黑度的重量。其大致符合下列通用重量名称：
	 - 100 - Thin
	 - 200 - Extra Light (Ultra Light)
	 - 300 - Light
	 - 400 - Normal
	 - 500 - Medium
	 - 600 - Semi Bold (Demi Bold)
	 - 700 - Bold
	 - 800 - Extra Bold (Ultra Bold)
	 - 900 - Black (Heavy)
 - normal：与400相同
 - bold：与700相同
 - bolder：指定外观的重量大于继承的值
 - lighter：指定外观的重量小于继承的值

通常一个特定的字体家族仅会包含少数的可用重量。若一个重量所指定的字形不存在，则应当使用相近重量的字形。通常，较重的重量会映射到更重的重量、较轻的重量会映射到更轻的重量。下面的例子展示了不同重量将使用的外观，灰色表示该重量的外观不存在、使用的是相近重量的字形：

![enter image description here](http://www.w3.org/TR/css3-fonts/optimaweights.png)