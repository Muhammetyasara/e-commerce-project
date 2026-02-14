import { useDispatch } from "react-redux";
import { addToCart } from "../store/actions/shoppingCartActions";
import { useHistory } from "react-router-dom";

export default function ProductCard({
  title,
  image,
  product,
  gender,
  categoryName,
  categoryId,
}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const productSlug = (product.name || product.title)
    .toLowerCase()
    .replace(/ı/g, "i")
    .replace(/ş/g, "s")
    .replace(/ç/g, "c")
    .replace(/ö/g, "o")
    .replace(/ü/g, "u")
    .replace(/ğ/g, "g")
    .replace(/\s+/g, "-");

  const categorySlug = categoryName
    ?.toLowerCase()
    .replace(/ı/g, "i")
    .replace(/ş/g, "s")
    .replace(/ç/g, "c")
    .replace(/ö/g, "o")
    .replace(/ü/g, "u")
    .replace(/ğ/g, "g")
    .replace(/\s+/g, "-");

  const genderText = gender === "k" ? "kadin" : "erkek";

  const handleNavigate = () => {
    if (!product?.id || !gender || !categoryName || !categoryId) return;

    history.push(
      `/shop/${genderText}/${categorySlug}/${categoryId}/${productSlug}/${product.id}`,
    );
  };

  return (
    <section
      onClick={handleNavigate}
      className="m-10 flex flex-col items-center gap-4 lg:m-0 lg:w-1/5 lg:flex cursor-pointer hover:scale-105 transition"
    >
      <img
        src={image}
        alt={title}
        className="lg:w-[239px] lg:h-[427px] lg:object-cover"
      />
      <p className="font-bold">Graphic Design</p>
      <p className="text-stone-700 font-semibold">English Department</p>
      <div className="flex gap-2">
        <span className="text-green-700 font-semibold">
          ₺{Number(product.price).toFixed(2)}
        </span>
      </div>

      <div className="flex gap-1 lg:pb-4">
        <span className="w-4 h-4 rounded-full bg-blue-600"></span>
        <span className="w-4 h-4 rounded-full bg-green-600"></span>
        <span className="w-4 h-4 rounded-full bg-orange-600"></span>
        <span className="w-4 h-4 rounded-full bg-black"></span>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleAddToCart();
        }}
        className="bg-sky-500 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-sky-600 transition"
      >
        Add to Cart
      </button>
    </section>
  );
}
