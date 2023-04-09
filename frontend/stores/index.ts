import {configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import {rootSaga} from "@/stores/saga/root.saga";
import {videoHostingApi} from "@/stores/slices/api";

import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AuthApi} from "@/stores/slices/regapi";
import categorySlice from "@/stores/slices/category.slice";
import {UserApi} from "@/stores/slices/user.api";
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector;
export const sagaMiddleWate = createSagaMiddleware();
export const store = configureStore({
    reducer: {
      category: categorySlice,
      [videoHostingApi.reducerPath]: videoHostingApi.reducer,
      [AuthApi.reducerPath]: AuthApi.reducer,
      [UserApi.reducerPath]: UserApi.reducer,
    },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(videoHostingApi.middleware, AuthApi.middleware, UserApi.middleware, sagaMiddleWate)
})
sagaMiddleWate.run(rootSaga);
