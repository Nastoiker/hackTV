import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const AuthApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/auth/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      headers.set('content-type', 'application/json');
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
        const { token } = response;
        localStorage.setItem('token', token);
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
      query: () => '/check-auth',
    }),

  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {  } = AuthApi
