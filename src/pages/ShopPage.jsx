import {
  ChevronRight,
  LayoutGrid,
  ListChecks,
  ChevronDown,
} from "lucide-react";
import shopCategories from "../data/shopCategories";
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Brands from "../components/Brands";

const products = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: "Product",
  image: `/src/assets/images/product-${(i % 8) + 1}.png`,
}));

export default function ShopPage() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);

  const perPage = 4;
  const totalPages = Math.ceil(products.length / perPage);
  const mobileProducts = products.slice((page - 1) * perPage, page * perPage);

  const isFirstDisabled = page === 1;
  const isNextDisabled = page === totalPages;

  return (
    <>
      <Header />
      <section className="text-center flex flex-col gap-16 lg:px-24 bg-stone-100 pt-12">
        <div className="flex flex-col gap-20 lg:flex-row lg:justify-between lg:px-8">
          <h1 className="font-bold text-3xl">Shop</h1>

          <div className="flex justify-center gap-4 items-center">
            <h2 className="font-bold">Home</h2>
            <ChevronRight className="text-stone-400" />
            <h2 className="font-medium text-stone-600">Shop</h2>
          </div>
        </div>

        <div className=" px-8 flex flex-col justify-center items-center gap-6 bg-stone-100 lg:flex-row">
          {shopCategories.map((category) => (
            <div
              key={category.id}
              className="relative w-full h-[450px] overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 lg:h-[300px]"
            >
              <img
                src={category.image}
                alt={category.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <h3 className="text-white text-xl font-bold tracking-wide">
                  {category.title}
                </h3>
                <p className="text-white text-sm font-medium">5 items</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-16 items-center pt-12 lg:flex-row lg:justify-between lg:px-16">
          <h3 className="font-bold text-stone-600 text-xl">
            Showing all 12 results
          </h3>

          <div className="flex gap-6">
            <p className="font-bold text-stone-600 text-xl p-4">Views:</p>
            <div className="border p-4 rounded-md">
              <LayoutGrid size={28} />
            </div>
            <div className="border p-4 rounded-md">
              <ListChecks size={28} />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="relative inline-block text-left">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 w-36 h-14 px-4 py-2 border rounded-md border-stone-300 bg-stone-100 text-sm font-medium text-stone-700 hover:bg-stone-200"
              >
                Popularity
                <ChevronDown
                  size={16}
                  className={`transition-transform ${open ? "rotate-180" : ""}`}
                />
              </button>

              {open && (
                <div className="absolute z-20 mt-2 w-44 rounded-md border border-stone-200 bg-white shadow-lg">
                  <button className="block w-full px-4 py-2 text-left text-sm hover:bg-stone-100">
                    Most Popular
                  </button>
                  <button className="block w-full px-4 py-2 text-left text-sm hover:bg-stone-100">
                    Newest
                  </button>
                  <button className="block w-full px-4 py-2 text-left text-sm hover:bg-stone-100">
                    Price: Low to High
                  </button>
                </div>
              )}
            </div>

            <button className="text-white font-semibold bg-sky-500 py-4 px-8 rounded-md">
              Filter
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center lg:flex-row lg:flex-wrap lg:justify-center lg:gap-6 lg:px-24">
          <div className="flex flex-col items-center lg:hidden">
            {mobileProducts.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                image={product.image}
              />
            ))}
          </div>

          <div className="hidden lg:flex lg:flex-wrap lg:justify-center lg:gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                image={product.image}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex justify-between items-center border-2 border-stone-400 rounded-md mx-16 lg:w-1/4 lg:mx-auto">
            {/* FIRST */}
            <button
              onClick={() => !isFirstDisabled && setPage(1)}
              disabled={isFirstDisabled}
              className={`p-6 font-medium transition
      ${
        isFirstDisabled
          ? "bg-stone-200 text-stone-400 cursor-not-allowed"
          : "text-sky-500 hover:bg-stone-200"
      }
    `}
            >
              First
            </button>

            {/* PAGE NUMBERS */}
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`flex w-full items-center justify-center border-l-2 py-6 px-4 transition ${
                  page === p
                    ? "bg-sky-500 text-white border-sky-500"
                    : "border-stone-300 text-sky-500 font-medium hover:bg-stone-100"
                }`}
              >
                {p}
              </button>
            ))}

            {/* NEXT */}
            <button
              onClick={() => !isNextDisabled && setPage((prev) => prev + 1)}
              disabled={isNextDisabled}
              className={`p-6 border-l-2 border-stone-300 font-medium transition
      ${
        isNextDisabled
          ? "bg-stone-200 text-stone-400 cursor-not-allowed"
          : "text-sky-500 hover:bg-stone-200"
      }
    `}
            >
              Next
            </button>
          </div>
        </div>
        
        <Brands />
      </section>
      <Footer variant="shop" />
    </>
  );
}
