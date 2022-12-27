import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
    tagTypes: ["product"],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => "/products",
            providesTags: ["product"]
        }),
        getProduct: builder.query({
            query: (id) => "/products/" + id,
            providesTags: ["product"]
        }),
        addProduct: builder.mutation({
            query: (product) => ({
                url: "/products",
                method: "POST",
                body: product
            }),
            invalidatesTags: ["product"]
        }),
        updateProduct: builder.mutation({
            query: (product) => ({
                url: "/products/" + product.id,
                method: "PUT",
                body: product
            }),
            invalidatesTags: ["product"]
        }),
        removeProduct: builder.mutation({
            query: (id) => ({
                url: "/products/" + id,
                method: "DELETE",
            }),
            invalidatesTags: ["product"]
        })
    })
})
export const {
    useGetProductsQuery,
    useGetProductQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useRemoveProductMutation,
} = productApi