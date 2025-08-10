/* eslint-disable react/prop-types */
import "./skillIcon.scss";
import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

function SkillIcon({ z, handleMsg, skill, setSelectedSkill }) {
  const [inViewRef, inView] = useInView({
    threshold: 0.5,
  });

  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const [barColor, setBarColor] = useState("red");
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    if (inView && animatedPercentage !== skill?.percentage) {
      const interval = setInterval(() => {
        setAnimatedPercentage((prev) => {
          const nextValue =
            prev < skill?.percentage ? prev + 1 : skill?.percentage;
          if (nextValue <= 50) {
            setBarColor("#F63737");
          } else if (nextValue > 50 && nextValue < 75) {
            setBarColor("#FFB700");
          } else if (nextValue >= 75) {
            setBarColor("#28C244");
          }
          return nextValue;
        });
      }, 15);
      return () => clearInterval(interval);
    }
  }, [inView, animatedPercentage, skill?.percentage]);

  useEffect(() => {
    const checkScreenWidth = () => {
      if (window.innerWidth < 850) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };
    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);
    return () => {
      window.addEventListener("resize", checkScreenWidth);
    };
  }, []);

  return (
    <motion.div
      onMouseEnter={() => {
        handleMsg(true, skill?.title);
      }}
      onMouseLeave={() => {
        handleMsg(false, "");
      }}
      viewport={{ once: true }}
      initial={{
        x: "-50%",
        y: "-50%",
      }}
      whileInView={{
        x: isSmallScreen
          ? `${skill?.positions.xs}%`
          : `${skill?.positions.xl}%`,
        y: isSmallScreen
          ? `${skill?.positions.ys}%`
          : `${skill?.positions.yl}%`,
      }}
      transition={{
        duration: 1,
        ease: [0.65, 0, 0.35, 1],
      }}
      className="skillIcon-div"
      ref={inViewRef}
      style={{
        width: `${isSmallScreen ? 50 : 100}px`,
        height: `${isSmallScreen ? 50 : 100}px`,
        zIndex: z,
      }}
      onClick={() => setSelectedSkill(skill._id)}
    >
      <CircularProgressbar
        className="circle"
        value={animatedPercentage}
        styles={buildStyles({
          pathColor: barColor,
          trailColor: "#0E0E24",
          textColor: "white",
          textSize: "20px",
        })}
      />
      {skill?.icon && (
        <>
          <div className="skill-icon">
            <img src={skill?.icon} alt="" />
          </div>
        </>
      )}
    </motion.div>
  );
}

export default SkillIcon;
