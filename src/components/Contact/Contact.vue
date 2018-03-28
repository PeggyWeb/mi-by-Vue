<template>
    <div class="advisory">
      <div class="chat-contact fl">
        <div class="user-info">
          <span>andy</span>
        </div>
        <ul class="chat-member">
          <li :class="to == chat?'active':''" @click="to = chat" v-for="chat in chatList">{{chat}}</li>
        </ul>
      </div>
      <div class="chat-content fl">
        <div class="chat-header">大米</div>
        <div class="chat-main">
          <ul class="chat-record" ref="record">
            <li>小米：<span>您好</span></li>
            <li class="user"><span>这个怎么买</span>：用户</li>
            <li>小米：<span>打折后是980</span></li>
            <li class="user"><span>好的</span>：用户</li>
            <li v-for="con in answer" :class="con.name==to?'':'user'">
             {{con.name==to?con.name:''}}<span> {{con.message}}</span>
            </li>
          </ul>
          <div class="chat-operate">
            <textarea type="text" v-model="question">
            </textarea>
            <button type="button" id="send" @click = "send()">发送</button>
          </div>
        </div>
        <div class="question-list">
          <span class="nothing">暂无数据</span>
        </div>
      </div>

    </div>
</template>

<style lang="scss" rel="stylesheet/scss">
  .advisory{
    width:1000px;
    height:500px;
    margin:50px auto;
    .chat-contact{
      width:200px;
      height:100%;
      .user-info{
        padding:12px 5px;
        font-size:20px;
        background-color:#ff6700;
        color:#fff;
      }
      .chat-member{
        height:450px;
        background-color:rgb(54,62,71);
        li{
          height:50px;
          padding:5px;
          line-height:40px;
          color:#fff;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          &.active{
            background-color:rgb(47,52,62);
          }
        }

      }
    }
    .chat-content{
      width:800px;
      height:100%;
      background-color:#fff;
      .chat-header{
        height:50px;
        padding:0 10px;
        line-height:50px;
        border-bottom:1px solid #ddd;
      }
      .chat-main{
        width:560px;
        float: left;
        .chat-record{
          height:300px;
          border-bottom:1px solid #ddd;
          padding:10px;
          overflow-y:auto;
          li{
            margin-bottom:10px;
            &.user{text-align:right}
            span{
              display: inline-block;
              padding:10px;
              background-color:#eee;
            }
          }
        }
        .chat-operate{
          position:relative;
          textarea{
            width:100%;
            height:150px;
            border:0;
          }
          button{
            position:absolute;
            right:10px;
            bottom:10px;
            padding:8px 20px;
            background-color:#ff6700;
            color:#fff;
          }
        }
      }
      .question-list{
        width:240px;
        height:450px;
        float:left;
        border-left:1px solid #ddd;
        text-align:center;
        .nothing{line-height: 500px;}
      }
    }
  }

</style>
<script>

import io from 'socket.io-client';
import {getCookie} from "@/util/util";
    export default {
      data(){
          return{
            chatList:['大米','admin','Lily'],
            question:'',
            socket:'',
            answer:[],
            to:'',
            from:''
          }
      },
      computed:{

      },
      mounted(){

      },
      created(){
        this.init();
      },
      updated(){
        this.init();
      },
      methods:{
        init(){
          this.from = getCookie('userName');
          this.socket = io.connect('http://localhost');
          this.socket.on('answer',(data,belong)=> {
            console.log(this.answer);
            this.answer.push({
              name:belong,
              message:data
            });
            this.$nextTick(()=>{
              this.$refs.record.scrollTo(this.$refs.record.scrollHeight);
            })
          })
        },
        send(){
          this.socket.emit('advisory', this.from,this.to,this.question);
          this.question=''

        }
      }
    }

</script>
