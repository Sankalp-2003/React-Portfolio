import React, { useEffect, useRef, useState } from "react";
import "./message.scss";

function Message({ isMessage, msgInput, handleMsg }) {
  const msgRef = useRef();

  return (
    <>
      <div ref={msgRef} className="message">
        <p>{msgInput}</p>
      </div>
    </>
  );
}

export default Message;
