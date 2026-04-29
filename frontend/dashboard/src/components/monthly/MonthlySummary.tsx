import { useEffect, useState } from 'react';
import StatsCard from '../StatsCard';
import { KPIData } from '../../types';

const MonthlySummary = () => {
  const [kpis, setKpis] = useState<KPIData[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/kpi_summary?access_token=fake_token')
      .then((res) => res.json())
      .then((res) => {
        setKpis(res.data);
      })
      .catch((err) => {
        console.error('Failed to fetch KPI summary:', err);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {kpis.map((kpi, i) => (
        <StatsCard key={i} data={kpi} />
      ))}
    </div>
  );
};

export default MonthlySummary;
