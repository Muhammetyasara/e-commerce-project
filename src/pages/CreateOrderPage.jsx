import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../api/axios";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { ChevronLeft, ChevronRight, Plus, Pencil, Trash2, Check, CreditCard, PackageCheck } from "lucide-react";
import { fetchAddresses, addAddress, updateAddress, deleteAddress } from "../store/actions/addressThunks";
import { fetchCards, addCard, updateCard, deleteCard } from "../store/actions/cardThunks";
import { clearCart } from "../store/actions/shoppingCartActions";

const TURKISH_CITIES = [
  "Adana","Adıyaman","Afyonkarahisar","Ağrı","Amasya","Ankara","Antalya","Artvin",
  "Aydın","Balıkesir","Bilecik","Bingöl","Bitlis","Bolu","Burdur","Bursa","Çanakkale",
  "Çankırı","Çorum","Denizli","Diyarbakır","Edirne","Elazığ","Erzincan","Erzurum",
  "Eskişehir","Gaziantep","Giresun","Gümüşhane","Hakkari","Hatay","Isparta","Mersin",
  "İstanbul","İzmir","Kars","Kastamonu","Kayseri","Kırklareli","Kırşehir","Kocaeli",
  "Konya","Kütahya","Malatya","Manisa","Kahramanmaraş","Mardin","Muğla","Muş","Nevşehir",
  "Niğde","Ordu","Rize","Sakarya","Samsun","Siirt","Sinop","Sivas","Tekirdağ","Tokat",
  "Trabzon","Tunceli","Şanlıurfa","Uşak","Van","Yozgat","Zonguldak","Aksaray","Bayburt",
  "Karaman","Kırıkkale","Batman","Şırnak","Bartın","Ardahan","Iğdır","Yalova","Karabük",
  "Kilis","Osmaniye","Düzce",
];

const authHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: token } : {};
};

function AddressForm({ onSubmit, onCancel, defaultValues }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: defaultValues || {} });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-lg p-6 shadow-sm flex flex-col gap-4 border-2 border-orange-200"
    >
      <h3 className="font-bold text-lg">
        {defaultValues?.id ? "Adresi Düzenle" : "Yeni Adres Ekle"}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Adres Başlığı</label>
          <input
            {...register("title", { required: "Bu alan zorunludur" })}
            placeholder="Örn: Ev, İş"
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Ad</label>
          <input
            {...register("name", { required: "Bu alan zorunludur" })}
            placeholder="Adınız"
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Soyad</label>
          <input
            {...register("surname", { required: "Bu alan zorunludur" })}
            placeholder="Soyadınız"
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          {errors.surname && <span className="text-red-500 text-xs">{errors.surname.message}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Telefon</label>
          <input
            {...register("phone", {
              required: "Bu alan zorunludur",
              pattern: { value: /^(\+90|0)?5\d{9}$/, message: "Geçersiz telefon numarası" },
            })}
            placeholder="05xxxxxxxxx"
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">İl</label>
          <select
            {...register("city", { required: "Bu alan zorunludur" })}
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="">Şehir Seçiniz</option>
            {TURKISH_CITIES.map((city) => (
              <option key={city} value={city.toLowerCase()}>{city}</option>
            ))}
          </select>
          {errors.city && <span className="text-red-500 text-xs">{errors.city.message}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">İlçe</label>
          <input
            {...register("district", { required: "Bu alan zorunludur" })}
            placeholder="İlçe"
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          {errors.district && <span className="text-red-500 text-xs">{errors.district.message}</span>}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Mahalle / Adres Detayı</label>
        <textarea
          {...register("neighborhood", { required: "Bu alan zorunludur" })}
          placeholder="Mahalle, cadde, sokak, bina no, daire no..."
          rows={3}
          className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
        />
        {errors.neighborhood && <span className="text-red-500 text-xs">{errors.neighborhood.message}</span>}
      </div>
      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100 transition"
        >
          İptal
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition disabled:opacity-50"
        >
          {isSubmitting ? "Kaydediliyor..." : defaultValues?.id ? "Güncelle" : "Kaydet"}
        </button>
      </div>
    </form>
  );
}

