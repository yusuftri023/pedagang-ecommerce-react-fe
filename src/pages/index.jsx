import MainLayouts from "../layouts/MainLayouts";

import CarouselSlide from "../components/molecules/CarouselSlide";
import { useEffect, useState } from "react";
import ProductCard from "../components/molecules/ProductCard";
import FeatureList from "../components/molecules/FeatureList";
import Banner from "../components/molecules/Banner";
import ProductCardContainer from "../components/organisms/ProductCardContainer";
import InfiniteCarousel from "../components/molecules/InfiniteCarousel";

import featureList1 from "../assets/images/landing-page/Group 11.svg";
import featureList2 from "../assets/images/landing-page/Group 12.svg";
import featureList3 from "../assets/images/landing-page/Group 13.svg";
import featureList4 from "../assets/images/landing-page/PROMO.svg";
import bannerList11 from "../assets/smartphones-balancing-with-blue-background.png";
import bannerList12 from "../assets/smartwatch-screen-digital-device.png";
import bannerList13 from "../assets/photo-camera-balancing-with-yellow-background.png";
import bannerList21 from "./../assets/fashion-1.png";
import bannerList22 from "./../assets/fashion-2.png";
import payment1 from "./../assets/images/payment/Bank BCA Logo .svg";
import payment2 from "./../assets/images/payment/Bank Mandiri Logo .svg";
import payment3 from "./../assets/images/payment/Logo DANA.svg";
import payment4 from "./../assets/images/payment/Logo GoPay.svg";
import payment5 from "./../assets/images/payment/Logo LinkAja.svg";
import payment6 from "./../assets/images/payment/Logo PayPal.svg";
import payment7 from "./../assets/images/payment/Logo_ovo_purple.svg";
import payment8 from "./../assets/images/payment/ShopeePay Logo.svg";
import payment9 from "./../assets/images/payment/QRIS.svg";
import payment10 from "./../assets/images/payment/logo isaku.svg";
import { useSelector } from "react-redux";
import { getAllProduct } from "../services/product.service";
import AddToCartModal from "../components/molecules/AddToCartModal";

const featureList = [
  {
    image: featureList1,
    name: "Free Delivery",
  },
  {
    image: featureList2,
    name: "100% Secure Payment",
  },
  {
    image: featureList3,
    name: "24/7 Help Center",
  },
  {
    image: featureList4,
    name: "Promo and Discounts",
  },
];
const bannerList = [
  {
    id: 1,
    image: bannerList11,
    title: "Hot Sale Smartphone 2024",
    body: "Free shipping for all order",
    bg: {
      color: "#333C3C",
      gradient: "#283838",
    },
  },
  {
    id: 2,
    image: bannerList12,
    title: "On-Sale Best Prices",
    body: "Only on our online store",
    bg: {
      color: "#CF6AE5",
      gradient: "#A66AE6",
    },
  },
  {
    id: 3,
    image: bannerList13,
    title: "Accessories Friday Sale",
    body: "Discounts 30% on Accesories",
    bg: {
      color: "#4F75E3",
      gradient: "#4FA3E3",
    },
  },
];

const bannerList2 = [
  {
    id: 1,
    image: bannerList21,
    title: "Hot Sale on Man Fashion",
    body: "All Products 20% Discounts",
    bg: {
      color: "#933C3C",
      gradient: "#983838",
    },
  },
  {
    id: 2,
    image: bannerList22,
    title: "On-Sale Best Prices",
    body: "Only on our online store",
    bg: {
      color: "#6a6AE5",
      gradient: "#536AE6",
    },
  },
];
const logoPayment = [
  payment1,
  payment2,
  payment3,
  payment4,
  payment5,
  payment6,
  payment7,
  payment8,
  payment9,
  payment10,
];

function Homepage() {
  const [topSellProduct, setTopSellProduct] = useState([]);

  const showModal = useSelector((state) => state.webContent.showModal);
  const typeModal = useSelector((state) => state.webContent.typeModal);

  useEffect(() => {
    getAllProduct().then((res) => setTopSellProduct(() => res.data));
  }, []);

  return (
    <>
      <MainLayouts>
        {showModal && typeModal === "addedToCart" ? <AddToCartModal /> : <></>}
        <CarouselSlide />
        <div className="font-poppins w-[1000px] mx-auto">
          <section>
            <div className="flex justify-center divide-x-2 my-4">
              {featureList.map((feature, i) => (
                <FeatureList key={i} feature={feature} />
              ))}
            </div>
          </section>

          <div>
            <div className="flex gap-x-3 justify-between text-zinc-100 overflow-x-hidden">
              {bannerList.map((banner) => (
                <Banner
                  key={banner.id}
                  banner={banner}
                  quantity={bannerList.length}
                />
              ))}
            </div>
          </div>

          <ProductCardContainer title={"Top Selling Product"}>
            {topSellProduct.length > 0 &&
              [...topSellProduct]
                .slice(20, 30)
                .map(
                  ({
                    title,
                    id: product_config_id,
                    product_id,
                    price,
                    image,
                  }) => (
                    <ProductCard
                      key={product_config_id}
                      product_config_id={product_config_id}
                      product_id={product_id}
                      title={title}
                      price={price}
                      image={image}
                    />
                  )
                )}
          </ProductCardContainer>

          <div className="mt-28 mb-4 overflow-hidden">
            <div className="flex gap-x-3 justify-between text-zinc-100">
              {bannerList2.map((banner) => (
                <Banner
                  key={banner.id}
                  banner={banner}
                  quantity={bannerList2.length}
                />
              ))}
            </div>
          </div>

          <ProductCardContainer title={"Top Featured Product"}>
            {topSellProduct.length > 0 &&
              [...topSellProduct]
                .slice(10, 20)
                .map(
                  ({
                    title,
                    id: product_config_id,
                    product_id,
                    price,
                    image,
                  }) => (
                    <ProductCard
                      key={product_config_id}
                      product_config_id={product_config_id}
                      product_id={product_id}
                      title={title}
                      price={price}
                      image={image}
                    />
                  )
                )}
          </ProductCardContainer>
          <InfiniteCarousel
            images={logoPayment}
            imgHeight={80}
            imgWidth={160}
          />
        </div>
      </MainLayouts>
    </>
  );
}

export default Homepage;
