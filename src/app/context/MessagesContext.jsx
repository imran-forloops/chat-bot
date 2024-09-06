"use client";
import React, { createContext, useContext, useState } from "react";

// Create a context
const MessagesContext = createContext();

export const useMessages = () => {
  return useContext(MessagesContext);
};

export const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  return (
    <MessagesContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessagesContext.Provider>
  );
};
