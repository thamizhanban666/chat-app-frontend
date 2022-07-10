import React, { useContext, useState } from 'react'
import SideDrawer from '../components/miscellaneous/SideDrawer';
import MyChats from '../components/MyChats'
import ChatBox from '../components/ChatBox'
import ChatContext from '../Context/ChatProvider';
import {Box} from "@chakra-ui/react"

function ChatPage() {
  const { user, selectedChat } = useContext(ChatContext);
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{width:"100%"}}>
      {user && <SideDrawer />}
      <Box display={"flex"} justifyContent={'space-between'} w={"100%"} h={{ base: selectedChat ? "100%" : "89.3%", md: "89.3%" }} p={{base: '4px', md:'8px'}} >
        {user && <MyChats fetchAgain={fetchAgain} /> }
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
      </Box>
    </div>
  )
}

export default ChatPage;