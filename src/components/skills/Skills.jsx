/* eslint-disable react/prop-types */
// @ts-nocheck
import "./skills.scss";
import { motion } from "framer-motion";
import SkillIcon from "../skillIcon/SkillIcon";
import { useSelector } from "react-redux";
import { useState } from "react";
import SkillPositionEditor from "./SkillPositionEditor";

function Skills({ handleMsg }) {
  const { skills } = useSelector((state) => state.skills);
  const [selectedSkill, setSelectedSkill] = useState(null);

  return (
    <div className="services">
      <SkillPositionEditor
        skillId={selectedSkill}
        onClear={() => setSelectedSkill(null)}
      />
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
            {skills?.map((skill, index) => (
              <SkillIcon
                key={index}
                handleMsg={handleMsg}
                z={index + 1}
                skill={skill}
                setSelectedSkill={setSelectedSkill}
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
