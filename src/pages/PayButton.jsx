/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

const PayButton = () => {
  const navigate = useNavigate();
  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <>
      <button onClick={() => handleCheckout()}>Check out</button>
    </>
  );
};

export default PayButton;
