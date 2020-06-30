$(function () {
  // 获取用户的基本信息
  getUserInfo();

  //  设置退出事件
  $("#btnLogout").on("click", function () {
    //eg1
    layer.confirm("确定要退出吗?", { icon: 3, title: "提示" }, function (index) {
      //do something
      // 1清空本地存储的token
      localStorage.removeItem('token');
      // 2跳转到首页
      location.href = "file:///C:/Users/xc/Desktop/code1/login.html";
      // 关闭confirm询问框
      layer.close(index);
    });
    
  
  });
});
// 获取用户的基本信息
function getUserInfo() {
  $.ajax({
    type: "get",
    url: "/my/userinfo",
    dataType: "json",
    //   headers就是请求头配置对象
    // headers:{
    //   Authorization:localStorage.getItem('token')||''
    // },
    success: function (res) {
      console.log(res);
      
      if (res.status !== 0) {
        return layer.msg("获取用户信息失败");
      }
      // 调用renderAvatar渲染用户的头像
      renderAvatar(res.data);
    },
    // 无论成功还是失败最终都会调用complete回调函数
    // complete:function(res){
      // console.log('执行了complete回调函数');
      // console.log(res)
      // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
      // if(res.responseJSON.status===1&&res.responseJSON.message==='身份认证失败！'){
        // 1强制清空token
        // localStorage.removeItem('token');
        // 2强制转换到登录页面
    //     location.href='/login.html'
    //   }
    // }
  });
}
// 渲染用户的头像;
function renderAvatar(user) {
  // 1获取用户的名称
  var name = user.nickname || user.username;
  // 2设置用户的文本
  $("#welcome").html("欢迎&nbsp;&nbsp" + name);
  // 3渲染用户的头像
  if (user.user_pic !== null) {
    // 3.1渲染图片图像
    $(".layui-nav-img").attr("src", user.user_pic).show();
    $(".text-avatar").hide();
  } else {
    // 3.2渲染文本头像
    $(".layui-nav-img").hide();
    var first = name[0].toUpperCase();
    $(".text-avatar").html(first).show();
  }
}

