import { Link } from "react-router-dom";
import { Home, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-1 flex items-center justify-center py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-4">
            <div className="flex justify-center">
              <AlertCircle className="w-24 h-24 text-accent opacity-50" />
            </div>
            <h1 className="text-6xl font-poppins font-bold text-secondary">404</h1>
            <h2 className="text-3xl font-poppins font-bold text-foreground">Halaman Tidak Ditemukan</h2>
          </div>

          <p className="text-xl text-foreground/70 max-w-md mx-auto">
            Halaman yang Anda cari tidak ada atau masih dalam pengembangan.
            Mari kita bawa Anda kembali ke dasbor pertanian Anda!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/" className="btn-primary inline-flex items-center justify-center gap-2">
              <Home className="w-4 h-4" />
              Kembali ke Beranda
            </Link>
            <button className="btn-outline inline-flex items-center justify-center gap-2">
              Hubungi Dukungan
            </button>
          </div>

          <div className="mt-12 pt-8 border-t">
            <p className="text-sm text-foreground/50 mb-4">
              🌱 Ingin membantu kami berkembang? Halaman ini sedang dalam pengembangan.
            </p>
            <p className="text-foreground/70 font-medium">
              Fitur lebih banyak segera hadir!
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
