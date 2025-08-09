// @ts-nocheck
import { useEffect, useState } from "react";
import Cursor from "../../components/cursor/Cursor";
import Face from "../../components/bot/Face";
import Message from "../../components/message/Message";
import Resume from "../../components/resume/Resume";
import Navbar from "../../components/navbar/Navbar";
import Hero from "../../components/hero/Hero";
import Parallax from "../../components/parallax/Parallax";
import Skills from "../../components/skills/Skills";
import Portfolio from "../../components/portfolio/Portfolio";
import Contact from "../../components/contact/Contact";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfilePic } from "../../redux/slices/profileSlice";
import { getSkillImages, getSkills } from "../../redux/slices/skillSlice";
import { fetchProjects } from "../../redux/slices/projectSlice";
import "./home.scss";
import { AnimatePresence, motion } from "framer-motion";
import { ThreeDots } from "react-loader-spinner";

const Home = () => {
  const [isMessage, setIsMessage] = useState(true);
  const [msgInput, setMsgInput] = useState("");
  const [showResume, setShowResume] = useState(false);
  const dispatch = useDispatch();
  const { loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: skillsLoading } = useSelector((state) => state.skills);
  const { loading: projectsLoading } = useSelector((state) => state.projects);

  const loading = skillsLoading || projectsLoading || profileLoading;

  const handleMsg = (check, msg) => {
    setIsMessage(check);
    setMsgInput(msg);
    setMsgInput(msg);
    setIsMessage(check);
  };

  useEffect(() => {
    dispatch(fetchProfilePic());
    dispatch(getSkills());
    dispatch(fetchProjects());
    dispatch(getSkillImages());
  }, [dispatch]);

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
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            className="portfolio-loading"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <ThreeDots
              visible={true}
              height="200"
              width="200"
              color="#663399"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        <Cursor />
        <Face handleMsg={handleMsg} />
        <Message
          isMessage={isMessage}
          msgInput={msgInput}
          handleMsg={handleMsg}
        />
        {showResume && <Resume setShowResume={setShowResume} />}
        <section id="homepage">
          <Navbar handleMsg={handleMsg} />
          <Hero handleMsg={handleMsg} setShowResume={setShowResume} />
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
    </>
  );
};

export default Home;
