import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {IUser} from "@/types/User.interface";

export const AuthApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/auth',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    Authorization: builder.query({
      query: (login) => ({
        url: '/login',
        method: 'POST',
        body: { ...login },
      }),
      transformResponse: (response) => {
        // @ts-ignore
        const { accesToken } = response;
        localStorage.setItem('token', accesToken);
        return response;
      },
    }),
    Registration: builder.mutation({
      query: (register) => ({
        url: '/register',
        method: 'POST',
        body: { ...register },
      }),
    }),
    checkAuth: builder.query({
      query: () => '/authByJwt',
    }),

  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useAuthorizationQuery, useCheckAuthQuery, useRegistrationMutation  } = AuthApi
