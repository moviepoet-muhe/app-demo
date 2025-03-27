
// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    title: '',
    price: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   * 可以在回调函数的参数中，获取到跳转到当前页面时，路径中传递的 ? 查询字符串参数数据
   */
  onLoad(query) {
    console.log(query);
    this.setData(query)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})