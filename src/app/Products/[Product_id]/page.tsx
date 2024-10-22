"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  FileText, Tag, DollarSign, Package,
    ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Product = {
    id: number;
    name: string;
    description: string;
    category: string;
    price: number;
    stock: number;
    image: string;
};

const ProductDetails = () => {
const [currentImageIndex, setCurrentImageIndex] = useState(0);
    return(

    <div className="p-6">
        <Card>
        <CardHeader>
            <CardTitle className="text-2xl">Product Details</CardTitle>
            <CardDescription className="text-gray-600">
                {product.name}
            </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
        <div className="relative h-[200px] w-full sm:h-[400px] sm:w-[400px] mx-auto overflow-hidden">
            <img
              src={images[currentImageIndex]}
              alt={`Product Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover object-center"
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/40 hover:bg-white/50"
              onClick={prevImage}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/40 hover:bg-white/50"
              onClick={nextImage}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                index === currentImageIndex ? "bg-white" : "bg-white/50"
                }`}
              />
              ))}
            </div>
            </div>

            <div className="p-6 grid grid-cols gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                    <div className="flex flex-items-center space-x-3">
                        <FileText className="w-6 h-6" />
                        <p className="text-sm text-gray-500">Description</p>
                        <p className="font-semibold">{product.description}</p>
                    </div> 
                    <div className="flex flex-items-center space-x-3">
                        <Tag className="w-6 h-6" />
                        <p className="text-sm text-gray-500">Category</p>
                        <p className="font-semibold">{product.category}</p>
                    </div>
                    <div className="flex flex-items-center space-x-3">
                        <DollarSign className="w-6 h-6" />
                        <p className="text-sm text-gray-500">Price</p>
                        <p className="font-semibold">{product.price}</p>
                    </div>
                    <div className="flex flex-items-center space-x-3">
                        <Package className="w-6 h-6" />
                        <p className="text-sm text-gray-500">Stock</p>
                        <p className="font-semibold">{product.stock}</p>
                    </div>
                </div>
            </div>
        </CardContent>
        </Card>
        
    </div>
    );
};

export default ProductDetails;
