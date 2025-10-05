// frontend/src/components/RSIChart.tsx

import React from 'react';
import { Line } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';

// Define the props for type safety
interface RsiChartProps {
  data: ChartData<'line'>;
  options: ChartOptions<'line'>;
}

const RSIChart: React.FC<RsiChartProps> = ({ data, options }) => {
  return (
    <div style={{ height: '350px' }}>
      {/* The Line component is wrapped, ready to be keyed in the parent */}
      <Line data={data} options={options} />
    </div>
  );
};

export default RSIChart;