import React from "react";
import "./hero.scss";
import { motion } from "framer-motion";

function Hero({ handleMsg }) {
  const textVarients = {
    initial: {
      x: -500,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildern: 0.1,
      },
    },
    scrollButton: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 2,
        repeat: Infinity,
      },
    },
  };

  const sliderVarients = {
    initial: {
      x: 0,
    },
    animate: {
      x: "-220%",
      transition: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 20,
      },
    },
  };

  return (
    <div className="hero">
      <div className="wrapper">
        <motion.div
          className="textContainer"
          variants={textVarients}
          initial="initial"
          animate="animate"
        >
          <motion.h2
            onMouseEnter={() => handleMsg(true, "That's Sankalp, his name.")}
            onMouseLeave={() => handleMsg(false, "")}
            variants={textVarients}
          >
            SANKALP
          </motion.h2>
          <motion.h1
            onMouseEnter={() =>
              handleMsg(true, "Yep, he's the developer in action!")
            }
            onMouseLeave={() => handleMsg(false, "")}
            variants={textVarients}
          >
            Web developer
          </motion.h1>
          <motion.div variants={textVarients} className="buttons">
            <a href="#Portfolio">
              <motion.button
                onMouseEnter={() => handleMsg(true, "Check out the work!")}
                onMouseLeave={() => handleMsg(false, "")}
                variants={textVarients}
              >
                See the Latest Works
              </motion.button>
            </a>
            <a href="#Contact">
              <motion.button
                onMouseEnter={() => handleMsg(true, "Get in touch?")}
                onMouseLeave={() => handleMsg(false, "")}
                variants={textVarients}
              >
                Contact Me
              </motion.button>
            </a>
          </motion.div>
          <motion.img
            variants={textVarients}
            animate="scrollButton"
            src="/scroll.png"
            alt=""
          />
        </motion.div>
      </div>
      <motion.div
        className="slidingTextContainer"
        variants={sliderVarients}
        initial="initial"
        animate="animate"
      >
        Web devaloper
      </motion.div>
      <div
        onMouseEnter={() => handleMsg(true, "That's Sankalp right there.")}
        onMouseLeave={() => handleMsg(false, "")}
        className="imageContainer"
      >
        <img src="/profile.png" alt="" />
      </div>
    </div>
  );
}

export default Hero;
