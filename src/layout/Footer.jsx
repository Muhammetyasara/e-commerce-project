import { Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer({ variant = "default" }) {
  const topSectionBg = variant === "shop" ? "bg-white" : "bg-stone-100";
  return (
    <footer>
      <section className={`w-full p-12 ${topSectionBg} flex flex-col gap-6 items-start lg:flex-row lg:items-center lg:justify-between lg:px-80 lg:py-16`}>
        <h1 className="font-bold text-2xl">Bandage</h1>
        <div className="flex gap-5 text-sky-500">
          <Facebook size={20} />
          <Instagram size={20} />
          <Twitter size={20} />
        </div>
      </section>

      <div className="hidden lg:block px-80">
        <div className="border border-stone-300"></div>
      </div>

      <section className="px-12 py-12 flex flex-col gap-8 lg:flex-row lg:justify-between lg:px-80">
        <div className="flex flex-col items-start gap-4">
          <h3 className="font-bold">Company Info</h3>
          <div className="flex flex-col items-start gap-2 lg:gap-4">
            <button className="text-stone-500 font-semibold text-sm">
              About Us
            </button>
            <button className="text-stone-500 font-semibold text-sm">
              Carrier
            </button>
            <button className="text-stone-500 font-semibold text-sm">
              We are hiring
            </button>
            <button className="text-stone-500 font-semibold text-sm">
              Blog
            </button>
          </div>
        </div>
        <div className="flex flex-col items-start gap-4">
          <h3 className="font-bold">Legal</h3>
          <div className="flex flex-col items-start gap-2 lg:gap-4">
            <button className="text-stone-500 font-semibold text-sm">
              About Us
            </button>
            <button className="text-stone-500 font-semibold text-sm">
              Carrier
            </button>
            <button className="text-stone-500 font-semibold text-sm">
              We are hiring
            </button>
            <button className="text-stone-500 font-semibold text-sm">
              Blog
            </button>
          </div>
        </div>
        <div className="flex flex-col items-start gap-4">
          <h3 className="font-bold">Features</h3>
          <div className="flex flex-col items-start gap-2 lg:gap-4">
            {" "}
            <button className="text-stone-500 font-semibold text-sm">
              Business Marketing
            </button>
            <button className="text-stone-500 font-semibold text-sm">
              User Analytic
            </button>
            <button className="text-stone-500 font-semibold text-sm">
              Live Chat
            </button>
            <button className="text-stone-500 font-semibold text-sm">
              Unlimited Support
            </button>
          </div>
        </div>
        <div className="flex flex-col items-start gap-4">
          <h3 className="font-bold">Resources</h3>
          <div className="flex flex-col items-start gap-2 lg:gap-4">
            <button className="text-stone-500 font-semibold text-sm">
              IOS & Android
            </button>
            <button className="text-stone-500 font-semibold text-sm">
              Watch a Demo
            </button>
            <button className="text-stone-500 font-semibold text-sm">
              Customers
            </button>
            <button className="text-stone-500 font-semibold text-sm">
              API
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-bold">Get In Touch</h3>
          <div className="flex flex-col">
            <div className="flex">
              <input
                type="email"
                placeholder="Your Email"
                className="border-y border-l
    border-gray-300
    rounded-s w-full pl-4 bg-stone-100 placeholder:font-medium focus:outline-none  focus:ring-1 focus:ring-stone-500"
              />
              <button className="bg-sky-500 p-4 text-white border rounded-r">
                Subscribe
              </button>
            </div>
            <span className="text-sm font-medium text-stone-500">
              Lorem ipsum dolor sit
            </span>
          </div>
        </div>
      </section>

      <section className="w-full bg-stone-100 p-8 lg:px-0">
        <div className="flex items-center justify-center lg:items-start lg:justify-start lg:px-80">
          <span className="text-center font-semibold text-stone-600">
            Made With Love By <br className="lg:hidden" /> Finland All Right
            Reserved
          </span>
        </div>
      </section>
    </footer>
  );
}
