import React, { useState } from "react";

const ChatContext = React.createContext()
const ChatProvider = ChatContext.Provider

export default ChatContext;
export {ChatProvider};