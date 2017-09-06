/*  设置cookie @expireTime 多少秒    */
var setCookie = function (name, value, expiredTime) {
    var date = new Date();
    date.setSeconds(date.getDate() + expiredTime);
    expiredTime = (expiredTime == null || expiredTime) ? "" : ";expires=" + date.toUTCString();
    document.cookie = name + "=" + escape(value) + expiredTime + ";path=/";
}
//获取cookie
var getCookie = function (name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
//删除cookie
var delCookie = function (name) {
    var result = this.getCookie(name);
    if (result) {
        var exp = new Date();
        exp.setTime(exp.getDate() - 1);
        document.cookie = name + "=" + result + ";expires=" + exp.toGMTString() + ";path=/";
    }
}