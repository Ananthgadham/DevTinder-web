import { createSlice } from "@reduxjs/toolkit";
const feedSlice=createSlice({
    name:"feed",
    initialState:null,
    reducers:{
        addFeed:(state,action)=>{
            return action.payload;
        },
        removeUserFromFeed:(state,action)=>{
            const newarray=state.filter((s)=>s._id!==action.payload);
             return newarray;
        }
    },
});

export const {addFeed,removeUserFromFeed}=feedSlice.actions;
export default feedSlice.reducer;