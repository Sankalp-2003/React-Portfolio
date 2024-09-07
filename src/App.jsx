import { useState } from "react";
import "./app.scss";
import Contact from "./components/contact/Contact";
import Cursor from "./components/cursor/Cursor";
import Hero from "./components/hero/Hero";
import Message from "./components/message/Message";
import Navbar from "./components/navbar/Navbar";
import Parallax from "./components/parallax/Parallax";
import Portfolio from "./components/portfolio/Portfolio";
import Face from "./components/bot/Face";
import Skills from "./components/skills/Skills";

const App = () => {
  const [isMessage, setIsMessage] = useState(true);
  const [msgInput, setMsgInput] = useState("");
  const handleMsg = (check, msg) => {
    // if (check === true) {
    // setTimeout(() => {
    setIsMessage(check);
    // }, 100);

    setMsgInput(msg);
    // }
    // if (check === false) {
    // setTimeout(() => {
    setMsgInput(msg);
    // }, 100);
    setIsMessage(check);
    // }
  };
  return (
    <div>
      <Cursor />
      <Face handleMsg={handleMsg} />
      <Message
        isMessage={isMessage}
        msgInput={msgInput}
        handleMsg={handleMsg}
      />
      <section id="homepage">
        <Navbar handleMsg={handleMsg} />
        <Hero handleMsg={handleMsg} />
      </section>
      <section id="Skills">
        <Parallax type="services" />
      </section>
      <section>
        <Skills handleMsg={handleMsg} />
      </section>
      <section id="Works">
        <Parallax type="work" />
      </section>
      <div id="Portfolio">
        <Portfolio handleMsg={handleMsg} />
      </div>
      <section id="Contact">
        <Contact handleMsg={handleMsg} />
      </section>
    </div>
  );
};

export default App;
