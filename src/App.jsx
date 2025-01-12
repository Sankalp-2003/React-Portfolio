import { useEffect, useState } from "react";
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
import Resume from "./components/resume/Resume";

const App = () => {
  const [isMessage, setIsMessage] = useState(true);
  const [msgInput, setMsgInput] = useState("");
  const [showResume, setShowResume] = useState(false);
  const handleMsg = (check, msg) => {
    setIsMessage(check);
    setMsgInput(msg);
    setMsgInput(msg);
    setIsMessage(check);
  };
  useEffect(() => {
    if (showResume) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showResume]);
  return (
    <div>
      <Cursor />
      <Face handleMsg={handleMsg} />
      <Message
        isMessage={isMessage}
        msgInput={msgInput}
        handleMsg={handleMsg}
      />
      {showResume && (
        <Resume showResume={showResume} setShowResume={setShowResume} />
      )}
      <section id="homepage">
        <Navbar handleMsg={handleMsg} />
        <Hero
          handleMsg={handleMsg}
          showResume={showResume}
          setShowResume={setShowResume}
        />
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
