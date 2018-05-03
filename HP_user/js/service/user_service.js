/*
* @Author: linshuling
* @Date:   2018-04-24 15:44:49
* @Last Modified by:   linshuling
* @Last Modified time: 2018-05-02 08:31:49
*/
/*====
    HP健康平台-用户页面相关请求接口
====*/
var _service = {
    //获取医院列表信息
    getHospital : function(resolve, reject){
        _HP.request({
            url     : _HP.getServerUrl('/Hospital/hospital/list'),
            success : resolve,
            error   : reject
        })
    },
   //模糊查询医院
    searchHospital : function(hospitalName,resolve, reject){
         _HP.request({
            url     : _HP.getServerUrl('/Hospital/hospital/search'),
            data    : {
                name     : hospitalName
            },
            success : resolve,
            error   : reject
        })
    },
    //获取科室列表信息
    getDept : function(hospitalId, resolve, reject){
        _HP.request({
            url     : _HP.getServerUrl('/Hospital/dept/list'),
            data    : {
                hospital_id : hospitalId
            },
            success : resolve,
            error   : reject
        })
    },
    //获取医生列表信息
    getDoctor : function(deptId, resolve, reject){
        _HP.request({
            url     : _HP.getServerUrl('/Hospital/doctor/list'),
            data    : {
                dept_id     : deptId
            },
            success : resolve,
            error   : reject
        })
    }
} 