
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

const App = () => {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);

  useEffect(() => {
    socket.on("chat message", (msg) => {
      setChatLog((prev) => [...prev, msg]);
    });
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("chat message", message);
      setMessage("");
    }
  };

  return (
    <div style={styles.container}>
      <h2>💬 Real-Time Chat App</h2>
      <div style={styles.chatBox}>
        {chatLog.map((msg, i) => (
          <div key={i} style={styles.message}>{msg}</div>
        ))}
      </div>
      <div style={styles.inputArea}>
        <input
          style={styles.input}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button style={styles.button} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  chatBox: {
    height: "300px",
    overflowY: "auto",
    border: "1px solid #ddd",
    padding: "10px",
    marginBottom: "15px",
    background: "#f9f9f9",
    borderRadius: "5px",
  },
  message: {
    marginBottom: "8px",
    padding: "8px 12px",
    background: "#dff0d8",
    borderRadius: "4px",
  },
  inputArea: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    background: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default App;
