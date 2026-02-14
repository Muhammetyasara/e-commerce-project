import { ChevronRight, LayoutGrid, ListChecks } from "lucide-react";
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
  const { categoryId } = useParams();

  const { categories, productList, total, limit, offset, fetchState } =
    useSelector((state) => state.product);

  const [page, setPage] = useState(1);
  const [visiblePages, setVisiblePages] = useState([1, 2, 3]);
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("");

  const perPageDesktop = 25;
  const totalPages = Math.ceil((total || 0) / perPageDesktop);

  const sortedCategories = [...categories].sort(
    (a, b) => (b.rating || 0) - (a.rating || 0),
  );
  const top5Categories = sortedCategories.slice(0, 5);

  const selectedCategory = categoryId
    ? categories.find((cat) => cat.id === parseInt(categoryId))
    : null;

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
      offset: newOffset,
    };

    if (categoryId) params.category = categoryId;
    if (filter) params.filter = filter;
    if (sort) params.sort = sort;

    dispatch(fetchProducts(params));
  }, [dispatch, page, categoryId, filter, sort]);

  const handlePageClick = (pageNum) => {
    setPage(pageNum);

    if (pageNum === visiblePages[2] && pageNum < totalPages) {
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
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);

      if (nextPage > visiblePages[2]) {
        setVisiblePages([visiblePages[1], visiblePages[2], nextPage]);
      }
    }
  };

  const handleCategoryClick = (category) => {
    const genderText = category.gender === "k" ? "kadin" : "erkek";
    const catName = category.title.toLowerCase().replace(/\s+/g, "-");
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
                <h2 className="font-medium text-stone-600">
                  {selectedCategory.title}
                </h2>
              </>
            )}
          </div>
        </div>

        {fetchState === "FETCHING" && (
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
            Showing all {total || 0} results
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
            <input
              value={filter}
              onChange={(e) => {
                setPage(1);
                setFilter(e.target.value);
              }}
              className="border rounded-md px-4"
            />

            <select
              value={sort}
              onChange={(e) => {
                setPage(1);
                setSort(e.target.value);
              }}
              className="border rounded-md px-4"
            >
              <option value="">Sort</option>
              <option value="price:asc">price:asc</option>
              <option value="price:desc">price:desc</option>
              <option value="rating:asc">rating:asc</option>
              <option value="rating:desc">rating:desc</option>
            </select>

            <button className="text-white font-semibold bg-sky-500 py-4 px-8 rounded-md">
              Filter
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 px-4 lg:flex lg:flex-wrap lg:justify-center lg:gap-6 lg:px-0">
          {productList.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              gender={selectedCategory?.gender}
              image={product.images?.[0]?.url || product.img || product.image}
              categoryName={selectedCategory?.title}
              categoryId={selectedCategory?.id}
            />
          ))}
        </div>

        <div className="flex items-center justify-center">
          <div className="flex justify-between items-center border-2 border-stone-400 rounded-md mx-16 lg:w-1/4 lg:mx-auto">
            <button
              onClick={handleFirstPage}
              disabled={page === 1}
              className={`p-6 font-medium ${
                page === 1
                  ? "bg-stone-200 text-stone-400 cursor-not-allowed"
                  : "text-sky-500"
              }`}
            >
              First
            </button>

            {visiblePages.map((p) => (
              <button
                key={p}
                onClick={() => handlePageClick(p)}
                className={`flex w-full items-center justify-center border-l-2 py-6 px-4 ${
                  page === p
                    ? "bg-sky-500 text-white border-sky-500"
                    : "border-stone-300 text-sky-500"
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className={`p-6 border-l-2 border-stone-300 font-medium ${
                page === totalPages
                  ? "bg-stone-200 text-stone-400 cursor-not-allowed"
                  : "text-sky-500"
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
