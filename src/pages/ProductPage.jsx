import { useState } from "react";
import ProductPageSlider from "../components/ProductPageSlider";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import {
  ChevronRight,
  LayoutGrid,
  ListChecks,
  ChevronDown,
  Heart,
  ShoppingCart,
  Eye,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import Brands from "../components/Brands";

export default function ProductPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    "/src/assets/images/product-page-1.png",
    "/src/assets/images/product-page-2.png",
  ];

  return (
    <section className="bg-stone-100">
      <Header />

      <section className="text-center flex flex-col gap-16 lg:px-52 py-12">
        <div className="flex justify-center gap-4 items-center lg:items-start lg:justify-start">
          <h2 className="font-bold">Home</h2>
          <ChevronRight className="text-stone-400" />
          <h2 className="font-medium text-stone-600">Shop</h2>
        </div>
      </section>

      <nav className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-center lg:px-36 lg:pb-12">
        <div
          className="px-8 flex flex-col gap-6 w-full
                  lg:w-1/2
                  max-w-[600px]
                  px-8
                  flex flex-col
                  gap-6
                  shrink-0"
        >
          <ProductPageSlider onChange={setActiveIndex} />

          <div className="flex gap-3">
            {images.map((img, index) => (
              <img
                key={img}
                src={img}
                alt=""
                className={`
                  w-[20vw] h-[8vh] object-cover
                  transition-opacity duration-300
                  sm:w-20 sm:h-20
                  cursor-pointer
                  ${activeIndex === index ? "opacity-60" : "opacity-100"}
                `}
              />
            ))}
          </div>
        </div>
        <div
          className="flex flex-col px-16 text-start gap-6 py-8 w-full
        lg:w-1/2
        "
        >
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold">Floating Phone</h2>
            <div className="flex gap-2 items-center">
              <ul className="flex gap-1">
                <li>
                  <FontAwesomeIcon
                    icon={solidStar}
                    className="text-yellow-500"
                  />
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={solidStar}
                    className="text-yellow-500"
                  />
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={solidStar}
                    className="text-yellow-500"
                  />
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={solidStar}
                    className="text-yellow-500"
                  />
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={regularStar}
                    className="text-yellow-500"
                  />
                </li>
              </ul>
              <p className="text-stone-700 font-semibold text-sm">10 Reviews</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-2xl">$1,139.33</h3>
            <div className="flex gap-2">
              <p className="font-semibold text-sm text-stone-700">
                Availability :
              </p>
              <p className="text-sm font-semibold text-sky-500">In Stock</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-sm font-medium text-stone-600">
              Met minim Mollie non desert Alamo est sit cliquey dolor do met
              sent. RELIT official consequent door ENIM RELIT Mollie. Excitation
              venial consequent sent nostrum met.
            </p>
            <div className="border w-full" />
            <span className="flex gap-2">
              <div className="rounded-full w-6 h-6 bg-sky-500"></div>
              <div className="rounded-full w-6 h-6 bg-green-500"></div>
              <div className="rounded-full w-6 h-6 bg-orange-500"></div>
              <div className="rounded-full w-6 h-6 bg-black"></div>
            </span>
          </div>
          <div className="flex items-center justify-between lg:justify-start lg:gap-2">
            <p className="border p-3 rounded-md bg-sky-500 text-white text-md font-semibold text-nowrap">
              Select Options
            </p>
            <Heart className="border rounded-full bg-white p-3" size={45} />
            <ShoppingCart
              className="border rounded-full bg-white p-3"
              size={45}
            />
            <Eye className="border rounded-full bg-white p-3" size={45} />
          </div>
        </div>
      </nav>

      <article className="flex flex-col bg-white py-8 gap-8 lg:px-40 lg:py-12">
        <div className="flex justify-around px-2 lg:justify-center lg:gap-12">
          <button className="underline text-xs text-stone-700 font-semibold lg:text-sm">
            Description
          </button>
          <p className="text-xs text-stone-700 font-semibold text-nowrap lg:text-sm">
            Additional Information
          </p>
          <p className="text-xs text-stone-700 font-semibold lg:text-sm">
            Reviews<span className="text-green-700">(0)</span>
          </p>
        </div>
        <div className="lg:flex">
          <div className="px-10">
            <img
              src="./src/assets/images/product-shop-2.png"
              alt=""
              className="rounded-md shadow-[4px_4px_10px_rgba(0,0,0,0.50)] min-h-[300px] lg:h-full lg:max-w-[20vw] lg:object-cover"
            />
          </div>

          <div className="flex flex-col gap-8 px-10 py-6 lg:flex-row">
            <span className="flex flex-col gap-8 lg:flex-1">
              <h2 className="font-bold text-2xl">the quick fox jumps over </h2>
              <p className="font-medium text-sm text-stone-700">
                Met minim Mollie non desert Alamo est sit cliquey dolor do met
                sent. RELIT official consequent door ENIM RELIT Mollie.
                Excitation venial consequent sent nostrum met.
                <br /> <br />
                Met minim Mollie non desert Alamo est sit cliquey dolor do met
                sent. RELIT official consequent door ENIM RELIT Mollie.
                Excitation venial consequent sent nostrum met.
                <br /> <br />
                Met minim Mollie non desert Alamo est sit cliquey dolor do met
                sent. RELIT official consequent door ENIM RELIT Mollie.
                Excitation venial consequent sent nostrum met.
              </p>
            </span>
            <div className="flex flex-col gap-8 lg:flex-1">
              <span className="flex flex-col gap-6">
                <h2 className="font-bold text-2xl">
                  the quick fox jumps over{" "}
                </h2>
                <ul className="flex flex-col gap-2">
                  <li className="flex gap-2 items-center">
                    <ChevronRight className="text-stone-400" />
                    <p className="font-medium text-sm text-stone-700">
                      the quick fox jumps over the lazy dog
                    </p>
                  </li>
                  <li className="flex gap-2 items-center">
                    <ChevronRight className="text-stone-400" />
                    <p className="font-medium text-sm text-stone-700">
                      the quick fox jumps over the lazy dog
                    </p>
                  </li>
                  <li className="flex gap-2 items-center">
                    <ChevronRight className="text-stone-400" />
                    <p className="font-medium text-sm text-stone-700">
                      the quick fox jumps over the lazy dog
                    </p>
                  </li>
                  <li className="flex gap-2 items-center">
                    <ChevronRight className="text-stone-400" />
                    <p className="font-medium text-sm text-stone-700">
                      the quick fox jumps over the lazy dog
                    </p>
                  </li>
                </ul>
              </span>
              <span className="flex flex-col gap-6">
                <h2 className="font-bold text-2xl">the quick fox jumps over</h2>
                <ul className="flex flex-col gap-2">
                  <li className="flex gap-2 items-center">
                    <ChevronRight className="text-stone-400" />
                    <p className="font-medium text-sm text-stone-700">
                      the quick fox jumps over the lazy dog
                    </p>
                  </li>
                  <li className="flex gap-2 items-center">
                    <ChevronRight className="text-stone-400" />
                    <p className="font-medium text-sm text-stone-700">
                      the quick fox jumps over the lazy dog
                    </p>
                  </li>
                  <li className="flex gap-2 items-center">
                    <ChevronRight className="text-stone-400" />
                    <p className="font-medium text-sm text-stone-700">
                      the quick fox jumps over the lazy dog
                    </p>
                  </li>
                </ul>
              </span>
            </div>
          </div>
        </div>
      </article>

      <main className="bg-stone-100 py-12">
  <h1 className="font-bold text-2xl text-center">
    BESTSELLER PRODUCTS
  </h1>

  {/* BORDER */}
  <div className="border w-4/5 mx-auto my-6" />

  {/* PRODUCTS WRAPPER — border ile aynı hizadan başlar */}
  <div className="flex flex-wrap w-4/5 mx-auto">

    {/* CARD 1 */}
    <div className="w-full sm:w-1/2 lg:w-1/4 p-4">
      <div className="aspect-[4/5] w-full">
        <img
          src="./src/assets/images/product-shop-1.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-3 pl-4 bg-white pt-6 pb-10">
        <h2 className="font-bold">Graphic Design</h2>
        <p className="text-sm font-semibold text-stone-700">
          English Department
        </p>
        <div className="flex gap-2">
          <span className="text-stone-400 font-semibold">$16.48</span>
          <span className="text-green-700 font-semibold">$6.48</span>
        </div>
      </div>
    </div>

    {/* CARD 2 */}
    <div className="w-full sm:w-1/2 lg:w-1/4 p-4">
      <div className="aspect-[4/5] w-full">
        <img
          src="./src/assets/images/product-shop-7.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-3 pl-4 bg-white pt-6 pb-10">
        <h2 className="font-bold">Graphic Design</h2>
        <p className="text-sm font-semibold text-stone-700">
          English Department
        </p>
        <div className="flex gap-2">
          <span className="text-stone-400 font-semibold">$16.48</span>
          <span className="text-green-700 font-semibold">$6.48</span>
        </div>
      </div>
    </div>

    {/* CARD 3 */}
    <div className="w-full sm:w-1/2 lg:w-1/4 p-4">
      <div className="aspect-[4/5] w-full">
        <img
          src="./src/assets/images/product-shop-3.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-3 pl-4 bg-white pt-6 pb-10">
        <h2 className="font-bold">Graphic Design</h2>
        <p className="text-sm font-semibold text-stone-700">
          English Department
        </p>
        <div className="flex gap-2">
          <span className="text-stone-400 font-semibold">$16.48</span>
          <span className="text-green-700 font-semibold">$6.48</span>
        </div>
      </div>
    </div>

    {/* CARD 4 */}
    <div className="w-full sm:w-1/2 lg:w-1/4 p-4">
      <div className="aspect-[4/5] w-full">
        <img
          src="./src/assets/images/product-shop-4.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-3 pl-4 bg-white pt-6 pb-10">
        <h2 className="font-bold">Graphic Design</h2>
        <p className="text-sm font-semibold text-stone-700">
          English Department
        </p>
        <div className="flex gap-2">
          <span className="text-stone-400 font-semibold">$16.48</span>
          <span className="text-green-700 font-semibold">$6.48</span>
        </div>
      </div>
    </div>

    {/* CARD 5 */}
    <div className="w-full sm:w-1/2 lg:w-1/4 p-4">
      <div className="aspect-[4/5] w-full">
        <img
          src="./src/assets/images/product-shop-5.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-3 pl-4 bg-white pt-6 pb-10">
        <h2 className="font-bold">Graphic Design</h2>
        <p className="text-sm font-semibold text-stone-700">
          English Department
        </p>
        <div className="flex gap-2">
          <span className="text-stone-400 font-semibold">$16.48</span>
          <span className="text-green-700 font-semibold">$6.48</span>
        </div>
      </div>
    </div>

    {/* CARD 6 */}
    <div className="w-full sm:w-1/2 lg:w-1/4 p-4">
      <div className="aspect-[4/5] w-full">
        <img
          src="./src/assets/images/product-shop-6.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-3 pl-4 bg-white pt-6 pb-10">
        <h2 className="font-bold">Graphic Design</h2>
        <p className="text-sm font-semibold text-stone-700">
          English Department
        </p>
        <div className="flex gap-2">
          <span className="text-stone-400 font-semibold">$16.48</span>
          <span className="text-green-700 font-semibold">$6.48</span>
        </div>
      </div>
    </div>

    {/* CARD 7 */}
    <div className="w-full sm:w-1/2 lg:w-1/4 p-4">
      <div className="aspect-[4/5] w-full">
        <img
          src="./src/assets/images/product-shop-7.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-3 pl-4 bg-white pt-6 pb-10">
        <h2 className="font-bold">Graphic Design</h2>
        <p className="text-sm font-semibold text-stone-700">
          English Department
        </p>
        <div className="flex gap-2">
          <span className="text-stone-400 font-semibold">$16.48</span>
          <span className="text-green-700 font-semibold">$6.48</span>
        </div>
      </div>
    </div>

    {/* CARD 8 */}
    <div className="w-full sm:w-1/2 lg:w-1/4 p-4">
      <div className="aspect-[4/5] w-full">
        <img
          src="./src/assets/images/product-shop-1.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-3 pl-4 bg-white pt-6 pb-10">
        <h2 className="font-bold">Graphic Design</h2>
        <p className="text-sm font-semibold text-stone-700">
          English Department
        </p>
        <div className="flex gap-2">
          <span className="text-stone-400 font-semibold">$16.48</span>
          <span className="text-green-700 font-semibold">$6.48</span>
        </div>
      </div>
    </div>

  </div>
</main>



      <Brands />

      <Footer variant="shop" />
    </section>
  );
}
