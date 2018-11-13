var util = require('../../utils/util.js')
var app = getApp();
Page({
  //Restful API JSON
  //SOAP XML
  /**
   * 页面的初始数据
   */
  data: {
    //用对象存数据绑定给template
    inTheaters: {},
    comingSoon: {},
    top250: {},
    search_key:"",      //输入框value
    searchResult:{},    //查询结果
    searchPanelShow:false,  //隐藏搜索面板
    containerShow:true       //电影栏目
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&count=3";


    this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映");  //获取正在热映
    this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");  //获取即将热映
    this.getMovieListData(top250Url, "top250", "豆瓣Top250");       //获取top250
  },

  //获取电影数据
  getMovieListData: function (url, settedKey, categoryTitle) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "Content-Type": "application/xml"
      },

      //调用成功的回调函数
      success: function (res) {
        that.processDoubanData(res.data, settedKey, categoryTitle)
      },
       //调用失败的回调函数
      fail: function (error) {
        console.log(error)
      },
    })
  },

  //定义函数过滤有用数据
  processDoubanData: function (moviesDouban, settedKey, categoryTitle) {
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      //  获取处理数据
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      //创建一个临时的对象放我们的过滤数据
      //[1,1,1,0,0][1,1,1,1,1]
      var temp = {
        //绑定评星数据
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,  //评分
        coverageUrl: subject.images.large, //海报图片
        movieId: subject.id
      }
      movies.push(temp)
    }
    var readyData = {};
    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      movies: movies //再座一层循环 每个里面都有movies
    };
    this.setData(readyData);
    console.log(readyData)
  },

  ondetail: function (event){
    var movieId = event.currentTarget.dataset.movieid
    console.log(event)
    wx.navigateTo({
      url: 'movie-details/movie-details?id='+movieId
    })
  },
  
  openMore:function(event){
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'movie-more/movie-more?category=' + category,
    })
  },
  //输入框聚焦事件
  onBindFocus:function(event){
    // console.log("我被点击了")
    this.setData({
      containerShow:false,
      searchPanelShow:true
    })
  },
  
  //输入框失焦事件
  onBindBlur:function(event){
    //获取用户的搜索内容
    var text = event.detail.value;
    //用户按下回车进行搜索，接口数据
    var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text;
    this.getMovieListData(searchUrl,"searchResult","");
    this.setData({
      search_key:text
    })
  },

  //取消事件
  onCanelImgTap:function(event){
    this.setData({
      containerShow:true,
      searchPanelShow:false,
      searchResult:{},
      search_key: "",
    })
  },

  //清空输入框
  searchDelete:function(event){
    this.setData({
      search_key: "",
      containerShow: false,
      searchPanelShow: true
    })
  }
  
})