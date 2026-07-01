'use client';

import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';
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


  const [loading,setLoading] = useState(false);
  const [error,setError] = useState('');


  useEffect(()=>{

    if(items.length === 0){
      router.push('/');
    }

  },[items,router]);



  const handleSubmit = async(e:React.FormEvent)=>{

    e.preventDefault();

    setLoading(true);
    setError('');



    if(
      !formData.customerName ||
      !formData.customerPhone ||
      !formData.customerAddress
    ){

      setError("Please fill all required fields");
      setLoading(false);
      return;

    }



    try{


      const orderData = {

        customerName: formData.customerName.trim(),

        customerPhone: formData.customerPhone.trim(),

        customerAddress: formData.customerAddress.trim(),

        customerEmail: formData.customerEmail.trim(),

        paymentMethod: formData.paymentMethod,

        notes: formData.notes.trim(),


        products: items.map(item=>({

          id:item.id,

          name:item.name,

          price:item.price,

          quantity:item.quantity

        }))

      };




      const response = await fetch('/api/orders',{

        method:'POST',

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify(orderData)

      });



      const data = await response.json();



      if(!response.ok){

        throw new Error(
          data.error || "Order failed"
        );

      }



      clearCart();


      router.push(
        `/order-confirmation?orderNumber=${data.orderNumber}`
      );



    }catch(err:any){

      setError(
        err.message || "Something went wrong"
      );

      setLoading(false);

    }


  };




  const handleChange = (
    e:React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  )=>{

    setFormData({

      ...formData,

      [e.target.name]:e.target.value

    });

  };





  return (

<div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 p-5">


<div className="max-w-6xl mx-auto">


<h1 className="text-4xl font-bold text-gray-800 mb-2">
🚀 SpaceFly Checkout
</h1>


<p className="text-gray-500 mb-8">
Complete your order securely
</p>




<div className="grid lg:grid-cols-3 gap-8">



<div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8">


<h2 className="text-2xl font-bold mb-6">
Shipping Details
</h2>



{error &&

<div className="bg-red-100 text-red-600 p-4 rounded-xl mb-5">
❌ {error}
</div>

}




<form
onSubmit={handleSubmit}
className="space-y-5"
>



<input
name="customerName"
placeholder="Full Name"
value={formData.customerName}
onChange={handleChange}
className="w-full border p-3 rounded-xl text-black"
required
/>



<input
name="customerPhone"
placeholder="Phone Number"
value={formData.customerPhone}
onChange={handleChange}
className="w-full border p-3 rounded-xl text-black"
required
/>



<input
name="customerAddress"
placeholder="Delivery Address"
value={formData.customerAddress}
onChange={handleChange}
className="w-full border p-3 rounded-xl text-black"
required
/>



<input
name="customerEmail"
placeholder="Email (optional)"
value={formData.customerEmail}
onChange={handleChange}
className="w-full border p-3 rounded-xl text-black"
/>



<select
name="paymentMethod"
value={formData.paymentMethod}
onChange={handleChange}
className="w-full border p-3 rounded-xl text-black"
>

<option>
💵 Cash on Delivery
</option>

<option>
JazzCash
</option>

<option>
EasyPaisa
</option>

<option>
Bank Transfer
</option>

</select>




<textarea
name="notes"
placeholder="Order notes"
value={formData.notes}
onChange={handleChange}
className="w-full border p-3 rounded-xl text-black"
/>




<button
disabled={loading}
className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-xl font-bold text-lg"
>

{
loading
?
"⏳ Placing Order..."
:
`🚀 Place Order • Rs ${totalPrice.toLocaleString()}`
}


</button>



</form>


</div>





<div className="bg-white rounded-3xl shadow-xl p-6 h-fit">


<h2 className="text-xl font-bold mb-5">
🛒 Order Summary
</h2>


{
items.map(item=>(

<div
key={item.id}
className="flex justify-between border-b py-3"
>

<span>
{item.quantity} × {item.name}
</span>


<span className="font-bold">
Rs {item.price * item.quantity}
</span>


</div>

))
}



<div className="mt-5 text-xl font-bold flex justify-between">

<span>
Total
</span>

<span className="text-purple-600">
Rs {totalPrice.toLocaleString()}
</span>


</div>




<Link
href="/cart"
className="block mt-5 text-center text-gray-500"
>
← Back Cart
</Link>



</div>



</div>


</div>

</div>

  );

}
