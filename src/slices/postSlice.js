import { createSlice, nanoid } from "@reduxjs/toolkit"

const initialState=[
    {
        id:'1',
        title:'Redux',
        author:'rahul',
        content:'easy'
    },
    {
        id:'2',
        title:'Redux',
        author:'rahul',
        content:'easy'
    }
]

export const postSlice= createSlice({
    name:"posts",
    initialState,
    reducers:{
       postAdded:{
        reducer(state,action){
            state.push(action.payload)
        },
        prepare(title,author,content){
            return{
                payload:{
                    id: nanoid(),
                    title,
                    author,
                    content
                }
            }
        }
       }
    }
})
export const selectAllpost = (state) => state.posts;
export const {postAdded}=postSlice.actions;
export default postSlice.reducer;   