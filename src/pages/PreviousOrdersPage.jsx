import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { ChevronLeft, ChevronDown, ChevronUp, PackageCheck } from "lucide-react";
import api from "../api/axios";

const authHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: token } : {};
};

const getProductImage = (detail) => {
  if (!detail) return "";
  if (detail.images && detail.images.length > 0) return detail.images[0].url || detail.images[0];
  if (detail.image) return detail.image;
  if (detail.img) return detail.img;
  return "";
};

const getProductName = (detail, fallbackId) => {
  if (!detail) return `Ürün #${fallbackId}`;
  return detail.name || detail.title || detail.product_name || `Ürün #${fallbackId}`;
};

const getProductPrice = (detail) => {
  if (!detail) return 0;
  return detail.price || detail.unit_price || detail.sell_price || 0;
};

const getProductDescription = (detail) => {
  if (!detail) return "";
  return detail.description || detail.detail || "";
};

export default function PreviousOrdersPage() {
  const history = useHistory();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openOrderId, setOpenOrderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("/order", { headers: authHeader() });
        const rawOrders = Array.isArray(response.data) ? response.data : [];

        let addressMap = {};
        try {
          const addressRes = await api.get("/user/address", { headers: authHeader() });
          const addressList = Array.isArray(addressRes.data) ? addressRes.data : [];
          addressList.forEach((a) => { addressMap[a.id] = a; });
        } catch {}

        const ordersEnriched = await Promise.all(
          rawOrders.map(async (order) => {
            const products = Array.isArray(order.products) ? order.products : [];

            const enrichedProducts = await Promise.all(
              products.map(async (item) => {
                const productId =
                  item.product_id ??
                  item.productId ??
                  item.product?.id ??
                  item.id;

                if (!productId) return { ...item, productDetail: null };

                try {
                  const res = await api.get(`/products/${productId}`, { headers: authHeader() });
                  const data = res.data;
                  const detail = data?.product || data;
                  return { ...item, productDetail: detail };
                } catch {
                  return { ...item, productDetail: null };
                }
              })
            );

            const addressId = order.address_id ?? order.addressId ?? order.address?.id;
            const addressDetail = addressMap[addressId] || order.address || null;

            return { ...order, products: enrichedProducts, addressDetail };
          })
        );

        setOrders(ordersEnriched);
      } catch (err) {
        setError("Siparişler yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const toggleOrder = (id) => {
    setOpenOrderId((prev) => (prev === id ? null : id));
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section className="bg-stone-100 min-h-screen">
      <Header />

      <main className="p-4 md:p-8 lg:p-16">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => history.goBack()}
            className="flex items-center gap-1 text-3xl text-sky-500 mb-6 font-bold"
          >
            <ChevronLeft size={35} />
            Geri
          </button>

          <h1 className="text-2xl font-bold mb-6">Önceki Siparişlerim</h1>

          {loading && (
            <div className="text-center py-16 text-gray-500">Siparişler yükleniyor...</div>
          )}

          {error && (
            <div className="text-center py-16 text-red-500 bg-red-50 rounded-lg border border-red-200 p-6">
              {error}
            </div>
          )}

          {!loading && !error && orders.length === 0 && (
            <div className="flex flex-col items-center gap-4 py-16 bg-white rounded-lg shadow-sm">
              <PackageCheck size={48} className="text-gray-300" />
              <p className="text-gray-500 text-lg">Henüz siparişiniz bulunmamaktadır.</p>
              <button
                onClick={() => history.push("/")}
                className="bg-orange-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-orange-600 transition"
              >
                Alışverişe Başla
              </button>
            </div>
          )}

          {!loading && !error && orders.length > 0 && (
            <div className="space-y-4">
              {orders.map((order) => {
                const isOpen = openOrderId === order.id;
                const addr = order.addressDetail;

                return (
                  <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <button
                      onClick={() => toggleOrder(order.id)}
                      className="w-full flex items-center justify-between p-5 hover:bg-stone-50 transition text-left"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                        <span className="text-xs text-gray-400 font-medium">
                          Sipariş No: <span className="text-gray-700 font-bold">#{order.id}</span>
                        </span>
                        <span className="text-xs text-gray-500">{formatDate(order.order_date)}</span>
                        <span className="text-sm font-bold text-orange-500">
                          {Number(order.price).toFixed(2)} ₺
                        </span>
                        {order.status && (
                          <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">
                            {order.status}
                          </span>
                        )}
                      </div>
                      {isOpen ? (
                        <ChevronUp size={20} className="text-gray-400 flex-shrink-0" />
                      ) : (
                        <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="border-t px-5 pb-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 text-sm text-gray-600 border-b mb-4">
                          <div className="bg-stone-50 rounded-lg p-4">
                            <p className="font-semibold text-gray-800 mb-2">Kart Bilgisi</p>
                            <p className="font-mono tracking-widest text-gray-700">
                              **** **** **** {String(order.card_no).slice(-4)}
                            </p>
                            <p className="mt-1">{order.card_name}</p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              Son Kullanma: {String(order.card_expire_month).padStart(2, "0")} / {order.card_expire_year}
                            </p>
                          </div>

                          <div className="bg-stone-50 rounded-lg p-4">
                            <p className="font-semibold text-gray-800 mb-2">Teslimat Adresi</p>
                            {addr ? (
                              <>
                                {addr.title && (
                                  <p className="text-xs text-orange-500 font-semibold mb-1 uppercase">{addr.title}</p>
                                )}
                                <p className="font-medium text-gray-800">{addr.name} {addr.surname}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{addr.phone}</p>
                                <p className="mt-1">{addr.neighborhood}</p>
                                <p>{addr.district} / {addr.city}</p>
                              </>
                            ) : (
                              <p className="text-gray-400">Adres bilgisi bulunamadı.</p>
                            )}
                          </div>
                        </div>

                        <p className="font-semibold text-gray-800 mb-3 text-sm">Sipariş Edilen Ürünler</p>
                        <div className="overflow-x-auto rounded-lg border">
                          <table className="w-full text-sm border-collapse">
                            <thead>
                              <tr className="bg-stone-100">
                                <th className="text-left p-3 font-semibold text-gray-700">Ürün</th>
                                <th className="text-center p-3 font-semibold text-gray-700">Adet</th>
                                <th className="text-right p-3 font-semibold text-gray-700">Birim Fiyat</th>
                                <th className="text-right p-3 font-semibold text-gray-700">Toplam</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.products && order.products.length > 0 ? (
                                order.products.map((item, index) => {
                                  const detail = item.productDetail;
                                  const imgUrl = getProductImage(detail);
                                  const name = getProductName(detail, item.product_id ?? index + 1);
                                  const price = getProductPrice(detail);
                                  const description = getProductDescription(detail);
                                  const count = item.count ?? 1;

                                  return (
                                    <tr key={index} className="border-t hover:bg-stone-50 transition">
                                      <td className="p-3">
                                        <div className="flex items-center gap-3">
                                          {imgUrl ? (
                                            <img
                                              src={imgUrl}
                                              alt={name}
                                              className="w-14 h-14 object-cover rounded flex-shrink-0"
                                            />
                                          ) : (
                                            <div className="w-14 h-14 bg-gray-200 rounded flex-shrink-0" />
                                          )}
                                          <div>
                                            <p className="font-medium text-gray-800">{name}</p>
                                            {description ? (
                                              <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                                                {description}
                                              </p>
                                            ) : null}
                                          </div>
                                        </div>
                                      </td>
                                      <td className="p-3 text-center text-gray-600">{count}</td>
                                      <td className="p-3 text-right text-gray-600">
                                        {price ? `${Number(price).toFixed(2)} ₺` : "-"}
                                      </td>
                                      <td className="p-3 text-right font-semibold text-gray-800">
                                        {price ? `${(Number(price) * count).toFixed(2)} ₺` : "-"}
                                      </td>
                                    </tr>
                                  );
                                })
                              ) : (
                                <tr>
                                  <td colSpan={4} className="p-4 text-center text-gray-400">
                                    Ürün bilgisi bulunamadı.
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>

                        <div className="flex justify-end mt-4 pt-3 border-t">
                          <div className="text-sm">
                            <span className="text-gray-600">Toplam Tutar: </span>
                            <span className="font-bold text-lg text-orange-500">
                              {Number(order.price).toFixed(2)} ₺
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </section>
  );
}