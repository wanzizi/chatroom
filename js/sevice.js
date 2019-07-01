var app = require('http').createServer()
var io = require('socket.io')(app)

var PORT = 8081
var newUsers = []
var users = []

var news = []

app.listen(PORT)

// io是我们定义的服务器，监听socket
io.on('connection',function(socket){
    var thisUser = ''
    // 登陆
    socket.on('login',function(data){
        console.log(data)
        if(users.indexOf(data.username)>-1){            
            socket.emit('loginFail',data)
        }else{
            users.push(data.username)
            thisUser = data.username
            socket.emit('loginSuccess',data)
            // 向所有用户广播
            io.sockets.emit('add',data)
        }
    })

    // 接收消息
    socket.on('sendMsg',function(text){
        io.sockets.emit('reciveMsg',{
            username:thisUser,
            text:text
        })
    })

    // 退出登陆
    socket.on('disconnect',function(){
        io.sockets.emit('logout',thisUser)
    })
})



console.log('app is listening')