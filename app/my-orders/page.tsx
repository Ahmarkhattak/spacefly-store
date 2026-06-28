'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


export default function MyOrders(){

  const router = useRouter();

  const [orders,setOrders] = useState<any[]>([]);
  const [user,setUser] = useState<any>(null);
  const [loading,setLoading] = useState(true);



  useEffect(()=>{

    const userData = localStorage.getItem("user");


    if(!userData){

      router.push("/login");
      return;

    }


    const userInfo = JSON.parse(userData);

    setUser(userInfo);



    fetch(`/api/orders?email=${userInfo.email}`)
    .then(res=>res.json())
    .then(data=>{

      setOrders(data);
      setLoading(false);

    })
    .catch(()=>{

      setLoading(false);

    });



  },[]);




  const getStep = (status:string)=>{

    const steps=[
      "Pending",
      "Confirmed",
      "Processing",
      "Shipped",
      "Delivered"
    ];

    return steps.indexOf(status);

  };




  if(loading){

    return(

      <div className="
      min-h-screen 
      flex 
      items-center 
      justify-center
      bg-gray-900
      text-white
      text-3xl
      ">

        🚀 Loading Dashboard...

      </div>

    )

  }





  return(

<div className="
min-h-screen
bg-gradient-to-br
from-gray-900
via-purple-900
to-indigo-900
p-6
">



{/* Profile */}

<div className="
bg-white/10
backdrop-blur-xl
rounded-3xl
p-6
text-white
shadow-2xl
mb-8
">


<h1 className="text-4xl font-bold">

👋 Welcome {user?.name}

</h1>


<p className="text-gray-300 mt-2">

Premium Customer Dashboard

</p>


<div className="mt-5 grid md:grid-cols-3 gap-4">


<div className="bg-white/10 p-4 rounded-2xl">

📦 Total Orders

<h2 className="text-3xl font-bold">

{orders.length}

</h2>

</div>



<div className="bg-white/10 p-4 rounded-2xl">

🚚 Active Orders

<h2 className="text-3xl font-bold">

{orders.filter(o=>o.orderStatus!=="Delivered").length}

</h2>

</div>



<div className="bg-white/10 p-4 rounded-2xl">

✅ Delivered

<h2 className="text-3xl font-bold">

{orders.filter(o=>o.orderStatus==="Delivered").length}

</h2>

</div>


</div>


</div>







<h2 className="
text-white
text-3xl
font-bold
mb-5
">

📦 My Orders

</h2>






{orders.length===0 ? (

<div className="
bg-white
rounded-3xl
p-8
text-center
">

<h2 className="text-2xl text-gray-800">

No Orders Yet

</h2>

</div>


):(


<div className="space-y-6">


{orders.map(order=>(


<div

key={order._id}

className="
bg-white/10
backdrop-blur-xl
rounded-3xl
p-6
text-white
shadow-2xl
"


>


<div className="flex justify-between flex-wrap">


<div>

<h2 className="text-2xl font-bold">

#{order.orderNumber}

</h2>


<p className="text-gray-300">

{new Date(order.createdAt).toDateString()}

</p>

</div>



<div className="
bg-green-500/20
px-4
py-2
rounded-full
">

{order.orderStatus}

</div>


</div>







{/* Timeline */}

<div className="mt-6">


<h3 className="font-bold mb-3">

🚚 Order Tracking

</h3>


<div className="flex justify-between text-sm">


{
["Pending","Confirmed","Processing","Shipped","Delivered"]
.map((step,index)=>(


<div 
key={step}
className={`
text-center
${index <= getStep(order.orderStatus)
? "text-green-400"
:"text-gray-500"}
`}
>


<div className="text-2xl">

●

</div>


{step}


</div>


))

}



</div>


</div>








<div className="
mt-6
bg-black/20
rounded-2xl
p-5
">


<h3 className="text-xl font-bold mb-3">

🛒 Products

</h3>



{order.products?.map((p:any,i:number)=>(


<div 
key={i}
className="
flex
justify-between
border-b
border-white/20
py-3
">


<div>

<b>{p.name}</b>

<p>
Qty: {p.quantity}
</p>

</div>



<p>

Rs {p.price}

</p>


</div>


))}


</div>







<div className="mt-5 grid md:grid-cols-2 gap-4">


<div className="
bg-white/10
p-4
rounded-2xl
">

💳 Payment

<br/>

{order.paymentMethod}

</div>




<div className="
bg-white/10
p-4
rounded-2xl
">

📍 Delivery Address

<br/>

{order.customerAddress}

</div>



</div>




</div>


))}


</div>


)}


</div>


)

}
