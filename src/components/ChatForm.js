import { useContext, useState } from "react";
import axios from "axios";
import { GlobalContext } from "./GlobalContext";
import { Auth, API } from "aws-amplify";

export default function MessageForm({ chat }) {
  const { apiUrl, setChats, setChatId, setChatName, setMessages } = useContext(GlobalContext);

  const [name, setName] = useState(chat.name);
  const [edit, setEdit] = useState(false);

  // Display message panel on the right
  const handleMessagePanel = async () => {
    setChatId(chat.id);
    setChatName(chat.name);
    try {
      const res = await API.get("api", `/messages/${chat.id}`, {
        headers: {
          Authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
        },
      });
      setMessages(res.messages);
    } catch (e) {
      console.log(e);
    }
  };

  // Delete chat and reset messages
  const handleChatDelete = async () => {
    try {
      const response = await API.del("api", `/chats/${chat.id}`, {
        headers: {
          Authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
        },
      });
      console.log(response);
      setChats(response.chats);
      setMessages();
    } catch (error) {
      console.log(error);
    }
  };

  // Handle edit const
  const handleChatEdit = () => {
    setEdit(true);
  };

  // Edit chat name
  const handleChatEditSubmit = async () => {
    try {
      const response = await API.put("api", `/chats/${chat.id}`, {
        body: { name: name },
        headers: {
          Authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
        },
      });
      setName(response.chat.name);
      setEdit(false);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div key={chat.id} className="flex p-2">
      {/* Display edit form if edit is true, or display just chatname */}
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
      {/* Edit button */}
      <button className="hover:text-rose-400 mr-2" onClick={handleChatEdit}>
        <i className="fa-solid fa-pen pr-2"></i>
      </button>

      {/* Delete button */}
      <button className="hover:text-rose-400" onClick={handleChatDelete}>
        <i className="fa-solid fa-trash-can"></i>
      </button>
    </div>
  );
}
