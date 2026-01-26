import { configureStore } from '@reduxjs/toolkit'
import cartProduc from './cartProduc'
import itmes from './itmesRedux'
import orders   from './ordersRedux'
export const store = configureStore({
    reducer: {cart:cartProduc,itmes:itmes,orders:orders }
})