import { useState, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "./GlobalContext";
import MessageForm from "./MessageForm";

function Messages() {
  const { apiUrl, chatId, messages, setMessages, chatName } = useContext(GlobalContext);

  const [content, setContent] = useState("");
  const [btnDis, setBtnDis] = useState(false);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    setBtnDis(true);

    // Simple case for AI replies..
    let reply;
    if (content.includes("hi") || content.includes("hello")) {
      reply = "Hi!";
    } else if (content.includes("how are you")) {
      reply = "I'm find, and you?";
    } else if (content.includes("weather")) {
      reply = "Check here! https://weather.gc.ca/city/pages/bc-74_metric_e.html ";
    } else if (content.includes("good")) {
      reply = "Glad to hear that!";
    } else {
      reply = "Sorry, I'm not ready to answer that question yet.";
    }

    axios.post(apiUrl + `/messages/${chatId}`, { chat_id: chatId, content: content, reply: reply }).then((res) => {
      setMessages([...messages, res.data.message]);
      setBtnDis(false);
    });
    console.log("clicked message submit!");
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
