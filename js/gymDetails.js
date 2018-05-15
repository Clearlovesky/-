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
var cmpID=href.cmpID;
// console.log(href);
// console.log(cmpID)
// 模块1 model-1 本店信息-------------------------------------
$.ajax({
    url:"http://www.mffive.com:8080/fiveCmpInfo/getFiveCmpById",
    type:"post",
    data:{
         cmpID:cmpID
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
// 模块2 model-2 本店优惠-------------------------------------
$.ajax({
    url:"http://www.mffive.com:8080/fiveCmpInfo/getFiveCmpById",
    type:"post",
    data:{
         cmpID:cmpID
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