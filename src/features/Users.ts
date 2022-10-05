import { createSlice } from '@reduxjs/toolkit'
import placeholdetData from '../dataUsers.json';
import { User } from '../interfaces/User';

export const usersSlice = createSlice({
    name: 'users',
    initialState: { value: placeholdetData as User[] },
    reducers: {
        addUser: (state, action) => {
            state.value.push(action.payload);
        },

        deleteUser: (state, action) => {
            state.value = state.value.filter((user) => user.id !== action.payload.id);
        },

        updateUser: (state, action) => {
            state.value.map((user) => {
                if(user.id === action.payload.id) {

                    //let key = Object.keys(user).find(k => user[k] === action.payload.name);

                    //user.name = action.payload.name;
                    //const keyName: string = action.payload.keyName;
                    const keyName: string = action.payload.keyName;
                    if(keyName in user) {
                        user[keyName] = action.payload.keyVal; //TODO: fix TS error
                    } else {
                        return;
                    }
                    
                }
            })
        }
    }
})
export const { addUser, deleteUser, updateUser } = usersSlice.actions;
export default usersSlice.reducer;