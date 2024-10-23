"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation"; // Import useRouter
import API_BASE_URL from "@/components/api/config";
import toast from "react-hot-toast"; // Import react-hot-toast

const schema = z.object({
  name: z.string().nonempty("Name is required"),
  price: z.number().nonnegative("Price must be non-negative"),
  description: z.string().nonempty("Description is required"),
  category: z.string().nonempty("Category is required"),
  stock: z.number().nonnegative("Stock must be non-negative"),
  image: z.string().nonempty("Image is required"),
});

type FormValues = z.infer<typeof schema>;

const EditProduct = () => {
  const [productData, setProductData] = useState<FormValues | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      category: "",
      stock: 0,
      image: "",
    },
  });

  const pathname = usePathname();
  const segments = pathname.split("/");
  const id = segments[segments.length - 2];
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fetch product data by ID from the API
  useEffect(() => {
    if (isMounted && id) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/productById/${id}`, {
            headers: {
              'ngrok-skip-browser-warning': 'true',
            },
          });
          if (!response.ok) {
            throw new Error("Failed to fetch product");
          }
          const result = await response.json();
          if (result) {
            setProductData(result);
            setImagePreview(result.image);
            form.reset(result);
          }
        } catch (error) {
          if (error instanceof Error) {
            toast.error("Error fetching product: " + error.message);
          } else {
            toast.error("Error fetching product: An unknown error occurred.");
          }
          
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id, isMounted]);

  const onSubmit = async (data: FormValues) => {
    try {
      const updatedData = {
        ...data,
        price: Number(data.price),
        stock: Number(data.stock),
        id,
      };

      const response = await fetch(`${API_BASE_URL}/updateProduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ updatedData}),
      });

      if (response.ok) {
        toast.success("Product updated successfully");
        router.push("/Products");
      } else {
        const errorText =   await response.text();
        toast.error("Error updating product: " + errorText);
        // throw new Error("Error updating product: " + errorText);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error updating product: " + error.message);
      }else{
        toast.error("Error updating product: An unknown error occurred.");
      }
      
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      form.setValue("image", file.name);
    }
  };

  if (loading) {
    return <div>Loading product details...</div>;
  }

  return (
    <div className="w-full">
      <div className="flex flex-col">
        <div className="flex justify-between items-center max-sm:flex-col max-sm:items-start max-sm:gap-y-2">
          <div>
            <h1 className="bold-text text-xl">Edit Product</h1>
            <div className="flex items-center space-x-1 text-gray-600 text-sm">
              <Link href={`/Products/${id}`}>
                <p>Product</p>
              </Link>
              <p>{">"}</p>
              <h1>Edit Product</h1>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 mt-8 rounded-lg border shadow max-sm:p-3 max-sm:rounded-xl">
          <div className="flex flex-col border-b pb-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col border-b pb-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Product name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Product description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter product category" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter product price" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter product stock" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Product Photos */}
                <div className="py-2 mb-2">
                  <h1 className="semibold-text text-2xl">Product Photos</h1>
                  <p className="text-sm text-muted-foreground">
                    Update product photos
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem className="w-fit">
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            field.onChange(e);
                            handleImageChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Image Preview */}
                {imagePreview && (
                  <div className="mt-4">
                    <h2 className="text-sm">Current Image Preview:</h2>
                    <img
                      src={imagePreview}
                      alt="Product Preview"
                      className="mt-2 w-32 h-32 object-cover rounded-md"
                    />
                  </div>
                )}

                <div className="my-4 flex justify-end">
                  <Button className="bg-gray-600" type="submit">Save Changes</Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
