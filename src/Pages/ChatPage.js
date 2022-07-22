import React, { useContext, useState } from 'react'
import SideDrawer from '../components/miscellaneous/SideDrawer';
import MyChats from '../components/MyChats'
import ChatBox from '../components/ChatBox'
import ChatContext from '../Context/ChatProvider';
import {Box} from "@chakra-ui/react"
import purpleBgLight from "../assets/purple-bg-light.svg"

function ChatPage() {
  const { user, selectedChat } = useContext(ChatContext);
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <Box w="100%" h="100vh" backgroundImage={purpleBgLight}>
      {user && <SideDrawer />}
      <Box display={"flex"} justifyContent={'space-between'} w={"100%"} h={{ base: selectedChat ? "100vh" : "91vh", md: "91vh",lg:"91vh",xl:"92vh" }} p={{base: '2px', md:'8px'}} >
        {user && <MyChats fetchAgain={fetchAgain} /> }
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
      </Box>
    </Box>
  )
}

export default ChatPage;