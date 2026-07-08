import { Award, Phone, MapPin } from "lucide-react";

interface Customer {
  id: number;
  name: string;
  address: string;
  phone: string;
  totalWaste: number;
  points: number;
}

const mockCustomers: Customer[] = [
  { id: 1, name: 'Budi Santoso', address: 'Jl. Merdeka No. 12, Jakarta', phone: '081234567890', totalWaste: 245, points: 1225 },
  { id: 2, name: 'Siti Nurhaliza', address: 'Jl. Sudirman No. 45, Bandung', phone: '081234567891', totalWaste: 189, points: 945 },
  { id: 3, name: 'Ahmad Fauzi', address: 'Jl. Gatot Subroto No. 78, Surabaya', phone: '081234567892', totalWaste: 312, points: 1560 },
  { id: 4, name: 'Dewi Lestari', address: 'Jl. Diponegoro No. 23, Yogyakarta', phone: '081234567893', totalWaste: 156, points: 780 },
  { id: 5, name: 'Rudi Hartono', address: 'Jl. Ahmad Yani No. 56, Semarang', phone: '081234567894', totalWaste: 278, points: 1390 },
];

export function CustomerTable() {
  return (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg text-card-foreground">Data Nasabah Terbaru</h3>
        <p className="text-sm text-muted-foreground mt-1">Daftar nasabah aktif sistem pengelolaan sampah</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-6 py-4 text-sm text-muted-foreground">Nama Nasabah</th>
              <th className="text-left px-6 py-4 text-sm text-muted-foreground">Alamat</th>
              <th className="text-left px-6 py-4 text-sm text-muted-foreground">No. HP</th>
              <th className="text-right px-6 py-4 text-sm text-muted-foreground">Total Sampah (kg)</th>
              <th className="text-right px-6 py-4 text-sm text-muted-foreground">Jumlah Saldo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mockCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm text-primary">{customer.name.charAt(0)}</span>
                    </div>
                    <span className="text-sm text-card-foreground">{customer.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {customer.address}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    {customer.phone}
                  </div>
                </td>
                <td className="px-6 py-4 text-right text-sm text-card-foreground">
                  {customer.totalWaste} kg
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-accent/30 rounded-full">
                    <span className="text-sm text-primary">Rp {customer.points.toLocaleString()}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-border">
        <button className="text-sm text-primary hover:underline">
          Lihat semua nasabah →
        </button>
      </div>
    </div>
  );
}
