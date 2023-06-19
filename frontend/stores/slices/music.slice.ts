import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import {api_url} from "@/domen.api";

export const MusicApi = createApi({
  reducerPath: "MusicApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${api_url}/music`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token")
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    MusicGet: builder.query({
      query: (commentVideo) => ({
        url: "/",
        method: "get",
      }),
    }),
  }),
})
export const { useMusicGetQuery } = MusicApi
