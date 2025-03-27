import request, { get } from "../../utils/request"

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		banners: [],
		categories: [],
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		// 发送网络请求，查询轮播图数据
		// wx.request({
		//   url: 'http://113.45.10.129:3000/api/tab/1',
		//   success: res => {
		//     console.log('查询数据成功:', res);
		//   },
		//   fail: error => {
		//     console.log('失败:', error)
		//   },
		// })

		// request({
		//   url: '/api/tab/1'
		// })
		// .then(console.log)
		// .catch(console.error)

		try {
			// const result = await request({url: '/api/tab/1'})
			const result = await get('/api/tab/1')
			const res = await get('/api/tabs')
			console.log('result:', res);
			this.setData({
				banners: result.banners,
				categories: res.list,
			})
		} catch (error) {
			console.log('error:', error);
		}
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})