function AddressCard({ address, selected, onSelect, onEdit, onDelete }) {
  return (
    <div
      onClick={onSelect}
      className={`relative bg-white rounded-lg p-4 shadow-sm border-2 cursor-pointer transition ${
        selected ? "border-orange-500" : "border-transparent hover:border-gray-300"
      }`}
    >
      {selected && (
        <div className="absolute top-3 right-3 bg-orange-500 rounded-full p-0.5">
          <Check size={14} className="text-white" />
        </div>
      )}
      <p className="font-bold text-sm mb-1">{address.title}</p>
      <p className="text-sm text-gray-700">{address.name} {address.surname}</p>
      <p className="text-sm text-gray-600">{address.phone}</p>
      <p className="text-sm text-gray-600 mt-1">{address.neighborhood}, {address.district}, {address.city}</p>
      <div className="flex gap-3 mt-3">
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(address); }}
          className="flex items-center gap-1 text-xs text-sky-500 hover:text-sky-700 font-medium transition"
        >
          <Pencil size={13} /> Düzenle
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(address.id); }}
          className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-medium transition"
        >
          <Trash2 size={13} /> Sil
        </button>
      </div>
    </div>
  );
}

function CardForm({ onSubmit, onCancel, defaultValues }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: defaultValues || {} });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-lg p-6 shadow-sm flex flex-col gap-4 border-2 border-orange-200"
    >
      <h3 className="font-bold text-lg">
        {defaultValues?.id ? "Kartı Düzenle" : "Yeni Kart Ekle"}
      </h3>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Kart Üzerindeki İsim</label>
        <input
          {...register("name_on_card", { required: "Bu alan zorunludur" })}
          placeholder="Ad Soyad"
          className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        {errors.name_on_card && <span className="text-red-500 text-xs">{errors.name_on_card.message}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Kart Numarası</label>
        <input
          {...register("card_no", {
            required: "Bu alan zorunludur",
            pattern: { value: /^\d{16}$/, message: "16 haneli kart numarası giriniz" },
          })}
          placeholder="1234123412341234"
          maxLength={16}
          className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        {errors.card_no && <span className="text-red-500 text-xs">{errors.card_no.message}</span>}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Son Kullanma Ayı</label>
          <select
            {...register("expire_month", { required: "Bu alan zorunludur", valueAsNumber: true })}
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="">Ay</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={m}>{String(m).padStart(2, "0")}</option>
            ))}
          </select>
          {errors.expire_month && <span className="text-red-500 text-xs">{errors.expire_month.message}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Son Kullanma Yılı</label>
          <select
            {...register("expire_year", { required: "Bu alan zorunludur", valueAsNumber: true })}
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="">Yıl</option>
            {Array.from({ length: 15 }, (_, i) => new Date().getFullYear() + i).map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          {errors.expire_year && <span className="text-red-500 text-xs">{errors.expire_year.message}</span>}
        </div>
      </div>
      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100 transition"
        >
          İptal
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition disabled:opacity-50"
        >
          {isSubmitting ? "Kaydediliyor..." : defaultValues?.id ? "Güncelle" : "Kaydet"}
        </button>
      </div>
    </form>
  );
}

function CreditCardItem({ card, selected, onSelect, onEdit, onDelete }) {
  const masked = "**** **** **** " + String(card.card_no).slice(-4);
  return (
    <div
      onClick={onSelect}
      className={`relative bg-white rounded-lg p-4 shadow-sm border-2 cursor-pointer transition ${
        selected ? "border-orange-500" : "border-transparent hover:border-gray-300"
      }`}
    >
      {selected && (
        <div className="absolute top-3 right-3 bg-orange-500 rounded-full p-0.5">
          <Check size={14} className="text-white" />
        </div>
      )}
      <div className="flex items-center gap-3 mb-2">
        <CreditCard size={20} className="text-gray-500" />
        <span className="font-bold text-sm">{masked}</span>
      </div>
      <p className="text-sm text-gray-700">{card.name_on_card}</p>
      <p className="text-xs text-gray-500 mt-1">
        {String(card.expire_month).padStart(2, "0")} / {card.expire_year}
      </p>
      <div className="flex gap-3 mt-3">
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(card); }}
          className="flex items-center gap-1 text-xs text-sky-500 hover:text-sky-700 font-medium transition"
        >
          <Pencil size={13} /> Düzenle
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(card.id); }}
          className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-medium transition"
        >
          <Trash2 size={13} /> Sil
        </button>
      </div>
    </div>
  );
}

