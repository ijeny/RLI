import { Bell } from "lucide-react";

interface NavbarProps {
  activeMenu: string;
}

const titles: Record<string, string> = {
  dashboard: 'Dashboard',
  'manajemen-user': 'Manajemen User',
  'data-user': 'Data User',
  'bank-sampah': 'Bank Sampah',
  'data-nasabah': 'Data Nasabah',
  'setoran-masuk': 'Setoran Masuk',
  'draft-setoran': 'Draft Setoran',
  'pengelolaan-sampah': 'Pengelolaan Sampah',
  'pengelolaan-pupuk': 'Pengelolaan Pupuk',
  'penarikan-uang': 'Penarikan Uang',
  'riwayat-penarikan': 'Riwayat Penarikan',
  'produk-edu': 'Produk & Edu Store',
  'pengelolaan-produk': 'Pengelolaan Produk',
  'tambah-produk': 'Tambah Produk',
  'pelatihan': 'Pelatihan',
  'riwayat-pelatihan': 'Riwayat Pelatihan',
  'manajemen-ifk': 'Manajemen IFK',
  'kurikulum-hijau': 'Kurikulum Hijau',
  laporan: 'Laporan',
};

export function Navbar({ activeMenu }: NavbarProps) {
  return (
    <div className="bg-card border-b border-border">
      <div className="px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl text-card-foreground">{titles[activeMenu] ?? 'Dashboard'}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Sistem Pengelolaan Sampah & Budidaya Maggot
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
