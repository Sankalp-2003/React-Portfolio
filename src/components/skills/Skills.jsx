/* eslint-disable react/prop-types */
// @ts-nocheck
import "./skills.scss";
import { motion } from "framer-motion";
import SkillIcon from "../skillIcon/SkillIcon";
import { SKILLS } from "./SkillsData";

function Skills({ handleMsg }) {
  const skillsInfo = SKILLS;
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
          <button>SKILLS</button>
        </div>
      </div>
      <div className="bottom">
        <div className="bt-left">
          <div>
            {skillsInfo.map((skill, i) => (
              <SkillIcon
                key={skill.id}
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
            <img src="knowledge.avif" alt="knowledge" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Skills;
