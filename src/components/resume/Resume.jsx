import React, { useEffect, useRef } from "react";
import "./resume.scss";
function Resume({ showResume, setShowResume }) {
  const resumeRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = () => {
      if (resumeRef.current && !resumeRef.current.contains(event.target)) {
        setShowResume(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, [setShowResume]);
  return (
    <>
      <div className="resume">
        <div className="inner" ref={resumeRef}>
          <object
            data="Sankalp's-Resume2025.pdf"
            type="application/pdf"
          ></object>
        </div>
        <div className="btn" onClick={() => setShowResume(false)}>
          <p style={{ rotate: "45deg" }}>+</p>
        </div>
      </div>
    </>
  );
}

export default Resume;
