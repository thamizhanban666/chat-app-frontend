import { Avatar, Box, Image, Popover, PopoverArrow, PopoverContent, PopoverHeader, PopoverTrigger, Spacer, Text, Tooltip } from "@chakra-ui/react";
import { useContext } from "react";
import Lottie from "react-lottie";
import ScrollableFeed from "react-scrollable-feed";
import {
  getMyDay,
  getMyTime,
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/chatLogic";
import ChatContext from "../Context/ChatProvider";
import animationData from "../animations/typing.json"
import singleTick from "../assets/single-tick.png"
import doubleTick from "../assets/double-tick-blue.png"

const ScrollableChat = ({ messages, istyping }) => {
  const { user, selectedChat } = useContext(ChatContext);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Popover>
                <PopoverTrigger>
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={m.sender.name}
                    src={m.sender.pic}
                    border="1px solid #38B2AC"
                  />
                </PopoverTrigger>
                <PopoverContent w={"fit-content"} bg={"#222"} borderRadius="2xl">
                  <PopoverArrow />
                  <PopoverHeader color="#fff" borderRadius="2xl">{m.sender.name}</PopoverHeader>
                </PopoverContent>
              </Popover>
              )}
            <Popover placement={m.sender._id === user._id ?'left-end': 'right-end'}>
              <PopoverTrigger>
                <span
                  style={{
                    color: "#fff",
                    backgroundImage: `${
                      m.sender._id === user._id ?
                        "linear-gradient(to left top, #076c61, #086f64, #097266, #0b7669, #0c796c, #0d7c6f, #0d8073, #0e8376, #0e887a, #0d8d7e, #0d9283, #0c9787)"
                      :
                        "linear-gradient(to left top, #0a8bbc, #0089c0, #0088c3, #0086c7, #0084ca, #0088ce, #008dd2, #0091d6, #009cdb, #00a7df, #00b2e2, #00bde4)" 
                    }`,
                    marginLeft: isSameSenderMargin(messages, m, i, user._id),
                    marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                    borderRadius: "14px",
                    borderTopRightRadius: `${
                      m.sender._id === user._id ? "0px" : "14px" 
                    }`,
                    borderTopLeftRadius: `${
                      m.sender._id === user._id ? "14px" : "0px" 
                    }`,
                    padding: "4px 8px 4px 15px",
                    maxWidth: "75%",
                  }}
                >
                  <Box display={"flex"} alignItems="baseline" justifyContent={"space-between"}>
                    <Text >{m.content}</Text>
                    <Text fontSize={"10px"} ml="8px" alignSelf={"end"} >{getMyTime(m.createdAt)}</Text>
                    
                    <Box display={m.sender._id === user._id ? "block" : "none"} alignSelf={"end"}>
                      {
                        (m.seen && !selectedChat.isGroupChat) ?
                          <Image
                            boxSize='18px'
                            objectFit='cover'
                            src={doubleTick}
                            alt='.'
                            ms={1}
                          />
                            :
                          <Image
                            boxSize='20px'
                            objectFit='cover'
                            src={singleTick}
                            alt='.'
                            ms={1}
                          /> 
                      }
                    </Box>

                  </Box>
                </span>
              </PopoverTrigger>
              <PopoverContent w={"fit-content"} bg={"#222"} borderRadius="2xl">
                <PopoverArrow />
                <PopoverHeader color="#fff" borderRadius="2xl">{getMyDay(m.createdAt)}</PopoverHeader>
              </PopoverContent>
            </Popover>
          </div>
        ))}
      {istyping ? (
        <div>
          <Lottie
            options={defaultOptions}
            height={24}
            width={150}
            style={{ marginBottom: 7, marginLeft: 0, marginTop:8 }}
          />  
        </div>
      ) : (
        <></>
      )}
    </ScrollableFeed>
  );
};

export default ScrollableChat;