// 截取分享出来的url里传的值
function subStr(url) {
    var obj = {};
    var str = url.split('?')[1];
    var str2 = str.split('&');
    console.log(str2);
    for (var k in str2) {
        var str3 = str2[k].split('=');
        obj[str3[0]] = str3[1];
    }
    return obj;
}
var href = subStr(window.location.href);
var id=href.id;
// console.log(href);
// console.log(href.drysalteryFileID)
// 模块1 model-1 图片+文章-------------------------------------
var map = new AMap.Map('container', {
    zoom: 13
});
function loadMap(ajaxData) {
  AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], function(PathSimplifier, $) {
      if (!PathSimplifier.supportCanvas) {
          alert('当前环境不支持 Canvas！');
          return;
      }
      var defaultRenderOptions = {
        renderAllPointsIfNumberBelow: -1,
        pathTolerance: 2,
        keyPointTolerance: 0,
        pathLineStyle: {
            lineWidth: 5,
            strokeStyle: 'rgba(248,231,28, 0.8)',
            borderWidth: 2,
            borderStyle: 'rgba(248,231,28, 0.8)',
            dirArrowStyle: true
        },
        pathLineSelectedStyle: {
            lineWidth: 5,
            strokeStyle: 'rgba(248,231,28, 0.6)',
            borderWidth: 2,
            borderStyle: 'rgba(248,231,28, 0.6)',
            dirArrowStyle: true
        },
        startPointStyle: {
            radius: 6,
            fillStyle: 'rgba(248,231,28, 0.6)',
            lineWidth: 6,
            strokeStyle: 'rgba(248,231,28, 0.6)'
        },
        endPointStyle: {
            radius: 6,
            fillStyle: '#fff',
            lineWidth: 8,
            strokeStyle: 'rgba(249,115,160,0.7)',
        },
        keyPointStyle: {
            radius: 3,
            fillStyle: 'rgba(8, 126, 196, 1)',
            lineWidth: 1,
            strokeStyle: '#eeeeee'
        },
        keyPointHoverStyle: {
            radius: 4,
            fillStyle: 'rgba(0, 0, 0, 0)',
            lineWidth: 2,
            strokeStyle: '#ffa500'
        },

    };

      var pathSimplifierIns = new PathSimplifier({
          zIndex: 100,
          //autoSetFitView:false,
          map: map, //所属的地图实例
          getPath: function(pathData, pathIndex) {
            console.log('pathData', pathData.path)
              return pathData.path;
          },
           renderOptions: defaultRenderOptions
      });
      window.pathSimplifierIns = pathSimplifierIns;
      //设置数据
      pathSimplifierIns.setData([{
          path: ajaxData

      }]);
      //对第一条线路（即索引 0）创建一个巡航器
      var navg1 = pathSimplifierIns.createPathNavigator(0, {
          loop: true, //循环播放
          speed: 100000 ,//巡航速度，单位千米/小时
          pathNavigatorStyle: {
              lineWidth:17,
              height:19,
              // content: PathSimplifier.Render.Canvas.getImageContent('image/plane.png'),//自定义巡航器样式
              strokeStyle:"rgba(248,231,28, 0.6)",
              fillStyle:"rgba(248,231,28, 0.6)",
              pathLinePassedStyle:{
               lineWidth: 8,
               strokeStyle:"rgba(248,231,28, 0.6)",
               borderStyle:"rgba(248,231,28, 0.6)",
               borderWidth:"1"
            }
          },

      });
      navg1.start();
  });
}

// 怎么把下面lineArr数据  替换到   上面的path里面
$.ajax({
    url:"http://www.mffive.com:8080/trainInfo/getTrainInfoById",
    type:"post",
    data:{
        id:2
    },
    success:function(data){
        var s=data.obj.currentTrainTime;
        var calorie=data.obj.calorie;
        var distance=data.obj.distance;
        var t;
        // 时间戳转换
        if(s > -1){
            var hour = Math.floor(s/3600);
            console.log(hour)
            var min = Math.floor(s/60) % 60;
            var sec = s % 60;
            if(hour < 10) {
                t = '0'+ hour + ":";
            } else {
                t = hour + ":";
            }
            if(min < 10){t += "0";}
            t += min + ":";
            if(sec < 10){t += "0";}
            t += sec;
        }
        $(".tip li.f-left h2").html(t)
        $(".tip li.f-right h2").html(calorie)
        $(".tip h1 span").html(distance)
        newLine = new Array();
        newLine.push(jQuery.parseJSON(data.obj.line))
        lineArr = new Array();
        for(var i = 0;i<newLine[0].length;i++){
            X =(newLine[0])[i].location_Lng;
            Y = (newLine[0])[i].location_Lat;
            lineArr.push([X,Y])
        }
        console.log('lineArr', lineArr)
      loadMap(lineArr)
    },
    error:function(){
        console.log("请求失败!");
    }
  })