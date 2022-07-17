import { Avatar, Tooltip } from "@chakra-ui/react";
import { useContext } from "react";
import Lottie from "react-lottie";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/chatLogic";
import ChatContext from "../Context/ChatProvider";

const ScrollableChat = ({ messages, istyping, defaultOptions }) => {
  const { user } = useContext(ChatContext);

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                  border="1px solid #38B2AC"
                />
              </Tooltip>
            )}
            <span
              style={{
                color: "#fff",
                backgroundImage: `${
                  m.sender._id === user._id ? "linear-gradient(to right top, #02a089, #03a38d, #03a792, #04aa96, #05ae9b, #04b39f, #02b7a2, #01bca6, #00c3aa, #00caae, #03d1b1, #08d8b5)"
                  :
                  "linear-gradient(to left top, #0a8bbc, #0089c0, #0088c3, #0086c7, #0084ca, #0088ce, #008dd2, #0091d6, #009cdb, #00a7df, #00b2e2, #00bde4)" 
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                borderTopRightRadius: `${
                  m.sender._id === user._id ? "0px" : "20px" 
                }`,
                borderTopLeftRadius: `${
                  m.sender._id === user._id ? "20px" : "0px" 
                }`,
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
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