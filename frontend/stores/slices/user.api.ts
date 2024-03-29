import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import {api} from "@/config";

export const UserApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${api}/user`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token")
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    LikeVideo: builder.mutation({
      query: (videoId) => ({
        url: "/likeVideo",
        method: "POST",
        body: { ...videoId },
      }),
    }),
    LikeComment: builder.mutation({
      query: (videoId) => ({
        url: "/likeVideo",
        method: "POST",
        body: { ...videoId },
      }),
    }),
    EditProfile: builder.mutation({
      query: (profileEdit) => ({
        url: "/updateProfile",
        method: "PATCH",
        body: { profileEdit },
        headers: {
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
          "Content-Type": "multipart/form-data;",
        }
      }),
    }),
    ReportOnVideo: builder.mutation({
      query: (report) => ({
        url: "/ReportOnVideo",
        method: "POST",
        body: { ...report },
      }),
    }),
    CommentVideo: builder.mutation({
      query: (commentVideo) => ({
        url: "/createComment",
        method: "POST",
        body: { ...commentVideo },
      }),
    }),
    CommentUserComment: builder.mutation({
      query: (commentVideo) => ({
        url: "/createComment",
        method: "POST",
        body: { ...commentVideo },
      }),
    }),
    follows: builder.query({
      query: () => ({
        url: "/follows",
        method: "get",
      }),
    }),
    followChannel: builder.mutation({
      query: (commentVideo) => ({
        url: "/followChannel",
        method: "POST",
        body: { ...commentVideo },
      }),
    }),
    unfollowChannel: builder.mutation({
      query: (commentVideo) => ({
        url: "/unfollowChannel",
        method: "POST",
        body: { ...commentVideo },
      }),
    }),
    DeleteVideo: builder.mutation({
      query: (id) => ({
        url: `/deleteVideo/:${id}`,
        method: "DELETE",
      }),
    }),
    DeleteMusic: builder.mutation({
      query: (id) => ({
        url: `/deleteMusic/:${id}`,
        method: "DELETE",
      }),
    }),
    WatchVideo: builder.mutation({
      query: (videoId) => ({
        url: `/videoWatch`,
        method: "post",
        body: videoId,
      }),
    }),
    RecVideo: builder.query({
      query: () => ({
        url: `/recomendation`,
        method: "get",
      }),
    }),
    CreateMusic: builder.mutation({
      query: (createMusic) => ({
        url: `/createMusic`,
        method: "post",
        body: createMusic,
      }),
    }),
    CreateVideo: builder.mutation({
      query: (commentVideo) => ({
        url: "/createVideo",
        method: "POST",
        body: { ...commentVideo},
        headers: {
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
          "Content-Type": "multipart/form-data;",
        }
      }),
    }),
  }),
})
export const {
  useLikeVideoMutation,
  useRecVideoQuery,
  useWatchVideoMutation,
  useEditProfileMutation,
  useCommentVideoMutation,
  useCreateVideoMutation,
  useFollowsQuery,
  useCreateMusicMutation,
  useDeleteVideoMutation,
  useDeleteMusicMutation,
  useFollowChannelMutation,
  useReportOnVideoMutation,
  useUnfollowChannelMutation,
} = UserApi
