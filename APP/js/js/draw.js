
require(['../config'],function(){

	//加载需要用到的模块
	require(['jquery'],function($){
		$(function(){
			var index = 0;
			var count = 0;
			var fruit = "";
			var userID = localStorage.getItem("userID");
			//后退
			$(".back").on("click",function(){
				window.location.href = "list.html"
			});
			//点击抽奖
			if(userID){
				$(".draw").on("click",function(){
					var timer = setInterval(function(){
						var totaltime = parseInt(Math.random()*32 +8)*200;
						index++;
						count++;
						index = index%$("img").length;
						$("img").eq(index).css("border-color","red")
						.parent().siblings().find("img").css("borderColor","#fff");
						if(count >= totaltime/200){
							
							clearInterval(timer);
							fruit =	$("img").eq(index).attr("fruit")
							count=0;
							//抽奖结果
							$.ajax({
								type:"post",
								url:"http://datainfo.duapp.com/lottery/fruitsubmit.php",
								data: {
									userID: userID,
									fruit: fruit
								},
								
								success: function(result){
									if(result==1) {
										alert('恭喜您抽到'+fruit);
									}if(result==0) {
										alert('对不起，您没有抽奖次数');
									}
									$.getJSON("http://datainfo.duapp.com/lottery/getsuerfr.php?callback=?",function(data){
										var str ="";
										for(var i = 0;i<data.length;i++){
											str +=`<li>
														<span class="prize">奖品${data[i].fruit}</span>
														<span class="userID">${data[i].userID}</span>
														<span class="time">${data[i].timer}</span>
													</li>`;
										}
										$(".footer ul").html(str);
									})
								}
								
							});
							
						}
					},200);
					//获取中奖名单
				})
			}else{
				alert(请登录);
				window.location.href = "login.html"
			}
			
			//获取中奖名单
			
			$.getJSON("http://datainfo.duapp.com/lottery/getsuerfr.php?callback=?",function(data){
				var str ="";
				
				for(var i = 0;i<data.length;i++){
					str +=`<li>
								<span class="prize">奖品${data[i].fruit}</span>
								<span class="userID">${data[i].userID}</span>
								<span class="time">${data[i].timer}</span>
							</li>`;
				}
				$(".footer ul").html(str);
			})
		});
	});
});