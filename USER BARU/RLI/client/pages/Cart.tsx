import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  seller: string;
}

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Sayuran Organik Premium",
      price: 45000,
      quantity: 2,
      image: "🥬",
      seller: "Petani Hijau",
    },
    {
      id: 4,
      name: "Buah Mangga Manis",
      price: 55000,
      quantity: 1,
      image: "🥭",
      seller: "Kebun Segar",
    },
  ]);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 10000;
  const discount = 5000;
  const total = subtotal + shipping - discount;

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity > 0) {
      setItems(
        items.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="text-center space-y-8">
            <div className="text-6xl">🛒</div>
            <h1 className="text-3xl font-poppins font-bold text-foreground">
              Keranjang Anda Kosong
            </h1>
            <p className="text-foreground/70 max-w-md mx-auto">
              Belum ada produk di keranjang. Mari mulai berbelanja produk pertanian berkualitas!
            </p>
            <Link to="/marketplace" className="btn-primary inline-flex items-center gap-2">
              Belanja Sekarang
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <h1 className="text-4xl font-poppins font-bold text-foreground mb-8">
          Keranjang Belanja
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="glass-effect rounded-lg p-6 flex gap-6 items-center"
              >
                {/* Image */}
                <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center text-5xl flex-shrink-0">
                  {item.image}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-foreground/60 mb-2">{item.seller}</p>
                  <p className="text-lg font-bold text-primary">
                    Rp {item.price.toLocaleString("id-ID")}
                  </p>
                </div>

                {/* Quantity Control */}
                <div className="flex items-center border-2 border-primary rounded-lg">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 hover:bg-primary/10 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 hover:bg-primary/10 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Total */}
                <div className="text-right min-w-max">
                  <p className="text-sm text-foreground/60 mb-1">Subtotal</p>
                  <p className="text-lg font-bold text-primary">
                    Rp{" "}
                    {(item.price * item.quantity).toLocaleString("id-ID")}
                  </p>
                </div>

                {/* Delete */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="glass-effect rounded-lg p-6 h-fit space-y-6">
            <h2 className="text-xl font-poppins font-bold text-foreground">
              Ringkasan Pesanan
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-foreground/70">Subtotal</span>
                <span className="font-semibold text-foreground">
                  Rp {subtotal.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/70">Pengiriman</span>
                <span className="font-semibold text-foreground">
                  Rp {shipping.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex justify-between text-accent">
                <span>Diskon</span>
                <span className="font-semibold">
                  -Rp {discount.toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            <hr />

            <div className="flex justify-between items-center">
              <span className="font-semibold text-foreground">Total</span>
              <span className="text-2xl font-bold text-primary">
                Rp {total.toLocaleString("id-ID")}
              </span>
            </div>

            {/* Voucher Input */}
            <div>
              <label className="text-sm font-semibold text-foreground block mb-2">
                Kode Voucher
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Masukkan kode voucher"
                  className="flex-1 px-3 py-2 border-2 border-gray-soft rounded-lg focus:border-primary focus:outline-none"
                />
                <button className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-secondary transition-colors">
                  Terapkan
                </button>
              </div>
            </div>

            <Link
              to="/checkout"
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold text-center hover:bg-secondary transition-colors flex items-center justify-center gap-2"
            >
              Lanjut ke Checkout
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/marketplace"
              className="w-full border-2 border-primary text-primary py-2 rounded-lg font-semibold text-center hover:bg-primary/10 transition-colors"
            >
              Lanjut Belanja
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
