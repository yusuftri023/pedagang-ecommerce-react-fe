import { useEffect } from "react";

export default function useDebounceCallback(
  callback,
  delay,
  dependency,
  toggle = null
) {
  useEffect(() => {
    if (toggle === true) {
      const debounceCallback = setTimeout(callback, 1000);
      return () => clearTimeout(debounceCallback);
    } else if (toggle === null) {
      const debounceCallback = setTimeout(callback, 1000);
      return () => clearTimeout(debounceCallback);
    }
  }, [callback, delay, dependency, toggle]);
}
