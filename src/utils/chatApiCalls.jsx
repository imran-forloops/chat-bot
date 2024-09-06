import { message } from "antd";
import axios from "axios";

const Axios = axios.create({
  baseURL: `forloopsai.forloops.co`,
  // baseURL: `http://52.34.122.37:5002`,
  // baseURL: `https://chatbot.forloops.co`,
  headers: {
    "Content-Type": "text/event-stream",
  },
});

export const sendChatRequest = async (inputValue) => {
  try {
    const body = {
      params: { content: inputValue, thread_id: 40 },
    };
    const { data } = await Axios.get("/stream_chat", body);
    return data;
  } catch (error) {
    console.log("Error: ", error);
    // show error message
    if (error?.response && error.response.data) {
      // const details = JSON.parse(error.response.data);
      const resultdata = error.response.data.error;
      const messagedata = resultdata.length > 1 ? resultdata[1] : resultdata[0];
      if (resultdata.length > 1) {
        const jsonString = messagedata
          .match(/- (.*)/)[1]
          .replace(/'/g, '"')
          .replace(/None/g, "null");

        // Parse the JSON string to an object
        const errorObject = JSON.parse(jsonString);

        // Access the nested error message
        const errorMessage = errorObject.error.message;

        message.error(errorMessage);
      } else {
        // console.log("Error message:", errorMessage);
        message.error(messagedata);
      }
    }
  }
};

export const sendConfig = async (inputValue) => {
  try {
    const body = {
      model: inputValue.model,
      api: inputValue.api,
    };
    const { data } = await Axios.post("/configure", body);
    return data;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const getModel = async () => {
  try {
    const { data } = await Axios.get("/model");
    return data;
  } catch (error) {
    console.log("Error: ", error);
  }
};
