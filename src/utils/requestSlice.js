import { createSlice } from "@reduxjs/toolkit";
const requestSlice=createSlice({
    name:"request",
    initialState:null,
    reducers:{
        addRequest:(state,action)=>action.payload,
        removeRequest:(state,action)=>{
             const newarray=state.filter((s)=>s._id!==action.payload);
             return newarray;
        },
    },
});

export const {addRequest,removeRequest}=requestSlice.actions;
export default requestSlice.reducer;