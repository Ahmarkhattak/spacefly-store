'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddProductPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Other',
    stock: '',
    image: ''
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          stock: Number(form.stock)
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || 'Product add failed');
        return;
      }

      alert('Product added successfully');
      router.push('/admin/products');

    } catch (error) {
      alert('Server error');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">

        <h1 className="text-3xl font-bold mb-6">
          Add Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            className="w-full border p-3 rounded"
            placeholder="Product Name"
            value={form.name}
            onChange={(e)=>setForm({...form,name:e.target.value})}
            required
          />


          <textarea
            className="w-full border p-3 rounded"
            placeholder="Description"
            value={form.description}
            onChange={(e)=>setForm({...form,description:e.target.value})}
            required
          />


          <input
            className="w-full border p-3 rounded"
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={(e)=>setForm({...form,price:e.target.value})}
            required
          />


          <select
            className="w-full border p-3 rounded"
            value={form.category}
            onChange={(e)=>setForm({...form,category:e.target.value})}
          >
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Books</option>
            <option>Home</option>
            <option>Beauty</option>
            <option>Sports</option>
            <option>Other</option>
          </select>


          <input
            className="w-full border p-3 rounded"
            placeholder="Stock"
            type="number"
            value={form.stock}
            onChange={(e)=>setForm({...form,stock:e.target.value})}
            required
          />


          <input
            className="w-full border p-3 rounded"
            placeholder="Image URL"
            value={form.image}
            onChange={(e)=>setForm({...form,image:e.target.value})}
          />


          <button
            disabled={loading}
            className="w-full bg-purple-600 text-white p-3 rounded"
          >
            {loading ? 'Adding...' : 'Add Product'}
          </button>


        </form>

      </div>

    </div>
  );
}
