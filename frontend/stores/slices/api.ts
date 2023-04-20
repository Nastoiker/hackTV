import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const getToken = () => localStorage.getItem('token');
export const videoHostingApi = createApi({
  reducerPath: 'videoHostingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/Video/',
  })
  ,
  endpoints: (builder) => ({
    tags: builder.query({
      query: () => ({
        url: 'tag/tags/',
        method: 'get',
      }),
    }),
    getVideos: builder.query({
      query: () => ({
        url: '/',
        method: 'get',
      }),
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetVideosQuery, useTagsQuery } = videoHostingApi
