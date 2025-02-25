import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    users: builder.query({
      query: () => ({
        url: "/auth/users",
        method: "GET",
      }),
    }),

    updateUserRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: `/auth/${userId}/role`,
        method: "PATCH",
        body: { role },
      }),
    }),
    updateUserStatus: builder.mutation({
      query: ({ userId, isActive }) => ({
        url: `/auth/${userId}/status`,
        method: "PATCH",
        body: { isActive },
      }),
    }),
  }),
});

export const {  useUsersQuery, useUpdateUserRoleMutation, useUpdateUserStatusMutation  } = authApi;
export default authApi;
