import { FormControl } from "@chakra-ui/form-control";
import { Box, Text } from "@chakra-ui/layout";
import "./style.css";
import { Avatar, Button, IconButton, Input, Spinner, useToast } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ChatContext from "../Context/ChatProvider";
import { getSender, getSenderFull } from "../config/chatLogic";
import ProfileModal from "./miscellaneous/ProfileModal";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import ScrollableChat from "./ScrollableChats";
import Send from "../assets/send.png"
import io from "socket.io-client";

const ENDPOINT = process.env.REACT_APP_SERVER;

var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const toast = useToast();
  const { selectedChat, setSelectedChat, user, notification, setNotification, onlineUsers, setOnlineUsers } = useContext(ChatContext);

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);
      socket.emit("join chat",user._id, selectedChat);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage || event == "send" && newMessage) {
      setTyping(false)
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          `${process.env.REACT_APP_SERVER}/api/message`,
          {
            content: newMessage,
            chatId: selectedChat._id,
            users: selectedChat.users.map((u)=> u._id).filter((u)=> u !== user._id)
          },
          config
          );
          setMessages([...messages, data]);
          socket.emit("new message", data);  
          setFetchAgain(!fetchAgain);
        } catch (error) {
          toast({
            title: "Error Occured!",
            description: "Failed to send the Message",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    if (!e.target.value) {
      setTyping(false);
      socket.emit("stop typing", selectedChat._id);
    }

  };

  // const isNotified = (notifications, newElement) => {
  //   const isFound = notifications.some((e) => {
  //     if (e.chat._id == newElement.chat._id) { return true; }
  //     return false;
  //   })
  //   return isFound;
  // }

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.once("connected", () =>  setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);
  
  useEffect(() => {
    fetchMessages();
    
    selectedChatCompare = selectedChat;
  }, [selectedChat]);
  
  useEffect(() => {
    socket.once("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || 
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        // if (!notification.includes(newMessageRecieved)) {
          // if (!isNotified(notification, newMessageRecieved)) {
          //   setNotification([newMessageRecieved, ...notification]);
          // }
        setFetchAgain(!fetchAgain);
        // }
      } else {
        setMessages([...messages, newMessageRecieved]);
        setFetchAgain(!fetchAgain);
        socket.emit("seen",user._id,selectedChatCompare)
      }
    });

    socket.once("other seen", (chatId) => {
      setFetchAgain(!fetchAgain);
      if (selectedChatCompare?._id === chatId) {
        if (selectedChatCompare.isGroupChat) return;
        setMessages(messages.map((m) => {
          if (m.seen) return m;
          m.seen = true;
          return m;
        }))
      }
    })

    socket.once("online users", (updatedOnlineUsers) => {
      setOnlineUsers(updatedOnlineUsers)
    })
    
  });
  
  return (
    <>
      {selectedChat ? (
        <>
          <Box
            fontSize={{ base: "18px", sm: "22px" }}
            fontWeight="bold"
            pb={"0px"}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
            color="#222"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
              boxShadow={"1px 1px 3px 1px #666"}
              borderRadius="100%"
            />
            {messages &&
              (!selectedChat.isGroupChat ? (
                <>
                  <Box display="flex" alignItems="center">
                    <Box position={"relative"}>
                      <Avatar
                        mr={2}
                        size="sm"
                        cursor="pointer"
                        name={getSenderFull(user, selectedChat.users)?.name}
                        src={getSenderFull(user, selectedChat.users)?.pic}
                        border="2px solid #fff"
                      />
                      {
                        !selectedChat.isGroupChat && onlineUsers.includes(getSenderFull(user, selectedChat.users)?._id) ?
                        <Box w={4} h={4} borderRadius="100%" border="2px solid #fffffe" bg="green" position={"absolute"} top={0} right={0.5}  /> : <></>
                      }
                    </Box>
                    <Text color="#fff" ms={0.5}>{getSender(user, selectedChat.users)}</Text>
                  </Box>
                  <ProfileModal
                    user={getSenderFull(user, selectedChat.users)}
                  />
                </>
              ) : (
                <>
                  <Box display="flex" alignItems="center">
                    <Avatar
                      mr={2}
                      size="sm"
                      cursor="pointer"
                      name={selectedChat.chatName}
                      border="2px solid #fff"
                    />
                    <Text color="#fff">
                      {selectedChat.chatName}
                    </Text>
                  </Box>
                  <UpdateGroupChatModal
                    fetchMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
                </>
              ))}
          </Box>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            pt={0.5}
            mt="6px"
            // bg="#fff"
            className='bg-img'
            w="100%"
            h="100%"
            overflowY="hidden"
            borderBottomRadius="lg"
            borderTopRadius="md"
            // border="0.5px solid #38B2AC"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <Box className="messages" px={2} pb={1}>
                <ScrollableChat messages={messages} istyping={istyping} />
              </Box>
            )}

              <FormControl
                onKeyDown={sendMessage}
                id="first-name"
                isRequired
                // mt={1}
              >
              <Box display="flex" p={1} bg="#eeefff">
                <Input
                  variant="filled"
                  bg="#fff"
                  placeholder="Enter a message.."
                  onChange={typingHandler}
                  value={newMessage}
                  autoComplete="off"
                  boxShadow="1px 1px 4px 0px #888"
                />
                <Button
                  // mt={1}
                  ml={1}
                  p="4px"
                  borderRadius={"100%"}
                  backgroundColor={"#b13abe"}
                  _hover={{backgroundColor:"#b13abe"}}
                  onClick={() => { sendMessage("send") }}
                >
                  <img src={Send}></img>
                </Button>
              </Box>
            </FormControl>
          </Box>
        </>
      ) : (
        // to get socket.io on same page
        <Box display="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;