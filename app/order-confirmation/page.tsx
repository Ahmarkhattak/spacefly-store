'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderNumber) {
      // ✅ Updated: /api/orders/track/ use karein
      fetch(`/api/orders/track/${orderNumber}`)
        .then(res => res.json())
        .then(data => {
          setOrder(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [orderNumber]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!orderNumber) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="text-6xl mb-4">❌</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">No Order Found</h2>
        <Link href="/" className="text-purple-600 hover:underline">
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h1>
        <p className="text-gray-500 mb-4">Thank you for your order at SpaceFly! 🚀</p>
        
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600">Order Number</p>
          <p className="text-xl font-bold text-purple-600">{orderNumber}</p>
        </div>

        <div className="space-y-3">
          <Link
            href={`/order-track?orderNumber=${orderNumber}`}
            className="w-full block bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition font-semibold"
          >
            Track Order
          </Link>
          <Link
            href="/"
            className="w-full block text-gray-500 hover:text-gray-700 text-sm"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
