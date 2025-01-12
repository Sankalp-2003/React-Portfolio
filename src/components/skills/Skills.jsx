import React, { useEffect, useRef, useState } from "react";
import "./skills.scss";
import { motion } from "framer-motion";
import SkillIcon from "../skillIcon/SkillIcon";

function Skills({ handleMsg }) {
  const [isSmallScreen, setSmallScreen] = useState(false);
  useEffect(() => {
    const checkScreenWidth = () => {
      if (window.innerWidth < 870) {
        setSmallScreen(true);
      } else {
        setSmallScreen(false);
      }
    };
    checkScreenWidth();

    window.addEventListener("resize", checkScreenWidth);

    return () => {
      window.addEventListener("resize", checkScreenWidth);
    };
  }, []);
  return (
    <div className="services">
      <div className="titleContainer">
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
      </div>
      <div className="bottom">
        <div className="bt-left">
          <div className="box">
            <SkillIcon
              handleMsg={handleMsg}
              title={"JavaScript"}
              percentage={90}
              size={"100"}
              icon={"icons/jsIcon.png"}
              xl={-350}
              yl={-270}
              xs={-290}
              ys={-260}
              z={1}
              text={false}
            />
            <SkillIcon
              handleMsg={handleMsg}
              title={"TypeScript"}
              percentage={75}
              size={"100"}
              icon={"icons/tsIcon.png"}
              xl={-210}
              yl={-200}
              xs={-180}
              ys={-170}
              z={2}
              text={false}
            />
            <SkillIcon
              handleMsg={handleMsg}
              title={"React JS"}
              percentage={90}
              size={"100"}
              icon={"icons/reactIcon.png"}
              xl={250}
              yl={-270}
              xs={180}
              ys={-260}
              z={2}
              text={false}
            />
            <SkillIcon
              handleMsg={handleMsg}
              title={"Angular"}
              percentage={70}
              size={"100"}
              icon={"icons/angularIcon.png"}
              xl={100}
              yl={-200}
              xs={80}
              ys={-170}
              z={2}
              text={false}
            />
            <SkillIcon
              handleMsg={handleMsg}
              title={"Sass/Scss"}
              percentage={80}
              size={"100"}
              icon={"icons/sassIcon.png"}
              xl={100}
              yl={90}
              xs={80}
              ys={60}
              z={2}
              text={false}
            />
            <SkillIcon
              handleMsg={handleMsg}
              title={"Tailwind Css"}
              percentage={70}
              size={"100"}
              icon={"icons/tailwindIcon.png"}
              xl={250}
              yl={170}
              xs={180}
              ys={150}
              z={2}
              text={false}
            />
            <SkillIcon
              handleMsg={handleMsg}
              title={"HTML"}
              percentage={90}
              size={"100"}
              icon={"icons/htmlIcon.png"}
              xl={-210}
              yl={90}
              xs={-180}
              ys={60}
              z={2}
              text={false}
            />
            <SkillIcon
              handleMsg={handleMsg}
              title={"CSS"}
              percentage={90}
              size={"100"}
              icon={"icons/cssIcon.png"}
              xl={-350}
              yl={170}
              xs={-290}
              ys={150}
              z={2}
              text={false}
            />
            <SkillIcon
              handleMsg={handleMsg}
              title={"Bootstrap"}
              percentage={85}
              size={"100"}
              icon={"icons/bootstrapIcon.png"}
              xl={-300}
              yl={-50}
              xs={-260}
              ys={-55}
              z={2}
              text={false}
            />
            <SkillIcon
              handleMsg={handleMsg}
              title={"Redux Tool Kit"}
              percentage={80}
              size={"100"}
              icon={"icons/reduxIcon.png"}
              xl={200}
              yl={-50}
              xs={160}
              ys={-55}
              z={2}
              text={false}
            />
            <SkillIcon
              handleMsg={handleMsg}
              title={"NPM"}
              percentage={80}
              size={"100"}
              icon={"icons/npmIcon.png"}
              xl={-50}
              yl={-250}
              xs={-50}
              ys={-240}
              z={2}
              text={false}
            />
            <SkillIcon
              handleMsg={handleMsg}
              title={"Git & Github"}
              percentage={80}
              size={"100"}
              icon={"icons/gitIcon.png"}
              xl={-50}
              yl={150}
              xs={-50}
              ys={130}
              z={2}
              text={false}
            />
          </div>
          <div className="skill-img">
            <img src="knowledge.avif" alt="" />
          </div>
        </div>
        <motion.div
          initial={{
            x: !isSmallScreen && "-105%",
            y: isSmallScreen && "105%",
          }}
          whileInView={{
            x: 0,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 2,
            ease: [0.65, 0, 0.35, 1],
          }}
          className="bt-right"
        ></motion.div>
      </div>
    </div>
  );
}

export default Skills;
