import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart, removeFromCart } from "./cartSlice";

import { toast } from "react-toastify";

import { BsFillCartXFill } from "react-icons/bs";
import { FaCartFlatbedSuitcase } from "react-icons/fa6";
import { BsCartDash } from "react-icons/bs";

function Cart(){

  const cartItems = useSelector(store => store.cart.items);           // Access cart items from Redux store
  console.log("cartItems",cartItems);

  const price = useSelector(store => store.cart.totalPrice);
  console.log("cartItems",price);

  // const cartItemsId = cartItems.map(itemId => itemId.id);
  // console.log("cartItemsId",cartItemsId);

  const dispatch = useDispatch();

  function handleCliclRemove(id){                                     // Function to handle removing an item from the cart by item id
    dispatch(removeFromCart(id));                                     // Dispatch action to remove item  
    toast.info("Item Removed");
  }

  function handleClickClearCart(){                                    // Function to handle clearing the entire cart
    dispatch(clearCart());                                            // Dispatch action to clear cart
    toast.info("Cleared Cart");
  }

  return (
    <>
      <h1 className="cartHeader"><FaCartFlatbedSuitcase /> Items in Cart</h1>
      <br />
      <div className="cartPriceClearCart">
        <p className="cartPrice">Total Price : ${price}</p>
        <button className="clearCartButton" onClick={handleClickClearCart}><BsFillCartXFill /> Clear Cart</button>
      </div>
      
      {cartItems.length != 0 ? 
        (
          <div className="cartSet">
            {cartItems.map(item => 
            <div key={item.id} className="cartSetChild">
              <Link to={`/cartitems/${item.id}`} key={item.id} className="cartSetLinkChild">
                <div>
                  <img src={item.thumbnail} alt={`Image of ${item.title}`} width="100%" height="50%" />
                  <h3 className="cartSetGrandChildh3">{item.title}</h3>
                  <h4 className="cartSetGrandChildh4">Price : ${item.price}</h4>
                  <h4 className="cartSetGrandChildh4">View Details</h4>
                  <br />
                </div>
              </Link>
              <button className="removeFromCartButton" onClick={() => handleCliclRemove(item.id)}><BsCartDash /> Remove from Cart</button>
            </div>
            )}
          </div>
        )
        : 
        <h1 className="cartHeadertwo">No Items Added to Cart</h1>
      }
    </>
  )
}
  

export default Cart;