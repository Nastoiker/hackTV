import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export const UserApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/user',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    LikeVideo: builder.mutation({
      query: (videoId) => ({
        url: '/likeVideo',
        method: 'POST',
        body: {...videoId },
      }),
    }),
  }),
});
export const { useLikeVideoMutation } = UserApi;
