/*
* @Author: linshuling
* @Date:   2018-04-24 16:45:03
* @Last Modified by:   linshuling
* @Last Modified time: 2018-04-28 16:01:17
*/
var page = {
    init : function(){
        this.bindEvent();
    },
    bindEvent : function(){
        var _this = this;
        //登录按钮点击
        $('#login_submit').on('click', function(){
            _this.loginSubmit();
        })
        //回车键提交
        $('.login .content').keyup(function(e){
            //keyCode==13表示回车键
            if(e.keyCode === 13){
                _this.loginSubmit();
            }
        });
    },
    loginSubmit : function(){
       var formData = {
                admin    : $.trim($('#userId').val()),
                password : $.trim($('#password').val())
            },
            //表单验证结果
            validateResult = this.loginFormDataValidate(formData);
        //验证成功
        if(validateResult.status){
            //提交
            this.userLogin(JSON.stringify(formData));
        }
        //验证失败
        else{
            //提示
            $('.error-item').removeClass('hide');
            $('.error-msg').text(validateResult.msg);
        }
    },
    //表单验证
    loginFormDataValidate : function(formData){
        var result = {
            status : false,
            msg    : ''
        };
        if(formData.admin === ''){
            result.msg = '账号不能为空';
            return result;
        }
        if(formData.password === ''){
            result.msg = '密码不能为空';
            return result;
        }
        //通过验证,返回正确提示
        result.status = true;
        result.msg = '验证通过';
        return result;
    },
    //登录
    userLogin : function(userInfo){
        _service.userLogin(userInfo,function(res){
            if(res.errcode === 0){
                console.log(res);
                $('.error-item').removeClass('hide');
                $('.error-msg').text('验证成功');
                //跳转到管理员页面
                window.location.href = './index.html';
            }
            else if(res.errcode === -1){
                $('.error-item').removeClass('hide');
                $('.error-msg').text(res.errmsg);
            }
        },function(err){
            console.log(err);
        })
    }
}
 $(function(){
    page.init();
 })