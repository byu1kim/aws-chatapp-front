import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "./GlobalContext";
import ChatForm from "../components/ChatForm";
import { Auth, API } from "aws-amplify";

function Chats() {
  const { apiUrl, chats, setChats } = useContext(GlobalContext);

  const [name, setName] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("api", "/chats", {
        body: { name: name },
        headers: {
          Authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
        },
      });
      console.log(response);
      setChats([response.chat, ...chats]);
    } catch (error) {
      alert(error);
    }
    setName("");
    setPanelOpen(false);
  };

  const handlePanel = () => {
    setPanelOpen(!panelOpen);
  };

  useEffect(() => {
    async function getReq() {
      const res = await API.get("api", "/chats", {
        headers: {
          Authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
        },
      });
      console.log(res.chats);
      setChats(res.chats);
    }
    getReq();
  }, [apiUrl, setChats]);

  return (
    <>
      <div className="text-white">
        <div className="m-2 py-2 px-3 rounded-lg border border-zinc-400 hover:cursor-pointer" onClick={handlePanel}>
          + New Chat
        </div>
        <div className={`${panelOpen ? "" : "hidden"} p-3`}>
          <form onSubmit={handleSubmit} className="flex">
            <label htmlFor="name" />
            <input
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Name"
              className="mr-2 w-full pl-2 text-zinc-800"
            />
            <button className="bg-zinc-500 w-40 hover:bg-rose-400 rounded py-1">Register</button>
          </form>
        </div>
        <div className="p-2">
          {/* Handled loading here */}
          {chats ? chats.map((chat) => <ChatForm chat={chat} key={chat.id} />) : <div className=" ">Loading...</div>}
        </div>
      </div>
    </>
  );
}

export default Chats;
