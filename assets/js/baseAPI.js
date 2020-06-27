// 注意：每次调用$.get()或$.post()或$.ajax()的时候，会先
// 调用ajaxPrefilter这个函数
// 在这个函数中，可以拿到我们给ajax提供的配置对象
// options：(Object对象)当前AJAX请求的所有参数选项。
$.ajaxPrefilter(function(options){
  //在发起真正ajax请求之前，统一拼接请求的根路径
  console.log(options.url);
  options.url = "http://ajax.frontend.itheima.net"+options.url;
  console.log(options.url)
})
