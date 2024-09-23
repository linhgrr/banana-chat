<template>
  <div id="app">
    <div class="chat-container">
      <!-- Chat Header -->
      <div class="chat-header">
        <h2>Real-Time Chat With Nyc</h2>
        <span v-if="nickname !== ''">By {{ nickname }}</span>
      </div>

      <!-- Nickname Input -->
      <div v-if="!hasNickname" class="nickname-input">
        <input
            type="text"
            v-model="nickname"
            placeholder="Enter your nickname"
        />
        <button @click="enterNickname">Enter</button>
      </div>

      <!-- Messages Display -->
      <div class="messages" id="messagesBox" ref="messages">
        <div
            v-for="(msg, index) in messages"
            :key="index"
            :class="['message', msg.nickname === nickname ? 'sent' : 'received']"
        >
          <div class="message-content">
            <span class="message-sender">{{ msg.nickname || 'System' }}</span>
            <p>{{ msg.content }}</p>
          </div>
        </div>
      </div>

      <!-- Message Input -->
      <div class="message-input">
        <input
            v-model="message.content"
            @keyup.enter="sendMessage"
            placeholder="Type your message..."
            :disabled="!hasNickname"
        />
        <button @click="sendMessage" :disabled="!hasNickname">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hasNickname: false,
      nickname: '',
      message: {
        content: '',
        nickname: ''
      },
      messages: []
    };
  },
  watch: {
    messages() {
      // Scroll to bottom whenever messages change
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    }
  },
  mounted() {
    // Listen for 'message' events from the server
    this.$socket.on('message', (msg) => {
      this.messages.push(msg);
    });
  },
  methods: {
    sendMessage() {
      if (this.message.content.trim() !== '') {
        const msgToSend = {
          content: this.message.content,
          nickname: this.nickname
        };
        // Emit the message to the server
        this.$socket.emit('message', msgToSend);
        this.message.content = '';
      }
    },
    enterNickname() {
      if (this.nickname.trim() !== '') {
        this.message.nickname = this.nickname;
        this.hasNickname = true;
      }
    },
    scrollToBottom() {
      const container = document.getElementById('messagesBox');
      if (container) {
        container.scrollTop = container.scrollHeight;
      } else {
        console.warn('Messages container not found!');
      }
    }
  },
  updated() {
    // Ensure scrolling after component updates
    this.scrollToBottom();
  }
};
</script>

<style>
/* Reset some basic styles */
body, html, #app {
  height: 100%;
  margin: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  background-color: #f0f2f5;
}

/* Chat Container */
.chat-container {
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 600px;
  margin: 50px auto;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

/* Chat Header */
.chat-header {
  background-color: #0084ff;
  color: white;
  padding: 15px;
  text-align: center;
  font-size: 18px;
  position: relative;
}

.chat-header span {
  font-size: 14px;
  color: #dfe1e5;
}

/* Nickname Input */
.nickname-input {
  padding: 20px;
  text-align: center;
}

.nickname-input input {
  width: 70%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.nickname-input button {
  padding: 10px 15px;
  margin-left: 10px;
  background-color: #0084ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.nickname-input button:hover {
  background-color: #006bbd;
}

/* Messages Display */
.messages {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  background-color: #e5ddd5;
}

.message {
  display: flex;
  margin-bottom: 10px;
}

.message.sent {
  justify-content: flex-end;
}

.message.received {
  justify-content: flex-start;
}

.message-content {
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 20px;
  position: relative;
}

.message.sent .message-content {
  background-color: #dcf8c6;
  border-bottom-right-radius: 0;
}

.message.received .message-content {
  background-color: #ffffff;
  border-bottom-left-radius: 0;
}

.message-sender {
  display: block;
  font-size: 12px;
  color: #555;
  margin-bottom: 5px;
}

/* Message Input */
.message-input {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;
  background-color: #f0f0f0;
}

.message-input input {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 20px;
  outline: none;
  background-color: #ffffff;
}

.message-input button {
  margin-left: 10px;
  padding: 0 20px;
  background-color: #0084ff;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

.message-input button:disabled {
  background-color: #a0cfff;
  cursor: not-allowed;
}

.message-input button:hover:not(:disabled) {
  background-color: #006bbd;
}
</style>
