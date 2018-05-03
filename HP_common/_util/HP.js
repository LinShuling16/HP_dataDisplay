/*
* @Author: linshuling
* @Date:   2018-04-24 15:13:21
* @Last Modified by:   linshuling
* @Last Modified time: 2018-04-29 14:54:34
*/
'use strict';
var conf = {
    serverHost : 'http://10.10.0.239:3000'
};
var _HP = {
    // 网络请求
    request : function(param){
        var _this = this;
        $.ajax({
            type     : param.method || 'get',
            url      : param.url    || '',
            dataType : param.type   || 'json',
            data     : param.data   || '',
            success  : function(res){
                typeof param.success === 'function' && param.success(res);
            },
            error    : function(err){
                typeof param.error === 'function' && param.error(err);
            }
        });
    },
    // 获取服务器地址
    getServerUrl : function(path){
        return conf.serverHost + path;
    },
    // 获取 url
    getUrl : function(){
        var result = window.location.href;
        return result ? decodeURIComponent(result) : null;
    },
     //获取url参数
    getUrlParam : function(name){
        var reg    = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        //search 从问号 (?) 开始的 URL（查询部分）
        var result = window.location.search.substr(1).match(reg);
        //为什么这里是result[2] 2？
        return result ? decodeURIComponent(result[2]) : null;
    },
    //使用localStorage存储本地数据(key,value)
    localStorage : function(key,value){
        var _this = this;
        if(window.localStorage){
            var storage = window.localStorage;
            if((value != 'undefined') && (value != '')){
                storage.setItem(key,value);
            }
        }else{
           alert("不支持localStorage");
        }
    },
    // 成功提示
    success : function(msg){
        console.log(JSON.stringify(msg) || '操作成功！');
    },
    // 错误提示
    error : function(err){
        console.log(JSON.stringify(err) || '操作失败！');
    }
};