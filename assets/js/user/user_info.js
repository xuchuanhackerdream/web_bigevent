$(function(){
     var form = layui.form;
     var layer = layui.layer;
     form.verify({
       nickname: function (value) {
         if (value.length > 6) {
           return "昵称长度必须在1~6字符之间";
         }
       },
     });
     // 调用初始化用户信息的方法
     initUserInfo();
     // 初始化用户信息
     function initUserInfo() {
       $.ajax({
         type: "get",
         dataType: "json",
         url: "/my/userinfo",
         success: function (res) {
           if (res.status !== 0) {
             return layer.msg("获取用户信息失败");
           }
           // console.log(res)
           // 调用form.val()快速为表单赋值
           console.log(1);
           form.val("formUserInfo", res.data);
         },
       });
     }
    //  重置表单的数据
     $('#btnReset').on('click',function(e){
        //  阻止表单的默认重置行为
         e.preventDefault();
         initUserInfo();

     })
    //  更新用户基本信息
    $(".layui-form").on('submit',function(e){
        e.preventDefault();
        $.ajax({
            url:'/my/userinfo',
            type:'POST',
            dataType:'json',
            data:$(this).serialize(),
            
            success:function(res){
                if(res.status !==0){
                    return layer.msg('获取用户信息失败')
                }
                layer.msg("获取用户信息成功");
                console.log(res.message)
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserinfo()
            }
            
        })
    })
    
   })
