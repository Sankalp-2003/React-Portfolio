import { useEffect, useState } from "react";
import "./skillinfo.scss";

function Skillinfo({ skill }) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    const handleScreenSize = () => {
      if (window.innerWidth < 870) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };
    handleScreenSize();

    document.addEventListener("resize", handleScreenSize);

    return () => {
      document.addEventListener("resize", handleScreenSize);
    };
  }, []);

  if (!skill) {
    if (isSmallScreen) {
      return (
        <div className="null-info">
          <img src="hand.png" alt="" />
          <h2>Please click over a skill to see more information.</h2>
        </div>
      );
    } else {
      return (
        <div className="null-info">
          <img src="hand.png" alt="" />
          <h2>Please hover over a skill to see more information.</h2>
        </div>
      );
    }
  }

  if (skill) {
    return (
      <div className="skill-info-detail">
        <img src={skill.icon} width="100px" height="100px" alt="" />
        <h2>{skill.title}</h2>
        <p>{skill.description}</p>
      </div>
    );
  }
}

export default Skillinfo;
