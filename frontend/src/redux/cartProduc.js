import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
}
const savedDataCart = JSON.parse(localStorage.getItem('dataCart'));
if(savedDataCart) {
    initialState.products= savedDataCart;
} 
export const cartProduc = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // Start to Product cart
        addToCart: (state, action) => {
            const item = state.products.find(item=>item.title === action.payload.title && item.item == action.payload.item)
            if(item) {
                item.amount+=action.payload.amount
                localStorage.setItem("dataCart", JSON.stringify(state.products) )
            } else {
                state.products.push(action.payload)
                localStorage.setItem("dataCart", JSON.stringify(state.products) )
            }
        },
        removeItem: (state,action) => {
            state.products=state.products.filter(item=>item.id !== action.payload)
            localStorage.setItem("dataCart", JSON.stringify(state.products) )
        },
        resetCart: (state) => {
            state.products=[]
        },
        increment: (state,action) => {
            const item = state.products.find(item=>item.id === action.payload)
            if(item) {
                if(item.amount  < 10) {
                    item.amount++
                    localStorage.setItem("dataCart", JSON.stringify(state.products) )
                } else {
                    console.log("لا يمكن ذيادة كثر من ذالك")
                }
            }
        },
        decrement: (state,action) => {
            const item = state.products.find(item=>item.id === action.payload)
            if(item) {
                if(item.amount > 1) {
                    item.amount--
                    localStorage.setItem("dataCart", JSON.stringify(state.products) )
                } else  {
                    console.log("لا يمكن نقص أكثر من ذالك")
                }

            }
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
    }
});
export const {addToCart,removeItem,resetCart,increment,decrement,incrementByAmount} = cartProduc.actions;
export default cartProduc.reducer;