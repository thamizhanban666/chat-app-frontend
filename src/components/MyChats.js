import { AddIcon } from '@chakra-ui/icons';
import { Avatar, Box, Button, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { getSender, getSenderFull } from '../config/chatLogic';
import ChatContext from '../Context/ChatProvider';
import ChatLoading from './ChatLoading';
import GroupChatModal from './miscellaneous/GroupChatModal';

function MyChats({fetchAgain}) {
  // let loggedUser = JSON.parse(localStorage.getItem("userInfo"))
  // const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem("userInfo")));

  const { selectedChat, setSelectedChat, user, chats, setChats } = useContext(ChatContext);

  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("http://localhost:5000/api/chat", config);
      // console.log(data);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  useEffect(() => {
    // setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={"12px 3px 3px 3px"}
      bg="#eeefff"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        color="#0081CF"
      >
        <Text fontWeight={"bold"} fontSize={{ base: "16px", md: "22px", lg: "28px" }}>chats</Text>
        <GroupChatModal>
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "14px", lg: "17px" }}
            rightIcon={<AddIcon ms={"3px"}/>}
            bg="#0081CF"
            color="#fff"
            w="fit-content"
            p="2"
            _hover={{bg:"#38B2AC"}}
          >
            Create Group 
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={2}
        bg="#fff"
        w="100%"
        h="100%"
        overflowY="hidden"
        borderBottomRadius="lg"
        borderTopRadius="md"
        border="0.5px solid #38B2AC"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#eeefff": "#38B2AC" }
                color={selectedChat === chat ? "black" : "white"}
                _hover={{border:"2px solid #38B2AC"}}
                border={selectedChat === chat ? "1px solid #38B2AC" : "1px solid #fff" }
                px={2}
                py={1}
                borderRadius="lg"
                key={chat._id}
              >
                <Box display="flex" alignItems="center">
                  <Avatar
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={!chat.isGroupChat
                      ? getSenderFull(user, chat.users).name
                      : chat.chatName}
                    src={!chat.isGroupChat
                      ? getSenderFull(user, chat.users).pic
                      : chat.chatName}
                    border={selectedChat === chat ? "1px solid #38B2AC" : "2px solid #fff" }                  />
                  <Text>
                    {!chat.isGroupChat
                      ? getSender(user, chat.users)
                      : chat.chatName}
                  </Text>
                </Box>
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading fetchChats={fetchChats} />
        )}
      </Box>
    </Box>
  );

}

export default MyChats;