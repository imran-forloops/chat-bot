"use client";
import React, { useEffect, useRef, useState } from "react";
import InputField from "./InputField";
import ChatBubble from "./ChatBubble";
import { useMessages } from "@/app/context/MessagesContext";
import { NextUIProvider } from "@nextui-org/react";

const Chatbot = () => {
  const { messages, setMessages } = useMessages();

  const messageMarker = useRef(null);

  useEffect(() => {
    if (messageMarker.current) {
      messageMarker.current.scrollIntoView({ behavior: "auto" });
    }
  }, [messages]);

  return (
    <NextUIProvider className="h-full">
      <div className="flex h-full antialiased">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="flex flex-col flex-auto h-full">
            <div className="flex flex-col justify-between h-full pb-2">
              <div className="flex flex-col h-full overflow-hidden justify-end mb-4">
                <div className="grid grid-cols-12 overflow-x-auto gap-y-2">
                  {messages.length > 0 &&
                    messages.map((message, i) => (
                      <ChatBubble message={message} key={i} index={i} />
                    ))}
                  <div
                    className="h-6 col-start-1 col-end-13"
                    ref={messageMarker}
                  ></div>
                </div>
              </div>
              <InputField />
            </div>
          </div>
        </div>
      </div>
    </NextUIProvider>
  );
};

export default Chatbot;
