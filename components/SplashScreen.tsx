'use client';

import { useEffect, useState } from "react";

export default function SplashScreen(){

const [show,setShow] = useState(true);


useEffect(()=>{

const timer=setTimeout(()=>{

setShow(false);

},3000);


return ()=>clearTimeout(timer);


},[]);



if(!show) return null;



return (

<div className="
fixed
inset-0
z-[9999]
flex
items-center
justify-center
overflow-hidden
bg-gradient-to-br
from-blue-600
via-purple-600
to-pink-600
">


{/* floating lights */}

<div className="
absolute
w-72
h-72
bg-yellow-300
rounded-full
blur-3xl
opacity-40
top-10
left-10
animate-pulse
"/>


<div className="
absolute
w-96
h-96
bg-cyan-300
rounded-full
blur-3xl
opacity-30
bottom-10
right-10
animate-pulse
"/>





{/* Logo Card */}

<div className="
relative
bg-white/20
backdrop-blur-xl
border
border-white/30
rounded-[40px]
px-16
py-12
text-center
shadow-2xl
animate-[zoom_1s_ease]
">



<div className="
text-8xl
mb-5
animate-bounce
">

🚀

</div>



<h1 className="
text-6xl
font-black
text-white
tracking-wide
">

SpaceFly

</h1>



<p className="
mt-4
text-white/90
text-xl
font-medium
">

Premium Shopping Experience

</p>




<div className="
flex
justify-center
gap-3
mt-8
">

<span className="
w-3
h-3
bg-white
rounded-full
animate-bounce
"/>

<span className="
w-3
h-3
bg-white
rounded-full
animate-bounce
[animation-delay:200ms]
"/>

<span className="
w-3
h-3
bg-white
rounded-full
animate-bounce
[animation-delay:400ms]
"/>


</div>



</div>



</div>


)

}
