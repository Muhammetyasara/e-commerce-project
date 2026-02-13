import {
  ChevronRight,
  LayoutGrid,
  ListChecks,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Brands from "../components/Brands";
import { fetchCategories, fetchProducts } from "../store/actions/thunkActions";
import { setOffset, setLimit } from "../store/actions/productActions";

export default function ShopPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { gender, categoryName, categoryId } = useParams();
  
  const { categories, productList, total, limit, offset, fetchState } = useSelector((state) => state.product);
  
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [visiblePages, setVisiblePages] = useState([1, 2, 3]);

  const perPageMobile = 4;
  const perPageDesktop = 12;
  
  const totalPagesMobile = Math.ceil(productList.length / perPageMobile);
  const totalPagesDesktop = Math.ceil((total || productList.length) / perPageDesktop);
  
  const mobileProducts = productList.slice((page - 1) * perPageMobile, page * perPageMobile);

  const isFirstDisabled = page === 1;
  const isNextDisabled = page === totalPagesDesktop;

  const sortedCategories = [...categories].sort((a, b) => (b.rating || 0) - (a.rating || 0));
  const top5Categories = sortedCategories.slice(0, 5);

  const selectedCategory = categoryId ? categories.find(cat => cat.id === parseInt(categoryId)) : null;

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(setLimit(perPageDesktop));
    dispatch(setOffset(0));
  }, [dispatch]);

  useEffect(() => {
    const newOffset = (page - 1) * perPageDesktop;
    dispatch(setOffset(newOffset));
    
    const params = {
      limit: perPageDesktop,
      offset: newOffset
    };
    
    if (categoryId) {
      params.category = categoryId;
    }
    
    dispatch(fetchProducts(params));
  }, [dispatch, page, categoryId]);

  const handlePageClick = (pageNum) => {
    setPage(pageNum);

    if (pageNum === visiblePages[2] && pageNum < totalPagesDesktop) {
      setVisiblePages([visiblePages[1], visiblePages[2], visiblePages[2] + 1]);
    }

    if (pageNum === visiblePages[0] && pageNum > 1) {
      setVisiblePages([visiblePages[0] - 1, visiblePages[0], visiblePages[1]]);
    }
  };

  const handleFirstPage = () => {
    setPage(1);
    setVisiblePages([1, 2, 3]);
  };

  const handleNextPage = () => {
    if (page < totalPagesDesktop) {
      const nextPage = page + 1;
      setPage(nextPage);
      
      if (nextPage > visiblePages[2] && nextPage <= totalPagesDesktop) {
        setVisiblePages([visiblePages[1], visiblePages[2], nextPage]);
      }
    }
  };

  const handleCategoryClick = (category) => {
    const genderText = category.gender === "k" ? "kadin" : "erkek";
    const catName = category.title.toLowerCase().replace(/\s+/g, '-');
    const catId = category.id;
    
    setPage(1);
    setVisiblePages([1, 2, 3]);
    
    history.push(`/shop/${genderText}/${catName}/${catId}`);
  };

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
            {selectedCategory && (
              <>
                <ChevronRight className="text-stone-400" />
                <h2 className="font-medium text-stone-600">{selectedCategory.title}</h2>
              </>
            )}
          </div>
        </div>

        {fetchState === 'FETCHING' && (
          <div className="text-center py-8">Loading...</div>
        )}

        <div className="px-8 flex flex-col justify-center items-center gap-6 bg-stone-100 lg:flex-row">
          {top5Categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className="relative w-full h-[450px] overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 lg:h-[300px]"
            >
              <img
                src={category.img}
                alt={category.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black bg-opacity-30 hover:bg-opacity-20 transition-all">
                <h3 className="text-white text-xl font-bold tracking-wide">
                  {category.title}
                </h3>
                <p className="text-white text-sm font-medium">
                  {category.item_count || 5} items
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-16 items-center pt-12 lg:flex-row lg:justify-between lg:px-16">
          <h3 className="font-bold text-stone-600 text-xl">
            Showing all {total || productList.length} results
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
                title={product.name || product.title}
                image={product.images?.[0]?.url || product.img || product.image}
                product={product}
              />
            ))}
          </div>

          <div className="hidden lg:flex lg:flex-wrap lg:justify-center lg:gap-6">
            {productList.slice(0, perPageDesktop).map((product) => (
              <ProductCard
                key={product.id}
                title={product.name || product.title}
                image={product.images?.[0]?.url || product.img || product.image}
                product={product}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="flex justify-between items-center border-2 border-stone-400 rounded-md mx-16 lg:w-1/4 lg:mx-auto">
            <button
              onClick={handleFirstPage}
              disabled={isFirstDisabled}
              className={`p-6 font-medium transition ${
                isFirstDisabled
                  ? "bg-stone-200 text-stone-400 cursor-not-allowed"
                  : "text-sky-500 hover:bg-stone-200"
              }`}
            >
              First
            </button>

            {visiblePages.map((p) => (
              <button
                key={p}
                onClick={() => handlePageClick(p)}
                className={`flex w-full items-center justify-center border-l-2 py-6 px-4 transition ${
                  page === p
                    ? "bg-sky-500 text-white border-sky-500"
                    : "border-stone-300 text-sky-500 font-medium hover:bg-stone-100"
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={handleNextPage}
              disabled={isNextDisabled}
              className={`p-6 border-l-2 border-stone-300 font-medium transition ${
                isNextDisabled
                  ? "bg-stone-200 text-stone-400 cursor-not-allowed"
                  : "text-sky-500 hover:bg-stone-200"
              }`}
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