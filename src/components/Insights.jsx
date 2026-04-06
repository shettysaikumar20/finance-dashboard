import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useDashboard } from '../context/DashboardContext';
import { TrendingUp, AlertCircle, Lightbulb } from 'lucide-react';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'];

const Insights = () => {
  const { pieChartData, highestSpendingCategory, totalExpense } = useDashboard();

  return (
    <div className="glass-panel p-6 animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-surface)' }}>
      <h3 className="font-bold text-xl mb-6">Spending Analysis</h3>
      
      <div style={{ height: '200px', marginBottom: '1.5rem' }}>
        {pieChartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => `$${value}`}
                contentStyle={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-muted">No expense data available</div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {highestSpendingCategory && (
          <div className="flex items-start gap-4 p-4 rounded-lg bg-danger-bg" style={{ backgroundColor: 'var(--danger-bg)' }}>
            <AlertCircle color="var(--danger)" size={24} style={{ flexShrink: 0 }} />
            <div>
              <h4 className="font-semibold text-danger mb-1">Highest Spending</h4>
              <p className="text-sm text-text-primary">
                Your highest expense category is <strong>{highestSpendingCategory.name}</strong> (${highestSpendingCategory.value}), making up {((highestSpendingCategory.value / totalExpense) * 100).toFixed(1)}% of your outgoings.
              </p>
            </div>
          </div>
        )}

        <div className="flex items-start gap-4 p-4 rounded-lg bg-success-bg" style={{ backgroundColor: 'var(--success-bg)' }}>
          <TrendingUp color="var(--success)" size={24} style={{ flexShrink: 0 }} />
          <div>
            <h4 className="font-semibold text-success mb-1">Good Progress</h4>
            <p className="text-sm text-text-primary">
              Your overall savings rate is healthy. Consider investing a portion of your positive balance!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
