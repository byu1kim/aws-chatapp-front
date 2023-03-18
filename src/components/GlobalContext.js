import { createContext, useState } from "react";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [chatId, setChatId] = useState();
  const [chats, setChats] = useState();
  const [messages, setMessages] = useState();
  const [chatName, setChatName] = useState();

  return (
    <GlobalContext.Provider
      value={{ apiUrl, chatId, setChatId, chats, setChats, messages, setMessages, chatName, setChatName }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
