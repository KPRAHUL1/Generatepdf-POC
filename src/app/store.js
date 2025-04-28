import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "../slices/customerSlice"
import  addSlicesReducer  from "../slices/addValueSlice";
import  postReducer  from "../slices/postSlice";

const store =configureStore({
    reducer:{
        customer:customerReducer,
        add:addSlicesReducer,
        posts:postReducer
    }
});

export default store;