import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import newRequest from '../utils/newRequest';

const datau = JSON.parse(localStorage.getItem("dataFriend"))
export const fatchOrders = createAsyncThunk(
  'orders/fatchOrders',
  async () => {
    try {
      const res = await newRequest.get(`orders/filter/${datau._id}`);
      return res.data; 
    }catch (err) {
      if(err.message === "Network Error") return console.log(err.message)
        console.log(err.response.data)
    }
  }
  );
const OrdersSlice = createSlice({
  name: 'orders',
  initialState: {
    order: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fatchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fatchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.order = action.payload;
      })
      .addCase(fatchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export default OrdersSlice.reducer;