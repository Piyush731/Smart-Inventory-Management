import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';

const salesData = [
  { month: 'Jan', sales: 4000, orders: 2400 },
  { month: 'Feb', sales: 3000, orders: 1398 },
  { month: 'Mar', sales: 2000, orders: 9800 },
  { month: 'Apr', sales: 2780, orders: 3908 },
  { month: 'May', sales: 1890, orders: 4800 },
  { month: 'Jun', sales: 2390, orders: 3800 },
];

const inventoryData = [
  { category: 'Electronics', value: 400 },
  { category: 'Clothing', value: 300 },
  { category: 'Food', value: 200 },
  { category: 'Books', value: 278 },
  { category: 'Toys', value: 189 },
];

const stats = [
  {
    name: 'Total Sales',
    value: '$24,000',
    change: '+12%',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Total Orders',
    value: '1,234',
    change: '+8%',
    icon: ShoppingCartIcon,
  },
  {
    name: 'Inventory Value',
    value: '$45,678',
    change: '+5%',
    icon: ChartBarIcon,
  },
  {
    name: 'Growth Rate',
    value: '15%',
    change: '+3%',
    icon: ArrowTrendingUpIcon,
  },
];

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('monthly');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/30 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-white/20"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-primary-50">
                  <Icon className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <div className="flex items-center">
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    <span className="ml-2 text-sm text-green-600">{stat.change}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white/30 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-white/20"
        >
          <h2 className="text-lg font-medium text-gray-900 mb-4">Sales & Orders</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" name="Sales" />
                <Line type="monotone" dataKey="orders" stroke="#82ca9d" name="Orders" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white/30 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-white/20"
        >
          <h2 className="text-lg font-medium text-gray-900 mb-4">Inventory by Category</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={inventoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" name="Items" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics; 