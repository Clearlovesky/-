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
var drysalteryFileID=href.drysalteryFileID;
// console.log(href);
// console.log(href.drysalteryFileID)
// 模块1 model-1 图片+文章-------------------------------------
$.ajax({
    url:"http://www.mffive.com:8080/drysaltery/getAppById",
    type:"post",
    data:{
         drysalteryFileID:drysalteryFileID
    },
    success:function(data){
        var tplStr1 = template("tpl-1",data);
        // console.log(data);
        // console.log(tplStr1);
        $(".model-1").html(tplStr1); 
        var picUrl=data.obj.picUrl;
         if(picUrl===null){
            $(".img").hide();
         }else{
            $(".img").show();
         }  
    },
    error:function(){
        console.log("请求失败!");
    }
})
