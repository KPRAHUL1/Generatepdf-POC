import { createSlice } from "@reduxjs/toolkit";

const initialState={
    value:[]
}
export const addSlices= createSlice({
    name:"add",
    initialState,
    reducers:{
        addSlice:(state,action)=>{
            state.value.push(action.payload);

        },
        resetSlice:(state)=>{
            state.value=[];
        }
    }
})
export const {addSlice,resetSlice}=addSlices.actions;
export default addSlices.reducer;