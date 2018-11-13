function convertToStarsArray(stars) {
  // 30只要3 50只要5 把第一个数字去掉
  var num = stars.toString().substring(0, 1);//取得分数的个位数
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    }
    else {
      array.push(0);
    }
  }
  return array;
};

function http(url,callBack){
  var that = this;
  //发送http请求
  wx.request({
    url: url, 
    data: {
    },
    method:'GET',
    header: {
      'content-type': 'json' // 默认值
    },
    success:function(res) {
      callBack(res.data)
    },
    fail:function(error){
      console.log(error)
    },
    complete:function(){
    }
  })
};

function convertToCastString(casts){
  var castsjoin = "";
  for(var idx in casts){
    castsjoin = castsjoin + casts[idx].name + "/";
  }
  return castsjoin.substring(0,castsjoin.length - 2);
};

function convertToCastInfos(casts){
  var castsArray = []
  for (var idx in casts){
    var cast = {
      img:casts[idx].avatars ? casts[idx].avatars.large : "",
      name:casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

module.exports = {
  convertToStarsArray: convertToStarsArray,
  http:http,
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos
}
