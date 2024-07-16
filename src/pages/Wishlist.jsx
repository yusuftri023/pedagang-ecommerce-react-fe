/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAuth } from "../services/auth.service";
import MainLayouts from "../layouts/MainLayouts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setAuth } from "../store/reducers/authenticationSlicer";

import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { getWishlist } from "../services/wishlist.service";
import WishlistItem from "../components/molecules/WishlistItem";
import { getUserData } from "../store/actions/customerAction";
import { getUserWishlist } from "../store/actions/wishlistAction";
const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(wishlist);
  useEffect(() => {
    getAuth()
      .then(() => dispatch(setAuth(true)))
      .then(() => dispatch(getUserWishlist()))
      .catch(() => {
        dispatch(setAuth(false));
        setTimeout(() => navigate("/"), 1000);
      });
    dispatch(getUserData());
  }, []);

  return (
    <>
      <MainLayouts>
        <div className="pt-4 min-w-[1000px] bg-zinc-100">
          <div className="my-10 text-center   border-y-4 border-gray-700 py-4">
            <FontAwesomeIcon icon={faHeart} className="size-12 " />
            <h1 className=" text-[30px] font-bold">My Wishlist</h1>
          </div>
          {wishlist?.length > 0 ? (
            <div className="min-h-[400px] mx-auto flex px-10   w-[1000px]">
              <div className="w-full gap-4 flex my-20">
                <div className="min-w-[600px] bg-white p-6  shadow-gray-500  drop-shadow-md   w-full h-[fit-content] grid grid-cols-5 gap-x-2 gap-y-6 py-20">
                  {wishlist?.map((val, i) => (
                    <WishlistItem
                      key={i}
                      wishlistId={val.wishlist_id}
                      productId={val.product_id}
                      productConfigId={val.product_config_id}
                      image={val.image}
                      price={val.price}
                      variation_value={val.variation_value}
                      variation_name={val.variation_name}
                      title={val.title}
                      stock={val.stock}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="min-h-[400px] mx-auto  px-10   w-[1000px]">
              <div className="bg-white py-20  shadow-gray-500  drop-shadow-md  w-full h-[fit-content]">
                <h1 className="text-center text-2xl">
                  Your wishlist is currently empty
                </h1>
              </div>
              <button
                onClick={() => navigate("/")}
                className="right-0 w-[fit-content]  py-3 px-8 my-4  mt-2 bg-[#FFCA1D] hover:bg-[#968447] font-[500] animate-fade-in-drop transition-colors duration-300"
              >
                Return to Shop
              </button>
            </div>
          )}
        </div>
      </MainLayouts>
    </>
  );
};

export default Wishlist;
