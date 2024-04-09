const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const fs = require('fs').promises; // Use fs.promises
const path = require('path');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const chatHistoryFile = path.join(__dirname, 'chatHistory.json');

// Asynchronously read chat history
const readChatHistory = async () => {
  try {
    let data = await fs.readFile(chatHistoryFile, 'utf8');
    if (data.trim().length === 0) {
      console.log('Chat history file is empty. Returning empty array.');
      return [];
    }
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading chat history:', err);
    if (err.code === 'ENOENT') {
      console.log('Chat history file does not exist. Creating file.');
      await fs.writeFile(chatHistoryFile, JSON.stringify([], null, 2), 'utf8');
      return [];
    }
    return [];
  }
};

// Asynchronously write message to chat history with timestamp
const writeMessageToHistory = async (message) => {
  const messages = await readChatHistory();
  const timestampedMessage = {
    ...message,
    timestamp: new Date().toISOString() // Add ISO timestamp
  };
  messages.push(timestampedMessage);
  await fs.writeFile(chatHistoryFile, JSON.stringify(messages, null, 2), 'utf8');
};

// Function to format timestamp
function formatTimestamp(isoTimestamp) {
    const date = new Date(isoTimestamp);
    const currentDate = new Date();
    
    if (date.toDateString() === currentDate.toDateString()) {
        return `Today at ${formatTime(date)}`;
    } else {
        const formattedDate = formatDate(date);
        return `${formattedDate} at ${formatTime(date)}`;
    }
}

function formatTime(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours.toString().padStart(2, '0')}h${minutes.toString().padStart(2, '0')}`;
}

function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2); // Get last 2 digits of the year
    return `${day}/${month}/${year}`;
}

// Function to delete messages older than 48 hours
const deleteOldMessages = async () => {
  const messages = await readChatHistory();
  const currentTime = new Date().getTime();
  const updatedMessages = messages.filter(message => {
    const messageTime = new Date(message.timestamp).getTime();
    return currentTime - messageTime <= 48 * 60 * 60 * 1000; // Check if message is within 48 hours
  });
  await fs.writeFile(chatHistoryFile, JSON.stringify(updatedMessages, null, 2), 'utf8');
};

// Periodically delete old messages (every 24 hours)
setInterval(deleteOldMessages, 24 * 60 * 60 * 1000); // 24 hours in milliseconds

io.on('connection', (socket) => {
  console.log('New client connected');

  (async () => {
    const chatHistory = await readChatHistory();
    chatHistory.forEach(message => {
      // Convert ISO timestamp to human-readable format before emitting
      message.time = formatTimestamp(message.timestamp);
      socket.emit('message', message);
    });
  })();

  socket.on('joinChat', (data) => {
    console.log(`${data.name} joined the chat`);
  });

  socket.on('sendMessage', async (message) => {
    await writeMessageToHistory(message);
    // Convert ISO timestamp to human-readable format before broadcasting
    message.timestamp = new Date().toISOString();
    message.time = formatTimestamp(message.timestamp);
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`Listening on port ${port}`));
