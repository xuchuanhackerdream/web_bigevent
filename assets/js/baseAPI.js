// 注意：每次调用$.get()或$.post()或$.ajax()的时候，会先
// 调用ajaxPrefilter这个函数
// 在这个函数中，可以拿到我们给ajax提供的配置对象
// options：(Object对象)当前AJAX请求的所有参数选项。
$.ajaxPrefilter(function(options){
  //在发起真正ajax请求之前，统一拼接请求的根路径
  console.log(options.url);
  options.url = "http://ajax.frontend.itheima.net"+options.url;
  console.log(options.url);
  // 统一为有权限的接口设置headers请求头
  if(options.url.indexOf('/my/')!==-1){
    options.headers={
      Authorization:localStorage.getItem('token')||''
    }
  }
  // 无论成功还是失败，都会调用complete回调函数
  options.complete=function(res){
    // 在complete回调中，可以使用res.responseJSON拿到服务器响应回来的数据
    if(res.responseJSON.status ===1 &&res.responseJSON.message==='身份认证失败'){
      // 1强制清空token
      localStorage.removeItem('token')
      //2强制跳转到登录页面
      location.href='file:///C:/Users/xc/Desktop/code1/login.html'
    }
  }


})
