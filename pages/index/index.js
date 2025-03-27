import { requestGet } from "../../utils/request"

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		// banner轮播图
		banners: [],
		// 滚动分类数据
		categories: [],
		// 下拉商品列表
		goods: [],
		// 下一页推荐商品起始索引
		nextIndex: 0,
		// 是否所有数据全部查询结束
		isEnd: false,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		try {
			/* 网络请求（串行执行）轮播图数据 分类数据
			const bannerRes = await requestGet('/api/tab/1')
			const categoryRes = await requestGet('/api/tabs')
			this.setData({
				banners: bannerRes.banners,
				categories: categoryRes.list,
			}) */

			// 同时发送两个网络请求（并行执行）
			// Promise.allSettled() 返回的 Promise 对象是 fulfilled 状态。
			// 携带数组数据返回。数组中元素的类型为对象，结构: {status, value} 或 {status, reason}
			const result = await Promise.allSettled([
				requestGet('/api/tab/1'),// 查询轮播及首页推荐商品
				requestGet('/api/tabs'), // 查询分类数据
			])
			this.setData({
				banners: result[0].value.banners,
				categories: result[1].value.list,
				goods: result[0].value.items.list,
				nextIndex: result[0].value.items.nextIndex,
				isEnd: result[0].value.items.isEnd,
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
	onPullDownRefresh: async function () {
		console.log('下拉刷新');
		try {
			// 同时发送两个网络请求（并行执行）
			const result = await Promise.allSettled([
				requestGet('/api/tab/1'),// 查询轮播及首页推荐商品
				requestGet('/api/tabs'), // 查询分类数据
			])
			// Promise.allSettled() 返回的 Promise 对象是 fulfilled 状态。
			// 携带数组数据返回。数组中元素的类型为对象，结构: {status, value} 或 {status, reason}
			this.setData({
				banners: result[0].value.banners,
				categories: result[1].value.list.slice(1),// 为了区分将分类数据删除一个
				goods: result[0].value.items.list.slice(2),// 为了区分将下拉商品列表数据删除两个
				nextIndex: result[0].value.items.nextIndex,
				isEnd: result[0].value.items.isEnd,
			})
			// 手动关闭下拉刷新效果
			wx.stopPullDownRefresh()
		} catch (error) {
			console.log('error:', error);
		}
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: async function () {
		if (this.data.isEnd) {
			console.log('所有数据全部查询结束');
			return
		}
		console.log('正在查询更多');
		try {
			// 发送网络请求，查询更多首页推荐数据
			const result = await requestGet('/api/tab/1/feeds', { start: this.data.nextIndex })
			this.setData({
				goods: [
					...this.data.goods,
					...result.list
				],
				nextIndex: result.nextIndex,
				isEnd: result.isEnd,
			})
		} catch (error) {
			console.error('error', error);
		}
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	},

	/**
	 * 跳转到详情页面
	 */
	jumpToDetail: (event) => {
		console.log('点击图片跳转到详情页面');
		// 从事件源对象的 dataset 中，可以获取到对应节点中定义的`data-*`的自定义属性值
		const { id, title, price } = event.target.dataset
		/* 	也可以借助本地存储的方式向另一个页面传递数据
				wx.setStorage({
					key: 'goods',
					data:{id,title,price}
				}) 
		*/

		// 使用wx.navigateTo（）跳转到应用内某个页面
		wx.navigateTo({
			url: `/pages/detail/detail?id=${id}&title=${title}&price=${price}`,
		})
	}

})