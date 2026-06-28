'use client';

import { useEffect, useState } from "react";
import Link from "next/link";


export default function AdminProductsPage() {

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);



  const loadProducts = async () => {

    try {

      const res = await fetch("/api/products");

      const data = await res.json();

      setProducts(data);


    } catch(error){

      console.log(error);

    } finally {

      setLoading(false);

    }

  };



  useEffect(()=>{

    loadProducts();

  },[]);




  const deleteProduct = async(id:string)=>{


    const confirmDelete = confirm(
      "Delete this product?"
    );


    if(!confirmDelete) return;



    try{


      const res = await fetch(
        `/api/products/${id}`,
        {
          method:"DELETE"
        }
      );



      if(res.ok){


        alert("Product deleted");


        setProducts(
          products.filter(
            (product)=>product._id !== id
          )
        );


      }else{

        alert("Delete failed");

      }



    }catch(error){

      console.log(error);

      alert("Something went wrong");

    }


  };




  if(loading){

    return (
      <div className="p-10">
        Loading products...
      </div>
    );

  }




  return (

    <div className="min-h-screen bg-gray-100 p-8">


      <div className="flex justify-between items-center mb-8">


        <h1 className="text-3xl font-bold">
          Admin Products
        </h1>



        <Link
          href="/admin/products/add"
          className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700"
        >
          + Add Product
        </Link>


      </div>




      <div className="grid md:grid-cols-3 gap-6">



        {products.map((product)=>(


          <div
            key={product._id}
            className="bg-white rounded-xl shadow p-5"
          >



            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded"
            />



            <h2 className="text-xl font-bold mt-4">
              {product.name}
            </h2>



            <p className="text-gray-600">
              {product.description}
            </p>



            <p className="mt-2 font-semibold">
              Price: Rs {product.price}
            </p>



            <p>
              Stock: {product.stock}
            </p>




            <button

              onClick={()=>
                deleteProduct(product._id)
              }

              className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
            >

              Delete Product

            </button>



          </div>


        ))}



      </div>



      {products.length===0 && (

        <p className="mt-10 text-center">
          No products found
        </p>

      )}



    </div>


  );


}
