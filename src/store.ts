import { configureStore } from "@reduxjs/toolkit"
import usersReducer from './features/Users'
import permissionsReducer from './features/Permissions'
import authReducer from './features/Auth'
import preloaderReducer from './features/Preloader'

export const store = configureStore({
    reducer: {
        // all reducers/slices are in folder 'features'
        users: usersReducer,
        permissions: permissionsReducer,
        auth: authReducer,
        preloader: preloaderReducer
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// Use REDUX with TypeScript: https://redux.js.org/usage/usage-with-typescript