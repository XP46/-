// pages/post/post-details/post-details.js
var postData = require('../../../data/posts-data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id
    var posts_key = postData.postList[postId]
    this.setData({
      post:posts_key
    })
    console.log(this)
  },

  onPlay:function(){
    //获取状态
    var isPlayingMusic = this.data.isPlayingMusic;
    if(isPlayingMusic){
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })
    }
    else{
      
      wx.playBackgroundAudio({
        dataUrl: 'http://music.163.com/song/media/outer/url?id=574919767.mp3',
        title: '不要平凡',
        coverImgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540181167&di=4ffeb0be59318ee3702d3023213a71aa&imgtype=jpg&er=1&src=http%3A%2F%2Fy.gtimg.cn%2Fmusic%2Fphoto_new%2FT002R300x300M000003j9ta912S5XX.jpg%3Fmax_age%3D2592000'
      })
      this.setData({
        isPlayingMusic: true
      })
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