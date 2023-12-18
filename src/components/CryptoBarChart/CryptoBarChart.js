import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Январь', Bitcoin: 4000, Ethereum: 2400, amt: 2400 },
  { name: 'Февраль', Bitcoin: 3000, Ethereum: 1398, amt: 2210 },
  { name: 'Март', Bitcoin: 2000, Ethereum: 9800, amt: 2290 },
  { name: 'Апрель', Bitcoin: 2780, Ethereum: 3908, amt: 2000 },
  { name: 'Май', Bitcoin: 1890, Ethereum: 4800, amt: 2181 },
  { name: 'Июнь', Bitcoin: 2390, Ethereum: 3800, amt: 2500 },
  { name: 'Июль', Bitcoin: 3490, Ethereum: 4300, amt: 2100 },
];

const CryptoBarChart = () => (
  <BarChart
    width={500}
    height={300}
    data={data}
    margin={{
      top: 5, right: 30, left: 20, bottom: 5,
    }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="Bitcoin" fill="#8884d8" />
    <Bar dataKey="Ethereum" fill="#82ca9d" />
  </BarChart>
);

export default CryptoBarChart;
