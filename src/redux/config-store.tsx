import { configureStore  } from '@reduxjs/toolkit';
import productReducer from "./reducers/projectReducer";
import taskReducer from './reducers/taskReducer';
import userReducer from './reducers/userReducer';

export const store = configureStore({
    reducer: {
        productReducer:productReducer,
        userReducer:userReducer,
        taskReducer:taskReducer
    },
})
export type RootState =ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch;