import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {IVideo} from "@/types/Video.interface";
const getToken = () => localStorage.getItem('token');
export const videoHostingApi = createApi({
  reducerPath: 'videoHostingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/Video/',
    headers: {
      'Content-Type': 'application/json'
    },
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      headers.set('content-type', 'application/json');
      return headers;
    },
  })
  ,
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: (newVideo) => ({
        url: '/',
        method: 'get',
      }),
    }),
    addVideo: builder.mutation({
      query: (newVideo: IVideo) => ({
        url: '/create',
        method: 'POST',
        body: { ...newVideo },
      }),
    }),
    deleteVideo: builder.mutation({
      query: (videoId) => ({
        url: `/videos/${videoId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetVideosQuery, useAddVideoMutation, useDeleteVideoMutation } = videoHostingApi