export default function CreateOrderPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const addressList = useSelector((state) => state.client.addressList);
  const creditCards = useSelector((state) => state.client.creditCards);
  const cart = useSelector((state) => state.shoppingCart.cart);

  const [step, setStep] = useState(1);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState("");

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [selectedBilling, setSelectedBilling] = useState(null);
  const [sameAddress, setSameAddress] = useState(true);

  const [showCardForm, setShowCardForm] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [ccv, setCcv] = useState("");
  const [ccvError, setCcvError] = useState("");

  const checkedItems = cart.filter((item) => item.checked !== false);
  const totalAmount = checkedItems.reduce(
    (sum, item) => sum + (item.product?.price ?? 0) * item.count,
    0
  );
  const shippingPrice = 29.99;
  const grandTotal = totalAmount + shippingPrice;

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  useEffect(() => {
    if (step === 2) {
      dispatch(fetchCards());
    }
  }, [dispatch, step]);

  const handleAddressFormSubmit = async (data) => {
    if (editingAddress) {
      await dispatch(updateAddress({ ...data, id: editingAddress.id }));
    } else {
      await dispatch(addAddress(data));
    }
    setShowAddressForm(false);
    setEditingAddress(null);
  };

  const handleAddressEdit = (address) => {
    setEditingAddress(address);
    setShowAddressForm(true);
  };

  const handleAddressDelete = async (id) => {
    await dispatch(deleteAddress(id));
    if (selectedShipping === id) setSelectedShipping(null);
    if (selectedBilling === id) setSelectedBilling(null);
  };

  const handleAddressFormCancel = () => {
    setShowAddressForm(false);
    setEditingAddress(null);
  };

  const handleCardFormSubmit = async (data) => {
    const payload = {
      card_no: data.card_no,
      expire_month: Number(data.expire_month),
      expire_year: Number(data.expire_year),
      name_on_card: data.name_on_card,
    };
    if (editingCard) {
      await dispatch(updateCard({ ...payload, id: editingCard.id }));
    } else {
      await dispatch(addCard(payload));
    }
    setShowCardForm(false);
    setEditingCard(null);
  };

  const handleCardEdit = (card) => {
    setEditingCard(card);
    setShowCardForm(true);
  };

  const handleCardDelete = async (id) => {
    await dispatch(deleteCard(id));
    if (selectedCard === id) setSelectedCard(null);
  };

  const handleCardFormCancel = () => {
    setShowCardForm(false);
    setEditingCard(null);
  };

  const handleCompleteOrder = async () => {
    if (!ccv || !/^\d{3,4}$/.test(ccv)) {
      setCcvError("Geçerli bir CCV giriniz (3-4 haneli)");
      return;
    }
    setCcvError("");

    const card = creditCards.find((c) => c.id === selectedCard);
    const addressId = selectedShipping;

    const products = checkedItems.map((item) => ({
      product_id: item.product.id,
      count: item.count,
      detail: "",
    }));

    const payload = {
      address_id: addressId,
      order_date: new Date().toISOString().slice(0, 19),
      card_no: Number(card.card_no),
      card_name: card.name_on_card,
      card_expire_month: card.expire_month,
      card_expire_year: card.expire_year,
      card_ccv: Number(ccv),
      price: grandTotal,
      products,
    };

    try {
      setOrderLoading(true);
      setOrderError("");
      await api.post("/order", payload, { headers: authHeader() });
      dispatch(clearCart());
      setOrderSuccess(true);
    } catch (err) {
      setOrderError(err.response?.data?.message || "Sipariş oluşturulamadı. Lütfen tekrar deneyiniz.");
    } finally {
      setOrderLoading(false);
    }
  };

  const canProceedToPayment = selectedShipping && (sameAddress || selectedBilling);
  const canCompleteOrder = selectedCard;

  const OrderSummary = () => (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-bold mb-4">Sipariş Özeti</h2>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Ürünler Toplamı:</span>
          <span className="font-medium">{totalAmount.toFixed(2)} ₺</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Kargo Ücreti:</span>
          <span className="font-medium">{shippingPrice.toFixed(2)} ₺</span>
        </div>
        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between">
            <span className="font-bold">Genel Toplam:</span>
            <span className="font-bold text-lg text-orange-500">{grandTotal.toFixed(2)} ₺</span>
          </div>
        </div>
      </div>
    </div>
  );

  if (orderSuccess) {
    return (
      <section className="bg-stone-100 min-h-screen">
        <Header />
        <main className="p-4 md:p-8 lg:p-16">
          <div className="max-w-xl mx-auto flex flex-col items-center text-center gap-6 py-16">
            <div className="bg-green-100 rounded-full p-6">
              <PackageCheck size={64} className="text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Siparişiniz Alındı!</h1>
            <p className="text-gray-600 text-base">
              Siparişiniz başarıyla oluşturuldu. En kısa sürede hazırlanıp kargoya verilecektir.
              Alışverişiniz için teşekkür ederiz!
            </p>
            <div className="bg-white rounded-lg p-4 shadow-sm w-full text-left">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Sipariş Tutarı:</span>
                <span className="font-bold text-orange-500">{grandTotal.toFixed(2)} ₺</span>
              </div>
            </div>
            <button
              onClick={() => history.push("/")}
              className="bg-orange-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-600 transition"
            >
              Alışverişe Devam Et
            </button>
          </div>
        </main>
        <Footer />
      </section>
    );
  }

  return (
    <section className="bg-stone-100 min-h-screen">
      <Header />

      <main className="p-4 md:p-8 lg:p-16">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => (step === 1 ? history.goBack() : setStep(1))}
            className="flex items-center gap-1 text-3xl text-sky-500 mb-6 font-bold"
          >
            <ChevronLeft size={35} />
            Geri
          </button>

          <div className="flex items-center gap-4 mb-8">
            <div className={`flex items-center gap-2 font-bold text-sm ${step >= 1 ? "text-orange-500" : "text-gray-400"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${step >= 1 ? "bg-orange-500" : "bg-gray-300"}`}>
                1
              </div>
              Adres Bilgileri
            </div>
            <div className={`flex-1 h-1 rounded ${step >= 2 ? "bg-orange-500" : "bg-gray-300"}`} />
            <div className={`flex items-center gap-2 font-bold text-sm ${step >= 2 ? "text-orange-500" : "text-gray-400"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${step >= 2 ? "bg-orange-500" : "bg-gray-300"}`}>
                2
              </div>
              Ödeme Bilgileri
            </div>
          </div>

          {step === 1 && (
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Teslimat Adresi</h2>
                    {!showAddressForm && (
                      <button
                        onClick={() => { setEditingAddress(null); setShowAddressForm(true); }}
                        className="flex items-center gap-1 text-sm font-semibold text-orange-500 hover:text-orange-600 transition"
                      >
                        <Plus size={16} /> Adres Ekle
                      </button>
                    )}
                  </div>
                  {showAddressForm && (
                    <div className="mb-4">
                      <AddressForm
                        onSubmit={handleAddressFormSubmit}
                        onCancel={handleAddressFormCancel}
                        defaultValues={editingAddress}
                      />
                    </div>
                  )}
                  {addressList.length === 0 && !showAddressForm ? (
                    <p className="text-gray-500 text-sm bg-white rounded-lg p-6 text-center">
                      Kayıtlı adresiniz bulunmamaktadır. Yeni adres ekleyiniz.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {addressList.map((address) => (
                        <AddressCard
                          key={address.id}
                          address={address}
                          selected={selectedShipping === address.id}
                          onSelect={() => setSelectedShipping(address.id)}
                          onEdit={handleAddressEdit}
                          onDelete={handleAddressDelete}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-xl font-bold">Fatura Adresi</h2>
                    <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sameAddress}
                        onChange={(e) => setSameAddress(e.target.checked)}
                        className="cursor-pointer"
                      />
                      Teslimat adresiyle aynı
                    </label>
                  </div>
                  {!sameAddress && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {addressList.map((address) => (
                        <AddressCard
                          key={address.id}
                          address={address}
                          selected={selectedBilling === address.id}
                          onSelect={() => setSelectedBilling(address.id)}
                          onEdit={handleAddressEdit}
                          onDelete={handleAddressDelete}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:w-96 space-y-4">
                <OrderSummary />
                <button
                  onClick={() => canProceedToPayment && setStep(2)}
                  disabled={!canProceedToPayment}
                  className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-600"
                >
                  Ödeme Adımına Geç
                  <ChevronRight size={20} />
                </button>
                {!canProceedToPayment && (
                  <p className="text-xs text-center text-gray-500">
                    Devam etmek için teslimat adresi seçiniz.
                  </p>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Ödeme Yöntemi</h2>
                    {!showCardForm && (
                      <button
                        onClick={() => { setEditingCard(null); setShowCardForm(true); }}
                        className="flex items-center gap-1 text-sm font-semibold text-orange-500 hover:text-orange-600 transition"
                      >
                        <Plus size={16} /> Kart Ekle
                      </button>
                    )}
                  </div>
                  {showCardForm && (
                    <div className="mb-4">
                      <CardForm
                        onSubmit={handleCardFormSubmit}
                        onCancel={handleCardFormCancel}
                        defaultValues={editingCard}
                      />
                    </div>
                  )}
                  {creditCards.length === 0 && !showCardForm ? (
                    <p className="text-gray-500 text-sm bg-white rounded-lg p-6 text-center">
                      Kayıtlı kartınız bulunmamaktadır. Yeni kart ekleyiniz.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {creditCards.map((card) => (
                        <CreditCardItem
                          key={card.id}
                          card={card}
                          selected={selectedCard === card.id}
                          onSelect={() => setSelectedCard(card.id)}
                          onEdit={handleCardEdit}
                          onDelete={handleCardDelete}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {selectedCard && (
                  <div className="bg-white rounded-lg p-6 shadow-sm border-2 border-orange-200">
                    <h3 className="font-bold text-base mb-3">Güvenlik Kodu</h3>
                    <div className="flex flex-col gap-1 max-w-xs">
                      <label className="text-sm font-medium text-gray-700">CCV / CVV</label>
                      <input
                        type="password"
                        value={ccv}
                        onChange={(e) => { setCcv(e.target.value); setCcvError(""); }}
                        placeholder="***"
                        maxLength={4}
                        className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                      {ccvError && <span className="text-red-500 text-xs">{ccvError}</span>}
                    </div>
                  </div>
                )}
              </div>

              <div className="lg:w-96 space-y-4">
                <OrderSummary />
                {orderError && (
                  <p className="text-red-500 text-sm text-center bg-red-50 rounded-lg p-3 border border-red-200">
                    {orderError}
                  </p>
                )}
                <button
                  onClick={handleCompleteOrder}
                  disabled={!canCompleteOrder || orderLoading}
                  className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-600"
                >
                  {orderLoading ? "Sipariş Oluşturuluyor..." : "Siparişi Tamamla"}
                  {!orderLoading && <ChevronRight size={20} />}
                </button>
                {!canCompleteOrder && (
                  <p className="text-xs text-center text-gray-500">
                    Devam etmek için ödeme yöntemi seçiniz.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </section>
  );
}