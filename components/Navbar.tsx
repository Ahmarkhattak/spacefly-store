'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';

export default function Navbar() {

  const { totalItems } = useCart();
  const [user, setUser] = useState<any>(null);


  useEffect(() => {

    const userData = localStorage.getItem('user');

    if (userData) {
      setUser(JSON.parse(userData));
    }

  }, []);



  const handleLogout = () => {

    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';

  };



  return (

    <nav className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white shadow-lg">

      <div className="container mx-auto px-4 py-3">

        <div className="flex items-center justify-between">


          <Link href="/" className="flex items-center gap-2 text-2xl font-bold">

            <span className="text-3xl">🚀</span>

            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              SpaceFly
            </span>

          </Link>




          <div className="flex items-center gap-6">


            <Link href="/" className="hover:text-blue-300 transition">
              Home
            </Link>


            <Link href="/products" className="hover:text-blue-300 transition">
              Products
            </Link>



            <Link 
              href="/cart" 
              className="hover:text-blue-300 transition relative"
            >

              🛒 Cart

              {totalItems > 0 && (

                <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                  {totalItems}
                </span>

              )}

            </Link>





            {user ? (

              <div className="flex items-center gap-4">


                <span className="text-sm text-gray-300">
                  👋 {user.name}
                </span>



                {user.role === 'admin' && (

                  <Link
                    href="/admin/dashboard"
                    className="text-sm text-blue-400 hover:text-blue-300"
                  >
                    Admin
                  </Link>

                )}



                {user.role !== 'admin' && (

                  <Link
                    href="/my-orders"
                    className="text-sm text-green-400 hover:text-green-300"
                  >
                    📦 My Orders
                  </Link>

                )}




                <button

                  onClick={handleLogout}

                  className="text-sm text-red-400 hover:text-red-300"

                >

                  Logout

                </button>


              </div>


            ) : (


              <div className="flex items-center gap-3">


                <Link
                  href="/login"
                  className="hover:text-blue-300 transition"
                >
                  Login
                </Link>



                <Link

                  href="/register"

                  className="bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition text-sm"

                >

                  Register

                </Link>


              </div>


            )}


          </div>


        </div>


      </div>


    </nav>

  );

}
