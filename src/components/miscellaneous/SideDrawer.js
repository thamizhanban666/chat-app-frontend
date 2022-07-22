import { useContext, useState } from "react";
import ChatContext from "../../Context/ChatProvider";
import { useToast } from "@chakra-ui/toast";
import { Avatar, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text, Tooltip, useDisclosure } from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import NotificationBadge from "react-notification-badge";
// import { Effect } from "react-notification-badge";
import ProfileModal from "./ProfileModal";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";
import purpleBg from "../../assets/purple-bg.svg"

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {
    selectedChat,
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = useContext(ChatContext)

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleSearch = async (query) => {
    setSearch(query)
    if (!query) {
      setSearchResult([])
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`${process.env.REACT_APP_SERVER}/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) {
        setChats([...chats,data]);
      }
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <>
      <Box
        display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        p="4px 4px"
        borderBottomWidth="2px"
        h={{ base: "9vh", md: "9vh", lg:"9vh",xl:"8vh" }}
        backgroundImage={purpleBg}
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost"
            onClick={() => { setSearch("") ; onOpen() }} bg="#eeefff">
            <i className="fas fa-search"></i>
            <Text display={{ base: "none", sm: "block" }} px={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Box
          fontSize={{base:"xl", sm:"2xl"}}
          p={"0px 6px"}
          bg="#008E9B"
          fontWeight={"bold"}
          color="#fff"
          w="fit-content"
          border={"2px solid lightgrey"}
          borderRadius="full"
          textDecorationStyle={"normal"}
        >
          Chatter
        </Box>
        <Box>
          {/* <Menu>
            <MenuButton p={1}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize="2xl" m={1} color="white" />
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {
                notification.map((notif) => {
                  return (
                    <MenuItem
                      key={notif._id}
                      onClick={() => {
                        setSelectedChat(notif.chat);
                        setNotification(notification.filter((n) => n !== notif));
                      }}
                    >
                      {
                        notif.chat.isGroupChat
                          ? `New Message in ${notif.chat.chatName}`
                          : `New Message from ${getSender(user, notif.chat.users)}`
                      }
                    </MenuItem>)
                })
                }
            </MenuList>
          </Menu> */}
          <Menu>
            <MenuButton as={Button} bg="#eeefff" p="1" rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
                border="2px solid #38B2AC"
              />
            </MenuButton>
            <MenuList boxShadow={"1px 1px 3px 0px #666"}>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>{" "}
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen} >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color="#fff" borderWidth={3} borderRadius="100%" />
          <DrawerHeader backgroundImage={purpleBg} color="#fff" >Search User</DrawerHeader>
          <DrawerBody p="16px 7px" className="bg-img">
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                bg="#fff"
                boxShadow={"1px 1px 2px 1px #888"}
              />
              {/* <Button onClick={handleSearch} bg="#008C81" color="#fff" _hover={{bg:"#eee",color:"#008C81"}}>Go</Button> */}
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;