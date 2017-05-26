
/**
 * Created by hasee on 2017/5/26.
 */
var common = {

    loading:null,
    showLoading:function () {
        /* loading只有一个； 单例*/
        if(this.loading){
            /*有的话直接显示*/
            this.loading.show()
        }else {
            /*没有就创建*/
            this.loading = $("<div id='loading'><img src='imgs/w.gif'/></div>");
            this.loading.appendTo(document.body);
        }

    },
    hideLoading:function () {
        this.loading.hide()
    }

};

