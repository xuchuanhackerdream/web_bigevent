$(function () {

  
  // 点击去注册的连接
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });


  // 点击去登陆的链接
  $("#link_login").on("click", function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });


  // 从layui中获取form对象
  var form=layui.form;
  var layer=layui.layer;
  // 通过verify()函数自定义校验规则
  form.verify({
    // 自定义一个叫pwd的校验规则
    pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
    // 定义一个验证pwd的校验规则
    repwd:function(value){
      // 通过形参拿到确认密码框中的内容
      // 还需要拿到密码框的内容
      // 然后进行一次等于的判断
      // 如果判断失败，则return一个提示信息
      var pwd=$('.reg-box [name=password]').val();
      if(pwd !==value){
        return '两次密码不一致'
      }
    }
  })

  // 监听注册表单的提交事件
  $('#form_reg').on('submit',function(e){
    // 阻止默认行为
    e.preventDefault()
    // 发起ajax请求
    $.ajax({
      url:'/api/reguser',
      data:{
        username:$('#form_reg [name=username]').val(),
        password:$('#form_reg [name=password]').val()
      },
      type:'post',
      dataType:'json',
      success:function(res){
        if(res.status !==0){
          return layer.msg(res.message)
          
        }
        layer.msg('注册成功，请登录')
        // 模拟人的点击事件
        $('#link_login').click()
      }
    })
  })
  // 监听登录表单的提交事件
  $('#form_login').submit(function(e){
    // 阻止默认行为
    e.preventDefault();
    $.ajax({
      url: "/api/login",
      data:$(this).serialize(),
      type:'post',
      dataType:'json',
      success:function(res){
        if(res.status !==0){
          return layer.msg('登录失败')
        }
        layer.msg('登录成功');
        
        // 将登录成功得到的token字符串保存到localStorage中
        localStorage.setItem('token',res.token)
        // 跳转到后台主页
        location.href='./index.html'
      }
    });
  })
});
