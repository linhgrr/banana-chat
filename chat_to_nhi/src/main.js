import { createApp } from 'vue';
import App from './App.vue';
import { io } from 'socket.io-client';

// Kết nối đến server Socket.IO (Express)
const socket = io('http://localhost:3000');

// Cung cấp đối tượng socket cho toàn bộ ứng dụng Vue.js
const app = createApp(App);
app.config.globalProperties.$socket = socket;
app.mount('#app');
