import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import PayButton from "./PayButton";
import { addToCart, decreaseCart } from "../store/reducers/cartSlicer";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };
  // const handleRemoveFromCart = (product) => {
  //   dispatch(removeCart(product));
  // };
  // const handleClearCart = (product) => {
  //   dispatch(clearCart(product));
  // };

  return (
    <>
      <Navbar />
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        {cart?.cartItems?.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is currently empty</p>
            <div className="start-shopping">
              <Link to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-arrow-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                  />
                </svg>
                <span>Start Shopping</span>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="titles">
              <h3 className="product-title">Product</h3>
              <h3 className="price">Price</h3>
              <h3 className="quantity">Quantity</h3>
              <h3 className="total">Total</h3>
            </div>
            <div className="cart-items">
              {cart.cartItems &&
                cart.cartItems.map((cartItem) => (
                  <div className="cart-item" key={cartItem?._id}>
                    <div className="cart-product">
                      <img src={cartItem.image?.url} alt={cartItem.name} />
                      <div>
                        <h3>{cartItem.name}</h3>
                        <p>{cartItem.desc}</p>
                        {/* <button onClick={() => handleRemoveFromCart(cartItem)}>
                          Remove
                        </button> */}
                      </div>
                    </div>
                    <div className="cart-product-price">${cartItem.price}</div>
                    <div className="cart-product-quantity">
                      <button onClick={() => handleDecreaseCart(cartItem)}>
                        -
                      </button>
                      <div className="count">{cartItem.cartQuantity}</div>
                      <button onClick={() => handleAddToCart(cartItem)}>
                        +
                      </button>
                    </div>
                    <div className="cart-product-total-price">
                      ${cartItem.price * cartItem.cartQuantity}
                    </div>
                  </div>
                ))}
            </div>
            <div className="cart-summary">
              {/* <button className="clear-btn" onClick={() => handleClearCart()}>
                Clear Cart
              </button> */}
              <div className="cart-checkout">
                <div className="subtotal">
                  <span>Subtotal</span>
                  <span className="amount">${cart.cartTotalAmount}</span>
                </div>
                <p>Taxes and shipping calculated at checkout</p>
                {isLoggedIn ? (
                  <PayButton cartItems={cart.cartItems} />
                ) : (
                  <button
                    className="cart-login"
                    onClick={() => navigate("/login")}
                  >
                    Login to Check out
                  </button>
                )}

                <div className="continue-shopping">
                  <Link to="/">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-arrow-left"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                      />
                    </svg>
                    <span>Continue Shopping</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
