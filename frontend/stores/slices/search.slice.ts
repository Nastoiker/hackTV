import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {DOMEN} from "../../domen.api";
import {IVideo} from "@/types/Video.interface";
import {IUser} from "@/types/User.interface";

interface  IState {
  search: string;
  pending: boolean,
  error: boolean,
  video: IVideo[],
  channel: IUser[];
}
const initialState: IState= {
  search: '',
  pending: false,
  error: false,
};
export const searchVideo = createAsyncThunk<IVideo[], undefined, {rejectValue: string}>('searchVideo', async (video: string, {rejectWithValue }) => {
  const response = await fetch(DOMEN.video.search);
  if(!response) {
    console.log(`Not found`);

    return rejectWithValue('Not found');
  }
  if(!response.ok) {
    console.log(`SERVER ERROR 500`);
    return rejectWithValue('SERVER ERROR 500');
  }
  const data =  await response.json();
  console.log(data);
  // await new Promise((resolve) => setTimeout(() => resolve(''),1000));
  return data;
});
export const searchUsers = createAsyncThunk<IUser[], undefined, {rejectValue: string}>('searchUsers', async (search: string, {rejectWithValue }) => {
  const response = await fetch(DOMEN.user.search + search);
  if(!response) {
    console.log(`Not found`);

    return rejectWithValue('Not found');
  }
  if(!response.ok) {
    console.log(`SERVER ERROR 500`);
    return rejectWithValue('SERVER ERROR 500');
  }
  const data =  await response.json();
  console.log(data);
  // await new Promise((resolve) => setTimeout(() => resolve(''),1000));
  return data;
});

const searchSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {
    setSearch:(state, {  payload }) =>{
      state.search = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      searchVideo.pending, (state) => {
        state.pending = true;
      }
    )
      .addCase( searchVideo.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.video = payload;
      })
      .addCase(searchVideo.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })
      .addCase( searchUsers.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.channel = payload;
      });

  },
});
export const { setSearch} = searchSlice.actions;

export default searchSlice.reducer;
