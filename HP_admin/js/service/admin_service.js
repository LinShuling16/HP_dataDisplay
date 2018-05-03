/*
* @Author: linshuling
* @Date:   2018-04-24 15:44:16
* @Last Modified by:   linshuling
* @Last Modified time: 2018-05-02 15:22:26
*/
'use strict';
/*====
    HP健康平台-管理员页面相关请求接口
====*/
var _service = {
    //管理员登录
    userLogin : function(userInfo, resolve, reject){
        _HP.request({
            url     : _HP.getServerUrl('/Hospital/admin/login'),
            method  : 'post',
            data    : {
                json : userInfo
            },
            success : resolve,
            error   : reject
        });
    },
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
    //新增医院
    addHospital : function(hospitalInfo, resolve, reject){
        _HP.request({
            url     : _HP.getServerUrl('/Hospital/hospital/add'),
            method  : 'post',
            data    : {
                json : hospitalInfo
            },
            success : resolve,
            error   : reject
        });
    },
    //删除医院
    delHospital : function(hospitaId,resolve, reject){
         _HP.request({
            url     : _HP.getServerUrl('/Hospital/hospital/delete'),
            data    : {
                hospital_id : hospitaId
            },
            success : resolve,
            error   : reject
        })
    },
    //修改医院信息
    updataHospital : function(hospitalInfo, resolve, reject){
        _HP.request({
            url     : _HP.getServerUrl('/Hospital/hospital/update'),
            method  : 'post',
            data    : {
                json : hospitalInfo
            },
            success : resolve,
            error   : reject
        });
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
    //新增科室
    addDept : function(deptInfo, resolve, reject){
        _HP.request({
            url     : _HP.getServerUrl('/Hospital/dept/add'),
            method  : 'post',
            data    : {
                json : deptInfo
            },
            success : resolve,
            error   : reject
        });
    },
    //删除科室
    delDept : function(deptId,resolve, reject){
         _HP.request({
            url     : _HP.getServerUrl('/Hospital/dept/delete'),
            data    : {
                dept_id: deptId
            },
            success : resolve,
            error   : reject
        })
    },
    //修改科室信息
    updataDept : function(deptInfo, resolve, reject){
        _HP.request({
            url     : _HP.getServerUrl('/Hospital/dept/update'),
            method  : 'post',
            data    : {
                json : deptInfo
            },
            success : resolve,
            error   : reject
        });
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
    },
    //新增医生
    addDoctor : function(doctorInfo, resolve, reject){
        _HP.request({
            url     : _HP.getServerUrl('/Hospital/doctor/add'),
            method  : 'post',
            data    : {
                json : doctorInfo
            },
            success : resolve,
            error   : reject
        });
    },
    //删除医生
    delDoctor : function(doctorId, resolve, reject){
         _HP.request({
            url     : _HP.getServerUrl('/Hospital/doctor/delete'),
            data    : {
                doctor_id: doctorId
            },
            success : resolve,
            error   : reject
        })
    },
    //修改医生信息
    updataDoctor : function(doctorInfo, resolve, reject){
        _HP.request({
            url     : _HP.getServerUrl('/Hospital/doctor/update'),
            method  : 'post',
            data    : {
                json : doctorInfo
            },
            success : resolve,
            error   : reject
        });
    }
} 