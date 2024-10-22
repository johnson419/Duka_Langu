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

// Example product data, replace with actual product data from your product table
const productData = {
  name: "Sample Product",
  description: "Sample Description",
  category: "Electronics",
  price: 100,
  stock: 10,
  image: "/path/to/existing-product-image.jpg", // Example image URL from the product table
};

const schema = z.object({
  name: z.string().nonempty(),
  price: z.number().nonnegative(),
  description: z.string().nonempty(),
  category: z.string().nonempty(),
  stock: z.number().nonnegative(),
  image: z.string().nonempty(),
});

type FormValues = z.infer<typeof schema>;

const EditProduct = () => {
  // Initialize form with product data
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: productData.name,
      price: productData.price,
      description: productData.description,
      category: productData.category,
      stock: productData.stock,
      image: productData.image,
    },
  });

  const [imagePreview, setImagePreview] = useState<string | null>(productData.image);

  const onSubmit = (data: FormValues) => {
    console.log("Updated product data:", data);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl); // Update the image preview when a new image is selected
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col">
        <div className="flex justify-between items-center max-sm:flex-col max-sm:items-start max-sm:gap-y-2">
          <div>
            <h1 className="bold-text text-xl">Edit Product</h1>
            <div className="flex items-center space-x-1 text-gray-600 text-sm">
              <Link href="/Products">
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
                        <Input placeholder="Enter product price" {...field} />
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
                        <Input placeholder="Enter product stock" {...field} />
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
                  <Button type="submit">Save Changes</Button>
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
