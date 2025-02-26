import { baseApi } from "../../api/baseApi";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login : builder.mutation({
            query: (userInfo) => ({
                url: "/auth/login",
                method: "POST",
                body: userInfo,
            })
        }),
        signup: builder.mutation({
            query: (userInfo) => ({
              url: "/auth/register", 
              method: "POST",
              body: userInfo,
            }),
          }),
          changePassword: builder.mutation({
            query: ({ oldPassword, newPassword }) => ({
                url: "/auth/change-password",
                method: "POST",
                body: { oldPassword, newPassword },
            }),
        }),

      
    })
    
})

export const { useLoginMutation , useSignupMutation, useChangePasswordMutation } = authApi;
export default authApi;