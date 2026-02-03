import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  Heart,
  Phone,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  UserRound,
} from "lucide-react";
import HeaderSlider from "../components/HeaderSlider";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <header className="w-full">
      <div className="hidden lg:block lg:bg-slate-900 lg:text-white lg:flex lg:justify-between lg:items-center lg:p-4 lg:px-52 lg:text-xs lg:font-medium">
        <span className="lg:flex lg:gap-4">
          <span className="flex gap-2">
            <Phone size={15} />
            <p>(225) 555-0118</p>
          </span>
          <p>michelle.rivera@example.com</p>
        </span>

        <span>
          <p>Follow Us and get a chance to win 80% off</p>
        </span>

        <span className="lg:flex lg:gap-4">
          <p>Follow Us :</p>
          <Instagram size={15} />
          <Youtube size={15} />
          <Facebook size={15} />
          <Twitter size={15} />
        </span>
      </div>

      <div className="flex flex-col py-6 gap-10 lg:py-2 lg:flex-row lg:justify-between">
        <div className="flex justify-between lg:hidden">
          <Link
            to="/"
            className="text-lg font-semibold text-black lg:font-bold lg:text-xl"
          >
            Bandage
          </Link>
          <div className="flex items-center gap-8 lg:text-cyan-500">
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        <nav
          className={`
            lg:flex lg:flex-row lg:gap-3 lg:py-4 lg:gap-8 lg:w-full lg:justify-around
            flex flex-col items-center gap-12 justify-between 
            ${isOpen ? "flex" : "hidden"}
            `}
        >
          <Link
            to="/"
            className="text-lg font-semibold text-black lg:font-bold lg:text-xl hidden lg:flex"
          >
            Bandage
          </Link>
          <div className="lg:flex lg:flex-row gap-6 flex flex-col items-center">
            <Link to="/" className="text-lg font-medium text-gray-600">
              Home
            </Link>

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsShopOpen((prev) => !prev)}
                className="flex items-center gap-1 text-lg font-medium text-gray-600 hover:text-black"
              >
                Shop
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isShopOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isShopOpen && (
                <div className="absolute top-full left-0 mt-2 w-40 rounded-md border bg-white shadow-lg z-50">
                  <Link
                    to="/shop"
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                    onClick={() => setIsShopOpen(false)}
                  >
                    Women
                  </Link>
                  <Link
                    to="/shop"
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                    onClick={() => setIsShopOpen(false)}
                  >
                    Men
                  </Link>
                  <Link
                    to="/shop"
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                    onClick={() => setIsShopOpen(false)}
                  >
                    Accessories
                  </Link>
                </div>
              )}
            </div>

            <Link to="/" className="text-lg font-medium text-gray-600">
              About
            </Link>

            <Link to="/" className="text-lg font-medium text-gray-600">
              Blog
            </Link>

            <Link to="/" className="text-lg font-medium text-gray-600">
              Contact
            </Link>

            <Link to="/" className="text-lg font-medium text-gray-600">
              Pages
            </Link>
          </div>
          <div className="flex gap-10 items-center lg:flex text-sm font-medium text-sky-500">
            <div className="flex gap-2">
              <UserRound size={20} />
              <span className="text-md font-bold flex items-center">
                Login / Register
              </span>
            </div>

            <Search size={20} className="text-sky-500" />
            <ShoppingCart size={20} className="text-sky-500" />
            <Heart size={20} className="text-sky-500" />
          </div>
        </nav>
      </div>
      {isHomePage && <HeaderSlider />}
    </header>
  );
}
