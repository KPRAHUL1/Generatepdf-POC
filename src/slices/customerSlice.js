import {createSlice} from "@reduxjs/toolkit";

const initialState={
    customers:[],
}
 export const customerSlice=createSlice({
 name:"customer",
 initialState,
 reducers:{
    setCustomers:(state,action)=>{
        state.customers=[...state.customers,action.payload];
    },
    deleteCustomers:(state,action)=>{
        state.customers= state.customers.filter(
            (customers,index)=>index!==action.payload
        )
    }
 }
}) ;
export const {setCustomers,deleteCustomers}=customerSlice.actions;
export default customerSlice.reducer;   