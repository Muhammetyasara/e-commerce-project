import { useDispatch, useSelector } from "react-redux";
import {
  toggleCartItem,
  increaseCartItem,
  decreaseCartItem,
  removeCartItem,
} from "../store/actions/shoppingCartActions";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { useHistory } from "react-router-dom";
import { ChevronLeft, Trash2, Check, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function ShoppingCartPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const cart = useSelector((state) => state.shoppingCart.cart);
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [discountCode, setDiscountCode] = useState("");

  const totalAmount = cart
    .filter((item) => item.checked !== false)
    .reduce((sum, item) => {
      const price = item.product?.price ?? 0;
      return sum + price * item.count;
    }, 0);

  const totalItemsSelected = cart.filter(
    (item) => item.checked !== false,
  ).length;

  const shippingPrice = 29.99;
  const discount = 0;
  const grandTotal = totalAmount + shippingPrice - discount;

  const handleToggle = (productId) => {
    dispatch(toggleCartItem(productId));
  };

  const handleIncrease = (productId) => {
    dispatch(increaseCartItem(productId));
  };

  const handleDecrease = (productId) => {
    dispatch(decreaseCartItem(productId));
  };

  const handleRemove = (productId) => {
    dispatch(removeCartItem(productId));
  };

  const handleCreateOrder = () => {
    console.log("Sipariş oluşturuluyor...");
  };

  return (
    <section className="bg-stone-100 min-h-screen">
      <Header />

      <main className="p-4 md:p-8 lg:p-16">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => history.goBack()}
            className="flex items-center gap-1 text-3xl text-sky-500 mb-6 font-bold"
          >
            <ChevronLeft size={35} />
            Geri
          </button>

          <h1 className="text-2xl font-bold mb-6">Sepetim ({cart.length} Ürün)</h1>
          <div className="border rounded-lg bg-slate-200 p-4 mb-4 font-bold flex gap-3">
            <Check size={24} className="absolute bg-green-500 rounded-full text-white p-1"/>
            <p className="pl-8">Sepetindeki Ürünleri Bireysel Veya Kurumsal Fatura Seçerek Alabilirsin</p>
          </div>

          {cart.length === 0 ? (
            <p className="text-center text-gray-600">Sepetin boş</p>
          ) : (
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <div className="hidden lg:block overflow-x-auto w-full">
                  <table className="w-full table-auto border-collapse">
                    <thead>
                      <tr className="bg-white">
                        <th className="p-3 border-b text-left text-sm">Seç</th>
                        <th className="p-3 border-b text-left text-sm">Ürün</th>
                        <th className="p-3 border-b text-left text-sm">
                          Birim Fiyat
                        </th>
                        <th className="p-3 border-b text-left text-sm">Adet</th>
                        <th className="p-3 border-b text-left text-sm">
                          Ara Toplam
                        </th>
                        <th className="p-3 border-b text-left text-sm">Sil</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => {
                        const prod = item.product || {};
                        const price = prod.price ?? 0;
                        const lineTotal = price * item.count;

                        const imgUrl =
                          prod.images?.[0]?.url || prod.img || prod.image || "";

                        return (
                          <tr key={prod.id} className="bg-white hover:bg-stone-50">
                            <td className="p-3 border-b">
                              <input
                                type="checkbox"
                                checked={item.checked !== false}
                                onChange={() => handleToggle(prod.id)}
                                className="cursor-pointer"
                              />
                            </td>

                            <td className="p-3  flex items-center gap-3 max-w-sm">
                              {imgUrl ? (
                                <img
                                  src={imgUrl}
                                  alt={prod.name || prod.title}
                                  className="w-14 h-14 object-cover rounded"
                                />
                              ) : (
                                <div className="w-14 h-14 bg-gray-200 rounded" />
                              )}
                              <div className="flex flex-col">
                                <span className="text-sm font-medium">
                                  {prod.name || prod.title}
                                </span>
                              </div>
                            </td>
                            <hr />
                            <td className="p-3 border-b text-sm font-medium">
                              {price} ₺
                            </td>

                            <td className="p-3 border-b text-sm">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleDecrease(prod.id)}
                                  className="px-2 py-1 border rounded text-sm hover:bg-gray-100 transition"
                                >
                                  -
                                </button>
                                <span>{item.count}</span>
                                <button
                                  onClick={() => handleIncrease(prod.id)}
                                  className="px-2 py-1 border rounded text-sm hover:bg-gray-100 transition"
                                >
                                  +
                                </button>
                              </div>
                            </td>

                            <td className="p-3 border-b text-sm font-medium">
                              {lineTotal} ₺
                            </td>

                            <td className="p-3 border-b text-sm">
                              <button
                                onClick={() => handleRemove(prod.id)}
                                className="text-red-500 hover:text-red-700 transition text-sm"
                              >
                                <Trash2 className="text-black" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="lg:hidden w-full space-y-4">
                  {cart.map((item) => {
                    const prod = item.product || {};
                    const price = prod.price ?? 0;
                    const lineTotal = price * item.count;
                    const imgUrl =
                      prod.images?.[0]?.url || prod.img || prod.image || "";

                    return (
                      <div
                        key={prod.id}
                        className="bg-white rounded-lg p-4 shadow-sm"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <input
                            type="checkbox"
                            checked={item.checked !== false}
                            onChange={() => handleToggle(prod.id)}
                            className="cursor-pointer w-5 h-5"
                          />
                          <button
                            onClick={() => handleRemove(prod.id)}
                            className="text-red-500 hover:text-red-700 transition text-sm font-medium"
                          >
                            <Trash2 className="text-black" />
                          </button>
                        </div>

                        <div className="flex gap-4 mb-4">
                          {imgUrl ? (
                            <img
                              src={imgUrl}
                              alt={prod.name || prod.title}
                              className="w-20 h-20 object-cover rounded flex-shrink-0"
                            />
                          ) : (
                            <div className="w-20 h-20 bg-gray-200 rounded flex-shrink-0" />
                          )}
                          <div className="flex flex-col justify-center">
                            <span className="text-sm font-medium">
                              {prod.name || prod.title}
                            </span>
                            <span className="text-sm text-gray-600 mt-1">
                              {price} ₺
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleDecrease(prod.id)}
                              className="px-3 py-1.5 border rounded text-sm hover:bg-gray-100 transition"
                            >
                              -
                            </button>
                            <span className="font-medium">{item.count}</span>
                            <button
                              onClick={() => handleIncrease(prod.id)}
                              className="px-3 py-1.5 border rounded text-sm hover:bg-gray-100 transition"
                            >
                              +
                            </button>
                          </div>

                          <div className="text-sm font-semibold">
                            {lineTotal} ₺
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="lg:hidden mt-6 bg-white p-4 rounded border">
                  <div className="text-sm">
                    <span className="font-semibold">
                      Seçili ürünler: {totalItemsSelected}
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:w-96 space-y-4">
                <div className="bg-white rounded-lg p-6 shadow-sm lg:top-4">
                  <h2 className="text-lg font-bold mb-4">Sipariş Özeti</h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Ürünler Toplamı:</span>
                      <span className="font-medium">{totalAmount.toFixed(2)} ₺</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Kargo Ücreti:</span>
                      <span className="font-medium">{shippingPrice.toFixed(2)} ₺</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">İndirim:</span>
                        <span className="font-medium text-green-600">
                          -{discount.toFixed(2)} ₺
                        </span>
                      </div>
                    )}

                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between">
                        <span className="font-bold">Genel Toplam:</span>
                        <span className="font-bold text-lg text-orange-500">
                          {grandTotal.toFixed(2)} ₺
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <button
                    onClick={() => setShowDiscountInput(!showDiscountInput)}
                    className="w-full text-left font-semibold text-sm text-orange-500 transition flex justify-center"
                  >
                    + İNDİRİM KODU GİR
                  </button>
                  
                  {showDiscountInput && (
                    <div className="mt-3">
                      <input
                        type="text"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        placeholder="İndirim kodunu girin"
                        className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                      <button className="w-full mt-2 bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 rounded-lg text-sm transition">
                        Uygula
                      </button>
                    </div>
                  )}
                </div>

                <button className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2">
                  Sepeti Onayla
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </section>
  );
}