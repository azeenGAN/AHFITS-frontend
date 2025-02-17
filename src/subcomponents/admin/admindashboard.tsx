import { 
 
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for the dashboard
const stats = [
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    change: '+20.1%',
    trend: 'up'
  },
  {
    title: 'Active Orders',
    value: '126',
    change: '+4.3%',
    trend: 'up'
  },
  {
    title: 'Total Customers',
    value: '2,838',
    change: '+12.5%',
    trend: 'up'
  },
  {
    title: 'Return Rate',
    value: '1.8%',
    change: '-0.5%',
    trend: 'down'
  }
];

const recentOrders = [
  { id: '1', customer: 'John Doe', amount: '$299.99'},
  { id: '2', customer: 'Jane Smith', amount: '$199.99'},
  { id: '3', customer: 'Mike Johnson', amount: '$399.99' }
];

const topProducts = [
  {
    id: '1',
    name: 'Custom Air Max',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3',
    sales: 245,
    revenue: 73500,
    growth: 12.5
  },
  {
    id: '2',
    name: 'Classic Runner',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    sales: 189,
    revenue: 47250,
    growth: 8.3
  },
  {
    id: '3',
    name: 'Urban Street',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86',
    sales: 156,
    revenue: 31200,
    growth: 15.7
  },
  {
    id: '4',
    name: 'Sport Elite',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa',
    sales: 134,
    revenue: 26800,
    growth: -2.4
  }
];

const revenueData = [
  { month: 'Jan', revenue: 35000 },
  { month: 'Feb', revenue: 42000 },
  { month: 'Mar', revenue: 38000 },
  { month: 'Apr', revenue: 45000 },
  { month: 'May', revenue: 51000 },
  { month: 'Jun', revenue: 48000 },
  { month: 'Jul', revenue: 55000 },
  { month: 'Aug', revenue: 62000 },
  { month: 'Sep', revenue: 58000 },
  { month: 'Oct', revenue: 65000 },
  { month: 'Nov', revenue: 71000 },
  { month: 'Dec', revenue: 78000 }
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <div className="flex space-x-2">
          <select className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
              </div>
              <span className={`flex items-center text-sm ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis 
                  tickFormatter={(value: number) => `$${value.toString()}`}
                />
                <Tooltip 
                  formatter={(value: number) => [`$${value.toString()}`, 'Revenue']}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Top Products</h3>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1">
              <option>By Revenue</option>
              <option>By Sales</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
                  <th className="pb-3 font-medium">Product</th>
                  <th className="pb-3 font-medium">Sales</th>
                  <th className="pb-3 font-medium">Revenue</th>
                  <th className="pb-3 font-medium">Growth</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product) => (
                  <tr key={product.id} className="border-b border-gray-100">
                    <td className="py-3">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-3">{product.sales}</td>
                    <td className="py-3">${product.revenue.toLocaleString()}</td>
                    <td className="py-3">
                      <span className={`flex items-center ${
                        product.growth >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {product.growth >= 0 ? (
                          <ArrowUpRight className="w-4 h-4 mr-1" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 mr-1" />
                        )}
                        {Math.abs(product.growth)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Recent Orders</h3>
        </div>
        <div className="p-6">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500">
                <th className="pb-4">Order ID</th>
                <th className="pb-4">Customer</th>
                <th className="pb-4">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-t border-gray-400">
                  <td className="py-4">#{order.id}</td>
                  <td className="py-4">{order.customer}</td>
                  <td className="py-4">{order.amount}</td>                
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}