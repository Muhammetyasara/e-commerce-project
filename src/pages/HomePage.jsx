import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogCard from "../components/BlogCard";
import Carousel from "../components/Carousel";
import CategoryChip from "../components/CategoryChip";
import Container from "../components/Container";
import ProductCard from "../components/ProductCard";
import blogCards from "../data/blogCards";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { fetchCategories, fetchProducts } from "../store/actions/thunkActions";

export default function HomePage() {
  const dispatch = useDispatch();
  const { categories, productList, fetchState } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts({ limit: 8 }));
  }, [dispatch]);

  return (
    <>
      <Header />
      <section className="pt-12 bg-stone-100">
        <div className="flex flex-col items-center gap-4 mb-8">
          <h2 className="font-bold">EDITOR'S PICK</h2>
          <p className="w-1/2 text-center text-slate-600 text-sm">
            Problems trying to resolve the conflict between
          </p>
        </div>
        
        {fetchState === 'FETCHING' && (
          <div className="text-center py-8">Loading categories...</div>
        )}

        <div className="lg:hidden">
          {categories.slice(0, 4).map((category, index) => {
            const sizeClass = index === 0 || index === 1 ? "" : "h-48 object-cover";
            return (
              <CategoryChip
                key={category.id}
                title={category.title}
                image={category.img}
                imgClassName={sizeClass}
                btnClassName="bg-white w-40 h-10 py-2 flex justify-center text-black text-md font-bold tracking-wide"
              />
            );
          })}
        </div>

        <div className="hidden lg:flex lg:px-48 justify-center">
          {categories.length > 0 && (
            <>
              <CategoryChip
                key={categories[0]?.id}
                title={categories[0]?.title}
                image={categories[0]?.img}
                imgClassName={"w-[510px] h-[500px] object-cover"}
                btnClassName="bg-white w-40 h-10 py-2 flex justify-center text-black text-md font-bold tracking-wide"
              />

              <CategoryChip
                key={categories[1]?.id}
                title={categories[1]?.title}
                image={categories[1]?.img}
                imgClassName={"w-[240px] h-[500px] object-cover"}
                btnClassName="bg-white w-40 h-10 py-2 flex justify-center text-black text-md font-bold tracking-wide"
              />

              <div className="flex flex-col justify-around h-[500px]">
                <CategoryChip
                  key={categories[2]?.id}
                  title={categories[2]?.title}
                  image={categories[2]?.img}
                  imgClassName={"w-[240px] h-[238px] object-cover"}
                  btnClassName="bg-white w-40 h-10 py-2 flex justify-center text-black text-md font-bold tracking-wide"
                />
                <CategoryChip
                  key={categories[3]?.id}
                  title={categories[3]?.title}
                  image={categories[3]?.img}
                  imgClassName={"w-[240px] h-[238px] object-cover"}
                  btnClassName="bg-white w-40 h-10 py-2 flex justify-center text-black text-md font-bold tracking-wide"
                />
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col items-center gap-2 justify-center text-center pt-20 lg:text-center lg:items-center lg:justify-center lg:pt-16">
          <p className="text-stone-600 font-medium text-lg">Featured Products</p>
          <h2 className="flex flex-wrap w-1/3 text-center font-bold text-xl lg:w-full lg:justify-center">
            BESTSELLER PRODUCTS
          </h2>
          <p className="flex flex-wrap w-2/3 text-center text-stone-600 font-medium text-sm lg:w-full lg:justify-center">
            Problems trying to resolve the conflict between
          </p>
        </div>

        {fetchState === 'FETCHING' && (
          <div className="text-center py-8">Loading products...</div>
        )}

        <div className="pb-12 lg:flex lg:flex-wrap lg:items-center lg:justify-center lg:gap-4 lg:p-16 lg:self-center">
          {productList.map((product) => {
            return (
              <ProductCard
                key={product.id}
                title={product.name}
                image={product.images?.[0]?.url || product.img}
                product={product}
              />
            );
          })}
        </div>

        <Carousel />
        <Container />
        <div className="bg-white pt-20">
          <div className="flex flex-col items-center gap-4 justify-center text-center">
            <p className="text-blue-400 text-xs font-bold">Practice Advice</p>
            <h2 className="flex flex-wrap w-1/3 text-center font-bold text-3xl lg:justify-center">
              Featured Products
            </h2>
            <p className="flex flex-wrap w-2/3 text-center text-stone-600 font-medium text-sm lg:justify-center">
              Problems trying to resolve the conflict between the two major{" "}
            </p>
          </div>
          <div className="lg:flex lg:p-24 lg:justify-center lg:gap-2">
            {blogCards.map((card) => {
              return (
                <BlogCard key={card.id} title={card.title} image={card.image} />
              );
            })}
          </div>
        </div>
      </section>
      <Footer variant="home" />
    </>
  );
}