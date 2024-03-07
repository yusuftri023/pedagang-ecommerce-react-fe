import HomeLayouts from "../layouts/Homelayouts";

import CarouselSlide from "../components/molecules/CarouselSlide";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/molecules/ProductCard";
import FeatureList from "../components/molecules/FeatureList";
import Banner from "../components/molecules/Banner";

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
    image: "/src/assets/smartphones-balancing-with-blue-background.png",
    title: "Hot Sale Smartphone 2024",
    body: "Free shipping for all order",
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

function Homepage() {
  const [topSellProduct, setTopSellProduct] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setTopSellProduct(() => res.data));
  }, []);
  console.log(topSellProduct);

  return (
    <>
      <HomeLayouts>
        <CarouselSlide />
        <main className="font-poppins w-[1000px] mx-auto">
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

          <section className="my-4 overflow-y-visible  max-h-[280px] ">
            <div className="border-b-2 border-gray-400 mb-4 ">
              <span className="border-b-2 border-[#FFCA1D]">
                Top Selling Product
              </span>
            </div>
            <div className="overflow-x-scroll no-scrollbar   ">
              <div className=" flex  justify-left   ">
                {topSellProduct.length > 0 &&
                  [...topSellProduct]
                    .slice(0, 10)
                    .map(({ title, id, price, rating, image }) => (
                      <ProductCard
                        key={id}
                        title={title}
                        price={price}
                        rating={rating}
                        image={image}
                      />
                    ))}
              </div>
            </div>
          </section>
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
          <section className="my-4 overflow-y-visible  max-h-[280px] ">
            <div className="border-b-2 border-gray-400 mb-4 ">
              <span className="border-b-2 border-[#FFCA1D]">
                Top Featured Product
              </span>
            </div>
            <div className="overflow-x-scroll no-scrollbar   ">
              <div className=" flex  justify-left   ">
                {topSellProduct.length > 0 &&
                  [...topSellProduct]
                    .slice(10)
                    .map(({ title, id, price, rating, image }) => (
                      <ProductCard
                        key={id}
                        title={title}
                        price={price}
                        rating={rating}
                        image={image}
                      />
                    ))}
              </div>
            </div>
          </section>
          <div className="mt-24"></div>
        </main>
      </HomeLayouts>
    </>
  );
}

export default Homepage;
