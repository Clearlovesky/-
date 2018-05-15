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
var coachID=href.coachID;
var id=href.id;
// console.log(href);
// console.log(coachID)
// 
// 模块1 model-1 本店课程信息-------------------------------------
$.ajax({
    url:"http://www.mffive.com:8080/cmpCoachClass/getClassDetail",
    type:"post",
    data:{
         coachID:coachID,
         id:id
    },
    success:function(data){
        var tplStr1 = template("tpl-1",data);
        // console.log(data);
        // console.log(tplStr1);
        $(".model-1").html(tplStr1);   
    },
    error:function(){
        console.log("请求失败!");
    }
})
// 模块2 model-2 商户信息+年卡内容+购买须知-------------------------------------
$.ajax({
    url:"http://www.mffive.com:8080/cmpCoachClass/getClassDetail",
    type:"post",
    data:{
         coachID:coachID,
         id:id
    },
    success:function(data){
        var tplStr2 = template("tpl-2",data);
        // console.log(data);
        // console.log(tplStr2);
        $(".father").html(tplStr2);   
    },
    error:function(){
        console.log("请求失败!");
    }
})