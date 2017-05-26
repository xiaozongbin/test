/**
 * Created by hasee on 2017/5/25.
 */
var list = function () {

    /*创建滚动条*/
    var myScroll = new IScroll(".scroll-wrapper",{
        click:true,
        scrollbars:true,
        fadeScrollbars:true
    });
    var $proList = $(".pro-list");
    var $classList = $(".class-list");
    var classID = 0; //默认的分类id
    var pageCode=0;
    var linenumber =5;

    return {
        init:function () {
            this.getClassData();
            this.getData();
            this.bindEvent();
        },
        getClassData:function () {
          $.get("http://datainfo.duapp.com/shopdata/getclass.php",function (data) {
              console.log(data)

              var str = "";
              for(var i=0;i<data.length;i++){
                  str+='<li data-id="'+data[i].classID+'">'+data[i].className+'</li>'
              }

              $classList.html(str)
          },"json")
        },
        getData:function () {
            common.showLoading();
            $.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?&classID="+classID+"&pageCode="+pageCode+"&linenumber="+linenumber,function (data) {

                var str = "";

                /*字符串拼接*/
                for(var i=0;i<data.length;i++){
                    str+='<li class="pro-item">' +
                        '<img src="'+data[i].goodsListImg+'"> ' +
                        '<p>'+data[i].goodsName+'</p>' +
                        '<p class="price">' +
                        '<em>￥'+data[i].price+'</em>' +
                        ' <del>'+data[i].price+'</del>' +
                        '</p>' +
                        '</li>'
                }
                if(pageCode==0){
                    //替换数据
                    $proList.html(str);
                }else {
                    //pageCode 不是0 说明是加载更多
                    //数据拼接
                    $proList.html($proList.html()+str);
                }




                /*因为 ，一开始页面没有内容，所有滚动条没有高度，，，，数据加载完成有内容了，就需要更新滚动条*/
                //让滚动条更新
                myScroll.refresh();

                common.hideLoading()
            });

        },
        bindEvent:function () {
            var _this = this;
            /*切换分类*/
            $classList.on("click","li",function () {
               classID =  $(this).attr("data-id");
                /*把页面值0*/
                pageCode = 0;

                //分类发生改变重新获取数据
                _this.getData()
            });

            myScroll.on("scrollEnd",function () {
                console.log(this.y);//当前值
                console.log(this.maxScrollY) //最大值
                if(this.y==this.maxScrollY){
                    //到底了，需要加载更多
                    pageCode++;
                    _this.getData()
                }
            })
        }
    }
}();

list.init()
