import { createSlice } from "@reduxjs/toolkit";
import { User } from "../interfaces/User";

type authStateProps = {
    status: string,
    user: User | null;
}

const defaultState: authStateProps = {
    status: 'notlogged', // Status: 'notlogged', 'pendind', 'logged'
    user: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: { value: defaultState },
    reducers: {
        updateAuth: (state, action) => {
            state.value = action.payload;
        },
        resetAuth: (state) => {
            state.value = defaultState;
        }
    }
})
export const { updateAuth, resetAuth } = authSlice.actions;
export default authSlice.reducer;