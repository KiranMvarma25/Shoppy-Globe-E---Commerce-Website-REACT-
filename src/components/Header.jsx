import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import { IoHomeSharp } from "react-icons/io5";
import { FaCartArrowDown } from "react-icons/fa";

function Header(){

  const cartItems = useSelector(store => store.cart.items); // Receiving the items in the cart from Redux store. 

  return (
    <>
      <div className="navbarParent">
        <h1 className="navbarHeader">Shoppy Globe</h1>
        <div className="navbar">
          <Link className="navbarItems" to="/" ><h2><IoHomeSharp /> Home</h2></Link>                              {/* Link to Home page. */}
          <Link className="navbarItems" to="/cart" ><h2><FaCartArrowDown /> Cart {cartItems.length}</h2></Link>   {/* Link to Cart page. */}
        </div>
      </div>
    </>
  )
}
  
export default Header;