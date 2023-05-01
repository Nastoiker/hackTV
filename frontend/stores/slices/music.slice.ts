import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export const MusicApi = createApi({
  reducerPath: 'MusicApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/music',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    MusicGet: builder.mutation({
      query: (commentVideo) => ({
        url: '/music',
        method: 'get',
      }),
    }),
  }),
});
export const { useMusicGetMutation } = MusicApi;
