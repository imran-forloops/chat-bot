import React from "react";
import LeftBubble from "./LeftBubble";
import RightBubble from "./RightBubble";

function isUserMessage(message) {
  return message.type === "query";
}

function isAssistantMessage(message) {
  return message.type === "response";
}

const ChatBubble = ({ message, index }) => {
  if (isUserMessage(message)) return <RightBubble message={message} />;
  else if (isAssistantMessage(message))
    return <LeftBubble message={message} index={index} />;
  else return <></>;
};

export default ChatBubble;
