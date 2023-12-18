import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Bitcoin', value: 40 },
  { name: 'Ethereum', value: 30 },
  { name: 'Ripple', value: 10 },
  { name: 'Litecoin', value: 20 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const CryptoPieChart = () => (
  <PieChart width={400} height={400}>
    <Pie
      data={data}
      cx={200}
      cy={200}
      innerRadius={60}
      outerRadius={80}
      fill="#8884d8"
      paddingAngle={5}
      dataKey="value"
      label
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
    <Legend />
  </PieChart>
);

export default CryptoPieChart;
