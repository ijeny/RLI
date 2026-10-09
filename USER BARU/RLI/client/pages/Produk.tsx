import { useState } from "react";
import {
  Search,
  Filter,
  ShoppingCart,
  Star,
  Heart,
  Leaf,
  Sprout,
  Bug,
  Carrot,
  Wheat,
  Droplet,
  Recycle,
  CheckCircle,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: typeof Leaf;
  rating: number;
  reviews: number;
  stock: number;
  description: string;
}

export default function Produk() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);

  const categories = [
    {
      id: "all",
      name: "Semua Produk",
    },
    {
      id: "perkebunan",
      name: "Produk Perkebunan",
    },
    {
      id: "pupuk",
      name: "Pupuk Organik",
    },
    {
      id: "maggot",
      name: "Produk Maggot",
    },
    {
      id: "kasgot",
      name: "Produk Kasgot",
    },
    {
      id: "peternakan",
      name: "Produk Peternakan",
    },
  ];

  /*
   * ============================================================
   * DATA PRODUK
   * ============================================================
   *
   * Untuk sementara masih menggunakan data dummy/frontend.
   * Nanti ketika API sudah dibuat, bagian ini yang akan diganti
   * dengan data dari backend.
   */

  const products: Product[] = [
    {
      id: 1,
      name: "Sayuran Organik Segar",
      category: "perkebunan",
      price: 35000,
      image: Leaf,
      rating: 4.8,
      reviews: 245,
      stock: 150,
      description:
        "Sayuran segar organik yang dipanen langsung dari kebun Integrated Farming Ketapang.",
    },

    {
      id: 2,
      name: "Buah Segar Berkualitas",
      category: "perkebunan",
      price: 45000,
      image: Leaf,
      rating: 4.7,
      reviews: 156,
      stock: 100,
      description:
        "Buah-buahan segar pilihan yang diproduksi dan dipanen langsung dari perkebunan IFK.",
    },

    {
      id: 3,
      name: "Benih Sayuran Unggul",
      category: "perkebunan",
      price: 25000,
      image: Wheat,
      rating: 4.9,
      reviews: 267,
      stock: 300,
      description:
        "Benih varietas unggul yang cocok digunakan untuk budidaya pertanian berkelanjutan.",
    },

    {
      id: 4,
      name: "Minyak Kelapa Murni",
      category: "perkebunan",
      price: 65000,
      image: Droplet,
      rating: 4.8,
      reviews: 198,
      stock: 90,
      description:
        "Minyak kelapa murni berkualitas yang berasal dari hasil perkebunan IFK.",
    },

    {
      id: 5,
      name: "Pupuk Organik Premium",
      category: "pupuk",
      price: 85000,
      image: Sprout,
      rating: 4.9,
      reviews: 189,
      stock: 200,
      description:
        "Pupuk organik premium hasil pengolahan limbah organik untuk membantu meningkatkan kualitas tanah.",
    },

    {
      id: 6,
      name: "Produk Maggot BSF",
      category: "maggot",
      price: 120000,
      image: Bug,
      rating: 4.6,
      reviews: 98,
      stock: 50,
      description:
        "Maggot Black Soldier Fly berkualitas yang dapat digunakan sebagai pakan ternak dan ikan.",
    },

    {
      id: 7,
      name: "Kasgot Berkualitas Tinggi",
      category: "kasgot",
      price: 95000,
      image: Sprout,
      rating: 4.8,
      reviews: 122,
      stock: 80,
      description:
        "Kasgot hasil pengolahan limbah organik yang dapat dimanfaatkan sebagai media dan pupuk tanaman.",
    },

    {
      id: 8,
      name: "Pakan Ternak Organik",
      category: "peternakan",
      price: 75000,
      image: Carrot,
      rating: 4.7,
      reviews: 134,
      stock: 120,
      description:
        "Pakan ternak berkualitas yang dibuat menggunakan bahan-bahan organik pilihan.",
    },
  ];

  /*
   * ============================================================
   * FILTER PRODUK
   * ============================================================
   */

  const filteredProducts = products.filter((product) => {
    const matchCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    const matchSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    return matchCategory && matchSearch && matchPrice;
  });

  /*
   * ============================================================
   * RESET FILTER
   * ============================================================
   */

  const handleResetFilter = () => {
    setSelectedCategory("all");
    setSearchTerm("");
    setPriceRange([0, 500000]);
  };

  /*
   * ============================================================
   * PRODUCT CARD
   * ============================================================
   */

  const ProductCard = ({ product }: { product: Product }) => {
    const ProductIcon = product.image;

    return (
      <div
        className="
          card-hover
          glass-effect
          rounded-2xl
          overflow-hidden
          group
          h-full
          border
          border-transparent
          hover:border-primary/20
          transition-all
        "
      >
        <div className="p-6 flex flex-col h-full">
          {/* ==================================================
              PRODUCT IMAGE
          ================================================== */}

          <Link to={`/produk/${product.id}`} className="block">
            <div
              className="
                flex
                justify-center
                items-center
                mb-5
                h-40
                rounded-xl
                bg-primary/5
                group-hover:bg-primary/10
                transition-colors
              "
            >
              <ProductIcon
                className="
                  w-20
                  h-20
                  text-primary
                  group-hover:scale-110
                  transition-transform
                  duration-300
                "
              />
            </div>
          </Link>

          {/* ==================================================
              PRODUCT INFO
          ================================================== */}

          <Link to={`/produk/${product.id}`} className="block">
            <h3
              className="
                font-poppins
                font-bold
                text-foreground
                mb-2
                group-hover:text-primary
                transition-colors
                line-clamp-2
              "
            >
              {product.name}
            </h3>
          </Link>

          <p
            className="
              text-sm
              text-foreground/70
              mb-3
              line-clamp-2
            "
          >
            {product.description}
          </p>

          {/* ==================================================
              RATING
          ================================================== */}

          <div className="flex items-center gap-2 mb-4 text-sm">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`w-4 h-4 ${
                    index < Math.floor(product.rating)
                      ? "fill-yellow-500 text-yellow-500"
                      : "text-foreground/30"
                  }`}
                />
              ))}
            </div>

            <span className="text-foreground/70">
              {product.rating} ({product.reviews})
            </span>
          </div>

          {/* ==================================================
              PRICE & STOCK
          ================================================== */}

          <div className="mb-5">
            <p
              className="
                text-2xl
                font-poppins
                font-bold
                text-primary
                mb-1
              "
            >
              Rp {product.price.toLocaleString("id-ID")}
            </p>

            <p className="text-sm text-foreground/70">
              Stock: {product.stock} unit
            </p>
          </div>

          {/* ==================================================
              ACTION BUTTON
          ================================================== */}

          <div className="flex gap-2 mt-auto">
            {/* Beli → Product Detail */}

            <Link
              to={`/produk/${product.id}`}
              className="
                flex-1
                btn-primary
                text-sm
                py-2.5
                flex
                items-center
                justify-center
                gap-2
                rounded-lg
              "
            >
              <ShoppingCart className="w-4 h-4" />
              Beli
            </Link>

            {/* Favorite */}

            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();

                console.log("Tambah favorit:", product.name);
              }}
              className="
                p-3
                hover:bg-primary/10
                rounded-lg
                transition-colors
                border
                border-transparent
                hover:border-primary/20
              "
              aria-label={`Tambahkan ${product.name} ke favorit`}
            >
              <Heart className="w-5 h-5 text-primary" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  /*
   * ============================================================
   * RETURN
   * ============================================================
   */

  return (
    <div className="w-full min-h-screen">
      <Navbar />

      {/* ========================================================
          HERO SECTION
      ======================================================== */}

      <section
        className="
          relative
          py-20
          bg-gradient-to-br
          from-white
          via-cyan-50
          to-teal-50
          border-b
        "
      >
        <div
          className="
            absolute
            top-0
            right-0
            w-96
            h-96
            bg-primary/20
            rounded-full
            blur-3xl
            -z-10
          "
        />

        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
          "
        >
          <div className="text-center mb-12">
            <h1
              className="
                text-5xl
                md:text-6xl
                font-poppins
                font-bold
                text-secondary
                mb-4
              "
            >
              Produk IFK
            </h1>

            <p
              className="
                text-xl
                text-foreground/70
                max-w-2xl
                mx-auto
              "
            >
              Produk berkualitas dari Integrated Farming Ketapang. Semua produk
              diproduksi langsung oleh IFK dengan standar keberlanjutan tinggi.
            </p>
          </div>

          {/* ====================================================
              SEARCH
          ==================================================== */}

          <div
            className="
              glass-effect
              rounded-2xl
              p-4
              flex
              items-center
              gap-3
            "
          >
            <Search className="w-5 h-5 text-foreground/60" />

            <input
              type="text"
              placeholder="Cari produk..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="
                flex-1
                bg-transparent
                outline-none
                text-foreground
                placeholder-foreground/50
              "
            />

            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="
                  p-1
                  rounded-full
                  hover:bg-primary/10
                "
                aria-label="Hapus pencarian"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================
          MAIN CONTENT
      ======================================================== */}

      <section className="py-12 bg-white">
        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
          "
        >
          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-4
              gap-8
            "
          >
            {/* ==================================================
                SIDEBAR
            ================================================== */}

            <aside className="lg:col-span-1">
              <div
                className="
                  glass-effect
                  rounded-2xl
                  p-6
                  sticky
                  top-24
                "
              >
                {/* Filter Header */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    mb-6
                  "
                >
                  <h3
                    className="
                      font-poppins
                      font-bold
                      text-secondary
                      flex
                      items-center
                      gap-2
                    "
                  >
                    <Filter className="w-5 h-5" />
                    Filter
                  </h3>
                </div>

                {/* =================================================
                    CATEGORY
                ================================================= */}

                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-4">
                    Kategori
                  </h4>

                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => setSelectedCategory(category.id)}
                        className={`
                          w-full
                          text-left
                          px-4
                          py-2.5
                          rounded-lg
                          transition-colors
                          ${
                            selectedCategory === category.id
                              ? "bg-primary text-white"
                              : "hover:bg-primary/10 text-foreground"
                          }
                        `}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* =================================================
                    PRICE RANGE
                ================================================= */}

                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-4">Harga</h4>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-foreground/60">
                        Harga Minimum
                      </label>

                      <input
                        type="range"
                        min="0"
                        max="500000"
                        step="10000"
                        value={priceRange[0]}
                        onChange={(event) => {
                          const value = Number(event.target.value);

                          setPriceRange([
                            Math.min(value, priceRange[1]),
                            priceRange[1],
                          ]);
                        }}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-foreground/60">
                        Harga Maksimum
                      </label>

                      <input
                        type="range"
                        min="0"
                        max="500000"
                        step="10000"
                        value={priceRange[1]}
                        onChange={(event) => {
                          const value = Number(event.target.value);

                          setPriceRange([
                            priceRange[0],
                            Math.max(value, priceRange[0]),
                          ]);
                        }}
                        className="w-full"
                      />
                    </div>

                    <div
                      className="
                        bg-primary/5
                        rounded-lg
                        p-3
                        text-sm
                        text-center
                      "
                    >
                      Rp {priceRange[0].toLocaleString("id-ID")} - Rp{" "}
                      {priceRange[1].toLocaleString("id-ID")}
                    </div>
                  </div>
                </div>

                {/* =================================================
                    RESET
                ================================================= */}

                <button
                  type="button"
                  onClick={handleResetFilter}
                  className="
                    w-full
                    btn-outline
                    text-sm
                    py-2.5
                    rounded-lg
                  "
                >
                  Reset Filter
                </button>
              </div>
            </aside>

            {/* ==================================================
                PRODUCTS
            ================================================== */}

            <main className="lg:col-span-3">
              {/* Result Info */}

              <div
                className="
                  flex
                  flex-col
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                  gap-3
                  mb-6
                "
              >
                <p className="text-foreground/70">
                  Menampilkan{" "}
                  <span className="font-semibold text-foreground">
                    {filteredProducts.length}
                  </span>{" "}
                  dari{" "}
                  <span className="font-semibold text-foreground">
                    {products.length}
                  </span>{" "}
                  produk
                </p>

                {selectedCategory !== "all" && (
                  <span
                    className="
                      inline-flex
                      items-center
                      gap-2
                      bg-primary/10
                      text-primary
                      px-3
                      py-1.5
                      rounded-full
                      text-sm
                      font-semibold
                    "
                  >
                    {
                      categories.find(
                        (category) => category.id === selectedCategory,
                      )?.name
                    }

                    <button
                      type="button"
                      onClick={() => setSelectedCategory("all")}
                      className="hover:bg-primary/20 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>

              {/* ==================================================
                  PRODUCT GRID
              ================================================== */}

              {filteredProducts.length > 0 ? (
                <div
                  className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    lg:grid-cols-3
                    gap-6
                  "
                >
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                /* =================================================
                   EMPTY STATE
                ================================================= */

                <div
                  className="
                    glass-effect
                    rounded-2xl
                    p-12
                    text-center
                  "
                >
                  <div
                    className="
                      w-20
                      h-20
                      mx-auto
                      mb-5
                      rounded-full
                      bg-primary/10
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Search className="w-10 h-10 text-primary" />
                  </div>

                  <h3
                    className="
                      text-xl
                      font-bold
                      text-secondary
                      mb-2
                    "
                  >
                    Produk Tidak Ditemukan
                  </h3>

                  <p
                    className="
                      text-foreground/70
                      max-w-md
                      mx-auto
                      mb-6
                    "
                  >
                    Tidak ada produk yang sesuai dengan pencarian atau filter
                    yang kamu pilih.
                  </p>

                  <button
                    type="button"
                    onClick={handleResetFilter}
                    className="
                      btn-primary
                      px-6
                      py-2.5
                      rounded-lg
                    "
                  >
                    Reset Filter
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* ========================================================
          INFO SECTION
      ======================================================== */}

      <section
        className="
          py-16
          bg-gradient-to-br
          from-white
          to-gray-soft
          border-t
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
          "
        >
          <h2
            className="
              text-3xl
              md:text-4xl
              font-poppins
              font-bold
              text-secondary
              mb-8
              text-center
            "
          >
            Kenapa Memilih Produk IFK?
          </h2>

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-3
              gap-8
            "
          >
            {[
              {
                icon: CheckCircle,
                title: "100% IFK Asli",
                description:
                  "Semua produk diproduksi langsung oleh Integrated Farming Ketapang.",
              },

              {
                icon: Sprout,
                title: "Berkualitas",
                description:
                  "Produk berkualitas dengan proses produksi yang memperhatikan keberlanjutan.",
              },

              {
                icon: Recycle,
                title: "Ekonomi Sirkular",
                description:
                  "Mendukung ekonomi sirkular dan praktik pertanian yang berkelanjutan.",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="
                    glass-effect
                    rounded-2xl
                    p-8
                    text-center
                  "
                >
                  <div className="flex justify-center mb-4">
                    <Icon
                      className="
                        w-12
                        h-12
                        text-primary
                      "
                    />
                  </div>

                  <h3
                    className="
                      font-poppins
                      font-bold
                      text-secondary
                      mb-3
                    "
                  >
                    {item.title}
                  </h3>

                  <p className="text-foreground/70">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
