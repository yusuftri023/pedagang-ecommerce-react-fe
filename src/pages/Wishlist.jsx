/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getUserData } from "../store/actions/customerAction";
import { getAuth } from "../services/auth.service";
import HomeLayouts from "../layouts/Homelayouts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons/faCartShopping";
import { setAuth, setError } from "../store/reducers/authenticationSlicer";
import { setCartError } from "../store/reducers/cartSlicer";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { getCart } from "../store/actions/cartAction";
import CartItem from "../components/molecules/CartItem";
import { getPromotion } from "../services/promotion.service";
import { getWishlist } from "../services/wishlist.service";
import WishlistItem from "../components/molecules/WishlistItem";
const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(wishlist);
  useEffect(() => {
    getAuth()
      .then(() => dispatch(setAuth(true)))
      .then(() => getWishlist())
      .then((res) => {
        console.log(res);
        setWishlist(res.data);
      })
      .catch(() => {
        dispatch(setAuth(false));
        setTimeout(() => navigate("/"), 1000);
      });
  }, []);

  return (
    <>
      <HomeLayouts>
        <div className="pt-4 min-w-[1000px] bg-zinc-100">
          <div className="my-10 items-center flex justify-center space-x-2 border-y-4 border-gray-700 py-4">
            <FontAwesomeIcon icon={faCartShopping} className="size-12 " />
            <h1 className=" text-[30px] font-bold">My Cart</h1>
          </div>
          <div className="min-h-[400px] mx-auto flex px-10   w-[1000px]">
            <div className="w-full gap-4 flex my-20">
              <div className="min-w-[600px] bg-white p-6  shadow-gray-500  drop-shadow-md flex  w-full h-[fit-content]">
                {wishlist?.map((val, i) => (
                  <WishlistItem
                    key={i}
                    cartId={val.cart_id}
                    productId={val.product_id}
                    quantity={val.quantity}
                    variationOptionId={val.variation_option_id}
                    image={val.image}
                    price={val.price}
                    variation_value={val.variation_value}
                    variation_name={val.variation_name}
                    title={val.title}
                    stock={val.stock}
                    note={val.note}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </HomeLayouts>
    </>
  );
};

export default Wishlist;
