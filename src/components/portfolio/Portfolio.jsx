import React, { useEffect, useRef, useState } from "react";
import "./portfolio.scss";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { FaGithub } from "react-icons/fa";

const items = [
  {
    id: 1,
    title: "FilmyVerse",
    name: "FilmyVerse",
    para: "Responsive movie app using Firebase.",
    git: "https://github.com/Sankalp-2003/filmyVerse",
    link: "https://filmyverse-sankalp-2003.netlify.app/",
    img: "/Filmyverse.png",
    desc: ` A fully responsive React-based web application designed for movie enthusiasts to explore, add, and review films. Leveraging Firebase as a real-time database, users can seamlessly add new movies, complete with titles, images, and descriptions, which are dynamically displayed on the homepage. The platform also allows users to write and submit reviews, with both the reviews and comments stored and managed in Firebase. This project showcases my expertise in React, state management, real-time data handling with Firebase, and creating intuitive, user-friendly interfaces.`,
  },
  {
    id: 2,
    title: "E-Shop",
    name: "E-Shop",
    para: "Responsive eCommerce site with React and Redux.",
    git: "https://github.com/Sankalp-2003/E-Shop",
    link: "https://e-shop-sankalp-2003.netlify.app/",
    img: "/E-commerce.png",
    desc: ` A fully responsive eCommerce platform built using React, Redux Toolkit, and Tailwind CSS for a seamless and intuitive user experience across all devices. The site features a Home Page with a Hero section, categorized products, and top picks. Key functionalities include a dynamic Cart Page with an order summary and smooth checkout flow, integrated billing, shipping, and payment interfaces, as well as order confirmation and tracking options. Additionally, the platform supports product search and filtering. This project showcases my skills in React, Redux Toolkit for state management, and responsive design using Tailwind CSS.`,
  },
  {
    id: 3,
    title: "Google Gemini-clone",
    name: "Gemini",
    para: " Responsive AI app with Google Gemini API.",
    git: "https://github.com/Sankalp-2003/Gemini-Clone",
    link: "https://gemini-sankalp-2003.netlify.app/",
    img: "/Gemini.png",
    desc: ` A responsive Generative AI application built with React.js, leveraging the Google Gemini API to replicate the functionality of Google Gemini. This AI app allows users to interact with generative models for various use cases, demonstrating the power of real-time AI integration. The project showcases my proficiency in React.js, API integration, and building responsive, AI-powered applications.`,
  },
  {
    id: 4,
    title: "Ochi Design",
    name: "Ochi",
    para: "Responsive React site with smooth animations.",
    git: "https://github.com/Sankalp-2003/Ochi",
    link: "https://ochi-sankalp-2003.netlify.app/",
    img: "/Ochi.png",
    desc: ` A pixel-perfect recreation of the award-winning Ochi Design website, developed using React.js with mobile responsiveness. This project replicates the unique animation effects and design elements, utilizing Framer Motion for seamless animations and Locomotive Scroll for smooth scrolling with dynamic page speed control. A standout feature includes an interactive "eye" component that tracks the cursor’s movement for enhanced user engagement. This project highlights my expertise in React.js, animation libraries like Framer Motion, and creating immersive, interactive web experiences.`,
  },
  {
    id: 5,
    title: "VirtualR",
    name: "VirtualR",
    para: "Modern React site with Tailwind CSS.",
    git: "https://github.com/Sankalp-2003/VirtualR",
    link: "https://virtualr-sankalp-2003.netlify.app/",
    img: "/VirtualR.png",
    desc: ` A modern, fully responsive website built from scratch using React and Tailwind CSS. The site features a sleek, responsive Navbar with a mobile drawer for easy navigation. It includes a visually striking Hero section with gradient text, providing a modern aesthetic. Integrated video elements play on autoplay and loop to enhance user engagement. The site also features a clean UI for displaying product features, a pricing card section offering three plans, as well as testimonials and a footer—all styled using Tailwind CSS. This project demonstrates my skills in responsive design, React development, and creating modern, user-friendly interfaces with Tailwind CSS.`,
  },
  {
    id: 6,
    title: "Restaura",
    name: "Restaura",
    para: "Responsive restaurant site with React & Tailwind.",
    git: "https://github.com/Sankalp-2003/Restaura-Website",
    link: "https://restaura-sankalp-2003.netlify.app/",
    img: "/Restaura.png",
    desc: ` A fully responsive restaurant website built with React and Tailwind CSS. Features include a fixed navigation bar with a mobile menu, smooth scrolling, and a Hero section with a full-screen background video and overlayed logo, using Framer Motion for animations. The site showcases restaurant dishes, includes an About section with side-by-side image and text, a mission video, and an "Our Expertise" section. The Review section highlights customer feedback, and customer images are displayed using Flexbox. The Contact section provides address, phone, and email, with social media icons in the footer. This project demonstrates skills in React, responsive design, and Framer Motion.`,
  },
];

const Single = ({ item, handleMsg }) => {
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
    // offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-300, 300]);
  const [hovering, setHovering] = useState(false);

  const imgEnter = (e) => {
    setHovering(true);
    handleMsg(true, e);
  };
  const imgLeave = () => {
    setHovering(false);
    handleMsg(true, "");
  };

  return (
    <section>
      <div className="container">
        <div className="wrapper">
          <motion.div
            onMouseEnter={() => imgEnter(item.para)}
            onMouseLeave={imgLeave}
            initial={{ scale: 1 }}
            animate={hovering ? { scale: 0.9 } : { scale: 1 }}
            transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
            className="imgContainer"
            ref={ref}
          >
            <motion.img
              initial={{ scale: 1 }}
              animate={hovering ? { scale: 1.2 } : { scale: 1 }}
              transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
              src={item.img}
              alt=""
            />
            <a href={item.link}>
              <h1>
                {item.name.split("").map((e, i) => (
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={hovering ? { y: "0%" } : { y: "100%" }}
                    transition={{ ease: [0.22, 1, 0.36, 1], delay: i * 0.02 }}
                    key={i}
                  >
                    {e}
                  </motion.span>
                ))}
              </h1>
            </a>
          </motion.div>
          <motion.div className="textContainer" style={{ y }}>
            <h2>{item.title}</h2>
            <p>{item.desc}</p>
            <div className="links">
              <a
                onMouseEnter={() => handleMsg(true, "Watch Live Demo")}
                onMouseLeave={() => handleMsg(false, "")}
                href={item.link}
                className="demo"
              >
                <button>See Demo</button>
              </a>
              <a
                onMouseEnter={() => handleMsg(true, "See Source Code")}
                onMouseLeave={() => handleMsg(false, "")}
                href={item.git}
                className="git"
              >
                <FaGithub />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

function Portfolio({ handleMsg }) {
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <div className="portfolio" ref={ref}>
      <div className="progress">
        <h1>Featured Works</h1>
        <motion.div style={{ scaleX }} className="progressBar"></motion.div>
      </div>
      {items.map((item) => (
        <Single handleMsg={handleMsg} item={item} key={item.id} />
      ))}
    </div>
  );
}

export default Portfolio;
