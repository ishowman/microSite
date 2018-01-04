//机型平台
var browsers = {
    versions: function() {
        var	u = navigator.userAgent,
            ua = navigator.userAgent.toLowerCase(),
            app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            isweixin:ua.match(/MicroMessenger/i)=="micromessenger",  //是否微信网页
            html5plus:ua.match(/html5plus/)=="html5plus", //app
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase(),
};
/*eg:
if(browserXnb.versions.android){//为android时}
if(browserXnb.versions.ios || browserTouna.versions.iPhone || browserTouna.versions.iPad){//为IOS时}
*/

//验证
var verify = (function(){

    var cb = function(number,reg,callback){
        if(!reg.test(number)){
            callback()
            return;
        }
    };
    var isEmpty = function(obj,callback){
        if(obj == null || typeof obj == "undefined" || obj.length == 0){
            callback();
            return;
        }
    };
    var integer = function(number,callback){ //正整数验证
        var reg = /^\+?[1-9][0-9]*$/;
        cb(number,reg,callback);
    };
    var phone = function(number,callback){ //手机号码验证
        var reg = /^(0|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$/;
        cb(number,reg,callback);
    };
    var email = function(number,callback){ //邮箱验证
        var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        cb(number,reg,callback);
    };
    var idcard = function(number,callback){ //身份证码验证
        var reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
        cb(number,reg,callback);
    };

    var engnum = function(number,callback){ //只能由英文和数字组成
        var reg = /^[a-z0-9]+$/i;
        cb(number,reg,callback);
    };
    var engnumline = function(number,callback){ //只能由英文、数字、下划线组成
        var reg = /^\w+$/;
        cb(number,reg,callback);
    };

    return{
        cb:cb,
        isEmpty:isEmpty,
        integer:integer,        //verify.integer("1",function(){alert("请输入正整数！")});
        phone:phone,            //verify.phone("13128956796",function(){alert("输入手机号码有误！")});
        email:email,            //verify.email("312892923@qq.pw",function(){alert("输入邮箱地址有误！")});
        idcard:idcard,          //verify.idcard("441522199009221051",function(){alert("输入身份证号码有误！")})
        engnum:engnum,          //verify.engnum("441522199009221051",function(){alert("只能由英文和数字组成！")})
        engnumline:engnumline,  //verify.engnumline("441522199009221051",function(){alert("只能由英文、数字、下划线组成！")})
    }

}());

//基本
var base = (function(){

    var extend = function(){
        var cloneObj =function(oldObj){
            if (typeof(oldObj) != 'object') return oldObj;
            if (oldObj == null) return oldObj;
            var newObj = Object();
            for (var i in oldObj)
                newObj[i] = cloneObj(oldObj[i]);
            return newObj;
        };
        var args = arguments;//将传递过来的参数数组赋值给args变量
        if (args.length < 2) return;
        var temp = cloneObj(args[0]); //调用复制对象方法
        for (var n = 1; n < args.length; n++) {
            for (var i in args[n]) {
                temp[i] = args[n][i];
            }
        }
        return temp;
    };
    var hasClass = function(obj, cls){
        return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    };
    var addClass = function(obj, cls){
        if (!this.hasClass(obj, cls)) obj.className += " " + cls;
    };
    var removeClass = function(obj, cls){
        if (this.hasClass(obj, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            obj.className = obj.className.replace(reg, ' ');
        }
    };
    var remove = function(el){
        var obj = document.getElementById(el);
        obj.parentNode.removeChild(obj);
    };
    var getUrlParameter = function(para){ //获取地址参数
        var reg = new RegExp("(^|&)" + para + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        return r?decodeURIComponent(r[2]):null;
    };
    var obj2Str =function(o){ //转换undefined字符
        if(o!=undefined){
            return ""+o;
        }else{
            return "";
        }
    };

    return{
        extend:extend,
        hasClass:hasClass,
        addClass:addClass,
        removeClass:removeClass,
        remove:remove,
        getUrlParameter:getUrlParameter,
        obj2Str:obj2Str,
    }

}());


