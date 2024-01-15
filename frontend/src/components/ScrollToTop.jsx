import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "auto",
    });
  }, [location.pathname]);
};

export default ScrollToTop;
