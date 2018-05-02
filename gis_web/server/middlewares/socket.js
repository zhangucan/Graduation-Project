import Socket from 'socket.io'
import http from 'http'
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 1337
export const Server = app => {
  console.log('creat socket server')
  var server = http.createServer(app.callback())
  const io = Socket(server)
  // Socket.io的标准用法
  io.on('connection', function(socket) {
    socket.emit('news', { hello: 'world' })
    socket.on('my other event', function(data) {
      console.log(data)
    })
  })
  // 开启服务器
  server.listen(port, host)
  console.info('Now running on localhost:1337')
}
