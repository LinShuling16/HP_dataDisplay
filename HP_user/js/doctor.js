/*
* @Author: linshuling
* @Date:   2018-04-27 11:27:45
* @Last Modified by:   linshuling
* @Last Modified time: 2018-05-03 16:28:37
*/
var page = {
    data : {
        hospitalUrl : window.localStorage.getItem("hospitalUrl")
    },
    init : function(){
        this.bindEvent();
    },
    bindEvent : function(){
        var _this = this;
        //获取科室id及名称
        var deptId   = _HP.getUrlParam('deptId');
        var deptName = _HP.getUrlParam('deptName');
        $('.logoText').text(deptName);
        //获取医生信息
        _this.getDoctor(deptId);
        
    },
    renderDoctor : function(data){
        var temp = '';
        for(var i=0; i<data.length; i++){
            temp += '<div class="col-xs-12 col-sm-6  panel panel-info">'+
                    '<div class="panel-heading">'+
                    '<h3 class="panel-title">'+data[i].doctor_name+'</h3></div>'+
                    '<div class="panel-body panel-body-hospital">'+
                    '<p class="hide doctorId">'+data[i].doctor_id+'</p>'+
                    '<p>职位：<span>'+data[i].doctor_job+'</span></p>'+
                    '<p>专长：<span>'+data[i].specialty+'</span></p>'+
                    '<p>电话：<a href="tel:'+data[i].doctor_tel+'">'+data[i].doctor_tel+'</a></p>'+
                    '<p>简介：<span>'+data[i].doctor_introduction+'</span></p>'+
                    '<button type="button" class="btn btn-info btn-sm reserveBtn"><a href="'+ this.data.hospitalUrl +'">进入官网</a></button>'+
                    '</div></div>';
        }
        $('.doctorContent').empty().append(temp);
        this.initScroll();
    },
    //获取医生信息
    getDoctor : function(deptId){
        var _this = this;
        _service.getDoctor(deptId,function(res){
            _this.renderDoctor(res);
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
$(window).resize(function(){
    page.initScroll();
}); 