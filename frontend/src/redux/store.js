import { configureStore } from '@reduxjs/toolkit'
import cartProduc from './cartProduc'
import itmes from './itmesRedux'
import orders   from './ordersRedux'
import adminOrder   from './orders'
import users   from './users'
export const store = configureStore({
    reducer: {cart:cartProduc,itmes:itmes,orders:orders, adminOrder: adminOrder, users,users }
})