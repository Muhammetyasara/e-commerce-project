import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { fetchProduct } from "../store/actions/thunkActions";

export default function ShopProductDetailPage() {
  const { productId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const { productDetail, fetchState } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (productId) {
      dispatch(fetchProduct(productId));
    }
  }, [dispatch, productId]);

  if (fetchState === "FETCHING") {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (!productDetail) {
    return <div className="text-center py-20">Product not found</div>;
  }

  return (
    <>
      <Header />

      <section className="p-12 flex flex-col gap-6 items-center">
        <button
          onClick={() => history.goBack()}
          className="text-blue-500 font-bold text-3xl"
        >
          ← Back
        </button>

        <img
          src={productDetail.images?.[0]?.url}
          alt={productDetail.name}
          className="w-[300px]"
        />

        <h1 className="text-2xl font-bold">
          {productDetail.name}
        </h1>

        <p>{productDetail.description}</p>

        <p className="font-bold text-xl">
          {productDetail.price} ₺
        </p>
      </section>

      <Footer />
    </>
  );
}
