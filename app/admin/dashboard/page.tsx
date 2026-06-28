'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {

  const router = useRouter();


  useEffect(() => {

    const user = localStorage.getItem('user');

    if (!user) {
      router.push('/admin/login');
      return;
    }

    const admin = JSON.parse(user);

    if (admin.role !== 'admin') {
      router.push('/admin/login');
    }

  }, [router]);



  return (

    <div className="
    min-h-screen
    bg-gradient-to-br
    from-gray-900
    via-purple-900
    to-indigo-900
    p-8
    ">


      <div className="max-w-6xl mx-auto">


        <div className="
        bg-white/10
        backdrop-blur-xl
        rounded-3xl
        p-8
        text-white
        shadow-2xl
        mb-8
        ">

          <h1 className="text-5xl font-bold">
            🚀 Admin Dashboard
          </h1>

          <p className="text-gray-300 mt-3">
            SpaceFly Administration Panel
          </p>

        </div>




        <div className="
        grid
        md:grid-cols-4
        gap-6
        ">



          <Link href="/admin/products">

            <div className="
            bg-white
            p-6
            rounded-3xl
            shadow-xl
            hover:scale-105
            transition
            cursor-pointer
            ">

              <h2 className="text-xl font-bold text-gray-800">
                📦 Products
              </h2>

              <p className="text-gray-600">
                Manage products
              </p>

            </div>

          </Link>





          <Link href="/admin/orders">

            <div className="
            bg-white
            p-6
            rounded-3xl
            shadow-xl
            hover:scale-105
            transition
            cursor-pointer
            ">

              <h2 className="text-xl font-bold text-gray-800">
                🛒 Orders
              </h2>

              <p className="text-gray-600">
                Manage orders
              </p>

            </div>

          </Link>





          <Link href="/admin/users">

            <div className="
            bg-white
            p-6
            rounded-3xl
            shadow-xl
            hover:scale-105
            transition
            cursor-pointer
            ">

              <h2 className="text-xl font-bold text-gray-800">
                👥 Users
              </h2>

              <p className="text-gray-600">
                Manage users
              </p>

            </div>

          </Link>







          <Link href="/admin/change-password">

            <div className="
            bg-gradient-to-r
            from-red-500
            to-pink-600
            p-6
            rounded-3xl
            shadow-xl
            hover:scale-105
            transition
            cursor-pointer
            text-white
            ">


              <h2 className="text-xl font-bold">
                🔐 Password
              </h2>


              <p>
                Change admin password
              </p>


            </div>


          </Link>



        </div>






        <button

          onClick={() => {

            localStorage.removeItem('user');

            router.push('/admin/login');

          }}

          className="
          mt-8
          bg-red-600
          hover:bg-red-700
          text-white
          px-8
          py-3
          rounded-xl
          font-bold
          "

        >

          🚪 Logout

        </button>



      </div>


    </div>

  );

}
