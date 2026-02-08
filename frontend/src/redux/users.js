import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import newRequest from '../utils/newRequest';

const data = JSON.parse(localStorage.getItem("dataFriend"))
export const fatchusers = createAsyncThunk(
  'users/fatchusers',
  async () => {
    try {
      const res = await newRequest.get(`users`);
      return res.data; 
    }catch (err) {
      if(err.message === "Network Error") return console.log(err.message)
        console.log(err.response.data)
    }
  }
  );
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fatchusers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase( data.isSeller  && fatchusers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.order = action.payload;
      })
      .addCase(fatchusers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export default usersSlice.reducer;