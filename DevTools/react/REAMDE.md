#React中使用static关键词，会抛出缺少 transform-class-properties的错误


## 原因 ##
类属性不是ES6的提案，需要babel plugin Class properties transform支持

## plugin地址 ##
[http://babeljs.io/docs/plugins/transform-class-properties/](http://babeljs.io/docs/plugins/transform-class-properties/ "transform-class-properties")

## 用法 ##
{
  "plugins": ["transform-class-properties"]
}

在本配置中，还需要去掉 "transform-es2015-classes"，然后再添加不然依旧会报错
