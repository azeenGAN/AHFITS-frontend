import { Filter } from 'lucide-react';
import type { Order } from './types';

const orders: Order[] = [
  {
    id: '1',
    customer: {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      address: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      }
    },
    products: [
      {
        productId: '1',
        name: 'Custom Air Max',
        quantity: 1,
        price: 299.99,
        size: 'US 10'
      }
    ],
    totalAmount: 299.99,
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2024-03-15'),
    trackingNumber: '1Z999AA1234567890'
  }
];

export default function Orders() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg bg-white">
          <Filter className="w-5 h-5" />
          <span>Filters</span>
        </button>
      </div>

   

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-200">
              <th className="px-6 py-4 font-semibold">Order ID</th>
              <th className="px-6 py-4 font-semibold">Customer</th>
              <th className="px-6 py-4 font-semibold">Products</th>
              <th className="px-6 py-4 font-semibold">Total</th>        
              <th className="px-6 py-4 font-semibold">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-gray-100">
                <td className="px-6 py-4">#{order.id}</td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium">{order.customer.name}</p>
                    <p className="text-sm text-gray-500">{order.customer.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    {order.products.map((product) => (
                      <p key={product.productId} className="text-sm">
                        {product.quantity}x {product.name}
                      </p>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">${order.totalAmount.toFixed(2)}</td>
             
                <td className="px-6 py-4">
                  {order.createdAt.toLocaleDateString('en-PK', {
  timeZone: 'Asia/Karachi'})}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}