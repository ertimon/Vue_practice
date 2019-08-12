
<template>
  <div class="card mt-3">
      <div class="card-body">
          <div class="card-title">
              <h3>Chat app</h3>
              <hr>
          </div>
          <div class="card-body messageList">
              <div class="messages" v-for="(msg, index) in messages" :key="index">
                  <p><small>{{time.getHours()}}:{{time.getMinutes()}} </small><span class="font-weight-bold">{{ msg.user }}: </span>{{ msg.message }}</p>
              </div>
          </div>
      </div>
      <div class="card-footer">
          <form @submit.prevent="sendMessage">
              <div class="gorm-group">
                  <label for="user">User:</label>
                  <input type="text" v-model="user" class="form-control">
              </div>
              <div class="gorm-group pb-3">
                  <label for="message">Message:</label>
                  <input type="text" v-model="message" class="form-control">
              </div>
              <button type="submit" class="btn btn-success">Send</button>
          </form>
      </div>
  </div>
</template>

<script>
import io from 'socket.io-client';
export default {
    data() {
        return{
        user: '',
        message: '',
        messages: [],
        time: new Date(),
        socket: io('localhost:3000')
        }
    },
    methods: {
        sendMessage(){
            this.socket.emit('SEND_MESSAGE', {
                user: this.user,
                message: this.message
            });
            this.message = ''
        }
        },
    mounted() {
        this.socket.on('NEW_MESSAGE', (data) => {
            this.messages = [...this.messages, data];
        });
    }
}
</script>

<style>
.messageList{
    height: 300px;
    overflow-y: scroll;
}

</style>