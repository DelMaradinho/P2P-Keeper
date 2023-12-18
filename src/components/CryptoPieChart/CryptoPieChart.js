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
    <PieChart width={600} height={400}>
      <Pie
        data={data}
        cx="50%" // Центр по горизонтали
        cy="50%" // Центр по вертикали
        innerRadius={50}
        outerRadius={120}
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
