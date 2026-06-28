'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


export default function AdminOrders(){

const router = useRouter();

const [orders,setOrders] = useState<any[]>([]);
const [loading,setLoading] = useState(true);


useEffect(()=>{

const user = localStorage.getItem("user");

if(!user){
router.push("/admin/login");
return;
}

const admin = JSON.parse(user);

if(admin.role !== "admin"){
router.push("/admin/login");
return;
}

loadOrders();

},[]);



const loadOrders = async()=>{

try{

const res = await fetch("/api/orders");

const data = await res.json();

setOrders(data);


}catch(err){

console.log(err);

}

finally{

setLoading(false);

}

};





const updateStatus = async(id:string,status:string)=>{


await fetch(`/api/orders/${id}`,{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

orderStatus:status

})

});


loadOrders();


};





if(loading){

return(

<div className="min-h-screen flex items-center justify-center bg-gray-900">

<h1 className="text-white text-3xl">
🚀 Loading Orders...
</h1>

</div>

)

}




return(

<div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">


{/* Navbar */}

<nav className="p-5 bg-black/30 backdrop-blur-xl text-white shadow-xl">

<div className="flex justify-between items-center">

<Link 
href="/admin/dashboard"
className="text-3xl font-bold"
>

🚀 SpaceFly Admin

</Link>


<Link
href="/"
className="text-blue-300"
>

🏠 Store

</Link>


</div>

</nav>





<div className="p-6">


<h1 className="text-4xl font-bold text-white mb-8">

📦 Order Management

</h1>





<div className="grid gap-6">


{orders.map((order)=>(


<div

key={order._id}

className="
bg-white/10
backdrop-blur-xl
border
border-white/20
rounded-3xl
p-6
shadow-2xl
text-white
"


>



<div className="flex justify-between flex-wrap gap-4">


<div>

<h2 className="text-2xl font-bold">

#{order.orderNumber}

</h2>


<p className="text-gray-300">

📅 {new Date(order.createdAt).toLocaleDateString()}

</p>

</div>





<div>


<select

value={order.orderStatus}

onChange={(e)=>
updateStatus(
order._id,
e.target.value
)
}

className="
bg-black/40
border
border-white/30
rounded-xl
px-4
py-2
text-white
"


>

<option>Pending</option>
<option>Confirmed</option>
<option>Processing</option>
<option>Shipped</option>
<option>Delivered</option>
<option>Cancelled</option>


</select>


</div>


</div>







<div className="grid md:grid-cols-3 gap-5 mt-6">


<div className="bg-white/10 rounded-2xl p-4">


<h3 className="font-bold text-xl">

👤 Customer

</h3>


<p>
{order.customerName}
</p>

<p>
📞 {order.customerPhone}
</p>


</div>





<div className="bg-white/10 rounded-2xl p-4">


<h3 className="font-bold text-xl">

📍 Address

</h3>


<p>

{order.customerAddress}

</p>


</div>






<div className="bg-white/10 rounded-2xl p-4">


<h3 className="font-bold text-xl">

💳 Payment

</h3>


<p>
{order.paymentMethod}
</p>


<p>
Status: {order.paymentStatus}
</p>


</div>



</div>








<div className="mt-6 bg-black/20 rounded-2xl p-5">


<h3 className="text-xl font-bold mb-4">

🛒 Products Ordered

</h3>



{order.products?.map((product:any,index:number)=>(


<div

key={index}

className="
flex
justify-between
border-b
border-white/20
py-3
"


>


<div>

<p className="font-bold">

{product.name}

</p>


<p className="text-gray-300">

Quantity: {product.quantity}

</p>


</div>



<p>

Rs {product.price}

</p>



</div>



))}



</div>






<div className="mt-5 flex justify-between items-center">


<span className="text-xl">

💰 Total:

</span>


<span className="text-3xl font-bold text-green-400">

Rs {order.totalAmount.toLocaleString()}

</span>



</div>



</div>



))}


</div>


</div>


</div>


)

}
