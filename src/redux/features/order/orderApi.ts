import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (userInfo) => ({
        url: "/orders",
        method: "POST",
        body: userInfo,
      }),
    }),
    verifyOrder: builder.query({
      query: (order_id) => ({
        url: "/orders/verify",
        params: { order_id },
        method: "GET",
      }),
    }),
    getOrder: builder.query({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: "GET",
      }),
    }),
    getOrdersByEmail: builder.query({
      query: (email) => ({
        url: `/orders/email/${email}`,
        method: "GET",
      }),
    })
  }),
});

export const {
  useCreateOrderMutation,
  useVerifyOrderQuery,
  useGetOrderQuery, 
  useGetOrdersByEmailQuery,
} = orderApi;
