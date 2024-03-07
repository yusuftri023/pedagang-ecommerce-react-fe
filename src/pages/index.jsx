import HomeLayouts from "../layouts/Homelayouts";

import CarouselSlide from "../components/molecules/CarouselSlide";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/molecules/ProductCard";
import FeatureList from "../components/molecules/FeatureList";
import Banner from "../components/molecules/Banner";
import ProductCardContainer from "../components/organisems/ProductCardContainer";

const featureList = [
  {
    image: "/src/assets/images/landing-page/Group 11.svg",
    name: "Free Delivery",
  },
  {
    image: "/src/assets/images/landing-page/Group 12.svg",
    name: "100% Secure Payment",
  },
  {
    image: "/src/assets/images/landing-page/Group 13.svg",
    name: "24/7 Help Center",
  },
  {
    image: "/src/assets/images/landing-page/PROMO.svg",
    name: "Promo and Discounts",
  },
];
const bannerList = [
  {
    id: 1,
    image: "/src/assets/smartphones-balancing-with-blue-background.png",
    title: "Hot Sale Smartphone 2024",
    body: "Free shipping for all order",
    bg: {
      color: "#333C3C",
      gradient: "#283838",
    },
  },
  {
    id: 2,
    image: "/src/assets/photo-camera-balancing-with-yellow-background.png",
    title: "On-Sale Best Prices",
    body: "Only on our online store",
    bg: {
      color: "#CF6AE5",
      gradient: "#A66AE6",
    },
  },
  {
    id: 3,
    image: "/src/assets/smartwatch-screen-digital-device.png",
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
    image: "/src/assets/fashion-1.png",
    title: "Hot Sale on Man Fashion",
    body: "All Products 20% Discounts",
    bg: {
      color: "#933C3C",
      gradient: "#983838",
    },
  },
  {
    id: 2,
    image: "/src/assets/photo-camera-balancing-with-yellow-background.png",
    title: "On-Sale Best Prices",
    body: "Only on our online store",
    bg: {
      color: "#6a6AE5",
      gradient: "#536AE6",
    },
  },
];
const logoPayment = [
  "/src/assets/images/payment/Bank BCA Logo .svg",
  "/src/assets/images/payment/Bank Mandiri Logo .svg",
  "/src/assets/images/payment/Logo DANA.svg",
  "/src/assets/images/payment/Logo GoPay.svg",
  "/src/assets/images/payment/Logo LinkAja.svg",
  "/src/assets/images/payment/Logo PayPal.svg",
  "/src/assets/images/payment/Logo_ovo_purple.svg",
  "/src/assets/images/payment/ShopeePay Logo.svg",
  "/src/assets/images/payment/QRIS.svg",
  "/src/assets/images/payment/logo isaku.svg",
];
function Homepage() {
  const [topSellProduct, setTopSellProduct] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setTopSellProduct(() => res.data));
  }, []);
  topSellProduct;

  return (
    <>
      <HomeLayouts>
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
                .slice(0, 10)
                .map(({ title, id, price, rating, image }) => (
                  <ProductCard
                    key={id}
                    id={id}
                    title={title}
                    price={price}
                    rating={rating}
                    image={image}
                  />
                ))}
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
                .slice(10)
                .map(({ title, id, price, rating, image }) => (
                  <ProductCard
                    key={id}
                    id={id}
                    title={title}
                    price={price}
                    rating={rating}
                    image={image}
                  />
                ))}
          </ProductCardContainer>

          <div className="w-full  overflow-hidden whitespace-nowrap group my-4 ">
            <div className=" inline-block animate-slide group-hover:[animation-play-state:paused] ">
              {logoPayment.map((image, i) => (
                <img
                  key={i}
                  src={image}
                  className="min-w-[160px] object-contain max-w-[160px] max-h-[80px] inline-block px-5"
                ></img>
              ))}
            </div>
            <div className=" inline-block animate-slide group-hover:[animation-play-state:paused] ">
              {logoPayment.map((image, i) => (
                <img
                  key={i}
                  src={image}
                  className="min-w-[160px] object-contain max-w-[160px] max-h-[80px] inline-block px-5"
                ></img>
              ))}
            </div>
          </div>
        </div>
      </HomeLayouts>
    </>
  );
}

export default Homepage;
