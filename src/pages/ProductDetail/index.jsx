/* eslint-disable react-hooks/exhaustive-deps */

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef, useState } from "react";
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
import { postAddToCart } from "../../services/cart.service";
import { postNewWishlist } from "../../services/wishlist.service";
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
const imgsrc = [
  "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
  "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
  "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
  "https://images.tokopedia.net/img/cache/900/product-1/2019/7/27/23167793/23167793_7b8ec44c-cb48-4235-81a7-626b1c854a08_2048_2048",
  "https://images.tokopedia.net/img/cache/900/product-1/2019/7/27/23167793/23167793_7829a469-09eb-4584-a8b8-b5d3bee02611_2048_2048",
  "https://images.tokopedia.net/img/cache/900/product-1/2019/7/27/23167793/23167793_ed15828b-a1df-4f29-9dea-dcee8fecb342_2048_2048",
  "https://images.tokopedia.net/img/cache/900/product-1/2020/2/27/23167793/23167793_e295d484-b1ab-402d-b33b-39d3de0b08ef_2048_2048",
];

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
    (product) => Number(product.product_config_id) === Number(productConfigId)
  );
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
    }, [])
  );
  const variationConfig = useMemo(() => {
    return product?.map(({ product_id, product_config_id, title, stock }) => {
      return { product_id, product_config_id, title, stock };
    });
  });

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
              image: currentVariant.image,
              title: currentVariant.title,
              price: currentVariant.price,
            },
          })
        );
      })
      .catch((err) => console.log(err));
  };
  const handleAddToWishlist = () => {
    const data = {
      product_id: productId,
      product_config_id: productConfigId,
    };
    postNewWishlist(data).then(() => {
      dispatch(popUpToggle(true));
      dispatch(popUpChange({ type: "addedToWishlist" }));
    });
  };

  useEffect(() => {
    getSingleProduct(productId).then((res) =>
      setTimeout(() => setProduct(res.data), 1000)
    );
  }, []);

  return (
    <>
      <MainLayouts>
        {showModal && typeModal === "addedToCart" && <AddToCartModal />}
        {showPopUp && typePopUp === "addedToWishlist" && (
          <BriefPopUp>
            <BriefPopUpContent text={"Product added to your wishlist"} />
          </BriefPopUp>
        )}
        {showPopUp && typePopUp === "outOfStock" && (
          <BriefPopUp>
            <BriefPopUpContent text={"Product is out of stock"} />
          </BriefPopUp>
        )}
        <div className="pt-8 mb-20">
          <ProductNavigation currentVariant={currentVariant} />
          <div
            ref={positionAnchorRef}
            className="p-4 pb-10 min-w-[1000px] w-[1000px] mx-auto bg-white  rounded-t-lg  flex flex-row "
          >
            <div
              className={
                (currentVariant?.image ? "" : "bg-gray-200") +
                " min-h-[500px] min-w-[60%] max-w-[60%] "
              }
            >
              {currentVariant?.image ? (
                <>
                  <ProductImageGallery
                    defaultImg={currentVariant?.image}
                    images={imgsrc}
                  />
                </>
              ) : (
                <ShiningEffect />
              )}
              <ProductInformation product={currentVariant} />
            </div>

            <div className={`w-[40%] pt-6 pl-4 `}>
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
                      ? "bg-gray-200 rounded-full overflow-hidden"
                      : " ") + " min-w-[100px] min-h-[40px] mt-2 relative flex"
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
                    ` w-full flex items-center  space-x-1 my-4`
                  }
                >
                  <button
                    onClick={handleAddToCart}
                    className={
                      (currentVariant?.stock < 1 ? " brightness-[0.3]" : "") +
                      " bg-[#FFCA1D] justify-evenly flex items-center  border-[1px] py-2  border-[#FFCA1D]  rounded-xl  hover:bg-[#968447] hover:border-[#968447] w-3/4 text-3xl font-normal  transition-colors duration-300"
                    }
                  >
                    <FontAwesomeIcon icon={faCartShopping} />
                    <span className="text-2xl text-center ">Add to Cart</span>
                  </button>
                  <button
                    onClick={handleAddToWishlist}
                    className="transition-colors p-2 duration-300 hover:cursor-pointer hover:bg-gray-400 hover:border-gray-400 flex items-center w-fit border-2 border-gray-200 rounded-xl"
                  >
                    <FontAwesomeIcon icon={faHeart} className="text-3xl" />
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
