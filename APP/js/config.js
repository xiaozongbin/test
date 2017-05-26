/*
	配置文件
*/

require.config({
	baseUrl: 'js',
	paths: {
		"jquery": "lib/jquery.1.11.3.min",
		"swiper":"lib/swiper-3.4.2.jquery.min",
		"common":"plug/common"
	},
	shim: {
		"swiper":{
			deps:['jquery'],
			exports: "swiper"
		},
		"common":{
			deps:['jquery'],
			exports: "common"
		}
		
		/*"jquery.drag": {
			deps: [],//依赖
			exports: "" //声明暴露接口
		}*/
	}
});