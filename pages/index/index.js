// index.js
Page({
  data: {
    // 页面数据
    name:'欢迎来到小程序',
    content:'这是首页内容。',
    a:10
  },
  
  // 页面加载时触发
  onLoad: function(options) {
    // 页面初始化操作
    
  },
  
  // 按钮点击事件处理函数
  onButtonClick: function() {
    const a1 =this.data.a
    // 增加a的值
    this.setData({
      a:a1+1
    })
  }
});