import { useEffect, useState } from "react";

export const useDeviceType = () => {
  const getDeviceType = () => {
    const width = window.innerWidth;
    return {
      isMobile: width < 768,
      isTab: width > 768 && width < 1024,
      isDesktop: width > 1024,
    };
  };

  const [deviceType, setDeviceType] = useState(getDeviceType);

  useEffect(() => {
    const handleResize = () => {
      setDeviceType(getDeviceType());
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return deviceType;
};
