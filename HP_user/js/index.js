/*
* @Author: linshuling
* @Date:   2018-04-26 16:08:36
* @Last Modified by:   linshuling
* @Last Modified time: 2018-05-03 16:27:56
*/
var page = {
    data :{},
    init : function(){
        this.sliderInit();
        this.getHospital(1);
        this.bindEvent();
    },
    bindEvent : function(){
        var _this = this;
        //查看医院科室
        $(document).on('click','.lookDeptBtn', function(){
            var hospitalId   = $(this).closest('.panel-body').find('.hospitalId').text();
            var hospitalName = $(this).closest('.panel-info').find('.hospitalName').text();
            var hospitalUrl  = $(this).closest('.panel-body').find('.hospitalUrl').attr('href');
            //将医院网址存储到本地
            _HP.localStorage('hospitalUrl',hospitalUrl);
            //跳转到医院科室页面
            window.location.href = './dept.html'+'?hospitalId='+hospitalId+'&hospitalName='+hospitalName;
        })
        //查询医院
        $(document).on('click','.searchHospitalBtn',function(){
            _this.searchHospital();
        })
        //回车键提交查询
        $('header .container').keyup(function(e){
            //keyCode==13表示回车键
            if(e.keyCode === 13){
                _this.searchHospital();
            }
        });
    },
    //轮播图初始化
    sliderInit : function(){
        var _this = this;
        var $slider = $('.banner').unslider({
            speed: 1000,               //  每张幻灯片动画的速度（以毫秒为单位）
            delay: 2000,               //  幻灯片动画之间的延迟（以毫秒为单位）
            complete: function() {
                _this.initScroll();
            },                         //  在每个幻灯片动画之后调用的函数
            keys: true,                //  启用键盘（左，右）箭头快捷键
            dots: true,                //  显示点导航
            fluid: true                //  支持响应式设计。 可能打破无响应的设计
        });
        // 前一张和后一张操作的事件绑定
        $('.banner-con .banner-arrow').click(function(){
            var forward = $(this).hasClass('prev') ? 'prev' : 'next';
            $slider.data('unslider')[forward]();
        });
    },
    //获取医院信息
    getHospital : function(){
        var _this = this;
        _service.getHospital(function(res){
            _this.data.hospitalData = res;
            _this.renderHospital(res);
            // _this.renderSelectH(res.data);
        },function(err){
            _HP.error(err);
        })
    },
    //渲染医院信息
    renderHospital : function(data){
        var temp = '';
        for(var i=0; i<data.length; i++){
            temp += '<div class="col-xs-12 col-sm-6 panel panel-info">'+
                    '<div class="panel-heading">'+
                    '<h3 class="panel-title hospitalName">'+data[i].hospital_name+'</h3></div>'+
                    '<div class="panel-body">'+
                    '<p class="hide hospitalId">'+data[i].id+'</span></p>'+
                    '<p>等级：<span>'+data[i].hospital_grade+'</span></p>'+
                    '<p>地址：<span>'+data[i].hospital_address+'</span></p>'+
                    '<p>急救电话：<a href="tel:'+data[i].emergency_tel+'">'+data[i].emergency_tel+'</a></p>'+
                    '<p>服务电话：<a href="tel:'+data[i].s_tel+'">'+data[i].s_tel+'</a></p>'+
                    '<p>简介：<span>'+data[i].hospital_introduction+'</span></p>'+
                    '<button type="button" class="btn btn-link lookDeptBtn">查看科室</button>'+
                    '<button type="button" class="btn btn-info btn-sm reserveBtn"><a class="hospitalUrl" href="'+data[i].hospital_web+'">进入官网</a></button>'+
                '</div></div>';
        }
        $('.hospitalContent').empty().append(temp);
        this.initScroll();
    },
    //查询医院
    searchHospital : function(){
        var _this = this;
        var name = $.trim($('#searchHospitalInput').val());
        _service.searchHospital(name,function(res){
            if(res.length === 0){
                alert('没有该医院');
            }else{
                _this.renderHospital(res);
            }
        },function(err){
            console.log(err);
        })
    },
    initScroll : function(){
        $('.panel-body').niceScroll({
            cursorcolor  : "#eee",
            autohidemode : true
        });
        $(".panel-body").getNiceScroll().show();
        $(".panel-body").getNiceScroll().resize();
    }
}
$(function(){
    page.init();
})