import { useLocation, Link } from "react-router-dom";
import { RightOutlined, EnvironmentOutlined } from "@ant-design/icons";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Placeholder() {
  const location = useLocation();
  const pageName = location.pathname.slice(1).replace(/\//g, " / ").replace(/-/g, " ");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-1 flex items-center justify-center py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-accent/20 px-4 py-2 rounded-full text-accent font-semibold text-sm">
              <EnvironmentOutlined />
              Segera Hadir
            </div>
            <h1 className="text-4xl font-poppins font-bold text-secondary capitalize">
              {pageName}
            </h1>
          </div>

          <div className="glass-effect rounded-2xl p-12 max-w-md mx-auto">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-6"></div>
            <p className="text-foreground/70 mb-6">
              Halaman ini sedang dikembangkan dengan fokus pada pertanian modern.
            </p>
            <p className="text-sm text-foreground/50">
              Ingin membantu kami membangun fitur ini? Mari kita terus membangun bersama!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/" className="btn-primary inline-flex items-center justify-center gap-2">
              Kembali ke Beranda
              <RightOutlined />
            </Link>
            <button className="btn-outline inline-flex items-center justify-center gap-2">
              Minta Fitur
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
