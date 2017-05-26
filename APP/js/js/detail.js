
require(['../config'],function(){

	//加载需要用到的模块
	require(['jquery','swiper'],function($,swiper){
		$(function(){
			var $wrapper = $(".swiper-wrapper");
		    /*创建siwper*/
		    var swiper = new Swiper('.swiper-container', {
		        pagination: '.my-pagination',
		        slidesPerView: 3,
		        loop:true
		    });

			var url = window.location.href;
			var params = url.split("?")[1];
			var goodsID = params.split("=")[1];
			//返回上一页
			$(".back").on("click",function(){
				window.location.href = "list.html";
			})
			//获取数据
			$.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",{goodsID:goodsID},function(data){
				
				var imgsUrl = JSON.parse(data[0].imgsUrl);
				var str = "";
				for(var i =0;i<imgsUrl.length;i++){
                    str+='<div class="swiper-slide"><img src="'+imgsUrl[i]+'"></div>'
				};
				$wrapper.html(str);
				var con = `<div class="goodsName">${data[0].goodsName}</div>
							<div class="price">￥${data[0].price}</div>
							<div class="discount">购买人数：${data[0].buynumber}</div>`;
				$(".goods-detail").html(con);
				swiper.update();  // 更新Swiper
                swiper.reLoop(); // 重新对需要循环的slide个数进行计算
			});
			//添加到购物车
			var userID = localStorage.getItem("userID");
			$(".add-cart").on("click",function(){
				if(userID){
					$.ajax({
						type:"post",
						url:"http://datainfo.duapp.com/shopdata/updatecar.php",
						data: {
							userID: userID,
							goodsID: goodsID,
							number:1
						},
						success: function(result){
							if(result==1) {
								alert('购买成功');
							}else{
								alert('购买失败');
							}
						}
					});
					
				}else{
					alert('请登陆');
					window.location.href = "login.html";
				}
				
			});
			
			
		});
	});
});