import React, { useEffect, useRef } from "react";
import "./eyeBall.scss";
import gsap from "gsap";

const EyeBall = () => {
  const bigBallRef = useRef(null);
  const eyeBallRef = useRef(null);

  useEffect(() => {
    const bigBall = bigBallRef.current;
    const eyeBall = eyeBallRef.current;

    const handleMouseMove = (details) => {
      const { left, top, width, height } = eyeBall.getBoundingClientRect();
      const bigBallWidth = bigBall.getBoundingClientRect().width;
      const bigBallHeight = bigBall.getBoundingClientRect().height;

      const xOffset = (details.clientX - left) / width;
      const yOffset = (details.clientY - top) / height;

      const xval = gsap.utils.clamp(
        bigBallWidth / 2,
        width - bigBallWidth / 2,
        xOffset * width - bigBallWidth / 2
      );

      const yval = gsap.utils.clamp(
        bigBallHeight / 2,
        height - bigBallHeight / 2,
        yOffset * height - bigBallHeight / 2
      );

      gsap.to(bigBall, {
        left: `${xval}px`,
        top: `${yval}px`,
        duration: 1,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="eyeBall" ref={eyeBallRef}>
      <div className="bigBall" ref={bigBallRef}>
        <div className="smallBall"></div>
      </div>
    </div>
  );
};

export default EyeBall;
