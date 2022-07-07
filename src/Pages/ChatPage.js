import React, { useEffect, useState } from 'react'
import axios from 'axios'

function ChatPage() {

  const [chats, setChats] = useState([]);

  useEffect(() => {
    fetchChats();
  },[])

  const fetchChats = async () => {
    const data = await axios.get("http://localhost:5000/api/chats");
    setChats(data.data);  
  } 
  
  return (
    <div>
      {chats.map((chat) => (
        <div key={chat._id}>{chat.chatName }</div>
      ))}
    </div>
  )
}

export default ChatPage