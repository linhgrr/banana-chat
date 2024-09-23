// Import các thư viện cần thiết
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Tạo ứng dụng Express
const app = express();
const server = http.createServer(app);

// Cấu hình Socket.IO với CORS để kết nối từ client Vue.js
const io = new Server(server, {
    cors: {
        origin: "http://localhost:8080", // Cho phép client Vue.js kết nối từ localhost:8080
        methods: ["GET", "POST"]
    }
});

// Lắng nghe kết nối từ client
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Lắng nghe sự kiện 'message' từ client
    socket.on('message', (msg) => {
        console.log('Message received:', msg);
        io.emit('message', msg);  // Phát lại tin nhắn tới tất cả các client
    });

    // Lắng nghe sự kiện ngắt kết nối
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Server lắng nghe trên cổng 3000
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
