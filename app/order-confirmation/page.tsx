'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';


function OrderConfirmationContent() {

  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber');

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    if(orderNumber){

      fetch(`/api/orders/track/${orderNumber}`)
      .then(res => res.json())
      .then(data => {
        setOrder(data);
        setLoading(false);
      })
      .catch(()=>{
        setLoading(false);
      });

    }else{
      setLoading(false);
    }

  },[orderNumber]);



  if(loading){
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl animate-spin">
            ⏳
          </div>
          <p className="mt-4 text-gray-600">
            Loading order...
          </p>
        </div>
      </div>
    )
  }



  if(!orderNumber){

    return(
      <div className="min-h-screen flex flex-col items-center justify-center">

        <div className="text-6xl">
          ❌
        </div>

        <h2 className="text-2xl font-bold mt-4">
          No Order Found
        </h2>

        <Link 
        href="/"
        className="mt-5 text-purple-600"
        >
          Go Home
        </Link>

      </div>
    )

  }



  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-indigo-50 px-5">

      <div className="
      bg-white 
      rounded-3xl 
      shadow-2xl 
      p-10 
      max-w-md 
      w-full 
      text-center
      ">


        <div className="text-7xl mb-5">
          🎉
        </div>


        <h1 className="
        text-3xl 
        font-bold 
        text-gray-800
        ">
          Order Confirmed
        </h1>


        <p className="text-gray-500 mt-3">
          Thank you for shopping with SpaceFly 🚀
        </p>



        <div className="
        mt-6
        p-5
        rounded-2xl
        bg-gradient-to-r 
        from-indigo-100 
        to-purple-100
        ">

          <p className="text-sm text-gray-600">
            Order Number
          </p>

          <p className="
          text-2xl 
          font-bold 
          text-purple-700
          ">
            {orderNumber}
          </p>

        </div>



        <Link
        href={`/order-track?orderNumber=${orderNumber}`}
        className="
        block
        mt-6
        bg-gradient-to-r 
        from-indigo-600 
        to-purple-600
        text-white
        py-3
        rounded-xl
        font-semibold
        hover:scale-105
        transition
        "
        >
          🚚 Track Order
        </Link>



        <Link
        href="/"
        className="
        block
        mt-4
        text-gray-500
        "
        >
          Continue Shopping
        </Link>


      </div>

    </div>

  );

}



export default function OrderConfirmationPage(){

  return(

    <Suspense 
    fallback={
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    }
    >

      <OrderConfirmationContent />

    </Suspense>

  )

}
