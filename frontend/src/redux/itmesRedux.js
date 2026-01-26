import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import newRequest from '../utils/newRequest';
import uploadUser from './../utils/update.js';

// جلب البيانات من السيرفر باستخدام axios
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    try {
      const res = await newRequest.get("produces");
      uploadUser()
      return res.data; // axios بيرجع البيانات داخل res.data

    }catch (err) {
      if(err.message === "Network Error") return console.log(err.message)
        console.log(err.response.data)
    }
  }
);
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    itmes: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.itmes = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export default productsSlice.reducer;