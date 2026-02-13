import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
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
  const [isPagesOpen, setIsPagesOpen] = useState(false);

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const cart = useSelector((state) => state.shoppingCart.cart);
  const cartItemCount = cart.reduce((total, item) => total + item.count, 0);

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

      <div className="flex flex-col py-6 gap-10 lg:py-2 lg:flex-row lg:justify-between lg:px-52">
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
            lg:flex lg:flex-row lg:gap-3 lg:py-4 lg:gap-8 lg:w-full
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
              Blog
            </Link>

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsPagesOpen((prev) => !prev)}
                className="flex items-center gap-1 text-lg font-medium text-gray-600 hover:text-black"
              >
                Pages
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isPagesOpen ? "rotate-180" : ""
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

              {isPagesOpen && (
                <div className="absolute top-full left-0 mt-2 w-40 rounded-md border bg-white shadow-lg z-50">
                  <Link
                    to="/contact"
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                    onClick={() => setIsShopOpen(false)}
                  >
                    Contact
                  </Link>
                  <Link
                    to="/product"
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                    onClick={() => setIsShopOpen(false)}
                  >
                    Product
                  </Link>
                  <Link
                    to="/team"
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                    onClick={() => setIsShopOpen(false)}
                  >
                    Team
                  </Link>
                  <Link
                    to="/"
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                    onClick={() => setIsShopOpen(false)}
                  >
                    Pricing
                  </Link>
                  <Link
                    to="/about"
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                    onClick={() => setIsShopOpen(false)}
                  >
                    About
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-10 items-center lg:flex text-sm font-medium text-sky-500">
            <div className="flex gap-2 items-center text-md font-bold text-sky-500">
              <UserRound size={20} />
              <Link to="/login">Login</Link>
              <span>/</span>
              <Link to="/signup">Register</Link>
            </div>

            <Search size={20} className="text-sky-500" />
            
            <div className="relative">
              <ShoppingCart size={20} className="text-sky-500" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-sky-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartItemCount}
                </span>
              )}
            </div>
            
            <Heart size={20} className="text-sky-500" />
          </div>
        </nav>
      </div>
      {isHomePage && <HeaderSlider />}
    </header>
  );
}