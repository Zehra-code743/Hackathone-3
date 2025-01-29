'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/app/context/CartContext';
import Image from 'next/image';

// Skeleton Loader Component for the whole page
const SkeletonLoader = () => (
  <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg animate-pulse">
    <div className="h-10 bg-gray-300 rounded mb-4"></div>
    <div className="space-y-4">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="h-10 bg-gray-300 rounded"></div>
      ))}
    </div>
    <div className="mt-8">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="h-10 bg-gray-300 rounded mb-4"></div>
      ))}
    </div>
    <div className="mt-4">
      <div className="h-12 bg-gray-300 rounded"></div>
    </div>
  </div>
);

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    orderNotes: '',
    paymentMethod: 'cash-on-delivery',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // This will only run on the client
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, cart, totalPrice }),
      });

      await response.json();
      setLoading(false);

      if (!response.ok) {
        setMessage('✅ Order placed successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          address: '',
          city: '',
          state: '',
          zip: '',
          country: '',
          orderNotes: '',
          paymentMethod: 'credit-card',
        });
        clearCart();
      } else {
        setMessage('❌ Error placing order.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setLoading(false);
      setMessage('❌ Error placing order.');
    }
  };

  if (!isClient) {
    return null; // Prevent the component from rendering on the server
  }

  // If loading, show skeleton loader
  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
      {message && <p className="text-center text-green-600">{message}</p>}

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Cart Summary</h3>
          {cart.map((item) => (
            <div key={item._id} className="flex items-center mb-4 border-b pb-4">
              <Image src={item.image} alt={item.title} width={80} height={80} className="rounded" />
              <div className="ml-4 flex-1">
                <h4 className="text-md font-semibold">{item.title}</h4>
                <p className="text-gray-500">Quantity: {item.quantity}</p>
                <p className="text-gray-500">Price: ${item.price}</p>
                <p className="text-gray-500">Total: ${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
          <div className="flex justify-between text-lg font-bold mt-4">
            <p>Total Price</p>
            <p>${totalPrice.toFixed(2)}</p>
          </div>
        </div>
      )}

      {/* Billing Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <div className="col-span-2">
          <h3 className="text-lg font-medium">Billing Details</h3>
        </div>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          name="company"
          placeholder="Company (optional)"
          value={formData.company}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          name="address"
          placeholder="Street Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          name="zip"
          placeholder="ZIP Code"
          value={formData.zip}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <textarea
          name="orderNotes"
          placeholder="Order Notes (optional)"
          value={formData.orderNotes}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <div className="col-span-2">
          <label className="block text-sm font-medium">Payment Method</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="credit-card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="cash-on-delivery">Cash on Delivery</option>
          </select>
        </div>

        <button
          type="submit"
          className="col-span-2 bg-[#007580] text-white py-2 rounded-md hover:bg-[#224b4e]"
          disabled={loading}
        >
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
