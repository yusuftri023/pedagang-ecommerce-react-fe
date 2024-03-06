import HomeLayouts from "../layouts/Homelayouts";

import CarouselSlide from "../components/molecules/CarouselSlide";

const featureList = [
  {
    image: "/src/assets/images/landing-page/Group 11.svg",
    name: "Bayar Di Tempat",
  },
  {
    image: "/src/assets/images/landing-page/Group 12.svg",
    name: "Gratis Ongkir dan Voucher",
  },
  {
    image: "/src/assets/images/landing-page/Group 13.svg",
    name: "Pulsa, Tagihan dan Tiket",
  },
  {
    image: "/src/assets/images/landing-page/PROMO.svg",
    name: "Serba Promo",
  },
  {
    image: "/src/assets/images/landing-page/KERANJANG.svg",
    name: "Produk Lokal",
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
const topSellingProductList = [
  {
    name: "Headset bluetooth",
    price: 300000,
    image: "/src/assets/images/landing-page/product-1.jpeg",
    initialStock: 100,
    curStock: 49,
  },
  {
    name: "Headset Kabel",
    price: 90000,
    image: "/src/assets/images/landing-page/product-2.jpeg",
    initialStock: 100,
    curStock: 57,
  },
  {
    name: "Kabel data/USB",
    price: 60000,
    image: "/src/assets/images/landing-page/product-3.jpeg",
    initialStock: 100,
    curStock: 11,
  },
  {
    name: "Holder HP Mobil",
    price: 100000,
    image: "/src/assets/images/landing-page/product-4.jpeg",
    initialStock: 100,
    curStock: 25,
  },
  {
    name: "Holder HP Sepeda",
    price: 70000,
    image: "/src/assets/images/landing-page/product-5.jpeg",
    initialStock: 100,
    curStock: 22,
  },
  {
    name: "Casing HP Panda",
    price: 50000,
    image: "/src/assets/images/landing-page/product-6.png",
    initialStock: 100,
    curStock: 43,
  },
];

const topFeaturedProductList = [
  {
    name: "Casing HP Panda",
    price: 70000,
    image: "/src/assets/images/landing-page/product-6.png",
  },
  {
    name: "Holder HP Sepeda",
    price: 100000,
    image: "/src/assets/images/landing-page/product-4.jpeg",
  },
  {
    name: "Holder HP Mobil",
    price: 200000,
    image: "/src/assets/images/landing-page/product-5.jpeg",
  },
  {
    name: "Kabel Data/USB",
    price: 60000,
    image: "/src/assets/images/landing-page/product-3.jpeg",
  },
  {
    name: "Headset Kabel",
    price: 70000,
    image: "/src/assets/images/landing-page/product-2.jpeg",
  },
];
function Homepage() {
  return (
    <>
      <HomeLayouts>
        <CarouselSlide />
        <main className="font-poppins w-[1000px] mx-auto">
          <section>
            <div className="flex justify-center divide-x-2 my-4">
              {featureList.map((feature, i) => (
                <div
                  key={i}
                  className="flex flex-col w-[20%]  justify-top items-center text-center px-2  "
                >
                  <img src={feature.image} alt="" className="size-20 " />
                  <p>{feature.name}</p>
                </div>
              ))}
            </div>
          </section>

          <div>
            <div className="flex gap-x-3 justify-between text-zinc-100">
              {bannerList.map((val) => (
                <div key={val.id} className="w-[32%] h-[160px] overflow-hidden">
                  <div className="size-full hover:scale-110 duration-300">
                    <img
                      src={val.image}
                      className={`h-[140%] object-cover object-left bg-gradient-to-b from-[${val.bg.color}] via-[${val.bg.gradient}] to-[${val.bg.color}] pl-40 `}
                    />
                    <div className="relative h-[100%] -translate-y-[150%] flex flex-col px-5 justify-end flex-nowrap">
                      <h2 className="mb-4 text-xl w-[50%]">{val.title}</h2>
                      <h2>{val.body}</h2>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <section className="my-4">
            <div className="border-b-2 border-gray-400 mb-4">
              <span className="border-b-2 border-[#FFCA1D]">
                Top Selling Product
              </span>
            </div>
            <div className="overflow-x-scroll no-scrollbar px-4">
              <div className=" flex space-x-10 whitespace-nowrap ">
                {topSellingProductList.map((val, i) => (
                  <div
                    key={i}
                    className="border-2 border-zinc-200 drop-shadow-md min-w-48 rounded-t-lg  overflow-hidden "
                  >
                    <a href="/">
                      <div className="overflow-hidden">
                        <img
                          src={val.image}
                          alt=""
                          className="size-48 duration-300 hover:scale-125"
                        />
                      </div>
                      <div className="w-[80%] mx-auto">
                        <span>{val.name}</span>
                        <div>
                          <div>
                            {new Intl.NumberFormat("id", {
                              currency: "idr",
                              style: "currency",
                            }).format(val.price)}
                          </div>
                          <div>Terjual: {val.initialStock - val.curStock}</div>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="my-4">
            <div className="border-b-2 border-gray-400 mb-4">
              <span className="border-b-2 border-[#FFCA1D]">
                Top Featured Product
              </span>
            </div>
            <div className="flex">
              <div className="w-[50%]">
                <div className="flex w-full  border-2 border-gray-200">
                  <div className=" mx-4  overflow-hidden m-auto">
                    <a href="/">
                      <img
                        className="w-[300px] hover:scale-125 duration-300"
                        src={topFeaturedProductList[0].image}
                        alt=""
                      />
                    </a>
                  </div>

                  <div className="m-4 text-center">
                    <div>{topFeaturedProductList[0].name}</div>
                    <h2 className="text-sm mt-4">
                      {new Intl.NumberFormat("id", {
                        currency: "idr",
                        style: "currency",
                      }).format(topFeaturedProductList[0].price)}
                    </h2>
                    <div>
                      <div className="text-left">
                        <ul className="mt-10">
                          <li className=" before:content-['✅'] before:mr-2">
                            Barang ringan
                          </li>
                          <li className=" before:content-['✅'] before:mr-2">
                            Warna tahan lama
                          </li>
                          <li className=" before:content-['✅'] before:mr-2">
                            Grip tangan yang nyaman
                          </li>
                          <li className=" before:content-['✅'] before:mr-2">
                            Tersedia dengan desain yang berbeda
                          </li>
                        </ul>
                      </div>
                      <button className="bg-[#FFCA1D] py-4 px-8 rounded-xl mt-8">
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-[50%]">
                <div className="grid grid-cols-2 gap-[10px] items-center ml-auto">
                  {topFeaturedProductList.slice(1).map((val, i) => (
                    <div key={i} className=" border-2 border-zinc-200 p-4">
                      <div className="w-[200px] text-center">
                        <div className="overflow-hidden">
                          <img
                            className="size-[95px] mx-auto duration-300 hover:scale-125"
                            src={val.image}
                            alt=""
                          />
                        </div>
                        <div className="">
                          <div>{val.name}</div>
                          <div>
                            {new Intl.NumberFormat("id", {
                              currency: "idr",
                              style: "currency",
                            }).format(val.price)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </HomeLayouts>
    </>
  );
}

export default Homepage;
