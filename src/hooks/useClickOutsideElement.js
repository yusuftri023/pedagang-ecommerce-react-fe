import { useEffect } from "react";

export const useClickOutsideElement = (ref, callback) => {
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!ref.current.contains(e.target)) callback();
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [callback, ref]);
};
