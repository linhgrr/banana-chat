<template>
  <div id="app">
    <h1>Real-Time Chat With Nyc</h1>
    <div v-for="msg in messages" :key="msg">{{ msg }}</div>
    <input v-model="message" @keyup.enter="sendMessage" placeholder="Type your message..."/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      messages: []
    };
  },
  mounted() {
    // Lắng nghe sự kiện 'message' từ server
    this.$socket.on('message', (msg) => {
      this.messages.push(msg);
    });
  },
  methods: {
    sendMessage() {
      // Phát sự kiện 'message' đến server
      if (this.message !== '') {
        this.$socket.emit('message', this.message);
        this.message = '';
      }
    }
  }
};
</script>

<style>
/* Style đơn giản cho ứng dụng chat */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
}
</style>
