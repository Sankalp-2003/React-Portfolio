import "./icons.scss";

function Icons({ icons }) {
  const iconNames = [
    { link: "icons/jsIcon.png", key: "js" },
    { link: "icons/tsIcon.png", key: "ts" },
    { link: "icons/angularIcon.png", key: "angular" },
    { link: "icons/reactIcon.png", key: "react" },
    { link: "icons/htmlIcon.png", key: "html" },
    { link: "icons/cssIcon.png", key: "css" },
    { link: "icons/tailwindIcon.png", key: "tailwind" },
    { link: "icons/sassIcon.png", key: "scss" },
    { link: "icons/gsapIcon.png", key: "gsap" },
    { link: "icons/motionIcon.png", key: "motion" },
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
