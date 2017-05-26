
require(['../config'],function(){
	require(['jquery'],function($){
		
		var regS = {
			uname : false,
			psw : false
		};
		var unameInput = $('form .account'),
			pswInput = $('form .password'),
			pswCheck = $('form .psw-check'),
			regBtn = $('.btn-reg');
		//用户名	
		
		unameInput.blur(function(){
			var uname = unameInput.val();
			regS.uname=true;
			if (!unameInput.val().length){
				$('.con1').html('*用户名格式错误');
				regS.uname = false;
				return;
			}else{
				$('.con1').html('*用户名可用');
			}
		});
		//密码
		var regPsw = /^[\w!@#$%^&*_+]{6,16}$/;
		pswInput.on('input',function(){
			var psw = pswInput.val();
			regS.psw = true;
			if(!regPsw.test(psw)){
				$('.con2').html("*密码不合法");
				regS.psw = false;
			}else{
				$('.con2').html("*密码合法");
			}
		});
		//判断密码是否正确
		pswCheck.on('blur',function(){
			var psw = pswInput.val();
			regS.psw = true;
			if (psw != pswCheck.val()) {
				$('.con3').html('*密码不一致');
				regS.psw = false;
			}else{
				$('.con3').html('*密码一致');
			}
		});
		
		
		regBtn.click(function(){
			for(var i in regS){
				if(!regS[i]){
					alert('部分数据不合格');
					return;
				}
			};
			$.ajax({
				type:'post',
				url:'http://datainfo.duapp.com/shopdata/userinfo.php',
				data:{
					status:'register',
					userID:unameInput.val(),
					password:pswInput.val()
				},
				success:function(result){
					if(result==0){
						alert('用户名已存在');
					}
					if(result == 1){
						alert('注册成功');
						window.location.href = "login.html";
					}
				}
			})
		})
		
		
		
		
	})
		
})