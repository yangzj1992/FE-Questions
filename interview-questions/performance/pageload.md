Q : 页面加载事件过程

A : 

在获得数据响应后,页面开始解析,发生的过程为:
(1) 解析HTML结构。 
(2) 加载外部脚本和样式表文件。 
(3) 解析并执行脚本代码。 
(4) 构造HTML DOM模型。// DOMContentLoaded ready执行 
(5) 加载图片等外部文件。 
(6) 页面加载完毕。//load执行

performance API 