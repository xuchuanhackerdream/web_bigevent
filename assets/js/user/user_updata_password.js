$(function () {
  var form=layui.form;
  var layer=layui.layer
  form.verify({
    //   定义一个password验证密码
    pwd:[/^[\S]{6,12}$/,'密码必须6~12位且不能出现空格'],
    // 密码必须6~12位且不能出现空格
    samePwd:function(value){
        
        if(value===$('[name=oldPwd]').val()){
            return '两次密码不能一致'
        }
       },
    rePwd:function(value){
        if(value !==$('[name=newPwd]').val()){
            return '两次的密码不一致'
        }
    }
    
  })
// 发起ajax请求 ，重置密码
   $(".layui-form").on('submit',function(e){
    e.preventDefault();
   $.ajax({
     url: "/my/updatepwd",
     type: "post",
     data: $(this).serialize(),
     dataType:'json',
     success:function(res){
         if(res.status !==0){
             return layer.msg('更新密码的请求失败')
         }
         console.log(res.message);
         layer.msg("更新密码成功！");
        //  重置表单
        $(".layui-form")[0].reset()
     }

   });



   });
 










 

});
