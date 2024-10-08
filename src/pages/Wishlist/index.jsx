/* eslint-disable react-hooks/exhaustive-deps */

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAuth } from "../../services/auth.service";
import MainLayouts from "../../layouts/MainLayouts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setAuth } from "../../store/reducers/authenticationSlicer";

import { faHeart } from "@fortawesome/free-solid-svg-icons";

import WishlistItem from "../../components/molecules/WishlistItem";
import { getUserData } from "../../store/actions/customerAction";
import { getUserWishlist } from "../../store/actions/wishlistAction";
import BriefPopUp from "../../components/atoms/BriefPopUp";
import AddToCartModal from "../../components/molecules/AddToCartModal";
import BriefPopUpContent from "../../components/molecules/BriefPopUpContent";
import EmptyCart from "../../components/molecules/EmptyCart";
const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.webContent.showModal);
  const typeModal = useSelector((state) => state.webContent.typeModal);

  const showPopUp = useSelector((state) => state.webContent.showPopUp);
  const typePopUp = useSelector((state) => state.webContent.typePopUp);

  useEffect(() => {
    getAuth()
      .then(() => dispatch(setAuth(true)))
      .then(() => dispatch(getUserWishlist()))
      .catch(() => {
        dispatch(setAuth(false));
        setTimeout(() => (window.location.href = "/"), 1000);
      });
    dispatch(getUserData());
  }, []);

  return (
    <>
      <MainLayouts>
        {showModal && typeModal === "addedToCart" && <AddToCartModal />}
        {showPopUp && typePopUp === "deleteFromWishlist" && (
          <BriefPopUp>
            <BriefPopUpContent text={"Product deleted from wishlist"} />
          </BriefPopUp>
        )}
        <div className="min-w-[1000px] bg-zinc-100 pt-4 ">
          <div className="my-10 border-y-4 border-gray-700 py-4 text-center">
            <FontAwesomeIcon icon={faHeart} className="size-12 " />
            <h1 className=" text-[30px] font-bold">My Wishlist</h1>
          </div>
          {wishlist?.length > 0 ? (
            <div className="mx-auto flex min-h-[400px] w-[1000px]   px-10">
              <div className="my-20 flex w-full gap-4">
                <div className="grid h-[fit-content] w-full  min-w-[600px]  grid-cols-5   gap-x-2 gap-y-6 bg-white p-6 py-20 shadow-gray-500 drop-shadow-md">
                  {wishlist?.map((val, i) => (
                    <WishlistItem
                      key={val.title + i}
                      wishlistId={val.wishlist_id}
                      productId={val.product_id}
                      productConfigId={val.product_config_id}
                      image={val.image[0]}
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
            <EmptyCart text={"Your wishlist is empty"} />
          )}
        </div>
      </MainLayouts>
    </>
  );
};

export default Wishlist;
