import React from "react";
import "./navbar.scss";
import { FaGithub, FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { motion } from "framer-motion";
import Sidebar from "../sidebar/Sidebar";

function Navbar({ handleMsg }) {
  return (
    <div className="navbar">
      <Sidebar handleMsg={handleMsg} />
      <div className="wrapper">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2>SANKALP</h2>
        </motion.span>
        <div className="social">
          <a
            onMouseEnter={() =>
              handleMsg(true, "Check out the GitHub profile.")
            }
            onMouseLeave={() => handleMsg(false, "")}
            href="https://github.com/Sankalp-2003"
          >
            <FaGithub />
          </a>
          <a
            onMouseEnter={() => handleMsg(true, "This is the LinkedIn link.")}
            onMouseLeave={() => handleMsg(false, "")}
            href="https://www.linkedin.com/in/sankalp-kundapur-50abb4225?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
          >
            <FaLinkedin />
          </a>
          <a
            onMouseEnter={() => handleMsg(true, "Connect on WhatsApp here.")}
            onMouseLeave={() => handleMsg(false, "")}
            href="https://wa.me/917019489270"
          >
            <IoLogoWhatsapp />
          </a>
          <a
            onMouseEnter={() => handleMsg(true, "Visit the Instagram page.")}
            onMouseLeave={() => handleMsg(false, "")}
            href="https://www.instagram.com/not_sankalp.1?igsh=NGg5aWFqNG8wdWF3 "
          >
            <FaInstagramSquare />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
