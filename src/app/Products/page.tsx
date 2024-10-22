"use client";

import { ProductTable } from "@/components/Product/ProductTable";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const Products = () => {

    const router = useRouter();
    
    return (
       <div>
<div className="w-full">
      <div className="flex flex-col">
        <div className="flex justify-between items-center max-sm:flex-col max-sm:items-start max-sm:gap-y-2">
          <div>
            <h1 className="bold-text text-xl">My Products</h1>
            <div className="flex items-center space-x-1 text-gray-600 text-sm">
              <h1>Dashboard</h1>
              <p>{">"}</p>
              <h1>My Products</h1>
            </div>
          </div>

          <div className="">
            <Button onClick={() => router.push("/Products/create")} className="semibold-text bg-gray-600">Create Product</Button>
          </div>
        </div>

        

        {/* RECENT ACTIVITIES */}
        <div className="bg-white p-6 mt-8 rounded-lg border shadow max-sm:p-3 max-sm:rounded-xl">
          <div className="flex flex-col">
            <ProductTable />
          </div>
        </div>
      </div>
    </div>
        
       </div>
    );
};

export default Products;