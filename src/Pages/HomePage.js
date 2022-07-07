import React from 'react'
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

function HomePage() {
  return (
    <Box w="lg" display={"flex"} flexDir={"column"} alignItems={"center"} mx="auto" >
      <Box
        fontSize="3xl"
        // variant='subtle'
        // colorScheme='green'
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
      <Box bg="white" w="98%" p={4} mb={"25px"} borderRadius="lg" border="1px solid #150159">
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