"use client";

import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
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

const schema = z.object({
  name: z.string().nonempty(),
  price: z.number().nonnegative(),
  description: z.string().nonempty(),
  category: z.string().nonempty(),
  stock: z.number().nonnegative(),
  image: z.string().nonempty(),
  //   isFeatured: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

const CreateProduct = () => {
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

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col">
        <div className="flex justify-between items-center max-sm:flex-col max-sm:items-start max-sm:gap-y-2">
          <div>
            <h1 className="bold-text text-xl">Create Product</h1>
            <div className="flex items-center space-x-1 text-gray-600 text-sm">
              <h1>Dashboard</h1>
              <p>{">"}</p>
              <h1>Create Product</h1>
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
                    <Input placeholder="Enter Product description" {...field} />
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
            {/* Bus Photos */}
            <div className="py-2 mb-2">
              <h1 className="semibold-text text-2xl">Product Photos</h1>
              <p className="text-sm text-muted-foreground">
                Upload product photos
              </p>
            </div>

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="w-fit">
                  {/* <FormLabel>Product Photos</FormLabel> */}
                  <FormControl>
                    <Input
                      type="file"
                      multiple
                      accept="image/*"
                      placeholder="Upload product photos"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
          <div className="my-4 flex justify-end">
            <Button type="submit">Create Product</Button>
          </div>
        </Form>

          </div>
        </div>

        
      </div>
    </div>
  );
};

export default CreateProduct;
