import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { ChatProvider } from './Context/ChatProvider';
import ChatPage from './Pages/ChatPage';
import HomePage from './Pages/HomePage';

function App() {
const [user, setUser] = useState();
const [selectedChat, setSelectedChat] = useState();
const [notification, setNotification] = useState([]);
const [chats, setChats] = useState();
const [onlineUsers, setOnlineUsers] = useState([]);

const navigate = useNavigate()
  
useEffect(() => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  setUser(userInfo);
  // console.log(userInfo);
  if(userInfo) navigate("/chats")
  if(!userInfo) navigate("/")
}, [])

  return (
    <div className='App'>
      <ChatProvider value={{ user, setUser, selectedChat, setSelectedChat, notification, setNotification, chats, setChats,onlineUsers, setOnlineUsers }}>

        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/chats' element={<ChatPage/>} />
        </Routes>

      </ChatProvider>
    </div>
  );
}

export default App;
