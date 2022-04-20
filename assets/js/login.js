$(function() {
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function() {
            $('.reg-box').hide()
            $('.login-box').show()
        })
        //引入laiyui就会自动生成layui对象 
    let form = layui.form
        //利用layui.form的verify方法创建校验规则
    form.verify({
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            //两次密码一致校验
            repwd: function(value) {
                let pwd = $('.reg-box [name=password]').val()
                if (pwd !== value) return '两次密码不一致'
            }
        })
        //监听注册事件
    $('#from_reg').on('submit',
        function(e) {
            e.preventDefault()
            const url = 'api/reguser'
            const data = {
                username: $('#from_reg [name=username]').val(),
                password: $('#from_reg [name=password]').val()
            }
            $.post(url, data, function(res) {
                //layui 弹出层layer.msg
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg('注册成功，请登录！')
                    //自动跳转到登录页面
                $('#link_login').click()
            })
        })

    //监听登录事件
    $('#from_login').submit(function(e) {
        e.preventDefault()

        $.ajax({
            url: 'api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg('登陆成功')
                layer.msg('登陆成功')
                    //将token存到本地存储中
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }

        })
    })
})