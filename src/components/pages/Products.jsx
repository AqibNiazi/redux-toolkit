import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchProducts } from "../api";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
const Products = () => {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 10000,
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>Error...{error.message}</h2>;
  }
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white">
      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Customers also purchased
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products?.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <LazyLoadImage
                  src={product?.thumbnail}
                  alt={product?.title}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700 dark:text-white">
                    <Link to={`/products/${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-white">
                    {product.category}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {product.price} $
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
