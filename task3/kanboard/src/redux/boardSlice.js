import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: {} };

export const columnSlice = createSlice({
    name: 'column',
    initialState,
    reducers: {
        setColumns: (state, action) => {
            state.value = action.payload
        }
     }
})

export const { setColumns } = columnSlice.actions; 
export default columnSlice.reducer;

