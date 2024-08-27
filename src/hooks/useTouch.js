import { useEffect, useState } from "react";
/**
 * refer to html element with useRef hook then pass it to this hook
 * @param {htmlelement} ref
 * @returns
 */
function useTouch(ref) {
  const [isTouched, setIsTouched] = useState(false);

  const handleMouseEnter = () => {
    setIsTouched(true);
  };

  const handleMouseLeave = () => {
    setIsTouched(false);
  };

  useEffect(() => {
    const element = ref.current;
    element.addEventListener("touchstart", handleMouseEnter);
    element.addEventListener("touchend", handleMouseLeave);

    return () => {
      element.removeEventListener("touchstart", handleMouseEnter);
      element.removeEventListener("touchend", handleMouseLeave);
    };
  }, []);

  return isTouched;
}
export default useTouch;
