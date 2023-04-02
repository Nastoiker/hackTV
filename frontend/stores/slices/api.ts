import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const getToken = () => localStorage.getItem('token');
export const videoHostingApi = createApi({
  reducerPath: 'videoHostingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/Video/',
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  })
  ,
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => ({
        url: '/',
        method: 'get',
      }),
    }),
    addVideo: builder.mutation({
      query: (newVideo) => ({
        url: '/videos',
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
