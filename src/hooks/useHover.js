import { useEffect, useState } from "react";
/**
 * refer to html element with useRef hook then pass it to this hook
 * @param {htmlelement} ref
 * @returns
 */
function useHover(ref) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    const element = ref.current;
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return isHovered;
}
export default useHover;
