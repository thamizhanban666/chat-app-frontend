import React, { useContext, useEffect, useState } from 'react'
import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import Login from '../components/authentication/Login';
import Signup from '../components/authentication/Signup';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  
  const [user, setUser] = useState();
  const navigate = useNavigate()
  
// useEffect(() => {
//   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//   setUser(userInfo);
//   // console.log(userInfo);
//   if(userInfo) navigate("/chats")
// }, [])
  
  return (
    <Box w="lg" display={"flex"} flexDir={"column"} alignItems={"center"} mx="auto"  >
      <Box
        fontSize="3xl"
        p={"1px 12px"}
        bg="#008E9B"
        fontWeight={"bold"}
        color="#fff"
        w="fit-content"
        m="15px 0 15px 0"
        border={"2px solid white"}
        borderRadius="full"
        textDecorationStyle={"normal"}
      >
        Chatter
      </Box>
      <Box bg="white" w="98%" p={4} mb={"25px"} borderRadius="lg" boxShadow={"1px 1px 4px 1px #444"}
      >
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab color={"#845EC2"} fontWeight={"bold"} >Login</Tab>
            <Tab color={"#845EC2"} fontWeight={"bold"} >Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );  
}

export default HomePage