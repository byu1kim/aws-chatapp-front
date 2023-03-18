import { useContext, useState } from "react";
import axios from "axios";
import { GlobalContext } from "./GlobalContext";

export default function MessageForm({ chat }) {
  const { apiUrl, setChats, setChatId, setChatName, setMessages } = useContext(GlobalContext);

  const [name, setName] = useState(chat.name);
  const [edit, setEdit] = useState(false);

  const handleMessagePanel = () => {
    setChatId(chat.id);
    setChatName(chat.name);
    axios.get(apiUrl + `/messages/${chat.id}`).then((res) => {
      setMessages(res.data.messages);
    });
  };

  const handleChatDelete = () => {
    axios.delete(apiUrl + `/chats/${chat.id}`).then((res) => setChats(res.data.chats));
    setMessages();
  };

  const handleChatEdit = () => {
    setEdit(true);
  };

  const handleChatEditSubmit = () => {
    axios.put(apiUrl + `/chats/${chat.id}`, { name: name }).then((res) => setName(res.data.chat.name));
    setEdit(false);
  };

  return (
    <div key={chat.id} className="flex p-2">
      {edit ? (
        <form
          className="w-full flex"
          onSubmit={(e) => {
            e.preventDefault();
            handleChatEditSubmit();
          }}
        >
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="text-zinc-500 w-28" />
          <button>Edit</button>
        </form>
      ) : (
        <div className="w-full hover:cursor-pointer hover:text-rose-400" onClick={handleMessagePanel}>
          {name}
        </div>
      )}

      <button className="hover:text-rose-400 mr-2" onClick={handleChatEdit}>
        <i className="fa-solid fa-pen pr-2"></i>
      </button>

      <button className="hover:text-rose-400" onClick={handleChatDelete}>
        <i className="fa-solid fa-trash-can"></i>
      </button>
    </div>
  );
}
