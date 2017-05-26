require(['../config'],function(){

	//加载需要用到的模块
	require(['jquery'],function($){
		
	var cart = {
		goodsNum:$('.goodsnum'),
		conCart : $('.con-cart'),
		userID : localStorage.getItem("userID"),
		
		init:function(){
			var _this = this;
			$.getJSON("http://datainfo.duapp.com/shopdata/getCar.php?callback=?",{userID:this.userID},function(data){
				console.log(data);
				_this.goodsNum.html(data.length);	
				var str ='';
				for(var i = 0; i<data.length;i++){
					str +=`
						<ul class="cart-item" data-id="${data[i].goodsID}">
							<li class="cart-news">
								<div class="goods-img">
									<img src="${data[i].goodsListImg}" alt="包包" />
								</div>
								<div class="goods-con">
									<div class="goods-name">
										<a href="javascript:;">${data[i].goodsName}</a>
									</div>
									<div class="td-price">
										<span>单价：</span>
										<span  class="corlor">￥</span>
										<span class="goods-price corlor">${data[i].price}</span>
									</div>
									<div class="td-amount-wrapper ">
										<p>数量：</p>
										<span class="amount-option amount-decrease">-</span>
										<input class="amount-option amount-input" type="text" value="${data[i].number}">
										<span class="amount-option amount-increase">+</span>
									</div>
								</div>
								<div class="iconfont delete"><a href="javascript:;">&#xe648;</a></div>
							</li>
						</ul>
					`
				}
				$('.con-cart').html(str);
				_this.handleMoney();
			});
			this.increase();
			this.decrease();
			this.deleteList();
			this.addGoodsNumber();
			
			
		},
		
		addGoodsNumber:function(goodsID,num){
			$.get(
				'http://datainfo.duapp.com/shopdata/updatecar.php?callback=?',
				{
					userID:this.userID,
					goodsID:goodsID,
					number:num
				},
				function(data){
					console.log(data);
				}
			)
		},
		//增加数量
		increase:function(){
			var _this =this;
			this.conCart.on('click','.amount-increase',function(){
				var num = parseInt($(this).prev().val() );
				console.log(num);
				num++;
				$(this).prev().val(num);
				_this.handleMoney();
			})
		},
		//减少数量
		decrease:function(){
			var _this =this;
			this.conCart.on('click','.amount-decrease',function(){
				var num = parseInt($(this).next().val());
				if(num<=1) return;
				num--;
				$(this).next().val(num);
				_this.handleMoney();
			});
		},
		//价格增加
		handleMoney : function(){
			var money =0;
			var _this =this;
			$('.cart-item').each(function(){
				var m = $(this).find('.goods-price').html()*$(this).find('.amount-input').val();
				money +=parseFloat( m );
				
			})
			$('.total').html(money.toFixed(2));
		},
		//删除
		deleteList:function(){
			var _this=this;
			this.conCart.on('click','.delete',function(){
				if(confirm('确定删除宝贝吗？')){
					//页面删除
					$(this).parents('.cart-item').remove();
					//数据删除
					var id = $(this).parents('.cart-item').data('id');
					_this.addGoodsNumber(id,0);
					
					var num = parseInt(_this.goodsNum.html());
					num--;
					_this.goodsNum.html(num);
					_this.handleMoney();
				}
			})
		}
		
	};
	cart.init();
		
		
		
	});
	
});
		