import { useState } from "react";
import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  Star,
  Plus,
  Minus,
  CheckCircle,
  Truck,
  ShieldCheck,
  Leaf,
  Package,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* =========================================================
   PRODUCT DATA
   ========================================================= */

const products = [
  {
    id: 1,
    name: "Sayuran Organik Segar",
    category: "perkebunan",
    categoryName: "Produk Perkebunan",
    price: 35000,
    image: Leaf,
    rating: 4.8,
    reviews: 245,
    stock: 150,
    unit: "kg",
    description:
      "Sayuran organik segar yang diproduksi langsung dari kebun Integrated Farming Ketapang dengan proses budidaya yang ramah lingkungan dan berkelanjutan.",
    longDescription:
      "Sayuran organik IFK dipanen secara berkala untuk menjaga kualitas dan kesegarannya. Produk ini dibudidayakan tanpa penggunaan bahan kimia berbahaya serta menggunakan sistem pertanian yang mendukung keberlanjutan lingkungan.",
    features: [
      "Diproduksi langsung oleh IFK",
      "Budidaya ramah lingkungan",
      "Dipanen secara berkala",
      "Segar dan berkualitas",
    ],
  },

  {
    id: 2,
    name: "Pupuk Organik Premium",
    category: "pupuk",
    categoryName: "Pupuk Organik",
    price: 85000,
    image: Package,
    rating: 4.9,
    reviews: 189,
    stock: 200,
    unit: "kg",
    description:
      "Pupuk organik premium hasil pengolahan bahan organik untuk membantu meningkatkan kualitas dan kesuburan tanah.",
    longDescription:
      "Pupuk organik IFK dihasilkan melalui proses pengolahan bahan organik yang terkontrol. Cocok digunakan untuk berbagai kebutuhan pertanian dan perkebunan.",
    features: [
      "Berbahan dasar organik",
      "Membantu meningkatkan kesuburan tanah",
      "Cocok untuk pertanian",
      "Ramah lingkungan",
    ],
  },

  {
    id: 3,
    name: "Buah Segar Berkualitas",
    category: "perkebunan",
    categoryName: "Produk Perkebunan",
    price: 45000,
    image: Leaf,
    rating: 4.7,
    reviews: 156,
    stock: 100,
    unit: "kg",
    description:
      "Buah segar pilihan yang berasal dari hasil perkebunan IFK dengan kualitas dan kesegaran yang terjaga.",
    longDescription:
      "Buah segar IFK dipilih dari hasil perkebunan yang dikelola dengan memperhatikan kualitas produk dan keberlanjutan lingkungan.",
    features: [
      "Buah segar pilihan",
      "Berasal dari perkebunan IFK",
      "Kualitas terjaga",
      "Ramah lingkungan",
    ],
  },

  {
    id: 4,
    name: "Produk Maggot BSF",
    category: "maggot",
    categoryName: "Produk Maggot",
    price: 120000,
    image: Package,
    rating: 4.6,
    reviews: 98,
    stock: 50,
    unit: "kg",
    description:
      "Maggot Black Soldier Fly yang dapat digunakan sebagai alternatif pakan ternak dengan kandungan nutrisi yang baik.",
    longDescription:
      "Produk maggot BSF IFK merupakan bagian dari sistem ekonomi sirkular yang memanfaatkan limbah organik sebagai media budidaya.",
    features: [
      "Maggot Black Soldier Fly",
      "Alternatif pakan ternak",
      "Mendukung ekonomi sirkular",
      "Memanfaatkan limbah organik",
    ],
  },

  {
    id: 5,
    name: "Kasgot Berkualitas Tinggi",
    category: "kasgot",
    categoryName: "Produk Kasgot",
    price: 95000,
    image: SproutIcon,
    rating: 4.8,
    reviews: 122,
    stock: 80,
    unit: "kg",
    description:
      "Kasgot hasil pengolahan organik yang dapat dimanfaatkan sebagai media dan nutrisi tambahan untuk tanaman.",
    longDescription:
      "Kasgot merupakan hasil dari proses pengolahan sisa budidaya maggot. Produk ini dapat digunakan kembali untuk mendukung kegiatan pertanian.",
    features: [
      "Hasil pengolahan organik",
      "Dapat digunakan untuk tanaman",
      "Mendukung pertanian berkelanjutan",
      "Bagian dari ekonomi sirkular",
    ],
  },

  {
    id: 6,
    name: "Pakan Ternak Organik",
    category: "peternakan",
    categoryName: "Produk Peternakan",
    price: 75000,
    image: Package,
    rating: 4.7,
    reviews: 134,
    stock: 120,
    unit: "kg",
    description:
      "Pakan ternak berkualitas yang diproduksi dengan memanfaatkan bahan organik pilihan.",
    longDescription:
      "Pakan ternak IFK merupakan salah satu produk yang mendukung sistem pertanian terintegrasi dan pemanfaatan sumber daya secara berkelanjutan.",
    features: [
      "Bahan organik pilihan",
      "Kualitas terjaga",
      "Cocok untuk kebutuhan peternakan",
      "Mendukung sistem pertanian terintegrasi",
    ],
  },

  {
    id: 7,
    name: "Benih Sayuran Unggul",
    category: "perkebunan",
    categoryName: "Produk Perkebunan",
    price: 25000,
    image: Leaf,
    rating: 4.9,
    reviews: 267,
    stock: 300,
    unit: "pack",
    description:
      "Benih sayuran pilihan untuk membantu menghasilkan tanaman yang sehat dan berkualitas.",
    longDescription:
      "Benih sayuran IFK dipilih untuk mendukung kebutuhan budidaya tanaman dan pertanian berkelanjutan.",
    features: [
      "Benih pilihan",
      "Cocok untuk budidaya",
      "Mendukung pertanian berkelanjutan",
      "Praktis digunakan",
    ],
  },

  {
    id: 8,
    name: "Minyak Kelapa Murni",
    category: "perkebunan",
    categoryName: "Produk Perkebunan",
    price: 65000,
    image: Leaf,
    rating: 4.8,
    reviews: 198,
    stock: 90,
    unit: "botol",
    description:
      "Minyak kelapa murni yang dihasilkan dari bahan kelapa berkualitas dari perkebunan IFK.",
    longDescription:
      "Minyak kelapa murni IFK diproduksi dari kelapa pilihan melalui proses pengolahan yang menjaga kualitas produk.",
    features: [
      "Menggunakan kelapa pilihan",
      "Berasal dari perkebunan IFK",
      "Kualitas terjaga",
      "Diproses secara higienis",
    ],
  },
];

