import React from "react";
import "./face.scss";
import EyeBall from "./EyeBall";

function Face({ handleMsg }) {
  return (
    <div
      onMouseEnter={() => handleMsg(true, "Whoa! Personal space, please!")}
      onMouseLeave={() => handleMsg(false, "")}
      className="face"
    >
      <EyeBall />
      <EyeBall />
    </div>
  );
}

export default Face;
