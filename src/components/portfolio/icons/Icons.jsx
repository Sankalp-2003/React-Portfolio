import React from "react";
import "./icons.scss";

function Icons({ icons }) {
  const iconNames = [
    { link: "public/icons/jsIcon.png", key: "js" },
    { link: "public/icons/tsIcon.png", key: "ts" },
    { link: "public/icons/angularIcon.png", key: "angular" },
    { link: "public/icons/reactIcon.png", key: "react" },
    { link: "public/icons/htmlIcon.png", key: "html" },
    { link: "public/icons/cssIcon.png", key: "css" },
    { link: "public/icons/tailwindIcon.png", key: "tailwind" },
    { link: "public/icons/sassIcon.png", key: "scss" },
    { link: "public/icons/gsapIcon.png", key: "gsap" },
    { link: "public/icons/motionIcon.png", key: "motion" },
  ];
  return (
    <div className="icons">
      {iconNames.map(
        (icon) =>
          icons[icon.key] && <img key={icon.key} src={icon.link} alt="" />
      )}
    </div>
  );
}

export default Icons;
