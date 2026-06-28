'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerAddress: '',
    customerEmail: '',
    paymentMethod: 'COD',
    notes: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // If cart is empty, redirect to home
  if (items.length === 0) {
    router.push('/');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate form
    if (!formData.customerName || !formData.customerPhone || !formData.customerAddress) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      const orderData = {
        customerName: formData.customerName.trim(),
        customerPhone: formData.customerPhone.trim(),
        customerAddress: formData.customerAddress.trim(),
        customerEmail: formData.customerEmail?.trim() || '',
        paymentMethod: formData.paymentMethod,
        notes: formData.notes?.trim() || '',
        products: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      };

      console.log('📦 Sending order:', orderData);

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      console.log('📦 Response:', data);

      if (!response.ok) {
        throw new Error(data.error || data.details || 'Failed to place order');
      }

      clearCart();
      router.push(`/order-confirmation?orderNumber=${data.orderNumber}`);

    } catch (error: any) {
      console.error('❌ Order error:', error);
      setError(error.message || 'Failed to place order. Please try again.');
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          📝 Checkout
          <span className="text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {items.length} items
          </span>
        </h1>
        <p className="text-gray-500">Complete your order at SpaceFly 🚀</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Shipping Details</h2>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 flex items-center gap-2">
                <span>❌</span>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  placeholder="03XX-XXXXXXX"
                />
              </div>

              {/* Delivery Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="customerAddress"
                  value={formData.customerAddress}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  placeholder="House #, Street, City, Postal Code"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <input
                  type="email"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  placeholder="your@email.com"
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Method <span className="text-red-500">*</span>
                </label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                >
                  <option value="COD">💵 Cash on Delivery (COD)</option>
                  <option value="Bank Transfer">🏦 Bank Transfer</option>
                  <option value="JazzCash">📱 JazzCash</option>
                  <option value="EasyPaisa">📱 EasyPaisa</option>
                </select>
              </div>

              {/* Order Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order Notes <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none"
                  placeholder="Any special instructions or delivery notes..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span>
                    Placing Order...
                  </span>
                ) : (
                  `🚀 Place Order • Rs. ${totalPrice.toLocaleString()}`
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">📊 Order Summary</h2>
            
            {/* Products List */}
            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm py-2 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">{item.quantity}×</span>
                    <span className="text-gray-800">{item.name}</span>
                  </div>
                  <span className="font-semibold text-gray-800">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t pt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">Rs. {totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Delivery Charges</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Items</span>
                <span className="font-semibold">{items.length}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-purple-600">Rs. {totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Back to Cart */}
            <Link
              href="/cart"
              className="w-full text-center block mt-4 text-gray-500 hover:text-gray-700 text-sm transition"
            >
              ← Back to Cart
            </Link>

            {/* Trust Badges */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-xl">🔒</div>
                  <p className="text-xs text-gray-500">Secure</p>
                </div>
                <div>
                  <div className="text-xl">🚚</div>
                  <p className="text-xs text-gray-500">Free Delivery</p>
                </div>
                <div>
                  <div className="text-xl">💎</div>
                  <p className="text-xs text-gray-500">Premium Quality</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
