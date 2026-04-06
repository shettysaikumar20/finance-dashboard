import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useDashboard } from '../context/DashboardContext';
import { incomeData } from '../data/mockData';

const Charts = () => {
  const { chartTimeRange, setChartTimeRange } = useDashboard();
  
  // Create mocked 1Y data dynamically from 6M
  const getChartData = () => {
    if (chartTimeRange === '6M') return incomeData;
    return [
      { name: 'Jul', amount: 3500 }, { name: 'Aug', amount: 3000 },
      { name: 'Sep', amount: 4800 }, { name: 'Oct', amount: 3500 },
      { name: 'Nov', amount: 5000 }, { name: 'Dec', amount: 5500 },
      ...incomeData
    ];
  };

  const currentData = getChartData();

  return (
    <div className="glass-panel p-6 animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-surface)' }}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-xl">Balance History</h3>
        <select 
          className="input-field" 
          style={{ width: '150px' }}
          value={chartTimeRange}
          onChange={(e) => setChartTimeRange(e.target.value)}
        >
          <option value="6M">Last 6 Months</option>
          <option value="1Y">This Year</option>
        </select>
      </div>
      
      <div style={{ flex: 1, minHeight: '250px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={currentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
              itemStyle={{ color: 'var(--text-primary)' }}
            />
            <Area type="monotone" dataKey="amount" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
