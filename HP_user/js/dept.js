/*
* @Author: linshuling
* @Date:   2018-04-27 11:22:19
* @Last Modified by:   linshuling
* @Last Modified time: 2018-05-03 15:50:02
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
        //获取医院id及名称
        var hospitalId   = _HP.getUrlParam('hospitalId');
        var hospitalName = _HP.getUrlParam('hospitalName');
        $('.logoText').text(hospitalName);
        //获取科室
        _this.getDept(hospitalId);
        //点击进入医生列表页
        $(document).on('click', '.lookDoctorBtn', function(){
            var deptId   = $(this).closest('.panel-body').find('.deptId').text();
            var deptName = $(this).closest('.panel-info').find('.deptName').text();
            window.location.href = './doctor.html?deptId='+deptId+'&deptName='+deptName;
        })
    },
    //获取科室
    getDept : function(hospitalId){
        var _this = this;
        _service.getDept(hospitalId, function(res){
            _this.renderDept(res);
            console.log(res);
        },function(err){
            console.log(err);
        })
    },
    //渲染科室
    renderDept : function(data){
        var temp = '';
        for(var i=0; i<data.length; i++){
            temp += '<div class="col-xs-12 col-sm-6  panel panel-info">'+
                    '<div class="panel-heading">'+
                    '<h3 class="panel-title deptName">'+ data[i].dept_name +'</h3></div>'+
                    '<div class="panel-body">'+
                    '<p class="deptId hide">'+ data[i].dept_id +'</p>'+
                    '<p>简介：<span>'+data[i].dept_introduction+'</span></p>'+
                    '<button type="button" class="btn btn-link lookDoctorBtn">查看医生</button>'+
                    '<button type="button" class="btn btn-info btn-sm reserveBtn"><a href="'+ this.data.hospitalUrl+'">进入官网</a></button>'+
                    '</div></div>';
        }
        $('.deptContent').empty().append(temp);
        this.initScroll();
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