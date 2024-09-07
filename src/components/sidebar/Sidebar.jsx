import React, { useState } from "react";
import ToggleButton from "./toggleButton/ToggleButton";
import Links from "./links/Links";
import "./sidebar.scss";
import { motion } from "framer-motion";

const variants = {
  open: {
    clipPath: "circle(1200px at 50px 50px)",
    transition: {
      type: "spring",
      stiffness: 20,
    },
  },
  closed: {
    clipPath: "circle(30px at 50px 50px)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};
function sidebar({ handleMsg }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => handleMsg(true, "Click it")}
      onMouseLeave={() => handleMsg(false, "")}
      className="sidebar"
      animate={open ? "open" : "closed"}
    >
      <motion.div className="bg" variants={variants}>
        <Links />
      </motion.div>
      <ToggleButton setOpen={setOpen} open={open} />
    </motion.div>
  );
}

export default sidebar;
