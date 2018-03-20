<template>
    <div class="advisory">
      <ul class="chat-record">
        <li></li>
      </ul>
      <input type="text" v-model="question">
      <button type="button" id="send" @click = "send()">发送</button>
    </div>
</template>

<style>
  .advisory{
    min-height:900px;
    margin-top:50px;
    text-align:center
  }
  .chat-record{}
  .chat-record li{background-color:#666;}
</style>
<script>
import io from 'socket.io-client';

    export default {
      data(){
          return{
              question:'',
              socket:''
          }
      },
      mounted(){

      },
      created(){
        this.socket = io.connect('http://localhost');
        this.socket.on('answer',function(data) {
          console.log(data)
        })
      },
      methods:{
        send(){
          this.socket.emit('advisory', this.question);
          this.question=''
        }
      }
    }

</script>
