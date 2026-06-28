'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function OrderTrackPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (orderNumber) {
      // ✅ Updated: /api/orders/track/ use karein
      fetch(`/api/orders/track/${orderNumber}`)
        .then(res => {
          if (!res.ok) throw new Error('Order not found');
          return res.json();
        })
        .then(data => {
          setOrder(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
      setError('No order number provided');
    }
  }, [orderNumber]);

  // ... rest of the component
}
