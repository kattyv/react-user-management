import { createSlice } from '@reduxjs/toolkit'

import placeholdetData from '../dataPermissions.json';

export const permissionsSlice = createSlice({
    name: 'permissions',
    initialState: { value: placeholdetData },
    reducers: {}
})
//export const {  } = usersSlice.actions;
export default permissionsSlice.reducer;