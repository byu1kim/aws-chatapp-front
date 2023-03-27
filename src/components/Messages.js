import { useState, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "./GlobalContext";
import MessageForm from "./MessageForm";
import { Reply } from "../reply";

function Messages() {
  const { apiUrl, chatId, messages, setMessages, chatName } = useContext(GlobalContext);

  const [content, setContent] = useState("");
  // If submit is on process, disable the submit form so user don't submit during the process
  const [btnDis, setBtnDis] = useState(false);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    // disable submit form
    setBtnDis(true);

    // Simple case for AI replies..
    const reply = Reply(content);

    axios.post(apiUrl + `/messages/${chatId}`, { chat_id: chatId, content: content, reply: reply }).then((res) => {
      setMessages([...messages, res.data.message]);
      // enable submit form
      setBtnDis(false);
    });
    setContent("");
  };

  return (
    <>
      <div className="h-full flex flex-col">
        <div className="h-full p-5 overflow-auto">
          <div className="flex justify-center">
            Messages with<span className="font-bold">&nbsp;{chatName}</span>
          </div>
          {/* Display 'start' message if messages are none */}
          {messages
            ? messages.map((message) => <MessageForm message={message} key={message.id} />)
            : "Start your message"}
        </div>
        <div className={`h-24 flex items-center ${btnDis ? "hidden" : ""}`}>
          <form onSubmit={handleMessageSubmit} className="flex w-full mx-5 p-2 bg-white rounded-lg shadow-md">
            <label htmlFor="name" />
            <input
              type="text"
              name="name"
              onChange={(e) => setContent(e.target.value)}
              value={content}
              placeholder="How are you today?"
              className="w-full p-2"
            />
            <button className="p-2 disabled:text-white" disabled={btnDis ? true : false}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Messages;
