import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "../../service/api";

export const fetchUsers = createAsyncThunk(
    "admin/fetchUsers",
    async (thunkAPI) => {
        try {
            const response = await axios.get("/admin/getusers");
            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

export const changeStatus = createAsyncThunk(
    "admin/changestatus",
    async(ID,thunkAPI)=>{
        try{
            const response = await axios.get(`/admin/blockunblock?id=${ID}`);
            thunkAPI.dispatch(fetchUsers());
            return response.data;
        }catch(error){
            console.log(error);
            return thunkAPI.rejectWithValue({error:error.message});
        }
    }
)

export const deleteUser = createAsyncThunk(
    "admin/deleteuser",
    async(ID,thunkAPI)=>{
        try{
            const response = await axios.delete(`/admin/delete/${ID}`);
            thunkAPI.dispatch(fetchUsers());
            return response.data;
        }catch(error){
            console.log(error);
            return thunkAPI.rejectWithValue({error:error.message});
        }
    }
)

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        isLoggedIn: false,
        email: undefined,
        users: [],
        error: null,
        reqStatus: "idle"
    },
    reducers: {
        setAdmin: (state, action) => {
            state.isLoggedIn = true;
            state.email = action.payload.email;
        },
        clearAdmin: (state) => {
            state.isLoggedIn = false;
            state.email = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.reqStatus = "loading"
            })
            .addCase(fetchUsers.rejected,(state,action)=>{
                state.reqStatus = "failed";
                state.error = action.payload;
            })
            .addCase(fetchUsers.fulfilled,(state,action)=>{
                state.reqStatus = "success";
                state.users = [...action.payload.users];
            })
            .addCase(changeStatus.rejected,(state,action)=>{
                state.error = action.payload;
            })
    }
});

export const { setAdmin, clearAdmin } = adminSlice.actions;
export default adminSlice.reducer;