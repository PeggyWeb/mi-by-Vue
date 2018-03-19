<template>
    <div>
      <input type="text">
      <button type="button" id="send" @click = send()>发送</button>
    </div>
</template>

<style>
</style>
<script src="/socket.io/socket.io.js"></script>
<script>
    export default {
      data(){
          return{

          }
      },
      mounted(){

      },
      methods:{
        connent(){
            var socket = io.connect()
        },
        send(){
            socket.emit('advisory','hello');
          //聊天
          /*var http = require('http');
          var io = require('socket.io')(http);

          io.on('connection',function(socket){
            socket.on("advisory",function(msg){
              io.emit("hahah",msg)
            })
          })*/
        }
      }
    }

</script>
