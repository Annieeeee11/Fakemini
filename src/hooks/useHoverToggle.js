import { useState, useRef } from "react";

const useSidebarToggle = () => {
  const [extended, setExtended] = useState(false);
  const timer = useRef(null); 

  const toggleExtended = () => {
    setExtended((prev) => !prev);
  };

  const handleMouseEnter = () => {
    if (!extended) {
      timer.current = setTimeout(toggleExtended);
    }
  };

  const handleMouseLeave = () => {
    if (extended) {
      timer.current = setTimeout(() => setExtended(false), 2000); 
    }
  };
  
  const handleMouseOut = () => {
    clearTimeout(timer.current);
  };

  return {
    extended,
    toggleExtended,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseOut,
  };
};

export default useSidebarToggle;
