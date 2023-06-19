import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import {api_url} from "@/domen.api";

export const AdminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${api_url}/admin`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token")
      if (token) {
        // headers.set("Authorization", `Bearer ${token}`)
        headers.set("Authorization", `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbXVyMjAwNEBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTY4MjAxMTQ0MX0.vMprCHLNlo-pTAiqrUzNb-ElweUN8b1G_cxNSX87r5Q`)

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
      query: (id) => ({
        url: `/banUser:${id}`,
        method: "get",
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
    videoWithReport: builder.query({
      query: (commentVideo) => ({
        url: "/videoReports",
        method: "get",
      }),
    }),
    users: builder.query({
      query: (commentVideo) => ({
        url: "/users",
        method: "get",
      }),
    }),
    deleteFirstCategory:builder.mutation({
      query: (secondCategory) => ({
        url: "/deleteFirstCategory",
        method: "DELETE",
        body: { ...secondCategory },
      }),
  }),
    deleteSecondCategory:builder.mutation({
      query: (secondCategory) => ({
        url: "/deleteSecondCategory",
        method: "DELETE",
        body: { ...secondCategory },
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
  useVideoWithReportQuery,
  useDeleteFirstCategoryMutation,
  useDeleteSecondCategoryMutation,
  useMusicsAllQuery,
} = AdminApi
