/* eslint-disable react-hooks/exhaustive-deps */

import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import MainLayouts from "../../layouts/MainLayouts";
import {
  modalChange,
  modalToggle,
  popUpChange,
  popUpToggle,
} from "../../store/reducers/webContentSlicer";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { postAddToCart } from "../../services/cart.service";
import {
  deleteWishlistItem,
  getWishlist,
  postNewWishlist,
} from "../../services/wishlist.service";
import { getSingleProduct } from "../../services/product.service";
import ProductImageGallery from "../../components/molecules/ProductImageGallery";
import ProductInformation from "../../components/molecules/ProductInformation";
import VariationOption from "../../components/molecules/VariationOption";
import BriefPopUp from "../../components/atoms/BriefPopUp";
import AddToCartModal from "../../components/molecules/AddToCartModal";
import ProductRating from "../../components/molecules/ProductRating";
import ShiningEffect from "../../components/atoms/ShiningEffect";
import ProductTitle from "../../components/molecules/ProductTitle";
import BriefPopUpContent from "../../components/molecules/BriefPopUpContent";
import ProductPrice from "../../components/molecules/ProductPrice";
import ProductNavigation from "../../components/molecules/ProductNavigation";

const ProductDetail = () => {
  const { product_title } = useParams();
  const dispatch = useDispatch();
  const showPopUp = useSelector((state) => state.webContent.showPopUp);
  const typePopUp = useSelector((state) => state.webContent.typePopUp);
  const showModal = useSelector((state) => state.webContent.showModal);
  const typeModal = useSelector((state) => state.webContent.typeModal);
  const positionAnchorRef = useRef();
  const [product, setProduct] = useState(null);
  const [productId, productConfigId] = product_title
    .slice(product_title.lastIndexOf("-") + 1)
    .split("+");
  const currentVariant = product?.find(
    (product) => Number(product.product_config_id) === Number(productConfigId),
  );
  const [wishlist, setWishlist] = useState([]);
  const isInWishlist = useMemo(() => {
    return wishlist?.some((item) => item.product_config_id === productConfigId);
  });
  const discount = currentVariant?.discount
    ? Number(currentVariant?.discount)
    : 0;
  const variation = useMemo(() =>
    product?.reduce((acc, curr) => {
      if (!acc.some((el) => el === curr.variation_name)) {
        return [...acc, { [curr.variation_name]: [curr.variation_value] }];
      } else {
        return acc;
      }
    }, []),
  );
  const variationConfig = useMemo(() => {
    return product?.map(({ product_id, product_config_id, title, stock }) => {
      return { product_id, product_config_id, title, stock };
    });
  });

  const imageGallery = product?.[0].image;
  const handleAddToCart = () => {
    if (currentVariant.stock < 1) {
      dispatch(popUpChange({ type: "outOfStock" }));
      dispatch(popUpToggle(true));
      return;
    }
    const data = {
      product_id: productId,
      quantity: 1,
      product_config_id: productConfigId,
    };
    postAddToCart(data)
      .then(() => {
        dispatch(modalToggle());
        dispatch(
          modalChange({
            type: "addedToCart",
            content: {
              image: currentVariant.image[0],
              title: currentVariant.title,
              price: currentVariant.price,
            },
          }),
        );
      })
      .catch((err) => console.log(err));
  };
  const handleAddToWishlist = () => {
    if (isInWishlist) {
      const itemInWishlist = wishlist.find(
        (item) => item.product_config_id === productConfigId,
      );
      deleteWishlistItem(itemInWishlist.wishlist_id)
        .then(() => {
          dispatch(popUpToggle(true));
          dispatch(popUpChange({ type: "removedFromWishlist" }));
        })
        .then(() => getWishlist())
        .then((res) => setWishlist(res.data));
    } else {
      const data = {
        product_id: productId,
        product_config_id: productConfigId,
      };
      postNewWishlist(data)
        .then(() => {
          dispatch(popUpToggle(true));
          dispatch(popUpChange({ type: "addedToWishlist" }));
        })
        .then(() => getWishlist())
        .then((res) => setWishlist(res.data));
    }
  };

  useEffect(() => {
    getSingleProduct(productId).then((res) => setProduct(res.data));
    getWishlist().then((res) => setWishlist(res.data));
  }, []);
  const popUp = [
    {
      type: "outOfStock",
      text: "Product is out of stock",
    },
    {
      type: "removedFromWishlist",
      text: "Product removed from your wishlist",
    },
    { type: "addedToWishlist", text: "Product added to your wishlist" },
    {},
  ];
  return (
    <>
      <MainLayouts>
        {showModal && typeModal === "addedToCart" && <AddToCartModal />}
        {popUp.map((item, i) => (
          <Fragment key={item.type + i}>
            {showPopUp && typePopUp === item.type && (
              <BriefPopUp>
                <BriefPopUpContent text={item.text} />
              </BriefPopUp>
            )}
          </Fragment>
        ))}

        <div className="mb-20 pt-8">
          <ProductNavigation currentVariant={currentVariant} />
          <div
            ref={positionAnchorRef}
            className="mx-auto flex w-[1000px] min-w-[1000px] flex-row rounded-t-lg  bg-white  p-4 pb-10 "
          >
            <div
              className={
                (currentVariant?.image[0] ? "" : "bg-gray-200") +
                " min-h-[500px] min-w-[60%] max-w-[60%] "
              }
            >
              {currentVariant?.image[0] ? (
                <>
                  <ProductImageGallery
                    defaultImg={imageGallery[0]}
                    images={imageGallery}
                  />
                </>
              ) : (
                <ShiningEffect />
              )}
              <ProductInformation product={currentVariant} />
            </div>

            <div className={`w-[40%] pl-4 pt-6 `}>
              <div
                style={{
                  top: `${positionAnchorRef.current?.offsetTop - 56}px`,
                }}
                className={`sticky `}
              >
                <ProductTitle
                  title={currentVariant?.title}
                  variation_name={currentVariant?.variation_name}
                  variation_value={currentVariant?.variation_value}
                />
                <ProductRating productId={productId} />

                <div
                  className={
                    (!currentVariant?.price
                      ? "overflow-hidden rounded-full bg-gray-200"
                      : " ") + " relative mt-2 flex min-h-[40px] min-w-[100px]"
                  }
                >
                  <ProductPrice
                    currentVariant={currentVariant}
                    discount={discount}
                  />
                </div>
                {currentVariant?.variation_name === "-" ? (
                  <></>
                ) : (
                  variation?.length > 0 && (
                    <VariationOption
                      variation={variation}
                      variationConfig={variationConfig}
                      currentConfigId={currentVariant?.product_config_id}
                    />
                  )
                )}
                {currentVariant?.stock < 1 && (
                  <span className="text-red-600">Out of Stock</span>
                )}
                <div
                  className={
                    (currentVariant?.variation_name === "-" ? `mt-20` : ``) +
                    ` my-4 flex w-full  items-center space-x-1`
                  }
                >
                  <button
                    onClick={handleAddToCart}
                    className={
                      (currentVariant?.stock < 1 ? " brightness-[0.3]" : "") +
                      " flex w-3/4 items-center justify-evenly  rounded-xl border-[1px]  border-[#FFCA1D]  bg-[#FFCA1D]  py-2 text-3xl font-normal transition-colors duration-300  hover:border-[#968447] hover:bg-[#968447]"
                    }
                  >
                    <FontAwesomeIcon icon={faCartShopping} />
                    <span className="text-center text-2xl ">Add to Cart</span>
                  </button>
                  <button
                    onClick={handleAddToWishlist}
                    className={
                      (isInWishlist ? "text-red-600" : "text-black ") +
                      " flex w-fit items-center rounded-xl border-2 border-gray-200 p-2 transition-colors duration-300 hover:cursor-pointer hover:border-gray-400 hover:bg-gray-400"
                    }
                  >
                    <FontAwesomeIcon
                      icon={isInWishlist ? faHeart : faHeartRegular}
                      className={" text-3xl"}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayouts>
    </>
  );
};

export default ProductDetail;
