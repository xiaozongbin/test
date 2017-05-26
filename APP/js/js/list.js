
require(['../config'],function(){

	//加载需要用到的模块
	
	
	require(['jquery',"common"],function($,common){
		$(function(){
			//点击跳转
			$('.header button').on('click',function(){
				window.location.href = "cart.html";
			})
			
			
			$(".goods-type").on("click","li",function(){
				$(this).addClass("active")
				.siblings().removeClass("active");
			}); 
			
			/*创建滚动条*/
		    var myScroll = new IScroll(".scroll-wrapper",{
		        click:true,
		        scrollbars:true,
		        fadeScrollbars:true
		    });
		    //加载分类
		    $.get("http://datainfo.duapp.com/shopdata/getclass.php",function (data) {
              var str = "";
              for(var i=0;i<data.length;i++){
                  str+='<li data-id="'+data[i].classID+'">'+data[i].className+'<span></span></li>'
              }
              $classList.html(str)
          	},"json")
		    
		    var userID = localStorage.getItem("userID");
		    var $proList = $(".goods-list");
		    var $classList = $(".goods-type");
		    var classID = 0; //默认的分类id
		    var pageCode=0;
		    var linenumber =5;
			
			var aData = [];
			var list = {
				init:function(){
					this.getData();
					this.changeClass();
					this.loadMore();
					this.addHistory();
				},
				getData:function(){
					common.showLoading();
					$.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?&classID="+classID+"&pageCode="+pageCode+"&linenumber="+linenumber,function(data){
						aData = data;
						var str = "";
						for(i = 0; i<data.length;i++){
							str +=`<li class="goods-item">
									<div>
										<a href="javascript:;" data-id="${data[i].goodsID}"><img src="${data[i].goodsListImg}"/></a>
										<p>${data[i].goodsName}</p>
										<p class="price">￥${data[i].price} <span>999</span></p>
									</div>
								</li>`
						}
						
						if(pageCode==0){
		                    //替换数据
		                    $proList.html(str);
		                }else {
		                    
		                    $proList.html($proList.html()+str);
		                }
		                /*因为 ，一开始页面没有内容，所有滚动条没有高度，，，，数据加载完成有内容了，就需要更新滚动条*/
		                //让滚动条更新
		                myScroll.refresh();
		
		                common.hideLoading()
					});
				},
				//切换类
				changeClass:function(){
					var _this = this;
		          	$classList.on("click","li",function () {
		               classID =  $(this).attr("data-id");
		                /*把页面值0*/
		                pageCode = 0;
		                //分类发生改变重新获取数据
		                _this.getData()
		            });
				},
				//加载更多
				loadMore:function(){
					var _this = this;
					myScroll.on("scrollEnd",function () {
						
		                if(this.y >=this.maxScrollY){
		                    //到底了，需要加载更多
		                    pageCode++;
		                   	_this.getData()
		                }
		            })
				},
				//加入历史记录
				addHistory:function(){
					$(".goods-list").on("click","a",function(){
						var id = $(this).attr("data-id");
						if(userID){
							var proData = {};
							for(var i=0;i<aData.length;i++){
								if(aData[i].goodsID==id){
									proData = aData[i];
									break;
								}
							};
							var proHistory = JSON.parse(localStorage.getItem("proHistory")||'[]');
							
							for(var i=0;i<proHistory.length;i++){
								if(proHistory[i].goodsID==id){
									proHistory.splice(i,1);
								}
							}
							proHistory.unshift(proData);
							console.log(proHistory);
							localStorage.setItem("proHistory",JSON.stringify(proHistory))
							window.location.href = "detail.html?goodsID="+id;
						}else{
							alert('请登陆');
							window.location.href = "login.html";
						}
						
					})
				}
			}
			
			list.init();




                
		
          	
          	
            
            
			
		});
	});
});