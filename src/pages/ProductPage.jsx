import { useState } from "react";
import ProductPageSlider from "../components/ProductPageSlider";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import {
  ChevronRight,
  LayoutGrid,
  ListChecks,
  ChevronDown,
} from "lucide-react";

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

      <nav className="flex flex-col">
        <div className="px-8 flex flex-col gap-6">
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
                  ${activeIndex === index ? "opacity-60" : "opacity-100"}
                `}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col px-12 text-start gap-6">
          <div>
            <h2>Floating Phone</h2>
            <p>10 Reviews</p>
          </div>
          <div>
            <h3>$1,139.33</h3>
            <div>
              <p>Availability :</p>
              <p>In Stock</p>
            </div>
          </div>
          <div>
            <p>
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
          <div className="flex items-center">
            <p>Select Options</p>
            <ListChecks className="border rounded-full bg-white p-2" size={40} />
            
          </div>
        </div>
      </nav>

      <Footer variant="shop" />
    </section>
  );
}
