import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-poppins font-bold text-2xl mb-4">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F1dcadd5bc6674a76b9d63e0664ab6749%2Ff554a236ba3342c7b046332eeb73e417?format=webp&width=800&height=1200"
                alt="IFK Logo"
                className="w-10 h-10 object-contain"
              />
              <span>IFK</span>
            </div>
            <p className="text-white/80 text-sm">
              Sistem Manajemen Pertanian Terpadu untuk Ketapang
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-poppins font-bold mb-4">Produk</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-white/80 hover:text-accent transition-colors">
                  Alat Bertani
                </Link>
              </li>
              <li>
                <Link to="/" className="text-white/80 hover:text-accent transition-colors">
                  Inventaris
                </Link>
              </li>
              <li>
                <Link to="/" className="text-white/80 hover:text-accent transition-colors">
                  Analitik
                </Link>
              </li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h3 className="font-poppins font-bold mb-4">Pelajari</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-white/80 hover:text-accent transition-colors">
                  Kelas
                </Link>
              </li>
              <li>
                <Link to="/" className="text-white/80 hover:text-accent transition-colors">
                  Dokumentasi
                </Link>
              </li>
              <li>
                <Link to="/" className="text-white/80 hover:text-accent transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-poppins font-bold mb-4">Terhubung</h3>
            <div className="flex gap-4">
              <a href="#" className="text-white/80 hover:text-accent transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-accent transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="text-sm text-white/60">
              © {currentYear} Integrated Farming Ketapang. Semua hak dilindungi.
            </p>
            <div className="flex gap-6 md:justify-end text-sm">
              <Link to="/" className="text-white/60 hover:text-accent transition-colors">
                Kebijakan Privasi
              </Link>
              <Link to="/" className="text-white/60 hover:text-accent transition-colors">
                Syarat Layanan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
