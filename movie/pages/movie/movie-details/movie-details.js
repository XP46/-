// pages/movie/movie-details/movie-details.js
var app = getApp();
var util = require('../../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    movies: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var movieId = options.id;
    console.log(movieId)
    var url = app.globalData.doubanBase + '/v2/movie/subject/' + movieId;
    util.http(url,this.processDoubanData);
  },

  viewMoviePostImg:function(e){
    // console.log(e)
    var src =e.currentTarget.dataset.src;
    //预览图片
    wx.previewImage({
      current: src,  //当前显示图片的http链接
      urls: [src],   //需要预览的图片http链接列表
    })
  },
  processDoubanData:function(data){
    console.log(data);
    if(!data){
      return
    }
    //创建导演信息的变量
    var director = {
      avatar:"",
      name:"",
      id:""
    }
    if(data.directors[0] != null){
      if (data.directors[0].avatars != null) {
          director.avatar = data.directors[0].avatars.large
      }
      director.name = data.directors[0].name;
      director.id = data.directors[0].id;
    }
    //电影详情数据
    var movie = {
      movieImg:data.images ? data.images.large : '',//电影海报
      country:data.countries[0],//国家
      title:data.title,//电影名
      originalTitle:data.original_title,//原始名
      wishCount:data.wish_count,//喜欢人数
      commentCount:data.comments_count,//评论数量
      year:data.year,//年份
      generes:data.genres.join("、"), //类型，用"、"隔开
      stars: util.convertToStarsArray(data.rating.stars),//评星
      score:data.rating.average,//评分
      director:director,//导演
      casts: util.convertToCastString(data.casts),//影人
      castInfo: util.convertToCastInfos(data.casts),//影人信息
      summary:data.summary
    }
    console.log(movie)
    this.setData({
      movie: movie
    })
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