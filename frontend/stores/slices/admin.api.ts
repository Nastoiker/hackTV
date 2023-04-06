import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export const AdminApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/admin',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    deleteVideo: builder.mutation({
      query: (videoId) => ({
        url: '/likeVideo',
        method: 'POST',
        body: {...videoId },
      }),

    }),
    banUser: builder.mutation({
      query: (commentVideo) => ({
        url: '/commentVideo',
        method: 'POST',
        body: {...commentVideo },
      }),
    }),
    removeAdmin
    unBanUser
    removeAdminAbility
    createCategory: builder.mutation({
      query: (commentVideo) => ({
        url: '/createVideo',
        method: 'POST',
        body: {...commentVideo },
      }),
    }),
    users: builder.query({
      query: (commentVideo) => ({
        url: '/createVideo',
        method: 'POST',
        body: {...commentVideo },
      }),
    }),
    createSecondCategory: builder.mutation({
      query: (commentVideo) => ({
        url: '/createVideo',
        method: 'POST',
        body: {...commentVideo },
      }),
    }),
  }),
});
export const { useLikeVideoMutation } = AdminApi;
