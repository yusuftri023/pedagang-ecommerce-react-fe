import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HomeLayouts from "../layouts/Homelayouts";
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";

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
        <main className="font-poppins w-[1000px] mx-auto">
          <section className="w-full h-[250px] mt-4">
            <div className="w-[1000px] h-full mx-auto bg-black  overflow-hidden">
              <div
                className={
                  " backdrop-brightness-75 flex flex-row transform duration-200 ease-in-out  " +
                  "-translate-x-[100%]"
                }
              >
                <img
                  src="/src/assets/images/landing-page/carousel-1.svg"
                  alt="carousel image"
                  className="min-w-full"
                />
                <img
                  src="/src/assets/images/landing-page/carousel-2.svg"
                  alt="carousel image"
                  className="min-w-full"
                />
                <img
                  src="/src/assets/images/landing-page/carousel-3.svg"
                  alt="carousel image"
                  className="min-w-full"
                />
              </div>
              <div className="relative top-[-50%] -translate-y-[50%] w-[1000px] flex justify-between items-center transition-opacity duration-300 text-white opacity-10 hover:opacity-100">
                <div className=" ml-4 py-[125px] ">
                  <FontAwesomeIcon
                    icon={faArrowAltCircleLeft}
                    className="text-4xl rounded-full hover:cursor-pointer hover:bg-blue-400 hover:bg-opacity-50"
                  />
                </div>

                <div className=" mr-4 py-[125px]">
                  <FontAwesomeIcon
                    icon={faArrowAltCircleRight}
                    className="text-4xl rounded-full hover:cursor-pointer hover:bg-blue-400 hover:bg-opacity-50"
                  />
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="flex justify-between my-4">
              {featureList.map((feature, i) => (
                <div
                  key={i}
                  className="flex flex-col w-40 justify-top items-center text-center border-2 border-zinc-200 drop-shadow-md"
                >
                  <img src={feature.image} alt="" className="size-20" />
                  <p>{feature.name}</p>
                </div>
              ))}
            </div>
          </section>

          <div>
            <div className="flex gap-x-3">
              <div>
                <img
                  src="/src/assets/images/landing-page/banner-2.png"
                  alt=""
                />
              </div>
              <div>
                <img
                  src="/src/assets/images/landing-page/banner-1.png"
                  alt=""
                />
              </div>
            </div>
          </div>

          <section className="my-4">
            <div className="border-b-2 border-gray-400 mb-4">
              <span className="border-b-2 border-yellow-400">
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
                      <div>
                        <img src={val.image} alt="" className="size-48" />
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
              <span className="border-b-2 border-yellow-400">
                Top Featured Product
              </span>
            </div>
            <div className="flex">
              <div className="w-[50%]">
                <div className="flex w-full rounded-lg border-2 border-gray-200">
                  <div className=" mx-4 rounded-lg overflow-hidden m-auto">
                    <a href="/">
                      <img
                        className="w-[300px]"
                        src="/src/assets/images/landing-page/product-6.png"
                        alt=""
                      />
                    </a>
                  </div>

                  <div className="m-4 text-center">
                    <div>Casing HP Panda</div>
                    <h2 className="text-sm mt-4">Rp. 70.000,-</h2>
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
                      <button className="bg-yellow-400 py-4 px-8 rounded-xl mt-8">
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-[50%]">
                <div className="grid grid-cols-2 gap-[10px] items-center ml-auto">
                  {topFeaturedProductList.map((val, i) => (
                    <div
                      key={i}
                      className="rounded-lg border-2 border-zinc-200 p-4"
                    >
                      <div className="w-[200px] text-center">
                        <img
                          className="size-[95px] mx-auto"
                          src={val.image}
                          alt=""
                        />
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
