import { useContext, useState } from "react";
import axios from "axios";
import { GlobalContext } from "./GlobalContext";

export default function MessageForm({ message }) {
  const { apiUrl, chatId, setMessages } = useContext(GlobalContext);

  const [content, setContent] = useState(message.content);
  const [edit, setEdit] = useState(false);

  const handleMessageDelete = (messageId) => {
    axios.delete(apiUrl + `/messages/${chatId}/${messageId}`).then((res) => setMessages(res.data.messages));
  };

  const handleMessageEdit = () => {
    setEdit(true);
  };

  const handleMessageEditSubmit = (messageId) => {
    axios
      .put(apiUrl + `/messages/${chatId}/${messageId}`, { content: content })
      .then((res) => setContent(res.data.message.content));
    setEdit(false);
    console.log("edited!");
  };

  return (
    <>
      <div key={message.id} className="bg-rose-200 m-3 p-2 rounded-xl text-xl flex ml-20">
        {edit ? (
          <form
            className="w-full"
            onSubmit={(e) => {
              e.preventDefault();
              handleMessageEditSubmit(message.id);
            }}
          >
            <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />
            <button>Edit</button>
          </form>
        ) : (
          <div className="w-full">{content}</div>
        )}
        <button className="text-rose-300 hover:text-rose-400" onClick={handleMessageEdit}>
          <i className="fa-solid fa-pen pr-2"></i>
        </button>
        <button className="text-rose-300 hover:text-rose-400" onClick={() => handleMessageDelete(message.id)}>
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </div>
      {message.reply && <div className="bg-white m-3 p-2 rounded-xl text-xl flex w-5/6">{message.reply} </div>}
    </>
  );
}
