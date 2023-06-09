import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"

export const AdminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/admin",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token")
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    deleteVideo: builder.mutation({
      query: (videoId) => ({
        url: "/deleteVideo",
        method: "POST",
        body: { ...videoId },
      }),
    }),
    banUser: builder.mutation({
      query: (commentVideo) => ({
        url: "/commentVideo",
        method: "POST",
        body: { ...commentVideo },
      }),
    }),
    removeAdmin: builder.mutation({
      query: (admin) => ({
        url: "/commentVideo",
        method: "POST",
        body: { ...admin },
      }),
    }),
    unBanUser: builder.mutation({
      query: (user) => ({
        url: "/unBanUser",
        method: "POST",
        body: { ...user },
      }),
    }),
    removeAdminAbility: builder.mutation({
      query: (commentVideo) => ({
        url: "/removeAdminAbility",
        method: "POST",
        body: { ...commentVideo },
      }),
    }),
    createCategory: builder.mutation({
      query: (firstCategory) => ({
        url: "/createFirstCategory",
        method: "POST",
        body: { ...firstCategory },
      }),
    }),
    musicsAll: builder.query({
      query: (firstCategory) => ({
        url: "/musics",
        method: "POST",
        body: { ...firstCategory },
      }),
    }),
    users: builder.query({
      query: (commentVideo) => ({
        url: "/users",
        method: "POST",
        body: { ...commentVideo },
      }),
    }),
    createSecondCategory: builder.mutation({
      query: (secondCategory) => ({
        url: "/createSecondCategory",
        method: "POST",
        body: { ...secondCategory },
      }),
    }),
  }),
})
export const {
  useBanUserMutation,
  useCreateCategoryMutation,
  useCreateSecondCategoryMutation,
  useUnBanUserMutation,
  useUsersQuery,
  useRemoveAdminMutation,
  useRemoveAdminAbilityMutation,
  useDeleteVideoMutation,
  useMusicsAllQuery,
} = AdminApi
