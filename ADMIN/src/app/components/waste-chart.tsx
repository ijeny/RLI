import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';

const monthlyData = [
  { month: 'Jan', sampah: 450 },
  { month: 'Feb', sampah: 520 },
  { month: 'Mar', sampah: 480 },
  { month: 'Apr', sampah: 610 },
  { month: 'Mei', sampah: 580 },
  { month: 'Jun', sampah: 670 },
];

const wasteCategories = [
  { name: 'Organik', value: 45, color: '#146C78' },
  { name: 'Plastik', value: 25, color: '#0E91A1' },
  { name: 'Kertas', value: 15, color: '#7DCE94' },
  { name: 'Logam', value: 10, color: '#5CB88F' },
  { name: 'Lainnya', value: 5, color: '#A8DDB5' },
];

export function WasteChart() {
  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg text-card-foreground">Statistik Pengiriman Sampah</h3>
        <p className="text-sm text-muted-foreground mt-1">Data 6 bulan terakhir</p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f5f4f0" />
            <XAxis
              dataKey="month"
              stroke="#146C78"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="#146C78"
              style={{ fontSize: '12px' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #f5f4f0',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: '12px' }}
            />
            <Bar dataKey="sampah" name="Sampah (kg)" fill="#146C78" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function WasteCategoryChart() {
  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg text-card-foreground">Kategori Sampah</h3>
        <p className="text-sm text-muted-foreground mt-1">Distribusi jenis sampah bulan ini</p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={wasteCategories}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {wasteCategories.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #f5f4f0',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 space-y-2">
        {wasteCategories.map((category) => (
          <div key={category.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span className="text-sm text-card-foreground">{category.name}</span>
            </div>
            <span className="text-sm text-muted-foreground">{category.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
