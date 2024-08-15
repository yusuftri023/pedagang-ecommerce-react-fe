import { useEffect } from "react";
import ModalWindow from "../atoms/ModalWindow";

function SnapPaymentModal() {
  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = "SB-Mid-client-4pX9y6yD_mqfg6mn";
    const script = document.createElement("script");
    script.src = snapScript;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <ModalWindow>
      <div id="snap-container"></div>
    </ModalWindow>
  );
}

export default SnapPaymentModal;
