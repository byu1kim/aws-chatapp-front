import Chats from "./components/Chats";
import Messages from "./components/Messages";
import { GlobalContext } from "./components/GlobalContext";

import { useState, useEffect, useContext } from "react";

function App() {
  const { messages } = useContext(GlobalContext);

  const [navOpen, setNavOpen] = useState();
  const [mobile, setMobile] = useState();

  const isDesktop = (e) => {
    if (e.matches) {
      setNavOpen(true);
      setMobile(false);
    } else {
      setNavOpen(false);
      setMobile(true);
    }
  };

  const showHideNav = () => {
    setNavOpen(!navOpen);
  };

  useEffect(() => {
    let mediaQuery = window.matchMedia("(min-width: 650px");
    mediaQuery.addEventListener("change", isDesktop);
    if (mediaQuery.matches) {
      setNavOpen(true);
      setMobile(false);
    } else {
      setNavOpen(false);
      setMobile(true);
    }
    return () => mediaQuery.addEventListener("change", isDesktop);
  }, []);

  return (
    <main className="flex w-screen h-screen">
      <div className={`${mobile ? "bg-zinc-800" : "hidden"} fixed w-full h-12 z-20 flex items-center`}>
        <button onClick={showHideNav}>
          <div className="visible justify-center items-center text-white pl-5">
            {navOpen ? <i className="fa-solid fa-x"></i> : <i className="fa-solid fa-bars"></i>}
          </div>
        </button>
      </div>
      <div className={` ${navOpen ? "" : "hidden"} ${mobile ? "fixed pt-12 h-full" : "static pt-2"}  w-96 bg-zinc-800`}>
        <Chats />
      </div>
      <div className="w-full bg-gray-200">
        {messages ? (
          <Messages />
        ) : (
          <div className="flex flex-col h-full justify-center items-center text-2xl">
            Click new chat to start conversation<p className="text-lg">Ask Byulpt today's weahter!</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
