import axios from "axios";
import { useEffect } from "react";
import { useState } from 'react';
import { Sidebar } from './components/sidebar';
import { Navbar } from './components/navbar';
import { StatCard } from './components/stat-card';
import { CustomerTable } from './components/customer-table';
import { ProductCard, mockProducts } from './components/product-card';
import { WasteChart, WasteCategoryChart } from './components/waste-chart';
import { YearlyWasteChart } from './components/yearly-waste-chart';
import { WasteManagementChart } from './components/waste-management-chart';
import { Users, Trash2, Leaf, Droplets, Wallet, GraduationCap, Search, ChevronDown, BookOpen, BookMarked, Video, Plus, Eye, Download, Pencil, Trash } from 'lucide-react';

interface SetoranData {
  id: number;
  nasabah: string;
  tanggal: string;
  jenisSampah: string;
  berat: number;
  macamSampah: string;
  status: 'pending' | 'approved';
  waktu: string;
}

type User = {
  id_user: number;
  name: string;
  email: string;
  role: string;
  status: string;
};

export default function App() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [metodePenarikan, setMetodePenarikan] = useState('cash');
  const [nomorIdentitas, setNomorIdentitas] = useState('');
  const [namaPengambil, setNamaPengambil] = useState('');
  const [hubunganPengambilan, setHubunganPengambil] = useState('');
  const [nomorHPPengambil, setNomorHPPengambil] = useState('');
  const [fotoPengambil, setFotoPengambil] = useState<File | null>(null);
  const [previewFotoPengambil, setPreviewFotoPengambil] = useState('');
  // UI state
  const [showTambahUser, setShowTambahUser] = useState(false);
  const [showTambahNasabah, setShowTambahNasabah] = useState(false);
  const [detilSetoran, setDetilSetoran] = useState<SetoranData | null>(null);
  const [showInputSetoran, setShowInputSetoran] = useState(false);
  const [penarikanSuccess, setPenarikanSuccess] = useState(false);
  const [jenisIdentitas, setJenisIdentitas] = useState("KTP");
  const [fotoIdentitas, setFotoIdentitas] = useState<File | null>(null);
  const [saldo, setSaldo] = useState(15750000);

  // Nasabah
  const [nasabahList, setNasabahList] = useState([
    { id: 1, nama: 'Budi Santoso', alamat: 'Jl. Mawar No. 12, Jakarta', noHp: '081234567890', totalSampah: '125 kg', saldo: 'Rp 625,000' },
    { id: 2, nama: 'Siti Nurhaliza', alamat: 'Jl. Melati No. 5, Bekasi', noHp: '081234567891', totalSampah: '98 kg', saldo: 'Rp 490,000' },
    { id: 3, nama: 'Ahmad Fauzi', alamat: 'Jl. Kenanga No. 8, Depok', noHp: '081234567892', totalSampah: '210 kg', saldo: 'Rp 1,050,000' },
    { id: 4, nama: 'Dewi Lestari', alamat: 'Jl. Anggrek No. 3, Tangerang', noHp: '081234567893', totalSampah: '75 kg', saldo: 'Rp 375,000' },
    { id: 5, nama: 'Rudi Hartono', alamat: 'Jl. Dahlia No. 17, Bogor', noHp: '081234567894', totalSampah: '180 kg', saldo: 'Rp 900,000' },
    { id: 6, nama: 'Rina Wulandari', alamat: 'Jl. Flamboyan No. 22, Bekasi', noHp: '081234567895', totalSampah: '143 kg', saldo: 'Rp 715,000' },
    { id: 7, nama: 'Hendra Gunawan', alamat: 'Jl. Cempaka No. 9, Jakarta', noHp: '081234567896', totalSampah: '67 kg', saldo: 'Rp 335,000' },
    { id: 8, nama: 'Yanti Kusuma', alamat: 'Jl. Teratai No. 4, Depok', noHp: '081234567897', totalSampah: '230 kg', saldo: 'Rp 1,150,000' },
  ]);
  const [nasabahSearch, setNasabahSearch] = useState('');
  const [nasabahPage, setNasabahPage] = useState(1);
  const [nasabahPerPage, setNasabahPerPage] = useState(5);
  const [newNasabah, setNewNasabah] = useState({ nama: '', alamat: '', noHp: '' });
  const [editNasabah, setEditNasabah] = useState<typeof nasabahList[0] | null>(null);
  const [editNasabahDraft, setEditNasabahDraft] = useState<typeof nasabahList[0] | null>(null);

  // Setoran masuk list
  const [setoranMasukList, setSetoranMasukList] = useState([
    { id: 1, nama: 'Budi Santoso', tanggal: '2026-06-10', waktu: '08:30 WIB', jenis: 'Sampah Organik', berat: '15', nilai: 'Rp 75,000', macam: 'Kulit buah, sisa sayuran' },
    { id: 2, nama: 'Siti Nurhaliza', tanggal: '2026-06-10', waktu: '09:15 WIB', jenis: 'Sampah Plastik', berat: '22', nilai: 'Rp 110,000', macam: 'Botol plastik, kemasan makanan' },
    { id: 3, nama: 'Ahmad Fauzi', tanggal: '2026-06-10', waktu: '10:45 WIB', jenis: 'Sampah Kertas', berat: '18', nilai: 'Rp 90,000', macam: 'Kardus bekas, kertas HVS' },
  ]);
  const [editSetoran, setEditSetoran] = useState<typeof setoranMasukList[0] | null>(null);
  const [editSetoranDraft, setEditSetoranDraft] = useState<typeof setoranMasukList[0] | null>(null);
  const [newSetoranForm, setNewSetoranForm] = useState({ nasabah: '', tanggal: '', waktu: '', jenis: '', berat: '', macam: '' });
  const [setoranSearch, setSetoranSearch] = useState('');
  const [setoranPage, setSetoranPage] = useState(1);
  const [setoranPerPage, setSetoranPerPage] = useState(5);

  // Users
  const [editUser, setEditUser] = useState<User | null>(null);
  const [editUserDraft, setEditUserDraft] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/users")
      .then((res) => {
        console.log("Data user:", res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }, []);
  const [newUserForm, setNewUserForm] = useState({ name: '', email: '', password: '', role: '' });
  const [userSearch, setUserSearch] = useState('');
  const [userPage, setUserPage] = useState(1);
  const [userPerPage, setUserPerPage] = useState(5);

  // Pelatihan
  const [pelatihanTab, setPelatihanTab] = useState<'jadwal' | 'training-camp' | 'wisata-literasi' | 'kelas-budidaya' | 'pembelajaran-tematik'>('jadwal');
  const [pelatihanSearch, setPelatihanSearch] = useState('');
  const [pelatihanPerPage, setPelatihanPerPage] = useState(5);
  const [pelatihanPage, setPelatihanPage] = useState(1);
  const [showTambahPelatihan, setShowTambahPelatihan] = useState(false);
  const [newPelatihanForm, setNewPelatihanForm] = useState({ nama: '', tanggal: '', lokasi: '', kapasitas: '', deskripsi: '', namaPemesan: '' });
  const [jadwalList, setJadwalList] = useState([
    { id: 1, nama: 'Workshop Budidaya Maggot BSF', tanggal: '2026-06-15', lokasi: 'Laboratorium RLI', kapasitas: 20, peserta: 14, status: 'Akan Datang', namaPemesan: 'Budi Santoso' },
    { id: 2, nama: 'Pelatihan Pemilahan Sampah', tanggal: '2026-06-22', lokasi: 'Aula RLI Jakarta', kapasitas: 30, peserta: 24, status: 'Akan Datang', namaPemesan: 'Siti Nurhaliza' },
    { id: 3, nama: 'Kelas Pembuatan Pupuk Kompos', tanggal: '2026-05-10', lokasi: 'Kebun RLI Depok', kapasitas: 25, peserta: 25, status: 'Selesai', namaPemesan: 'Ahmad Fauzi' },
  ]);
  const [trainingCampList, setTrainingCampList] = useState([
    { id: 1, nama: 'Training Camp Pengelola Bank Sampah', tanggal: '2026-07-01', durasi: '3 hari', lokasi: 'Bumi Perkemahan RLI', peserta: 40, status: 'Akan Datang' },
    { id: 2, nama: 'Training Camp Budidaya Maggot', tanggal: '2026-05-15', durasi: '2 hari', lokasi: 'Laboratorium RLI', peserta: 20, status: 'Selesai' },
  ]);
  const [wisataList, setWisataList] = useState([
    { id: 1, nama: 'Wisata Literasi Lingkungan Hidup', tanggal: '2026-06-20', lokasi: 'Taman Nasional Gunung Gede', peserta: 35, status: 'Akan Datang' },
    { id: 2, nama: 'Pelatihan Lingkungan Berbasis Alam', tanggal: '2026-04-18', lokasi: 'Hutan Kota Jakarta', peserta: 28, status: 'Selesai' },
  ]);
  const [budidayaList, setBudidayaList] = useState([
    { id: 1, nama: 'Kelas Budidaya Maggot BSF Dasar', tanggal: '2026-06-18', lokasi: 'Laboratorium RLI', kapasitas: 15, peserta: 10, level: 'Dasar', status: 'Akan Datang' },
    { id: 2, nama: 'Kelas Budidaya Maggot BSF Lanjutan', tanggal: '2026-07-05', lokasi: 'Laboratorium RLI', kapasitas: 10, peserta: 6, level: 'Lanjutan', status: 'Akan Datang' },
    { id: 3, nama: 'Kelas Hidroponik & Tanaman Organik', tanggal: '2026-05-25', lokasi: 'Kebun RLI', kapasitas: 20, peserta: 20, level: 'Dasar', status: 'Selesai' },
  ]);
  const [tematikTab, setTematikTab] = useState<'sains' | 'berkebun'>('sains');
  const [editJadwal, setEditJadwal] = useState<typeof jadwalList[0] | null>(null);
  const [editJadwalDraft, setEditJadwalDraft] = useState<typeof jadwalList[0] | null>(null);
  const [jadwalPeserta, setJadwalPeserta] = useState<Record<number, { id: number; nama: string; noHp: string }[]>>({
    1: [{ id: 1, nama: 'Budi Santoso', noHp: '081234567890' }, { id: 2, nama: 'Siti Nurhaliza', noHp: '081234567891' }],
    2: [{ id: 1, nama: 'Ahmad Fauzi', noHp: '081234567892' }],
  });
  const [lihatPesertaJadwal, setLihatPesertaJadwal] = useState<typeof jadwalList[0] | null>(null);
  const [newPesertaForm, setNewPesertaForm] = useState({ nama: '', noHp: '' });
  const [riwayatPelatihanSearch, setRiwayatPelatihanSearch] = useState('');
  const [riwayatPelatihanPage, setRiwayatPelatihanPage] = useState(1);
  const [riwayatPelatihanPerPage, setRiwayatPelatihanPerPage] = useState(5);
  const [sainsList, setSainsList] = useState([
    { id: 1, nama: 'Kelas Sains Daur Ulang Plastik', tanggal: '2026-06-12', lokasi: 'Lab Sains RLI', peserta: 18, usia: '10-15 tahun' },
    { id: 2, nama: 'Kelas Sains Ekosistem Tanah', tanggal: '2026-05-08', lokasi: 'Lab Sains RLI', peserta: 22, usia: '12-17 tahun' },
  ]);
  const [berkebunList, setBerkebunList] = useState([
    { id: 1, nama: 'Kelas Berkebun Urban Farming', tanggal: '2026-06-25', lokasi: 'Rooftop Garden RLI', peserta: 15, usia: 'Semua usia' },
    { id: 2, nama: 'Kelas Berkebun Hidroponik Sederhana', tanggal: '2026-05-30', lokasi: 'Kebun RLI', peserta: 20, usia: '8-14 tahun' },
  ]);

  // Kurikulum Hijau
  const [kurikulumTab, setKurikulumTab] = useState<'buku' | 'modul' | 'video'>('buku');
  const [kurikulumSearch, setKurikulumSearch] = useState('');
  const [kurikulumPerPage, setKurikulumPerPage] = useState(5);
  const [kurikulumPage, setKurikulumPage] = useState(1);

  // Produk
  const [newProdukForm, setNewProdukForm] = useState({ jenis: '', nama: '', harga: '', stok: '' });
  const [produkSavedMsg, setProdukSavedMsg] = useState(false);

  // Riwayat penarikan
  const [riwayatSearch, setRiwayatSearch] = useState('');
  const [riwayatPage, setRiwayatPage] = useState(1);
  const [riwayatPerPage, setRiwayatPerPage] = useState(5);
  const [riwayatPenarikanList, setRiwayatPenarikanList] = useState([
    { id: 1, keterangan: 'Penarikan ke Bank BCA', tanggal: '25 Mei 2026, 14:30', jumlah: 'Rp 5,000,000' },
    { id: 2, keterangan: 'Penarikan ke Bank Mandiri', tanggal: '18 Mei 2026, 10:15', jumlah: 'Rp 3,500,000' },
  ]);
  const [draftSetoran, setDraftSetoran] = useState<SetoranData[]>([
    {
      id: 1,
      nasabah: 'Budi Santoso',
      tanggal: '2026-06-04',
      jenisSampah: 'Sampah Organik',
      berat: 15,
      macamSampah: 'Kulit buah, sisa sayuran',
      status: 'pending',
      waktu: '08:30 WIB'
    },
    {
      id: 2,
      nasabah: 'Siti Nurhaliza',
      tanggal: '2026-06-04',
      jenisSampah: 'Sampah Plastik',
      berat: 22,
      macamSampah: 'Botol plastik, kemasan makanan',
      status: 'pending',
      waktu: '09:15 WIB'
    }
  ]);
  const [setoranApproved, setSetoranApproved] = useState<SetoranData[]>([
    {
      id: 100,
      nasabah: 'Ahmad Fauzi',
      tanggal: '2026-06-03',
      jenisSampah: 'Sampah Kertas',
      berat: 18,
      macamSampah: 'Kardus bekas, kertas HVS',
      status: 'approved',
      waktu: '10:45 WIB'
    }
  ]);

  const handleApproveSetoran = (id: number) => {
    const setoran = draftSetoran.find(s => s.id === id);
    if (setoran) {
      setSetoranApproved([...setoranApproved, { ...setoran, status: 'approved' }]);
      setDraftSetoran(draftSetoran.filter(s => s.id !== id));
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Nasabah"
          value="1,234"
          icon={Users}
          trend={{ value: '+12%', isPositive: true }}
          color="primary"
        />
        <StatCard
          title="Sampah Terkumpul"
          value="3,450 kg"
          icon={Trash2}
          trend={{ value: '+8%', isPositive: true }}
          color="secondary"
        />
        <StatCard
          title="Pupuk Organik"
          value="1,280 kg"
          icon={Leaf}
          trend={{ value: '+15%', isPositive: true }}
          color="accent"
        />
        <StatCard
          title="Air Lindi"
          value="450 liter"
          icon={Droplets}
          trend={{ value: '+5%', isPositive: true }}
          color="muted"
        />
        <StatCard
          title="Total Uang Nasabah"
          value="Rp 45,750,000"
          icon={Wallet}
          trend={{ value: '+18%', isPositive: true }}
          color="primary"
        />
        <StatCard
          title="Total Kelas Dilakukan"
          value="24"
          icon={GraduationCap}
          trend={{ value: '+6%', isPositive: true }}
          color="secondary"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WasteChart />
        <WasteCategoryChart />
      </div>

      <CustomerTable />
    </div>
  );

  const renderDataUser = () => {
    const filteredUsers = users.filter(u =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase())
    );
    const userTotalPages = Math.max(1, Math.ceil(filteredUsers.length / userPerPage));
    const paginatedUsers = filteredUsers.slice((userPage - 1) * userPerPage, userPage * userPerPage);
    return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 border border-border rounded-lg px-3 py-2 bg-card text-sm text-card-foreground">
            <span className="text-muted-foreground">show</span>
            <select
              value={userPerPage}
              onChange={(e) => { setUserPerPage(Number(e.target.value)); setUserPage(1); }}
              className="bg-transparent text-card-foreground focus:outline-none ml-1 text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={50}>50</option>
            </select>
          </div>
          <button
            onClick={() => setShowTambahUser(true)}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <span className="text-lg leading-none">+</span>
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            placeholder="Cari user..."
            className="pl-9 pr-4 py-2 rounded-lg bg-card border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm w-56"
          />
        </div>
      </div>

      {/* Modal pop up */}
      {showTambahUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowTambahUser(false)}>
          <div className="bg-card rounded-2xl shadow-xl p-6 w-full max-w-md space-y-4 mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h4 className="text-base text-card-foreground">Tambah User</h4>
              <button onClick={() => setShowTambahUser(false)} className="text-muted-foreground hover:text-card-foreground transition-colors text-xl leading-none">✕</button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Nama Lengkap</label>
                <input type="text" value={newUserForm.name} onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })} placeholder="Masukkan nama lengkap" className="w-full px-3 py-2 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Email</label>
                <input type="email" value={newUserForm.email} onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })} placeholder="Masukkan email" className="w-full px-3 py-2 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Password</label>
                <input type="password" value={newUserForm.password} onChange={(e) => setNewUserForm({ ...newUserForm, password: e.target.value })} placeholder="Masukkan password" className="w-full px-3 py-2 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Role</label>
                <select value={newUserForm.role} onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm">
                  <option value="">-- Pilih Role --</option>
                  <option value="admin_ifk">Super Admin</option>
                  <option value="operator">Operator</option>
                  <option value="kasir">Kasir</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 pt-1">
                <button
                onClick={async () => {
                  if (!newUserForm.name || !newUserForm.email) return;

                  try {
                    console.log({
                      nama_lengkap: newUserForm.name,
                      email: newUserForm.email,
                      telepon: "",
                      password: newUserForm.password,
                      alamat: "",
                      role: newUserForm.role || "admin_ifk",
                    });

                    await axios.post("http://localhost:3000/api/users", {
                      nama_lengkap: newUserForm.name,
                      email: newUserForm.email,
                      telepon: "",
                      password: newUserForm.password,
                      alamat: "",
                      role: newUserForm.role || "admin_ifk",
                    });

                    const res = await axios.get("http://localhost:3000/api/users");
                    setUsers(res.data);

                    setNewUserForm({
                      name: "",
                      email: "",
                      password: "",
                      role: "",
                    });
                    
                    setShowTambahUser(false);

                  } catch (err: any) {
                    console.log(err.response);
                    console.log(err.response?.data);

                      alert(
                      err.response?.data?.message ||
                      err.response?.data?.error ||
                      "Gagal menambahkan user"
                    );
                  }
                  }}
                  
                className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm">
                Simpan User
              </button>
              <button onClick={() => setShowTambahUser(false)} className="flex-1 py-2 bg-muted text-card-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm">
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/40 border-b border-border">
                <th className="text-left py-3 px-4 text-muted-foreground">Nama</th>
                <th className="text-left py-3 px-4 text-muted-foreground">Email</th>
                <th className="text-left py-3 px-4 text-muted-foreground">Role</th>
                <th className="text-left py-3 px-4 text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 text-muted-foreground">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginatedUsers.map((user, i) => (
                <tr key={i} className="hover:bg-muted/20 transition-colors">
                  <td className="py-3 px-4 text-card-foreground">{user.name}</td>
                  <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs">
                    {user.role === "admin_ifk"
                        ? "Super Admin"
                        : user.role === "operator"
                        ? "Operator"
                        : user.role === "kasir"
                        ? "Kasir"
                        : user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 bg-accent/30 text-primary rounded text-xs">{user.status}</span>
                  </td>
                  <td className="py-3 px-4">
                    <button onClick={() => { setEditUser(user); setEditUserDraft({ ...user }); }} className="text-primary hover:underline text-xs mr-2">Edit</button>
                    <button onClick={() => setUsers(users.filter(u => u !== user))} className="text-destructive hover:underline text-xs">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="px-4 py-3 border-t border-border flex items-center gap-1">
        <button onClick={() => setUserPage(p => Math.max(1, p - 1))} className="w-7 h-7 flex items-center justify-center rounded hover:bg-muted transition-colors text-muted-foreground">‹</button>
        {Array.from({ length: userTotalPages }, (_, i) => i + 1).map(p => (
          <button key={p} onClick={() => setUserPage(p)} className={`w-7 h-7 flex items-center justify-center rounded text-sm ${userPage === p ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'}`}>{p}</button>
        ))}
        <button onClick={() => setUserPage(p => Math.min(userTotalPages, p + 1))} className="w-7 h-7 flex items-center justify-center rounded hover:bg-muted transition-colors text-muted-foreground">›</button>
      </div>

      {editUser && editUserDraft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setEditUser(null)}>
          <div className="bg-card rounded-2xl shadow-xl p-6 w-full max-w-md mx-4 space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h4 className="text-base text-card-foreground">Edit User</h4>
              <button onClick={() => setEditUser(null)} className="text-muted-foreground hover:text-card-foreground text-xl leading-none">✕</button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Nama Lengkap</label>
                <input type="text" value={editUserDraft.name} onChange={(e) => setEditUserDraft({ ...editUserDraft, name: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Email</label>
                <input type="email" value={editUserDraft.email} onChange={(e) => setEditUserDraft({ ...editUserDraft, email: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Role</label>
                <select value={editUserDraft.role} onChange={(e) => setEditUserDraft({ ...editUserDraft, role: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm">
                  <option value="admin_ifk">Super Admin</option>
                  <option value="rli">Operator</option>
                  <option value="kasir">Kasir</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Status</label>
                <select value={editUserDraft.status} onChange={(e) => setEditUserDraft({ ...editUserDraft, status: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm">
                  <option value="Aktif">Aktif</option>
                  <option value="Nonaktif">Nonaktif</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 pt-1">
              <button
                onClick={() => {
                  setUsers(users.map((u) => u === editUser ? editUserDraft : u));
                  setEditUser(null);
                }}
                className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
              >
                Simpan
              </button>
              <button onClick={() => setEditUser(null)} className="flex-1 py-2 bg-muted text-card-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm">
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    );
  };

  const renderNasabah = () => {
    const filtered = nasabahList.filter(n =>
      n.nama.toLowerCase().includes(nasabahSearch.toLowerCase()) ||
      n.noHp.includes(nasabahSearch)
    );
    const totalPages = Math.max(1, Math.ceil(filtered.length / nasabahPerPage));
    const paginated = filtered.slice((nasabahPage - 1) * nasabahPerPage, nasabahPage * nasabahPerPage);

    return (
      <div className="space-y-6">
        {/* Toolbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 border border-border rounded-lg px-3 py-2 bg-card text-sm text-card-foreground">
              <span className="text-muted-foreground">show</span>
              <select
                value={nasabahPerPage}
                onChange={(e) => { setNasabahPerPage(Number(e.target.value)); setNasabahPage(1); }}
                className="bg-transparent text-card-foreground focus:outline-none ml-1 text-sm"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
              </select>
            </div>
            <button
              onClick={() => { setNewNasabah({ nama: '', alamat: '', noHp: '' }); setShowTambahNasabah(true); }}
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <span className="text-lg leading-none">+</span>
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={nasabahSearch}
              onChange={(e) => { setNasabahSearch(e.target.value); setNasabahPage(1); }}
              placeholder="Cari nasabah..."
              className="pl-9 pr-4 py-2 rounded-lg bg-card border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm w-56"
            />
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Nasabah Aktif" value={nasabahList.length.toLocaleString()} icon={Users} color="primary" />
          <StatCard title="Nasabah Baru Bulan Ini" value="48" icon={Users} trend={{ value: '+20%', isPositive: true }} color="secondary" />
          <StatCard title="Total Uang Nasabah" value="Rp 45,750,000" icon={Wallet} color="accent" />
        </div>

        {/* Table */}
        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="text-base text-card-foreground">Data Nasabah</h3>
          </div>

          {/* Modal Tambah */}
          {showTambahNasabah && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowTambahNasabah(false)}>
              <div className="bg-card rounded-2xl shadow-xl p-6 w-full max-w-md space-y-4 mx-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between">
                  <h4 className="text-base text-card-foreground">Tambah Nasabah</h4>
                  <button onClick={() => setShowTambahNasabah(false)} className="text-muted-foreground hover:text-card-foreground transition-colors text-xl leading-none">✕</button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Nama Lengkap</label>
                    <input type="text" value={newNasabah.nama} onChange={(e) => setNewNasabah({ ...newNasabah, nama: e.target.value })} placeholder="Masukkan nama lengkap" className="w-full px-3 py-2 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Alamat</label>
                    <input type="text" value={newNasabah.alamat} onChange={(e) => setNewNasabah({ ...newNasabah, alamat: e.target.value })} placeholder="Masukkan alamat" className="w-full px-3 py-2 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">No. HP</label>
                    <input type="tel" value={newNasabah.noHp} onChange={(e) => setNewNasabah({ ...newNasabah, noHp: e.target.value })} placeholder="08xxxxxxxxxx" className="w-full px-3 py-2 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
                  </div>
                </div>
                <div className="flex gap-3 pt-1">
                  <button
                    onClick={() => {
                      if (!newNasabah.nama) return;
                      setNasabahList([...nasabahList, { id: Date.now(), ...newNasabah, totalSampah: '0 kg', saldo: 'Rp 0' }]);
                      setShowTambahNasabah(false);
                    }}
                    className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
                  >
                    Simpan Nasabah
                  </button>
                  <button onClick={() => setShowTambahNasabah(false)} className="flex-1 py-2 bg-muted text-card-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm">
                    Batal
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal Edit */}
          {editNasabah && editNasabahDraft && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setEditNasabah(null)}>
              <div className="bg-card rounded-2xl shadow-xl p-6 w-full max-w-md space-y-4 mx-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between">
                  <h4 className="text-base text-card-foreground">Edit Nasabah</h4>
                  <button onClick={() => setEditNasabah(null)} className="text-muted-foreground hover:text-card-foreground text-xl leading-none">✕</button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Nama Lengkap</label>
                    <input type="text" value={editNasabahDraft.nama} onChange={(e) => setEditNasabahDraft({ ...editNasabahDraft, nama: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Alamat</label>
                    <input type="text" value={editNasabahDraft.alamat} onChange={(e) => setEditNasabahDraft({ ...editNasabahDraft, alamat: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">No. HP</label>
                    <input type="tel" value={editNasabahDraft.noHp} onChange={(e) => setEditNasabahDraft({ ...editNasabahDraft, noHp: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
                  </div>
                </div>
                <div className="flex gap-3 pt-1">
                  <button
                    onClick={() => { setNasabahList(nasabahList.map(n => n.id === editNasabah.id ? editNasabahDraft : n)); setEditNasabah(null); }}
                    className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
                  >
                    Simpan
                  </button>
                  <button onClick={() => setEditNasabah(null)} className="flex-1 py-2 bg-muted text-card-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm">Batal</button>
                </div>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/40 border-b border-border">
                  <th className="text-left py-3 px-6 text-muted-foreground">Nama</th>
                  <th className="text-left py-3 px-4 text-muted-foreground">Alamat</th>
                  <th className="text-left py-3 px-4 text-muted-foreground">No. HP</th>
                  <th className="text-left py-3 px-4 text-muted-foreground">Total Sampah</th>
                  <th className="text-left py-3 px-4 text-muted-foreground">Saldo</th>
                  <th className="text-left py-3 px-4 text-muted-foreground">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paginated.map((n) => (
                  <tr key={n.id} className="hover:bg-muted/20 transition-colors">
                    <td className="py-3 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                          <span className="text-xs text-primary">{n.nama.charAt(0)}</span>
                        </div>
                        <span className="text-card-foreground">{n.nama}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{n.alamat}</td>
                    <td className="py-3 px-4 text-muted-foreground">{n.noHp}</td>
                    <td className="py-3 px-4 text-card-foreground">{n.totalSampah}</td>
                    <td className="py-3 px-4 text-primary">{n.saldo}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button onClick={() => { setEditNasabah(n); setEditNasabahDraft({ ...n }); }} className="px-2.5 py-1 rounded text-xs text-white hover:opacity-90" style={{ backgroundColor: '#0E91A1' }}>Edit</button>
                        <button onClick={() => setNasabahList(nasabahList.filter(x => x.id !== n.id))} className="px-2.5 py-1 rounded text-xs text-white bg-destructive hover:opacity-90">Hapus</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-3 border-t border-border flex items-center gap-1">
            <button onClick={() => setNasabahPage(p => Math.max(1, p - 1))} className="w-7 h-7 flex items-center justify-center rounded hover:bg-muted transition-colors text-muted-foreground">‹</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setNasabahPage(p)} className={`w-7 h-7 flex items-center justify-center rounded text-sm ${nasabahPage === p ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'}`}>{p}</button>
            ))}
            <button onClick={() => setNasabahPage(p => Math.min(totalPages, p + 1))} className="w-7 h-7 flex items-center justify-center rounded hover:bg-muted transition-colors text-muted-foreground">›</button>
          </div>
        </div>
      </div>
    );
  };

  const renderPengelolaanProduk = () => (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button onClick={() => setActiveMenu('tambah-produk')} className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
          <span className="text-xl">+</span>
          Tambah Produk
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
        <h3 className="text-lg text-card-foreground mb-4">Penjualan Produk Bulan Ini</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">Pupuk Organik</p>
            <p className="text-2xl text-card-foreground mt-1">245 kg</p>
            <p className="text-xs text-primary mt-1">Rp 6,125,000</p>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">Air Lindi</p>
            <p className="text-2xl text-card-foreground mt-1">180 liter</p>
            <p className="text-xs text-primary mt-1">Rp 2,700,000</p>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">Ekstrak Bunga Telang</p>
            <p className="text-2xl text-card-foreground mt-1">95 botol</p>
            <p className="text-xs text-primary mt-1">Rp 4,750,000</p>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">Ekstrak Rosella</p>
            <p className="text-2xl text-card-foreground mt-1">165 botol</p>
            <p className="text-xs text-primary mt-1">Rp 5,775,000</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSampah = () => (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
          <StatCard
            title="Sampah Hari Ini"
            value="125 kg"
            icon={Trash2}
            color="primary"
          />
          <StatCard
            title="Sampah Bulan Ini"
            value="3,450 kg"
            icon={Trash2}
            color="secondary"
          />
          <StatCard
            title="Total Sampah Keseluruhan"
            value="38,500 kg"
            icon={Trash2}
            color="accent"
          />
        </div>
        <div className="w-48">
          <label className="text-sm text-muted-foreground mb-2 block">Pilih Tahun</label>
          <select className="w-full px-4 py-2.5 rounded-lg bg-card border border-border focus:outline-none focus:ring-2 focus:ring-ring">
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
        </div>
      </div>

      <YearlyWasteChart />

      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WasteManagementChart />
            <WasteCategoryChart />
          </div>
        </div>
        <div className="w-48">
          <label className="text-sm text-muted-foreground mb-2 block">Pilih Tahun</label>
          <select className="w-full px-4 py-2.5 rounded-lg bg-card border border-border focus:outline-none focus:ring-2 focus:ring-ring">
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderPupuk = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Produksi Hari Ini"
          value="45 kg"
          icon={Leaf}
          color="primary"
        />
        <StatCard
          title="Produksi Bulan Ini"
          value="1,280 kg"
          icon={Leaf}
          trend={{ value: '+15%', isPositive: true }}
          color="secondary"
        />
        <StatCard
          title="Stok Tersedia"
          value="850 kg"
          icon={Leaf}
          color="accent"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
          <h3 className="text-lg text-card-foreground mb-4">Proses Produksi Pupuk</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <span className="text-sm text-card-foreground">Tahap Pengomposan</span>
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs">350 kg</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <span className="text-sm text-card-foreground">Tahap Fermentasi</span>
              <span className="px-3 py-1 bg-secondary/30 text-primary rounded-full text-xs">280 kg</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <span className="text-sm text-card-foreground">Siap Panen</span>
              <span className="px-3 py-1 bg-accent/40 text-primary rounded-full text-xs">220 kg</span>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
          <h3 className="text-lg text-card-foreground mb-4">Produksi Air Lindi</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="text-sm text-card-foreground">Hari Ini</p>
                <p className="text-xs text-muted-foreground mt-1">27 Mei 2026</p>
              </div>
              <span className="text-2xl text-primary">15 L</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="text-sm text-card-foreground">Bulan Ini</p>
                <p className="text-xs text-muted-foreground mt-1">Mei 2026</p>
              </div>
              <span className="text-2xl text-primary">450 L</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="text-sm text-card-foreground">Stok Tersedia</p>
                <p className="text-xs text-muted-foreground mt-1">Siap jual</p>
              </div>
              <span className="text-2xl text-primary">320 L</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSetoranMasuk = () => {
    const filteredSetoran = setoranMasukList.filter(s =>
      s.nama.toLowerCase().includes(setoranSearch.toLowerCase()) ||
      s.jenis.toLowerCase().includes(setoranSearch.toLowerCase())
    );
    const setoranTotalPages = Math.max(1, Math.ceil(filteredSetoran.length / setoranPerPage));
    const paginatedSetoran = filteredSetoran.slice((setoranPage - 1) * setoranPerPage, setoranPage * setoranPerPage);
    return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 border border-border rounded-lg px-3 py-2 bg-card text-sm text-card-foreground">
            <span className="text-muted-foreground">show</span>
            <select
              value={setoranPerPage}
              onChange={(e) => { setSetoranPerPage(Number(e.target.value)); setSetoranPage(1); }}
              className="bg-transparent text-card-foreground focus:outline-none ml-1 text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={50}>50</option>
            </select>
          </div>
          <button
            onClick={() => setShowInputSetoran(true)}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <span className="text-lg leading-none">+</span>
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={setoranSearch}
            onChange={(e) => setSetoranSearch(e.target.value)}
            placeholder="Cari setoran..."
            className="pl-9 pr-4 py-2 rounded-lg bg-card border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm w-56"
          />
        </div>
      </div>

      {/* Modal Input Setoran */}
      {showInputSetoran && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowInputSetoran(false)}>
          <div className="bg-card rounded-2xl shadow-xl p-6 w-full max-w-lg mx-4 space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h4 className="text-base text-card-foreground">Input Setoran Sampah</h4>
              <button onClick={() => setShowInputSetoran(false)} className="text-muted-foreground hover:text-card-foreground text-xl leading-none">✕</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Pilih Nasabah</label>
                <select value={newSetoranForm.nasabah} onChange={(e) => setNewSetoranForm({ ...newSetoranForm, nasabah: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm">
                  <option value="">-- Pilih Nasabah --</option>
                  {nasabahList.map(n => <option key={n.id} value={n.nama}>{n.nama} - {n.noHp}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Tanggal Setoran</label>
                <input type="date" value={newSetoranForm.tanggal} onChange={(e) => setNewSetoranForm({ ...newSetoranForm, tanggal: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Waktu Setoran</label>
                <input type="time" value={newSetoranForm.waktu} onChange={(e) => setNewSetoranForm({ ...newSetoranForm, waktu: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Jenis Sampah</label>
                <select value={newSetoranForm.jenis} onChange={(e) => setNewSetoranForm({ ...newSetoranForm, jenis: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm">
                  <option value="">-- Pilih Jenis Sampah --</option>
                  <option value="Sampah Organik">Sampah Organik</option>
                  <option value="Sampah Plastik">Sampah Plastik</option>
                  <option value="Sampah Kertas">Sampah Kertas</option>
                  <option value="Sampah Logam">Sampah Logam</option>
                  <option value="Sampah Kaca">Sampah Kaca</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Berat Sampah (kg)</label>
                <input type="number" value={newSetoranForm.berat} onChange={(e) => setNewSetoranForm({ ...newSetoranForm, berat: e.target.value })} placeholder="0" min="0" step="0.1" className="w-full px-3 py-2 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Macam Sampah</label>
              <textarea
                value={newSetoranForm.macam}
                onChange={(e) => setNewSetoranForm({ ...newSetoranForm, macam: e.target.value })}
                placeholder="Tuliskan macam sampah (contoh: kulit buah, sisa sayuran, kardus bekas, botol plastik, dll)"
                className="w-full px-3 py-2 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                rows={3}
              />
            </div>
            <div className="flex gap-3 pt-1">
              <button
                onClick={() => {
                  if (!newSetoranForm.nasabah || !newSetoranForm.berat) return;
                  const now = new Date();
                  const harga = parseInt(newSetoranForm.berat) * 5000;
                  const waktuStr = newSetoranForm.waktu
                    ? newSetoranForm.waktu + ' WIB'
                    : now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
                  setSetoranMasukList([...setoranMasukList, {
                    id: Date.now(),
                    nama: newSetoranForm.nasabah,
                    tanggal: newSetoranForm.tanggal || now.toISOString().slice(0, 10),
                    waktu: waktuStr,
                    jenis: newSetoranForm.jenis || 'Sampah Organik',
                    berat: newSetoranForm.berat,
                    nilai: `Rp ${harga.toLocaleString('id-ID')}`,
                    macam: newSetoranForm.macam,
                  }]);
                  setNewSetoranForm({ nasabah: '', tanggal: '', waktu: '', jenis: '', berat: '', macam: '' });
                  setShowInputSetoran(false);
                }}
                className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
              >
                Simpan Setoran
              </button>
              <button onClick={() => { setNewSetoranForm({ nasabah: '', tanggal: '', waktu: '', jenis: '', berat: '', macam: '' }); setShowInputSetoran(false); }} className="flex-1 py-2 bg-muted text-card-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm">
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
        <h3 className="text-lg text-card-foreground mb-4">Setoran Masuk Hari Ini</h3>
        <div className="space-y-3">
          {paginatedSetoran.map((item) => (
            <div key={item.id} className="p-4 bg-muted/50 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-sm text-card-foreground">{item.nama}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.waktu} - {item.jenis}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-primary">{item.berat} kg</p>
                  <p className="text-xs text-muted-foreground">{item.nilai}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { setEditSetoran(item); setEditSetoranDraft({ ...item }); }}
                    className="px-3 py-1.5 rounded-lg text-xs text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: '#0E91A1' }}>
                    Edit
                  </button>
                  <button
                    onClick={() => setSetoranMasukList(setoranMasukList.filter(x => x.id !== item.id))}
                    className="px-3 py-1.5 rounded-lg text-xs text-white bg-destructive hover:opacity-90 transition-opacity">
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
          {editSetoran && editSetoranDraft && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setEditSetoran(null)}>
              <div className="bg-card rounded-2xl shadow-xl p-6 w-full max-w-lg mx-4 space-y-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between">
                  <h4 className="text-base text-card-foreground">Edit Setoran</h4>
                  <button onClick={() => setEditSetoran(null)} className="text-muted-foreground hover:text-card-foreground text-xl leading-none">✕</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Nasabah</label>
                    <input type="text" value={editSetoranDraft.nama} onChange={(e) => setEditSetoranDraft({ ...editSetoranDraft, nama: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Tanggal</label>
                    <input type="date" value={editSetoranDraft.tanggal ?? ''} onChange={(e) => setEditSetoranDraft({ ...editSetoranDraft, tanggal: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Waktu</label>
                    <input type="text" value={editSetoranDraft.waktu} onChange={(e) => setEditSetoranDraft({ ...editSetoranDraft, waktu: e.target.value })} placeholder="08:30 WIB" className="w-full px-3 py-2 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Jenis Sampah</label>
                    <select value={editSetoranDraft.jenis} onChange={(e) => setEditSetoranDraft({ ...editSetoranDraft, jenis: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm">
                      <option>Sampah Organik</option>
                      <option>Sampah Plastik</option>
                      <option>Sampah Kertas</option>
                      <option>Sampah Logam</option>
                      <option>Sampah Kaca</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Berat Sampah (kg)</label>
                    <input type="number" value={editSetoranDraft.berat} onChange={(e) => setEditSetoranDraft({ ...editSetoranDraft, berat: e.target.value })} min="0" step="0.1" className="w-full px-3 py-2 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Macam Sampah</label>
                  <textarea
                    value={editSetoranDraft.macam ?? ''}
                    onChange={(e) => setEditSetoranDraft({ ...editSetoranDraft, macam: e.target.value })}
                    placeholder="Contoh: kulit buah, sisa sayuran, botol plastik, dll"
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                  />
                </div>
                <div className="flex gap-3 pt-1">
                  <button
                    onClick={() => {
                      setSetoranMasukList(setoranMasukList.map(x => x.id === editSetoran.id ? editSetoranDraft : x));
                      setEditSetoran(null);
                    }}
                    className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm">
                    Simpan
                  </button>
                  <button onClick={() => setEditSetoran(null)} className="flex-1 py-2 bg-muted text-card-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm">
                    Batal
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
          <p className="text-sm text-card-foreground">Total Setoran Hari Ini</p>
          <div className="text-right">
            <p className="text-lg text-primary">55 kg</p>
            <p className="text-sm text-muted-foreground">Rp 275,000</p>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-border flex items-center gap-1">
          <button onClick={() => setSetoranPage(p => Math.max(1, p - 1))} className="w-7 h-7 flex items-center justify-center rounded hover:bg-muted transition-colors text-muted-foreground">‹</button>
          {Array.from({ length: setoranTotalPages }, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => setSetoranPage(p)} className={`w-7 h-7 flex items-center justify-center rounded text-sm ${setoranPage === p ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'}`}>{p}</button>
          ))}
          <button onClick={() => setSetoranPage(p => Math.min(setoranTotalPages, p + 1))} className="w-7 h-7 flex items-center justify-center rounded hover:bg-muted transition-colors text-muted-foreground">›</button>
        </div>
      </div>
    </div>
    );
  };

  const renderDraftSetoran = () => (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 border border-border rounded-lg px-3 py-2 bg-card text-sm text-card-foreground">
            <span className="text-muted-foreground">show</span>
            <select className="bg-transparent text-card-foreground focus:outline-none ml-1 text-sm">
              <option>5</option>
              <option>10</option>
              <option>20</option>
              <option>30</option>
              <option>50</option>
            </select>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari setoran..."
            className="pl-9 pr-4 py-2 rounded-lg bg-card border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm w-56"
          />
        </div>
      </div>

      {/* Riwayat Setoran Table */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h3 className="text-base text-card-foreground">Riwayat Setoran</h3>
          <button onClick={() => alert('Data Riwayat Setoran berhasil diekspor ke Excel!')} className="px-4 py-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm">
            Export Excel
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: '#7DCE94' }}>
                <th className="text-left py-3 px-4 text-white">No.</th>
                <th className="text-center py-3 px-4 text-white">Nama</th>
                <th className="text-center py-3 px-4 text-white">Jumlah Setoran (Kg.)</th>
                <th className="text-center py-3 px-4 text-white">Tanggal</th>
                <th className="text-center py-3 px-4 text-white">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {setoranApproved.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-muted-foreground text-sm">Belum ada setoran yang di-ACC</td>
                </tr>
              ) : (
                setoranApproved.map((setoran, idx) => (
                  <tr key={setoran.id} className="hover:bg-muted/20 transition-colors">
                    <td className="py-3 px-4 text-card-foreground">{idx + 1}</td>
                    <td className="py-3 px-4 text-center text-card-foreground">{setoran.nasabah}</td>
                    <td className="py-3 px-4 text-center text-card-foreground">{setoran.berat}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{setoran.tanggal}</td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => setDetilSetoran(setoran)}
                        className="px-4 py-1 rounded-lg text-white text-xs hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: '#146C78' }}
                      >
                        Detil
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 border-t border-border flex items-center gap-1">
          <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-muted transition-colors text-muted-foreground">‹</button>
          <button className="w-7 h-7 flex items-center justify-center rounded bg-primary text-primary-foreground text-sm">1</button>
          <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-muted transition-colors text-muted-foreground text-sm">2</button>
          <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-muted transition-colors text-muted-foreground text-sm">3</button>
          <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-muted transition-colors text-muted-foreground">›</button>
        </div>
      </div>

      {/* Setoran Menunggu ACC */}
      <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
        <h3 className="text-lg text-card-foreground mb-4">Setoran Menunggu ACC</h3>
        <p className="text-sm text-muted-foreground mb-4">Daftar setoran yang belum disetujui</p>

        {draftSetoran.length === 0 ? (
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-card-foreground text-center">Tidak ada setoran yang menunggu</p>
          </div>
        ) : (
          <div className="space-y-3">
            {draftSetoran.map((setoran) => (
              <div key={setoran.id} className="p-4 bg-muted/50 rounded-lg border border-border">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-sm text-card-foreground">{setoran.nasabah}</p>
                      <span className="px-2 py-0.5 bg-secondary/20 text-secondary rounded text-xs">Pending</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{setoran.waktu} - {setoran.tanggal}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-primary">{setoran.berat} kg</p>
                    <p className="text-xs text-muted-foreground">{setoran.jenisSampah}</p>
                  </div>
                </div>
                <div className="mb-3 p-3 bg-background/50 rounded">
                  <p className="text-xs text-muted-foreground mb-1">Macam Sampah:</p>
                  <p className="text-sm text-card-foreground">{setoran.macamSampah}</p>
                </div>
                <button
                  onClick={() => handleApproveSetoran(setoran.id)}
                  className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
                >
                  ACC Setoran
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Detil Setoran */}
      {detilSetoran && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setDetilSetoran(null)}>
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm mx-4 space-y-3" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-base text-card-foreground">Detil Setoran Nasabah</h4>
              <button onClick={() => setDetilSetoran(null)} className="text-muted-foreground hover:text-card-foreground text-xl leading-none">✕</button>
            </div>
            {[
              { label: 'Tanggal Disetujui', value: detilSetoran.tanggal },
              { label: 'Tanggal Setoran', value: detilSetoran.tanggal },
              { label: 'Nama', value: detilSetoran.nasabah },
              { label: 'Jumlah Sampah Halus', value: '0 Kg.' },
              { label: 'Jumlah Sampah Kasar', value: '0 Kg.' },
              { label: 'Jumlah Setoran', value: `${detilSetoran.berat} Kg.` },
              { label: 'Jenis Sampah', value: detilSetoran.macamSampah },
              { label: 'Harga Sampah', value: `Rp ${(detilSetoran.berat * 5000).toLocaleString('id-ID')}` },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-xs text-muted-foreground mb-1">{label}</p>
                <div className="w-full px-3 py-2 rounded-lg bg-muted/40 border border-border text-sm text-card-foreground">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderTambahProduk = () => (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
        <h3 className="text-lg text-card-foreground mb-4">Tambah Produk Baru</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-card-foreground mb-2 block">Jenis Produk</label>
            <select value={newProdukForm.jenis} onChange={(e) => setNewProdukForm({ ...newProdukForm, jenis: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="">-- Pilih Jenis Produk --</option>
              <option value="Pupuk">Pupuk</option>
              <option value="Tanaman Hidroponik">Tanaman Hidroponik</option>
              <option value="Ekstrak">Ekstrak</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-card-foreground mb-2 block">Nama Produk</label>
            <input
              type="text"
              value={newProdukForm.nama}
              onChange={(e) => setNewProdukForm({ ...newProdukForm, nama: e.target.value })}
              placeholder="Masukkan nama produk"
              className="w-full px-4 py-2 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-card-foreground mb-2 block">Harga</label>
              <input
                type="number"
                value={newProdukForm.harga}
                onChange={(e) => setNewProdukForm({ ...newProdukForm, harga: e.target.value })}
                placeholder="0"
                className="w-full px-4 py-2 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="text-sm text-card-foreground mb-2 block">Stok</label>
              <input
                type="number"
                value={newProdukForm.stok}
                onChange={(e) => setNewProdukForm({ ...newProdukForm, stok: e.target.value })}
                placeholder="0"
                className="w-full px-4 py-2 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          {produkSavedMsg && (
            <div className="p-3 bg-primary/10 border border-primary/30 rounded-lg text-sm text-primary flex items-center gap-2">
              <span>✓</span> Produk berhasil disimpan! Cek di halaman Pengelolaan Produk.
            </div>
          )}
          <div className="flex gap-3">
            <button
              onClick={() => {
                if (!newProdukForm.nama) return;
                setProdukSavedMsg(true);
                setNewProdukForm({ jenis: '', nama: '', harga: '', stok: '' });
                setTimeout(() => setProdukSavedMsg(false), 3000);
              }}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              Simpan Produk
            </button>
            <button
              onClick={() => setNewProdukForm({ jenis: '', nama: '', harga: '', stok: '' })}
              className="px-6 py-2 bg-muted text-card-foreground rounded-lg hover:bg-muted/80 transition-colors">
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPenarikanUang = () => (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
        <h3 className="text-lg text-card-foreground mb-4">Penarikan Uang</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-card-foreground mb-2 block">Pilih Nasabah</label>
            <select className="w-full px-4 py-2.5 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="">-- Pilih Nasabah --</option>
              <option value="1">Budi Santoso - 081234567890</option>
              <option value="2">Siti Nurhaliza - 081234567891</option>
              <option value="3">Ahmad Fauzi - 081234567892</option>
              <option value="4">Dewi Lestari - 081234567893</option>
              <option value="5">Rudi Hartono - 081234567894</option>
              <option value="6">Rina Wulandari - 081234567895</option>
              <option value="7">Hendra Gunawan - 081234567896</option>
              <option value="8">Yanti Kusuma - 081234567897</option>
            </select>
          </div>

          <div className="p-4 bg-primary/10 rounded-lg"> 
            <p className="text-sm text-muted-foreground">Saldo Tersedia</p>
            <p className="text-3xl text-primary mt-2">Rp {saldo.toLocaleString("id-ID")}</p>
          </div>

          <div className="border rounded-lg p-4 space-y-4 bg-muted/20">

            <h4 className="font-semibold text-card-foreground">
              Verifikasi Identitas Nasabah
            </h4>

            <div>
              <label className="text-sm text-card-foreground mb-2 block">
                Jenis Identitas
              </label>

              <select
                value={jenisIdentitas}
                onChange={(e)=>setJenisIdentitas(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-input-background border border-border"
              >
                <option>KTP</option>
                <option>SIM</option>
                <option>KTM</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-card-foreground mb-2 block">
                Nomor Identitas
              </label>

              <input
                type="text"
                value={nomorIdentitas}
                onChange={(e)=>setNomorIdentitas(e.target.value)}
                placeholder="Masukkan nomor identitas"
                className="w-full px-4 py-2.5 rounded-lg bg-input-background border border-border"
              />
            </div>

            <div>
              <label className="text-sm text-card-foreground mb-2 block">
                Upload Foto Identitas
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e)=>{
                  if(e.target.files){
                    setFotoIdentitas(e.target.files[0]);
                  }
                }}
                className="w-full px-4 py-2.5 rounded-lg bg-input-background border border-border"
              />

              {fotoIdentitas && (
                <p className="text-sm text-green-600 mt-2">
                  ✓ {fotoIdentitas.name}
                </p>
              )}

            </div>

          </div>

          <div>
            <label className="text-sm text-card-foreground mb-2 block">Metode Penarikan</label>
            <select
              value={metodePenarikan}
              onChange={(e) => setMetodePenarikan(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="cash">Cash (Tunai)</option>
              <option value="transfer">Transfer Bank</option>
            </select>
          </div>

          {metodePenarikan === 'transfer' && (
            <>
              <div>
                <label className="text-sm text-card-foreground mb-2 block">Nama Bank</label>
                <select className="w-full px-4 py-2.5 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring">
                  <option value="">-- Pilih Bank --</option>
                  <option value="bca">BCA</option>
                  <option value="mandiri">Mandiri</option>
                  <option value="bri">BRI</option>
                  <option value="bni">BNI</option>
                  <option value="cimb">CIMB Niaga</option>
                  <option value="permata">Permata</option>
                  <option value="danamon">Danamon</option>
                  <option value="btn">BTN</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-card-foreground mb-2 block">Nomor Rekening</label>
                <input
                  type="text"
                  placeholder="Masukkan nomor rekening"
                  className="w-full px-4 py-2.5 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="text-sm text-card-foreground mb-2 block">Nama Pemilik Rekening</label>
                <input
                  type="text"
                  placeholder="Masukkan nama pemilik rekening"
                  className="w-full px-4 py-2.5 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </>
          )}

          <div>
            <label className="text-sm text-card-foreground mb-2 block">Jumlah Penarikan</label>
            <input
              type="number"
              placeholder="Masukkan jumlah"
              className="w-full px-4 py-2.5 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {penarikanSuccess && (
            <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg flex items-center gap-3">
              <span className="text-primary text-lg">✓</span>
              <p className="text-sm text-primary">Penarikan berhasil diproses!</p>
            </div>
          )}
          <button
            disabled={!nomorIdentitas}
            onClick={() => {

              if (!nomorIdentitas) {
                alert("nomor identitas wajib diisi!");
                return;
              }

              if (!fotoIdentitas){
                alert("Upload foto identitas terlebih dahulu");
                return;
              }

              if(!fotoPengambil){

                alert("Foto pengambil wajib diupload");

                return;

              } 

              setPenarikanSuccess(true);
              setRiwayatPenarikanList(prev => [{
                id: Date.now(),
                keterangan: metodePenarikan === 'transfer' ? 'Penarikan via Transfer Bank' : 'Penarikan Tunai (Cash)',
                tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
                jumlah: 'Rp 0',
              }, ...prev]);
              setTimeout(() => setPenarikanSuccess(false), 3000);
            }}
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            Proses Penarikan
          </button>
        </div>
      </div>
    </div>
  );

  const renderRiwayatPenarikan = () => {
    const filteredRiwayat = riwayatPenarikanList.filter(r =>
      r.keterangan.toLowerCase().includes(riwayatSearch.toLowerCase())
    );
    const riwayatTotalPages = Math.max(1, Math.ceil(filteredRiwayat.length / riwayatPerPage));
    const paginatedRiwayat = filteredRiwayat.slice((riwayatPage - 1) * riwayatPerPage, riwayatPage * riwayatPerPage);
    return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 border border-border rounded-lg px-3 py-2 bg-card text-sm text-card-foreground">
            <span className="text-muted-foreground">show</span>
            <select
              value={riwayatPerPage}
              onChange={(e) => { setRiwayatPerPage(Number(e.target.value)); setRiwayatPage(1); }}
              className="bg-transparent text-card-foreground focus:outline-none ml-1 text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={riwayatSearch}
            onChange={(e) => { setRiwayatSearch(e.target.value); setRiwayatPage(1); }}
            placeholder="Cari riwayat..."
            className="pl-9 pr-4 py-2 rounded-lg bg-card border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm w-56"
          />
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="text-base text-card-foreground">Riwayat Penarikan</h3>
        </div>
        <div className="p-6 space-y-3">
          {paginatedRiwayat.length === 0 ? (
            <div className="p-4 bg-muted/50 rounded-lg text-center text-sm text-muted-foreground">Belum ada riwayat penarikan</div>
          ) : (
            paginatedRiwayat.map((item) => (
              <div key={item.id} className="p-4 bg-muted/50 rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-sm text-card-foreground">{item.keterangan}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.tanggal}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-primary">{item.jumlah}</p>
                  <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs">Berhasil</span>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="px-6 py-3 border-t border-border flex items-center gap-1">
          <button onClick={() => setRiwayatPage(p => Math.max(1, p - 1))} className="w-7 h-7 flex items-center justify-center rounded hover:bg-muted transition-colors text-muted-foreground">‹</button>
          {Array.from({ length: riwayatTotalPages }, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => setRiwayatPage(p)} className={`w-7 h-7 flex items-center justify-center rounded text-sm ${riwayatPage === p ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'}`}>{p}</button>
          ))}
          <button onClick={() => setRiwayatPage(p => Math.min(riwayatTotalPages, p + 1))} className="w-7 h-7 flex items-center justify-center rounded hover:bg-muted transition-colors text-muted-foreground">›</button>
        </div>
      </div>
    </div>
    );
  };

  const renderLaporan = () => (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
        <h3 className="text-lg text-card-foreground mb-4">Laporan Bulanan</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
            <p className="text-sm text-muted-foreground">Total Pemasukan</p>
            <p className="text-2xl text-primary mt-2">Rp 19,350,000</p>
            <p className="text-xs text-muted-foreground mt-1">Mei 2026</p>
          </div>
          <div className="p-4 bg-secondary/20 rounded-lg border border-secondary/30">
            <p className="text-sm text-muted-foreground">Total Pengeluaran</p>
            <p className="text-2xl text-primary mt-2">Rp 8,450,000</p>
            <p className="text-xs text-muted-foreground mt-1">Mei 2026</p>
          </div>
          <div className="p-4 bg-accent/30 rounded-lg border border-accent/40">
            <p className="text-sm text-muted-foreground">Keuntungan Bersih</p>
            <p className="text-2xl text-primary mt-2">Rp 10,900,000</p>
            <p className="text-xs text-muted-foreground mt-1">Mei 2026</p>
          </div>
          <div className="p-4 bg-muted rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">Margin Profit</p>
            <p className="text-2xl text-primary mt-2">56.3%</p>
            <p className="text-xs text-muted-foreground mt-1">Mei 2026</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WasteChart />
        <WasteCategoryChart />
      </div>
    </div>
  );

  const renderManajemenUser = () => (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
        <h3 className="text-lg text-card-foreground mb-4">Manajemen User</h3>
        <p className="text-sm text-muted-foreground">Kelola data pengguna sistem</p>
      </div>
    </div>
  );

  const renderManajemenIFK = () => (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
        <h3 className="text-lg text-card-foreground mb-4">Manajemen IFK</h3>
        <p className="text-sm text-muted-foreground">Kelola Instalasi Fermentasi Kompos</p>
      </div>
    </div>
  );

  const renderKurikulumHijau = () => {
    const bukuList = [
      { id: 1, judul: 'Panduan Bank Sampah untuk Pemula', penulis: 'Tim RLI', tahun: '2025', halaman: '120 hal' },
      { id: 2, judul: 'Budidaya Maggot Black Soldier Fly', penulis: 'Dr. Sari Dewi', tahun: '2024', halaman: '85 hal' },
      { id: 3, judul: 'Pengelolaan Sampah Organik Rumah Tangga', penulis: 'Tim RLI', tahun: '2025', halaman: '64 hal' },
    ];

    const modulList = [
      { id: 1, judul: 'Modul 1: Pengenalan Bank Sampah', deskripsi: 'Dasar-dasar pengelolaan bank sampah dan manfaatnya bagi lingkungan', durasi: '2 jam', level: 'Pemula' },
      { id: 2, judul: 'Modul 2: Pemilahan Sampah', deskripsi: 'Cara memilah sampah organik, anorganik, dan B3 dengan benar', durasi: '3 jam', level: 'Pemula' },
      { id: 3, judul: 'Modul 3: Pengomposan & Pupuk', deskripsi: 'Proses pembuatan kompos dan pupuk organik dari sampah', durasi: '4 jam', level: 'Menengah' },
      { id: 4, judul: 'Modul 4: Budidaya Maggot', deskripsi: 'Teknik budidaya larva BSF untuk penguraian sampah organik', durasi: '5 jam', level: 'Lanjutan' },
    ];

    const videoList = [
      { id: 1, judul: 'Tutorial Memilah Sampah di Rumah', durasi: '12:35', views: '1.2K', thumbnail: '🎬' },
      { id: 2, judul: 'Cara Membuat Pupuk Kompos Sendiri', durasi: '18:20', views: '856', thumbnail: '🎬' },
      { id: 3, judul: 'Pengenalan Budidaya Maggot BSF', durasi: '22:45', views: '2.1K', thumbnail: '🎬' },
      { id: 4, judul: 'Manfaat Bank Sampah bagi Lingkungan', durasi: '08:15', views: '3.4K', thumbnail: '🎬' },
    ];

    const searchLower = kurikulumSearch.toLowerCase();
    const filteredBuku = bukuList.filter(b => b.judul.toLowerCase().includes(searchLower) || b.penulis.toLowerCase().includes(searchLower));
    const filteredModul = modulList.filter(m => m.judul.toLowerCase().includes(searchLower) || m.deskripsi.toLowerCase().includes(searchLower));
    const filteredVideo = videoList.filter(v => v.judul.toLowerCase().includes(searchLower));

    const activeList = kurikulumTab === 'buku' ? filteredBuku : kurikulumTab === 'modul' ? filteredModul : filteredVideo;
    const totalPages = Math.max(1, Math.ceil(activeList.length / kurikulumPerPage));
    const startIdx = (kurikulumPage - 1) * kurikulumPerPage;

    const paginatedBuku = filteredBuku.slice(startIdx, startIdx + kurikulumPerPage);
    const paginatedModul = filteredModul.slice(startIdx, startIdx + kurikulumPerPage);
    const paginatedVideo = filteredVideo.slice(startIdx, startIdx + kurikulumPerPage);

    return (
      <div className="space-y-6">
        {/* Toolbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 border border-border rounded-lg px-3 py-2 bg-card text-sm text-card-foreground">
              <span className="text-muted-foreground">show</span>
              <select
                value={kurikulumPerPage}
                onChange={(e) => { setKurikulumPerPage(Number(e.target.value)); setKurikulumPage(1); }}
                className="bg-transparent text-card-foreground focus:outline-none ml-1 text-sm"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={kurikulumSearch}
              onChange={(e) => { setKurikulumSearch(e.target.value); setKurikulumPage(1); }}
              placeholder="Cari konten..."
              className="pl-9 pr-4 py-2 rounded-lg bg-card border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm w-56"
            />
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Buku Panduan" value={bukuList.length.toString()} icon={BookOpen} color="primary" />
          <StatCard title="Total Modul" value={modulList.length.toString()} icon={BookMarked} color="secondary" />
          <StatCard title="Total Video Ajar" value={videoList.length.toString()} icon={GraduationCap} color="accent" />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-muted/50 p-1 rounded-xl w-fit">
          {([
            { key: 'buku', label: 'Buku Panduan', icon: BookOpen },
            { key: 'modul', label: 'Modul Pembelajaran', icon: BookMarked },
            { key: 'video', label: 'Video Ajar', icon: Video },
          ] as const).map(tab => (
            <button
              key={tab.key}
              onClick={() => setKurikulumTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${kurikulumTab === tab.key ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-card-foreground'}`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Buku Panduan */}
        {kurikulumTab === 'buku' && (
          <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <h3 className="text-base text-card-foreground">Daftar Buku Panduan</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors">
                <Plus className="w-4 h-4" /> Tambah Buku
              </button>
            </div>
            <div className="divide-y divide-border">
              {paginatedBuku.map(buku => (
                <div key={buku.id} className="px-6 py-4 flex items-center justify-between hover:bg-muted/20 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-14 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-card-foreground">{buku.judul}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{buku.penulis} · {buku.tahun} · {buku.halaman}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border border-border text-card-foreground hover:bg-muted transition-colors">
                      <Eye className="w-3.5 h-3.5" /> Lihat
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                      <Download className="w-3.5 h-3.5" /> Unduh
                    </button>
                    <button className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-3 border-t border-border flex items-center gap-1">
              <button onClick={() => setKurikulumPage(p => Math.max(1, p - 1))} className="w-7 h-7 flex items-center justify-center rounded hover:bg-muted transition-colors text-muted-foreground">‹</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setKurikulumPage(p)} className={`w-7 h-7 flex items-center justify-center rounded text-sm ${kurikulumPage === p ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'}`}>{p}</button>
              ))}
              <button onClick={() => setKurikulumPage(p => Math.min(totalPages, p + 1))} className="w-7 h-7 flex items-center justify-center rounded hover:bg-muted transition-colors text-muted-foreground">›</button>
            </div>
          </div>
        )}

        {/* Modul Pembelajaran */}
        {kurikulumTab === 'modul' && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors">
                <Plus className="w-4 h-4" /> Tambah Modul
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paginatedModul.map(modul => (
                <div key={modul.id} className="bg-card rounded-xl border border-border shadow-sm p-5 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center shrink-0">
                        <BookMarked className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-card-foreground">{modul.judul}</p>
                        <span className={`text-xs px-2 py-0.5 rounded mt-1 inline-block ${modul.level === 'Pemula' ? 'bg-accent/30 text-primary' : modul.level === 'Menengah' ? 'bg-secondary/20 text-primary' : 'bg-primary/10 text-primary'}`}>
                          {modul.level}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{modul.deskripsi}</p>
                  <div className="flex items-center justify-between pt-1 border-t border-border">
                    <span className="text-xs text-muted-foreground">Durasi: {modul.durasi}</span>
                    <div className="flex gap-2">
                      <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs border border-border text-card-foreground hover:bg-muted transition-colors">
                        <Pencil className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                        <Eye className="w-3.5 h-3.5" /> Lihat
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1 pt-2">
              <button onClick={() => setKurikulumPage(p => Math.max(1, p - 1))} className="w-7 h-7 flex items-center justify-center rounded hover:bg-muted transition-colors text-muted-foreground">‹</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setKurikulumPage(p)} className={`w-7 h-7 flex items-center justify-center rounded text-sm ${kurikulumPage === p ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'}`}>{p}</button>
              ))}
              <button onClick={() => setKurikulumPage(p => Math.min(totalPages, p + 1))} className="w-7 h-7 flex items-center justify-center rounded hover:bg-muted transition-colors text-muted-foreground">›</button>
            </div>
          </div>
        )}

        {/* Video Ajar */}
        {kurikulumTab === 'video' && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors">
                <Plus className="w-4 h-4" /> Tambah Video
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paginatedVideo.map(video => (
                <div key={video.id} className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                  <div className="h-36 bg-muted/60 flex items-center justify-center relative">
                    <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center cursor-pointer hover:bg-primary/30 transition-colors">
                      <Video className="w-7 h-7 text-primary" />
                    </div>
                    <span className="absolute bottom-2 right-3 text-xs bg-black/60 text-white px-2 py-0.5 rounded">{video.durasi}</span>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-card-foreground">{video.judul}</p>
                    <p className="text-xs text-muted-foreground mt-1">{video.views} penonton</p>
                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                        <Eye className="w-3.5 h-3.5" /> Tonton
                      </button>
                      <button className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors border border-border">
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1 pt-2">
              <button onClick={() => setKurikulumPage(p => Math.max(1, p - 1))} className="w-7 h-7 flex items-center justify-center rounded hover:bg-muted transition-colors text-muted-foreground">‹</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setKurikulumPage(p)} className={`w-7 h-7 flex items-center justify-center rounded text-sm ${kurikulumPage === p ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'}`}>{p}</button>
              ))}
              <button onClick={() => setKurikulumPage(p => Math.min(totalPages, p + 1))} className="w-7 h-7 flex items-center justify-center rounded hover:bg-muted transition-colors text-muted-foreground">›</button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderPelatihan = () => {
    const tabs = [
      { key: 'jadwal', label: 'Jadwal' },
      { key: 'training-camp', label: 'Training Camp' },
      { key: 'wisata-literasi', label: 'Wisata Literasi' },
      { key: 'kelas-budidaya', label: 'Kelas Budidaya' },
      { key: 'pembelajaran-tematik', label: 'Pembelajaran Tematik' },
    ] as const;

    const PaginatedTable = ({ headers, rows, onHapus }: { headers: string[], rows: React.ReactNode[][], onHapus: (id: number) => void }) => {
      const total = Math.max(1, Math.ceil(rows.length / pelatihanPerPage));
      const paginated = rows.slice((pelatihanPage - 1) * pelatihanPerPage, pelatihanPage * pelatihanPerPage);
      return (
        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/40 border-b border-border">
                  {headers.map(h => <th key={h} className="text-left py-3 px-4 text-muted-foreground">{h}</th>)}
                  <th className="text-left py-3 px-4 text-muted-foreground">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paginated.map((row, i) => (
                  <tr key={i} className="hover:bg-muted/20 transition-colors">
                    {row.map((cell, j) => <td key={j} className="py-3 px-4 text-card-foreground">{cell}</td>)}
                    <td className="py-3 px-4">
                      <button className="text-destructive hover:underline text-xs">Hapus</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 border-t border-border flex items-center gap-1">
            <button onClick={() => setPelatihanPage(p => Math.max(1, p - 1))} className="w-7 h-7 flex items-center justify-center rounded hover:bg-muted transition-colors text-muted-foreground">‹</button>
            {Array.from({ length: total }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setPelatihanPage(p)} className={`w-7 h-7 flex items-center justify-center rounded text-sm ${pelatihanPage === p ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'}`}>{p}</button>
            ))}
            <button onClick={() => setPelatihanPage(p => Math.min(total, p + 1))} className="w-7 h-7 flex items-center justify-center rounded hover:bg-muted transition-colors text-muted-foreground">›</button>
          </div>
        </div>
      );
    };

    return (
      <div className="space-y-6">
        {/* Toolbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 border border-border rounded-lg px-3 py-2 bg-card text-sm text-card-foreground">
              <span className="text-muted-foreground">show</span>
              <select value={pelatihanPerPage} onChange={(e) => { setPelatihanPerPage(Number(e.target.value)); setPelatihanPage(1); }} className="bg-transparent text-card-foreground focus:outline-none ml-1 text-sm">
                <option value={5}>5</option><option value={10}>10</option><option value={20}>20</option><option value={30}>30</option><option value={50}>50</option>
              </select>
            </div>
            <button onClick={() => setShowTambahPelatihan(true)} className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              <span className="text-lg leading-none">+</span>
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" value={pelatihanSearch} onChange={(e) => { setPelatihanSearch(e.target.value); setPelatihanPage(1); }} placeholder="Cari pelatihan..." className="pl-9 pr-4 py-2 rounded-lg bg-card border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm w-56" />
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {tabs.map(t => (
            <div key={t.key} className={`p-4 rounded-xl border cursor-pointer transition-all ${pelatihanTab === t.key ? 'bg-primary text-primary-foreground border-primary' : 'bg-card border-border hover:bg-muted/40'}`} onClick={() => { setPelatihanTab(t.key); setPelatihanPage(1); }}>
              <GraduationCap className={`w-5 h-5 mb-2 ${pelatihanTab === t.key ? 'text-primary-foreground' : 'text-primary'}`} />
              <p className={`text-xs ${pelatihanTab === t.key ? 'text-primary-foreground' : 'text-card-foreground'}`}>{t.label}</p>
            </div>
          ))}
        </div>

        {/* Modal Tambah */}
        {showTambahPelatihan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowTambahPelatihan(false)}>
            <div className="bg-card rounded-2xl shadow-xl p-6 w-full max-w-lg mx-4 space-y-4" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between">
                <h4 className="text-base text-card-foreground">Tambah {tabs.find(t => t.key === pelatihanTab)?.label}</h4>
                <button onClick={() => setShowTambahPelatihan(false)} className="text-muted-foreground hover:text-card-foreground text-xl leading-none">✕</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="text-xs text-muted-foreground mb-1.5 block">Nama</label>
                  <input type="text" value={newPelatihanForm.nama} onChange={(e) => setNewPelatihanForm({ ...newPelatihanForm, nama: e.target.value })} placeholder="Masukkan nama" className="w-full px-3 py-2 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Tanggal</label>
                  <input type="date" value={newPelatihanForm.tanggal} onChange={(e) => setNewPelatihanForm({ ...newPelatihanForm, tanggal: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Kapasitas Peserta</label>
                  <input type="number" value={newPelatihanForm.kapasitas} onChange={(e) => setNewPelatihanForm({ ...newPelatihanForm, kapasitas: e.target.value })} placeholder="0" min="1" className="w-full px-3 py-2 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs text-muted-foreground mb-1.5 block">Lokasi</label>
                  <input type="text" value={newPelatihanForm.lokasi} onChange={(e) => setNewPelatihanForm({ ...newPelatihanForm, lokasi: e.target.value })} placeholder="Masukkan lokasi" className="w-full px-3 py-2 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs text-muted-foreground mb-1.5 block">Nama Pemesan</label>
                  <input type="text" value={newPelatihanForm.namaPemesan} onChange={(e) => setNewPelatihanForm({ ...newPelatihanForm, namaPemesan: e.target.value })} placeholder="Nama orang yang memesan" className="w-full px-3 py-2 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs text-muted-foreground mb-1.5 block">Deskripsi</label>
                  <textarea value={newPelatihanForm.deskripsi} onChange={(e) => setNewPelatihanForm({ ...newPelatihanForm, deskripsi: e.target.value })} placeholder="Deskripsi singkat" rows={3} className="w-full px-3 py-2 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
                </div>
              </div>
              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => {
                    if (!newPelatihanForm.nama) return;
                    const entry = { id: Date.now(), nama: newPelatihanForm.nama, tanggal: newPelatihanForm.tanggal || '-', lokasi: newPelatihanForm.lokasi || '-', kapasitas: Number(newPelatihanForm.kapasitas) || 0, peserta: 0, status: 'Akan Datang', durasi: '-', level: 'Dasar', usia: 'Semua usia', namaPemesan: newPelatihanForm.namaPemesan };
                    if (pelatihanTab === 'jadwal') setJadwalList([...jadwalList, entry]);
                    else if (pelatihanTab === 'training-camp') setTrainingCampList([...trainingCampList, entry]);
                    else if (pelatihanTab === 'wisata-literasi') setWisataList([...wisataList, entry]);
                    else if (pelatihanTab === 'kelas-budidaya') setBudidayaList([...budidayaList, entry]);
                    else if (tematikTab === 'sains') setSainsList([...sainsList, entry]);
                    else setBerkebunList([...berkebunList, entry]);
                    setNewPelatihanForm({ nama: '', tanggal: '', lokasi: '', kapasitas: '', deskripsi: '', namaPemesan: '' });
                    setShowTambahPelatihan(false);
                  }}
                  className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
                >Simpan</button>
                <button onClick={() => setShowTambahPelatihan(false)} className="flex-1 py-2 bg-muted text-card-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm">Batal</button>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content */}
        {pelatihanTab === 'jadwal' && (() => {
          const filteredJadwal = jadwalList.filter(x => x.nama.toLowerCase().includes(pelatihanSearch.toLowerCase()));
          const totalJ = Math.max(1, Math.ceil(filteredJadwal.length / pelatihanPerPage));
          const paginatedJ = filteredJadwal.slice((pelatihanPage - 1) * pelatihanPerPage, pelatihanPage * pelatihanPerPage);
          return (
            <>
              {lihatPesertaJadwal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => { setLihatPesertaJadwal(null); setNewPesertaForm({ nama: '', noHp: '' }); }}>
                  <div className="bg-card rounded-2xl shadow-xl p-6 w-full max-w-lg mx-4 space-y-4" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-base text-card-foreground">Daftar Peserta</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">{lihatPesertaJadwal.nama}</p>
                      </div>
                      <button onClick={() => { setLihatPesertaJadwal(null); setNewPesertaForm({ nama: '', noHp: '' }); }} className="text-muted-foreground hover:text-card-foreground text-xl leading-none">✕</button>
                    </div>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {(jadwalPeserta[lihatPesertaJadwal.id] || []).length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-4">Belum ada peserta terdaftar</p>
                      ) : (
                        (jadwalPeserta[lihatPesertaJadwal.id] || []).map((p) => (
                          <div key={p.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div>
                              <p className="text-sm text-card-foreground">{p.nama}</p>
                              <p className="text-xs text-muted-foreground">{p.noHp}</p>
                            </div>
                            <button
                              onClick={() => setJadwalPeserta(prev => ({ ...prev, [lihatPesertaJadwal.id]: prev[lihatPesertaJadwal.id].filter(x => x.id !== p.id) }))}
                              className="text-destructive hover:underline text-xs"
                            >Hapus</button>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="border-t border-border pt-4 space-y-3">
                      <p className="text-xs text-muted-foreground">Tambah Peserta Baru</p>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-muted-foreground mb-1.5 block">Nama</label>
                          <input type="text" value={newPesertaForm.nama} onChange={(e) => setNewPesertaForm({ ...newPesertaForm, nama: e.target.value })} placeholder="Nama peserta" className="w-full px-3 py-2 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground mb-1.5 block">No. HP</label>
                          <input type="tel" value={newPesertaForm.noHp} onChange={(e) => setNewPesertaForm({ ...newPesertaForm, noHp: e.target.value })} placeholder="08xxxxxxxxxx" className="w-full px-3 py-2 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          if (!newPesertaForm.nama) return;
                          const existing = jadwalPeserta[lihatPesertaJadwal.id] || [];
                          const newEntry = { id: Date.now(), nama: newPesertaForm.nama, noHp: newPesertaForm.noHp };
                          setJadwalPeserta(prev => ({ ...prev, [lihatPesertaJadwal.id]: [...existing, newEntry] }));
                          setJadwalList(jadwalList.map(j => j.id === lihatPesertaJadwal.id ? { ...j, peserta: existing.length + 1 } : j));
                          setNewPesertaForm({ nama: '', noHp: '' });
                        }}
                        className="w-full py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
                      >+ Tambah Peserta</button>
                    </div>
                  </div>
                </div>
              )}

              {editJadwal && editJadwalDraft && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setEditJadwal(null)}>
                  <div className="bg-card rounded-2xl shadow-xl p-6 w-full max-w-lg mx-4 space-y-4" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-between">
                      <h4 className="text-base text-card-foreground">Edit Jadwal</h4>
                      <button onClick={() => setEditJadwal(null)} className="text-muted-foreground hover:text-card-foreground text-xl leading-none">✕</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="text-xs text-muted-foreground mb-1.5 block">Nama Kegiatan</label>
                        <input type="text" value={editJadwalDraft.nama} onChange={(e) => setEditJadwalDraft({ ...editJadwalDraft, nama: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1.5 block">Tanggal</label>
                        <input type="date" value={editJadwalDraft.tanggal} onChange={(e) => setEditJadwalDraft({ ...editJadwalDraft, tanggal: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1.5 block">Kapasitas</label>
                        <input type="number" value={editJadwalDraft.kapasitas} onChange={(e) => setEditJadwalDraft({ ...editJadwalDraft, kapasitas: Number(e.target.value) })} min="0" className="w-full px-3 py-2 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-xs text-muted-foreground mb-1.5 block">Lokasi</label>
                        <input type="text" value={editJadwalDraft.lokasi} onChange={(e) => setEditJadwalDraft({ ...editJadwalDraft, lokasi: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1.5 block">Status</label>
                        <select value={editJadwalDraft.status} onChange={(e) => setEditJadwalDraft({ ...editJadwalDraft, status: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm">
                          <option>Akan Datang</option>
                          <option>Selesai</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-xs text-muted-foreground mb-1.5 block">Nama Pemesan</label>
                        <input type="text" value={editJadwalDraft.namaPemesan ?? ''} onChange={(e) => setEditJadwalDraft({ ...editJadwalDraft, namaPemesan: e.target.value })} placeholder="Nama orang yang memesan" className="w-full px-3 py-2 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
                      </div>
                    </div>
                    <div className="flex gap-3 pt-1">
                      <button onClick={() => { setJadwalList(jadwalList.map(x => x.id === editJadwal.id ? editJadwalDraft : x)); setEditJadwal(null); }} className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm">Simpan</button>
                      <button onClick={() => setEditJadwal(null)} className="flex-1 py-2 bg-muted text-card-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm">Batal</button>
                    </div>
                  </div>
                </div>
              )}
              <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/40 border-b border-border">
                        <th className="text-left py-3 px-4 text-muted-foreground">Nama Kegiatan</th>
                        <th className="text-left py-3 px-4 text-muted-foreground">Nama Pemesan</th>
                        <th className="text-left py-3 px-4 text-muted-foreground">Tanggal</th>
                        <th className="text-left py-3 px-4 text-muted-foreground">Lokasi</th>
                        <th className="text-left py-3 px-4 text-muted-foreground">Peserta</th>
                        <th className="text-left py-3 px-4 text-muted-foreground">Status</th>
                        <th className="text-left py-3 px-4 text-muted-foreground">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {paginatedJ.map((x) => (
                        <tr key={x.id} className="hover:bg-muted/20 transition-colors">
                          <td className="py-3 px-4 text-card-foreground">{x.nama}</td>
                          <td className="py-3 px-4 text-card-foreground">{x.namaPemesan || '-'}</td>
                          <td className="py-3 px-4 text-muted-foreground">{x.tanggal}</td>
                          <td className="py-3 px-4 text-muted-foreground">{x.lokasi}</td>
                          <td className="py-3 px-4 text-card-foreground">{x.peserta}/{x.kapasitas}</td>
                          <td className="py-3 px-4"><span className={`px-2 py-0.5 rounded text-xs ${x.status === 'Selesai' ? 'bg-accent/30 text-primary' : 'bg-secondary/20 text-primary'}`}>{x.status}</span></td>
                          <td className="py-3 px-4">

                            <button onClick={() => { setEditJadwal(x); setEditJadwalDraft({ ...x }); }} className="text-primary hover:underline text-xs mr-2">Edit</button>
                            <button onClick={() => setJadwalList(jadwalList.filter(j => j.id !== x.id))} className="text-destructive hover:underline text-xs">Hapus</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-6 py-3 border-t border-border flex items-center gap-1">
                  <button onClick={() => setPelatihanPage(p => Math.max(1, p - 1))} className="w-7 h-7 flex items-center justify-center rounded hover:bg-muted transition-colors text-muted-foreground">‹</button>
                  {Array.from({ length: totalJ }, (_, i) => i + 1).map(p => (
                    <button key={p} onClick={() => setPelatihanPage(p)} className={`w-7 h-7 flex items-center justify-center rounded text-sm ${pelatihanPage === p ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'}`}>{p}</button>
                  ))}
                  <button onClick={() => setPelatihanPage(p => Math.min(totalJ, p + 1))} className="w-7 h-7 flex items-center justify-center rounded hover:bg-muted transition-colors text-muted-foreground">›</button>
                </div>
              </div>
            </>
          );
        })()}

        {pelatihanTab === 'training-camp' && (
          <PaginatedTable
            headers={['Nama Training', 'Tanggal', 'Durasi', 'Lokasi', 'Peserta', 'Status']}
            rows={trainingCampList.filter(x => x.nama.toLowerCase().includes(pelatihanSearch.toLowerCase())).map(x => [
              x.nama, x.tanggal, x.durasi, x.lokasi, x.peserta,
              <span className={`px-2 py-0.5 rounded text-xs ${x.status === 'Selesai' ? 'bg-accent/30 text-primary' : 'bg-secondary/20 text-primary'}`}>{x.status}</span>
            ])}
            onHapus={(id) => setTrainingCampList(trainingCampList.filter(x => x.id !== id))}
          />
        )}

        {pelatihanTab === 'wisata-literasi' && (
          <PaginatedTable
            headers={['Nama Wisata', 'Tanggal', 'Lokasi', 'Peserta', 'Status']}
            rows={wisataList.filter(x => x.nama.toLowerCase().includes(pelatihanSearch.toLowerCase())).map(x => [
              x.nama, x.tanggal, x.lokasi, x.peserta,
              <span className={`px-2 py-0.5 rounded text-xs ${x.status === 'Selesai' ? 'bg-accent/30 text-primary' : 'bg-secondary/20 text-primary'}`}>{x.status}</span>
            ])}
            onHapus={(id) => setWisataList(wisataList.filter(x => x.id !== id))}
          />
        )}

        {pelatihanTab === 'kelas-budidaya' && (
          <PaginatedTable
            headers={['Nama Kelas', 'Tanggal', 'Lokasi', 'Peserta', 'Level']}
            rows={budidayaList.filter(x => x.nama.toLowerCase().includes(pelatihanSearch.toLowerCase())).map(x => [
              x.nama, x.tanggal, x.lokasi, `${x.peserta}/${x.kapasitas}`,
              <span className="px-2 py-0.5 rounded text-xs bg-primary/10 text-primary">{x.level}</span>
            ])}
            onHapus={(id) => setBudidayaList(budidayaList.filter(x => x.id !== id))}
          />
        )}

        {pelatihanTab === 'pembelajaran-tematik' && (
          <div className="space-y-4">
            <div className="flex gap-1 bg-muted/50 p-1 rounded-xl w-fit">
              <button onClick={() => setTematikTab('sains')} className={`px-4 py-2 rounded-lg text-sm transition-all ${tematikTab === 'sains' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-card-foreground'}`}>Kelas Sains</button>
              <button onClick={() => setTematikTab('berkebun')} className={`px-4 py-2 rounded-lg text-sm transition-all ${tematikTab === 'berkebun' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-card-foreground'}`}>Kelas Berkebun</button>
            </div>
            {tematikTab === 'sains' && (
              <PaginatedTable
                headers={['Nama Kelas', 'Tanggal', 'Lokasi', 'Peserta', 'Usia']}
                rows={sainsList.filter(x => x.nama.toLowerCase().includes(pelatihanSearch.toLowerCase())).map(x => [x.nama, x.tanggal, x.lokasi, x.peserta, x.usia])}
                onHapus={(id) => setSainsList(sainsList.filter(x => x.id !== id))}
              />
            )}
            {tematikTab === 'berkebun' && (
              <PaginatedTable
                headers={['Nama Kelas', 'Tanggal', 'Lokasi', 'Peserta', 'Usia']}
                rows={berkebunList.filter(x => x.nama.toLowerCase().includes(pelatihanSearch.toLowerCase())).map(x => [x.nama, x.tanggal, x.lokasi, x.peserta, x.usia])}
                onHapus={(id) => setBerkebunList(berkebunList.filter(x => x.id !== id))}
              />
            )}
          </div>
        )}
      </div>
    );
  };

  const renderRiwayatPelatihan = () => {
    const allSelesai = [
      ...jadwalList.filter(x => x.status === 'Selesai').map(x => ({ ...x, kategori: 'Jadwal' })),
      ...trainingCampList.filter(x => x.status === 'Selesai').map(x => ({ ...x, kategori: 'Training Camp' })),
      ...wisataList.filter(x => x.status === 'Selesai').map(x => ({ ...x, kategori: 'Wisata Literasi' })),
      ...budidayaList.filter(x => x.status === 'Selesai').map(x => ({ ...x, kategori: 'Kelas Budidaya' })),
    ];
    const filtered = allSelesai.filter(x =>
      x.nama.toLowerCase().includes(riwayatPelatihanSearch.toLowerCase()) ||
      x.kategori.toLowerCase().includes(riwayatPelatihanSearch.toLowerCase())
    );
    const totalPages = Math.max(1, Math.ceil(filtered.length / riwayatPelatihanPerPage));
    const paginated = filtered.slice((riwayatPelatihanPage - 1) * riwayatPelatihanPerPage, riwayatPelatihanPage * riwayatPelatihanPerPage);

    return (
      <div className="space-y-6">
        {/* Toolbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 border border-border rounded-lg px-3 py-2 bg-card text-sm text-card-foreground">
              <span className="text-muted-foreground">show</span>
              <select value={riwayatPelatihanPerPage} onChange={(e) => { setRiwayatPelatihanPerPage(Number(e.target.value)); setRiwayatPelatihanPage(1); }} className="bg-transparent text-card-foreground focus:outline-none ml-1 text-sm">
                <option value={5}>5</option><option value={10}>10</option><option value={20}>20</option><option value={30}>30</option><option value={50}>50</option>
              </select>
            </div>
            <button onClick={() => alert('Data Riwayat Pelatihan berhasil diekspor ke Excel!')} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors">Export Excel</button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" value={riwayatPelatihanSearch} onChange={(e) => { setRiwayatPelatihanSearch(e.target.value); setRiwayatPelatihanPage(1); }} placeholder="Cari riwayat..." className="pl-9 pr-4 py-2 rounded-lg bg-card border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm w-56" />
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Riwayat" value={allSelesai.length.toString()} icon={GraduationCap} color="primary" />
          <StatCard title="Total Peserta" value={allSelesai.reduce((s, x) => s + (x.peserta || 0), 0).toString()} icon={Users} color="secondary" />
          <StatCard title="Kategori Aktif" value="4" icon={GraduationCap} color="accent" />
        </div>

        {/* Table */}
        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h3 className="text-base text-card-foreground">Riwayat Pelatihan Selesai</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: '#7DCE94' }}>
                  <th className="text-left py-3 px-4 text-white">No.</th>
                  <th className="text-left py-3 px-4 text-white">Nama Kegiatan</th>
                  <th className="text-left py-3 px-4 text-white">Kategori</th>
                  <th className="text-left py-3 px-4 text-white">Tanggal</th>
                  <th className="text-left py-3 px-4 text-white">Lokasi</th>
                  <th className="text-left py-3 px-4 text-white">Peserta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paginated.length === 0 ? (
                  <tr><td colSpan={6} className="py-8 text-center text-muted-foreground text-sm">Belum ada riwayat pelatihan</td></tr>
                ) : (
                  paginated.map((x, idx) => (
                    <tr key={`${x.kategori}-${x.id}`} className="hover:bg-muted/20 transition-colors">
                      <td className="py-3 px-4 text-muted-foreground">{(riwayatPelatihanPage - 1) * riwayatPelatihanPerPage + idx + 1}</td>
                      <td className="py-3 px-4 text-card-foreground">{x.nama}</td>
                      <td className="py-3 px-4"><span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs">{x.kategori}</span></td>
                      <td className="py-3 px-4 text-muted-foreground">{x.tanggal}</td>
                      <td className="py-3 px-4 text-muted-foreground">{x.lokasi}</td>
                      <td className="py-3 px-4 text-card-foreground">{x.peserta} orang</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 border-t border-border flex items-center gap-1">
            <button onClick={() => setRiwayatPelatihanPage(p => Math.max(1, p - 1))} className="w-7 h-7 flex items-center justify-center rounded hover:bg-muted transition-colors text-muted-foreground">‹</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setRiwayatPelatihanPage(p)} className={`w-7 h-7 flex items-center justify-center rounded text-sm ${riwayatPelatihanPage === p ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'}`}>{p}</button>
            ))}
            <button onClick={() => setRiwayatPelatihanPage(p => Math.min(totalPages, p + 1))} className="w-7 h-7 flex items-center justify-center rounded hover:bg-muted transition-colors text-muted-foreground">›</button>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'manajemen-user': return renderManajemenUser();
      case 'data-user': return renderDataUser();
      case 'data-nasabah': return renderNasabah();
      case 'setoran-masuk': return renderSetoranMasuk();
      case 'draft-setoran': return renderDraftSetoran();
      case 'pengelolaan-sampah': return renderSampah();
      case 'pengelolaan-pupuk': return renderPupuk();
      case 'penarikan-uang': return renderPenarikanUang();
      case 'riwayat-penarikan': return renderRiwayatPenarikan();
      case 'pengelolaan-produk': return renderPengelolaanProduk();
      case 'tambah-produk': return renderTambahProduk();
      case 'pelatihan': return renderPelatihan();
      case 'riwayat-pelatihan': return renderRiwayatPelatihan();
      case 'manajemen-ifk': return renderManajemenIFK();
      case 'kurikulum-hijau': return renderKurikulumHijau();
      case 'laporan': return renderLaporan();
      default: return renderDashboard();
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar activeMenu={activeMenu} onMenuClick={setActiveMenu} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar activeMenu={activeMenu} />

        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}