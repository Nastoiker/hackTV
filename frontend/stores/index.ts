import {configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import {rootSaga} from "@/stores/saga/root.saga";
export const sagaMiddleWate = createSagaMiddleware();
const store = configureStore({
  reducer: {},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleWate)
})
sagaMiddleWate.run(rootSaga);
