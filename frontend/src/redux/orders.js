import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import newRequest from '../utils/newRequest';

const data = JSON.parse(localStorage.getItem("dataFriend"))
export const fatchadminOrder = createAsyncThunk(
  'adminOrder/fatchadminOrder',
  async () => {
    try {
      const res = await newRequest.get(`orders`);
      return res.data; 
    }catch (err) {
      if(err.message === "Network Error") return console.log(err.message)
        console.log(err.response.data)
    }
  }
  );
const adminOrderSlice = createSlice({
  name: 'adminOrder',
  initialState: {
    order: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fatchadminOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase( data.isSeller  && fatchadminOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.order = action.payload;
      })
      .addCase(fatchadminOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export default adminOrderSlice.reducer;