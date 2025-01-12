import "./skillIcon.scss";
import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

function SkillIcon({
  percentage,
  size,
  icon,
  xl,
  yl,
  xs,
  ys,
  z,
  text,
  handleMsg,
  title,
}) {
  const [inViewRef, inView] = useInView({
    threshold: 0.5,
  });

  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const [barColor, setBarColor] = useState("red");
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    if (inView && animatedPercentage !== percentage) {
      const interval = setInterval(() => {
        setAnimatedPercentage((prev) => {
          const nextValue = prev < percentage ? prev + 1 : percentage;
          if (nextValue <= 50) {
            setBarColor("red");
          } else if (nextValue > 50 && nextValue < 75) {
            setBarColor("orange");
          } else if (nextValue >= 75) {
            setBarColor("green");
          }
          return nextValue;
        });
      }, 15);
      return () => clearInterval(interval);
    }
  }, [inView, animatedPercentage, percentage]);

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
      onMouseEnter={() => handleMsg(true, title)}
      onMouseLeave={() => handleMsg(false, "")}
      initial={{
        x: "-50%",
        y: "-50%",
      }}
      whileInView={{
        x: isSmallScreen ? `${xs}%` : `${xl}%`,
        y: isSmallScreen ? `${ys}%` : `${yl}%`,
      }}
      transition={{
        duration: 1,
        ease: [0.65, 0, 0.35, 1],
      }}
      className="skillIcon-div"
      ref={inViewRef}
      style={{
        width: `${isSmallScreen ? size / 2 : size}px`,
        height: `${isSmallScreen ? size / 2 : size}px`,
        zIndex: z,
      }}
    >
      <CircularProgressbar
        className="circle"
        value={animatedPercentage}
        text={text ? `${animatedPercentage}%` : ""}
        styles={buildStyles({
          pathColor: barColor,
          trailColor: "#0E0E24",
          textColor: "white",
          textSize: "20px",
        })}
      />
      {icon && (
        <>
          <div className="skill-icon">
            <img src={icon} alt="" />
          </div>
        </>
      )}
    </motion.div>
  );
}

export default SkillIcon;
