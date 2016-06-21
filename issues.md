# 前端开发中遇到的问题总结，持续更新

>欢迎提交Pull Request,一起学习交流


##一、综合类


##二、PC端
###Div中放不下如何出现横向滚动条,然后一直排过去
####解决方法
在最外层容器里面再套一次子div，宽度设置比父元素大，父元素设置`overflow-x： scroll`; 
####在线DEMO
[https://jsfiddle.net/xiaoxiongmila/4ox73ne7/](https://jsfiddle.net/xiaoxiongmila/4ox73ne7/ "https://jsfiddle.net/xiaoxiongmila/4ox73ne7/")

请在真机上查看效果
####参考链接：
[Div中放不下如何出现横向滚动条,然后一直排过去](http://bbs.csdn.net/topics/390361567 "http://bbs.csdn.net/topics/390361567")
##三、移动端
	

###  微信浏览网页滑动页面的时候右下角出现缩放按钮
	
####解决方法：
`<meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0"> ` 
####参考链接：
[去掉微信浏览器里的放大缩小按钮](http://blog.csdn.net/flyspace/article/details/39993103)

	
##四、工具类

