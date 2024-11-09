import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:5000'); 

const App = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    socket.on('message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

  
    return () => {
      socket.off('message');
    };
  }, []);

  const handleLogin = () => {
    if (username) {
      setIsLoggedIn(true);
    }
  };

  const handleSendMessage = () => {
    if (message) {
      socket.emit('message', { username, body: message });
      setMessage(''); 
    }
  };

  return (
    <div className="App">
      <h1>WebSocket Chat</h1>
      {!isLoggedIn ? (
        <div>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div>
          <div className="message-container">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={msg.username === username ? 'message sent' : 'message received'}
              >
                <strong>{msg.username}:</strong> {msg.body}
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      )}
    </div>
  );
};

export default App;
