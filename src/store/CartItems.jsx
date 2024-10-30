import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { useDispatch } from "react-redux";
import { removeFromCart } from "./cartSlice";

import { BsCartDash } from "react-icons/bs";

function CartItems(){

    const params = useParams();

    const [productItems, setProductItems] = useState({ products : [] });

    let url = api;

    const data = async () => {
        const response = await fetch(url);
        const output = await response.json();
        
        setProductItems(output);
    }


    useEffect(() => {
        data();
    },[])

    console.log(productItems);
    const filteredItem = productItems.products.filter(item => item.id == params.id);            // Filters the products to find the one matching the id from route parameters
    console.log(filteredItem);

    const dispatch = useDispatch();
    const navigate = useNavigate();                         // Navigation function to redirect the user to a different route

    function handleRemoveFromCart(itemId){
        dispatch(removeFromCart(itemId));
        navigate('/cart');                                  // Navigates back to the cart page after removal
    }

    return (
        <>
            {/* <h1>Hello I'm Cart Items with id : {params.id}</h1> */}
            <div className="productDetails">
                {
                    filteredItem.map(item => 
                    <div key={item.id}>

                        <h1 className="productDetailsHeading">{item.title}</h1>

                        <div className="productDetailsSet">
                            <img className="productDetailsSetImageChild" src={item.thumbnail} alt={`Image of ${item.title}`} width="400px" height="400px" />
                            
                            <div className="productDetailsSetChild">
                                <br />
                                <h2 className="productDetailsSetHeadingChild">Price : ${item.price}</h2>
                                <br />
                                <h2 className="productDetailsSetHeadingChild">Discount Price : {item.discountPercentage} %</h2>
                                <br />
                                <h2 className="productDetailsSetHeadingChild">Brand : {item.brand}</h2>
                                <br />
                                <h2 className="productDetailsSetHeadingChild">Left : {item.stock}</h2>
                                <br />
                                <h2 className="productDetailsSetHeadingChild">Rating : {item.rating}</h2>
                            </div>
                        </div>

                        <br />
                        
                        <button className="removeFromCartButton" onClick={() => handleRemoveFromCart(item.id)}><BsCartDash /> Remove from Cart</button>

                        <br />
                        <br />

                        <h3>{item.description}</h3>

                        <br />
                        
                        <h4>Warranty Information : {item.warrantyInformation}</h4>
                        
                        <br />

                        <h4>Delivered : {item.shippingInformation}</h4>
                        
                        <br />

                        <h4>Availability Status : {item.availabilityStatus}</h4>
                        
                        <br />
                        
                        {/* <h3>Order Quantity : {item.minimumOrderQuantity}</h3>
                        
                        <br /> */}
                        
                        <h4>Return Policy : {item.returnPolicy}</h4>
                        
                        <br />
                        <br />
                    </div> 
                    )
                }
            </div>
        </>
    )

}
  
  

export default CartItems;