import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const wasteManagementData = [
  { name: 'Sampahnya', value: 670 },
  { name: 'Produk Organiknya', value: 380 },
  { name: 'Air Lindinya', value: 450 },
];

export function WasteManagementChart() {
  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg text-card-foreground">Statistik Pengelolaan Sampah</h3>
        <p className="text-sm text-muted-foreground mt-1">Perbandingan hasil pengelolaan</p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={wasteManagementData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f5f4f0" />
            <XAxis
              dataKey="name"
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
            <Bar dataKey="value" name="Total (kg/liter)" fill="#146C78" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
