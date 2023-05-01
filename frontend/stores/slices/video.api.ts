import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export const VideoUserApi = createApi({
  reducerPath: 'videoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/video',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    WatchVideounLogin: builder.mutation({
      query: (videoId) => ({
        url: `/videoWatch`,
        method: 'post',
        body: videoId,
      }),
    }),
    DeleteVideo: builder.mutation({
      query: (videoId) => ({
        url: `/deleteVideo/${videoId}`,
        method: 'DELETE',
      }),
    }),
    CreateVideo: builder.mutation({
      query: (commentVideo) => ({
        url: '/createVideo',
        method: 'POST',
        body: {...commentVideo },
      }),
    }),
  }),
});
export const {  useCreateVideoMutation, useWatchVideounLoginMutation,useDeleteVideoMutation  } = VideoUserApi;
