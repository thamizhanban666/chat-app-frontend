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
      p={"12px 3px 3px 3px"}
      bg="#eeefff"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  )
}

export default ChatBox