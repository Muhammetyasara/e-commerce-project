import { useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <>
    <Header />

    <section className="px-10 py-24 text-center flex flex-col items-center gap-12 lg:gap-16">
      <div className="flex flex-col gap-6">
        <h1 className="font-bold text-4xl">Pricing</h1>
        <p className="text-stone-500 font-medium px-4 lg:w-4/5 lg:self-center">
          Problems trying to resolve the conflict between the two major realms
          of Classical physics: Newtonian mechanics
        </p>
      </div>

      <div className="flex items-center gap-6">
        <h2
          className={`cursor-pointer transition-all duration-300 ${
            isYearly ? "font-normal text-stone-400" : "font-bold text-gray-900"
          }`}
          onClick={() => setIsYearly(false)}
        >
          Monthly
        </h2>

        <span
          onClick={() => setIsYearly(!isYearly)}
          className={`relative inline-flex w-[52px] h-7 rounded-full cursor-pointer transition-colors duration-300 flex-shrink-0 ${
            isYearly ? "bg-indigo-500" : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute top-[3px] w-[22px] h-[22px] bg-white rounded-full shadow-md transition-all duration-300 ${
              isYearly ? "left-[27px]" : "left-[3px]"
            }`}
          />
        </span>

        <h2
          className={`cursor-pointer transition-all duration-300 ${
            isYearly ? "font-bold text-gray-900" : "font-normal text-stone-400"
          }`}
          onClick={() => setIsYearly(true)}
        >
          Yearly
        </h2>
        <p
          className={`text-xs font-semibold px-5 py-3 rounded-full text-nowrap transition-colors duration-300 ${
            isYearly ? "text-sky-700 bg-sky-300" : "text-gray-400 bg-gray-100"
          }`}
        >
          Save 25%
        </p>
      </div>
      <div className="flex flex-col gap-8 lg:flex-row lg:px-60 lg:gap-8">
        <div className="flex flex-col gap-8 text-start text-sky-500 border border-sky-500 rounded-xl p-12 lg:flex-row lg:flex-1 lg:px-16 lg:text-start lg:items-center ">
          <div className="lg:flex-1 lg:flex lg:flex-col lg:gap-4">
            <h1 className="font-bold text-2xl">FREE</h1>
            <p className="text-stone-500 font-semibold text-sm tracking-wide">
              Most calendars are designed for teams. Slate is designed for
              freelancers who want a simple way
            </p>
          </div>
          <div className="flex flex-col gap-6 lg:flex lg:flex-col lg:flex-1 lg:gap-8">
            <div className="flex gap-4">
              <p className="text-5xl font-bold">0</p>
              <div className="flex flex-col gap-2">
                <p className="font-bold text-2xl">$</p>
                <p className="text-sky-300 font-semibold">Per Month</p>
              </div>
            </div>
            <button className="text-center text-xs font-semibold p-3 border border-sky-500 rounded bg-sky-500 text-white w-3/4">
              Try For Free
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-8 text-start text-sky-500 border border-sky-500 rounded-xl p-12 lg:flex-row lg:flex-1 lg:px-16 lg:text-start lg:items-center ">
          <div className="lg:flex-1 lg:flex lg:flex-col lg:gap-4">
            <h1 className="font-bold text-2xl">PREMIUM</h1>
            <p className="text-stone-500 font-semibold text-sm tracking-wide">
              Most calendars are designed for teams. Slate is designed for
              freelancers who want a simple way
            </p>
          </div>
          <div className="flex flex-col gap-6 lg:flex lg:flex-col lg:flex-1 lg:gap-8">
            <div className="flex gap-4">
              <p className="text-5xl font-bold">19</p>
              <div className="flex flex-col gap-2">
                <p className="font-bold text-2xl">$</p>
                <p className="text-sky-300 font-semibold">Per Month</p>
              </div>
            </div>
            <button className="text-center text-xs font-semibold p-3 border border-sky-500 rounded bg-sky-500 text-white w-3/4">
              Try For Free
            </button>
          </div>
        </div>
      </div>
    </section>

    <Footer />
    </>
  );
}
