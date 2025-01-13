import React, { useRef, useState } from "react";
import "./portfolio.scss";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import Icons from "./icons/Icons";
import { ITEMS } from "./data";

const items = ITEMS;

const Single = ({ item, handleMsg }) => {
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
  });

  const y = useTransform(scrollYProgress, [0, 1], [-300, 300]);
  const [hovering, setHovering] = useState(false);

  const imgEnter = (e) => {
    setHovering(true);
    handleMsg(true, e);
  };
  const imgLeave = () => {
    setHovering(false);
    handleMsg(true, "");
  };

  return (
    <section>
      <div className="container">
        <div className="wrapper">
          <motion.div
            onMouseEnter={() => imgEnter(item.para)}
            onMouseLeave={imgLeave}
            initial={{ scale: 1 }}
            animate={hovering ? { scale: 0.9 } : { scale: 1 }}
            transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
            className="imgContainer"
            ref={ref}
          >
            <motion.img
              initial={{ scale: 1 }}
              animate={hovering ? { scale: 1.2 } : { scale: 1 }}
              transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
              src={item.img}
              alt=""
            />
            <a href={item.link}>
              <h1>
                {item.name.split("").map((e, i) => (
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={hovering ? { y: "0%" } : { y: "100%" }}
                    transition={{ ease: [0.22, 1, 0.36, 1], delay: i * 0.02 }}
                    key={i}
                  >
                    {e}
                  </motion.span>
                ))}
              </h1>
            </a>
          </motion.div>
          <motion.div className="textContainer" style={{ y }}>
            <h2>{item.title}</h2>
            <p>{item.desc}</p>
            <div className="links">
              <a
                onMouseEnter={() => handleMsg(true, "Watch Live Demo")}
                onMouseLeave={() => handleMsg(false, "")}
                href={item.link}
                className="demo"
              >
                <button>See Demo</button>
              </a>
              <a
                onMouseEnter={() => handleMsg(true, "See Source Code")}
                onMouseLeave={() => handleMsg(false, "")}
                href={item.git}
                className="git"
              >
                <FaGithub />
              </a>
            </div>
            <Icons icons={item.icons} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

function Portfolio({ handleMsg }) {
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <div className="portfolio" ref={ref}>
      <div className="progress">
        <h1>Featured Works</h1>
        <motion.div style={{ scaleX }} className="progressBar"></motion.div>
      </div>
      {items.map((item) => (
        <Single handleMsg={handleMsg} item={item} key={item.id} />
      ))}
    </div>
  );
}

export default Portfolio;
