# 前端开发中遇到的问题总结，持续更新

>欢迎提交Pull Request,一起学习交流


- 问题分类	h1 #...	
	
- 问题描述 h2 ##... 

- 解决方法  在线DEMO 参考链接 h3 ###...	

- 其他子标题 h4 ####...	

#一、综合类

##中英文混杂字体两端对齐
一般的两端对齐是使用text-align:justify，但是text-align:justify一般情况下只针对英文管用。（因为css是老外设计的，老外在justify判断的时候，是根据单词直接的空格来的，中文两个汉字之间没有空格，所以大部分情况下text-align:justify不管用，所以这个属性大部分形同虚设！）。

### 解决方法 ###

var box=document.getElementById("box");

box.style.textAlign = "justify";

box.style.letterSpacing = '-.15em';

box.innerHTML =box.innerHTML.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '').split("").join(" ").replace(/\s{3}/g, " &nbsp; ");

### 其他 ###
text-align:justify;text-justify:distribute;/*ie7-8*/

### 参考链接 ###
[http://www.zhangxinxu.com/wordpress/2015/08/chinese-english-same-padding-text-justify/](http://www.zhangxinxu.com/wordpress/2015/08/chinese-english-same-padding-text-justify/ "http://www.zhangxinxu.com/wordpress/2015/08/chinese-english-same-padding-text-justify/")

#二、PC端
##Div中放不下如何出现横向滚动条,然后一直排过去
###解决方法
在最外层容器里面再套一次子div，宽度设置比父元素大，父元素设置`overflow-x： scroll`; 
###在线DEMO
[https://jsfiddle.net/xiaoxiongmila/4ox73ne7/](https://jsfiddle.net/xiaoxiongmila/4ox73ne7/ "https://jsfiddle.net/xiaoxiongmila/4ox73ne7/")

请在真机上查看效果
###参考链接
[Div中放不下如何出现横向滚动条,然后一直排过去](http://bbs.csdn.net/topics/390361567 "http://bbs.csdn.net/topics/390361567")

##canvas绘制圆环进度条出现模糊效果解决方案
###解决方法
####一、运用hidpi-canvas-polyfill 的js进行解决
HiDPI Canvas Polyfill 是针对设备提出的canvas高清解决方案，首先引入hidpi-canvas.js。

这个js会自动识别你的canvas,会把你的canvas变小，虽然不模糊了，但是不是我们想要的效果。（可以结合后面的方法进行改进）

关于hidpi-canvas-polyfill 地址：[https://github.com/jondavidjohn/hidpi-canvas-polyfill](https://github.com/jondavidjohn/hidpi-canvas-polyfill "https://github.com/jondavidjohn/hidpi-canvas-polyfill")
####二、指定默认宽高法
###在线DEMO
[https://jsfiddle.net/xiaoxiongmila/o4xvLryf/](https://jsfiddle.net/xiaoxiongmila/o4xvLryf/ "https://jsfiddle.net/xiaoxiongmila/o4xvLryf/")
#三、移动端
## 微信浏览网页滑动页面的时候右下角出现缩放按钮
###解决方法
`<meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0"> ` 
###参考链接
[去掉微信浏览器里的放大缩小按钮](http://blog.csdn.net/flyspace/article/details/39993103)
## 使用REM 和 Spirtes背景图片错位
###解决方法
使用`background-position`更为精准，代替原来的REM
###参考链接
[http://caibaojian.com/background-position-percent.html](http://caibaojian.com/background-position-percent.html "http://caibaojian.com/background-position-percent.html")
#四、框架、库类
##React使用static关键字报错
###解决办法
使用Class properties transform插件，同时在.babelrc中删除"transform-es2015-classes"，增加"transform-class-properties"，同时删除`"transform-es2015-classes"`,不然依旧报错

示例：
  
` {
  "plugins": ["transform-class-properties"]
}`

###参考链接
[http://babeljs.io/docs/plugins/transform-class-properties/](http://babeljs.io/docs/plugins/transform-class-properties/ "http://babeljs.io/docs/plugins/transform-class-properties/")

##React即使添加了key控制台却还是提示缺少key
###解决方法
尝试给添加key的父级容器添加key
###参考链接
[http://stackoverflow.com/questions/32256492/react-getting-key-prop-warning-even-though-key-is-set](http://stackoverflow.com/questions/32256492/react-getting-key-prop-warning-even-though-key-is-set "http://stackoverflow.com/questions/32256492/react-getting-key-prop-warning-even-though-key-is-set")

##React报错Uncaught TypeError: Super expression must either be null or a function, not undefined

###解决方法
检查下是否有拼写错误

###参考链接
[http://stackoverflow.com/questions/30116430/reactjs-giving-error-uncaught-typeerror-super-expression-must-either-be-null-or](http://stackoverflow.com/questions/30116430/reactjs-giving-error-uncaught-typeerror-super-expression-must-either-be-null-or "http://stackoverflow.com/questions/30116430/reactjs-giving-error-uncaught-typeerror-super-expression-must-either-be-null-or")

###React报错
 Error: Invariant Violation: setState(...): 
 Cannot update during an existing state transition (such as within `render`). 
 Render methods should be a pure function of props and state.
###解决方法
`onPress={this.goToUser(this.props.data.name)}`

改为

`onPress={()=>{
   this.goToUser(this.props.data.name)
  }}`
###参考链接
[https://skyline75489.github.io/post/2015-6-6_react-native-deck-for-github.html](https://skyline75489.github.io/post/2015-6-6_react-native-deck-for-github.html "https://skyline75489.github.io/post/2015-6-6_react-native-deck-for-github.html")
#五、工具类
##GIT Bash尝试修改文件报错缺少类关键转换

`fatal: Unable to create '/path/my_proj/.git/index.lock': File exists.If no other git process is currently running, this probably means a
git process crashed in this repository earlier. Make sure no other git
process is running and remove the file manually to continue.`

###解决方法
    rm -f ./.git/index.lock

###参考链接
[http://stackoverflow.com/questions/7860751/git-fatal-unable-to-create-path-my-project-git-index-lock-file-exists](http://stackoverflow.com/questions/7860751/git-fatal-unable-to-create-path-my-project-git-index-lock-file-exists "http://stackoverflow.com/questions/7860751/git-fatal-unable-to-create-path-my-project-git-index-lock-file-exists")

