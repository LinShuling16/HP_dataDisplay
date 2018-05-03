/*
* @Author: linshuling
* @Date:   2018-04-24 16:58:05
* @Last Modified by:   linshuling
* @Last Modified time: 2018-05-02 17:40:12
*/
'use strict';
var page = {
    data : {
        hospitalData : '',
        deptData     : '',
        doctorData   : ''
    },
    init : function(){
        this.getHospital();
        this.bindEvent();
    },
    bindEvent : function(){
        var _this = this;
        //tab切换初始化
        $(document).on('click','#Tabs a',function(e){
            e.preventDefault();
            $(this).tab('show');
        })
        //查询医院
        $(document).on('click','.searchHospitalBtn',function(){
            _this.to_searchHospital();
        })
         //回车键查询
        $('.pane_search').keyup(function(e){
            //keyCode==13表示回车键
            if(e.keyCode === 13){
               _this.to_searchHospital();
            }
        });
        //添加医院
        $(document).on('click','.addHospitalBtn', function(){
            $('#hospitalModal .submitUpdataHospital').addClass('hide');
            $('#hospitalModal .submitAddHospital').removeClass('hide');
            _this.reset('#hospitalModal');        
        })
        //查看/编辑医院
        $(document).on('click','.updataHospitalBtn', function(){
            $('#hospitalModal .submitAddHospital').addClass('hide');
            $('#hospitalModal .submitUpdataHospital').removeClass('hide');
            //获取当前医院的信息
            var index = $(this).closest('.hospital_line').find('.hospitalIndex').text();
            var thisHospitalData = _this.data.hospitalData[index];
            //医院数据回填
            _this.backfillHospitalData(thisHospitalData);
        })
        //提交新添加的医院
        $(document).on('click','.submitAddHospital',function(){
            var dataArr         = [];
            var data            = _this.getHospitalModel();
            var validateResult  = _this.dataValidate(data);
            if(validateResult.status){
                dataArr.push(_this.getHospitalModel());
                var hospital = {
                    hospital :dataArr
                };
                _service.addHospital(JSON.stringify(hospital),function(res){ 
                    if(res.errcode === 0){
                        $('#hospitalModal').modal('hide');
                        _this.getHospital();
                        alert('操作成功！');
                    }else{
                        alert('操作失败！');
                    }
                },function(err){
                    console.log(err);
                });
            }else{
                alert(validateResult.msg);
            } 
        })
        //提交修改的医院信息
        $(document).on('click','.submitUpdataHospital',function(){
            var data = _this.getHospitalModel();
            var hospitaId = $('#m_hospitalId').val();
            data.id = parseInt(hospitaId);
            _service.updataHospital(JSON.stringify(data),function(res){
                if(res.errcode === 0){
                    $('#hospitalModal').modal('hide');
                    _this.getHospital();
                    alert('操作成功！');
                }else{
                    alert('操作失败！');
                }
            },function(err){
                console.log(err);
            })
        })
        //删除医院
        $(document).on('click','.delHospitalBtn',function(){
            var hospitalId = $(this).closest('.hospital_line').find('.hospitalId').text();
            _service.delHospital(hospitalId,function(res){
                if(res.errcode === 0){
                    _this.getHospital();
                    alert('操作成功！');
                }else{
                    alert('操作失败！');
                }
            },function(err){
                console.log(err);
            })
        })
        //添加科室
        $(document).on('click','.addDeptBtn', function(){
            $('#deptModal .submitUpdataDept').addClass('hide');
            $('#deptModal .submitAddDept').removeClass('hide');
            _this.reset('#deptModal');          
        })
        //查看/编辑科室
        $(document).on('click','.updataDeptBtn', function(){
            $('#deptModal .submitAddDept').addClass('hide');
            $('#deptModal .submitUpdataDept').removeClass('hide');
            //获取当前科室的信息
            var index = $(this).closest('.dept_line').find('.deptIndex').text();
            var thisDeptData = _this.data.deptData[index];
            //科室数据回填
            _this.backfillDeptData(thisDeptData);
        })
        //提交新添加的科室
        $(document).on('click','.submitAddDept',function(){
            var deptData        = _this.getDeptModel();
            var validateResult  = _this.dataValidate(deptData);
            if(validateResult.status){
                var data     = {
                    hospital_id : _this.data.dept_hospitaId,
                    dept        : [deptData]
                }
                _service.addDept(JSON.stringify(data),function(res){
                    if(res.errcode === 0){
                        $('#deptModal').modal('hide');
                        _this.getDept(_this.data.dept_hospitaId);
                        alert('操作成功！');
                    }else{
                        alert('操作失败！');
                    }
                },function(err){
                    console.log(err);
                })
            }else{
                alert(validateResult.msg);
            }            
        })
        //提交修改的科室信息
        $(document).on('click','.submitUpdataDept',function(){
            var data = _this.getDeptModel();
            data.hospital_id = _this.data.dept_hospitaId;
            data.dept_id     = $('#m_deptId').val();
            _service.updataDept(JSON.stringify(data),function(res){
                if(res.errcode === 0){
                    $('#deptModal').modal('hide');
                    _this.getDept(_this.data.dept_hospitaId);
                    alert('操作成功！');
                }else{
                    alert('操作失败！')
                }
            },function(err){
                console.log(err);
            })
        })
        //删除科室
        $(document).on('click','.delDeptBtn',function(){
            var deptId = $(this).closest('.dept_line').find('.deptId').text();
            _service.delDept(deptId,function(res){   
                if(res.errcode === 0){
                    _this.getDept(_this.data.dept_hospitaId);
                    alert('操作成功！');
                }else{
                    alert('操作失败！')
                }
            },function(err){
                console.log(err);
            })
        })
        //添加医生
        $(document).on('click','.addDoctorBtn', function(){
            $('#doctorModal .submitUpdataDoctor').addClass('hide');
            $('#doctorModal .submitAddDoctor').removeClass('hide');
            _this.reset('#doctorModal');       
        })
        //查看/编辑医生
        $(document).on('click','.updataDoctorBtn', function(){
            $('#doctorModal .submitAddDoctor').addClass('hide');
            $('#doctorModal .submitUpdataDoctor').removeClass('hide');
            //获取当前医生的信息
            var index = $(this).closest('.doctor_line').find('.doctorIndex').text();
            var thisDoctorData = _this.data.doctorData[index];
            //医生数据回填
            _this.backfillDoctorData(thisDoctorData);
        })
        //提交新添加的医生
        $(document).on('click','.submitAddDoctor',function(){
            var doctorData = _this.getDoctorModel();
            var validateResult  = _this.dataValidate(doctorData);
            if(validateResult.status){
                var data     = {
                    dept_id : _this.data.deptId,
                    doctor  : [doctorData]
                }
                _service.addDoctor(JSON.stringify(data),function(res){
                    if(res.errcode === 0){
                        $('#doctorModal').modal('hide');
                        _this.getDoctor(_this.data.deptId);
                        alert('操作成功！');
                    }else{
                        alert('操作失败！');
                    }
                },function(err){
                    console.log(err);
                })
            }else{
                alert(validateResult.msg);
            }         
        })
        //提交修改的医生信息
        $(document).on('click','.submitUpdataDoctor',function(){
            var doctorData = _this.getDoctorModel();
            var validateResult  = _this.dataValidate(doctorData);
            if(validateResult.status){
                doctorData.doctor_id = $('#m_doctorId').val();
                var data     = {
                    dept_id : _this.data.deptId,
                    doctor  : [doctorData]
                }
                _service.updataDoctor(JSON.stringify(data),function(res){
                    if(res.errcode === 0){
                        $('#doctorModal').modal('hide');
                        _this.getDoctor(_this.data.deptId);
                        alert('操作成功！');
                    }else{
                        alert('操作失败！');
                    }
                },function(err){
                    console.log(err);
                })
            }else{
                alert(validateResult.msg);
            }         
        })
        //删除医生
        $(document).on('click','.delDoctorBtn',function(){
            var doctorId = $(this).closest('.doctor_line').find('.doctorId').text();
            _service.delDoctor(doctorId,function(res){   
                if(res.errcode === 0){
                     _this.getDoctor(_this.data.deptId);
                    alert('操作成功！');
                }else{
                    alert('操作失败！')
                }
            },function(err){
                console.log(err);
            })
        })
        //选择医院获取科室信息
        $(document).on('change','.dept_selectHospital', function(){
            var hospitaId    = $(this).find('option:selected').val();
            var hospitalName = $(this).find('option:selected').text();
            $('#deptAd .b_hospital').text(hospitalName);
            if(hospitaId === '00'){
                $('.addDeptBtn').addClass('hide');
                $('.table_dept tbody').empty();
                return;
            }
            _this.data.dept_hospitaId = hospitaId;
            _this.getDept(hospitaId);
        })
        //选择医院及科室获取医生信息
        //选择医院
        $(document).on('change','.doctor_selectHospital', function(){
            var hospitaId = $(this).find('option:selected').val();
            var hospitalName = $(this).find('option:selected').text();
            $('#doctorAd .b_hospital').text(hospitalName);
            $('.addDoctorBtn').addClass('hide');
            if(hospitaId !== '00'){
                _service.getDept(hospitaId,function(res){
                    _this.renderSelectD(res);
                },function(err){
                    console.log(err);
                })
            }
        })
        //选择科室
        $(document).on('change', '.selectDept',function(){
            var deptId   = $(this).find('option:selected').val();
            var deptName = $(this).find('option:selected').text();
            $('#doctorAd .b_dept').text(deptName);
            if(deptId === '00'){
                $('.addDoctorBtn').addClass('hide');
                $('.table_doctor tbody').empty();
                return;
            }
            _this.data.deptId = deptId;
            _this.getDoctor(deptId);
        })
    },
    //输入框清空
    reset : function(ele){
        $(ele +' input').each(function(){
            $(this).val('');
        })
        $(ele +' textarea').each(function(){
            $(this).val('');
        })  
    },
    //获取医院信息
    getHospital : function(){
        var _this = this;
        _service.getHospital(function(res){
            _this.data.hospitalData = res;
            //渲染医院
            _this.renderHospital(res);
            //渲染下拉选择框
            _this.renderSelectH(res);
        },function(err){
            _HP.error(err);
        })
    },
    //获取科室信息
    getDept : function(hospitaId){
        var _this = this;
        _service.getDept(hospitaId,function(res){
            _this.data.deptData = res;
            //渲染科室内容
            _this.renderDept(res);
            //显示添加科室按钮
            $('.addDeptBtn').removeClass('hide');
        },function(err){
            console.log(err);
        })
    },
    //获取医生信息
    getDoctor : function(deptId){
        var _this = this;
        _service.getDoctor(deptId,function(res){
            $('.addDoctorBtn').removeClass('hide');
            _this.data.doctorData = res;
            _this.renderDoctor(res);
        },function(err){
            console.log(err);
        })
    },
    //渲染医院信息
    renderHospital : function(data){
        var temp = '';
        for(var i=0; i<data.length; i++){
            temp += '<tr class="hospital_line">'+
                        '<td class="hospitalId hide">'+data[i].id+'</td>'+
                        '<td class="hospitalIndex hide">'+ i +'</td>'+
                        '<td>'+data[i].hospital_name+'</td>'+
                        '<td>'+data[i].hospital_grade+'</td>'+
                        '<td>'+data[i].hospital_address+'</td>'+
                        '<td><a href="'+data[i].hospital_web+'" target="_blank">'+data[i].hospital_web+'</a></td>'+
                        '<td>'+
                            '<button type="button" class="btn btn-primary btn-xs updataHospitalBtn" data-toggle="modal" data-target="#hospitalModal">查看/编辑</button>'+
                            // '<button type="button" class="btn btn-primary btn-xs">查看科室</button>'+
                            '<button type="button" class="btn btn-primary btn-xs btn-warning delHospitalBtn">删除</button>'+
                        '</td></tr>';                 
        }
        $('.table_hospital tbody').empty().append(temp);
    },
    //渲染医院下拉选择
    renderSelectH : function(data){
        var selectH = '<option value="00">请选择医院</option>';
        for(var i=0; i<data.length; i++){
            selectH += '<option value="'+ data[i].id +'">'+ data[i].hospital_name + '</option>';
        }
        $('.selectHospital').empty().append(selectH);
    },
    //渲染科室下拉选择
    renderSelectD : function(data){
        var selectD = '<option value="00">请选择科室</option>';
        for(var i=0; i<data.length; i++){
            selectD += '<option value="'+ data[i].dept_id +'">'+ data[i].dept_name + '</option>';
        }
        $('.selectDept').empty().append(selectD);
    },
    to_searchHospital:function(){
        var _this = this;
        var name = $.trim($('#searchHospitalInput').val());
        _service.searchHospital(name,function(res){
            if(res.length === 0){
                alert('没有该医院');
                $('#searchHospitalInput').val('');
            }else{
                _this.renderHospital(res);
            }
        },function(err){
            console.log(err);
        })
       
    },
    //模糊查询医院
    searchHospital : function(hospitalName){
        _service.searchHospital(hospitalName, function(res){
            console.log(res);
        },function(err){
            _HP.error(err);
        })
    },
    //医院数据回填
    backfillHospitalData : function(data){
        $('#m_hospitalId').val(data.id);
        $('#m_hospitalName').val(data.hospital_name);
        $('#m_hospitalGrade').val(data.hospital_grade);
        $('#m_hospitalAddress').val(data.hospital_address);
        $('#m_hospitalUrl').val(data.hospital_web);
        $('#m_hospitalSTel').val(data.s_tel);
        $('#m_hospitalETel').val(data.emergency_tel);
        $('#m_hospital').val(data.hospital_introduction); 
    },
    //科室数据回填
    backfillDeptData : function(data){
        $('#m_deptId').val(data.dept_id);
        $('#m_deptName').val(data.dept_name);
        $('#m_dept').val(data.dept_introduction);
    },
    //医生数据回填
    backfillDoctorData : function(data){
        $('#m_doctorId').val(data.doctor_id);
        $('#m_doctorName').val(data.doctor_name);
        $('#m_doctorJob').val(data.doctor_job);
        $('#m_doctorTel').val(data.doctor_tel);
        $('#m_doctorSpecialt').val(data.specialty);
        $('#m_doctor').val(data.doctor_introduction);
    },
    //渲染科室
    renderDept : function(data){
        var temp = '';
        for(var i=0; i<data.length; i++){
            temp += '<tr class="dept_line">'+
                        '<td class="deptIndex hide">'+ i +'</td>'+
                        '<td class="deptId hide">'+data[i].dept_id+'</td>'+
                        '<td>'+data[i].dept_name+'</td>'+
                        '<td>'+data[i].dept_introduction+'</td>'+
                        '<td>'+
                            '<button type="button" class="btn btn-primary btn-xs updataDeptBtn" data-toggle="modal" data-target="#deptModal">查看/编辑</button>'+
                            // '<button type="button" class="btn btn-primary btn-xs">查看医生</button>'+
                            '<button type="button" class="btn btn-primary btn-xs btn-warning delDeptBtn">删除</button>'+
                        '</td></tr>';             
        }
        $('.table_dept tbody').empty().append(temp);
    },
    //渲染医生
    renderDoctor : function(data){
        var temp = '';
        for(var i=0; i<data.length; i++){
            temp += '<tr class="doctor_line">'+
                        '<td class="doctorIndex hide">'+ i +'</td>'+
                        '<td class="doctorId hide">'+data[i].doctor_id+'</td>'+
                        '<td>'+data[i].doctor_name+'</td>'+
                        '<td>'+data[i].doctor_job+'</td>'+
                        '<td>'+data[i].doctor_tel+'</td>'+
                        '<td>'+data[i].specialty+'</td>'+
                        '<td>'+data[i].doctor_introduction+'</td>'+
                        '<td>'+
                            '<button type="button" class="btn btn-primary btn-xs updataDoctorBtn" data-toggle="modal" data-target="#doctorModal">查看/编辑</button>'+
                            '<button type="button" class="btn btn-primary btn-xs btn-warning delDoctorBtn">删除</button>'+
                        '</td></tr>';
        };
        $('.table_doctor tbody').empty().append(temp);
    },
    //获取医院模态框内容
    getHospitalModel : function(){
        var data = {
            hospital_name           : $.trim($('#m_hospitalName').val()),
            hospital_grade          : $.trim($('#m_hospitalGrade').val()),
            hospital_address        : $.trim($('#m_hospitalAddress').val()), 
            hospital_web            : $.trim($('#m_hospitalUrl').val()),
            s_tel                   : $.trim($('#m_hospitalSTel').val()),
            emergency_tel           : $.trim($('#m_hospitalETel').val()),
            hospital_introduction   : $.trim($('#m_hospital').val())
        }
        return data;
    },
    //获取科室模态框内容
    getDeptModel : function(){
        var data = {
            dept_name           : $.trim($('#m_deptName').val()),
            dept_introduction   : $.trim($('#m_dept').val())
        }
        return data;
    },
    //获取医生模态框内容
    getDoctorModel : function(){
        var data = {
            doctor_name         : $.trim($('#m_doctorName').val()),
            doctor_job          : $.trim($('#m_doctorJob').val()),
            doctor_tel          : $.trim($('#m_doctorTel').val()),
            specialty           : $.trim($('#m_doctorSpecialt').val()),
            doctor_introduction : $.trim($('#m_doctor').val())
        }
        return data;
    },
    //验证
    dataValidate : function(data){
        var result = {
            status : false,
            msg    : ''
        }
        for(var item in data){
            if(data[item] === ''){
                result.msg = '信息不能为空，可填写“无”';
                return result;
            }
        }
        result.status = true;
        return result;
    },
}
$(function(){
    page.init();
})