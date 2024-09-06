"use client";
import React, {
  createContext,
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";

import { toast } from "react-toastify";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const reconnectInterval = useRef(null);

  useEffect(() => {
    const connect = () => {
      const ws = new WebSocket(
        "wss://jnhix19or9.execute-api.us-west-2.amazonaws.com/production"
      ); // change url

      ws.onopen = () => {
        setIsConnected(true);
        toast.success("Connected to WebSocket");
        clearInterval(reconnectInterval.current);
      };

      ws.onclose = () => {
        setIsConnected(false);
        toast.error("Disconnected from WebSocket");
        reconnect();
      };

      ws.onerror = (error) => {
        console.error("WebSocket Error:", error);
        ws.close();
      };

      ws.onmessage = (message) => {
        // Handle incoming messages
        console.log("Message from server:", message.data);
      };

      setSocket(ws);
    };

    const reconnect = () => {
      if (!reconnectInterval.current) {
        reconnectInterval.current = setInterval(() => {
          if (!isConnected) {
            connect();
          }
        }, 5000); // Attempt to reconnect every 5 seconds
      }
    };

    connect();

    return () => {
      if (socket) {
        socket.close();
      }
      if (reconnectInterval.current) {
        clearInterval(reconnectInterval.current);
      }
    };
  }, [isConnected]);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
