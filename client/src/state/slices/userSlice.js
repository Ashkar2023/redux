import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../service/api";

const initialState = {
    username: undefined,
    email: undefined,
    isLoggedIn: false,
    avatar:"https://avatar.iran.liara.run/public/boy?username=Ash"
};

const setAvatar = createAsyncThunk(
    "user/setAvatar",
    async(value,thunkAPI)=>{
        try{
            const response = await axios.post("/setavatar",value);
            return response;
        }catch(error){
            console.log(error.message)
            return thunkAPI.rejectWithValue(error);
        }
    }
)

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.isLoggedIn = true;
            state.avatar = action.payload.avatar || initialState.avatar;
        },
        clearUser: (state) => {
            state.username = undefined;
            state.email = undefined;
            state.isLoggedIn = false;
        },
    }
})

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;