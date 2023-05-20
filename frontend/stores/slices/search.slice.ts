import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { IUser } from "@/types/User.interface"
import { IVideo } from "@/types/Video.interface"
import { DOMEN } from "../../domen.api"
import {ITag} from "@/types/Tag.interface";

interface IState {
  search: string
  pending: boolean
  error: boolean
  found?: {
    videos: IVideo[]
    channels: IUser[]
    tags: ITag[],
  }

}
interface  Found {
  videos: IVideo[]
  channels: IUser[]
  tags: ITag[],
}
const initialState: IState = {
  search: '',
  pending: false,
  error: false,
}
export const searchContent = createAsyncThunk<
  Found,
  string,
  { rejectValue: string }
>("searchVideo", async (search: string, { rejectWithValue }) => {
  const response = await fetch(DOMEN.video.search + search)
  if (!response) {
    console.log(`Not found`)

    return rejectWithValue("Not found")
  }
  if (!response.ok) {
    console.log(`SERVER ERROR 500`)
    return rejectWithValue("SERVER ERROR 500")
  }
  const data = await response.json()
  console.log(data)
  // await new Promise((resolve) => setTimeout(() => resolve(''),1000));
  return data
})

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    setSearch: (state, { payload }) => {
      state.search = payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchContent.pending, (state) => {
        state.pending = true
      })
      .addCase(searchContent.fulfilled, (state, { payload }) => {
        state.pending = false
        state.found = payload;
      })
      .addCase(searchContent.rejected, (state) => {
        state.pending = false
        state.error = true
      })

  },
})
export const { setSearch } = searchSlice.actions

export default searchSlice.reducer
