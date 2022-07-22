import { Box } from '@chakra-ui/react';
import React, { useContext } from 'react'
import ChatContext from '../Context/ChatProvider'
import SingleChat from './SingleChat';

function ChatBox({fetchAgain,setFetchAgain}) {
  const { selectedChat } = useContext(ChatContext);

  return (
     <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      // p={1}
      p={"6px 3px 3px 3px"}
      bg="#ffffff"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
      backgroundImage={selectedChat ? "linear-gradient(to right, #128c7e, #138f81, #149284, #149688, #15998b, #169c8d, #169e8f, #17a191, #18a393, #18a595, #19a797, #19a999)" : ""}
      border={selectedChat ? "": "1px solid grey"}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  )
}

export default ChatBox