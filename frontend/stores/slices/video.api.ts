import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import {api_url} from "@/domen.api";

export const VideoUserApi = createApi({
  reducerPath: "videoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${api_url}/video`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token")
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    WatchVideounLogin: builder.mutation({
      query: (videoId) => ({
        url: `/videoWatch`,
        method: "post",
        body: videoId,
      }),
    }),
    getCommentsByVideo: builder.query({
      query: (videoId) => ({
        url: `/comments/:${videoId}`,
        method: "GET",
      }),
    }),
  }),
})
export const {
  useWatchVideounLoginMutation,
  useGetCommentsByVideoQuery,
} = VideoUserApi
