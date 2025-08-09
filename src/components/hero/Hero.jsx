// @ts-nocheck
/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import "./hero.scss";
import { motion } from "framer-motion";

function Hero({ handleMsg, setShowResume }) {
  const { profile } = useSelector((state) => state.profile);
  const textVariants = {
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

  const sliderVariants = {
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
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
          <motion.h2
            onMouseEnter={() => handleMsg(true, "That's Sankalp, his name.")}
            onMouseLeave={() => handleMsg(false, "")}
            variants={textVariants}
          >
            SANKALP
          </motion.h2>
          <motion.h1
            onMouseEnter={() =>
              handleMsg(true, "Yep, he's the developer in action!")
            }
            onMouseLeave={() => handleMsg(false, "")}
            variants={textVariants}
          >
            Web developer
          </motion.h1>
          <motion.div variants={textVariants} className="buttons">
            <motion.button
              onMouseEnter={() =>
                handleMsg(true, "Check out the latest Resume!")
              }
              onMouseLeave={() => handleMsg(false, "")}
              onClick={() => setShowResume(true)}
              variants={textVariants}
            >
              View Resume
            </motion.button>
            <a href="#Contact">
              <motion.button
                onMouseEnter={() => handleMsg(true, "Get in touch?")}
                onMouseLeave={() => handleMsg(false, "")}
                variants={textVariants}
              >
                Contact Me
              </motion.button>
            </a>
          </motion.div>
          <motion.img
            variants={textVariants}
            animate="scrollButton"
            src="/scroll.png"
            alt=""
          />
        </motion.div>
      </div>
      <motion.div
        className="slidingTextContainer"
        variants={sliderVariants}
        initial="initial"
        animate="animate"
      >
        Web developer
      </motion.div>
      <div
        onMouseEnter={() => handleMsg(true, "That's Sankalp right there.")}
        onMouseLeave={() => handleMsg(false, "")}
        className="imageContainer"
      >
        <img src={profile?.profilePic} alt="Profile Picture" />
      </div>
    </div>
  );
}

export default Hero;
