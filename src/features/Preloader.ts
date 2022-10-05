import { createSlice } from "@reduxjs/toolkit";

export const PreloaderSlice = createSlice({
    name: 'preloader',
    initialState: { value: false },
    reducers: {
        loading: (state, action) => {
            state.value = action.payload;
        }
    }
});
export const { loading } = PreloaderSlice.actions;
export default PreloaderSlice.reducer;