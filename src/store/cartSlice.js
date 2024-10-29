import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({                         // Create a slice for cart state management using Redux Toolkit's createSlice method
    name : 'cart',                                      // Name of the slice, used to differentiate in the Redux store
    initialState : {
        items : [],
        totalPrice : 0,
    },
    reducers : {                                        // Reducers to add, remove and clear items from the cart
        addToCart : (state,action) => {
            state.items.push(action.payload);
            state.totalPrice += action.payload.price;
        },
        removeFromCart : (state,action) => {
            // state.items = state.items.filter(item => item.id != action.payload);
            
            const index = state.items.findIndex(item => item.id == action.payload);         // Find the index of the item to remove based on its id
            if(index !== -1){
                state.totalPrice -= state.items[index].price;
                state.items.splice(index,1);
            }
            if(state.items.length == 0)
                state.totalPrice = 0;
        },
        clearCart : (state) => {
            state.items = [];
            state.totalPrice = 0;
        }
    }
})


export default cartSlice.reducer;                                           // Exporting the reducer to include in the Redux store
export const {addToCart,removeFromCart,clearCart} = cartSlice.actions;      // Exporting the action creators for components to dispatch actions