import React from "react";
// import { Avatar } from "@nextui-org/react";
import { TextContent } from "./TextContext";
import { Avatar } from "antd";
// import { useMessages } from "@/app/context/MessagesContext";

const LeftBubble = ({ message, index }) => {
  // const { messages } = useMessages();

  return (
    <>
      <div className="col-start-1 col-end-13 sm:col-end-11 md:col-end-9 lg:col-end-8 xl:col-end-10 md:px-3 pt-3">
        <div className="flex items-start gap-2 flex-col md:flex-row">
          <div className="flex items-start gap-2 flex-col md:flex-row max-w-full md:max-w-none">
            <div className="max-w-16 text-white shrink-0">
              <Avatar size={44}>forloops</Avatar>
            </div>
            <div className="glass flex p-4 rounded-e-xl rounded-es-xl max-w-full md:max-w-none">
              <div className="flex flex-col overflow-hidden pre-overflow-y-auto">
                <div className="text-sm font-normal text-white/80 markdown max-h-72 overflow-y-auto">
                  {/* {index === messages?.length - 1 && message.text === "" ? ( */}
                  {message?.text === "" ? (
                    <div className="">
                      <div>
                        <div className="stage w-full min-w-16 p-2">
                          <div className="dot-pulse"></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <TextContent text={message?.text} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftBubble;
