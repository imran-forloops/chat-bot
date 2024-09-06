import { Tooltip } from "@nextui-org/react";
import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

import { SendIcon } from "./icons/SendIcon";
import { useMessages } from "@/app/context/MessagesContext";
import { message } from "antd";
import { sendChatRequest } from "@/utils/chatApiCalls";
import axios from "axios";

const InputField = () => {
  const [input, setInput] = useState("");

  const { setMessages } = useMessages();

  const handleKeyDown = (event) => {
    // handle enter key press
    if (
      !event.shiftKey &&
      !event.nativeEvent.isComposing &&
      event.key === "Enter"
    ) {
      event.preventDefault();
      submitter();
    }
  };

  const handleInputChange = (e) => {
    // handle input change
    setInput(() => e.target.value);
  };

  const submitter = async () => {
    try {
      if (input.trim() !== "") {
        setMessages((prev) => [...prev, { text: input, type: "query" }]);
        setInput("");
        // set empty message
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "", type: "response", complete: false },
        ]);
        // const data = await sendChatRequest(input);
        // console.log("response a gia hai: ", data);
        const threadId = 40;
        const url = `https://forloopsai.forloops.co/stream_chat?content=${encodeURIComponent(
          input
        )}&thread_id=${encodeURIComponent(threadId)}`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "text/event-stream",
          },
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let done = false;

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          const chunk = decoder.decode(value, { stream: true });
          console.log("chunk is: ", chunk);
          const chunkData = chunk.replace(/data: /g, "").replace(/\n\n/g, " ");
          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            const lastMessageIndex = updatedMessages.length - 1;

            // Append the chunk to the last message text
            updatedMessages[lastMessageIndex] = {
              ...updatedMessages[lastMessageIndex],
              text: updatedMessages[lastMessageIndex].text + chunkData,
              type: "response",
            };

            return updatedMessages;
          });
        }

        // Mark the last message as complete
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          const lastMessageIndex = updatedMessages.length - 1;

          if (updatedMessages[lastMessageIndex]) {
            updatedMessages[lastMessageIndex].complete = true;
          }

          return updatedMessages;
        });
      }
    } catch (error) {
      console.log("Error while sending message", error.message);
      message.error(error.message);
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        // Remove the last message if the array length is less than 1
        updatedMessages.pop();
        return updatedMessages;
      });
    }
  };

  return (
    <div className="relative">
      <div className="flex bg-[#101014] rounded-full mx-5">
        <div className="flex-grow bg-[#13EF93]/50 py-0.5 inline  rounded-tl-[2rem] rounded-bl-[2rem] ">
          <div className=" pl-0.5 h-full rounded-tl-[2rem] rounded-bl-[2rem] ">
            <TextareaAutosize
              onKeyDown={handleKeyDown}
              rows={1}
              spellCheck={false}
              autoCorrect="off"
              className="rounded-tl-[2rem] rounded-bl-[2rem] text-slate-300 px-2 py-2 md:py-4 -mb-[0.4rem] min-h-10 overflow-hidden sm:px-4 w-full resize-none bg-[#101014] text-light-900 border-0 text-sm sm:text-base outline-none focus:ring-0"
              placeholder="Send a message"
              value={input}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="inline h-auto rounded-tr-[2rem] rounded-br-[2rem] bg-gradient-to-l to-[#13EF93]/50 from-[#149AFB]/80 pe-0.5 py-0.5">
          <Tooltip showArrow content="Send a message.">
            <button
              onClick={submitter}
              className="w-16 md:w-24 h-full py-2 md:py-4 px-2 rounded-tr-[2rem] rounded-br-[2rem] font-bold  bg-[#101014] text-slate-300 text-sm sm:text-base flex items-center justify-center"
            >
              {/* <span>Send text</span> */}
              <SendIcon className="w-5 md:w-6" />
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default InputField;
