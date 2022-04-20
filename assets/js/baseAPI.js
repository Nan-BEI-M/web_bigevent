//jquery里在发起请求之前 都会调用ajaxPrefilter
//利用它能够提前拼接 配置对象
$(function() {
    $.ajaxPrefilter(function(options) {
        // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
        options.url = 'http://ajax.frontend.itheima.net' + options.url
    })
})