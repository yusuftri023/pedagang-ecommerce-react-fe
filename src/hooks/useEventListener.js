import { useEffect, useRef } from "react";
/**
 * Only use 1 event listener per element
 * @param {string} eventType
 * @param {function} callback
 * @param {htmlelement} element
 */
const useEventListener = (eventType, callback, element = window) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (element == null) return;
    const handler = (e) => callbackRef.current(e);
    element.addEventListener(eventType, handler);

    return () => element.removeEventListener(eventType, handler);
  }, [eventType, element]);
};
export default useEventListener;
