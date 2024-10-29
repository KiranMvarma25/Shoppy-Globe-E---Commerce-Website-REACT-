import { configureStore } from "@reduxjs/toolkit";      // Importing the configureStore function from Redux Toolkit to create a Redux store
import cartReducer from "./cartSlice";                  // Importing the cartReducer, which manages cart-related state and logic

const appStore = configureStore({                       // Creating a Redux store and configuring it with reducers
    reducer : {                                         // Defining the reducers to manage the application's state              
        cart : cartReducer                              // Setting up the 'cart' slice of state managed by cartReducer
    }
});

export default appStore