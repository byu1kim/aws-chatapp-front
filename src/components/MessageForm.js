import { useContext, useState } from "react";
import { GlobalContext } from "./GlobalContext";
import { Auth, API } from "aws-amplify";

export default function MessageForm({ message }) {
  const { chatId, setMessages } = useContext(GlobalContext);

  const [content, setContent] = useState(message.content);
  const [edit, setEdit] = useState(false);

  const handleMessageDelete = async (messageId) => {
    try {
      const res = await API.del("api", `/messages/${chatId}/${messageId}`, {
        headers: {
          Authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
        },
      });
      setMessages(res.messages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMessageEdit = () => {
    setEdit(true);
  };

  const handleMessageEditSubmit = async (messageId) => {
    try {
      const response = await API.put("api", `/messages/${chatId}/${messageId}`, {
        body: { content: content },
        headers: {
          Authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
        },
      });
      setContent(response.message.content);
      setEdit(false);
    } catch (error) {
      alert(error);
    }
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
