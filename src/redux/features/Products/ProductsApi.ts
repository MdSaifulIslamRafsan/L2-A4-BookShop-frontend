import { baseApi } from "../../api/baseApi";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProducts : builder.query({
            query: () => ({
                url: "/products",
                method: "GET",
            })
        }),
        getProduct : builder.query({
            query: (id) => ({
                url: `/products/${id}`,
                method: "GET",
            })
        }),
      
    })
    
})

export const { useGetProductsQuery, useGetProductQuery } = authApi;
export default authApi;