import { AddIcon } from '@chakra-ui/icons';
import { Avatar, Box, Button, Image, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext, useEffect} from 'react'
import { getMyTime, getSender, getSenderFull } from '../config/chatLogic';
import ChatContext from '../Context/ChatProvider';
import ChatLoading from './ChatLoading';
import GroupChatModal from './miscellaneous/GroupChatModal';
import singleTick from "../assets/single-tick-black.png"
import doubleTick from "../assets/double-tick-green.png"

function MyChats({fetchAgain}) {
  
  const { selectedChat, setSelectedChat, user, chats, setChats,notification, setNotification, onlineUsers } = useContext(ChatContext);

  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/api/chat`, config);
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

  const handleSelect = (chat) => {
    if(selectedChat && chat._id==selectedChat._id) return
    setSelectedChat(chat);
    window.history.pushState(null,'',window.location.href)
    window.onpopstate = () => {
      setSelectedChat("");
    }
    // setNotification(notification.filter((n) => n.chat._id !== chat._id));
  }

  useEffect(() => {
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={"6px 3px 3px 3px"}
      // bg="#222"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      backgroundImage="linear-gradient(to left, #0f70b6, #0f71b8, #0f72b9, #0e73bb, #0e74bd, #0f75bf, #0f77c1, #1078c3, #117ac6, #137cc8, #147ecb, #1580ce)"
    >
      <Box
        pb={"6px"}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        color="#fff"
      >
        <Text fontWeight={"bold"} fontSize={{ base: "22px", md: "24px", lg: "28px" }}>chats</Text>
        <GroupChatModal>
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "14px", lg: "17px" }}
            rightIcon={<AddIcon ms={"3px"}/>}
            color="#fff"
            w="fit-content"
            p="2"
            border="2px solid #fff"
            _hover={{ bg: "#38B2AC" }}
            backgroundImage="linear-gradient(to right top, #02a089, #03a38d, #03a792, #04aa96, #05ae9b, #04b39f, #02b7a2, #01bca6, #00c3aa, #00caae, #03d1b1, #08d8b5)"
          >
            Create Group 
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        px={0.5}
        py={0.5}
        pt={2}
        bg="#eeefff"
        w="100%"
        h="100%"
        overflowY="hidden"
        borderBottomRadius="lg"
        borderTopRadius="md"
        border="0.5px solid #38B2AC"
        boxShadow={"0px 2px 2px 0px #777 inset"}
        className=''
      >
        {chats ? (
          <Stack overflowY="scroll" pb={1}>
            {chats.map((chat) => (
              <Box
                w="99.2%"
                onClick={()=> handleSelect(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#fffffe" }
                color={selectedChat === chat ?"white": "black"}
                _hover={{boxShadow:"1px 1px 2px 0px green",border:"1px solid green",bg:"#fffffe",color:"#222"}}
                px={2}
                py={"2px"}
                borderRadius="lg"
                key={chat._id}
                boxShadow={"1px 1px 2px 0px #222"}
              >
                <Box display="flex" alignItems="center">
                  <Box position={"relative"}>
                    <Avatar
                      mr={2}
                      size="sm"
                      cursor="pointer"
                      name={!chat.isGroupChat
                        ? getSenderFull(user, chat.users)?.name
                        : chat.chatName}
                      src={!chat.isGroupChat
                        ? getSenderFull(user, chat.users)?.pic
                        : chat.chatName}
                      border={selectedChat === chat ? "2px solid #fff" : "1px solid #38B2AC" }
                    />
                    {
                      !chat.isGroupChat && onlineUsers.includes(getSenderFull(user, chat.users)?._id) ?
                      <Box w={3.5} h={3.5} borderRadius="100%" border="2px solid #fffffe" bg="#03b5a0" position={"absolute"} top={0} right={1}  /> : <></>
                    }
                  </Box>
                  <div>
                    <Text fontWeight="medium">
                      {!chat.isGroupChat
                      ? getSender(user, chat.users)
                      : chat.chatName}
                    </Text>
                      {chat.latestMessage ? (
                        <Box display={"flex"}  >
                          <Box display={chat.latestMessage.sender._id === user._id ? "block" : "none"} >
                            {
                            (chat.latestMessage.seen && !chat.isGroupChat) ?
                              <Image
                                boxSize='18px'
                                objectFit='cover'
                                src={doubleTick}
                                alt='.'
                                mx={1}
                              />
                                :
                              <Image
                                boxSize='17px'
                                objectFit='cover'
                                src={singleTick}
                                alt='.'
                                ms={1}
                              /> 
                            }
                          </Box>
                            <Text fontSize="sm"  >
                              {chat.latestMessage.content.length > 19
                                ? chat.latestMessage.content.substring(0, 20) + "..."
                                : chat.latestMessage.content}
                            </Text>
                        </Box>
                      ) : (
                        <Text fontSize="sm" color="lightGray" >
                          No chat to display
                        </Text>
                      )}
                  </div>
                  <Box fontSize="12px" ms="auto" alignSelf={"end"}>
                    {
                      chat.notification?.filter((n) => n?.users?.includes(user._id)).length===0?"":
                      <Box bg="green" color={"#fff"} display="flex" justifyContent={"center"} alignItems="center" w="fit-content" h="fit-content" minW={"18px"} borderRadius="2xl">
                        <Text mx="0.5">
                          {chat.notification?.filter((n) => n.users.includes(user._id)).length}
                        </Text>
                      </Box>
                    }
                    <Text color={"#222"}>{getMyTime(chat?.latestMessage?.createdAt)}</Text>
                  </Box>
                </Box>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );

}

export default MyChats;