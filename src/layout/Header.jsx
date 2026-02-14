import { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Gravatar from "react-gravatar";
import { logout } from "../store/actions/clientActions";
import { fetchCategories } from "../store/actions/thunkActions";
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
  const history = useHistory();
  const dispatch = useDispatch();
  const isHomePage = location.pathname === "/";

  const cart = useSelector((state) => state.shoppingCart.cart);
  const cartItemCount = cart.reduce((total, item) => total + item.count, 0);

  const user = useSelector((state) => state.client.user);
  const categories = useSelector((state) => state.product.categories);

  const isUserLoggedIn = user && Object.keys(user).length > 0;

  const [isCartHover, setIsCartHover] = useState(false);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  const womenCategories = categories.filter((cat) => cat.gender === "k");
  const menCategories = categories.filter((cat) => cat.gender === "e");

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleCategoryClick = (category) => {
    const gender = category.gender === "k" ? "kadin" : "erkek";
    const categoryName = category.title.toLowerCase().replace(/\s+/g, "-");
    const categoryId = category.id;

    setIsShopOpen(false);
    history.push(`/shop/${gender}/${categoryName}/${categoryId}`);
  };

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
                <div className="absolute top-full left-0 mt-2 w-80 rounded-md border bg-white shadow-lg z-50 p-4">
                  <div className="flex gap-8">
                    <div className="flex-1">
                      <h3 className="font-bold text-sm text-gray-800 mb-3 pb-2 border-b">
                        Kadın
                      </h3>
                      <div className="flex flex-col gap-2">
                        {womenCategories.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => handleCategoryClick(category)}
                            className="text-left px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded"
                          >
                            {category.title}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="font-bold text-sm text-gray-800 mb-3 pb-2 border-b">
                        Erkek
                      </h3>
                      <div className="flex flex-col gap-2">
                        {menCategories.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => handleCategoryClick(category)}
                            className="text-left px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded"
                          >
                            {category.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
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
                    onClick={() => setIsPagesOpen(false)}
                  >
                    Contact
                  </Link>
                  <Link
                    to="/product"
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                    onClick={() => setIsPagesOpen(false)}
                  >
                    Product
                  </Link>
                  <Link
                    to="/team"
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                    onClick={() => setIsPagesOpen(false)}
                  >
                    Team
                  </Link>
                  <Link
                    to="/"
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                    onClick={() => setIsPagesOpen(false)}
                  >
                    Pricing
                  </Link>
                  <Link
                    to="/about"
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                    onClick={() => setIsPagesOpen(false)}
                  >
                    About
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-10 items-center lg:flex text-sm font-medium text-sky-500">
            {isUserLoggedIn ? (
              <div className="flex gap-3	items-center">
                <Gravatar
                  email={user.email}
                  size={30}
                  rating="pg"
                  default="identicon"
                  className="rounded-full"
                />
                <span className="text-gray-700 font-medium text-sm hidden lg:block">
                  {user.name || user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-red-500 font-bold text-sm hover:text-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-2 items-center text-md font-bold text-sky-500">
                <UserRound size={20} />
                <Link to="/login">Login</Link>
                <span>/</span>
                <Link to="/signup">Register</Link>
              </div>
            )}

            <Search size={20} className="text-sky-500" />

            <div className="relative group flex items-center">
              <ShoppingCart size={20} className="text-sky-500 cursor-pointer" />

              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-sky-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartItemCount}
                </span>
              )}

              {/* HOVER KÖPRÜSÜ */}
              <div className="absolute top-full right-0 h-3 w-full"></div>

              <div className="absolute top-full right-0 pt-3 min-w-[260px] max-w-[320px] z-[999] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200">
                <div className="bg-white border rounded shadow-lg p-3 flex flex-col">
                  <div className="flex justify-between items-center border-b pb-2 mb-2">
                    <span className="font-semibold text-sm">
                      Sepetim ({cartItemCount} ürün)
                    </span>
                  </div>

                  {cart.length === 0 ? (
                    <p className="text-sm text-gray-500">Cart is empty</p>
                  ) : (
                    <div className="flex flex-col gap-3 max-h-60 overflow-auto">
                      {cart.map((item) => {
                        const prod = item.product || {};
                        const imgUrl =
                          prod.images?.[0]?.url || prod.img || prod.image || "";

                        return (
                          <div key={prod.id} className="flex gap-3 items-start">
                            {imgUrl ? (
                              <img
                                src={imgUrl}
                                className="w-14 h-14 object-cover rounded"
                              />
                            ) : (
                              <div className="w-14 h-14 bg-gray-200 rounded" />
                            )}

                            <div className="flex flex-col text-sm">
                              <span className="font-medium">
                                {prod.name || prod.title}
                              </span>

                              <span className="text-xs text-gray-500">
                                Adet: {item.count}
                              </span>

                              <span className="font-semibold">
                                {prod.price} ₺
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <div className="flex gap-2 mt-3 pt-2 border-t">
                    <button className="w-1/2 border border-sky-500 text-sky-500 py-2 rounded text-sm font-semibold hover:bg-sky-50">
                      Sepete Git
                    </button>

                    <button className="w-1/2 bg-sky-500 text-white py-2 rounded text-sm font-semibold hover:bg-sky-600">
                      Siparişi Tamamla
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <Heart size={20} className="text-sky-500" />
          </div>
        </nav>
      </div>
      {isHomePage && <HeaderSlider />}
    </header>
  );
}
