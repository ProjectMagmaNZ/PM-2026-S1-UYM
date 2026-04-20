import { useEffect, useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const GenderDistributionChart = () => {
  const [data, setData] = useState([
    { name: 'Female', value: 0, color: '#8884d8' },
    { name: 'Male', value: 0, color: '#82ca9d' },
    { name: 'Unknown', value: 0, color: '#ffc658' },
  ]);

  const dominant = [...data].sort((a, b) => b.value - a.value)[0];

    useEffect(() => {
    fetch('http://localhost:3001/fb_page/demographics?dimension=gender&access_token=fake_token')
      .then((res) => res.json())
      .then((res) => {
        const values = res.data[0].values[0].value;
        const total = values.female + values.male + values.unknown || 1;

        const formatted = [
  { 
    name: 'Female', 
    value: (values.female / total) * 100, 
    color: '#8884d8' 
  },
  { 
    name: 'Male', 
    value: (values.male / total) * 100, 
    color: '#82ca9d' 
  },
  { 
    name: 'Unknown', 
    value: (values.unknown / total) * 100, 
    color: '#ffc658' 
  },
];

        setData(formatted);
      })
      .catch((err) => {
        console.error('Failed to fetch gender demographics:', err);
      });
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
      <h3 className="text-base font-black text-slate-900 mb-4">Gender Distribution</h3>
      <div className="flex-1 relative flex items-center justify-center">
        <div className="absolute text-center">
          <p className="text-3xl font-black text-slate-900">{dominant.value.toFixed(1)}%</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{dominant.name} Majority</p>
        </div>
        <ResponsiveContainer width="100%" height={210}>
          <PieChart>
            <Pie data={data} innerRadius={65} outerRadius={82} paddingAngle={5} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-3 mt-4">
        {data.map((item, i) => (
          <div key={i} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm font-bold text-slate-600">{item.name}</span>
            </div>
            <span className="text-sm font-black text-slate-900">{{item.value.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenderDistributionChart;
