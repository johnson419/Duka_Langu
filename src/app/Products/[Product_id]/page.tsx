"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Import useRouter
import { ChevronLeft, ChevronRight, FileText, Tag, DollarSign, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import API_BASE_URL from "@/components/api/config";

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
    const router = useRouter(); // Get router instance
    const { id } = router.query; // Extract product ID from the URL

    const [product, setProduct] = useState<Product | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [loading, setLoading] = useState(true); // Loading state

    const images = [product?.image]; // Use product image in a simple array

    useEffect(() => {
        if (id) {
            const fetchProduct = async () => {
                try {
                    const response = await fetch(`${API_BASE_URL}/product/${id}`);
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
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found.</div>;
    }

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    return (
        <div className="p-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Product Details</CardTitle>
                    <CardDescription className="text-gray-600">{product.name}</CardDescription>
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
