'use client';

import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type RsiData = {
  token_address: string;
  price: number;
  rsi: number;
};

export default function Dashboard() {
  const [data, setData] = useState<RsiData[]>([]);
  const [selectedToken, setSelectedToken] = useState('TOKEN1');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3030/ws'); // Rust backend WS
    ws.onmessage = (event) => {
      const msg: RsiData = JSON.parse(event.data);
      setData((prev) => {
        const filtered = prev.filter(d => d.token_address !== msg.token_address);
        return [...filtered, msg];
      });
    };
    return () => ws.close();
  }, []);

  const tokenData = data.filter(d => d.token_address === selectedToken);

  const chartData = {
    labels: tokenData.map((_, i) => i + 1),
    datasets: [
      {
        label: 'Price (SOL)',
        data: tokenData.map(d => d.price),
        borderColor: 'blue',
        fill: false,
        tension: 0.3,
      },
      {
        label: 'RSI',
        data: tokenData.map(d => d.rsi),
        borderColor: 'red',
        fill: false,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: `Price & RSI for ${selectedToken}` },
    },
    scales: {
      y: { min: 0, max: 100 },
    },
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>YEBELO Trading Dashboard</h1>
      <div style={{ marginBottom: '1rem' }}>
        <label>Select Token: </label>
        <select value={selectedToken} onChange={e => setSelectedToken(e.target.value)}>
          {['TOKEN1','TOKEN2','TOKEN3','TOKEN4','TOKEN5'].map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <Line data={chartData} options={options} />

      {tokenData.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <p>Latest Price: <b>{tokenData[tokenData.length - 1].price.toFixed(2)} SOL</b></p>
          <p>Latest RSI: <b>{tokenData[tokenData.length - 1].rsi.toFixed(2)}</b></p>
        </div>
      )}
    </div>
  );
}
