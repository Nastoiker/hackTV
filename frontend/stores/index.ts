import { rootSaga } from "@/stores/saga/root.saga"
import { videoHostingApi } from "@/stores/slices/api"
import categorySlice from "@/stores/slices/category.slice"
import { MusicApi } from "@/stores/slices/music.slice"
import { AuthApi } from "@/stores/slices/regapi"
import searchSlice from "@/stores/slices/search.slice"
import { UserApi } from "@/stores/slices/user.api"
import { VideoUserApi } from "@/stores/slices/video.api"
import createSagaMiddleware from "@redux-saga/core"
import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const sagaMiddleWate = createSagaMiddleware()
export const store = configureStore({
  reducer: {
    search: searchSlice,
    category: categorySlice,
    [MusicApi.reducerPath]: MusicApi.reducer,
    [VideoUserApi.reducerPath]: VideoUserApi.reducer,
    [videoHostingApi.reducerPath]: videoHostingApi.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      videoHostingApi.middleware,
      AuthApi.middleware,
      UserApi.middleware,
      VideoUserApi.middleware,
      MusicApi.middleware,
      sagaMiddleWate
    ),
})
sagaMiddleWate.run(rootSaga)
