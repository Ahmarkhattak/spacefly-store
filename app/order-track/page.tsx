'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';


function OrderTrackContent(){

  const searchParams = useSearchParams();

  const orderNumber = searchParams.get('orderNumber');

  const [order,setOrder] = useState<any>(null);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState('');



  useEffect(()=>{

    if(orderNumber){

      fetch(`/api/orders/track/${orderNumber}`)
      .then(res=>{

        if(!res.ok){
          throw new Error('Order not found');
        }

        return res.json();

      })
      .then(data=>{

        setOrder(data);
        setLoading(false);

      })
      .catch(err=>{

        setError(err.message);
        setLoading(false);

      });

    }else{

      setLoading(false);
      setError("No order number provided");

    }

  },[orderNumber]);



  if(loading){

    return(
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">
          ⏳ Loading order...
        </div>
      </div>
    )

  }



  if(error){

    return(

      <div className="min-h-screen flex flex-col items-center justify-center">

        <div className="text-6xl">
          ❌
        </div>

        <h1 className="text-2xl font-bold mt-4">
          {error}
        </h1>


        <Link
        href="/"
        className="mt-5 text-purple-600"
        >
          Back Home
        </Link>

      </div>

    )

  }



  return(

    <div className="
    min-h-screen
    bg-gradient-to-br
    from-purple-50
    via-white
    to-indigo-50
    p-6
    ">


      <div className="
      max-w-xl
      mx-auto
      bg-white
      rounded-3xl
      shadow-xl
      p-8
      ">


        <h1 className="
        text-3xl
        font-bold
        text-gray-800
        mb-5
        ">
          🚚 Track Order
        </h1>



        <div className="
        bg-purple-50
        rounded-xl
        p-5
        mb-5
        ">

          <p className="text-gray-500">
            Order Number
          </p>

          <p className="
          text-xl
          font-bold
          text-purple-700
          ">
            {orderNumber}
          </p>

        </div>



        {order && (

          <div className="space-y-3">


            <p className="text-gray-700">
              👤 Customer: {order.customerName}
            </p>


            <p className="text-gray-700">
              💰 Total: Rs {order.totalAmount}
            </p>


            <p className="text-gray-700">
              💳 Payment: {order.paymentMethod}
            </p>


            <div className="
            mt-5
            inline-block
            bg-green-100
            text-green-700
            px-5
            py-2
            rounded-full
            font-semibold
            ">
              {order.orderStatus}
            </div>


          </div>

        )}



      </div>

    </div>

  )

}



export default function OrderTrackPage(){

  return(

    <Suspense
    fallback={
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    }
    >

      <OrderTrackContent />

    </Suspense>

  )

}
