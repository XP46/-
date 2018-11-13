// pages/movie/movie-more/movie-more.js
var app = getApp();
var util = require('../../../utils/util.js')
Page({
  data: {
    movies: {},
    navigateTitle: "",
    requestUrl: "",
    totalCount:0,
    isEmpty:true,

  },
  onLoad: function (options) {
    //获取三个栏目得具体更多  拿到类型之后才能拿到对应得数据
    var category = options.category;
    this.data.navigateTitle = category;
    console.log(category);
    //根据不同的category加载不同的数据
    var dataUrl = ''
    switch (category) {
      case "正在热映":
        dataUrl = app.globalData.doubanBase +
          "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase +
          "/v2/movie/coming_soon";
        break;
      case "豆瓣Top250":
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
        break;
    }
  
    this.data.requestUrl = dataUrl
    //util.http(dataUrl, this.callBack)
    util.http(dataUrl, this.processDoubanData)
  },

  onReachBottom: function () {
    console.log('加载更多');
    //在这个旧的数据基础上再加多20条
    var nextUrl = this.data.requestUrl + '?start=' + this.data.totalCount + '&count=20';
    util.http(nextUrl, this.processDoubanData)
    wx.showNavigationBarLoading()
    wx.showLoading({
      title: '正在加载',
    })
  },
  onPullDownRefresh: function () {
    console.log('下拉刷新');
    var nextUrl = this.data.requestUrl + '?start=0&count=20';
    //把变量置空
    this.data.movies = {};
    this.data.isEmpty = true;
    this.data.totalCount = 0;
    util.http(nextUrl, this.processDoubanData);
    wx.showNavigationBarLoading()
  },
  
  processDoubanData: function (moviesDouban) {
    console.log(moviesDouban)
    var movies = [];
    //循环3部电影object对象
    for (var idx in moviesDouban.subjects) {
      //  获取处理数据
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      // 处理电影title的长度
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      //创建一个临时的对象放我们的过滤数据
      var temp = {
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id,
        stars: util.convertToStarsArray(subject.rating.stars)
      }
      movies.push(temp)
    }
    var totalMovies = {}

    if (!this.data.isEmpty){
      totalMovies = this.data.movies.concat(movies);
    }else{
      totalMovies = movies;
      this.data.isEmpty = false;
    }
    this.data.totalCount += 20;
    console.log(this)
    wx.hideNavigationBarLoading()
    wx.hideLoading()
    wx.stopPullDownRefresh()
    this.setData({
      movies: totalMovies
    });

  },

  onReady: function (event) {
    //动态设置页面导航栏标题
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    })
  },

  ondetail: function (event) {
    var movieId = event.currentTarget.dataset.movieid
    console.log(event)
    wx.navigateTo({
      url: '../movie-details/movie-details?id=' + movieId
    })

  },
  

})