/* =========================================================
   HELPER ICON
   ========================================================= */

function SproutIcon({ className }: { className?: string }) {
  return <Leaf className={className} />;
}

/* =========================================================
   PRODUCT DETAIL
   ========================================================= */

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const productId = Number(id);

  const product = products.find((item) => item.id === productId);

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  /* =======================================================
     PRODUCT NOT FOUND
     ======================================================= */

  if (!product) {
    return (
      <div className="min-h-screen w-full">
        <Navbar />

        <section className="min-h-[70vh] flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-primary" />
            </div>

            <h1 className="text-3xl font-poppins font-bold text-secondary mb-3">
              Produk Tidak Ditemukan
            </h1>

            <p className="text-foreground/70 mb-8">
              Produk yang Anda cari tidak tersedia atau mungkin sudah dihapus.
            </p>

            <Link
              to="/produk"
              className="inline-flex items-center gap-2 btn-primary px-6 py-3 rounded-xl"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Produk
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  /* =======================================================
     PRODUCT ICON
     ======================================================= */

  const ProductIcon = product.image;

  /* =======================================================
     QUANTITY
     ======================================================= */

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  /* =======================================================
     TOTAL PRICE
     ======================================================= */

  const totalPrice = product.price * quantity;

  /* =======================================================
     ADD TO CART
     ======================================================= */

  const handleAddToCart = () => {
    setAddedToCart(true);

    /*
      FRONTEND ONLY

      Nanti bagian ini bisa diganti dengan:
      - Context Cart
      - Zustand
      - Redux
      - API backend

      Untuk sekarang hanya simulasi.
    */

    setTimeout(() => {
      setAddedToCart(false);
    }, 2500);
  };

  /* =======================================================
     BUY NOW
     ======================================================= */

  const handleBuyNow = () => {
    /*
      Untuk sementara diarahkan ke halaman checkout
      dengan query parameter.

      Nanti ketika backend/API sudah dibuat,
      data produk + quantity akan dikirim ke server.
    */

    navigate(`/checkout?product=${product.id}&quantity=${quantity}`);
  };

  /* =======================================================
     RELATED PRODUCTS
     ======================================================= */

  const relatedProducts = products
    .filter(
      (item) => item.category === product.category && item.id !== product.id,
    )
    .slice(0, 3);

  /* =======================================================
     RETURN
     ======================================================= */

  return (
    <div className="w-full min-h-screen">
      <Navbar />

      {/* =====================================================
          SUCCESS CART MESSAGE
      ===================================================== */}

      {addedToCart && (
        <div className="fixed top-24 right-5 z-50">
          <div className="bg-white shadow-xl border border-primary/20 rounded-xl px-5 py-4 flex items-center gap-3 animate-fade-in">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-primary" />
            </div>

            <div>
              <p className="font-semibold text-foreground">
                Berhasil ditambahkan
              </p>

              <p className="text-sm text-foreground/60">{product.name}</p>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          BREADCRUMB
      ===================================================== */}

      <section className="bg-gradient-to-br from-white via-cyan-50 to-teal-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-2 text-sm text-foreground/60">
            <Link to="/produk" className="hover:text-primary transition-colors">
              Produk
            </Link>

            <span>/</span>

            <span className="text-foreground">{product.categoryName}</span>

            <span>/</span>

            <span className="text-primary font-medium">{product.name}</span>
          </div>
        </div>
      </section>

      {/* =====================================================
          PRODUCT DETAIL
      ===================================================== */}

      <main className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* BACK BUTTON */}

          <Link
            to="/produk"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-secondary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Produk
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* =================================================
                LEFT - PRODUCT IMAGE
            ================================================= */}

            <div>
              <div className="glass-effect rounded-3xl min-h-[450px] flex items-center justify-center bg-gradient-to-br from-primary/5 to-teal-50 relative overflow-hidden">
                {/* Decorative circles */}

                <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-teal-200/20 rounded-full blur-3xl" />

                <div className="relative z-10 w-56 h-56 rounded-full bg-white/80 shadow-xl flex items-center justify-center">
                  <ProductIcon className="w-32 h-32 text-primary" />
                </div>

                {/* Stock Badge */}

                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 rounded-full bg-primary text-white text-sm font-semibold">
                    Produk IFK
                  </span>
                </div>

                {/* Favorite */}

                <button
                  type="button"
                  onClick={() => setIsFavorite((prev) => !prev)}
                  className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-primary/10 transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isFavorite ? "fill-red-500 text-red-500" : "text-primary"
                    }`}
                  />
                </button>
              </div>

              {/* Small info */}

              <div className="grid grid-cols-3 gap-4 mt-5">
                <div className="glass-effect rounded-xl p-4 text-center">
                  <Leaf className="w-6 h-6 text-primary mx-auto mb-2" />

                  <p className="text-xs text-foreground/60">Produk</p>

                  <p className="font-semibold text-sm">IFK Asli</p>
                </div>

                <div className="glass-effect rounded-xl p-4 text-center">
                  <ShieldCheck className="w-6 h-6 text-primary mx-auto mb-2" />

                  <p className="text-xs text-foreground/60">Kualitas</p>

                  <p className="font-semibold text-sm">Terjamin</p>
                </div>

                <div className="glass-effect rounded-xl p-4 text-center">
                  <Truck className="w-6 h-6 text-primary mx-auto mb-2" />

                  <p className="text-xs text-foreground/60">Pengiriman</p>

                  <p className="font-semibold text-sm">Tersedia</p>
                </div>
              </div>
            </div>

            {/* =================================================
                RIGHT - PRODUCT INFO
            ================================================= */}

            <div>
              {/* Category */}

              <p className="text-primary font-semibold mb-3">
                {product.categoryName}
              </p>

              {/* Product Name */}

              <h1 className="text-4xl md:text-5xl font-poppins font-bold text-secondary leading-tight mb-5">
                {product.name}
              </h1>

              {/* Rating */}

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`w-5 h-5 ${
                        index < Math.floor(product.rating)
                          ? "fill-yellow-500 text-yellow-500"
                          : "text-foreground/20"
                      }`}
                    />
                  ))}
                </div>

                <span className="font-semibold text-foreground">
                  {product.rating}
                </span>

                <span className="text-foreground/50">
                  ({product.reviews} ulasan)
                </span>
              </div>

              {/* Price */}

              <div className="border-y border-gray-200 py-6 mb-6">
                <p className="text-sm text-foreground/60 mb-1">Harga</p>

                <p className="text-4xl font-poppins font-bold text-primary">
                  Rp {product.price.toLocaleString("id-ID")}
                </p>

                <p className="text-sm text-foreground/60 mt-1">
                  per {product.unit}
                </p>
              </div>

              {/* Description */}

              <div className="mb-7">
                <h2 className="font-poppins font-bold text-xl text-secondary mb-3">
                  Tentang Produk
                </h2>

                <p className="text-foreground/70 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Stock */}

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Package className="w-5 h-5 text-primary" />
                </div>

                <div>
                  <p className="text-xs text-foreground/60">Ketersediaan</p>

                  <p className="font-semibold text-foreground">
                    {product.stock} {product.unit} tersedia
                  </p>
                </div>
              </div>

              {/* Quantity */}

              <div className="mb-6">
                <p className="font-semibold text-foreground mb-3">Jumlah</p>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                    <button
                      type="button"
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                      className="w-12 h-12 flex items-center justify-center hover:bg-primary/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>

                    <div className="w-14 text-center font-bold">{quantity}</div>

                    <button
                      type="button"
                      onClick={increaseQuantity}
                      disabled={quantity >= product.stock}
                      className="w-12 h-12 flex items-center justify-center hover:bg-primary/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-sm text-foreground/60">
                    Maksimal {product.stock} {product.unit}
                  </p>
                </div>
              </div>

              {/* Total */}

              <div className="bg-primary/5 rounded-xl p-5 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-foreground/70">Total</span>

                  <span className="text-2xl font-bold text-primary">
                    Rp {totalPrice.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              {/* Actions */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="border-2 border-primary text-primary rounded-xl py-4 font-bold flex items-center justify-center gap-2 hover:bg-primary/10 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Tambah ke Keranjang
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="btn-primary rounded-xl py-4 font-bold flex items-center justify-center gap-2"
                >
                  Beli Sekarang
                  <ArrowLeft className="w-5 h-5 rotate-180" />
                </button>
              </div>

              {/* Security */}

              <div className="mt-6 flex items-start gap-3 text-sm text-foreground/60">
                <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />

                <p>
                  Transaksi aman dan data pengguna akan dijaga. Sistem
                  pembayaran dapat diintegrasikan dengan payment gateway ketika
                  backend/API sudah tersedia.
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              PRODUCT DESCRIPTION
          ================================================= */}

          <section className="mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Description */}

              <div className="lg:col-span-2 glass-effect rounded-2xl p-8">
                <h2 className="text-2xl font-poppins font-bold text-secondary mb-5">
                  Deskripsi Produk
                </h2>

                <p className="text-foreground/70 leading-relaxed mb-6">
                  {product.longDescription}
                </p>

                <h3 className="font-bold text-lg text-secondary mb-4">
                  Keunggulan Produk
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <CheckCircle className="w-4 h-4 text-primary" />
                      </div>

                      <span className="text-sm text-foreground/70">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping */}

              <div className="glass-effect rounded-2xl p-8">
                <h2 className="text-xl font-poppins font-bold text-secondary mb-6">
                  Informasi Pembelian
                </h2>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Truck className="w-5 h-5 text-primary" />
                    </div>

                    <div>
                      <h3 className="font-semibold mb-1">Pengiriman</h3>

                      <p className="text-sm text-foreground/60">
                        Produk dapat dikirim sesuai ketersediaan dan wilayah
                        pengiriman.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Package className="w-5 h-5 text-primary" />
                    </div>

                    <div>
                      <h3 className="font-semibold mb-1">Kondisi Produk</h3>

                      <p className="text-sm text-foreground/60">
                        Produk dikemas sebelum dikirim untuk menjaga kualitas.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5 text-primary" />
                    </div>

                    <div>
                      <h3 className="font-semibold mb-1">Keamanan</h3>

                      <p className="text-sm text-foreground/60">
                        Informasi transaksi akan diproses secara aman.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              RELATED PRODUCTS
          ================================================= */}

          {relatedProducts.length > 0 && (
            <section className="mt-20">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-primary font-semibold mb-1">
                    Produk Lainnya
                  </p>

                  <h2 className="text-3xl font-poppins font-bold text-secondary">
                    Produk Terkait
                  </h2>
                </div>

                <Link
                  to="/produk"
                  className="text-primary font-semibold hover:text-secondary transition-colors"
                >
                  Lihat Semua
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProducts.map((relatedProduct) => {
                  const RelatedIcon = relatedProduct.image;

                  return (
                    <Link
                      key={relatedProduct.id}
                      to={`/produk/${relatedProduct.id}`}
                      className="glass-effect rounded-2xl p-6 card-hover group"
                    >
                      <div className="w-24 h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                        <RelatedIcon className="w-12 h-12 text-primary" />
                      </div>

                      <p className="text-xs text-primary font-semibold mb-2">
                        {relatedProduct.categoryName}
                      </p>

                      <h3 className="font-poppins font-bold text-lg text-foreground group-hover:text-primary transition-colors mb-2">
                        {relatedProduct.name}
                      </h3>

                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />

                          <span className="text-sm font-semibold">
                            {relatedProduct.rating}
                          </span>
                        </div>

                        <span className="text-xs text-foreground/50">
                          ({relatedProduct.reviews})
                        </span>
                      </div>

                      <p className="text-xl font-bold text-primary">
                        Rp {relatedProduct.price.toLocaleString("id-ID")}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
