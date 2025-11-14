import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name:"job",
    initialState: {
        allAdminJobs: [],
        allJobs: [],
        singleJob: null, // must be initialized
        searchJobByTitle: "",
        allApplicants: [],
        searchApplicantByName: "",
        allAppliedJobs:[],
        searchQuery:"",
    },
    reducers:{
        //actions
        setAllJobs:(state,action)=>{
            state.allJobs = action.payload;
        },
        setSingleJob:(state,action) =>{
            state.singleJob = action.payload;
        },
        setAllAdminJobs:(state,action) =>{
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText:(state,action) =>{
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs:(state,action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchQuery:(state,action) =>{
            state.searchQuery= action.payload;
        }
    }
})

export const {setSearchQuery,setAllJobs,setSingleJob,setAllAdminJobs,setSearchJobByText,setAllAppliedJobs} = jobSlice.actions;
export default jobSlice.reducer;