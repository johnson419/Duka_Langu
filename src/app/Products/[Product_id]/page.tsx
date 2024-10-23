"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation"; // Import useRouter
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Tag,
  DollarSign,
  Package,
  ShoppingCart,
  Trash2,
  Edit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import API_BASE_URL from "@/components/api/config";
import router from "next/router";
import { toast } from "react-hot-toast"; 

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
  const [product, setProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true); // Loading state
  const [isMounted, setIsMounted] = useState(false); // Track if component is mounted

  const images = [product?.image]; // Use product image in a simple array

  const router = useRouter(); // Initialize router
  const pathname  = usePathname(); // Extract product ID from the URL
  const id = pathname.split("/").pop();

  useEffect(() => {
    setIsMounted(true); // Set the component as mounted
  }, []);

  useEffect(() => {
    if (isMounted && id) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/productById/${id}`, 
            {
                headers: {
                  'ngrok-skip-browser-warning': 'true'
                }
              }
          );
          const result = await response.json();
          if (result) {
            setProduct(result); // Set the product from the API response
          }
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setLoading(false); // Set loading to false
        }
      };
      fetchProduct();
    }
  }, [id, isMounted]); // Fetch product only after mounting and ID availability


  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      try {
        const response = await fetch(`${API_BASE_URL}/deleteProduct/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          toast.success("Product deleted successfully!"); // Show success toast
          router.push("/Products"); // Navigate to products page or any desired route
        } else {
          throw new Error("Failed to delete product");
        }
      } catch (error) {
        if (error instanceof Error) {
            toast.error("Error deleting product: " + error.message); // Show error toast
          } else {
            toast.error("Error deleting product: An unknown error occurred."); // Show default error toast
          }
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + images.length) % images.length
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Product Details</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative h-[200px] w-full sm:h-[400px] sm:w-[400px] mx-auto overflow-hidden">
            <img
              src={images[currentImageIndex] || "/placeholder-image.png"}
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
            <div className="flex items-center space-x-3">
                <Package className="w-6 h-6" />
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-semibold">{product.name}</p>
              </div>
              <div className="flex items-center space-x-3">
                <FileText className="w-6 h-6" />
                <p className="text-sm text-gray-500">Description</p>
                <p className="font-semibold">{product.description}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Tag className="w-6 h-6" />
                <p className="text-sm text-gray-500">Category</p>
                <p className="font-semibold">{product.category}</p>
              </div>
              <div className="flex items-center space-x-3">
                <DollarSign className="w-6 h-6" />
                <p className="text-sm text-gray-500">Price</p>
                <p className="font-semibold">{product.price} TZS</p>
              </div>
              <div className="flex items-center space-x-3">
                <ShoppingCart className="w-6 h-6" />
                <p className="text-sm text-gray-500">Stock</p>
                <p className="font-semibold">{product.stock} items</p>
              </div>
<div className="flex items-center space-x-3">

              {/* Edit Button */}
              <Button 
                className="bg-gray-600" 
                onClick={() => router.push(`/Products/${product.id}/edit`)} // Navigate to the edit page
              >
                <Edit className="mr-2" /> Edit
              </Button>
              {/* Delete Button */}
              <Button 
                variant="destructive" 
                onClick={handleDelete}
              >
                <Trash2 className="mr-2" /> Delete
              </Button>
            

</div>
             
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetails;
