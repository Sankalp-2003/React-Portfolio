import React, { useRef } from "react";
import "./skills.scss";
import { motion, useInView } from "framer-motion";

const varients = {
  initial: {
    x: -500,
    y: 100,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildern: 0.1,
    },
  },
};

function Skills({ handleMsg }) {
  const ref = useRef();
  const isInView = useInView(ref, { margin: "-100px" });
  return (
    <motion.div
      className="services"
      variants={varients}
      initial="initial"
      // whileInView="animate"
      ref={ref}
      animate={"animate"}
    >
      <motion.div className="textContainer" variants={varients}>
        <p>
          Crafting Responsive and
          <br />
          Interactive Web Experiences
        </p>
        <hr />
      </motion.div>
      <motion.div className="titleContainer" variants={varients}>
        <div className="title">
          <img src="skills.jpeg" alt="" />
          <h1>
            <motion.b whileHover={{ color: "orange" }}>The Skills </motion.b>{" "}
            Behind
          </h1>
        </div>
        <div className="title">
          <h1>
            My Creative{" "}
            <motion.b whileHover={{ color: "orange" }}>Journey.</motion.b>{" "}
          </h1>
          <button>Skills</button>
        </div>
      </motion.div>
      <motion.div
        className="listContainer"
        onMouseEnter={() => handleMsg(true, "All the skills...")}
        onMouseLeave={() => handleMsg(false, "")}
        variants={varients}
      >
        <motion.div
          className="box"
          whileHover={{ background: "lightgray", color: "black" }}
        >
          <div className="boxWrapper">
            <h2>Languages:</h2>
            <h3>JavaScript</h3>
          </div>
          <p>
            Skilled in JavaScript for creating interactive and dynamic web
            features. Proficient with modern ES6+ syntax, asynchronous
            operations, and working with APIs to enhance web applications.
          </p>
        </motion.div>
        <motion.div
          className="box"
          whileHover={{ background: "lightgray", color: "black" }}
        >
          <div className="boxWrapper">
            <h2>Web Development:</h2>

            <h3>
              CSS | SASS | DOM Manipulation
              <br />| AJAX | Async Js | APIs | REST APIs | Git & Version Control
              | Redux
            </h3>
          </div>
          <p>
            Experienced in CSS, SASS, and DOM manipulation for creating dynamic
            web pages. Skilled in AJAX, Async JavaScript, and APIs for smooth
            data handling, and proficient with Git for version control and Redux
            for state management.
          </p>
        </motion.div>
        <motion.div
          className="box"
          whileHover={{ background: "lightgray", color: "black" }}
        >
          <div className="boxWrapper">
            <h2>WebDev Tools:</h2>
            <h3>VSCode | Chrome DevTools | Github | Netlify | Figma</h3>
          </div>
          <p>
            Proficient in using VSCode for efficient coding, Chrome DevTools for
            debugging and performance analysis, and GitHub for version control.
            Experienced with Netlify for deploying websites and Figma for
            designing user interfaces.
          </p>
        </motion.div>
        <motion.div
          className="box"
          whileHover={{ background: "lightgray", color: "black" }}
        >
          <div className="boxWrapper">
            <h2>Frameworks:</h2>
            <h3>Bootstrap | Tailwind | React.js</h3>
          </div>
          <p>
            Experienced with Bootstrap and Tailwind for responsive, customizable
            designs. Proficient in React.js for building dynamic,
            component-based user interfaces and creating interactive web
            applications.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Skills;
