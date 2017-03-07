/******************************* 顶部主导航 *******************************/
$(function(){
    $(document)
        // 当前城市切换
    .on('mouseenter','.header .city',function(){
        $(this).find('.cityList').removeClass('hide');
    })
    .on('mouseleave','.header .city',function(){
        $(this).find('.cityList').addClass('hide');
    })
    .on('click','.header .cityList li',function(){
        var cityName=$(this).text();
        var icon=' <i class="fa fa-angle-down"></i>';
        $(this).parents('.cityList').addClass('hide').siblings('.curCity').html(cityName+icon);
    })
})
/******************************* 登陆表单模态框 *******************************/
$(function () {	
    $(document)
         // 打开登陆模态框
        .on('click','.btn-login',function(){
            $('.docBody').addClass('vague');
            var loginHtml=$('#loginTemplate').html();
            $('#myModal').removeClass('registerModal').addClass('loginModal').html(loginHtml);
            winResize();
            $('#myModal').removeClass('hide').find('.username').focus();
            /*在页面加载后将匹配的元素设置焦点*/
            $('.header .shade').removeClass('hide');
        })
         // 是否记住密码
        .on('click','.loginModal .form-checkbox .checkbox', function () {
            $(this).toggleClass('checked');
            if($(this).hasClass('checked')){
                $(this).siblings('[type=checkbox]').attr({checked:true,value:'true'})
                    .end().find('i').removeClass('fa-square-o').addClass('fa-check-square');
            }else{
                $(this).siblings('[type=checkbox]').attr({checked:false,value:'false'})
                    .end().find('i').removeClass('fa-check-square').addClass('fa-square-o');
            }
        })
        // 登陆表单验证
        // 文本框失去焦点验证
        .on('blur','.loginModal .form-group input',function(){
            loginValid(this)
        })
        // 登陆验证并提交
        .on('click','.loginModal .goLogin',function(){
            var textField=$('.loginModal .username')[0];
            var passwordField=$('.loginModal .password')[0];
            var data={};
            data.username=textField.value;
            data.password=passwordField.value;
            data.remember=$('.loginModal [type=checkbox]').val();
           // if(loginValid(textField)&&loginValid(passwordField)){
                var postUrl=this.form.action;
                var that=this;
               // $.post(postUrl,data,function(res){
                   // if(res.success=='false'){
                       // alert(res.message);
                   // }else{
                        closeModal(that);
                        location.href='myworld.html';
                       // alert(res.message);
                   // }
               // })
           // }
        })
        // 关闭模态框
        .on('click','#myModal .close',function(){
            closeModal(this);
        })
        .on('click','.loginModal .goLegister',function(){
            regModalObj!=undefined&&regModalObj.openModal&&regModalObj.openModal();
        })
})
// 关闭模态框函数
function closeModal(el){
    $(el).parents('#myModal').addClass('hide').html('').removeClass('loginModal registerModal');
    $('.docBody').removeClass('vague');
    $('.header .shade').addClass('hide');
}
// 登陆表单验证函数
function loginValid(inputEle){
    var textVal= $.trim(inputEle.value);
    var fieldType=$(inputEle).attr('type');
    if(fieldType=='text'){
        if(!textVal){
            $(inputEle).siblings('.help').html('<i class="fa fa-times"></i> 账号不能为空！').removeClass('hide');
        }else{
            if(/^([1]([3][0-9]{1}|59|58|70|86|87|88|89)[0-9]{8})|(([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2}))$/.test(textVal)){
                $(inputEle).siblings('.help').html('').addClass('hide');
                return true;
            }else{
                $(inputEle).siblings('.help').html('<i class="fa fa-times"></i> 邮箱或手机号格式不对！').removeClass('hide');
            }
        }
    }else if(fieldType=='password'){
        if(!textVal) {
            $(inputEle).siblings('.help').html('<i class="fa fa-times"></i> 密码不能为空！').removeClass('hide');
        }else{
            if(/[\w_~`!@#\$%\^&\*\(\)\-=\+]{6,20}/.test(textVal)){
                $(inputEle).siblings('.help').html('').addClass('hide');
                return true;
            }else{
                $(inputEle).siblings('.help').html('<i class="fa fa-times"></i> 必须为6-20位字母,数字或符号！').removeClass('hide');
            }
        }
    }
    return false;
}
// 视口大小改变时
function winResize(){
    var $myModal=$('#myModal');
    var navHeight=$('.header').height();
    var winHeight=$(window).height();
    var winWidth=$(window).width();
    if($myModal.length&&($myModal.hasClass('loginModal')||$myModal.hasClass('registerModal'))){
        var modalHeight=$myModal.height();
        var modalWidth=$myModal.width();
        if(modalHeight+navHeight*2>=winHeight){
            $myModal.css({top:navHeight});
        }else{
            $myModal.css({top:(winHeight-modalHeight)/2});
        }
        if(modalWidth>=winWidth){
            $myModal.css({left:0});
        }else{
            $myModal.css({left:(winWidth-modalWidth)/2});
        }
    }
}
window.onresize=winResize;
/******************************* 注册表单模态框 *******************************/
/*
 * ===============================================
 * regModalObj对象的方法描述
 * ===============================================
 * init():初始化模态框，必须先调用此方法，初始化对象属性和模态框元素事件
 * $scope:模态框最外层元素的jquery包装对象
 * openModal():打开模态框
 * nextStep():进入下一步，前提是通过验证
 * validField($input,reg,helpText1,helpText2):验证输入域数据
 * validCheckbox():验证模拟的复选框是否选中
 * isIdentical($password,$repassword):验证两个密码输入框值是否相同
 * checkboxClick():复选框单击，选中与取消选中
 * checkStrength():检测密码强度
 * finish():完成注册
 * */
var regModalObj={
    $scope:null,
    // 打开注册模态框
    openModal:function(){
        $('.docBody').addClass('vague'); // 添加模糊效果
        var registerHtml=$('#registerTemplate').html(); // 注册模板
        var formHtml=$('#subFormTemplate').html(); // 注册表单模板
        $('#myModal').removeClass('loginModal').addClass('registerModal').html(registerHtml)
        winResize();
        $('#myModal').find('.modalBody').html(formHtml).end() .removeClass('hide')
            .find('.phone').focus(); // 显示模态框
        $('.header .shade').removeClass('hide'); // 显示顶部导航栏遮罩层
    },
    // 下一步操作之前 验证必须通过
    nextStep:function(){
        var $phone=this.$scope.find('#registerForm .phone');
        var $email=this.$scope.find('#registerForm .email');
        var $password=this.$scope.find('#registerForm .password');
        var $repassword=this.$scope.find('#registerForm .repassword');
        // 验证
        if(this.validField($phone,/^[1]([3][0-9]{1}|59|58|70|86|87|88|89)[0-9]{8}$/,'手机号不能为空！','手机号格式不正确！')&&
            this.validField($email,/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/ ,'邮箱不能为空！','邮箱格式不正确！')&&
            this.validField($password,/^[\w_~`!@#\$%\^&\*\(\)\-=\+]{6,20}$/,'密码不能为空！','密码必须为6-20位字母,数字或符号')&&
            this.isIdentical($password,$repassword)&&this.validCheckbox()){
            // 验证通过，可以进行下一步了
            var data=this.$scope.find('#registerForm').serialize();  // 序列化表单数据
            var postUrl=this.$scope.find('#registerForm')[0].action;
            var that=this;
           // $.post(postUrl,data,function(res){
               // if(res.success=='false'){
                   // alert(res.message)
               // }else{
                    var formHtml=$('#subFormNextTemplate').html();
                    var $progressBar=that.$scope.find('.progressBar span');
                    var $circle=that.$scope.find('.circle span').eq(0);
                    var cirWidth=$circle.width();
                    that.$scope.find('.modalBody').html(formHtml);
                    $progressBar.css({width:$progressBar.parent().width()/2-cirWidth/2}); // 更新进度条位置
                    that.$scope.find('.vercode').focus(); // 让验证码文本框得到焦点
                //}
           // })
        }
    },
    // 验证文本框方法
    validField:function($input,reg,helpText1,helpText2){
        /*
        * $input:jquery文本框包装对象
        * reg:正则表达式,不需要请传递一个返回false的值
        * helpText1:非空验证提示
        * helpText2:正则验证提示
        * */
        var value= $.trim($input[0].value);
        var $help=$input.siblings('.help');
        var icon='<i class="fa fa-times"></i> ';
        if(!value){
            $help.html(icon+helpText1).removeClass('hide');
            return false;
        }else{
            if(reg&&!reg.test(value)){
                $help.html(icon+helpText2).removeClass('hide');
                return false;
            }
        }
        $help.html('').addClass('hide');
        return true;
    },
    // 验证模拟复选框
    validCheckbox:function(){
        var $checkbox=this.$scope.find('#registerForm .checkbox');
        var $help=$checkbox.siblings('.help');
        var helpText='<i class="fa fa-times"></i> 请同意本协议！';
        var checked=$checkbox.attr('aria-checked');
        if(checked=='false'){
            $help.html(helpText).removeClass('hide');
            return false;
        }
        $help.html('').addClass('hide');
        return true;
    },
    // 比较密码输入框的值
    isIdentical:function($password,$repassword){
        var val1=$password.val();
        var val2=$repassword.val();
        var $help=$repassword.siblings('.help');
        var helpText='<i class="fa fa-times"></i> 两次输入的密码不一致！'
        if(val1!=val2){
            $help.html(helpText).removeClass('hide');
            return false;
        }
        $help.html('').addClass('hide');
        return true;
    },
    // 模拟复选框的单击
    checkboxClick:function(){
        var $par=$(this).parents('.checkbox');
        var checked=$par.attr('aria-checked');
        if(checked=='false'){
            $par.attr('aria-checked','true');
            $(this).removeClass('fa-square-o').addClass('fa-check-square');
        }else{
            $par.attr('aria-checked','false');
            $(this).removeClass('fa-check-square').addClass('fa-square-o');
        }
    },
    // 密码强度校验
    checkStrength:function() {
        /*
         * 纯数字:弱
         * 数字加字母:中
         * 数字加字母加符号:强
         * */
        var value = this.value;
        var $strength=$(this).siblings('.strength');
        if (value.length >=6&&value.length<=20){ // 强
            if(/^[\w_~`!@#\$%\^&\*\(\)\-=\+]*[_~`!@#\$%\^&\*\(\)\-=\+]+[\w_~`!@#\$%\^&\*\(\)\-=\+]*$/.test(value)){
                $strength.find('b').eq(2).addClass('active').siblings('b').removeClass('active');
            }else if(/^[0-9a-zA-Z]*[a-zA-Z]+[0-9a-zA-Z]*$/.test(value)){ // 中
                $strength.find('b').eq(1).addClass('active').siblings('b').removeClass('active');
            }else if(/^\d+$/.test(value)){ // 弱
                $strength.find('b').eq(0).addClass('active').siblings('b').removeClass('active');
            }
        }else{
            $strength.find('b').removeClass('active');
        }
    } ,
    // 注册完成
    finish:function(){
        var $vercode=this.$scope.find('.vercode');
        if(this.validField($vercode,/[0-9a-zA-Z]{4}/,'验证码不能为空！','验证码必须为4位字母或数字')){
            var formHtml=$('#subFormFinishtTemplate').html();
            var $progressBar=this.$scope.find('.progressBar span');
            var $circle=this.$scope.find('.circle span').eq(0);
            var cirWidth=$circle.width();
            this.$scope.find('.modalBody').html(formHtml);
            $progressBar.css({width:$progressBar.parent().width()*3/4-cirWidth/2}); // 更新进度条位置
        }
    },
    // 初始化
    init:function(){
        this.$scope=$('#myModal');
        var that=this;
        $(document)
            // 打开模态框
            .on('click','.btn-register',that.openModal)
            // 注册 下一步
            .on('click','.registerModal .goNext',that.nextStep.bind(that))
            // 注册完成
            .on('click','.registerModal .btn-finish',that.finish.bind(that))
            // 是否同意协议
            .on('click','.registerModal .checkbox .fa',that.checkboxClick)
            // 校验密码强度
            .on('keyup','.registerModal .password',that.checkStrength)
            // 手机号码校验
            .on('blur','.registerModal .phone',function(){
                that.validField.call(that,$('.registerModal .phone'),/^[1]([3][0-9]{1}|59|58|70|86|87|88|89)[0-9]{8}$/,'手机号不能为空！','手机号格式不正确！');
            })
            // 邮箱校验
            .on('blur','.registerModal .email',function(){
                that.validField.call(that,$('.registerModal .email'),/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/ ,'邮箱不能为空！','邮箱格式不正确！');
            })
            // 手机号码校验
            .on('blur','.registerModal .password',function(){
                that.validField.call(that,$('.registerModal .password'),/^[\w_~`!@#\$%\^&\*\(\)\-=\+]{6,20}$/,'密码不能为空！','密码必须为6-20位字母,数字或符号!');
            })
            // 密码校验
            .on('blur','.registerModal .repassword',function(){
                var $password=that.$scope.find('#registerForm .password');
                that.isIdentical($password,$(this));
            })
    }
}
$(function(){
    regModalObj.init();
})
/******************************* 首页地图 云朵 *******************************/
var homeMapObj={
    // 让云朵动起来
    cloudAnimate:function($cloud,option){
        var top,left;
        var that=this;
        $cloud.tid=setInterval(function(){
            top=$cloud.position().top;
            left=$cloud.position().left;
            top+=option.stepX;
            left+=option.stepY;
            $cloud.css({ top:top,left:left });
            if(left>=that.w||top>=that.h){
                that.removeCloud($cloud);
            }
            that.addCloud($cloud);
        },option.interval)
    },
    // 添加云朵
    addCloud:function($cloud){
        var that=this;
        if($cloud.position().top>=$cloud.height()&&!$cloud.tag){
            $img=$('<img>');
            $img.load(function(){
               // var top=Math.random()*40;
                var left=Math.random()*(that.w-this.width);
                $(this).css({top:0,left:left}).hide().appendTo($cloud.parent()).fadeIn(1000);
            })
            $img.attr('src',$cloud.attr('src'));
            this.cloudAnimate($img,{stepX:1,stepY:1,interval:30});
            $cloud.tag=1;
        }
    },
    // 移除云朵
    removeCloud:function($cloud){
        if($cloud.position().top>=this.h-$cloud.height()||
        $cloud.position().left>=this.w-$cloud.width()){
            $cloud.fadeOut(300,function(){
                $(this).remove();
                clearInterval($cloud.tid);
            });
        }
    },
    // 初始化
    init:function(){
        this.$scope=$('.docBody .map');
        this.clouds=this.$scope.find('.clouds img');
        len=this.clouds.length;
        for(var i=0;i<len;i++){
            var $cloud=this.clouds.eq(i);
            $cloud.initTop=$cloud.position().top;
            $cloud.initLeft=$cloud.position().left;
            //this.cloudAnimate($cloud,{stepX:1,stepY:1,interval:30});
        }
        this.cvs=this.$scope.find('canvas')[0];
        this.ctx=this.cvs.getContext('2d');
        this.w=this.$scope.width();
        this.h=this.$scope.height();
        var that=this;
    }
}
$(function(){
    homeMapObj.init();
})