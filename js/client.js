(function (){
    var socket = io('ws://localhost:8081')
    var thisUser = ''

    // 登录
    document.querySelector('#J_login').addEventListener('click',function(){
        let username = document.querySelector('#J_username').value.trim()
        if(username){
            socket.emit('login',{username:username})
        }else{
            alert('请填写昵称')
        }
    },false)

    socket.on('loginSuccess',function(data){
        thisUser = data.username
        document.querySelector('#J_login_box').style.display = 'none'
    })
    socket.on('loginFail',function(data){
        document.querySelector('#J_username').value = ''
        alert('昵称重复，请换一个进入聊天')
    })
    socket.on('add',function(data){
        document.querySelector('#J_chat_content').innerHTML+='<p class="tip"> <span class="tip-text">欢迎新朋友 '+data.username+' 加入聊天</span></p>'
    })

    // 发送消息
    document.querySelector('#J_send_chat').addEventListener('click',function(){
        let text = document.querySelector('#J_chat_input').value.trim()
        if(text){
            socket.emit('sendMsg',text)
        }else{
            alert('请填写内容')
        }
    },false)
    socket.on('reciveMsg',function(data){
        document.querySelector('#J_chat_input').value = ''
        document.querySelector('#J_chat_content').innerHTML+='<p class="chat-word"><span class="msg-user '+(data.username===thisUser?'user-right':'user-left')+'">'+data.username+'</span><span class="msg-block '+(data.username===thisUser?'msg-right':'msg-left')+'">'+data.text+'</span></p>'
    })

    // 退出聊天
    socket.on('logout',function(username){
        document.querySelector('#J_chat_content').innerHTML+='<p class="tip"> <span class="tip-text">'+username+' 离开聊天</span></p>'
    })
})()