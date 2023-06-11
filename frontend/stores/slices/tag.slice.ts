import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { IUser } from "@/types/User.interface"
import { IVideo } from "@/types/Video.interface"
import { DOMEN } from "../../domen.api"
import {ITag} from "@/types/Tag.interface";
import { IMusic } from "@/types/Music.interface";

interface IState {
  search: string
  pending: boolean
  error: boolean
  videos?: IVideo[]
}
const initialState: IState = {
  search: '',
  pending: false,
  error: false,
}
export const searchVideoByTag = createAsyncThunk<
  IVideo[],
  string,
  { rejectValue: string }
>("searchTag", async (search: string, { rejectWithValue }) => {
  const response = await fetch(DOMEN.video.getVideoByTagName + search)
  if (!response) {
    console.log(`Not found`)

    return rejectWithValue("Not found")
  }

  if (!response.ok) {
    console.log(`SERVER ERROR 500`)
    return rejectWithValue("SERVER ERROR 500")
  }
  const data = await response.json()
  console.log(DOMEN.video.getVideoByTagName + search)
  // await new Promise((resolve) => setTimeout(() => resolve(''),1000));
  return data
})

const tagSlice = createSlice({
  name: "tagSlice",
  initialState,
  reducers: {
    setTag: (state, { payload }) => {
      state.search = payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchVideoByTag.pending, (state) => {
        state.pending = true
      })
      .addCase(searchVideoByTag.fulfilled, (state, { payload }) => {
        state.pending = false
        state.videos = payload;
      })
      .addCase(searchVideoByTag.rejected, (state) => {
        state.pending = false
        state.error = true
      })

  },
})
export const { setTag } = tagSlice.actions

export default tagSlice.reducer
