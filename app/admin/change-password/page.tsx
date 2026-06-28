'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ChangePasswordPage() {

  const router = useRouter();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");



  const changePassword = async (e: React.FormEvent) => {

    e.preventDefault();


    const user = JSON.parse(
      localStorage.getItem("user") || "{}"
    );


    const res = await fetch(
      "/api/admin/change-password",
      {
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          email:user.email,
          oldPassword,
          newPassword
        })
      }
    );


    const data = await res.json();


    if(res.ok){

      setMessage("✅ Password changed successfully");

      setTimeout(()=>{
        router.push("/admin/dashboard");
      },1500);


    }else{

      setMessage("❌ " + data.error);

    }

  };



  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">


      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">


        <h1 className="text-2xl font-bold mb-6 text-black">
          Change Admin Password
        </h1>



        {message && (
          <p className="mb-4 text-black">
            {message}
          </p>
        )}



        <form onSubmit={changePassword}>


          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e)=>setOldPassword(e.target.value)}
            className="w-full border p-3 rounded mb-4 text-black"
          />



          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e)=>setNewPassword(e.target.value)}
            className="w-full border p-3 rounded mb-4 text-black"
          />



          <button
            className="w-full bg-purple-600 text-white p-3 rounded"
          >
            Change Password
          </button>


        </form>


      </div>


    </div>

  );

}
