require(['../config'],function(){

	//加载需要用到的模块
	require(['jquery'],function($){
		 var userID = localStorage.getItem("userID");
		 console.log(userID);
		$('.con-user .name span').html(userID);
	})
		
		
})
		