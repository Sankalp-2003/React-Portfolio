import React, { useEffect, useState } from "react";
import "./skills.scss";
import { motion } from "framer-motion";
import SkillIcon from "../skillIcon/SkillIcon";
import { SKILLS } from "./SkillsData";
import Skillinfo from "../skillInfo/Skillinfo";

function Skills({ handleMsg }) {
  const [isSmallScreen, setSmallScreen] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skillsInfo = SKILLS;

  const handleHover = (skill) => {
    setHoveredSkill(skill);
  };

  const skills = useEffect(() => {
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
            {skillsInfo.map((skill, i) => (
              <SkillIcon
                key={skill.id}
                skill={skill}
                onHover={handleHover}
                handleMsg={handleMsg}
                title={skill.title}
                percentage={skill.percentage}
                icon={skill.icon}
                xl={skill.xl}
                yl={skill.yl}
                xs={skill.xs}
                ys={skill.ys}
                z={i + 1}
              />
            ))}
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
        >
          <Skillinfo skill={hoveredSkill} />
        </motion.div>
      </div>
    </div>
  );
}

export default Skills;
