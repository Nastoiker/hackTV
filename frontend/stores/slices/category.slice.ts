import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { DOMEN } from "../../domen.api"

export interface ICategory {
  id: string
  name: string
  alias: string
  secondLevelCategory: SecondLevelCategory[]
}

export interface SecondLevelCategory {
  id: string
  name: string
  alias: string
  firstLevelId: string
}

export interface CategoryState {
  category: ICategory[]
  currentCategory?: ICategory
  pending: boolean
  error: boolean
}
const initialState: CategoryState = {
  category: [
    {
      id: "6c2d57d1-9540-44c6-87ad-63f2560f3705",
      name: "Игры",
      alias: "Games",
      secondLevelCategory: [
        {
          id: "de030f0f-ef1c-4fbd-8f8c-9e27b4b3c620",
          name: "dota 2",
          alias: "dota-2",
          firstLevelId: "6c2d57d1-9540-44c6-87ad-63f2560f3705",
        },
      ],
    },
  ],
  pending: false,
  error: false,
}
export const getFirstCategory = createAsyncThunk<
  ICategory[],
  undefined,
  { rejectValue: string }
>("firstCategory", async (_, { rejectWithValue }) => {
  const response = await fetch(DOMEN.category.getCategory)
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
const firstCategorySlice = createSlice({
  name: "firstCategory",
  initialState,
  reducers: {
    setCurrentCategory: (state, { payload }) => {
      state.currentCategory = payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFirstCategory.pending, (state) => {
        state.pending = true
      })
      .addCase(getFirstCategory.fulfilled, (state, { payload }) => {
        state.pending = false
        state.category = payload
      })
      .addCase(getFirstCategory.rejected, (state) => {
        state.pending = false
        state.error = true
      })
  },
})
export default firstCategorySlice.reducer
