import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import { authApi } from '../services/auth';
import { productApi } from '../services/product'

export const store = configureStore({
    reducer: {
        productApi: productApi.reducer,
        authApi: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        // serializableCheck: {
        //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // },
    }).concat(productApi.middleware, authApi.middleware),
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;