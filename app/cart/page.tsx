'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function CartPage() {
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    totalPrice, 
    totalItems, 
    clearCart 
  } = useCart();
  
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // If cart is empty
  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-7xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Your Cart is Empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added any items yet.</p>
          <p className="text-sm text-gray-400 mb-6">Start exploring our premium collection at SpaceFly! 🚀</p>
          <Link
            href="/products"
            className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition font-semibold"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          🛒 Shopping Cart
          <span className="text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </span>
        </h1>
        <p className="text-gray-500">Review your items before checkout</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <span className="font-semibold text-gray-600">Product</span>
              <div className="flex items-center gap-8">
                <span className="font-semibold text-gray-600 hidden sm:inline">Quantity</span>
                <span className="font-semibold text-gray-600">Total</span>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="divide-y divide-gray-200">
              {items.map((item) => (
                <div key={item.id} className="p-4 hover:bg-gray-50 transition">
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    {/* Product Image & Name */}
                    <div className="flex items-center gap-4 flex-1 w-full sm:w-auto">
                      <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80x80?text=Product';
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 truncate">{item.name}</h3>
                        <p className="text-sm text-gray-500">Rs. {item.price.toLocaleString()}</p>
                        <p className="text-xs text-gray-400">Stock: {item.stock} available</p>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 sm:ml-auto">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 transition flex items-center justify-center text-lg font-bold"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                        className={`w-8 h-8 rounded-full transition flex items-center justify-center text-lg font-bold ${
                          item.quantity >= item.stock 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                            : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                      >
                        +
                      </button>
                    </div>

                    {/* Item Total & Remove */}
                    <div className="flex items-center gap-4 sm:ml-auto">
                      <span className="font-bold text-green-600 min-w-[80px] text-right">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 transition text-sm"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row gap-3 justify-between items-center">
              <button
                onClick={clearCart}
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                🗑️ Clear Cart
              </button>
              <Link
                href="/products"
                className="text-purple-600 hover:text-purple-700 text-sm font-medium"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">📊 Order Summary</h2>
            
            <div className="space-y-3 mb-4">
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
                <span className="font-semibold">{totalItems}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-purple-600">Rs. {totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition text-center block font-semibold"
            >
              Proceed to Checkout →
            </Link>

            {/* Trust Badges */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-center gap-4 text-xs text-gray-500">
                <span>🔒 Secure Checkout</span>
                <span>🚚 Free Delivery</span>
                <span>💎 Premium Quality</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
