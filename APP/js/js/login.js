
require(['../config'],function(){
	require(['jquery'],function($){
		//console.log(1);
		$('.btn-login').click(function(){
			var account = $('.account').val();
			var psw = $('.password').val();
			
			if(account=='' || psw == ''){
				alert('用户名或者密码不能为空');
				return;
			}
			
			//登录
			$.ajax({
				type:'post',
				url:'http://datainfo.duapp.com/shopdata/userinfo.php',
				data:{
					status:'login',
					userID:account,
					password:psw
				},
				success:function(result){
					console.log(result)
					if(result==0 || result==2){
						alert('登录失败');
					}else{
						
						alert('登录成功');
						localStorage.setItem("userID",account);
						window.location.href = "list.html";
					}
				}
			})
		})
		
		
		
	});
		
});